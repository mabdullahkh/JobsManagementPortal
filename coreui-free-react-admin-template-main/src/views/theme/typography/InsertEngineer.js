import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
  CTable,
  CTableCaption,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react";
import { DocsExample } from "src/components";

const InsertEngineer = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      dob: "2024-02-22",
      name: "John Doe",
    },
    {
      id: 2,
      dob: "2024-02-23",
      name: "Jane Smith",
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
    <>
      <CRow className="justify-content-center">
        {" "}
        {/* Center aligning the content */}
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Job Details</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={6}>
                  <CForm>
                    <div className="mb-3">
                      <CFormLabel htmlFor="engineerName">
                        Engineer Name
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="engineerName"
                        placeholder="Enter Engineer Name"
                      />
                    </div>
                  </CForm>
                </CCol>
                <CCol xs={6}>
                  <CForm>
                    <div className="mb-3">
                      <CFormLabel htmlFor="dob">DOB</CFormLabel>
                      <CFormInput
                        type="date"
                        id="dob"
                        placeholder="Enter Date of Birth"
                      />
                    </div>
                  </CForm>
                </CCol>
              </CRow>
              <div className="text-center">
                <CButton color="primary">Submit</CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CTable>
        <CTableCaption>Engineers List</CTableCaption>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Engineer Name</CTableHeaderCell>
            <CTableHeaderCell>Engineer DOB</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {jobs.map((job) => (
            <CTableRow key={job.id}>
              <CTableDataCell>{job.name}</CTableDataCell>
              <CTableDataCell>{job.dob}</CTableDataCell>
              <CTableDataCell>
                <CButton color="danger" onClick={() => handleDelete(job.id)}>
                  Delete
                </CButton>
                <CButton color="info" onClick={() => handleEdit(job.id)}>
                  Edit
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );
};

export default InsertEngineer;
