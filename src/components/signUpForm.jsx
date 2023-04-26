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
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.usersReducer.users);
  const theme = createTheme();
  const [alreadySingedUp, setAlreadySignedUp] = useState(false)

  const addUser = (userData) => {
    users.some(e => {
      if (e.login === userData.login && e.password === userData.password) {
        setAlreadySignedUp(true)
        return;
      } else {
        dispatch({ type: "ADD_USER", payload: userData })
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    addUser({
      id: Date.now(),
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
            Регистрация
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Логин"
              name="login"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Зарегистрироваться
            </Button>
            <Grid container>
              <Grid item>
                <Link to={'/'}>
                  У вас уже есть аккаунт? Авторизуйтесь
                </Link>
              </Grid>
            </Grid>
            {alreadySingedUp && (
              <Box>
                <Typography component="h2" variant="h6">
                  Данный пользователь уже существует, <Link to={'/'}>авторизуйтесь</Link>
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export { SignUpForm }