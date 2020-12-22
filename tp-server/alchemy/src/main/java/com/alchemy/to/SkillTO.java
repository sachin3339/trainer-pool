package com.alchemy.to;

import java.util.List;
import java.util.Set;

import com.alchemy.entity.TrainerSkill;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SkillTO extends BaseTO {
    private String name;
    private String description;
    private String imageLocation;
}
