package com.alchemy.controller;

import com.alchemy.customrepository.AWSUploadClient;
import com.alchemy.customrepository.OtpService;
import com.alchemy.service.AlchemyService;
import com.alchemy.to.CertificateTO;
import com.alchemy.to.TrainerTO;
import com.alchemy.to.TrainingTO;
import com.alchemy.value.AlchemyException;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@AllArgsConstructor
@RestController
@Api(value = "Alchemy API's")
public class AlchemyController {

    AlchemyService service;
    private final JavaMailSender javaMailSender;
    private final OtpService otpService;
    private final String path;
    private final AWSUploadClient awsUploadClient;

    @Autowired
    public AlchemyController(JavaMailSender javaMailSender, AlchemyService alchemyService, OtpService otpService, AWSUploadClient awsUploadClient){
        this.javaMailSender = javaMailSender;
        this.service = alchemyService;
        this.otpService = otpService;
        this.awsUploadClient = awsUploadClient;
        this.path=System.getProperty("file.path");
    }

    @GetMapping("/gettoptrainer/{count}")
    @ApiOperation(value = "gettoptrainer", notes = "API to get list of top trainers")
    public ResponseEntity<?> getTrainerByRating(
            @ApiParam(value = "Count", required = true)
            @PathVariable("count") Integer count) {
        log.info(String.format("Request received : User  for get list of top trainers"));
        return ResponseEntity.ok(service.getTrainerByRating(count));
    }

    @GetMapping("/gettoptechnology/{count}")
    @ApiOperation(value = "gettoptechnology", notes = "API to get list of top technology")
    public ResponseEntity<?> getTechnologyByCount(
            @ApiParam(value = "Count", required = true)
            @PathVariable("count") Integer count) {
        log.info(String.format("Request received : User  for get list of top technology"));
        return ResponseEntity.ok(service.getTechnologyByCount(count));
    }
    
    @GetMapping("/get/trainers/{namelocationskill}")
    @ApiOperation(value = "gettrainerskills", notes = "API to get trainers by namelocationskill")
    public ResponseEntity<?> getTrainerByNameLocationSkill(
            @ApiParam(value = "str", required = true)
            @PathVariable("namelocationskill") String namelocationskill) {
        log.info(String.format("Request received : User  for get trainers by namelocationskill"));
        return ResponseEntity.ok(service.getTrainerByNameLocationSkill(namelocationskill));
    }
    
    @GetMapping("/validateadmin/{email}")
    @ApiOperation(value = "validateadmin", notes = "API to validate admin by email")
    public ResponseEntity<?> validateAdminByEmail(
            @ApiParam(value = "Email", required = true)
            @PathVariable("email") String email) {
        log.info(String.format("Request received : User  for validate admin by email"));
        return ResponseEntity.ok(service.validateAdminByEmail(email));
    }
    
    @PostMapping("/add")
    @ApiOperation(value = "addTrainer", notes = "API to add new Trainer.")
    public ResponseEntity<?> addTrainer(
            @ApiParam(value = "add trainer payload", required = true) @RequestBody TrainerTO trainerTO) {
        TrainerTO addtrainer = service.addTrainer(trainerTO);
        return ResponseEntity.ok(addtrainer);
    }

    @PutMapping("/update")
    @ApiOperation(value = "updateTrainer", notes = "API to update Trainer details.")
    public ResponseEntity<?> updateTrainer(
            @ApiParam(value = "update trainer payload", required = true) @RequestBody TrainerTO trainerTO) {
        TrainerTO updatetrainer = service.updateTrainer(trainerTO);
        return ResponseEntity.ok(updatetrainer);
    }

    @GetMapping("/getalltrainers")
    @ApiOperation(value = "getAllTrainers", notes = "API to get list of Trainers.")
    public ResponseEntity<?> getAllTrainers() {
        log.info(String.format("Request received : User  for GET list of Trainers"));
        return ResponseEntity.ok(service.getAllTrainers());
    }

