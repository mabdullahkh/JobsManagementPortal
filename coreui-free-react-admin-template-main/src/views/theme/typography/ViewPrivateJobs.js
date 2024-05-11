import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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
  CFormSelect,
  CPagination, // Import CPagination from @coreui/react
  CPaginationItem,
} from "@coreui/react";

const ViewPrivateJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [editableRow, setEditableRow] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [absFields, setAbsFields] = useState([]); // Define absFields state variable
  const [engineers, setEngineers] = useState([]);
  const [installers, setInstallers] = useState([]);
  const [dataMatches, setDataMatches] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [jobStatuses, setJobStatuses] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false); // State to trigger useEffect
  const [filteredJobs, setFilteredJobs] = useState([]); // State for filtered jobs
  const [searchKeyword, setSearchKeyword] = useState(""); // State for search keyword
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 10;
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const [epcRatings, setEpcRatings] = useState([]);

  useEffect(() => {
    fetchEngineers();
    fetchJobStatuses();

    fetchInstallers();
    fetchEpcRatings();
    fetchJobTypes();
    fetchDataMatches();
    fetchAbsFields();
    fetchPrivateJobs(); // Fetch private jobs initially
  }, [updateTrigger]);
  useEffect(() => {
    // Filter jobs based on searchKeyword
    const filtered = jobs.filter(
      (job) =>
        (job.jobname || "")
          .toLowerCase()
          .includes((searchKeyword || "").toLowerCase()) ||
        (job.job_status || "")
          .toLowerCase()
          .includes((searchKeyword || "").toLowerCase()) ||
        (job.joblead || "")
          .toLowerCase()
          .includes((searchKeyword || "").toLowerCase()) ||
        (job.jobaddress || "")
          .toLowerCase()
          .includes((searchKeyword || "").toLowerCase()) ||
        (job.job_type || "")
          .toLowerCase()
          .includes((searchKeyword || "").toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [jobs, searchKeyword]);

  const fetchPrivateJobs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/allprivatejob`);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching private jobs:", error);
    }
  };
  const fetchJobStatuses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/job-statuses`);
      setJobStatuses(response.data);
    } catch (error) {
      console.error("Error fetching job statuses:", error);
    }
  };
  const fetchAbsFields = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/abs-fields`);
      setAbsFields(response.data);
    } catch (error) {
      console.error("Error fetching ABS fields:", error);
    }
  };

  const fetchDataMatches = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/datamatches`);
      setDataMatches(response.data);
    } catch (error) {
      console.error("Error fetching data matches:", error);
    }
  };
  const fetchEngineers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/allengineers`);
      setEngineers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching engineers:", error);
    }
  };
  const fetchInstallers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/allinstallers`);
      setInstallers(response.data);
    } catch (error) {
      console.error("Error fetching installers:", error);
    }
  };
  const fetchEpcRatings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/epc-ratings`);
      setEpcRatings(response.data);
    } catch (error) {
      console.error("Error fetching EPC ratings:", error);
    }
  };
  const fetchJobTypes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/job-types`);
      setJobType(response.data);
    } catch (error) {
      console.error("Error fetching EPC ratings:", error);
    }
  };

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
  const handleEdit = (id, job) => {
    setEditableRow(id);
    // Set the editedValues state to the values of the job being edited
    setEditedValues({
      jobname: job.jobname || "",
      joblead: job.joblead || "",
      jobaddress: job.jobaddress || "",
      job_starting_date: job.job_starting_date || null,
      job_type: job.job_type || "",
      expected_ending_date: job.expected_ending_date || null,
      assigned_engineer_name: job.assigned_engineer?.name || "",
      insulation_installer_name: job.insulation_installer?.name || "",
      cost_of_job: job.cost_of_job || 0,
      other_related_note: job.other_related_note || "",
      net_profit: job.net_profit || "",
      material_cost: job.material_cost || "",
      labour_cost: job.labour_cost || "",
      other_expense: job.other_expense || "",

      job_status: job.job_status || "",
    });
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
          setUpdateTrigger(!updateTrigger);
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
    const value = e.target.value;
    // If the field name contains dot notation, handle nested object properties
    if (fieldName.includes(".")) {
      const [objectKey, nestedKey] = fieldName.split(".");
      setEditedValues((prevState) => ({
        ...prevState,
        [objectKey]: {
          ...prevState[objectKey],
          [nestedKey]: value,
        },
      }));
    } else {
      setEditedValues({
        ...editedValues,
        [fieldName]: value,
      });
    }
    // Update the engineer name directly if the field name is "assigned_engineer_id"
    if (fieldName === "assigned_engineer_id") {
      const engineer = engineers.find((eng) => eng.id === value);
      if (engineer) {
        setEditedValues((prevState) => ({
          ...prevState,
          assigned_engineer_name: engineer.name,
        }));
      }
    }
    if (fieldName === "insulation_installer_id") {
      const installer = installers.find((inst) => inst.id === value);
      if (installer) {
        setEditedValues((prevState) => ({
          ...prevState,
          insulation_installer_name: installer.name,
        }));
      }
    }
  };
  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
    setCurrentPage(1); // Reset page to 1 when searching
    console.log("Search keyword:", e.target.value); // Log search keyword
  };

  return (
    <>
      <div style={{ overflowX: "auto" }}>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchKeyword}
            onChange={handleSearch}
          />
        </div>
        <CTable>
          <CTableCaption>List of Jobs</CTableCaption>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Job Name
              </CTableHeaderCell>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Job Status
              </CTableHeaderCell>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Job Lead
              </CTableHeaderCell>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Job Address
              </CTableHeaderCell>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Job Starting Date
              </CTableHeaderCell>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Job Type
              </CTableHeaderCell>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Expected Ending Date
              </CTableHeaderCell>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Assigned Engineer
              </CTableHeaderCell>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Insulation Installer
              </CTableHeaderCell>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Our Cost
              </CTableHeaderCell>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Other Related Note
              </CTableHeaderCell>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Labour Cost
              </CTableHeaderCell>{" "}
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Material Cost
              </CTableHeaderCell>{" "}
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Other Expense
              </CTableHeaderCell>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Net Profit
              </CTableHeaderCell>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Actions
              </CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentJobs.map((job) => (
              <CTableRow key={job.id}>
                {editableRow === job.id ? (
                  <>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        value={
                          editableRow === job.id
                            ? editedValues.jobname
                            : job.jobname
                        }
                        onChange={(e) => handleInputChange(e, "jobname")}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      {editableRow === job.id ? (
                        <CFormSelect
                          value={editedValues.job_status}
                          onChange={(e) => handleInputChange(e, "job_status")}
                        >
                          <option value="">Select Job Type</option>
                          {jobStatuses.map((status) => (
                            <option key={status.id} value={status.name}>
                              {status.name}
                            </option>
                          ))}
                        </CFormSelect>
                      ) : (
                        job.job_type
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        value={
                          editableRow === job.id
                            ? editedValues.joblead
                            : job.joblead
                        }
                        onChange={(e) => handleInputChange(e, "joblead")}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        value={
                          editableRow === job.id
                            ? editedValues.jobaddress
                            : job.jobaddress
                        }
                        onChange={(e) => handleInputChange(e, "jobaddress")}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="date"
                        value={
                          editableRow === job.id
                            ? editedValues.job_starting_date
                            : job.job_starting_date
                        }
                        onChange={(e) =>
                          handleInputChange(e, "job_starting_date")
                        }
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      {editableRow === job.id ? (
                        <CFormSelect
                          value={editedValues.job_type}
                          onChange={(e) => handleInputChange(e, "job_type")}
                        >
                          <option value="">Select Job Type</option>
                          {jobType.map((type) => (
                            <option key={type.id} value={type.name}>
                              {type.name}
                            </option>
                          ))}
                        </CFormSelect>
                      ) : (
                        job.job_type
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="date"
                        value={
                          editableRow === job.id
                            ? editedValues.expected_ending_date
                            : job.expected_ending_date
                        }
                        onChange={(e) =>
                          handleInputChange(e, "expected_ending_date")
                        }
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      {editableRow === job.id ? (
                        <CFormSelect
                          value={editedValues.assigned_engineer_name}
                          onChange={(e) =>
                            handleInputChange(e, "assigned_engineer_id")
                          }
                        >
                          <option value="">Select Engineer</option>
                          {engineers.map((engineer) => (
                            <option key={engineer.id} value={engineer.id}>
                              {engineer.name}
                            </option>
                          ))}
                        </CFormSelect>
                      ) : (
                        job.assigned_engineer.name
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {editableRow === job.id ? (
                        <CFormSelect
                          value={editedValues.insulation_installer_name}
                          onChange={(e) =>
                            handleInputChange(e, "insulation_installer_id")
                          }
                        >
                          <option value="">Select Installer</option>
                          {installers.map((installer) => (
                            <option key={installer.id} value={installer.id}>
                              {installer.name}
                            </option>
                          ))}
                        </CFormSelect>
                      ) : (
                        job.insulation_installer_name
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        value={
                          editableRow === job.id
                            ? editedValues.cost_of_job
                            : job.cost_of_job
                        }
                        onChange={(e) => handleInputChange(e, "cost_of_job")}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        value={
                          editableRow === job.id
                            ? editedValues.other_related_note
                            : job.other_related_note
                        }
                        onChange={(e) =>
                          handleInputChange(e, "other_related_note")
                        }
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        value={
                          editableRow === job.id
                            ? editedValues.labour_cost
                            : job.labour_cost
                        }
                        onChange={(e) => handleInputChange(e, "labour_cost")}
                      />
                    </CTableDataCell>{" "}
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        value={
                          editableRow === job.id
                            ? editedValues.material_cost
                            : job.material_cost
                        }
                        onChange={(e) => handleInputChange(e, "material_cost")}
                      />
                    </CTableDataCell>{" "}
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        value={
                          editableRow === job.id
                            ? editedValues.other_expense
                            : job.other_expense
                        }
                        onChange={(e) => handleInputChange(e, "other_expense")}
                      />
                    </CTableDataCell>
                    <CTableDataCell>
                      <CFormInput
                        type="text"
                        value={
                          editableRow === job.id
                            ? editedValues.net_profit
                            : job.net_profit
                        }
                        readOnly
                      />
                    </CTableDataCell>
                    {/* <CTableDataCell>
                      {editableRow === job.id ? (
                        <CFormSelect
                          value={
                            editableRow === job.id
                              ? editedValues.abs_field
                              : job.abs_field
                          }
                          onChange={(e) => handleInputChange(e, "abs_field")}
                        >
                          <option value="">Select ABS Field</option>
                          {absFields.map((abs) => (
                            <option key={abs.id} value={abs.cost_savings}>
                              {abs.floor_area_segment} - {abs.starting_band} to{" "}
                              {abs.finishing_band} is {abs.cost_savings}
                            </option>
                          ))}
                        </CFormSelect>
                      ) : (
                        job.abs_field
                      )}
                    </CTableDataCell> */}
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
                    <CTableDataCell>{job.job_status}</CTableDataCell>
                    <CTableDataCell>{job.joblead}</CTableDataCell>
                    <CTableDataCell>{job.jobaddress}</CTableDataCell>
                    <CTableDataCell>{job.job_starting_date}</CTableDataCell>

                    <CTableDataCell>{job.job_type}</CTableDataCell>
                    <CTableDataCell>{job.expected_ending_date}</CTableDataCell>
                    <CTableDataCell>
                      {job.assigned_engineer
                        ? job.assigned_engineer.name
                        : "--"}
                    </CTableDataCell>
                    <CTableDataCell>
                      {job.insulation_installer
                        ? job.insulation_installer.name
                        : "--"}
                    </CTableDataCell>
                    <CTableDataCell>{job.cost_of_job}</CTableDataCell>
                    <CTableDataCell>{job.other_related_note}</CTableDataCell>
                    <CTableDataCell>{job.labour_cost}</CTableDataCell>
                    <CTableDataCell>{job.material_cost}</CTableDataCell>
                    <CTableDataCell>{job.other_expense}</CTableDataCell>
                    <CTableDataCell>{job.net_profit}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="info"
                        onClick={() => handleEdit(job.id, job)}
                      >
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
        {filteredJobs.length > jobsPerPage && (
          <div className="d-flex justify-content-center">
            <CPagination aria-label="Page navigation example">
              <CPaginationItem
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </CPaginationItem>
              {Array.from(
                { length: Math.ceil(filteredJobs.length / jobsPerPage) },
                (_, index) => index + 1
              ).map((number) => (
                <CPaginationItem
                  key={number}
                  onClick={() => paginate(number)}
                  active={number === currentPage}
                >
                  {number}
                </CPaginationItem>
              ))}
              <CPaginationItem
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage === Math.ceil(filteredJobs.length / jobsPerPage)
                }
              >
                Next
              </CPaginationItem>
            </CPagination>
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
};

export default ViewPrivateJobs;
