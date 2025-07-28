"use client";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import * as YUP from "yup";

export default function RegisterForm() {
  const [errorMsg, setErrorMsg] = useState(null);
  const [succesMsg, setSuccessMsg] = useState(null);
  const router = useRouter();
  const validationSchema = YUP.object().shape({
    name: YUP.string()
      .min(3, "min 3 characters")
      .max(20, "max 10 characters")
      .required("name is required"),
    email: YUP.string()
      .email("email is in-valid")
      .required("email is required"),
    password: YUP.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
        "invalid"
      )
      .required("password is required"),
    rePassword: YUP.string()
      .oneOf(
        [YUP.ref("password")],
        "you should enter the same password that you have entered before"
      )
      .required("rePassword is required"),
    gender: YUP.string()
    .oneOf(["male", "female"], "please select a valid gender")
    .required("gender is required"),

    dateOfBirth: YUP.date()
    .max(new Date(), "date of birth cannot be in the future")
    .required("date of birth is required"),
  });
  const initialValues: RegisterFormValuesI = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    dateOfBirth: "",
    gender: "",
  };
  function handleRegister(values: RegisterFormValuesI) {
    console.log(values);
    axios
      .post("https://linked-posts.routemisr.com/users/signup", values)
      .then(({ data }) => {
        console.log(data);
        toast.success("user registered successfully");
        setSuccessMsg(data.message);
        router.push("/login");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        setErrorMsg(error.response.data.message);
      });
  }
  const formik = useFormik<RegisterFormValuesI>({
    initialValues,
    validationSchema,
    onSubmit: handleRegister,
  });
  return (
    <>
      <Container>
        <Paper
          elevation={4}
          sx={{
            width: { md: "60%", xs: "95%" },
            margin: "auto",
            mt: 5,
            p: 3,
            textAlign: "center",
          }}
        >
          <Typography component={"h1"} variant="h6">
            Register Form
          </Typography>
          <Divider sx={{ marginBlock: 2 }} />
          <form onSubmit={formik.handleSubmit}>
            {errorMsg && succesMsg != "success" ? (
              <Box
                sx={{
                  bgcolor: "#B12C00",
                  borderRadius: "7px",
                  color: "white",
                  padding: "5px",
                  marginTop: 1,
                }}
              >
                {errorMsg}
              </Box>
            ) : null}
            {succesMsg ? (
              <Box
                sx={{
                  bgcolor: "#5E936C",
                  borderRadius: "7px",
                  color: "white",
                  padding: "5px",
                  marginTop: 1,
                }}
              >
                {succesMsg}
              </Box>
            ) : null}
            <TextField
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="name-basic"
              label="user name"
              variant="outlined"
              sx={{ width: "100%", marginTop: 3 }}
              name="name"
              type="text"
            />
            {formik.errors.name && formik.touched.name ? (
              <Alert severity="error" sx={{ mt: 1 }}>
                  {formik.errors.name}
                </Alert>
            ) : null}
            <TextField
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="email-basic"
              label="user email"
              variant="outlined"
              sx={{ width: "100%", marginTop: 3 }}
              name="email"
              type="email"
            />
            {formik.errors.email && formik.touched.email ? (
              <Alert severity="error" sx={{ mt: 1 }}>
                  {formik.errors.email}
                </Alert>
            ) : null}
            <TextField
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="password-basic"
              label="user password"
              variant="outlined"
              sx={{ width: "100%", marginTop: 3 }}
              name="password"
              type="password"
            />
            {formik.errors.password &&
              formik.touched.password &&
              (formik.errors.password === "invalid" ? (
                <Alert
                  severity="error"
                  sx={{ mt: 1, backgroundColor: "#fff5f5" }}
                >
                  <AlertTitle sx={{ fontWeight: "bold" }}>
                    Ensure that these requirements are met:
                  </AlertTitle>
                  <List sx={{ pl: 2 }}>
                    <ListItem disableGutters>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <FiberManualRecordIcon
                          sx={{ fontSize: 8, color: "red" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="At least 8 characters" />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <FiberManualRecordIcon
                          sx={{ fontSize: 8, color: "red" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="At least one uppercase and one lowercase letter" />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <FiberManualRecordIcon
                          sx={{ fontSize: 8, color: "red" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="At least one number" />
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <FiberManualRecordIcon
                          sx={{ fontSize: 8, color: "red" }}
                        />
                      </ListItemIcon>
                      <ListItemText primary="At least one special character (!@#$%^&*)" />
                    </ListItem>
                  </List>
                </Alert>
              ) : (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {formik.errors.password}
                </Alert>
              ))}

            <TextField
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="rePassword-basic"
              label="user repassword"
              variant="outlined"
              sx={{ width: "100%", marginTop: 3 }}
              name="rePassword"
              type="password"
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <Alert severity="error" sx={{ mt: 1 }}>
                  {formik.errors.rePassword}
                </Alert>
            ) : null}
            <Grid container sx={{ marginTop: 3 }} spacing={2}>
              <Grid size={10}>
                <TextField
                  onChange={formik.handleChange}
                  id="filled-basic"
                  variant="outlined"
                  type="date"
                  name="dateOfBirth"
                  sx={{ width: "100%" }}
                />
              </Grid>
              <Grid size={2}>
                <Select
                  onChange={formik.handleChange}
                  value={formik.values.gender}
                  sx={{ width: "100%" }}
                  id="gender-select"
                  name="gender"
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Gender
                  </MenuItem>
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Grid container sx={{ marginTop: 3 }} spacing={2}>
              <Grid size={8}>
              {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? (
                <Alert severity="error" sx={{ mt: 1 }}>
                    {formik.errors.dateOfBirth}
                  </Alert>
              ) : null}
            </Grid>
            <Grid size={4}>
            {formik.errors.gender && formik.touched.gender ? (
              <Alert severity="error" sx={{ mt: 1 }}>
                  {formik.errors.gender}
                </Alert>
            ) : null}
            </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "100%", marginTop: 2 }}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}
