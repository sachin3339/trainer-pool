package com.alchemy.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "vw_trainer_rating")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrainerCalculatedRating extends BaseId {

    private static final long serialVersionUID = -1615361904182281533L;

    @Column(name = "rating")
    private double rating;

}
