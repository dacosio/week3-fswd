import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
import SERVER from "./service";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [complete, setComplete] = useState(false);

  const [taskId, setTaskId] = useState(0);
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      if (location.pathname === "/")
        setTasks(tasksFromServer.filter((t) => t.isCompleted === false));
      else if (location.pathname === "/completed")
        setTasks(tasksFromServer.filter((t) => t.isCompleted === true));
    };
    getTasks();
  }, [location.pathname, complete]);

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch(SERVER);
    const data = await res.json();

    return data;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`${SERVER}/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Task
  const addTask = async (payload) => {
    const res = await fetch(SERVER, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ ...payload, isCompleted: false }),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  };

  const updateTask = async (payload) => {
    const taskToUpdate = await fetchTask(payload.taskId);
    const updatedTask = { ...taskToUpdate, ...payload };
    const res = await fetch(`${SERVER}/${payload.taskId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === payload.taskId ? { ...task, ...data } : task
      )
    );
  };

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`${SERVER}/${id}`, {
      method: "DELETE",
    });
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert("Error Deleting This Task");
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`${SERVER}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  const onComplete = async (id) => {
    const taskToToggle = await fetchTask(id);
    const completeTask = {
      ...taskToToggle,
      isCompleted: !taskToToggle.isCompleted,
    };

    const res = await fetch(`${SERVER}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(completeTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isCompleted: data.isCompleted } : task
      )
    );
    setComplete((prev) => !prev);
  };

  const onUpdate = (task) => {
    setTaskId(task.id);
    setText(task.text);
    setDay(task.day);
    setReminder(task.reminder);
    setShowAddTask(true);
  };

  return (
    <div className="container">
      <Header
        onAdd={() => {
          setShowAddTask(!showAddTask);
          setText("");
          setDay("");
          setReminder(false);
          setIsUpdating(false);
        }}
        showAdd={showAddTask}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {showAddTask && (
                <AddTask
                  onAdd={addTask}
                  onUpdate={updateTask}
                  text={text}
                  day={day}
                  reminder={reminder}
                  setReminder={setReminder}
                  setDay={setDay}
                  setText={setText}
                  isUpdating={isUpdating}
                  setTaskId={setTaskId}
                  taskId={taskId}
                />
              )}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                  onComplete={onComplete}
                  onUpdate={onUpdate}
                  setIsUpdating={setIsUpdating}
                />
              ) : (
                "No Tasks To Show"
              )}
            </>
          }
        />
        <Route
          path="/completed"
          element={
            <>
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                  onComplete={onComplete}
                />
              ) : (
                "No Completed Tasks"
              )}
            </>
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
