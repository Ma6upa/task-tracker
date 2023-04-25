import {
  Box, 
  Card, 
  Divider, 
  Typography,
} from "@mui/material"

const Task = (props) => {
  const task = props.task
  return (
    <Card style={{
      marginTop: 15,
      width: '80%',
    }}>
      <Box sx={{
        marginLeft: '10%'
      }}>
        <Typography variant="h6" >{task.name}</Typography>
      </Box>
      <Divider />
      <Box sx={{
        marginLeft: '10%'
      }}>
        <Typography variant="h6" >{task.executor}</Typography>
      </Box>
    </Card>
  )
}

export { Task }