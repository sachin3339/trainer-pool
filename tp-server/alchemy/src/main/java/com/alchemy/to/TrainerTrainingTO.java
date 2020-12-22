package com.alchemy.to;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TrainerTrainingTO extends BaseTO {

    private TrainerDetailsTO trainer;
    private TrainingDetailsTO training;
    
}
