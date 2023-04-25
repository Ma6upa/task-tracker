import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect } from "react"
import styles from '../styles/tasksPage.module.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const TasksPage = () => {
  const theme = createTheme();

  useEffect(() => {
    if (!localStorage.getItem('userKey')) {
      window.location.pathname = '/error'
    }
  }, [])

  return (
    <>
      <AppBar position="static" className={styles.header}>
        <Toolbar variant="dense">
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <AddCircleOutlineIcon />  Новая задача
          </Button>
        </Toolbar>
      </AppBar>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Card variant="outlined" className={styles.tasksWrapper}>
              <Typography variant="h6" className={styles.tasksHeader}>
                В очереди
              </Typography>
              <Divider />
            </Card>
            <Card variant="outlined" className={styles.tasksWrapper}>
              <Typography variant="h6" className={styles.tasksHeader}>
                В работе
              </Typography>
              <Divider />
            </Card>
            <Card variant="outlined" className={styles.tasksWrapper}>
              <Typography variant="h6" className={styles.tasksHeader}>
                Выполнено
              </Typography>
              <Divider />
            </Card>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}

export { TasksPage }