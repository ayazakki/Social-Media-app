import { Avatar, Card, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'

interface Props{
  comment:CommentI
}
export default function Comment({comment}:Props) {
  return (
    <Card sx={{marginTop:2}}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "red" }} aria-label="recipe" src={comment.commentCreator.photo}/>}
        title={comment.commentCreator.name}
        subheader={new Date(comment.createdAt).toLocaleString()}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {comment.content}
        </Typography>
      </CardContent>
    </Card>
  )
}
