const ADD_TASK = 'ADD TASK'
const REMOVE_TASK = 'REMOVE_TASK'

const initialState = {
  tasks: localStorage.getItem('tasks') || []
}

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      localStorage.setItem('tasks', JSON.stringify([...state.tasks, action.payload]))
      return { ...state, tasks: [...state.tasks, action.payload] }
    case REMOVE_TASK:
      localStorage.setItem('tasks', JSON.stringify(state.tasks.filter(task => task.id !== action.payload)))
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) }
    default:
      return state
  }
}
