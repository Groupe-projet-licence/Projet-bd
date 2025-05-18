package com.example.taches.controller;

import com.example.taches.model.Todo;
import com.example.taches.repository.TodoRepository;
import org.apache.catalina.LifecycleState;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/taches")
public class TodoController {
    private final TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    //Lire toutes les taches
    @GetMapping
    public List<Todo> getAll(){
        return todoRepository.findAll();
    }

    //Lire une tache par ID
    @GetMapping("/{id}")
    public Todo getById(@PathVariable Long id){
        return todoRepository.findById(id).orElse(null);
    }

    //Cree un nouvelle tache
    @PostMapping
    public Todo create(@RequestBody Todo todo){
        return todoRepository.save(todo);
    }

    //Modifier une tache existante
    @PutMapping("/{id}")
    public Todo update(@PathVariable Long id, @RequestBody Todo todo){
        Optional<Todo> existing = todoRepository.findById(id);
        if(existing.isPresent()){
            Todo t = existing.get();
            t.setTitle(todo.getTitle());
            t.setDescription(todo.getDescription());
            t.setStatus(todo.getStatus());

            return todoRepository.save(t);
        }

        return null;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        todoRepository.deleteById(id);
    }
}
