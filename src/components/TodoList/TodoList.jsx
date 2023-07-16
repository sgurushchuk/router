import styles from './TodoList.module.css';
import { TodoItem } from '../TodoItem';
import { EditTodo } from '../EditTodo';

export function TodoList({ todos, deleteTodo, editTodo, submitEditTodo }) {

	return (
		<ul className={styles.todosList}>
			{todos.length === 0 && 'No todos'}
			{todos.map((todo) =>
				todo.isEditing === true ? (
					<EditTodo key={todo.id} submitEditTodo={submitEditTodo} todo={todo} />
				) : (
					<TodoItem
						todo={todo}
						key={todo.id}
						deleteTodo={deleteTodo}
						editTodo={editTodo}
					/>
				),
			)}
		</ul>
	);
}