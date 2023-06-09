const ADD_USER = 'ADD_USER'

const initialState = {
  users: JSON.parse(localStorage.getItem('users')) || []
}

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      localStorage.setItem('users', JSON.stringify([...state.users, action.payload]))
      return { ...state, users: [...state.users, action.payload] }
    default:
      return state
  }
}
