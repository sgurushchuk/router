import styles from './TodoItem.module.css';

export function TodoItem({ todo, deleteTodo, editTodo }) {
	return (
		<li className={styles.todoItem}>
			<span className={styles.itemTitle}>{todo.title}</span>
			<button className={styles.editBtn} onClick={() => editTodo(todo.id)}>
				Edit
			</button>
			<button className={styles.deleteBtn} onClick={() => deleteTodo(todo.id)}>
				Delete
			</button>
		</li>
	);
}