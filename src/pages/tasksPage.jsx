import { useEffect } from "react"

const TasksPage = () => {

  useEffect(() => {
    if (!localStorage.getItem('userKey')) {
      window.location.pathname = '/error'
    }
  }, [])

  return (
    <div>TasksPage is working</div>
  )
}

export { TasksPage }