    @GetMapping("/gettrainerdetails/{trainerSid}")
    @ApiOperation(value = "getTrainerDetails", notes = "API  to get Trainer details by trainerSid.")
    public ResponseEntity<?> getTrainerBySid(
            @ApiParam(value = "trainer  sid", required = true)
            @PathVariable("trainerSid") String trainerSid) {
        return ResponseEntity.ok(service.getTrainerBySid(trainerSid));
    }

    @GetMapping("/gettrainer/{email}")
    @ApiOperation(value = "getTrainerDetails", notes = "API to get Trainer details by email.")
    public ResponseEntity<?> getTrainerByEmail(
            @ApiParam(value = "Email", required = true)
            @PathVariable("email") String email) {
        return ResponseEntity.ok(service.getTrainerByEmail(email));
    }

    @DeleteMapping("delete/trainer/{trainerSid}")
	@ApiOperation(value = "deleteTrainerSkillByTrainerAndSkilId", notes = "API to delete Trainer")
	public ResponseEntity<?> deleteTrainerBySid(
			@ApiParam(value = "Trainer sid", required = true) @PathVariable("trainerSid") String trainerSid) {
		return ResponseEntity.ok(service.deleteTrainerBySid(trainerSid));
	}
    
    @GetMapping("/getallreferences")
    @ApiOperation(value = "getAllReferences", notes = "API to get list of References.")
    public ResponseEntity<?> getAllReferences() {
        log.info(String.format("Request received : User  for GET list of References"));
        return ResponseEntity.ok(service.getAllReferences());
    }

    @GetMapping("/getallclients")
    @ApiOperation(value = "getAllClients", notes = "API to get list of Clients.")
    public ResponseEntity<?> getAllClients() {
        log.info(String.format("Request received : User  for GET list of Clients."));
        return ResponseEntity.ok(service.getAllClients());
    }

    @GetMapping("/getallskills")
    @ApiOperation(value = "getAllSkills", notes = "API to get list of Skills.")
    public ResponseEntity<?> getAllSkills() {
        log.info(String.format("Request received : User  for GET list of Skills."));
        return ResponseEntity.ok(service.getAllSkills());
    }

    @GetMapping(value = "/send/otp/{adminEmail}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> sendOtp(@PathVariable("adminEmail")String adminEmail){


        log.info("Validation email for {}",adminEmail);
        Boolean emailValid = Optional.ofNullable(adminEmail).filter(StringUtils::isNotEmpty)
                .map(email->service.validateAdminByEmail(email)).orElse(new Boolean(false));

        if(!emailValid)
            return ResponseEntity.badRequest().body("Admin Email ID is not valid");

        String key = UUID.randomUUID().toString();
        int otp = otpService.generateOtp(key);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("info@eservecloud.in");
        message.setTo(adminEmail);
        message.setSubject("Login OTP for Alchemy Solutions");
        message.setText("Your OTP for login is :".concat(String.valueOf(otp)));
        javaMailSender.send(message);

        Map<String,String> response = new HashMap<>();
        response.put("key",key);
        return ResponseEntity.ok(response);
    }

    @GetMapping(value = "/verify/{key}/otp/{otp}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> verifyOtp(@PathVariable("key")String key, @PathVariable("otp")String otp){

        Optional.ofNullable(key).filter(StringUtils::isNotEmpty).orElseThrow(()->new IllegalArgumentException("Key cannot be Empty"));
        Optional.ofNullable(otp).filter(StringUtils::isNotEmpty).orElseThrow(()->new IllegalArgumentException("Otp cannot be Empty"));

        int otpFromCache = otpService.getOtp(key);
        otpService.clearOtp(key);
        return Optional.ofNullable(otpFromCache).map(String::valueOf).filter(otp2->otp2.equals(otp))
                .map(ResponseEntity::ok).orElse(ResponseEntity.badRequest().body("OTP not matching"));

    }

