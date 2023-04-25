import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  CssBaseline,
  Divider,
  Modal,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material"
import { useEffect, useState } from "react"
import styles from '../styles/tasksPage.module.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { NewTask } from "../components/newTask";

const TasksPage = () => {
  const theme = createTheme();
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('userKey')) {
      window.location.pathname = '/error'
    }
  }, [])

  const handleClose = () => {
    setOpenModal(false)
  }

  return (
    <>
      <AppBar position="static" className={styles.header}>
        <Toolbar variant="dense">
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              setOpenModal(true)
            }}
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

      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container component="main" maxWidth="sm">
          <Box className={styles.modal}>
            <NewTask />
          </Box>
        </Container>
      </Modal>
    </>
  )
}

export { TasksPage }