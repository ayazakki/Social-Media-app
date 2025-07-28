import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Button, Stack, TextField } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import CommentIcon from '@mui/icons-material/Comment';
import Comment from '../Comment/Comment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { headers } from 'next/headers';
import { getCookie } from 'cookies-next/client';
import axios from 'axios';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
interface Props{
  post:PostI;
  showComment?:boolean;
}

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

export default function Post({post,showComment}:Props) {
  const [commentsExpanded, setCommentsExpanded] = React.useState(false);
  const [addCommentOpen, setAddCommentOpen] = React.useState(false);

  const handleExpandCommentsClick = () => {
  setCommentsExpanded(!commentsExpanded);
};
  const handleAddCommentClick = () => {
  setAddCommentOpen(!addCommentOpen);
};
  async function addComment(values: { content: string; post: string }){
    await axios.post("https://linked-posts.routemisr.com/comments",values,{
      headers:{
        token:getCookie("token")
      }
    }).then(({data})=>{
      // console.log(data);
      toast.success("comment added successfully")
      formik.resetForm();
    }).catch((error)=>{
      console.log(error);
      
    })
  }
  const formik=useFormik({
    initialValues:{
      content:"",
      post:post._id
    },
    onSubmit:addComment,
  })
  return (
    <Card>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={post.user.photo}/>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon/>
          </IconButton>
        }
        title={post.user.name}
        subheader={new Date(post.createdAt).toLocaleString()}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {post.body}
        </Typography>
        {post.image ||post.user.photo?<Box sx={{position:"relative",height:{md:"500px",xs:"300px"}}}>
          <Image src={post.image||post.user.photo} alt={post.body} fill/>
        </Box>:""}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <Link href={`post/${post._id}`}><CommentIcon sx={{marginTop:1,color:"gray"}}/></Link>
        </IconButton>
        <Stack direction={"row"} sx={{marginLeft:"auto"}}>
        <ExpandMore
  expand={addCommentOpen}
  onClick={handleAddCommentClick}
  aria-expanded={addCommentOpen}
  aria-label="add comment"
>
  <AddCircleIcon />
        </ExpandMore>
        <ExpandMore
          expand={commentsExpanded}
          onClick={handleExpandCommentsClick}
          aria-expanded={commentsExpanded}
          aria-label="show comments"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        </Stack>
        
      </CardActions>
      {addCommentOpen && (
        <Box sx={{ p: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField  value={formik.values.content} sx={{width:"70%",marginRight:3}} onChange={formik.handleChange} name="content" type="text" placeholder="Write a comment..." />
          <Button type='submit' variant="contained" sx={{width:"25%",padding:"15px"}}>Add</Button>
          </form>
        </Box>
      )}
      <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
        {showComment &&
          post.comments.slice(0, 15).map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))}
      </Collapse>
    </Card>
  );
}
