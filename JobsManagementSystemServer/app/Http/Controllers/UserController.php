<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{


    public function login(Request $request)
    {
        // Validate incoming request data
        log::debug('awake');
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
    
        // Extract credentials from the request
        $user = User::where('email', $request->input('email'))->first();

        if ($user && Hash::check($request->input('password'), $user->password)) {
            // Authentication passed
            return response()->json(['message' => 'User Login successfully'], 201);
        } else {
            // Authentication failed
            return response()->json(['message' => 'User Name or Password Invalid'], 400);
        }
        

    }

    
    public function register(Request $request)
    {

            // Validate incoming request data
            $validator = Validator::make($request->all(), [
        'user_email' => 'required|email|unique:users,user_email',
        'user_password' => 'required|min:6|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/',
        'User_role' => 'required|in:User,admin', // Define your roles as needed
                ]);

        // Check if the validator fails
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Create a new user instance
        $user = new User();

        // Assign values to user attributes
        $user->user_email = $request->user_email;
        $user->user_password = bcrypt($request->user_password); // Make sure to hash the password
        $user->User_role = $request->User_role;

        // Save the user to the database
        $user->save();

        // You can optionally return a response indicating success
        return response()->json(['message' => 'User created successfully'], 201);
        
    }
}
