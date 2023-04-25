import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material"
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuthForm = () => {
  const users = useSelector(state => state.usersReducer.users)
  const theme = createTheme();
  const [noUser, setNoUser] = useState(false);

  function makeid() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < 64) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const checkUser = (userData) => {
    users.some(e => {
      if (e.login === userData.login && e.password === userData.password) {
        localStorage.setItem('userKey', makeid())
        return;
      } else {
        setNoUser(true)
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    checkUser({
      login: data.get('login'),
      password: data.get('password'),
    })
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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to={'/signUp'}>
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            {noUser && (
              <Box>
                <Typography component="h2" variant="h6">
                  This user doesn't exist, please <Link to={'/signUp'}>Sign up</Link>
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export { AuthForm }