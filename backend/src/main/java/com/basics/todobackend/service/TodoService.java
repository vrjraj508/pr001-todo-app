package com.basics.todobackend.service;

import com.basics.todobackend.entity.Todo;
import com.basics.todobackend.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    // Get all todos
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    // Get todo by id
    public Todo getTodoById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));
    }

    // Get todos by status
    public List<Todo> getTodosByStatus(boolean completed) {
        return todoRepository.findByCompleted(completed);
    }

    // Search todos by keyword
    public List<Todo> searchTodos(String keyword) {
        return todoRepository.findByTitleContainingIgnoreCase(keyword);
    }

    // Create todo
    public Todo createTodo(Todo todo) {
        todo.setCreatedAt(LocalDateTime.now());
        todo.setUpdatedAt(LocalDateTime.now());
        return todoRepository.save(todo);
    }

    // Update todo
    public Todo updateTodo(Long id, Todo todo) {
        Todo existing = getTodoById(id);
        existing.setTitle(todo.getTitle());
        existing.setDescription(todo.getDescription());
        existing.setCompleted(todo.isCompleted());
        existing.setUpdatedAt(LocalDateTime.now());
        return todoRepository.save(existing);
    }

    // Toggle completed status
    public Todo toggleTodo(Long id) {
        Todo existing = getTodoById(id);
        existing.setCompleted(!existing.isCompleted());
        existing.setUpdatedAt(LocalDateTime.now());
        return todoRepository.save(existing);
    }

    // Delete todo
    public void deleteTodo(Long id) {
        getTodoById(id); // throws if not found
        todoRepository.deleteById(id);
    }

    // Delete all completed todos
    public void deleteCompleted() {
        List<Todo> completed = todoRepository.findByCompleted(true);
        todoRepository.deleteAll(completed);
    }
}