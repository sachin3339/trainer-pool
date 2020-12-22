package com.alchemy.repository;

import java.util.List;

import com.alchemy.entity.*;
import com.alchemy.to.CourseTrainerTO;
import com.alchemy.to.TrainerTO;

/**
 * This interface containing the generic method .
 */
public interface IAlchemyCustomRepository {

    public List<TopTrainers> getTrainerByRating(Integer count);
    public List<TopTechnology> getTechnologyByCount(Integer count);
	public Integer deleteTrainerSkillByTrainerAndSkilId(Integer trainerId, Integer skillId);
	public Integer findIdBySid(String classz, String sid);
	//public List<CourseTrainer> getCourseSkillByCourseId(String courseId);
	public List<RatedTrainer> getTrainerByNameLocationSkill(String str);
	public List<TrainerSkill> getTrainerSkills(Integer trainerId);
	public Integer deleteTrainerBySid(String trainerSid);
	public List<CourseTrainer> getCourseSkills(Integer courseId);
	public Integer deleteTrainerCertificateByTrainerAndCertificateId(Integer trainerId, Integer certificateId);
	public List<TrainerCertificate> getCertificateByTrainerId(Integer trainerId);
	public Integer deleteTrainingBySid(String trainingSid);
	public List<Training> getTrainingByCount(Integer count);

	
}
