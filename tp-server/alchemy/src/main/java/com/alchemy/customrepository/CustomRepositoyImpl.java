package com.alchemy.customrepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import com.alchemy.entity.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.alchemy.repository.IAlchemyCustomRepository;
import com.alchemy.to.CourseTrainerTO;
import com.alchemy.to.TrainerCertificateTO;
import com.alchemy.to.TrainerTO;

/**
 * This is the implementer class which containing the generic method related to
 * Alchemy
 */

@Repository

@Transactional
public class CustomRepositoyImpl implements IAlchemyCustomRepository {

    private final Logger logger = LoggerFactory.getLogger(CustomRepositoyImpl.class);
    @PersistenceContext
    EntityManager entitymangager;

    @Override
    public List<TopTrainers> getTrainerByRating(Integer noOfCount) {
        Query query = entitymangager.createQuery("select t from TopTrainers t").setMaxResults(noOfCount);
        List<TopTrainers> trainers = query.getResultList();
        return trainers.size()==0?null:trainers;
    }

	@Override
	public List<TopTechnology> getTechnologyByCount(Integer count) {
        Query query = entitymangager.createQuery("select t from TopTechnology t").setMaxResults(count);
        List<TopTechnology> technologies = query.getResultList();
        return technologies.size()==0?null:technologies;
	}
	
	@Override
	public Integer findIdBySid(String classz, String sid) {
		String customQuery = "SELECT a.id from "+classz+" a where hex(a.sid)='"+sid+"'";
		Query query = entitymangager.createQuery(customQuery);
		return (Integer)query.getSingleResult();	
	}
	
	@Override
	public List<TrainerSkill> getTrainerSkills(Integer trainerId) {
        Query query = entitymangager.createNativeQuery("select * from alchemy_trainer_skill  where trainer_id=:trainerId",TrainerSkill.class);
        query.setParameter("trainerId", trainerId);
        List<TrainerSkill> trainerSkills = query.getResultList();
        return trainerSkills.size()==0||trainerSkills==null?null:trainerSkills;
	}
	
	@Override
	public Integer deleteTrainerSkillByTrainerAndSkilId(Integer trainerId, Integer skillId) {
		  Query query = entitymangager.createNativeQuery("delete from alchemy_trainer_skill where trainer_id=:trainerId and skill_id=:skillId");
		  query.setParameter("trainerId", trainerId);
		  query.setParameter("skillId", skillId);
		  return query.executeUpdate();
	}

	@Override
	 public List<RatedTrainer> getTrainerByNameLocationSkill(String str){
		 Query query = entitymangager.createNativeQuery("select distinct(trainer_id) from trainer_training_skill_search where first_name like :str or last_name like :str or location like :str or  skill_name like :str");
		query.setParameter("str", str + "%");
        List<Integer> ids = query.getResultList();
        String st="(";
        
		for(int i=0;i<ids.size();i++){
			if(i==ids.size()-1){
				st=st.concat(String.valueOf(ids.get(i))+")");
			}else{
				st=st.concat(String.valueOf(ids.get(i))+",");
			}
		}
		/*Query trainers=entitymangager.createNativeQuery("select at1.id,at1.sid,first_name,last_name,email,image_location,last_training_conducted_on,designation,charges,linked_in_path,\n" +
				" resume_path,location,mobile_number,last_updated_on,reference_id,client_id,at1.status,description,created_on,course_path,mode_of_delivery,atr.rating as `rating` from alchemy_trainer at1" +
				" inner join vw_trainer_rating atr on at1.id = atr.id where at1.id in "+st,Trainer.class);*/
		Query trainers = entitymangager.createNativeQuery("select * from vw_rated_alchemy_trainer where id in"+st, RatedTrainer.class);
		List<RatedTrainer> list= trainers.getResultList();
		return list;
	}

