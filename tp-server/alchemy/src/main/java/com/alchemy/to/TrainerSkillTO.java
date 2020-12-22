package com.alchemy.to;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TrainerSkillTO extends BaseTO {

    private boolean isCore;
    private SkillTO skill;
    private TrainerDetailsTO trainer;
    
}
