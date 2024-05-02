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

  const [epcRatings, setEpcRatings] = useState([]);

  useEffect(() => {
    fetchEngineers();
    fetchInstallers();
    fetchEpcRatings();
    fetchJobTypes();
    fetchDataMatches();
    fetchAbsFields();
    fetch(`${BASE_URL}/allprivatejob`)
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching job data:", error));
  }, []);
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
      jobname: job.jobname,
      joblead: job.joblead,
      jobaddress: job.jobaddress,
      job_starting_date: job.job_starting_date,
      job_type: job.job_type,
      expected_ending_date: job.expected_ending_date,
      assigned_engineer_name: job.assigned_engineer.name,
      insulation_installer_name: job.insulation_installer.name,
      cost_of_job: job.cost_of_job,
      other_related_note: job.other_related_note,
      abs_field: job.abs_field,
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
  };

  return (
    <>
      <div style={{ overflowX: "auto" }}>
        <CTable>
          <CTableCaption>List of Jobs</CTableCaption>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Job Name
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
                Cost of Job
              </CTableHeaderCell>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Other Related Note
              </CTableHeaderCell>
              <CTableHeaderCell style={{ paddingRight: "18rem" }}>
                Abs Field
              </CTableHeaderCell>
              <CTableHeaderCell style={{ paddingRight: "5rem" }}>
                Actions
              </CTableHeaderCell>
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
                        value={
                          editableRow === job.id
                            ? editedValues.jobname
                            : job.jobname
                        }
                        onChange={(e) => handleInputChange(e, "jobname")}
                      />
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
                            handleInputChange(e, "assigned_engineer.name")
                          }
                        >
                          <option value="">Select Engineer</option>
                          {engineers.map((engineer) => (
                            <option key={engineer.id} value={engineer.name}>
                              {engineer.name}
                            </option>
                          ))}
                        </CFormSelect>
                      ) : (
                        job.assigned_engineer_name
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      {editableRow === job.id ? (
                        <CFormSelect
                          value={editedValues.insulation_installer_name}
                          onChange={(e) =>
                            handleInputChange(e, "insulation_installer.name")
                          }
                        >
                          <option value="">Select Installer</option>
                          {installers.map((installer) => (
                            <option key={installer.id} value={installer.name}>
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
                            <option
                              key={abs.id}
                              value={`${abs.floor_area_segment} - ${abs.starting_band} to ${abs.finishing_band}`}
                            >
                              {abs.floor_area_segment} - {abs.starting_band} to{" "}
                              {abs.finishing_band} is {abs.cost_savings}
                            </option>
                          ))}
                        </CFormSelect>
                      ) : (
                        job.abs_field
                      )}
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
                    <CTableDataCell>{job.abs_field}</CTableDataCell>
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
        <ToastContainer />
      </div>
    </>
  );
};

export default ViewPrivateJobs;
