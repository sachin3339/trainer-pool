package com.alchemy.entity;

import javax.persistence.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "top_trainers")
@Getter
@Setter
@NoArgsConstructor
public class TopTrainers extends BaseEntity {

	private static final long serialVersionUID = -4326550128562325496L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    
	@Column(name = "trainer_name")
    private String trainerName;
	
	@Column(name = "email")
    private String email;
	
	@Column(name = "designation")
    private String designation;

    @Column(name = "image_location")
    private String trainerImageUrl;

    @Column(name = "avg_rating")
    private double avgRating;


}
