import React, { useState } from "react";
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
  // Sample job data, replace with your actual data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      name: "Job 1",
      address: "123 Main St",
      date: "2024-02-22",
      engineer: "John Doe",
      cost: 1000,
    },
    {
      id: 2,
      name: "Job 2",
      address: "456 Elm St",
      date: "2024-02-23",
      engineer: "Jane Smith",
      cost: 1500,
    },
    // Add more job objects as needed
  ]);

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
          <CTableHeaderCell>Job Date</CTableHeaderCell>
          <CTableHeaderCell>Assigned Engineer</CTableHeaderCell>
          <CTableHeaderCell>Cost of Job</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {jobs.map((job) => (
          <CTableRow key={job.id}>
            <CTableDataCell>{job.name}</CTableDataCell>
            <CTableDataCell>{job.address}</CTableDataCell>
            <CTableDataCell>{job.date}</CTableDataCell>
            <CTableDataCell>{job.engineer}</CTableDataCell>
            <CTableDataCell>{job.cost}</CTableDataCell>
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
