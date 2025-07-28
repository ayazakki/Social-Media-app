"use client"
import { getAllPosts } from '@/lib/Redux/slices/postSlice'
import { store } from '@/lib/Redux/store'
import { Box, CircularProgress, Container, Stack } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Post from '../Post/Post'
import CreatePostForm from '../CreatePostForm/CreatePostForm'
import UpdatePhoto from '../UpdatePhoto/UpdatePhoto'
import { getCookie } from 'cookies-next/client'
import { useRouter } from 'next/navigation'
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function AllPostsPage() {
  const router=useRouter()
  const dispatch=useDispatch<typeof store.dispatch>()
  const {posts,isLoading} = useSelector((store:{postReducer:PostSlice})=>store.postReducer)
  useEffect(()=>{
    dispatch(getAllPosts())
  },[])

  if(isLoading){
    return(
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
      <CircularProgress size="3rem" />
    </Box>
    )
  }
  if(getCookie("token")== undefined){
    router.push("login")
    return true
  }

  return(
    <Container sx={{marginTop:3,paddingTop:2}}>
      <Stack spacing={3} sx={{width:{md:"60%", xs:"90%"}, margin:"auto"}}>
        <UpdatePhoto/>
        <CreatePostForm/>
        {posts?.map((post)=><Post key={post._id} post={post}/>
        )}
      </Stack>
    </Container>
  )
}
