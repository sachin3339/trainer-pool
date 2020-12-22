package com.alchemy.entity;

import com.alchemy.value.AlchemyEnums;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "vw_rated_alchemy_trainer")
@Getter
@Setter
@NoArgsConstructor
public class RatedTrainer extends BaseId {

    private static final long serialVersionUID = 4105863239079090018L;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;
    
    @Column(name = "description")
    private String description;

    @Column(name = "image_location")
    private String imageLocation;

    @Column(name = "last_training_conducted_on")
    private long conductedOn;

    @Column(name = "designation")
    private String designation;

    @Column(name = "charges")
    private double charges;

    @Column(name = "linked_in_path")
    private String linkedPath;

    @Column(name = "resume_path")
    private String resumePath;

    @Column(name = "location")
    private String location;

    @Column(name = "mobile_number")
    private long mobileNumber;

    @Column(name = "last_updated_on")
    private long lastUpdatedOn;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private AlchemyEnums.TrainerStatus status;

    @Column(name = "rating")
    private Double rating;
    
    @Column(name = "created_on")
    private long createdOn;
    
    @Column(name = "course_path")
    private String coursePath;

    @Column(name = "reference_id")
    private String referenceId;

    @Column(name = "client_id")
    private String clientId;
    
    @Column(name = "mode_of_delivery")
    @Enumerated(EnumType.STRING)
    private AlchemyEnums.ModeOfDelivery modeOfDelivery;
    
	@OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private List<CourseTrainer> courseTrainers = new ArrayList<>();
    
	@OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private List<TrainerSkill> trainerSkills = new ArrayList<>();
	
	@OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	private List<TrainerCertificate> trainerCertificates = new ArrayList<>();
	
	@OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<TrainerTraining> trainerTrainings = new ArrayList<>();
	 
	  
}
