import { Card, Button, Badge } from 'react-bootstrap'

function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <Card className={`mb-2 shadow-sm ${todo.completed ? 'border-success' : ''}`}>
            <Card.Body className="d-flex justify-content-between align-items-start">
                <div>
                    <h6 className={todo.completed ? 'text-decoration-line-through text-muted' : ''}>
                        {todo.title}
                    </h6>
                    {todo.description && (
                        <p className="text-muted small mb-1">{todo.description}</p>
                    )}
                    <Badge bg={todo.completed ? 'success' : 'warning'}>
                        {todo.completed ? 'Completed' : 'Pending'}
                    </Badge>
                </div>
                <div className="d-flex gap-2">
                    <Button
                        size="sm"
                        variant={todo.completed ? 'outline-secondary' : 'outline-success'}
                        onClick={() => onToggle(todo.id)}
                    >
                        {todo.completed ? '↩️' : '✅'}
                    </Button>
                    <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => onDelete(todo.id)}
                    >
                        🗑️
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}

export default TodoItem