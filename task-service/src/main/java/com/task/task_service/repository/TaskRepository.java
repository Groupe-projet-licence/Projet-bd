package com.task.task_service.repository;

import com.task.task_service.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Ici, on peut ajouter des méthodes personnalisées si nécessaire
}