import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    name: "",
    email: "",
    mobileNumber: "",
    city: "",
    profilePic: null,
    dateOfBirth: null,
    languages: [],
    gender: "",
    smoking: "",
    bankAccountNumber: {
      accNo: null,
      ifsc: "",
    },
    ifscCode: "",
    file1: null,
    file2: null,
  },
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateFormData(state, action) {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData(state, action) {
      state.formData = { ...initialState.formData }; // Use spread to ensure immutability
    },
  },
});

export const { updateFormData, resetFormData } = contactSlice.actions;
export default contactSlice.reducer;
