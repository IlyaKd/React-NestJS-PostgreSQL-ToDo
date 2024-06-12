import { FC } from "react";
import styles from "./TaskList.module.css";
import { ITask } from "../Todo/Todo";
import Task from "../Task/Task";

interface TaskListProps {
  tasks: ITask[];
  dataTasksFetching: boolean;
}

const TaskList: FC<TaskListProps> = ({ tasks, dataTasksFetching }) => {
  if (tasks.length === 0 && !dataTasksFetching) {
    return <div className={styles.noTask}></div>;
  } else {
    return (
      <ul className={styles.wrap}>
        {tasks.map((task) => (
          <li key={task.id}>
            <Task name={task.name} isDone={task.isDone} id={task.id} />
          </li>
        ))}
      </ul>
    );
  }
};

export default TaskList;
