import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  CssBaseline,
  Divider,
  MenuItem,
  Modal,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material"
import { useEffect, useState } from "react"
import styles from '../styles/tasksPage.module.css';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from "react-redux";
import { Task } from "../components/task";

const TasksPage = () => {
  const theme = createTheme();
  const dispatch = useDispatch();
  const users = useSelector(state => state.usersReducer.users);
  const tasks = useSelector(state => state.tasksReducer.tasks);
  const [openModal, setOpenModal] = useState(false)
  const [tasksInQueue, setTasksInQueue] = useState(tasks.filter(task => task.taskState === "В очереди"))
  const [tasksInProgress, setTasksInProgress] = useState(tasks.filter(task => task.taskState === "В работе"))
  const [tasksDone, setTasksDone] = useState(tasks.filter(task => task.taskState === "Выполнено"))

  useEffect(() => {
    setTasksInQueue(tasks.filter(task => task.taskState === "В очереди"))
    setTasksInProgress(tasks.filter(task => task.taskState === "В работе"))
    setTasksDone(tasks.filter(task => task.taskState === "Выполнено"))
  }, [tasks])

  useEffect(() => {
    if (!localStorage.getItem('userKey')) {
      window.location.pathname = '/error'
    }
  }, [])

  const addTask = (task) => {
    dispatch({ type: "ADD_TASK", payload: task })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const task = {
      name: data.get('name'),
      executor: data.get('executor'),
      description: data.get('description'),
      taskState: data.get('taskState'),
      priority: data.get('priority')
    }
    addTask(task)
    setOpenModal(false)
  }

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
              <Box className={styles.tasksItems}>
                {tasksInQueue.map(item => (
                  <Task task={item} />
                ))}
              </Box>
            </Card>
            <Card variant="outlined" className={styles.tasksWrapper}>
              <Typography variant="h6" className={styles.tasksHeader}>
                В работе
              </Typography>
              <Divider />
              <Box className={styles.tasksItems}>
                {tasksInProgress.map(item => (
                  <Task task={item} />
                ))}
              </Box>
            </Card>
            <Card variant="outlined" className={styles.tasksWrapper}>
              <Typography variant="h6" className={styles.tasksHeader}>
                Выполнено
              </Typography>
              <Divider />
              <Box className={styles.tasksItems}>
                {tasksDone.map(item => (
                  <Task task={item} />
                ))}
              </Box>
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6" className={styles.tasksHeader}>
                Новая задача
              </Typography>
              <Divider />
              <Box
                sx={{
                  width: '90%'
                }}
                component="form"
                onSubmit={handleSubmit}
                noValidate
              >
                <TextField
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Название"
                  name="name"
                  autoFocus
                />
                <TextField
                  select
                  margin="normal"
                  fullWidth
                  id="executor"
                  label="Исполнитель"
                  name="executor"
                >
                  {users.map(item => (
                    <MenuItem key={item.login} value={item.login}>
                      {item.login}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  multiline
                  rows={5}
                  margin="normal"
                  fullWidth
                  id="description"
                  label="Описание задачи"
                  name="description"
                />
                <TextField
                  select
                  margin="normal"
                  fullWidth
                  id="taskState"
                  label="Состояние"
                  name="taskState"
                >
                  <MenuItem value={'В очереди'}>В очереди</MenuItem>
                  <MenuItem value={'В работе'}>В работе</MenuItem>
                  <MenuItem value={'Выполнено'}>Выполнено</MenuItem>
                </TextField>
                <TextField
                  select
                  margin="normal"
                  fullWidth
                  id="priority"
                  label="Приоритет"
                  name="priority"
                >
                  <MenuItem value={'1'}>Обычный</MenuItem>
                  <MenuItem value={'2'}>Важно</MenuItem>
                  <MenuItem value={'3'}>Срочно</MenuItem>
                </TextField>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, float: 'right' }}
                >
                  Сохранить
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Modal>
    </>
  )
}

export { TasksPage }