import { FC } from "react";
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

const Task: FC<TaskProps> = ({ name, isDone, id }) => {
  const [changeTask] = useChangeTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleClickDone = async (id: number) => {
    await changeTask({
      id,
      params: {
        isDone: !isDone,
      },
    });
  };

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
      >
        <div
          className={classnames({
            [styles.task]: true,
            [styles.done]: isDone,
          })}
        >
          <span className={styles.ellipsis}>{name}</span>
        </div>
      </label>
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
