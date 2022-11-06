import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { checkingAuthentication, startGoogleSingIn, startLoginWithEmailPassword } from "../../store/auth/thunks";
import { AuthLayout } from "../layout/AuthLayout";


const formDate = {
  email:'',
  password:''
}

export const LoginPage = () => {

  const {status,errorMessage} = useSelector(state => state.auth)
  
  const dispatch = useDispatch()
  const{email,password,onInputChange,formState}=useForm(formDate)

  const isAuthenticating = useMemo(() => status === 'checking',[status])

  const onSubmit=(event)=>{
    event.preventDefault();

    // dispatch(checkingAuthentication(email,password));

    dispatch(startLoginWithEmailPassword(formState))
  }

  const onGoogleSingIn = ()=>{
    dispatch(startGoogleSingIn());
  }


  return (
    <AuthLayout title="Login">

          <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField
                  label="Correo"
                  type="email"
                  placeholder="correo@google.com"
                  fullWidth
                  name="email"
                  value={email}
                  onChange={onInputChange}
                  />
              </Grid>
              <Grid item xs={12} sx={{mt:2}}>
                <TextField
                  label="Contraseña"
                  type="password"
                  placeholder="Contraseña"
                  fullWidth
                  name="password"
                  value={password}
                  onChange={onInputChange}
                  />
              </Grid>
              <Grid
                container
                spacing={2}
                sx={{mb:2}}
                >
                <Grid item xs={12} sx={{mt:2}} display={!!errorMessage ? '':'none'}>
                    <Alert severity="error">{errorMessage}</Alert>
                </Grid>
                <Grid item xs={12} md={6} sx={{mt:2}}>
                  <Button 
                    disabled={isAuthenticating}
                    variant="contained" 
                    fullWidth 
                    type="submit" >
                    Login
                  </Button>
                </Grid>
                <Grid item xs={12} md={6} sx={{mt:2}}>
                  <Button
                    disabled={isAuthenticating} 
                    variant="contained" 
                    fullWidth 
                    onClick={onGoogleSingIn}
                    >
                    <Google/>
                    <Typography sx={{ml:1,mt:0.3}}>Google</Typography>
                  </Button>
                </Grid>
              </Grid>
              <Grid container direction='row' justifyContent='end'>
                <Link component={RouterLink} color='inherit' to="/auth/register">
                  Crear una cuenta
                </Link>
              </Grid>
            </Grid>
          </form>
    </AuthLayout>
  )
}
