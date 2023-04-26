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
  const [openModalNew, setOpenModalNew] = useState(false)
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [tasksInQueue, setTasksInQueue] = useState(tasks.filter(task => task.taskState === "В очереди"))
  const [tasksInProgress, setTasksInProgress] = useState(tasks.filter(task => task.taskState === "В работе"))
  const [tasksDone, setTasksDone] = useState(tasks.filter(task => task.taskState === "Выполнено"))
  const [taskId, setTaskId] = useState(0)

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

  const removeTask = (task) => {
    dispatch({ type: "REMOVE_TASK", payload: task })
  }

  const editTask = (task) => {
    dispatch({ type: "EDIT_TASK", payload: task })
  }

  const handleSubmitNew = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const task = {
      id: Date.now(),
      name: data.get('name'),
      executor: data.get('executor'),
      description: data.get('description'),
      taskState: data.get('taskState'),
      priority: data.get('priority')
    }
    addTask(task)
    setOpenModalNew(false)
  }

  const handleSubmitEdit = (event) => {
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
    setOpenModalNew(false)
  }

  const handleClose = () => {
    setOpenModalNew(false)
  }

  const handleCloseEdit = () => {
    setOpenModalEdit(false)
  }

  return (
    <>
      <AppBar position="static" className={styles.header}>
        <Toolbar variant="dense">
          <Button
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              setOpenModalNew(true)
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
                {tasksInQueue.map((item, index) => (
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                    onClick={() => {
                      setTaskId(index)
                      setOpenModalEdit(true)
                    }}
                  >
                    <Task task={item} key={item.id} />
                  </div>
                ))}
              </Box>
            </Card>
            <Card variant="outlined" className={styles.tasksWrapper}>
              <Typography variant="h6" className={styles.tasksHeader}>
                В работе
              </Typography>
              <Divider />
              <Box className={styles.tasksItems}>
                {tasksInProgress.map((item) => (
                  <Task task={item} key={item.id} />
                ))}
              </Box>
            </Card>
            <Card variant="outlined" className={styles.tasksWrapper}>
              <Typography variant="h6" className={styles.tasksHeader}>
                Выполнено
              </Typography>
              <Divider />
              <Box className={styles.tasksItems}>
                {tasksDone.map((item) => (
                  <Task task={item} key={item.id} />
                ))}
              </Box>
            </Card>
          </Box>
        </Container>
      </ThemeProvider>

      <Modal
        open={openModalNew}
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
                onSubmit={handleSubmitNew}
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
                    <MenuItem key={item.id} value={item.login}>
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
                  <MenuItem value={'В очереди'} key={'В очереди'}>В очереди</MenuItem>
                  <MenuItem value={'В работе'} key={'В работе'}> В работе</MenuItem>
                  <MenuItem value={'Выполнено'} key={'Выполнено'}>Выполнено</MenuItem>
                </TextField>
                <TextField
                  select
                  margin="normal"
                  fullWidth
                  id="priority"
                  label="Приоритет"
                  name="priority"
                >
                  <MenuItem value={'1'} key={1}>Обычный</MenuItem>
                  <MenuItem value={'2'} key={2}>Важно</MenuItem>
                  <MenuItem value={'3'} kay={3}>Срочно</MenuItem>
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
      {tasks[taskId] && (
        <Modal
          open={openModalEdit}
          onClose={handleCloseEdit}
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
                  {tasks[taskId].name}
                </Typography>
                <Divider />
                <Box
                  sx={{
                    width: '90%'
                  }}
                  component="form"
                  onSubmit={handleSubmitEdit}
                  noValidate
                >
                  <TextField
                    id="id"
                    name="id"
                    defaultValue={tasks[taskId].id}
                    disabled
                    style={{
                      display: 'none'
                    }}
                  />
                  <TextField
                    id="name"
                    label="Название"
                    name="name"
                    defaultValue={tasks[taskId].name}
                    disabled
                    style={{
                      display: 'none'
                    }}
                  />
                  <TextField
                    select
                    margin="normal"
                    fullWidth
                    id="executor"
                    label="Исполнитель"
                    name="executor"
                    defaultValue={tasks[taskId].executor}
                    disabled
                  >
                    {users.map(item => (
                      <MenuItem key={item.id} value={item.login}>
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
                    defaultValue={tasks[taskId].description}
                    disabled
                  />
                  <TextField
                    select
                    margin="normal"
                    fullWidth
                    id="taskState"
                    label="Состояние"
                    name="taskState"
                    defaultValue={tasks[taskId].taskState}
                    autoFocus
                  >
                    <MenuItem value={'В очереди'} key={'В очереди'}>В очереди</MenuItem>
                    <MenuItem value={'В работе'} key={'В работе'}> В работе</MenuItem>
                    <MenuItem value={'Выполнено'} key={'Выполнено'}>Выполнено</MenuItem>
                  </TextField>
                  <TextField
                    select
                    margin="normal"
                    fullWidth
                    id="priority"
                    label="Приоритет"
                    name="priority"
                    defaultValue={tasks[taskId].priority}
                  >
                    <MenuItem value={'1'} key={1}>Обычный</MenuItem>
                    <MenuItem value={'2'} key={2}>Важно</MenuItem>
                    <MenuItem value={'3'} key={3}>Срочно</MenuItem>
                  </TextField>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, float: 'right' }}
                  >
                    Сохранить
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 3, mb: 2, float: 'right', mr: 2 }}
                    onClick={() => {
                      setOpenModalEdit(false)
                      removeTask(tasks[taskId].id)
                    }}
                  >
                    Удалить
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Modal>
      )}
    </>
  )
}

export { TasksPage }