package com.burrsutter;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

@Entity
public class Todo extends PanacheEntity{
    @Column(unique = true)
    public String title;

    public boolean completed;

    @Column(name = "ordering")
    public int order;

    public String url;

    public static List<Todo> findNotCompleted() {
        return list("completed", false);
    }

    public static List<Todo> findCompleted() {
        return list("completed", true);
    }

    public static long deleteCompleted() {
        return delete("completed", true);
    }    
}
