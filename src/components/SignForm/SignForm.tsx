import * as React from 'react';
import './SignForm.css';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db} from '../../firebase';
import { addDoc, collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import { FormValues } from '../../redux/constants';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

// Validate

const schemaSignUp = yup.object().shape({
  firstName: yup.string().required("Please fill out this field!"),
  lastName: yup.string().required("Please fill out this field!"),
  email: yup.string().required("Please fill out this field!")
            .matches(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              "Please enter the correct format!"
            ),
  phone: yup.string().required("Please fill out this field!")
            .matches( /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
            "" ),
  password: yup
    .string()
    .required("Please fill out this field!")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must have 8 characters or more, 1 number, 1 uppercase letter, 1 special character!"
    ),
  address: yup.string().required("Please fill out this field!"),
});
// 

export default function SignForm() {

  const [show, setShow] = React.useState<string>("password");
  const navigate = useNavigate();
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schemaSignUp),
  });

  const onSubmit = async(data: FormValues) => {
    console.log('data', data);
    let user: any = null;
    try {
    user = await createUserWithEmailAndPassword(auth, data?.email, data?.password);
    const docRef= doc(db,"users",user?.user.uid);
    
      if(user){
          setDoc(docRef, {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            role: 'user'
        })
      }
      console.log("successfull");
      navigate('/signin');
    } catch (error) {
      console.log(error);
    }
  }

  const onShow = () => {
    if(show == "password"){
      setShow("text");
    }else{
      setShow("password")
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  // name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register("firstName")}
                  error={!!errors?.firstName}
                  helperText={errors?.firstName?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  // name="lastName"
                  autoComplete="family-name"
                  {...register("lastName")}
                  error={!!errors?.lastName}
                  helperText={errors?.lastName?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  // name="email"
                  autoComplete="email"
                  {...register("email")}
                  error={!!errors?.email}
                  helperText={errors?.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  // name="phone"
                  autoComplete="phone-number"
                  {...register("phone")}
                  error={!!errors?.phone}
                  helperText={errors?.phone?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  // name="address"
                  autoComplete="address"
                  {...register("address")}
                error={!!errors?.address}
                helperText={errors?.address?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type={show}
                  id="password"
                  autoComplete="new-password"
                  {...register("password")}
                  error={!!errors?.password}
                  helperText={errors?.password?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" onClick={onShow} />}
                  label="Show password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}