package com.example.task.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;

import java.util.UUID;

@Entity
@Setter
@Getter
@Table(name = "tasks")
public class Task {
    @Id
    @JdbcTypeCode(java.sql.Types.VARCHAR)
    private UUID id;
    @Column
    private String title;
    @Column
    private boolean completed;
}
