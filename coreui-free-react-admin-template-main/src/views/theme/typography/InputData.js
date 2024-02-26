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
  CFormTextarea,
  CRow,
} from "@coreui/react";
import { DocsExample } from "src/components";

const InputData = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Job Details</strong>
          </CCardHeader>
          <CCardBody>
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
                  rows="3"
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
                <CFormLabel htmlFor="jobDate">Expected Ending Date</CFormLabel>
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
                <CFormInput
                  type="text"
                  id="engineerName"
                  placeholder="Enter engineer name"
                />
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
                <CFormLabel htmlFor="jobCost">Other Related Note</CFormLabel>
                <CFormInput
                  type="number"
                  id="jobCost"
                  placeholder="Enter Other Related Note"
                />
              </div>

              <CButton color="primary">Submit</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default InputData;
