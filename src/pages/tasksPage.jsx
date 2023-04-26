import {
  AppBar,
  Box,
  Button,
  Card,
  Container,
  CssBaseline,
  Divider,
  IconButton,
  Menu,
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
import MenuIcon from '@mui/icons-material/Menu';
import ImportExportIcon from '@mui/icons-material/ImportExport';
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
  const [tasksMobile, setTasksMobile] = useState(tasksInQueue)
  const [tasksMobileName, setTasksMobileName] = useState("В очереди")
  const [taskId, setTaskId] = useState(0)
  const [displayWidth, setDisplayWidth] = useState(1920)
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    setTasksInQueue(tasks.filter(task => task.taskState === "В очереди"))
    setTasksInProgress(tasks.filter(task => task.taskState === "В работе"))
    setTasksDone(tasks.filter(task => task.taskState === "Выполнено"))
  }, [tasks])

  useEffect(() => {
    if (!localStorage.getItem('userKey')) {
      window.location.pathname = '/error'
    }
    setDisplayWidth(window.innerWidth)
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

  const handleMenu = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

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
      id: tasks[taskId].id,
      name: tasks[taskId].name,
      executor: tasks[taskId].executor,
      description: tasks[taskId].description,
      taskState: data.get('taskState'),
      priority: data.get('priority')
    }
    editTask(task)
    setOpenModalEdit(false)
  }

  const handleClose = () => {
    setOpenModalNew(false)
  }

  const handleCloseEdit = () => {
    setOpenModalEdit(false)
  }

  const handleMenuItem = (tasksState) => {
    if (tasksState === 'inQueue') {
      setTasksMobile(tasksInQueue)
      setTasksMobileName("В очереди")
    }
    if (tasksState === 'inProgress') {
      setTasksMobile(tasksInProgress)
      setTasksMobileName("В работе")
    }
    if (tasksState === 'done') {
      setTasksMobile(tasksDone)
      setTasksMobileName("Выполнено")
    }
    handleCloseMenu()
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
          <div style={{ flexGrow: 1 }}></div>
          {displayWidth < 768 && (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                onClick={handleMenu}
              >
                <MenuIcon style={{ color: "#1976d2" }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={openMenu}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(openMenu)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={(e) => handleMenuItem('inQueue')}>В очереди</MenuItem>
                <MenuItem onClick={(e) => handleMenuItem('inProgress')}>В работе</MenuItem>
                <MenuItem onClick={(e) => handleMenuItem('done')}>Выполнено</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          {displayWidth > 768 ?
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
                  В очереди <ImportExportIcon style={{ marginBottom: -10, float: 'right' }} onClick={() => {
                    setTasksInQueue([...tasksInQueue].reverse())
                  }} />
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
                  В работе <ImportExportIcon style={{ marginBottom: -10, float: 'right' }} onClick={() => {
                    setTasksInProgress([...tasksInProgress].reverse())
                  }} />
                </Typography>
                <Divider />
                <Box className={styles.tasksItems}>
                  {tasksInProgress.map((item, index) => (
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
                  Выполнено <ImportExportIcon style={{ marginBottom: -10, float: 'right' }} onClick={() => {
                    setTasksDone([...tasksDone].reverse())
                  }} />
                </Typography>
                <Divider />
                <Box className={styles.tasksItems}>
                  {tasksDone.map((item, index) => (
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
            </Box>
            :
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Card variant="outlined" className={styles.tasksWrapper} style={{ width: '100%' }}>
                <Typography variant="h6" className={styles.tasksHeader}>
                  {tasksMobileName}
                </Typography>
                <Divider />
                <Box className={styles.tasksItems}>
                  {tasksMobile.map((item, index) => (
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
            </Box>
          }
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
                <Button
                  variant="outlined"
                  sx={{ mt: 3, mb: 2, float: 'right', mr: 2 }}
                  onClick={() => {
                    setOpenModalNew(false)
                  }}
                >
                  Отмена
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
                    select
                    margin="normal"
                    fullWidth
                    id="executor"
                    label="Исполнитель"
                    name="executor"
                    value={tasks[taskId].executor}
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
                    value={tasks[taskId].description}
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