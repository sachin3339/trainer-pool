package com.alchemy.service;

import java.util.List;

import com.alchemy.to.CertificateTO;
import com.alchemy.to.ClientTO;
import com.alchemy.to.CourseTrainerTO;
import com.alchemy.to.ReferencesTO;
import com.alchemy.to.SkillTO;
import com.alchemy.to.TopTechnologyTO;
import com.alchemy.to.TopTrainersTO;
import com.alchemy.to.TrainerCertificateTO;
import com.alchemy.to.TrainerSkillTO;
import com.alchemy.to.TrainerTO;
import com.alchemy.to.TrainingTO;

public interface AlchemyService {
	
    public List<TopTrainersTO> getTrainerByRating(Integer count);
    public List<TopTechnologyTO> getTechnologyByCount(Integer count);
    public Integer deleteTrainerSkillByTrainerAndSkilId(String trainerId, String skillId);
    public List<TrainerTO> getTrainersByNameOrSkillorLocation(String str);
    
    public TrainerTO getTrainerBySid(String trainerSid);
    public List<TrainerTO> getAllTrainers();
    public TrainerTO addTrainer(TrainerTO trainerTO);
    public TrainerTO updateTrainer(TrainerTO trainerTO);
    public List<SkillTO> getAllSkills();
    public TrainerTO getTrainerByEmail(String email);
    public List<String> getListOfLocations();
    
    public List<ReferencesTO> getAllReferences();
    public List<ClientTO> getAllClients();
    public Boolean validateAdminByEmail(String email);
    public List<TrainerSkillTO> getTrainerSkillBySid(String trainerSid);
    public List<TrainerTO> getTrainerByNameLocationSkill(String str);
    public Integer deleteTrainerBySid(String trainerSid);
    public List<CourseTrainerTO> getAllCoursesBySid(String courseSid);
    public Integer deleteTrainerCertificateByTrainerAndCertificateSid(String trainerSid, String certificateSid);
    public List<CertificateTO> getAllCertificates();
    public CertificateTO addCertificate(CertificateTO certificateTO);
    public List<TrainerCertificateTO> getCertificatesBySid(String trainerSid);
	public TrainingTO addTraining(TrainingTO trainingTO);
	public Integer deleteTrainingBySid(String trainingSid);
	public List<TrainingTO> getAllTraining();
}
