"use client"
import { Box, CircularProgress, Container } from '@mui/material'
import axios from 'axios'
import { getCookie } from 'cookies-next/client'
import React, { useEffect, useState } from 'react'
import Post from '../Post/Post'

interface Props{
  id:string
}
export default function SinglePostDetails({id}:Props) {
  const [post,setPost]=useState<PostI|null>(null)
  useEffect(()=>{
    const getPostDetails= async ()=>{
      const {data} = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`,{
        headers:{
          token:getCookie("token")
        }
      })
      setPost(data.post)
      console.log(data);
    }
    getPostDetails()
  },[])
  if(post == null){
    return(
    <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
      <CircularProgress size="3rem" />
    </Box>
    )
  }
  return (
    <Container sx={{width:{md:"55%", xs:"90%"}, margin:"auto", marginTop:2}}>
      <Post post={post as PostI} showComment={true}/>
    </Container>
  )
}
