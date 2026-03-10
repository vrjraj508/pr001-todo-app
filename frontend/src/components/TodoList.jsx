import TodoItem from './TodoItem'
import { Alert } from 'react-bootstrap'

function TodoList({ todos, onToggle, onDelete }) {
    if (todos.length === 0) {
        return (
            <Alert variant="info" className="text-center">
                No todos found! Add one above 👆
            </Alert>
        )
    }

    return (
        <div>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}

export default TodoList