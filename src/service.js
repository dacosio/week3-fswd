const SERVER =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/tasks"
    : process.env.URI;

export default SERVER;
