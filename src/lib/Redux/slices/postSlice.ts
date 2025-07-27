import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "cookies-next/client";

export const getAllPosts = createAsyncThunk("postSlice/getAllPosts", () => {
  return axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
    headers: {
      token: getCookie("token"),
    },
  })
  .then(({data})=>data)
});
const initialState:PostSlice = {isLoading:false,posts:null}
const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(getAllPosts.pending,(state)=>{
      state.isLoading=true
    })
    builder.addCase(getAllPosts.fulfilled,(state,action)=>{
      console.log(action.payload);
      state.isLoading=false
      state.posts=action.payload.posts
    })
  },
});
export const postReducer = postSlice.reducer;
