package com.alchemy.service.impl;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import com.alchemy.entity.*;
import com.alchemy.repository.*;
import com.alchemy.value.AlchemyEnums;
import org.springframework.stereotype.Service;

import com.alchemy.customrepository.CustomRepositoyImpl;
import com.alchemy.dozer.DozerUtils;
import com.alchemy.service.AlchemyService;
import com.alchemy.to.CertificateTO;
import com.alchemy.to.ClientTO;
import com.alchemy.to.CourseTrainerTO;
import com.alchemy.to.ReferencesTO;
import com.alchemy.to.SkillTO;
import com.alchemy.to.TopTechnologyTO;
import com.alchemy.to.TopTrainersTO;
import com.alchemy.to.TrainerCertificateTO;
import com.alchemy.to.TrainerDetailsTO;
import com.alchemy.to.TrainerSkillTO;
import com.alchemy.to.TrainerTO;
import com.alchemy.to.TrainerTrainingTO;
import com.alchemy.to.TrainingTO;
import com.alchemy.to.TrainingSkillTO;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@AllArgsConstructor
public class AlchemyServiceImpl implements AlchemyService {

    ClientRepository clientRepository;
    TrainerRepository trainerRepository;
    SkillRepository skillRepository;
    CourseRepository courseRepository;
    ReferencesRepository referencesRepository;
    AdminRepository adminRepository;
    TrainerSkillRepository trainerSkillRepository;
    CertificateRepository certificateRepository;
    TrainerCertificateRepository trainerCertificateRepository;
    TrainingRepository trainingRepository;
    TrainingSkillRepository trainingSkillRepository;
    TrainerTrainingRepository trainerTrainingRepository;
    DozerUtils mapper;
    CustomRepositoyImpl customRepo;
    TrainerCalculatedRatingRepository trainerCalculatedRatingRepository;
    RatedTrainerRepository ratedTrainerRepository;

    @Override
    public List<TrainerTO> getTrainersByNameOrSkillorLocation(String str) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public TrainerTO getTrainerBySid(String trainerSid) {
        // TODO Auto-generated method stub
    	Trainer trainer= trainerRepository.findTrainerBySid(BaseEntity.hexStringToByteArray(trainerSid));
    	trainer.setRating(trainerCalculatedRatingRepository.findById(trainer.getId())
				.map(TrainerCalculatedRating::getRating).orElse(0.0));
        return mapper.convert(trainer,TrainerTO.class);
    }
    
    @Override
    public TrainerTO getTrainerByEmail(String email) {
        return mapper.convert(trainerRepository.findTrainerByEmail(email),TrainerTO.class);
    }

    @Override
    public List<TrainerTO> getAllTrainers() {
//        List<Trainer> trainers = trainerRepository.findAllByStatus(AlchemyEnums.TrainerStatus.ENABLED);
		List<RatedTrainer> trainers = ratedTrainerRepository.findAllByStatus(AlchemyEnums.TrainerStatus.ENABLED);
        return mapper.convertList(trainers,TrainerTO.class);
    }


	@Override
    public TrainerTO addTrainer(TrainerTO trainerTO) {
		
    	long epochMilli = Instant.now().toEpochMilli();
        Trainer tr = mapper.convert(trainerTO,Trainer.class);
        tr.generateUuid();
        tr.setCreatedOn(epochMilli);
        tr.setTrainerSkills(null);
        tr.setTrainerCertificates(null);
        Trainer savedTrainer = trainerRepository.save(tr);

        if(trainerTO.getTrainerSkills()!=null && trainerTO.getTrainerSkills().size()!=0)
        saveTrainerSkills(savedTrainer, trainerTO.getTrainerSkills());
        else
        	trainerTO.setTrainerSkills(Collections.EMPTY_LIST);
        if(trainerTO.getTrainerCertificates()!=null && trainerTO.getTrainerCertificates().size()!=0)
        saveTrainerCerficate(savedTrainer.getStringSid(), trainerTO.getTrainerCertificates());
        else
        	trainerTO.setTrainerCertificates(Collections.EMPTY_LIST);
        log.info(String.format("Trainer %s created successfully.", savedTrainer.getStringSid()));
        return mapper.convert(savedTrainer,TrainerTO.class);
    }

