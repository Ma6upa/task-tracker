const ADD_TASK = 'ADD_TASK'
const EDIT_TASK = 'EDIT_TASK'
const REMOVE_TASK = 'REMOVE_TASK'

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || []
}

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      localStorage.setItem('tasks', JSON.stringify([...state.tasks, action.payload]))
      return { ...state, tasks: [...state.tasks, action.payload] }
    case EDIT_TASK:
      localStorage.setItem('tasks', JSON.stringify(state.tasks.map((item) =>
        item.id === action.payload.id ? { ...item, taskState: action.payload.taskState, priority: action.payload.priority } : item
      )))
      return {
        ...state, tasks: state.tasks.map((item) =>
          item.id === action.payload.id ? { ...item, taskState: action.payload.taskState, priority: action.payload.priority } : item
        )
      }
    case REMOVE_TASK:
      localStorage.setItem('tasks', JSON.stringify(state.tasks.filter(task => task.id !== action.payload)))
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) }
    default:
      return state
  }
}
