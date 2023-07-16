import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { TodoInput, SearchTodos, TodoList } from './components';

export default function App() {
	// const [todos, setTodos] = useState(() => {
	// 	const localValue = localStorage.getItem('TODO_ITEMS');
	// 	if (localValue === null) return [];
	// 	return JSON.parse(localValue);
	// });
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [inputSearchValue, setInputSearchValue] = useState('');

	useEffect(() => {
		getTodos();
	}, []);

	useEffect(() => {
		localStorage.setItem('TODO_ITEMS', JSON.stringify(todos));
	}, [todos]);

	function getTodos() {
		setIsLoading(true);
		fetch('http://localhost:3004/tasks')
			.then((data) => data.json())
			.then((loadedTodos) => setTodos(loadedTodos))
			.finally(() => {
				setIsLoading(false);
			});
	}

	function addTodo(title) {
		setIsCreating(true);
		fetch('http://localhost:3004/tasks', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ title, isEditing: false }),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(response);
				getTodos();
			})
			.finally(setIsCreating(false));
	}

	function deleteTodo(id) {
		fetch(`http://localhost:3004/tasks/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log('Task deleted ', response);
				getTodos();
			});
	}

	function setEditForTodo(id) {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo,
			),
		);
	}

	function submitEditedTodo(title, id) {
		setIsUpdating(true);
		fetch(`http://localhost:3004/tasks/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ title, isEditing: false }),
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				console.log(response);
				getTodos();
			})
			.finally(setIsUpdating(false));
	}

	function searchTodo(searchValue) {
		fetch('http://localhost:3004/tasks')
			.then((data) => data.json())
			.then((loadedTodos) => {
				setTodos(
					loadedTodos.filter((todo) => todo.title.includes(searchValue)),
				);
			});
	}

	function sortTodos() {
		let sortedTodos = [...todos];
		sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
		setTodos(sortedTodos);
	}

	return (
		<>
			<div className={styles.App}>
				<TodoInput addTodo={addTodo} isCreating={isCreating} />
				<h1>Todo list</h1>
				<SearchTodos
					searchTodo={searchTodo}
					sortTodos={sortTodos}
					inputSearchValue={inputSearchValue}
					setInputSearchValue={setInputSearchValue}
				/>
				{isLoading ? (
					<div className={styles.loader}>Loading...</div>
				) : (
					<TodoList
						todos={todos}
						deleteTodo={deleteTodo}
						editTodo={setEditForTodo}
						submitEditTodo={submitEditedTodo}
						isUpdating={isUpdating}
					/>
				)}
			</div>
		</>
	);
}
