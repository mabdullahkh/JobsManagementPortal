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

const InsertInstaller = () => {
  const [installers, setInstallers] = useState([]);
  const [installerName, setInstallerName] = useState("");
  const [dob, setDOB] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDOB, setEditedDOB] = useState("");

  useEffect(() => {
    fetchInstallers();
  }, []);

  const fetchInstallers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/allinstallers`);
      setInstallers(response.data);
    } catch (error) {
      console.error("Error fetching installers:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/insertinstaller`, {
        name: installerName,
        dob: dob,
      });
      console.log("Installer added successfully:", response.data);
      setInstallers([...installers, response.data]);
      setInstallerName("");
      setDOB("");
    } catch (error) {
      console.error("Error adding installer:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/installers/${id}`);
      setInstallers(installers.filter((installer) => installer.id !== id));
    } catch (error) {
      console.error("Error deleting installer:", error);
    }
  };

  const handleEdit = (id, name, dob) => {
    setEditingId(id);
    setEditedName(name);
    setEditedDOB(dob);
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`${BASE_URL}/installers/${id}`, {
        name: editedName,
        dob: editedDOB,
      });
      setEditingId(null);
      fetchInstallers();
    } catch (error) {
      console.error("Error updating installer:", error);
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
              <strong>Installer Details</strong>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <CRow>
                  <CCol>
                    <div className="mb-3">
                      <CFormLabel htmlFor="installerName">
                        Installer Name
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="installerName"
                        placeholder="Enter Installer Name"
                        value={installerName}
                        onChange={(e) => setInstallerName(e.target.value)}
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
        <CTableCaption>Installers List</CTableCaption>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Installer Name</CTableHeaderCell>
            <CTableHeaderCell>Installer DOB</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {installers.map((installer) => (
            <CTableRow key={installer.id}>
              <CTableDataCell>
                {editingId === installer.id ? (
                  <CFormInput
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  installer.name
                )}
              </CTableDataCell>
              <CTableDataCell>
                {editingId === installer.id ? (
                  <CFormInput
                    type="date"
                    value={editedDOB}
                    onChange={(e) => setEditedDOB(e.target.value)}
                  />
                ) : (
                  installer.dob
                )}
              </CTableDataCell>
              <CTableDataCell>
                {editingId === installer.id ? (
                  <>
                    <CButton
                      color="success"
                      onClick={() => handleSave(installer.id)}
                    >
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
                      onClick={() =>
                        handleEdit(installer.id, installer.name, installer.dob)
                      }
                    >
                      Edit
                    </CButton>
                    <CButton
                      color="danger"
                      onClick={() => handleDelete(installer.id)}
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

export default InsertInstaller;
