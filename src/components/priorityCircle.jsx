
const PriorityCircle = (props) => {
  const priority = Number(props.priority)
  return (
    <span style={{
      backgroundColor: priority === 1 ? '#00ff00' : (priority === 2 ? '#ffff00' : '#ff0000'),
      width: 15,
      height: 15,
      borderRadius: '50%',
      display: "inline-block",
      marginLeft: -20
    }}></span>
  )
}

export { PriorityCircle }