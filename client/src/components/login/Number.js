// import React from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import { Divider } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { updateUserData } from "../../store/slice/userSlice";
// import { useSubmitUserDataMutation } from "../../store/slice/userApi";

// const Number = ({ handlers, open, setOpen }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.user.userData);
//   const [submitFormData, { isLoading, isError, error }] =
//     useSubmitUserDataMutation();
//   const { handleClickOpen, handleClose } = handlers;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     dispatch(updateUserData({ ...data, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       console.log('otp sending')
//       const res = await submitFormData(data);
//       // Handle success
//     } catch (error) {
//       console.log(error);
//       // Handle error
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={handleClose}
//      component='form'
//      onSubmit={handleSubmit}
//     >
//       <DialogTitle textAlign="center">Enter Your Mobile Number</DialogTitle>
//       <DialogContent
//         sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}
//       >
//         <TextField
//           id="outlined-basic"
//           label="Type 10 digit..."
//           variant="outlined"
//           fullWidth
//           name="phoneNumber"
//           onChange={handleChange}
//           required
//           helperText="Please Enter 10 digit mobile number to send OTP"
//         />
//         <Divider>or</Divider>
//         <Button
//           variant="outlined"
//           startIcon={
//             <img
//               alt="svgImg"
//               src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCA0OCA0OCI+CjxwYXRoIGZpbGw9IiNGRkMxMDciIGQ9Ik00My42MTEsMjAuMDgzSDQyVjIwSDI0djhoMTEuMzAzYy0xLjY0OSw0LjY1Ny02LjA4LDgtMTEuMzAzLDhjLTYuNjI3LDAtMTItNS4zNzMtMTItMTJjMC02LjYyNyw1LjM3My0xMiwxMi0xMmMzLjA1OSwwLDUuODQyLDEuMTU0LDcuOTYxLDMuMDM5bDUuNjU3LTUuNjU3QzM0LjA0Niw2LjA1MywyOS4yNjgsNCwyNCw0QzEyLjk1NSw0LDQsMTIuOTU1LDQsMjRjMCwxMS4wNDUsOC45NTUsMjAsMjAsMjBjMTEuMDQ1LDAsMjAtOC45NTUsMjAtMjBDNDQsMjIuNjU5LDQzLjg2MiwyMS4zNSw0My42MTEsMjAuMDgzeiI+PC9wYXRoPjxwYXRoIGZpbGw9IiNGRjNEMDAiIGQ9Ik02LjMwNiwxNC42OTFsNi41NzEsNC44MTlDMTQuNjU1LDE1LjEwOCwxOC45NjEsMTIsMjQsMTJjMy4wNTksMCw1Ljg0MiwxLjE1NCw3Ljk2MSwzLjAzOWw1LjY1Ny01LjY1N0MzNC4wNDYsNi4wNTMsMjkuMjY4LDQsMjQsNEMxNi4zMTgsNCw5LjY1Niw4LjMzNyw2LjMwNiwxNC42OTF6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzRDQUY1MCIgZD0iTTI0LDQ0YzUuMTY2LDAsOS44Ni0xLjk3NywxMy40MDktNS4xOTJsLTYuMTktNS4yMzhDMjkuMjExLDM1LjA5MSwyNi43MTUsMzYsMjQsMzZjLTUuMjAyLDAtOS42MTktMy4zMTctMTEuMjgzLTcuOTQ2bC02LjUyMiw1LjAyNUM5LjUwNSwzOS41NTYsMTYuMjI3LDQ0LDI0LDQ0eiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMxOTc2RDIiIGQ9Ik00My42MTEsMjAuMDgzSDQyVjIwSDI0djhoMTEuMzAzYy0wLjc5MiwyLjIzNy0yLjIzMSw0LjE2Ni00LjA4Nyw1LjU3MWMwLjAwMS0wLjAwMSwwLjAwMi0wLjAwMSwwLjAwMy0wLjAwMmw2LjE5LDUuMjM4QzM2Ljk3MSwzOS4yMDUsNDQsMzQsNDQsMjRDNDQsMjIuNjU5LDQzLjg2MiwyMS4zNSw0My42MTEsMjAuMDgzeiI+PC9wYXRoPgo8L3N2Zz4="
//             />
//           }
//           fullWidth
//           sx={{ color: "black", border: "1px solid black" }} // Corrected spelling
//           type="submit" // Removed onSubmit here
//         >
//           Continue with Google
//         </Button>
//       </DialogContent>
//       <DialogActions>
//         <Button
//           type="submit"
//           variant="contained"
//           sx={{ color: "white", bgcolor: "black", mb: 2 }}
//           fullWidth
//         >
//           Send OTP
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default Number;
