import { FC } from "react";
import classnames from "classnames";
import styles from "./Control.module.css";
import { ITask, TFilterNames } from "../Todo/Todo";

interface ControlProps {
  tasks: ITask[];
  filter: TFilterNames;
  onClickFilter: (filter: TFilterNames) => void;
}

const Control: FC<ControlProps> = ({ tasks, filter, onClickFilter }) => {
  let activeTasks = tasks.filter((task) => !task.isDone).length;
  let doneTasks = tasks.filter((task) => task.isDone).length;

  return (
    <div className={styles.flex}>
      <button
        className={classnames({
          [styles.btn]: true,
          [styles.btn_active]: filter === "done",
        })}
        onClick={() => onClickFilter("done")}
      >
        Завершённые:
        <span className={styles.tasks_count}>{doneTasks}</span>
      </button>
      <button
        className={classnames({
          [styles.btn]: true,
          [styles.btn_active]: filter === "active",
        })}
        onClick={() => onClickFilter("active")}
      >
        Незавершённые:
        <span className={styles.tasks_count}>{activeTasks}</span>
      </button>
      <button
        className={classnames({
          [styles.btn]: true,
          [styles.btn_active]: filter === "all",
        })}
        onClick={() => onClickFilter("all")}
      >
        Все
      </button>
    </div>
  );
};

export default Control;
