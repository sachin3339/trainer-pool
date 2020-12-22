package com.alchemy.to;

import java.util.List;
import java.util.Set;

import com.alchemy.entity.TrainerSkill;
import com.alchemy.entity.TrainerTraining;
import com.alchemy.value.AlchemyEnums;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TrainerTO extends BaseTO {

    private String firstName;
    private String lastName;
    private String email;
    private String description;
    private String imageLocation;
    private long conductedOn;
    private String designation;
    private double charges;
    private String linkedPath;
    private String resumePath;
    private String location;
    private long mobileNumber;
    private long lastUpdatedOn;
    private long createdOn;
    private String coursePath;
    private AlchemyEnums.TrainerStatus status;
    private double rating;
    private String referenceId;
    private String clientId;
    private AlchemyEnums.ModeOfDelivery modeOfDelivery;
    private List<TrainerSkillTO> trainerSkills;
    private List<TrainerCertificateTO> trainerCertificates;
    private List<TrainerTrainingDetailsTO> trainerTrainings;
}
