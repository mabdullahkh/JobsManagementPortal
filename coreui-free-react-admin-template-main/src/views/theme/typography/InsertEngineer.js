import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "src/Config";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
  CTableCaption,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from "@coreui/react";

const InsertEngineer = () => {
  const [engineerName, setEngineerName] = useState("");
  const [dob, setDOB] = useState("");
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDOB, setEditedDOB] = useState("");

  useEffect(() => {
    fetchEngineers();
  }, []);

  const fetchEngineers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/allengineers`);
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching engineers:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/insertengineer`, {
        name: engineerName,
        dob: dob,
      });
      console.log("Engineer added successfully:", response.data);
      setJobs([...jobs, response.data]);
      setEngineerName("");
      setDOB("");
    } catch (error) {
      console.error("Error adding engineer:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/engineers/${id}`);
      setJobs(jobs.filter((job) => job.id !== id));
    } catch (error) {
      console.error("Error deleting engineer:", error);
    }
  };

  const handleEdit = (id, name, dob) => {
    setEditingId(id);
    setEditedName(name);
    setEditedDOB(dob);
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`${BASE_URL}/engineers/${id}`, {
        name: editedName,
        dob: editedDOB,
      });
      setEditingId(null);
      // Assuming the API returns the updated engineer details
      fetchEngineers();
    } catch (error) {
      console.error("Error updating engineer:", error);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedName("");
    setEditedDOB("");
  };

  return (
    <>
      <CRow className="justify-content-center">
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Job Details</strong>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CRow>
                  <CCol>
                    <div className="mb-3">
                      <CFormLabel htmlFor="engineerName">
                        Engineer Name
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="engineerName"
                        placeholder="Enter Engineer Name"
                        value={engineerName}
                        onChange={(e) => setEngineerName(e.target.value)}
                      />
                    </div>
                  </CCol>
                  <CCol>
                    <div className="mb-3">
                      <CFormLabel htmlFor="dob">DOB</CFormLabel>
                      <CFormInput
                        type="date"
                        id="dob"
                        placeholder="Enter Date of Birth"
                        value={dob}
                        onChange={(e) => setDOB(e.target.value)}
                      />
                    </div>
                  </CCol>
                </CRow>

                <div className="text-center">
                  <CButton color="primary" onClick={handleSubmit}>
                    Submit
                  </CButton>
                </div>
              </CForm>
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
              <CTableDataCell>
                {editingId === job.id ? (
                  <CFormInput
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  job.name
                )}
              </CTableDataCell>
              <CTableDataCell>
                {editingId === job.id ? (
                  <CFormInput
                    type="date"
                    value={editedDOB}
                    onChange={(e) => setEditedDOB(e.target.value)}
                  />
                ) : (
                  job.dob
                )}
              </CTableDataCell>
              <CTableDataCell>
                {editingId === job.id ? (
                  <>
                    <CButton color="success" onClick={() => handleSave(job.id)}>
                      Save
                    </CButton>
                    <CButton color="danger" onClick={handleCancel}>
                      Cancel
                    </CButton>
                  </>
                ) : (
                  <>
                    <CButton
                      color="info"
                      onClick={() => handleEdit(job.id, job.name, job.dob)}
                    >
                      Edit
                    </CButton>
                    <CButton
                      color="danger"
                      onClick={() => handleDelete(job.id)}
                    >
                      Delete
                    </CButton>
                  </>
                )}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );
};

export default InsertEngineer;
