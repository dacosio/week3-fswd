import { FaTimes, FaPencilAlt } from "react-icons/fa";
import { useLocation } from "react-router";
const Task = ({
  task,
  onDelete,
  onToggle,
  onComplete,
  onUpdate,
  setIsUpdating,
}) => {
  const location = useLocation();
  return (
    <div
      className={`task ${task.reminder && "reminder"}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3 className="task__right">
        {task.text}
        <div className="task__right">
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => onComplete(task.id)}
          />
          {location.pathname !== "/completed" ? (
            <FaPencilAlt
              style={{ color: "teal", cursor: "pointer" }}
              onClick={() => {
                onUpdate(task);
                setIsUpdating(true);
              }}
            />
          ) : null}
          <FaTimes
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => onDelete(task.id)}
          />
        </div>
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
