import styles from './TodoInput.module.css';
import { useState } from 'react';

export function TodoInput({ addTodo, isCreating }) {
	const [inputValue, setInputValue] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		if (inputValue === '') return;
		addTodo(inputValue.trim());
		setInputValue('');
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				type="text"
				placeholder="New todo"
			/>
			<button disabled={isCreating} className={styles.addBtn}>Add</button>
		</form>
	);
}