    @GetMapping(value = "/resend/otp/{key}/email/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> resendOtp(@PathVariable("key")String key,@PathVariable("email")String email){

        Optional.ofNullable(key).filter(StringUtils::isNotEmpty).orElseThrow(()->new IllegalArgumentException("Key cannot be Empty"));
        Optional.ofNullable(email).filter(StringUtils::isNotEmpty).orElseThrow(()->new IllegalArgumentException("Email cannot be Empty"));

        log.info("Validation email for {}",email);
        Boolean emailValid = Optional.ofNullable(email).filter(StringUtils::isNotEmpty)
                .map(emailId->service.validateAdminByEmail(emailId)).orElse(new Boolean(false));

        if(!emailValid)
            return ResponseEntity.badRequest().body("Admin Email ID is not valid");

        Optional.ofNullable(otpService.getOtp(key)).filter(i->i>0).orElseThrow(()->new IllegalArgumentException("Invalid Key"));
        otpService.clearOtp(key);
        int otp = otpService.generateOtp(key);

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("info@eservecloud.in");
        message.setTo(email);
        message.setSubject("Resending Login OTP for Alchemy Solutions");
        message.setText("Your OTP for login is :".concat(String.valueOf(otp)));
        javaMailSender.send(message);

        Map<String,String> response = new HashMap<>();
        response.put("key",key);
        return ResponseEntity.ok(response);
    }