    @Override
    public TrainerTO updateTrainer(TrainerTO trainerTO) {
    	long epochMilli = Instant.now().toEpochMilli();
        Trainer trainer = trainerRepository.findTrainerBySid(BaseEntity.hexStringToByteArray(trainerTO.getSid()));
		boolean update = false;
		
		if ( trainerTO.getFirstName()!= null && (trainer.getFirstName()==null
				|| !trainer.getFirstName().equals(trainerTO.getFirstName()))) {
			trainer.setFirstName(trainerTO.getFirstName());
			update = true;
		}
		
		if ( trainerTO.getEmail()!= null && (trainer.getEmail()==null
				|| !trainer.getEmail().equals(trainerTO.getEmail()))) {
			trainer.setEmail(trainerTO.getEmail());
			update = true;
		}
		
		if ( trainerTO.getImageLocation()!= null && (trainer.getImageLocation()==null
				|| !trainer.getImageLocation().equals(trainerTO.getImageLocation()))) {
			trainer.setImageLocation(trainerTO.getImageLocation());
			update = true;
		}
		
		if ( trainerTO.getDesignation()!= null && (trainer.getDesignation()==null
				|| !trainer.getDesignation().equals(trainerTO.getDesignation()))) {
			trainer.setDesignation(trainerTO.getDesignation());
			update = true;
		}
		if ( trainerTO.getLinkedPath()!= null && (trainer.getLinkedPath()==null
				|| !trainer.getLinkedPath().equals(trainerTO.getLinkedPath()))) {
			trainer.setLinkedPath(trainerTO.getLinkedPath());
			update = true;
		}
		if ( trainerTO.getResumePath()!= null && (trainer.getResumePath()==null
				|| !trainer.getResumePath().equals(trainerTO.getResumePath()))) {
			trainer.setResumePath(trainerTO.getResumePath());
			update = true;
		}
		if ( trainerTO.getLocation()!= null && (trainer.getLocation()==null
				|| !trainer.getLocation().equals(trainerTO.getLocation()))) {
			trainer.setLocation(trainerTO.getLocation());
			update = true;
		}
		
		if ( trainerTO.getStatus()!= null && (trainer.getStatus()==null
				|| !trainer.getStatus().equals(trainerTO.getStatus()))) {
			trainer.setStatus(trainerTO.getStatus());
			update = true;
		}
		
		if ( trainerTO.getDescription()!= null && (trainer.getDescription()==null
				|| !trainer.getDescription().equals(trainerTO.getDescription()))) {
			trainer.setDescription(trainerTO.getDescription());
			update = true;
		}
		
		if ( trainerTO.getCoursePath()!= null && (trainer.getCoursePath()==null
				|| !trainer.getCoursePath().equals(trainerTO.getCoursePath()))) {
			trainer.setCoursePath(trainerTO.getCoursePath());
			update = true;
		}
		
		if ( trainerTO.getClientId()!= null && (trainer.getClientId()==null
				|| !trainer.getClientId().equals(trainerTO.getClientId()))) {
			trainer.setClientId(trainerTO.getClientId());
			update = true;
		}
		
		if ( trainerTO.getReferenceId()!= null && (trainer.getReferenceId()==null
				|| !trainer.getReferenceId().equals(trainerTO.getReferenceId()))) {
			trainer.setReferenceId(trainerTO.getReferenceId());
			update = true;
		}
		
		if ( trainerTO.getModeOfDelivery()!= null && (trainer.getModeOfDelivery()==null
				|| !trainer.getModeOfDelivery().equals(trainerTO.getModeOfDelivery()))) {
			trainer.setModeOfDelivery(trainerTO.getModeOfDelivery());
			update = true;
		}
       
		trainer.setMobileNumber(trainerTO.getMobileNumber());
		trainer.setConductedOn(trainerTO.getConductedOn());
		trainer.setCharges(trainerTO.getCharges());
		trainer.setLastUpdatedOn(epochMilli);
		trainer.setRating(trainerTO.getRating());
		if(trainerTO.getTrainerSkills()!=null && trainerTO.getTrainerSkills().size()!=0)
		updateTrainerSkills(trainer.getStringSid(), trainerTO.getTrainerSkills());
		else
        	trainerTO.setTrainerSkills(Collections.EMPTY_LIST);
        if(trainerTO.getTrainerCertificates()!=null && trainerTO.getTrainerCertificates().size()!=0)
		saveTrainerCerficate(trainer.getStringSid(), trainerTO.getTrainerCertificates());
        else
        	trainerTO.setTrainerCertificates(Collections.EMPTY_LIST);
		trainerRepository.save(trainer);
		if (update == true) {
			trainer.setLastUpdatedOn(epochMilli);
			trainerRepository.save(trainer);
		}
		else
		{
			log.info("Trainer details are same, Could not update.");
		}
		return mapper.convert(trainer, TrainerTO.class);
    }

