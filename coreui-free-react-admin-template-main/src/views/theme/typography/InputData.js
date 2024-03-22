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
  CFormSelect,
  CFormTextarea,
  CRow,
} from "@coreui/react";
import { DocsExample } from "src/components";

const InputData = () => {
  const [jobName, setJobName] = useState("");
  const [jobAddress, setJobAddress] = useState("");
  const [jobStartingDate, setJobStartingDate] = useState("");
  const [jobExpectedEndingDate, setJobExpectedEndingDate] = useState("");
  const [engineerName, setEngineerName] = useState("");
  const [costOfJob, setCostOfJob] = useState("");
  const [otherRelatedNotes, setOtherRelatedNotes] = useState("");
  const [jobLeads, setJobLeads] = useState("");
  const [measure, setMeasure] = useState("");
  const [epcRating, setEpcRating] = useState("");
  const [absField, setAbsField] = useState("");
  const [insulationIntallerName, setInsulationIntallerName] = useState("");
  const [dataMatch, setDataMatch] = useState("");
  const [engineers, setEngineers] = useState([]);
  const [installers, setInstallers] = useState([]);

  useEffect(() => {
    fetchEngineers();
    fetchInstallers();
  }, []);

  const fetchEngineers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/allengineers`);
      setEngineers(response.data);
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
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/ec04`, {
        jobname: jobName,
        joblead: jobLeads,
        jobaddress: jobAddress,
        measure: measure,
        job_starting_date: jobStartingDate,
        epc_rating: epcRating,
        expected_ending_date: jobExpectedEndingDate,
        expected_ending_date: jobExpectedEndingDate,
        assigned_engineer_id: engineerName,
        insulation_installer_id: insulationIntallerName,
        cost_of_job: costOfJob,
        data_match: dataMatch,
        other_related_note: otherRelatedNotes,
        abs_field: absField,
      });
      console.log("Engineer added successfully:", response.data);
    } catch (error) {
      console.error("Error adding engineer:", error);
    }
  };
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
                      value={jobName}
                      onChange={(e) => setJobName(e.target.value)}
                      placeholder="Enter job name"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="jobAddress">Job Address</CFormLabel>
                    <CFormTextarea
                      id="jobAddress"
                      value={jobAddress}
                      onChange={(e) => setJobAddress(e.target.value)}
                      rows="1"
                      placeholder="Enter job address"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="jobDate">Job Starting Date</CFormLabel>
                    <CFormInput
                      type="date"
                      value={jobStartingDate}
                      onChange={(e) => setJobStartingDate(e.target.value)}
                      id="jobStartingDate"
                      placeholder="Select job date"
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel htmlFor="jobDate">
                      Expected Ending Date
                    </CFormLabel>
                    <CFormInput
                      type="date"
                      id="jobExpectedEndingDate"
                      value={jobExpectedEndingDate}
                      onChange={(e) => setJobExpectedEndingDate(e.target.value)}
                      placeholder="Expected Ending Date"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="engineerName">
                      Assigned Engineer Name
                    </CFormLabel>
                    <CFormSelect
                      id="engineerName"
                      value={engineerName}
                      onChange={(e) => setEngineerName(e.target.value)}
                    >
                      <option value="">Select Engineer</option>
                      {engineers.map((engineer) => (
                        <option key={engineer.id} value={engineer.id}>
                          {engineer.name}
                        </option>
                      ))}
                    </CFormSelect>
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="jobCost">Cost of Job</CFormLabel>
                    <CFormInput
                      type="number"
                      id="costOfJob"
                      value={costOfJob}
                      onChange={(e) => setCostOfJob(e.target.value)}
                      placeholder="Enter cost of job"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="jobCost">
                      Other Related Note
                    </CFormLabel>
                    <CFormInput
                      type="text"
                      id="otherRelatedNotes"
                      value={otherRelatedNotes}
                      onChange={(e) => setOtherRelatedNotes(e.target.value)}
                      placeholder="Enter Other Related Note"
                    />
                  </div>

                  <CButton color="primary" onClick={handleSubmit}>
                    Submit
                  </CButton>
                </CForm>
              </CCol>
              <CCol xs={6}>
                <CForm>
                  <div className="mb-3">
                    <CFormLabel htmlFor="jobLeads">Job Leads</CFormLabel>
                    <CFormInput
                      type="text"
                      id="jobLeads"
                      value={jobLeads}
                      onChange={(e) => setJobLeads(e.target.value)}
                      placeholder="Enter job lead"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="Measure">Measure</CFormLabel>
                    <CFormInput
                      id="measure"
                      value={measure}
                      onChange={(e) => setMeasure(e.target.value)}
                      placeholder="Enter Measures"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="epcRating">EPC Rating</CFormLabel>
                    <CFormInput
                      id="epcRating"
                      value={epcRating}
                      onChange={(e) => setEpcRating(e.target.value)}
                      type="number"
                      placeholder="Enter EPC Rating"
                    />
                  </div>

                  <div className="mb-3">
                    <CFormLabel htmlFor="abdfeild">ABS Field</CFormLabel>
                    <CFormInput
                      id="absfeild"
                      value={absField}
                      onChange={(e) => setAbsField(e.target.value)}
                      placeholder="Enter ABS Feild"
                    />
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="insulationInstaller">
                      Insulation Installer Name
                    </CFormLabel>
                    <CFormSelect
                      id="installername"
                      value={insulationIntallerName}
                      onChange={(e) =>
                        setInsulationIntallerName(e.target.value)
                      }
                    >
                      <option value="">Select Installer</option>
                      {installers.map((Installer) => (
                        <option key={Installer.id} value={Installer.id}>
                          {Installer.name}
                        </option>
                      ))}
                    </CFormSelect>
                  </div>
                  <div className="mb-3">
                    <CFormLabel htmlFor="dataMatch">Data Match</CFormLabel>
                    <CFormInput
                      id="dataMatch"
                      value={dataMatch}
                      onChange={(e) => setDataMatch(e.target.value)}
                      placeholder="Enter Data Match"
                    />
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

export default InputData;
