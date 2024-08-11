//documentSlice.js
import { createSlice } from '@reduxjs/toolkit';


const documentSlice = createSlice({
  name: 'document',
  initialState: {
    content: "",
    users:[]
  },
  reducers: {
    editDocument: (state, action) => {
      state.content = action.payload.data;
    },
    loadDocument: (state, action) => {
      state.content = action.payload;
    },
    openDocument: (state, action) => {
      state.content = action.payload.data;
    },
    closeDocument: (state, action) => {


    },
    editUser: (state, action) => {
      state.users =action.payload.user;
    },
    conect: (state) => {
      state
    },
  },
});

export const { editDocument, loadDocument,openDocument ,conect,editUser,closeDocument} = documentSlice.actions;
export default documentSlice.reducer;
