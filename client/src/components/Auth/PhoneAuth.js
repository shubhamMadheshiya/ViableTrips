import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Box,
  Typography,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
  useRegisterUserMutation,
} from "./authApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserCredentials,
  setTokenCredentials,
  selectCurrentToken,
} from "./authSlice";
import { Navigate, useNavigate } from "react-router-dom";


const PhoneAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token,setToken] = useState(null)
  const [formData, setFormData] = useState({ email: "", name: "" });
  const [otp, setOTP] = useState("");
  const [step, setStep] = useState(0); // 0: enter phone number, 1: enter OTP, 2: registration
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [persist, setPersist] = useState(false);
  const [sendOTP, { isLoading: isSending, isError:isSendingError, error:sendingError,isSuccess:sendingSuccess }] = useSendOTPMutation();
  const [verifyOTP, {data:verifyData ,isLoading: isVerifying ,isError:isVerifyingError, error:verifingError, isSuccess:verifingSuccess}] = useVerifyOTPMutation();
  const [registerUser, {data:registerData, isLoading: isRegistering, isError:isRegisterError, error:registerErrorMessage, isSuccess:isRegisteringSuccess }] =
    useRegisterUserMutation();

     const tokenInSlice = useSelector(selectCurrentToken);


    useEffect(()=>{
      if(sendingSuccess){
           setSnackbarMessage("OTP sent successfully!");
           setSnackbarSeverity("success");
           setOpenSnackbar(true);
           setStep(1);
      }
      if(isSendingError){
         setSnackbarMessage("Error checking phone number. Please try again.");
         setSnackbarSeverity("error");
         setOpenSnackbar(true);
      }

    },[sendingSuccess,isSendingError,sendingError]);

    useEffect(() => {
      if (verifingSuccess) {
        console.log(verifyData)
      if(verifyData?.user?.name){
        dispatch(setUserCredentials(verifyData.user));
        dispatch(setTokenCredentials(verifyData.accessToken));
        navigate("/", { replace: true });
      }else{
        setToken(verifyData.accessToken);
        //  dispatch(setUserCredentials(verifyData.user));
        //  dispatch(setTokenCredentials(verifyData.accessToken));
         setStep(2);
      }
        setSnackbarMessage("OTP verified successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      }

      if(isVerifyingError){
         setSnackbarMessage("Error verifying OTP. Please try again.");
         setSnackbarSeverity("error");
         setOpenSnackbar(true);
      }
    }, [isVerifyingError, verifingError, verifingSuccess, verifyData]);


    useEffect(() => {
      if(isRegisteringSuccess){
         dispatch(setUserCredentials(registerData.user));
         dispatch(setTokenCredentials(registerData.accessToken));
         navigate("/", { replace: true });
         setSnackbarMessage("User registered successfully!");
         setSnackbarSeverity("success");
         setOpenSnackbar(true);
      }
      if(isRegisterError){
        setSnackbarMessage("Error registering user. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);

      }
    }, [
      registerData,
      isRegisterError,
      registerErrorMessage,
      isRegisteringSuccess,
    ]);

  const handlePhoneSubmit = async () => {
    try {
      const response = await sendOTP(phoneNumber);
    } catch (error) {
      console.log(error)
    }
  };

  const handleOTPSubmit = async () => {
    try {
      const response = await verifyOTP({ phoneNumber, otp });
    } catch (error) {
      console.log(error)
    }
  };

  const handleRegistration = async () => {
    
    try {
      const response = await registerUser({ phoneNumber, token, ...formData });
    } catch (error) {
      console.log(error)
    }
  };

  const handleToggle = () => setPersist((prev) => !prev);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  
   return ( 
    <Box maxWidth={400} mx="auto" mt={4}>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {step === 0 && (
        <Box>
          <TextField
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            variant="outlined"
            fullWidth
            mb={2}
          />
          <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust This Device
          </label>
          <Button
            onClick={handlePhoneSubmit}
            disabled={isSending}
            variant="contained"
          >
            {isSending ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Box>
      )}
      {step === 1 && (
        <Box>
          <TextField
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            variant="outlined"
            fullWidth
            mb={2}
          />
          <Button
            onClick={handleOTPSubmit}
            disabled={isVerifying}
            variant="contained"
          >
            {isVerifying ? <CircularProgress size={24} /> : "Verify OTP"}
          </Button>
        </Box>
      )}
      {step === 2 && (
        <Box>
          <Typography variant="h6" mb={2}>
            Registration
          </Typography>
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            variant="outlined"
            fullWidth
            mb={2}
          />
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            variant="outlined"
            fullWidth
            mb={2}
          />
          <Button
            onClick={handleRegistration}
            disabled={isRegistering}
            variant="contained"
          >
            {isRegistering ? <CircularProgress size={24} /> : "Register"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PhoneAuth;
