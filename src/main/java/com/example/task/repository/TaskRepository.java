package com.example.task.repository;

import com.example.task.entity.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

public interface TaskRepository extends CrudRepository<Task, UUID> {

    Collection<Task> findAll();

    Optional<Task> findById(UUID id);
}
