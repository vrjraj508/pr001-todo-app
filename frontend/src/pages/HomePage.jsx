import { useState, useEffect } from 'react'
import { Container, Row, Col, ButtonGroup, Button, Badge, Spinner, Alert } from 'react-bootstrap'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import {
    getAllTodos, createTodo, toggleTodo,
    deleteTodo, deleteCompleted, getTodosByStatus
} from '../api/todoApi'

function HomePage() {
    const [todos, setTodos] = useState([])
    const [filter, setFilter] = useState('all')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchTodos()
    }, [filter])

    const fetchTodos = async () => {
        setLoading(true)
        setError(null)
        try {
            let res
            if (filter === 'all') res = await getAllTodos()
            else if (filter === 'completed') res = await getTodosByStatus(true)
            else res = await getTodosByStatus(false)
            setTodos(res.data)
        } catch (err) {
            setError('Failed to fetch todos. Is the backend running?')
        } finally {
            setLoading(false)
        }
    }

    const handleAdd = async (todo) => {
        try {
            await createTodo(todo)
            fetchTodos()
        } catch (err) {
            setError('Failed to create todo')
        }
    }

    const handleToggle = async (id) => {
        try {
            await toggleTodo(id)
            fetchTodos()
        } catch (err) {
            setError('Failed to toggle todo')
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id)
            fetchTodos()
        } catch (err) {
            setError('Failed to delete todo')
        }
    }

    const handleDeleteCompleted = async () => {
        try {
            await deleteCompleted()
            fetchTodos()
        } catch (err) {
            setError('Failed to delete completed todos')
        }
    }

    const pendingCount = todos.filter(t => !t.completed).length
    const completedCount = todos.filter(t => t.completed).length

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={7}>

                    {/* Header */}
                    <div className="text-center mb-4">
                        <h1>📝 Pro001 Todo App</h1>
                        <p className="text-muted">
                            <Badge bg="warning" className="me-2">Pending: {pendingCount}</Badge>
                            <Badge bg="success">Completed: {completedCount}</Badge>
                        </p>
                    </div>

                    {/* Error */}
                    {error && <Alert variant="danger" dismissible onClose={() => setError(null)}>{error}</Alert>}

                    {/* Add Form */}
                    <TodoForm onAdd={handleAdd} />

                    {/* Filters */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <ButtonGroup size="sm">
                            <Button
                                variant={filter === 'all' ? 'primary' : 'outline-primary'}
                                onClick={() => setFilter('all')}
                            >All</Button>
                            <Button
                                variant={filter === 'pending' ? 'warning' : 'outline-warning'}
                                onClick={() => setFilter('pending')}
                            >Pending</Button>
                            <Button
                                variant={filter === 'completed' ? 'success' : 'outline-success'}
                                onClick={() => setFilter('completed')}
                            >Completed</Button>
                        </ButtonGroup>

                        <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={handleDeleteCompleted}
                            disabled={completedCount === 0}
                        >
                            🗑️ Clear Completed
                        </Button>
                    </div>

                    {/* Todo List */}
                    {loading
                        ? <div className="text-center"><Spinner animation="border" /></div>
                        : <TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />
                    }

                </Col>
            </Row>
        </Container>
    )
}

export default HomePage