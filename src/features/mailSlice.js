import { createSlice } from '@reduxjs/toolkit';

export const mailSlice = createSlice({
  name: "mail",
  initialState: {
    mail: null,
  },
  reducers: {
    setmail: (state,action) => {
      state.mail = action.payload;
    },
    rmmail : (state) => {
      state.mail=null;
    },
  },
});

export const { setmail , rmmail } = mailSlice.actions;

//selectors
export const selectMail = (state) => state.mail.mail;

export default mailSlice.reducer;