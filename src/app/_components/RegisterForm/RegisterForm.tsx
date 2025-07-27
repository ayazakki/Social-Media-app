"use client"
import { Button, Container, Divider, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'

export default function RegisterForm() {
  const router=useRouter()
  const initialValues:RegisterFormValuesI={
    name:"",
    email:"",
    password:"",
    rePassword:"",
    dateOfBirth:"",
    gender:"",
  }
  function handleRegister(values:RegisterFormValuesI){
    console.log(values);
    axios.post("https://linked-posts.routemisr.com/users/signup",values)
    .then(({data})=>{
      console.log(data);
      toast.success("user registered successfully")
      router.push('/login')
    })
    .catch((error)=>{
      toast.error(error.response.data.error)
    })
    
  }
  const formik=useFormik<RegisterFormValuesI>({
    initialValues,
    onSubmit:handleRegister
  })
  return <>
  <Container>
    <Paper elevation={4} sx={{width:{md:"60%",xs:"95%"},margin:"auto", mt:5,p:3,textAlign:"center"}}>
    <Typography component={"h1"} variant='h6'>Register Form</Typography>
    <Divider sx={{marginBlock:2}}/>
    <form onSubmit={formik.handleSubmit}>
      <TextField onChange={formik.handleChange} id="name-basic" label="user name" variant="outlined" sx={{width:"100%",marginTop:3}} name="name" type='text'/>
      <TextField onChange={formik.handleChange} id="email-basic" label="user email" variant="outlined" sx={{width:"100%",marginTop:3}} name="email" type='email' />
      <TextField onChange={formik.handleChange} id="password-basic" label="user password" variant="outlined" sx={{width:"100%",marginTop:3}} name="password" type='password' />
      <TextField onChange={formik.handleChange} id="rePassword-basic" label="user repassword" variant="outlined" sx={{width:"100%",marginTop:3}} name="rePassword" type='password' />
      <Grid container sx={{marginTop:3}} spacing={2}>
        <Grid size={10}>
          <TextField onChange={formik.handleChange} id="filled-basic" variant="outlined" type='date' name='dateOfBirth' sx={{width:"100%"}}/>
        </Grid>
        <Grid size={2}>
          <Select
          onChange={formik.handleChange}
          value={formik.values.gender}
          sx={{width:"100%"}}
          id="gender-select"
          name="gender"
        >
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
        </Select>
        </Grid>
      </Grid>
      <Button type='submit' variant="contained" sx={{width:"100%",marginTop:2}}>Register</Button>
    </form>
  </Paper>
  </Container>
  </>
}
