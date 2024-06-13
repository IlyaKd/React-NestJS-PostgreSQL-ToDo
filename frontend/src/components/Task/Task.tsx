import { ChangeEvent, FC, FocusEvent, KeyboardEvent, useEffect, useLayoutEffect, useState } from "react";
import classnames from "classnames";
import styles from "./Task.module.css";
import deleteImg from "../../assets/delete.svg";
import {
  useChangeTaskMutation,
  useDeleteTaskMutation,
} from "../../redux/api/task";

interface TaskProps {
  name: string;
  isDone: boolean;
  id: number;
}

const Task: FC<TaskProps> = ({ name: propsName, isDone, id }) => {
  const [changeTask] = useChangeTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState('')

  useLayoutEffect(() => {
    setTaskName(propsName)
  }, [propsName])

  useEffect(() => {
    if (!isEditing && taskName && taskName !== propsName) {
      const editTask = async () => {
        await changeTask({
          id,
          params: {
            name: taskName,
          },
        });
      };
      editTask();
    }
  }, [isEditing, taskName]);

  const handleClickDone = async (id: number) => {
    await changeTask({
      id,
      params: {
        isDone: !isDone,
      },
    });
  };

  const handleTaskChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  }

  const handleClickDelete = async (id: number) => {
    await deleteTask(id);
  };

  return (
    <div className={styles.wrap}>
      <input type="checkbox" checked={isDone} className={styles.checkbox} />
      <label
        htmlFor="checkbox"
        onClick={() => handleClickDone(id)}
        className={styles.checkbox_label}
      />
      <div
        className={classnames({
          [styles.task]: true,
          [styles.done]: isDone,
        })}
      >
        {isEditing ? (
          <input
            type="text"
            autoFocus
            className={styles.input}
            value={taskName}
            onChange={handleTaskChange}
            onBlur={(e: FocusEvent<HTMLInputElement>) => {
              if (e.target.value.length > 0) setIsEditing(false);
            }}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") e.preventDefault();
              if (
                e.key === "Enter" &&
                (e.target as HTMLInputElement).value.length > 0
              )
                setIsEditing(false);
            }}
          />
        ) : (
          <span onClick={() => setIsEditing(true)} className={styles.ellipsis}>
            {taskName}
          </span>
        )}
      </div>
      <button
        className={styles.btn_delete}
        onClick={() => handleClickDelete(id)}
      >
        <img src={deleteImg} alt="Delete" />
      </button>
    </div>
  );
};

export default Task;
