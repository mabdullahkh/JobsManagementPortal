import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BASE_URL from "src/Config";
import {
  CButton,
  CTable,
  CTableCaption,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react";

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/allec04`)
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching job data:", error));
  }, []);

  const handleDelete = (id) => {
    fetch(`${BASE_URL}/allec04/${id}`, {
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
    // Implement edit functionality, maybe a modal for editing
    console.log("Edit job with id:", id);
  };
  return (
    <CTable>
      <CTableCaption>List of Jobs</CTableCaption>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Job Name</CTableHeaderCell>
          <CTableHeaderCell>Job Address</CTableHeaderCell>
          <CTableHeaderCell>Measure</CTableHeaderCell>
          <CTableHeaderCell>Job Starting Date</CTableHeaderCell>
          <CTableHeaderCell>EPC Rating</CTableHeaderCell>
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
            <CTableDataCell>{job.jobname}</CTableDataCell>
            <CTableDataCell>{job.jobaddress}</CTableDataCell>
            <CTableDataCell>{job.measure}</CTableDataCell>
            <CTableDataCell>{job.job_starting_date}</CTableDataCell>
            <CTableDataCell>{job.epc_rating}</CTableDataCell>
            <CTableDataCell>{job.expected_ending_date}</CTableDataCell>
            <CTableDataCell>
              {job.assigned_engineer ? job.assigned_engineer.name : "--"}
            </CTableDataCell>
            <CTableDataCell>
              {job.insulation_installer ? job.insulation_installer.name : "--"}
            </CTableDataCell>
            <CTableDataCell>{job.cost_of_job}</CTableDataCell>
            <CTableDataCell>{job.data_match}</CTableDataCell>
            <CTableDataCell>{job.other_related_note}</CTableDataCell>
            <CTableDataCell>{job.abs_field}</CTableDataCell>
            <CTableDataCell>
              <CButton color="danger" onClick={() => handleDelete(job.id)}>
                Delete
              </CButton>
              <CButton color="info" onClick={() => handleEdit(job.id)}>
                Edit
              </CButton>
              <CButton color="warning" onClick={() => handleAssign(job.id)}>
                Assign
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default ViewJobs;