    @Override
    public List<SkillTO> getAllSkills() {
        List<Skill> skills = skillRepository.findAll();
        return mapper.convertList(skills,SkillTO.class);
    }

    @Override
    public List<ReferencesTO> getAllReferences() {
        List<References> references = referencesRepository.findAll();
        return mapper.convertList(references,ReferencesTO.class);
    }

    @Override
    public List<ClientTO> getAllClients() {
        List<Client> clients = clientRepository.findAll();
        return  mapper.convertList(clients,ClientTO.class);
    }

    @Override
    public Boolean validateAdminByEmail(String email) {
        Admin admin = adminRepository.findAdminByEmail(email);
        return admin == null ? false : true;
    }

    
    
	@Override
	public List<TopTrainersTO> getTrainerByRating(Integer count) 
	{
		List<TopTrainers> trainers= customRepo.getTrainerByRating(count);
		List<TopTrainersTO> trainersTO=mapper.convertList(trainers, TopTrainersTO.class);
		return trainersTO;
	}

	@Override
	public List<TopTechnologyTO> getTechnologyByCount(Integer count) 
	{
		List<TopTechnology> technologies= customRepo.getTechnologyByCount(count);
		return mapper.convertList(technologies, TopTechnologyTO.class);
	}

	@Override
	public Integer deleteTrainerSkillByTrainerAndSkilId(String trainerSid, String skillSid) {
		Integer trainerId= customRepo.findIdBySid("Trainer", trainerSid);
		Integer skillId= customRepo.findIdBySid("Skill", skillSid);		
		return customRepo.deleteTrainerSkillByTrainerAndSkilId(trainerId, skillId);
	}

	@Override
	public List<TrainerSkillTO> getTrainerSkillBySid(String trainerSid) {
		Integer trainerId=customRepo.findIdBySid("Trainer", trainerSid);
		List<TrainerSkill> trainerSkills=customRepo.getTrainerSkills(trainerId);
		return mapper.convertList(trainerSkills,TrainerSkillTO.class);
	}

	@Override
	public List<TrainerTO> getTrainerByNameLocationSkill(String str) {
		return mapper.convertList(customRepo.getTrainerByNameLocationSkill(str), TrainerTO.class);
	}

	@Override
	public Integer deleteTrainerBySid(String trainerSid) {
    	Trainer trainer = trainerRepository.findTrainerBySid(BaseEntity.hexStringToByteArray(trainerSid));
		return Optional.ofNullable(trainer)
				.map(t->{
					t.setStatus(AlchemyEnums.TrainerStatus.DISABLED);
					trainerRepository.save(t);
					return t.getId();
				}).orElse(0);
//		return customRepo.deleteTrainerBySid(trainerSid);
	}

	@Override
	public List<CourseTrainerTO> getAllCoursesBySid(String courseSid) {
		Integer courseId=customRepo.findIdBySid("Course", courseSid);
		List<CourseTrainer> courseTrainers=customRepo.getCourseSkills(courseId);
		return mapper.convertList(courseTrainers,CourseTrainerTO.class);
	}
	
	private void updateTrainerSkills(String trainerSid, List<TrainerSkillTO> tsTO)
	{
		tsTO.forEach(tSkillTO->{
			Skill skill= skillRepository.findSkillBySid(BaseEntity.hexStringToByteArray(tSkillTO.getSkill().getSid()));
			Trainer tr= trainerRepository.findTrainerBySid(BaseEntity.hexStringToByteArray(trainerSid));
			TrainerSkill trs= new TrainerSkill();
			trs.generateUuid();
			trs.setTrainer(tr);
			trs.setSkill(skill);
			trs.setCore(tSkillTO.isCore());
			trainerSkillRepository.save(trs);
		});
	}
	
	private void saveTrainerSkills(Trainer tr,List<TrainerSkillTO> tsTO) {
		tsTO.forEach(tSkillTO->{
        	Skill skill=	skillRepository.findSkillBySid(BaseEntity.hexStringToByteArray(tSkillTO.getSkill().getSid()));
            TrainerSkill trs= new TrainerSkill();
            trs.generateUuid();
            trs.setSkill(skill);
            trs.setTrainer(tr);
            trs.setCore(tSkillTO.isCore());
            trainerSkillRepository.save(trs);
        });
	}

	@Override
	public List<String> getListOfLocations() {
		List<String> locations = trainerRepository.findListOfLocations();
		return locations.size()==0?null:locations;
	}	
	
