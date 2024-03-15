import React from "react";
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
} from "@coreui/react";
import { DocsExample } from "src/components";
const PrivateJobs = () => {
  return (
    <CRow>
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
                    <CFormLabel htmlFor="jobName">Job Name</CFormLabel>
                    <CFormInput
                      type="text"
                      id="jobName"
                      placeholder="Enter job name"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="jobAddress">Job Address</CFormLabel>
                    <CFormTextarea
                      id="jobAddress"
                      rows="1"
                      placeholder="Enter job address"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="jobDate">Job Starting Date</CFormLabel>
                    <CFormInput
                      type="date"
                      id="jobDate"
                      placeholder="Select job date"
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel htmlFor="jobDate">
                      Expected Ending Date
                    </CFormLabel>
                    <CFormInput
                      type="date"
                      id="jobDate"
                      placeholder="Expected Ending Date"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="engineerName">
                      Assigned Engineer Name
                    </CFormLabel>
                    <CFormSelect id="engineerName">
                      <option value="">Select Engineer</option>
                      <option value="engineer1">Engineer 1</option>
                      <option value="engineer2">Engineer 2</option>
                      {/* Add more options as needed */}
                    </CFormSelect>
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="jobCost">Cost of Job</CFormLabel>
                    <CFormInput
                      type="number"
                      id="jobCost"
                      placeholder="Enter cost of job"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="jobCost">
                      Other Related Note
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="jobCost"
                      placeholder="Enter Other Related Note"
                    />
                  </div>

                  <CButton color="primary">Submit</CButton>
                </CForm>
              </CCol>
              <CCol xs={6}>
                <CForm>
                  <div className="mb-3">
                    <CFormLabel htmlFor="jobLeads">Job Leads</CFormLabel>
                    <CFormInput
                      type="text"
                      id="jobName"
                      placeholder="Enter job lead"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="Measure">Measure</CFormLabel>
                    <CFormInput id="measure" placeholder="Enter Measures" />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="epcRating">EPC Rating</CFormLabel>
                    <CFormInput
                      id="epcRating"
                      type="number"
                      placeholder="Enter EPC Rating"
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel htmlFor="abdfeild">ABS Field</CFormLabel>
                    <CFormInput id="abdfeild" placeholder="Enter ABS Feild" />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="insulationInstaller">
                      Insulation Installer Name
                    </CFormLabel>
                    <CFormSelect id="insulationInstaller">
                      <option value="">Select Installer</option>
                      <option value="installer1">Installer 1</option>
                      <option value="installer2">Installer 2</option>
                      {/* Add more options as needed */}
                    </CFormSelect>
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="dataMatch">Data Match</CFormLabel>
                    <CFormInput id="dataMatch" placeholder="Enter Data Match" />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="jobEvidence">
                      Job Evidence (PDFs and Pictures)
                    </CFormLabel>
                    <CFormInput
                      type="file"
                      id="jobEvidence"
                      accept=".pdf,image/*"
                    />
                  </div>
                </CForm>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default PrivateJobs;
