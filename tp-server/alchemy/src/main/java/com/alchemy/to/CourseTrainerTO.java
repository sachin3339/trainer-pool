package com.alchemy.to;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CourseTrainerTO extends BaseTO {
	
    private boolean active;
	private CourseTO course;
	private TrainerTO trainer;
}
