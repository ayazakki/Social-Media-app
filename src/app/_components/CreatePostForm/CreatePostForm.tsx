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
import { useSelector } from "react-redux";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { getCookie } from "cookies-next/client";
import toast from "react-hot-toast";

export default function CreatePostForm() {
  const { user } = useSelector(
    (store: { userReducer: UserSlice }) => store.userReducer
  );
  const formik = useFormik({
    initialValues: { body: "" ,image:""},
    onSubmit: (values , {resetForm}) => {
      const formData = new FormData;
      formData.append("body",values.body)
      if(values.image){
        formData.append("image",values.image)
      }
      axios.post("https://linked-posts.routemisr.com/posts",formData,{
        headers:{
          token:getCookie("token")
        }
      }).then(({data})=>{
        toast.success("post created successfully")
        resetForm()
      }).catch((error)=>{
        console.log(error);
        
      })
    },
  });
  const handleImageChange =(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(e.currentTarget.files){
      formik.setFieldValue("image",e.currentTarget.files?.[0])
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
          <Typography>write a post</Typography>
        </Stack>
        <TextField
          name="body"
          id="body-input"
          onChange={formik.handleChange}
          sx={{ width: "100%", marginBottom: 2 }}
          multiline
          maxRows={6}
          minRows={4}
          value={formik.values.body}
        />
        
        <label htmlFor="image-input">
          <IconButton component={"span"} color="primary">
            Upload image <CloudUploadIcon sx={{marginLeft:1 , marginBottom:"3px"}} />
          </IconButton>
        </label>
        <input type="file" id="image-input" hidden name="image" onChange={handleImageChange} />
        <Button sx={{marginLeft:2}} type="submit" variant="contained">Create</Button>
      </form>
    </Paper>
  );
}
