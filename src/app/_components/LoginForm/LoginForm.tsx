"use client"
import { getUserData } from '@/lib/Redux/slices/userSlice'
import { store } from '@/lib/Redux/store'
import { Button, Container, Divider, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { setCookie } from 'cookies-next/client'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

export default function LoginForm() {
  const dispatch=useDispatch<typeof store.dispatch>()
  const router=useRouter()
  const initialValues:LoginFormValuesI={
    email:"",
    password:"",
  }
  function handleLogin(values:LoginFormValuesI){
    console.log(values);
    axios.post("https://linked-posts.routemisr.com/users/signin",values)
    .then(({data})=>{
      console.log(data);
      console.log(data.token);
      setCookie("token",data.token)
      toast.success("Login successfully")
      dispatch(getUserData())
      router.push('/')
    })
    .catch((error)=>{
      toast.error(error.response.data.error)
    })
    
  }
  const formik=useFormik<LoginFormValuesI>({
    initialValues,
    onSubmit:handleLogin
  })

  return <>
  <Container>
    <Paper elevation={4} sx={{width:{md:"60%",xs:"95%"},margin:"auto", mt:5,p:3,textAlign:"center"}}>
    <Typography component={"h1"} variant='h6'>Login Form</Typography>
    <Divider sx={{marginBlock:2}}/>
    <form onSubmit={formik.handleSubmit}>
      <TextField onChange={formik.handleChange} id="email-basic" label="user email" variant="outlined" sx={{width:"100%",marginTop:3}} name="email" type='email' />
      <TextField onChange={formik.handleChange} id="password-basic" label="user password" variant="outlined" sx={{width:"100%",marginTop:3}} name="password" type='password' />
      <Button type='submit' variant="contained" sx={{width:"100%",marginTop:2}}>Login</Button>
    </form>
  </Paper>
  </Container>
  </>
}
