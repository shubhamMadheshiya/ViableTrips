import React, { useState, useEffect } from "react";
import {
  CheckCircleOutline,
  CloudUpload,
  Downloading,
} from "@mui/icons-material";
import { Button, Stack, TextField, CircularProgress } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetFormData, updateFormData } from "./buddySlice";
import { useSubmitFormDataMutation } from "./buddyApi";
import Alert from "@mui/material/Alert";
import { app } from "../../firebase/firebase";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";

const Verification = () => {
  const navigate = useNavigate();
  const setStepsNo = useOutletContext();
  const [active, setActive] = useState(false)
  const dispatch = useDispatch();
  const [submitFormData, {isSuccess, isLoading, isError , error}] = useSubmitFormDataMutation();
  const [imagePercent, setImagePercent] = useState({
    file1: 0,
    file2: 0,
  });

  console.log(`my isError is ${isError} my isLOading is ${isLoading} my error is ${error}`)
  console.log(error)

  const [imageError, setImageError] = useState({ file1: false, file2: false });
  const data = useSelector((state) => state.contact.formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ ...data, [name]: value }));
  };

  const handleBankAccountNumberChange = (event) => {
    dispatch(
      updateFormData({
        ...data,
        bankAccountNumber: {
          ...data.bankAccountNumber,
          accNo: event.target.value,
        },
      })
    );
  };

  const handleIFSCCodeChange = (event) => {
    dispatch(
      updateFormData({
        ...data,
        bankAccountNumber: {
          ...data.bankAccountNumber,
          ifsc: event.target.value,
        },
      })
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const {name} = e.target
   

    if (!file) return; // No file selected

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please select a JPEG or PNG file.");
      return;
    }

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent({ ...imagePercent, [name]: Math.round(progress) });
      },
      (error) => {
        setImageError({ ...imageError, [name]:true });
        console.error("File upload error:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          dispatch(
            updateFormData({
              ...data,
              [name]: downloadURL,
            })
          );
        });
      }
    );
  };

  


useEffect(() => {
  if (isSuccess) {
    navigate("/"); // Navigate to home page only if success
  } else if (isError) {
    console.log(error.data.message)
    alert(error.data.message);
  }
}, [isSuccess, isError, navigate, error]);



  useEffect(() => {
    setStepsNo(2);
  }, []);

const handleFormSubmit = async (e) => {
  e.preventDefault();

  // Check if both files are uploaded
  if (!data.file1 || !data.file2) {
    alert("Please upload both files.");
    return; // Prevent form submission
  }

 

  try {
    const res = await submitFormData(data);
    console.log(res)
   
  } catch (error) {
    console.log(error)
   
  }

};




  return (
    <Stack
      component="form"
      alignItems="center"
      spacing={4}
      useFlexGap
      onSubmit={handleFormSubmit}
    >
      <TextField
        id="bankAccountNumber"
        label="Bank Account Number"
        variant="outlined"
        fullWidth
        type="number" // Specify the input type as "number"
        value={data.bankAccountNumber.accNo}
        onChange={handleBankAccountNumberChange}
        required // Make input required
      />
      <TextField
        id="ifscCode"
        label="IFSC Code"
        variant="outlined"
        fullWidth
        value={data.bankAccountNumber.ifsc}
        onChange={handleIFSCCodeChange}
        required // Make input required
      />

      {/* File upload boxes */}
      {/* You can style these boxes using CSS */}
      <Stack
        width={"95%"}
        color="text.light"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          border: "1px solid #0005",
          borderRadius: "0.4em",
          borderStyle: "dashed",
        }}
        p={2}
      >
        <label htmlFor="file1">
          <Stack
            direction="row"
            spacing={2}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            alignItems="center"
          >
            <CloudUpload color="inherit" />
            <h4>
              Drag and Drop file here <span> or Choose File</span>{" "}
            </h4>
          </Stack>
          <input
            id="file1"
            type="file"
            name="file1"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*" // Accept only images and PDFs
           
          />
        </label>

        {data.file1 !== null ? (
          <CheckCircleOutline color="success" />
        ) : (
          <CircularProgress
            color="warning"
            variant="determinate"
            size={20}
            value={imagePercent.file1}
          />
        )}
      </Stack>

      <Stack
        useFlexGap
        color="text.light"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          border: "1px solid #0005",
          borderRadius: "0.4em",
          borderStyle: "dashed",
          width: "95%",
        }}
        p={2}
      >
        <label htmlFor="file2">
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <CloudUpload color="inherit" />
            <h4>
              Drag and Drop file here <span> or Choose File</span>{" "}
            </h4>
          </Stack>
          <input
            id="file2"
            type="file"
            name="file2"
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*, application/pdf" // Accept only images and PDFs
           
          />
        </label>
        {data.file2 !== null ? (
          <CheckCircleOutline color="success" />
        ) : (
          <CircularProgress
            color="warning"
            size={20}
            variant="determinate"
            value={imagePercent.file2}
          />
        )}

        
      </Stack>

      <Stack fullWidth direction="row" spacing={4}>
        <Button variant="text" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button sx={{ color: "white" }} variant="contained" type="submit">
          {isLoading ? <CircularProgress sx={{color:'white'}} size={15} /> : "Finish "}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Verification;
