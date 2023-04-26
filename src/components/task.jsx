import {
  Box,
  Card,
  Divider,
  Typography,
} from "@mui/material"
import { PriorityCircle } from "./priorityCircle"

const Task = (props) => {
  const task = props.task
  return (
    <Card style={{
      marginTop: 15,
      width: '80%',
      cursor: 'pointer'
    }}>
      <Box sx={{
        marginLeft: '10%'
      }}>
        <PriorityCircle priority={task.priority} />
        <Typography variant="h6" style={{ display: "inline-block", marginLeft: 10 }}>{task.name}</Typography>
      </Box>
      <Divider />
      <Box sx={{
        marginLeft: '10%'
      }}>
        <Typography variant="h6" style={{ marginLeft: 5 }}>{task.executor}</Typography>
      </Box>
    </Card>
  )
}

export { Task }