package com.alchemy.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.alchemy.value.AlchemyEnums;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "alchemy_training_details")
@Getter
@Setter
@NoArgsConstructor
public class Training extends BaseId {

    private static final long serialVersionUID = 8169440098228955213L;

    @Column(name = "training_name")
    private String trainingName;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "description")
    private String description;

    @Column(name = "location")
    private String location;

    @Column(name = "rating")
    private double rating;
    
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private AlchemyEnums.TrainerStatus status;
    
    @Column(name = "training_till")
    private long to;
    
    @Column(name = "training_from")
    private long from;
    
    @OneToMany(mappedBy = "training", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private List<TrainerTraining> trainerTrainings = new ArrayList<>();
    
	@OneToMany(mappedBy = "training", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private List<TrainingSkill> trainingSkills = new ArrayList<>();	  
}