    // API's for file handling
    @PostMapping(value = "/upload",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadFile(@RequestParam("file")MultipartFile multipartFile){
        // Get the file and save it somewhere
        String filePath = awsUploadClient.uploadFile(multipartFile);
        return ResponseEntity.ok(filePath);
    }

    @PostMapping(value = "/download",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> downloadFile(@RequestBody Map input){
        if(input==null || input.isEmpty()) throw new IllegalArgumentException("Input file name not provided");
        String filePath = (String) input.get("fileName");
        return Optional.ofNullable(filePath).map(fileName->{
            File file = new File(fileName);
            String mediaType = "application/pdf";
            if(fileName.contains(".")){
                String extension = fileName.split("\\.")[1];
                if(extension.equalsIgnoreCase("pdf"))
                    mediaType = "application/".concat(extension);
            }
            InputStreamResource resource = null;
            try {
                resource = new InputStreamResource(new FileInputStream(file));
            } catch (FileNotFoundException e) {
                return null;
            }
            HttpHeaders headers = new HttpHeaders();

            headers.add("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getName()));
            headers.add("Cache-Control", "no-cache, no-store, must-revalidate");
            headers.add("Pragma", "no-cache");
            headers.add("Expires", "0");

            ResponseEntity<Object>
                    responseEntity = ResponseEntity.ok().headers(headers).contentLength(
                    file.length()).contentType(MediaType.parseMediaType(mediaType)).body(resource);

            return responseEntity;
        }).orElse(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
    }
    
     
    @GetMapping("/get/trainerskills/{trainerSid}")
    @ApiOperation(value = "gettrainerskills", notes = "API to get trainer skills")
    public ResponseEntity<?> getTrainerSkills(
            @ApiParam(value = "TrainerSid", required = true)
            @PathVariable("trainerSid") String trainerSid) {
        log.info(String.format("Request received : User  for get trainerskills"));
        return ResponseEntity.ok(service.getTrainerSkillBySid(trainerSid));
    }
    
    @DeleteMapping("/trainerskills/delete/{trainerId}/{skillId}")
	@ApiOperation(value = "deleteTrainerSkillByTrainerAndSkilId", notes = "API to delete TrainerSkill")
	public ResponseEntity<?> deleteTrainerSkillByTrainerAndSkilId(
			@ApiParam(value = "Workflow version sid", required = true) 
			@PathVariable("trainerId") String trainerId  ,@PathVariable("skillId") String skillId) {
    	log.info(String.format("Request received : User  for delete TrainerSkill"));
		return ResponseEntity.ok(service.deleteTrainerSkillByTrainerAndSkilId(trainerId, skillId));
	}
    
    @GetMapping("/get/coursetrainers/{courseSid}")
    @ApiOperation(value = "getCourseTrainers", notes = "API to get course trainer")
    public ResponseEntity<?> getCourseTrainers(
            @ApiParam(value = "CourseSid", required = true)
            @PathVariable("courseSid") String courseSid) {
        log.info(String.format("Request received : User  for get course trainer"));
        return ResponseEntity.ok(service.getAllCoursesBySid(courseSid));
    }
    
    @GetMapping("/get/locationlist")
    @ApiOperation(value = "getLocationList", notes = "API to get list of locations")
    public ResponseEntity<?> getTrainersByLocation() {
        log.info(String.format("Request received : User  for get list of locations"));
        return ResponseEntity.ok(service.getListOfLocations());
    }
    
    @DeleteMapping("/delete/trainercertificates/{trainerSid}/{certificateSid}")
	@ApiOperation(value = "deleteTrainerSkillByTrainerAndSkilId", notes = "API to delete TrainerCertificate")
	public ResponseEntity<?> deleteTrainerCertificateByTrainerAndCertificateSid(
			@ApiParam(value = "trainerSid and certificateSid", required = true) 
			@PathVariable("trainerSid") String trainerSid  ,@PathVariable("certificateSid") String certificateSid) {
    	log.info(String.format("Request received : User  for delete TrainerCertificate"));
		return ResponseEntity.ok(service.deleteTrainerCertificateByTrainerAndCertificateSid(trainerSid, certificateSid));
	}

    @GetMapping("/get/certificates")
    @ApiOperation(value = "getCertificates", notes = "API to get list of Certificates.")
    public ResponseEntity<?> getCertificates() {
        log.info(String.format("Request received : User  for GET list of Certificates."));
        return ResponseEntity.ok(service.getAllCertificates());
    }
    
    @PostMapping("/add/certificate")
    @ApiOperation(value = "addCertificate", notes = "API to add new Certificate.")
    public ResponseEntity<?> addCertificate(
            @ApiParam(value = "add certificate payload", required = true) @RequestBody CertificateTO certificateTO) {
        CertificateTO addCertificate = service.addCertificate(certificateTO);
        return ResponseEntity.ok(addCertificate);
    }
    
    @GetMapping("/get/trainerCertificates/{trainerSid}")
    @ApiOperation(value = "getTrainerCertificates", notes = "API to get trainer certificate")
    public ResponseEntity<?> getTrainerCertificates(
            @ApiParam(value = "TrainerSid", required = true)
            @PathVariable("trainerSid") String trainerSid) {
        log.info(String.format("Request received : User  for get trainer certificate"));
        return ResponseEntity.ok(service.getCertificatesBySid(trainerSid));
    }
    
    @PostMapping("/add/training")
    @ApiOperation(value = "addTraining", notes = "API to add new training.")
    public ResponseEntity<?> addTraining(
            @ApiParam(value = "add training payload", required = true) @RequestBody TrainingTO trainingTO) {
        TrainingTO addtraining = service.addTraining(trainingTO);
        return ResponseEntity.ok(addtraining);
    }
    
    @DeleteMapping("/training/{trainingSid}")
	@ApiOperation(value = "deleteTrainingBySid", notes = "API to delete Training")
	public ResponseEntity<?> deleteTrainingBySid(
			@ApiParam(value = "trainingSid", required = true) 
			@PathVariable("trainingSid") String trainingSid ) {
    	log.info(String.format("Request received : User  for delete Training"));
		return ResponseEntity.ok(service.deleteTrainingBySid(trainingSid));
	}
    
    @GetMapping("/trainings")
    @ApiOperation(value = "getAllTrainers", notes = "API to get list of Trainings.")
    public ResponseEntity<?> getTrainings() {
        log.info(String.format("Request received : User  for GET list of Trainings"));
        return ResponseEntity.ok(service.getAllTraining());
    }
}

