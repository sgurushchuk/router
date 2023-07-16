import styles from './EditTodo.module.css';
import { useState } from 'react';

export function EditTodo({ submitEditTodo, todo }) {
	const [inputValue, setInputValue] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		if (inputValue === '') return;
		submitEditTodo(inputValue.trim(), todo.id);
	}

	return (
		<form className={styles.editTodoItem} onSubmit={handleSubmit}>
			<input
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				type="text"
				placeholder="Edit todo"
			/>
			<button className={styles.submitBtn}>Submit</button>
		</form>
	);
}