import { FC, useState } from "react";
import classnames from "classnames";
import styles from "./InputTask.module.css";
import buttonImg from "../../assets/button.svg";
import { ITask } from "../Todo/Todo";
import { useCreateTaskMutation } from "../../redux/api/task";

interface InputTaskProps {
  tasks: ITask[];
}

const InputTask: FC<InputTaskProps> = ({ tasks }) => {
  const [createTask] = useCreateTaskMutation();
  const [inputValue, setInputValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<boolean>(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue === "") {
      setError(true);
      setRepeat(false);
    } else if (tasks.find((task) => task.name === inputValue)) {
      setRepeat(true);
    } else {
      setInputValue("");
      setError(false);
      setRepeat(false);
      await createTask({
        name: inputValue,
        isDone: false,
      });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={classnames({
        [styles.form]: true,
        [styles.error]: error,
        [styles.repeat]: repeat,
        [styles.maxLengthInputValue]: inputValue.length === 240,
      })}
    >
      <input
        type="text"
        placeholder={"Просто введите сюда название дела..."}
        maxLength={240}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        className={styles.input}
      />
      <button className={styles.btn}>
        <img src={buttonImg} alt="Button" />
      </button>
    </form>
  );
};

export default InputTask;
