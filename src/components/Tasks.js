import Task from "./Task";

const Tasks = ({ tasks, onDelete, onToggle, onComplete, onUpdate, setIsUpdating }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
          onComplete={onComplete}
          onUpdate={onUpdate}
          setIsUpdating={setIsUpdating}
        />
      ))}
    </>
  );
};

export default Tasks;
