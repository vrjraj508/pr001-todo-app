package com.basics.todobackend.controller;


import com.basics.todobackend.entity.Todo;
import com.basics.todobackend.service.TodoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "*")
public class TodoController {


    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    // GET all todos
    @GetMapping
    public ResponseEntity<List<Todo>> getAll() {
        return ResponseEntity.ok(todoService.getAllTodos());
    }

    // GET todo by id
    @GetMapping("/{id}")
    public ResponseEntity<Todo> getById(@PathVariable Long id) {
        return ResponseEntity.ok(todoService.getTodoById(id));
    }

    // GET todos by status
    // usage: /api/todos/status?completed=true
    @GetMapping("/status")
    public ResponseEntity<List<Todo>> getByStatus(@RequestParam boolean completed) {
        return ResponseEntity.ok(todoService.getTodosByStatus(completed));
    }

    // GET search todos
    // usage: /api/todos/search?keyword=shopping
    @GetMapping("/search")
    public ResponseEntity<List<Todo>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(todoService.searchTodos(keyword));
    }

    // POST create todo
    @PostMapping
    public ResponseEntity<Todo> create(@RequestBody Todo todo) {
        return ResponseEntity.ok(todoService.createTodo(todo));
    }

    // PUT update todo
    @PutMapping("/{id}")
    public ResponseEntity<Todo> update(@PathVariable Long id, @RequestBody Todo todo) {
        return ResponseEntity.ok(todoService.updateTodo(id, todo));
    }

    // PATCH toggle completed
    @PatchMapping("/{id}/toggle")
    public ResponseEntity<Todo> toggle(@PathVariable Long id) {
        return ResponseEntity.ok(todoService.toggleTodo(id));
    }

    // DELETE single todo
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        todoService.deleteTodo(id);
        return ResponseEntity.ok("Todo deleted successfully");
    }

    // DELETE all completed todos
    @DeleteMapping("/completed")
    public ResponseEntity<String> deleteCompleted() {
        todoService.deleteCompleted();
        return ResponseEntity.ok("All completed todos deleted");
    }
}