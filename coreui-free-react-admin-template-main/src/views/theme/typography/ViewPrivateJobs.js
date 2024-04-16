import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "src/Config";
import {
  CButton,
  CFormInput,
  CTable,
  CTableCaption,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react";

const ViewPrivateJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  useEffect(() => {
    fetch(`${BASE_URL}/allprivatejob`)
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching job data:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`${BASE_URL}/allprivatejob/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted job from state
          setJobs(jobs.filter((job) => job.id !== id));
          // Show success message
          toast.success("Job deleted successfully");
        } else {
          console.error("Failed to delete job");
        }
      })
      .catch((error) => console.error("Error deleting job:", error));
  };

  const handleEdit = (id) => {
    setEditableRow(id);
  };

  const handleUpdate = (id) => {
    fetch(`${BASE_URL}/privatejobupdate/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedValues),
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          const updatedJobs = jobs.map((job) => {
            if (job.id === id) {
              return {
                ...job,
                ...editedValues,
              };
            }
            return job;
          });
          // Update the state with new job fields
          setJobs(updatedJobs);
          setEditableRow(null);
          // Show success message
          toast.success("Job updated successfully");
        } else {
          console.error("Failed to update job");
          toast.error("Failed to update job");
        }
      })
      .catch((error) => console.error("Error updating job:", error));
  };

  const handleCancel = () => {
    setEditedValues({}); // Reset edited values
    setEditableRow(null); // Reset editable row on cancel
  };

  const handleInputChange = (e, fieldName) => {
    setEditedValues({
      ...editedValues,
      [fieldName]: e.target.value,
    });
  };

  return (
    <>
      <CTable>
        <CTableCaption>List of Jobs</CTableCaption>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Job Name</CTableHeaderCell>
            <CTableHeaderCell>Job Lead</CTableHeaderCell>
            <CTableHeaderCell>Job Address</CTableHeaderCell>
            <CTableHeaderCell>Measure</CTableHeaderCell>
            <CTableHeaderCell>Job Starting Date</CTableHeaderCell>
            <CTableHeaderCell>EPC Rating</CTableHeaderCell>
            <CTableHeaderCell>Job Type</CTableHeaderCell>
            <CTableHeaderCell>Expected Ending Date</CTableHeaderCell>
            <CTableHeaderCell>Assigned Engineer</CTableHeaderCell>
            <CTableHeaderCell>Insulation Installer</CTableHeaderCell>
            <CTableHeaderCell>Cost of Job</CTableHeaderCell>
            <CTableHeaderCell>Data Match</CTableHeaderCell>
            <CTableHeaderCell>Other Related Note</CTableHeaderCell>
            <CTableHeaderCell>Abs Field</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {jobs.map((job) => (
            <CTableRow key={job.id}>
              {editableRow === job.id ? (
                <>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      value={editedValues.jobname || job.jobname}
                      onChange={(e) => handleInputChange(e, "jobname")}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      value={editedValues.joblead || job.joblead}
                      onChange={(e) => handleInputChange(e, "joblead")}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      value={editedValues.jobaddress || job.jobaddress}
                      onChange={(e) => handleInputChange(e, "jobaddress")}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      value={editedValues.measure || job.measure}
                      onChange={(e) => handleInputChange(e, "measure")}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="date"
                      value={
                        editedValues.job_starting_date || job.job_starting_date
                      }
                      onChange={(e) =>
                        handleInputChange(e, "job_starting_date")
                      }
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      value={editedValues.epc_rating || job.epc_rating}
                      onChange={(e) => handleInputChange(e, "epc_rating")}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      value={editedValues.job_type || job.job_type}
                      onChange={(e) => handleInputChange(e, "job_type")}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="date"
                      value={
                        editedValues.expected_ending_date ||
                        job.expected_ending_date
                      }
                      onChange={(e) =>
                        handleInputChange(e, "expected_ending_date")
                      }
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      value={job.assigned_engineer.name}
                      onChange={(e) =>
                        handleInputChange(e, "assigned_engineer.name")
                      }
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      value={job.insulation_installer.name}
                      onChange={(e) =>
                        handleInputChange(e, "insulation_installer.name")
                      }
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      value={editedValues.cost_of_job || job.cost_of_job}
                      onChange={(e) => handleInputChange(e, "cost_of_job")}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      value={editedValues.data_match || job.data_match}
                      onChange={(e) => handleInputChange(e, "data_match")}
                    />
                  </CTableDataCell>{" "}
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      value={
                        editedValues.other_related_note ||
                        job.other_related_note
                      }
                      onChange={(e) =>
                        handleInputChange(e, "other_related_note")
                      }
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      value={editedValues.abs_field || job.abs_field}
                      onChange={(e) => handleInputChange(e, "abs_field")}
                    />
                  </CTableDataCell>
                  {/* Add input fields for other editable columns */}
                  <CTableDataCell>
                    <CButton
                      color="success"
                      onClick={() => handleUpdate(job.id)}
                    >
                      Update
                    </CButton>
                    <CButton color="danger" onClick={handleCancel}>
                      Cancel
                    </CButton>
                  </CTableDataCell>
                </>
              ) : (
                <>
                  <CTableDataCell>{job.jobname}</CTableDataCell>
                  <CTableDataCell>{job.joblead}</CTableDataCell>
                  <CTableDataCell>{job.jobaddress}</CTableDataCell>
                  <CTableDataCell>{job.measure}</CTableDataCell>
                  <CTableDataCell>{job.job_starting_date}</CTableDataCell>
                  <CTableDataCell>{job.epc_rating}</CTableDataCell>
                  <CTableDataCell>{job.job_type}</CTableDataCell>
                  <CTableDataCell>{job.expected_ending_date}</CTableDataCell>
                  <CTableDataCell>
                    {job.assigned_engineer ? job.assigned_engineer.name : "--"}
                  </CTableDataCell>
                  <CTableDataCell>
                    {job.insulation_installer
                      ? job.insulation_installer.name
                      : "--"}
                  </CTableDataCell>
                  <CTableDataCell>{job.cost_of_job}</CTableDataCell>
                  <CTableDataCell>{job.data_match}</CTableDataCell>
                  <CTableDataCell>{job.other_related_note}</CTableDataCell>
                  <CTableDataCell>{job.abs_field}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="info" onClick={() => handleEdit(job.id)}>
                      Edit
                    </CButton>
                    <CButton
                      color="danger"
                      onClick={() => handleDelete(job.id)}
                    >
                      Delete
                    </CButton>
                  </CTableDataCell>
                </>
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <ToastContainer />
    </>
  );
};

export default ViewPrivateJobs;
