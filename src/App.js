import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [complete, setComplete] = useState(false);

  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  const [resetForm, setResetForm] = useState(false);

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
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();

    setTasks([...tasks, data]);
  };

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
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

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
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

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
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
                  text={text}
                  day={day}
                  reminder={reminder}
                  setReminder={setReminder}
                  setDay={setDay}
                  setText={setText}
                  isUpdating={isUpdating}
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
