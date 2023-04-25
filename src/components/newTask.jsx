import {
  Box,
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material"
import styles from '../styles/tasksPage.module.css';

const NewTask = () => {

  const handleSubmit = (event) => {
    console.log(1)
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('name'))
  }

  return (
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
          id="author"
          label="Исполнитель"
          name="author"
        >
          <MenuItem value={'1'}>1</MenuItem>
          <MenuItem value={'2'}>2</MenuItem>
          <MenuItem value={'3'}>3</MenuItem>
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
          <MenuItem value={'1'}>В очереди</MenuItem>
          <MenuItem value={'2'}>В работе</MenuItem>
          <MenuItem value={'3'}>Выполнено</MenuItem>
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
  )
}

export { NewTask }