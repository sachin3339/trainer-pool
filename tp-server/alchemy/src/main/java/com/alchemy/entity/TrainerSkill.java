package com.alchemy.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import com.alchemy.to.SkillTO;

import java.util.List;

@Entity
@Table(name = "alchemy_trainer_skill")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrainerSkill extends BaseId {

    private static final long serialVersionUID = -1615361904182281533L;

    @Column(name = "is_core")
    private boolean isCore;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "skill_id", referencedColumnName = "id")
	private Skill skill;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "trainer_id", referencedColumnName = "id")
	private Trainer trainer;
}
