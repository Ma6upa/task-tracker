import {
  Box,
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material"
import { Link } from "react-router-dom";

const ErrorComp = () => {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: '#eeeeee',
            border: '1px solid black'
          }}
        >
          <Typography component="h1" variant="h5">
            Ошибка доступа
          </Typography>
          <Typography component="h2" variant="h6" style={{ padding: 10 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Typography>
          <Link to="/">
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Назад
            </Button>
          </Link>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export { ErrorComp }