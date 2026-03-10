import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'

function TodoForm({ onAdd }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!title.trim()) return
        onAdd({ title, description })
        setTitle('')
        setDescription('')
    }

    return (
        <Card className="mb-4 shadow-sm">
            <Card.Body>
                <Card.Title>Add New Todo</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Title *"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Description (optional)"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="w-100">
                        ➕ Add Todo
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default TodoForm