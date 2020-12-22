package com.alchemy.entity;

import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "alchemy_skill")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Skill extends BaseId {

	private static final long serialVersionUID = 5816340785927448044L;

	@Column(name = "name")
	private String name;

	@Column(name = "description")
	private String description;

	@Column(name = "image_location")
	private String imageLocation;

	@OneToMany(mappedBy = "skill", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private List<TrainerSkill> trainerSkills = new ArrayList<>();
	
}
