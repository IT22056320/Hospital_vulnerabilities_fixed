import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { 
  validateTextInput, 
  validateMedicalText, 
  validateDate,
  INPUT_LIMITS 
} from "../utils/inputValidation";

interface IDrug {
  drugName: string;
  dosage: string;
  frequency: string;
}

interface IPatientDiagnosis {
  patientId: string;
  prescriptionId: string;
  prescriptionDate: string;
  symptoms: string;
  diagnosis: string;
  drugs: IDrug[];
  duration: string;
  additionalNotes: string;
}

interface ValidationErrors {
  prescriptionId?: string[];
  prescriptionDate?: string[];
  symptoms?: string[];
  diagnosis?: string[];
  duration?: string[];
  additionalNotes?: string[];
  drugs?: { [index: number]: { drugName?: string[]; dosage?: string[]; frequency?: string[] } };
}

const UpdateDiagnosisPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [diagnosis, setDiagnosis] = useState<IPatientDiagnosis>({
    patientId: "",
    prescriptionId: "",
    prescriptionDate: "",
    symptoms: "",
    diagnosis: "",
    drugs: [{ drugName: "", dosage: "", frequency: "" }],
    duration: "",
    additionalNotes: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [focusedFields, setFocusedFields] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    fetchDiagnosis();
  }, []);

  const fetchDiagnosis = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/patient-diagnosis/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch diagnosis");
      }
      const data = await response.json();
      setDiagnosis(data);
    } catch (error) {
      console.error("Error fetching diagnosis:", error);
      setMessage("Error fetching diagnosis");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    if (!validateAllFields()) {
      setMessage("Please fix validation errors before submitting");
      return;
    }
    
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/patient-diagnosis/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(diagnosis),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update diagnosis");
      }

      setMessage("Diagnosis updated successfully");
      setTimeout(
        () => navigate(`/patient-diagnoses/${diagnosis.patientId}`),
        2000
      );
    } catch (error) {
      console.error("Error updating diagnosis:", error);
      setMessage("Error updating diagnosis");
    }
  };

  const validateAllFields = (): boolean => {
    const errors: ValidationErrors = {};
    
    // Validate prescription ID
    const prescriptionIdResult = validateTextInput(diagnosis.prescriptionId, INPUT_LIMITS.ID_FIELD);
    if (!prescriptionIdResult.isValid) errors.prescriptionId = prescriptionIdResult.errors;
    
    // Validate prescription date
    const dateResult = validateDate(diagnosis.prescriptionDate);
    if (!dateResult.isValid) errors.prescriptionDate = dateResult.errors;
    
    // Validate symptoms
    const symptomsResult = validateMedicalText(diagnosis.symptoms);
    if (!symptomsResult.isValid) errors.symptoms = symptomsResult.errors;
    
    // Validate diagnosis text
    const diagnosisResult = validateMedicalText(diagnosis.diagnosis);
    if (!diagnosisResult.isValid) errors.diagnosis = diagnosisResult.errors;
    
    // Validate duration
    const durationResult = validateTextInput(diagnosis.duration, INPUT_LIMITS.GENERAL_TEXT);
    if (!durationResult.isValid) errors.duration = durationResult.errors;
    
    // Validate additional notes
    const notesResult = validateMedicalText(diagnosis.additionalNotes);
    if (!notesResult.isValid) errors.additionalNotes = notesResult.errors;
    
    // Validate drugs
    const drugErrors: { [index: number]: { drugName?: string[]; dosage?: string[]; frequency?: string[] } } = {};
    diagnosis.drugs.forEach((drug, index) => {
      const drugNameResult = validateTextInput(drug.drugName, INPUT_LIMITS.NAME);
      const dosageResult = validateTextInput(drug.dosage, INPUT_LIMITS.GENERAL_TEXT);
      const frequencyResult = validateTextInput(drug.frequency, INPUT_LIMITS.GENERAL_TEXT);
      
      if (!drugNameResult.isValid || !dosageResult.isValid || !frequencyResult.isValid) {
        drugErrors[index] = {};
        if (!drugNameResult.isValid) drugErrors[index].drugName = drugNameResult.errors;
        if (!dosageResult.isValid) drugErrors[index].dosage = dosageResult.errors;
        if (!frequencyResult.isValid) drugErrors[index].frequency = frequencyResult.errors;
      }
    });
    
    if (Object.keys(drugErrors).length > 0) errors.drugs = drugErrors;
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    
    if (index !== undefined) {
      // Handle drug field changes with validation
      const result = validateTextInput(value, INPUT_LIMITS.GENERAL_TEXT);
      const updatedDrugs = [...diagnosis.drugs];
      updatedDrugs[index] = {
        ...updatedDrugs[index],
        [name]: result.sanitized,
      };
      setDiagnosis({ ...diagnosis, drugs: updatedDrugs });
      
      // Update validation errors for this drug field
      if (!result.isValid) {
        const newErrors = { ...validationErrors };
        if (!newErrors.drugs) newErrors.drugs = {};
        if (!newErrors.drugs[index]) newErrors.drugs[index] = {};
        newErrors.drugs[index][name as keyof IDrug] = result.errors;
        setValidationErrors(newErrors);
      } else {
        const newErrors = { ...validationErrors };
        if (newErrors.drugs?.[index]) {
          delete newErrors.drugs[index][name as keyof IDrug];
          if (Object.keys(newErrors.drugs[index]).length === 0) {
            delete newErrors.drugs[index];
          }
        }
        setValidationErrors(newErrors);
      }
    } else {
      // Handle main field changes with appropriate validation
      let result;
      switch (name) {
        case 'prescriptionId':
          result = validateTextInput(value, INPUT_LIMITS.ID_FIELD);
          break;
        case 'prescriptionDate':
          result = validateDate(value);
          break;
        case 'symptoms':
        case 'diagnosis':
        case 'additionalNotes':
          result = validateMedicalText(value);
          break;
        default:
          result = validateTextInput(value, INPUT_LIMITS.GENERAL_TEXT);
      }
      
      setDiagnosis({ ...diagnosis, [name]: result.sanitized });
      
      // Update validation errors
      if (!result.isValid) {
        setValidationErrors(prev => ({ ...prev, [name]: result.errors }));
      } else {
        setValidationErrors(prev => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const handleAddDrug = () => {
    setDiagnosis({
      ...diagnosis,
      drugs: [...diagnosis.drugs, { drugName: "", dosage: "", frequency: "" }],
    });
  };

  const handleRemoveDrug = (index: number) => {
    const updatedDrugs = diagnosis.drugs.filter((_, i) => i !== index);
    setDiagnosis({ ...diagnosis, drugs: updatedDrugs });
  };

  const handleCancel = () => {
    navigate(`/patient-diagnoses/${diagnosis.patientId}`);
  };

  // Handle input focus and blur events
  const handleFocus = (field: string) => {
    setFocusedFields((prevState) => ({ ...prevState, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocusedFields((prevState) => ({ ...prevState, [field]: false }));
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "900px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#dce9ff",
    border: "2px solid #007bff",
  };

  const titleStyle: React.CSSProperties = {
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "px",
    color: "black",
    fontWeight: "bold",
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: "20px",
    marginBottom: "10px",
    backgroundColor: "#007bff",
    borderRadius: "5px",
    borderColor: "#007bff",
    fontSize: "16px",
    padding: "10px 20px",
    fontWeight: "bold",
    color: "#fff",
  };

  const cancelButtonStyle: React.CSSProperties = {
    marginRight: "20px",
    marginTop: "20px",

    borderColor: "#dc3545",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "16px",
    padding: "10px 65px",
    fontWeight: "bold",
  };

  const formGroupStyle: React.CSSProperties = { marginBottom: "20px" };

  const labelStyle: React.CSSProperties = { fontWeight: "bold", color: "#333" };

  const drugContainerStyle: React.CSSProperties = {
    padding: "10px",
    marginBottom: "15px",
    backgroundColor: "#e9ecef",
    borderRadius: "10px",
    border: "2px solid #007bff",
  };

  const inputStyle: React.CSSProperties = {
    padding: "10px",
    borderRadius: "10px",
    transition: "border-color 0.3s ease",
    border: "2px solid #ced4da",
  };

  const inputFocusStyle: React.CSSProperties = {
    border: "2px solid #007bff",
    outline: "none",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Update Prescription Form</h1>
      {message && (
        <Alert variant={message.includes("success") ? "success" : "danger"}>
          {message}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="prescriptionId" style={formGroupStyle}>
          <Form.Label style={labelStyle}>Prescription ID</Form.Label>
          <Form.Control
            type="text"
            name="prescriptionId"
            value={diagnosis.prescriptionId}
            onChange={handleChange}
            isInvalid={!!validationErrors.prescriptionId}
            required
            style={
              focusedFields["prescriptionId"] ? inputFocusStyle : inputStyle
            }
            onFocus={() => handleFocus("prescriptionId")}
            onBlur={() => handleBlur("prescriptionId")}
          />
          {validationErrors.prescriptionId && (
            <Form.Control.Feedback type="invalid">
              {validationErrors.prescriptionId.join(', ')}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="prescriptionDate" style={formGroupStyle}>
          <Form.Label style={labelStyle}>Prescription Date</Form.Label>
          <Form.Control
            type="date"
            name="prescriptionDate"
            value={diagnosis.prescriptionDate.split("T")[0]}
            onChange={handleChange}
            required
            style={
              focusedFields["prescriptionDate"] ? inputFocusStyle : inputStyle
            }
            onFocus={() => handleFocus("prescriptionDate")}
            onBlur={() => handleBlur("prescriptionDate")}
          />
        </Form.Group>

        <Form.Group controlId="symptoms" style={formGroupStyle}>
          <Form.Label style={labelStyle}>Symptoms</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="symptoms"
            value={diagnosis.symptoms}
            onChange={handleChange}
            isInvalid={!!validationErrors.symptoms}
            required
            style={{ ...inputStyle, resize: "none" }}
            onFocus={() => handleFocus("symptoms")}
            onBlur={() => handleBlur("symptoms")}
          />
          {validationErrors.symptoms && (
            <Form.Control.Feedback type="invalid">
              {validationErrors.symptoms.join(', ')}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="diagnosis" style={formGroupStyle}>
          <Form.Label style={labelStyle}>Diagnosis</Form.Label>
          <Form.Control
            type="text"
            name="diagnosis"
            value={diagnosis.diagnosis}
            onChange={handleChange}
            isInvalid={!!validationErrors.diagnosis}
            required
            style={focusedFields["diagnosis"] ? inputFocusStyle : inputStyle}
            onFocus={() => handleFocus("diagnosis")}
            onBlur={() => handleBlur("diagnosis")}
          />
          {validationErrors.diagnosis && (
            <Form.Control.Feedback type="invalid">
              {validationErrors.diagnosis.join(', ')}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        {diagnosis.drugs.map((drug, index) => (
          <div key={index} style={drugContainerStyle}>
            <h5>Drug {index + 1}</h5>
            <Form.Group controlId={`drugName-${index}`} style={formGroupStyle}>
              <Form.Label style={labelStyle}>Drug Name</Form.Label>
              <Form.Control
                type="text"
                name="drugName"
                value={drug.drugName}
                onChange={(e) => handleChange(e, index)}
                required
                style={
                  focusedFields[`drugName-${index}`]
                    ? inputFocusStyle
                    : inputStyle
                }
                onFocus={() => handleFocus(`drugName-${index}`)}
                onBlur={() => handleBlur(`drugName-${index}`)}
              />
            </Form.Group>

            <Form.Group controlId={`dosage-${index}`} style={formGroupStyle}>
              <Form.Label style={labelStyle}>Dosage</Form.Label>
              <Form.Control
                type="text"
                name="dosage"
                value={drug.dosage}
                onChange={(e) => handleChange(e, index)}
                required
                style={
                  focusedFields[`dosage-${index}`]
                    ? inputFocusStyle
                    : inputStyle
                }
                onFocus={() => handleFocus(`dosage-${index}`)}
                onBlur={() => handleBlur(`dosage-${index}`)}
              />
            </Form.Group>

            <Form.Group controlId={`frequency-${index}`} style={formGroupStyle}>
              <Form.Label style={labelStyle}>Frequency</Form.Label>
              <Form.Control
                type="text"
                name="frequency"
                value={drug.frequency}
                onChange={(e) => handleChange(e, index)}
                required
                style={
                  focusedFields[`frequency-${index}`]
                    ? inputFocusStyle
                    : inputStyle
                }
                onFocus={() => handleFocus(`frequency-${index}`)}
                onBlur={() => handleBlur(`frequency-${index}`)}
              />
            </Form.Group>
            <Button
              variant="danger"
              onClick={() => handleRemoveDrug(index)}
              style={{ marginBottom: "10px", borderRadius: "5px" }}
            >
              Remove Drug
            </Button>
          </div>
        ))}
        <Button
          variant="primary"
          onClick={handleAddDrug}
          style={{ marginBottom: "20px", borderRadius: "5px" }}
        >
          Add Drug
        </Button>

        <Form.Group controlId="duration" style={formGroupStyle}>
          <Form.Label style={labelStyle}>Duration</Form.Label>
          <Form.Control
            type="text"
            name="duration"
            value={diagnosis.duration}
            onChange={handleChange}
            required
            style={focusedFields["duration"] ? inputFocusStyle : inputStyle}
            onFocus={() => handleFocus("duration")}
            onBlur={() => handleBlur("duration")}
          />
        </Form.Group>

        <Form.Group controlId="additionalNotes" style={formGroupStyle}>
          <Form.Label style={labelStyle}>Additional Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="additionalNotes"
            value={diagnosis.additionalNotes}
            onChange={handleChange}
            style={{ ...inputStyle, resize: "none" }}
            onFocus={() => handleFocus("additionalNotes")}
            onBlur={() => handleBlur("additionalNotes")}
          />
        </Form.Group>

        <Row>
          <Col>
            <Button variant="primary" type="submit" style={buttonStyle}>
              Update Diagnosis
            </Button>
          </Col>
          <Col>
            <Button
              variant="danger"
              onClick={handleCancel}
              style={cancelButtonStyle}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default UpdateDiagnosisPage;
