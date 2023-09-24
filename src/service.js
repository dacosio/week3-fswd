const SERVER =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:5000/tasks"
    : process.env.REACT_APP_URI;

export default SERVER;
