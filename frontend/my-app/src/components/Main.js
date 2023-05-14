function Main({username}){
  return(
    <>
      {!username && (
        <h1>Welcome to my app</h1>
      )}
      {username && (
        <h1>Hello {username}</h1>
      )}
    </>
  )
}

export default Main;