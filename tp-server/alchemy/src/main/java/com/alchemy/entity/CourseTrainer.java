package com.alchemy.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "alchemy_courses_trainer")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseTrainer extends BaseId {

    private static final long serialVersionUID = -1615361904182281533L;

    @Column(name = "active")
    private boolean active;

	/*
	 * @OneToMany
	 * @JoinColumn(name = "id",referencedColumnName = "id") private List<Course>
	 * courses;
	 * 
	 * @OneToMany
	 * @JoinColumn(name = "id",referencedColumnName = "id") private List<Trainer>
	 * trainers;
	 */
    
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "course_id", referencedColumnName = "id")
	private Course course;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "trainer_id", referencedColumnName = "id")
	private Trainer trainer;

}
