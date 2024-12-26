const Dashboard = (userDetails) => {
  const user = userDetails.user;
  const logout = () => {
    window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, "_self");
  }
  return (
    <>
      <h1>Home page</h1>
      <input type="text" defaultValue={user.name}/>
      <input type="text" defaultValue={user.email}/>
      <button onClick={logout}>Log out</button>
    </>
  );
}

export default Dashboard;