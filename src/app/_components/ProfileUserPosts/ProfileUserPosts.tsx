"use client"
import axios from 'axios'
import { getCookie } from 'cookies-next/client'
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CircularProgress, Collapse, IconButton, IconButtonProps, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from 'next/image';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import Comment from '../Comment/Comment';
import toast from 'react-hot-toast';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));
export default function ProfileUserPosts() {
  const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };
  const [userPosts,setUserPosts]=useState<PostI[]>([])
  const [isLoading,setIsLoading]=useState(true)
  useEffect(()=>{
    const token = getCookie("token");
    if(!token) return
    const userId = (jwtDecode(token) as { user: string }).user;
    console.log(userId);
    
    const getUserPosts = async ()=>{
      await axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts?limit=6`,{
        headers:{
          token:getCookie("token")
        }
      })
      .then(({data})=>{
        setUserPosts(data.posts)
        setIsLoading(false)
        console.log(data.posts);
      }).catch((error)=>{
        console.log(error);
        
      })
    }
  getUserPosts()
  },[])

  async function deletePost(postId:string){
    await axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`,{
      headers:{
        token:getCookie("token")
      }
    })
    .then(({data})=>{
      // console.log(data);
      toast.success("Post deleted successfully")
      setUserPosts((prevPosts)=>prevPosts.filter(post=>post._id!==postId))
    })
    .catch((error)=>{
      console.log(error);
      
    })
  }

  if(isLoading){
    return(
        <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
          <CircularProgress size="3rem" />
        </Box>
        )
  }
  return <>
  {userPosts && userPosts.length > 0 ? (
  userPosts.map((post) => (
    <Card key={post._id} sx={{width:{md:"55%",xs:"90%"}, margin:"auto",marginBottom:4,marginTop:3,paddingTop:3}}>
      <CardHeader
        avatar={<Avatar aria-label="recipe" src={post.user.photo} />}
        action={
          <IconButton aria-label="settings">
            <DeleteIcon onClick={()=>{deletePost(post._id)}} sx={{":hover":{color:"red"}}}/>
          </IconButton>
        }
        title={post.user.name}
        subheader={new Date(post.createdAt).toLocaleString()}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {post.body}
        </Typography>
        {post.user.photo && (
          <Box sx={{ position: "relative", height: { md: "500px", xs: "300px" } }}>
            <Image src={post.user.photo} alt={post.body} fill />
          </Box>
        )}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <Link href={`post/${post._id}`}>
            <CommentIcon sx={{ marginTop: 1, color: "gray" }} />
          </Link>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {
          post.comments.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))}
      </Collapse>
    </Card>
  ))
) : (
  <Typography>No posts</Typography>
)}
  </>
}
