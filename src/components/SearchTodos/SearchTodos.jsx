import styles from './SearchTodos.module.css';

export function SearchTodos({ searchTodo, sortTodos, inputSearchValue, setInputSearchValue }) {

	return (
    <><form className={styles.searchForm}>
    <input
      value={inputSearchValue}
      onChange={(e) => {
        searchTodo(e.target.value);
        setInputSearchValue(e.target.value)
      }
      }
      type="text"
      placeholder="&#x1F50E; Search for todo"
    />
    </form>
    <div className={styles.sortWrapper}>
      <button onClick={sortTodos} className={styles.sortBtn}>↓↑</button>
    </div>
    </>
	);
}