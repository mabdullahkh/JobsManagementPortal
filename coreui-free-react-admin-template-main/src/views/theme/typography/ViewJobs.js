import React, { useState, useEffect } from "react";
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
    // Fetch job data from Laravel backend
    fetch(`${BASE_URL}/allec04`) // Update the URL according to your Laravel route
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching job data:", error));
  }, []);

  // Function to handle delete action
  const handleDelete = (id) => {
    // Implement delete functionality here
    console.log("Delete job with id:", id);
  };

  // Function to handle edit action
  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log("Edit job with id:", id);
  };

  // Function to handle assign action
  const handleAssign = (id) => {
    // Implement assign functionality here
    console.log("Assign job with id:", id);
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
