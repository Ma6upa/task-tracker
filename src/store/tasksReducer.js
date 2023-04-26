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
      console.log(state.tasks)
      return { ...state, tasks: state.tasks }
    case REMOVE_TASK:
      localStorage.setItem('tasks', JSON.stringify(state.tasks.filter(task => task.id !== action.payload)))
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) }
    default:
      return state
  }
}
