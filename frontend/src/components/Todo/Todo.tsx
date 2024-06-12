import { FC, useEffect, useState } from "react";
import styles from "./Todo.module.css";
import Card from "@mui/material/Card"; 
import Control from "../Control/Control";
import InputTask from "../InputTask/InputTask";
import TaskList from "../TaskList/TaskList";
import { useGetAllTasksQuery } from "../../redux/api/task";

export interface ITask {
  name: string;
  isDone: boolean;
  id: number;
}

export type TFilterNames = "active" | "done" | "all";

const Todo: FC = () => {
  const { data: dataTasks, isFetching: dataTasksFetching } =
    useGetAllTasksQuery();
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filter, setFilter] = useState<TFilterNames>("all");

  useEffect(() => {
    if (dataTasks) {
      const arrayForSort = [...dataTasks];
      const sortedArray = arrayForSort.sort((a, b) => a.id - b.id);
      setTasks(sortedArray);
    }
  }, [dataTasks]);

  const onClickFilter = (filter: TFilterNames): void => {
    setFilter(filter);
  };

  let filteredTasks = [];
  switch (filter) {
    case "active":
      filteredTasks = tasks.filter((task) => !task.isDone);
      break;
    case "done":
      filteredTasks = tasks.filter((task) => task.isDone);
      break;
    case "all":
      filteredTasks = tasks;
      break;
    default:
      filteredTasks = tasks;
  }

  return (
    <Card className={styles.wrap}>
      <header className={styles.header}>
        <h1 className={styles.title}>Список задач</h1>
        <Control tasks={tasks} filter={filter} onClickFilter={onClickFilter} />
      </header>
      <div className={styles.tasks_section}>
        <TaskList tasks={filteredTasks} dataTasksFetching={dataTasksFetching} />
        <InputTask tasks={tasks} />
      </div>
    </Card>
  );
};

export default Todo;