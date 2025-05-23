package com.task.task_service.service;

import com.task.task_service.model.*;
import com.task.task_service.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    // Lister toutes les tâches
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    // Lire une tâche par ID
    public Optional<Task> findById(Long id) {
        return taskRepository.findById(id);
    }

    // Créer une nouvelle tâche
    public Task create(Task task) {
        return taskRepository.save(task);
    }

    // Modifier une tâche existante
    public Optional<Task> update(Long id, Task taskData) {
        return taskRepository.findById(id).map(existing -> {
            existing.setTitle(taskData.getTitle());
            existing.setDescription(taskData.getDescription());
            existing.setStatus(taskData.getStatus());
            existing.setDeadline(taskData.getDeadline());
            return taskRepository.save(existing);
        });
    }

    // Supprimer une tâche
    public void delete(Long id) {
        taskRepository.deleteById(id);
    }
}