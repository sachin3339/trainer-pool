package com.alchemy.to;

import java.util.List;

import com.alchemy.entity.Skill;
import com.alchemy.entity.Trainer;
import com.alchemy.entity.TrainerTraining;
import com.alchemy.entity.TrainingSkill;
import com.alchemy.value.AlchemyEnums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TrainingTO extends BaseTO {

	private String trainingName;
	private String companyName;
	private String description;
	private String location;
	private double rating;
	private AlchemyEnums.TrainerStatus status;
	private long to;
	private long from;
	private List<TrainingSkillTO> trainingSkills;
	private List<TrainerTrainingTO> trainerTrainings;
}
