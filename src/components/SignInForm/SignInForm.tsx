import * as React from 'react';
import './SignInForm.css';
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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormValues } from '../../redux/constants';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Nguyen Dinh Trung
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

// Validate
const schemaSignUp = yup.object().shape({
  email: yup.string().required("Please fill out this field!")
            .matches(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              "Please enter the correct format!"
            ),
  password: yup
    .string()
    .required("Please fill out this field!")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Mật khẩu phải có 8 ký tự trở lên, 1 số, 1 chữ in hoa, 1 ký tự đặc biệt!"
    ),
});
// 
export default function SignInForm() {
  
  const [show, setShow] = React.useState<string>("password");
  let navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schemaSignUp),
  });

  const onSubmit = async(data: FormValues) => {
    localStorage.clear();
    localStorage.setItem('cart', '[]');
       try {
      const user = await signInWithEmailAndPassword(
        auth,
        `${data.email}`,
        `${data.password}`
      );
      console.log('user',user.user);
      // localStorage.setItem('user', JSON.stringify(user))
      if(user?.user?.email === "trung@gmail.com"){
        localStorage.setItem('admin', JSON.stringify(user.user));
        localStorage.setItem('user', JSON.stringify(user.user));
        
        navigate("/admin/food")
      }else{
        localStorage.setItem('user', JSON.stringify(user.user));
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   localStorage.clear();

  //   const data = new FormData(event.currentTarget);
  //   try {
  //     const user = await signInWithEmailAndPassword(
  //       auth,
  //       `${data.get('email')}`,
  //       `${data.get('password')}`
  //     );
  //     console.log('user',user.user);
  //     // localStorage.setItem('user', JSON.stringify(user))
  //     if(user?.user?.email === "trung@gmail.com"){
  //       localStorage.setItem('admin', JSON.stringify(user.user));
  //       localStorage.setItem('user', JSON.stringify(user.user));
  //       navigate("/admin/food")
  //     }else{
  //       localStorage.setItem('user', JSON.stringify(user.user));
  //       navigate('/')
  //     }
      
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // };
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
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
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
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
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