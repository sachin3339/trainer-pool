package com.alchemy.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "alchemy_trainer_rating")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrainerRating extends BaseId {

    private static final long serialVersionUID = -1615361904182281533L;

    @Column(name = "rating")
    private double rating;

    @Column(name = "comments")
    private String comments;

    @JoinColumn(name = "client_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToMany
    private List<Client> clients;

    @JoinColumn(name = "trainer_id", referencedColumnName = "id", insertable = false, updatable = false)
    @ManyToMany
    private List<Trainer> trainers;

}