	private void saveTrainerCerficate(String trainerSid, List<TrainerCertificateTO> tcTO)
	{
		tcTO.forEach(tCertificateTO-> {
			Trainer tr = trainerRepository.findTrainerBySid(BaseEntity.hexStringToByteArray(trainerSid));
			Certificate certificate = certificateRepository.findCertificateBySid(BaseEntity.hexStringToByteArray(tCertificateTO.getCertificate().getSid()));
			TrainerCertificate tc = new TrainerCertificate();
			tc.generateUuid();
			tc.setCertificate(certificate);
			tc.setTrainer(tr);
			tc.setCertificateurl(tCertificateTO.getCertificateurl());
			tc.setIssuedDate(tCertificateTO.getIssuedDate());
			trainerCertificateRepository.save(tc);
		});
	}
	

	@Override
	public Integer deleteTrainerCertificateByTrainerAndCertificateSid(String trainerSid, String certificateSid) {
		Integer trainerId= customRepo.findIdBySid("Trainer", trainerSid);
		Integer certificateId= customRepo.findIdBySid("Certificate", certificateSid);		
		return customRepo.deleteTrainerCertificateByTrainerAndCertificateId(trainerId, certificateId);
	}
	

	@Override
    public List<CertificateTO> getAllCertificates() {
        List<Certificate> certificate = certificateRepository.findAll();
        return mapper.convertList(certificate,CertificateTO.class);
    }
	
	@Override
	public CertificateTO addCertificate(CertificateTO certificateTO)
	{
		Certificate certificate= mapper.convert(certificateTO, Certificate.class);
		certificate.generateUuid();
		certificateRepository.save(certificate);
		return mapper.convert(certificate, CertificateTO.class);
	}
	
	@Override
    public List<TrainerCertificateTO> getCertificatesBySid(String trainerSid) {
		Integer trainerId =customRepo.findIdBySid("Trainer", trainerSid);
        List<TrainerCertificate> trainerCertificates = customRepo.getCertificateByTrainerId(trainerId);
        return mapper.convertList(trainerCertificates,TrainerCertificateTO.class);
    }
	
	public TrainingTO addTraining(TrainingTO trainingTO)
	{
		Training td= mapper.convert(trainingTO, Training.class);
		td.generateUuid();
		td.setTrainerTrainings(null);
		td.setTrainingSkills(null);
	    Training saveTraining= trainingRepository.save(td);
	    
	    if(trainingTO.getTrainerTrainings()!=null && trainingTO.getTrainerTrainings().size()!=0)
	    	saveTrainerTraining(saveTraining, trainingTO.getTrainerTrainings());
	    else 
	    	 trainingTO.setTrainerTrainings(Collections.EMPTY_LIST);
	    if(trainingTO.getTrainingSkills()!=null && trainingTO.getTrainingSkills().size()!=0)
		saveTrainingSkills(saveTraining, trainingTO.getTrainingSkills());
	    else 
	    	 trainingTO.setTrainingSkills(Collections.EMPTY_LIST);
	    log.info(String.format("Traning %s created successfully.", saveTraining.getStringSid()));
	    return mapper.convert(saveTraining, TrainingTO.class);
	}
	
	private void saveTrainingSkills(Training trd, List<TrainingSkillTO> tsTO)
	{
		tsTO.forEach(tSkillTO-> {
			Skill skill = skillRepository.findSkillBySid(BaseEntity.hexStringToByteArray(tSkillTO.getSkill().getSid()));
			TrainingSkill  trs = new TrainingSkill();
			trs.generateUuid();
			trs.setSkill(skill);
			trs.setTraining(trd);
			trainingSkillRepository.save(trs);
		});
	}
	
	private void saveTrainerTraining(Training tr, List<TrainerTrainingTO> ttTO)
	{
		ttTO.forEach(tTrainingTO-> {
			Trainer  trainer = trainerRepository.findTrainerBySid(BaseEntity.hexStringToByteArray(tTrainingTO.getTrainer().getSid()));
			TrainerTraining  tt = new TrainerTraining();
			tt.generateUuid();
			tt.setTrainer(trainer);
			tt.setTraining(tr);
			trainerTrainingRepository.save(tt);
		});
	}
	

	@Override
	public Integer deleteTrainingBySid(String trainingSid) {
		return customRepo.deleteTrainingBySid(trainingSid);	 
	}

	@Override
	public List<TrainingTO> getAllTraining() {
		return mapper.convertList(trainingRepository.findAll(),TrainingTO.class);
	}
}
