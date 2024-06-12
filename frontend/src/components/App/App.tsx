import styles from './App.module.css';
import Todo from '../Todo/Todo';

function App() {
  return (
    <>
      <div className={styles.wrap}>
        {/* <header className={styles.header}>Войти</header> */}
        <div className={styles.content}>
          <Todo />
        </div>
      </div>
    </>
  );
}

export default App