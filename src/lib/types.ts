declare interface UserI {
  _id:string;
  name:string;
  email:string;
  dateOfBirth:string;
  gender:string;
  photo:string;
}

declare interface PostI {
  _id:string;
  body:string;
  image:string;
  user:UserI;
  createdAt:string;
  comments:CommentI[];
}

declare interface CommentI {
  _id:string;
  content:string;
  commentCreator:UserI;
  post:string;
  createdAt:string;
}
declare interface RegisterFormValuesI {
    name:string,
    email:string,
    password:string,
    rePassword:string,
    dateOfBirth:string,
    gender:string,
}
declare interface LoginFormValuesI {
    email:string,
    password:string,
}
declare interface UserSlice {
  user:null | UserI;
}
declare interface PostSlice {
  posts:null | PostI[];
  isLoading:boolean;
}