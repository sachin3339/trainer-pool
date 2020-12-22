package com.alchemy.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import com.alchemy.to.SkillTO;

import java.util.List;

@Entity
@Table(name = "alchemy_trainer_training")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrainerTraining extends BaseId {

    private static final long serialVersionUID = -1615361904182281533L;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "trainer_id", referencedColumnName = "id")
	private Trainer trainer;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "training_id", referencedColumnName = "id")
	private Training training;
}
