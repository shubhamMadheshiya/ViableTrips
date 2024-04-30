import styled from "@emotion/styled";
import Loading from "../assets/Loading";
import { app } from "../firebase/firebase";

import CameraIcon from "@mui/icons-material/Camera";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  Avatar,
  Badge,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

// import Camera from "../img/join/camera.svg";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../components/Auth/authSlice";
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserQuery,
} from "../components/User/userApi";
import { CloudUpload, CloudUploadOutlined, Delete, DeleteOutline, Settings } from "@mui/icons-material";

 const SmallAvatar = styled(Avatar)(({ theme }) => ({
   width: 40,
   height: 40,
   border: `2px solid `,
 }));

const MyProfile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const currentUser = useSelector(selectCurrentUser);
  const {
    data: myData,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery(currentUser?.id);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profileUrl: "",
  });
  const [isChanged, setIsChanged] = useState(false);
  const inputRef = useRef()
   const open = Boolean(anchorEl);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const [imagePercent, setImagePercent] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  useEffect(() => {
    if (myData) {
      setUserData({
        name: myData.name,
        email: myData.email,
        profileUrl: myData.profileUrl ,
      });
    }
  }, [myData]);

  useEffect(() => {
    setIsChanged(
      userData.name !== myData?.name ||
        userData.email !== myData?.email ||
        userData.profileUrl !== myData?.profileUrl
    );
  }, [userData, myData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({ userData, id: currentUser.id });
      setSnackbarMessage("Profile updated successfully!");
      setSnackbarSeverity("success");
    } catch (error) {
      setSnackbarMessage("Failed to update profile!");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

 
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

















    const handleUpdatePic = (e) => {
      // const input = document.createElement("input");
      // input.type = "file";
      // input.accept = "image/jpeg, image/png"; // Specify accepted file types
      const file = e.target.files[0];
      if (!file) return;

      const storage = getStorage(app);

      // Delete the existing file if it exists
      if (userData.profileUrl) {
        const oldFileRef = ref(storage, userData.profileUrl);
        deleteObject(oldFileRef).catch((error) => {
          console.error("Error removing old profile picture: ", error);
        });
      }

      // File upload process
      const fileName = `${new Date().getTime()}-${file.name}`;
      const newFileRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(newFileRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImagePercent(Math.round(progress));
        },
        (error) => {
          console.error("Upload error: ", error);
          setSnackbarMessage("Failed to upload profile picture.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUserData({ ...userData, profileUrl: downloadURL });
            setSnackbarMessage("Profile picture updated successfully.");
            setSnackbarSeverity("success");
            setSnackbarOpen(true);
          });
        }
      );
      setAnchorEl(null);
    };

    const handleDeletePic = () => {
      const storage = getStorage(app);
      const fileRef = ref(storage, userData.profileUrl);
      deleteObject(fileRef)
        .then(() => {
          setUserData({ ...userData, profileUrl: "" });
          setSnackbarMessage("Profile picture deleted successfully.");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
        })
        .catch((error) => {
          console.error("Error deleting profile picture: ", error);
          setSnackbarMessage("Failed to delete profile picture.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        });
        setAnchorEl(null);
    };

    const handleAvatarClick = () => {
      // Open the avatar image
      window.open(userData.profileUrl, "_blank");
    };



    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

      const handleClickButton = () => {
        inputRef.current.click();
      };

  if (isLoading) return <Loading />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    isSuccess && (
      <Container maxWidth="lg">
        <Stack direction="row" flexWrap="wrap" spacing={8} mb={8} p={8}>
          <Stack
            minWidth="400px"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            flex={1}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <SmallAvatar onClick={handleClick}>
                  <CameraIcon />
                </SmallAvatar>
              }
            >
              <Button component="label" sx={{ borderRadius: "1000rem" }}>
                <Avatar
                  onClick={handleAvatarClick}
                  alt="Profile"
                  src={userData.profileUrl}
                  sx={{ width: 180, height: 180 }}
                />

                <Menu
                  id="avatar-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={inputRef}
                    onChange={handleUpdatePic}
                    accept=".jpg, .jpeg, .png"
                  />
                  <MenuItem onClick={handleClickButton}>
                    <ListItemIcon>
                      <CloudUploadOutlined fontSize="small" />
                    </ListItemIcon>
                    Upload Image
                  </MenuItem>

                  <MenuItem
                    sx={{ color: "error.main" }}
                    onClick={handleDeletePic}
                  >
                    <ListItemIcon>
                      <DeleteOutline fontSize="small" color="error" />
                    </ListItemIcon>
                    Delete Image
                  </MenuItem>
                </Menu>
                <CircularProgress
                  variant="determinate"
                  value={imagePercent}
                  size={180} // Adjust this size to fit your Avatar size plus some margin
                  thickness={1} // Adjust the thickness
                  sx={{
                    position: "absolute",
                    zIndex: 1,
                    // color: "green", // Change the color to increase visibility
                  }}
                />
              </Button>
            </Badge>
            <Typography variant="h4">
              Allowed *.jpeg, *.jpg, *.png, max size of 2 MB
            </Typography>
            <Button
              variant="text"
              size="small"
              color="error"
              sx={{ width: "fit-content", textTransform: "none" }}
              onClick={async () => {
                try {
                  await deleteUser({ id: currentUser.id });
                  setSnackbarMessage("Profile deleted successfully!");
                  setSnackbarSeverity("success");
                } catch {
                  setSnackbarMessage("Failed to delete profile!");
                  setSnackbarSeverity("error");
                }
                setSnackbarOpen(true);
              }}
            >
              Delete Profile
            </Button>
          </Stack>
          <Stack spacing={4} flex={1} minWidth="400px" alignItems="center">
            <Typography variant="h1" textAlign="center">
              My Profile
            </Typography>
            <TextField
              fullWidth
              name="name"
              label="Name"
              value={userData.name}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              name="email"
              label="Email"
              value={userData.email}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Mobile Number"
              disabled
              defaultValue={currentUser.phoneNumber}
              variant="outlined"
            />
            <Button
              variant="contained"
              disabled={!isChanged || isUpdating}
              sx={{
                color: "white",
                textTransform: "none",
                width: "fit-content",
              }}
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </Stack>
        </Stack>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    )
  );
};

export default MyProfile;
