package com.alchemy.to;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TrainingSkillTO extends BaseTO {

    private SkillTO skill;
    private TrainingDetailsTO training;
    
}