	@Override
	public Integer deleteTrainerBySid(String trainerSid) {
		try {
			Integer trainerId = findIdBySid("Trainer", trainerSid);
			Query query = entitymangager.createNativeQuery("delete from alchemy_trainer_skill where trainer_id=:trainerId");
			query.setParameter("trainerId", trainerId);
			query.executeUpdate();
		}
		catch(Exception e)
		{
			logger.error("while deleting alchemy trainer skill, throwing error",e);
			return 0;
		}
		
		try {
			Integer trainerId = findIdBySid("Trainer", trainerSid);
			Query query = entitymangager.createNativeQuery("delete from alchemy_trainer_certificate where trainer_id=:trainerId");
			query.setParameter("trainerId", trainerId);
			query.executeUpdate();
		}
		catch(Exception e)
		{
			logger.error("while deleting alchemy trainer certificate, throwing error",e);
			return 0;
		}
		
		try {
			Integer trainerId = findIdBySid("Trainer", trainerSid);
			Query query = entitymangager.createNativeQuery("delete from alchemy_courses_trainer where trainer_id=:trainerId");
			query.setParameter("trainerId", trainerId);
			query.executeUpdate();
		}
		catch(Exception e)
		{
			logger.error("while deleting alchemy courses trainer, throwing error",e);
			return 0;
		}
		
		try {
			Integer trainerId = findIdBySid("Trainer", trainerSid);
			Query query = entitymangager.createNativeQuery("delete from alchemy_trainer_rating where trainer_id=:trainerId");
			query.setParameter("trainerId", trainerId);
			query.executeUpdate();
		}
		catch(Exception e)
		{
			logger.error("while deleting alchemy trainer rating, throwing error",e);
			return 0;
		}
		
		try {
		  Query query = entitymangager.createNativeQuery("delete from alchemy_trainer where sid=unhex(:trainerSid)");
		  query.setParameter("trainerSid", trainerSid);
		  return query.executeUpdate();
	    }
		catch(Exception e)
		{
			logger.error("while deleting alchemy trainer, throwing error",e);
			return 0;
		}
	}
	
	@Override
	public List<CourseTrainer> getCourseSkills(Integer courseId) {
        Query query = entitymangager.createNativeQuery("select * from alchemy_courses_trainer where course_id=:courseId",CourseTrainer.class);
        query.setParameter("courseId", courseId);
        List<CourseTrainer> courseTrainers = query.getResultList();
        return courseTrainers.size()==0 ||courseTrainers==null?null:courseTrainers;
	}
	
	@Override
	public Integer deleteTrainerCertificateByTrainerAndCertificateId(Integer trainerId, Integer certificateId) {
		  Query query = entitymangager.createNativeQuery("delete from alchemy_trainer_certificate where trainer_id=:trainerId and cerficate_id=:certificateId");
		  query.setParameter("trainerId", trainerId);
		  query.setParameter("certificateId", certificateId);
		  return query.executeUpdate();
	}
	
	@Override
	public List<TrainerCertificate> getCertificateByTrainerId(Integer trainerId) {
        Query query = entitymangager.createNativeQuery("select * from alchemy_trainer_certificate where trainer_id=:trainerId",TrainerCertificate.class);
        query.setParameter("trainerId", trainerId);
        List<TrainerCertificate> trainerCertificates = query.getResultList();
        return trainerCertificates.size()==0 || trainerCertificates==null?null:trainerCertificates;
	}
	
	@Override
	public Integer deleteTrainingBySid(String trainingSid) {
		try {
			Integer trainingId = findIdBySid("Training", trainingSid);
			Query query = entitymangager.createNativeQuery("delete from alchemy_trainer_training where training_id=:trainingId");
			query.setParameter("trainingId", trainingId);
			query.executeUpdate();
		}
		catch(Exception e)
		{
			logger.error("while deleting alchemy trainer training, throwing error",e);
			return 0;
		}
		
		try {
			Integer trainingId = findIdBySid("Training", trainingSid);
			Query query = entitymangager.createNativeQuery("delete from alchemy_training_skills where training_id=:trainingId");
			query.setParameter("trainingId", trainingId);
			query.executeUpdate();
		}
		catch(Exception e)
		{
			logger.error("while deleting alchemy training skill, throwing error",e);
			return 0;
		}
		
		try {
		  Query query = entitymangager.createNativeQuery("delete from alchemy_training_details where sid=unhex(:trainingSid)");
		  query.setParameter("trainingSid", trainingSid);
		  return query.executeUpdate();
	    }
		catch(Exception e)
		{
			logger.error("while deleting alchemy training details, throwing error",e);
			return 0;
		}
	}
	
	public List<Training> getTrainingByCount(Integer count) 
	{
		return null;
		
	}
}
