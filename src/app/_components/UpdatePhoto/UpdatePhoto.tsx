"use client";
import {
  Avatar,
  Button,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { getCookie } from "cookies-next/client";
import toast from "react-hot-toast";
import { store } from "@/lib/Redux/store";
import { getUserData } from "@/lib/Redux/slices/userSlice";

export default function UpdatePhoto() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const { user } = useSelector(
    (store: { userReducer: UserSlice }) => store.userReducer
  );
  const formik = useFormik({
    initialValues: {photo:""},
    onSubmit: (values , {resetForm}) => {
      const formData = new FormData;
      if(values.photo){
        formData.append("photo",values.photo)
      
      axios.put("https://linked-posts.routemisr.com/users/upload-photo",formData,{
        headers:{
          token:getCookie("token")
        }
      }).then(({data})=>{
        toast.success("update image successfully")
        dispatch(getUserData())
        resetForm()
      }).catch((error)=>{
        console.log(error);
        
      })
    }
    },
  });
  const handleImageChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.currentTarget.files){
      formik.setFieldValue("photo",e.currentTarget.files?.[0])
    }
  }
  return (
    <Paper elevation={2} sx={{ padding: 2 }}>
      <form onSubmit={formik.handleSubmit}>
        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          sx={{ marginBottom: 2 }}
        >
          <Avatar sx={{ bgcolor: "red" }} src={user?.photo} />
          <Typography>update photo</Typography>
        </Stack>
        <label htmlFor="image-input">
          <IconButton component={"span"} color="primary">
            Upload image <CloudUploadIcon sx={{marginLeft:1 , marginBottom:"3px"}} />
          </IconButton>
        </label>
        <input type="file" id="image-input" hidden name="photo" onChange={handleImageChange} />
        <Button sx={{marginLeft:2}} type="submit" variant="contained">update</Button>
      </form>
    </Paper>
  );
}
