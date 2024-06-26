import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "src/Config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CFormTextarea,
  CRow,
} from "@coreui/react";
import { DocsExample } from "src/components";

const PrivateJob = () => {
  const [jobName, setJobName] = useState("");
  const [jobAddress, setJobAddress] = useState("");
  const [jobStartingDate, setJobStartingDate] = useState("");
  const [jobExpectedEndingDate, setJobExpectedEndingDate] = useState("");
  const [engineerName, setEngineerName] = useState("");
  const [costOfJob, setCostOfJob] = useState("");
  const [labourCost, setLabourCost] = useState("");
  const [materialCost, setMaterialCost] = useState("");
  const [otherExpense, setOtherExpense] = useState("");

  const [otherRelatedNotes, setOtherRelatedNotes] = useState("");
  const [jobLeads, setJobLeads] = useState("");
  const [measure, setMeasure] = useState("");
  const [epcRating, setEpcRating] = useState("");
  const [absField, setAbsField] = useState("");
  const [insulationIntallerName, setInsulationIntallerName] = useState("");
  const [engineers, setEngineers] = useState([]);
  const [installers, setInstallers] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [epcRatings, setEpcRatings] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [jobTypeName, setJobTypeName] = useState("");
  const [selectedDataMatch, setSelectedDataMatch] = useState("");
  const [dataMatches, setDataMatches] = useState([]);
  const [absFields, setAbsFields] = useState([]); // Define absFields state variable
  const [jobStatuses, setJobStatuses] = useState([]);
  const [selectedJobStatus, setSelectedJobStatus] = useState("");

  useEffect(() => {
    fetchJobStatuses();
    fetchEngineers();
    fetchInstallers();
    fetchEpcRatings();
    fetchJobTypes();
    fetchDataMatches();
    fetchAbsFields();
  }, []);
  const fetchAbsFields = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/abs-fields`);
      setAbsFields(response.data);
    } catch (error) {
      console.error("Error fetching ABS fields:", error);
    }
  };
  const fetchJobStatuses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/job-statuses`);
      setJobStatuses(response.data);
    } catch (error) {
      console.error("Error fetching job statuses:", error);
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
  const handleEpcRatingChange = (e) => {
    const selectedEpcRating = e.target.value;
    setEpcRating(selectedEpcRating);
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/privatejob`, {
        jobname: jobName,
        joblead: jobLeads,
        jobaddress: jobAddress,
        job_status: selectedJobStatus,
        measure: measure,
        job_starting_date: jobStartingDate,
        epc_rating: epcRating,
        expected_ending_date: jobExpectedEndingDate,
        assigned_engineer_id: engineerName,
        insulation_installer_id: insulationIntallerName,
        cost_of_job: costOfJob,
        data_match: selectedDataMatch,
        other_related_note: otherRelatedNotes,
        job_type: jobTypeName,
        labour_cost: labourCost,
        material_cost: materialCost,
        other_expense: otherExpense,
      });
      console.log("Job added successfully:", response.data);
      // Calculate net profit
      const netProfit =
        parseFloat(labourCost) +
        parseFloat(materialCost) +
        parseFloat(otherExpense) -
        parseFloat(costOfJob);
      console.log("Net profit:", netProfit);
      toast.success("Job added successfully");
      setJobName("");
      setJobAddress("");
      setJobStartingDate("");
      setJobExpectedEndingDate("");
      setEngineerName("");
      setCostOfJob("");
      setOtherRelatedNotes("");
      setJobLeads("");
      setMeasure("");
      setEpcRating("");
      setAbsField("");
      setLabourCost("");
      setOtherExpense("");
      setSelectedJobStatus("");
      setMaterialCost("");
      setInsulationIntallerName("");
      setSelectedDataMatch("");
      setShowModal(true); // Show modal when job is inserted successfully
    } catch (error) {
      console.error("Error adding Job:", error);
      toast.error("Error in Adding Job");
    }
  };

  return (
    <>
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
                      <CFormLabel htmlFor="jobDate">
                        Job Starting Date
                      </CFormLabel>
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
                        onChange={(e) =>
                          setJobExpectedEndingDate(e.target.value)
                        }
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
                      <CFormLabel htmlFor="jobTypes">Job Type</CFormLabel>
                      <CFormSelect
                        id="jobtype"
                        value={jobTypeName}
                        onChange={(e) => setJobTypeName(e.target.value)}
                      >
                        <option value="">Select Job Type</option>
                        {jobType.map((jobType) => (
                          <option key={jobType.id} value={jobType.name}>
                            {jobType.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </div>
                    <div className="mb-3">
                      <CFormLabel htmlFor="jobCost">Our Cost</CFormLabel>
                      <CFormInput
                        type="number"
                        id="costOfJob"
                        value={costOfJob}
                        onChange={(e) => setCostOfJob(e.target.value)}
                        placeholder="Enter Our Cost"
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
                    {/* <div className="mb-3">
                      <CFormLabel htmlFor="Measure">Measure</CFormLabel>
                      <CFormInput
                        type="text"
                        id="measure"
                        value={measure}
                        onChange={(e) => setMeasure(e.target.value)}
                        placeholder="Enter Measures"
                      />
                    </div> */}
                    {/* <div className="mb-3">
                      <CFormLabel htmlFor="epcRating">EPC Rating</CFormLabel>
                      <CFormSelect
                        id="epcRating"
                        onChange={handleEpcRatingChange}
                      >
                        <option value="">Select EPC Rating</option>
                        {epcRatings.map((rating) => (
                          <option key={rating.id} value={rating.name}>
                            {rating.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </div> */}

                    {/*<div className="mb-3">
                      <CFormLabel htmlFor="absField">ABS Field</CFormLabel>
                      <CFormSelect
                        id="absField"
                        value={absField}
                        onChange={(e) => setAbsField(e.target.value)}
                      >
                        <option value="">Select ABS Field</option>
                        {absFields.map((abs) => (
                          <option key={abs.id} value={abs.cost_savings}>
                            {abs.floor_area_segment} - {abs.starting_band} to{" "}
                            {abs.finishing_band} is {abs.cost_savings}
                          </option>
                        ))}
                      </CFormSelect>
                    </div> */}
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
                    {/* <div className="mb-3">
                      <CFormLabel htmlFor="dataMatch">Data Match</CFormLabel>
                      <CFormSelect
                        id="dataMatch"
                        value={selectedDataMatch}
                        onChange={(e) => setSelectedDataMatch(e.target.value)}
                      >
                        <option value="">Select Data Match</option>
                        {dataMatches.map((dataMatch) => (
                          <option key={dataMatch.id} value={dataMatch.name}>
                            {dataMatch.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </div> */}
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
                    <div className="mb-3">
                      <CFormLabel htmlFor="labourCost">Labour Cost</CFormLabel>
                      <CFormInput
                        type="number"
                        id="labourCost"
                        value={labourCost}
                        onChange={(e) => setLabourCost(e.target.value)}
                        placeholder="Enter labour cost"
                      />
                    </div>
                    <div className="mb-3">
                      <CFormLabel htmlFor="otherExpense">
                        Other Expense
                      </CFormLabel>
                      <CFormInput
                        type="number"
                        id="otherExpense"
                        value={otherExpense}
                        onChange={(e) => setOtherExpense(e.target.value)}
                        placeholder="Enter other expense"
                      />
                    </div>
                    <div className="mb-3">
                      <CFormLabel htmlFor="materialCost">
                        Material Cost
                      </CFormLabel>
                      <CFormInput
                        type="number"
                        id="materialCost"
                        value={materialCost}
                        onChange={(e) => setMaterialCost(e.target.value)}
                        placeholder="Enter material cost"
                      />
                    </div>
                    <div className="mb-3">
                      <CFormLabel htmlFor="jobStatus">Job Status</CFormLabel>
                      <CFormSelect
                        id="jobStatus"
                        value={selectedJobStatus}
                        onChange={(e) => setSelectedJobStatus(e.target.value)}
                      >
                        <option value="">Select Job Status</option>
                        {jobStatuses.map((status) => (
                          <option key={status.id} value={status.name}>
                            {status.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </div>
                  </CForm>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CModal show={showModal} onClose={() => setShowModal(false)} size="sm">
          <CModalHeader closeButton>Success</CModalHeader>
          <CModalBody>Job inserted successfully!</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setShowModal(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </CRow>
      <ToastContainer />
    </>
  );
};

export default PrivateJob;
