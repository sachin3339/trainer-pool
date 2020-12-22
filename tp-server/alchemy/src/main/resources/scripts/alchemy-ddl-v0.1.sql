#--=================  alchemy_skill   ==================--


DROP TABLE IF EXISTS alchemy_skill;
CREATE TABLE IF NOT EXISTS alchemy_skill (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sid binary(32) NOT NULL,
  name VARCHAR(255) NOT NULL,
  image_location VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY sid (sid)
);

#--=================  alchemy_references   ==================--

DROP TABLE IF EXISTS alchemy_references;
CREATE TABLE IF NOT EXISTS alchemy_references (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sid binary(32) NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY sid (sid)
);

#--=================  alchemy_client   ==================--

DROP TABLE IF EXISTS alchemy_client;
CREATE TABLE IF NOT EXISTS alchemy_client (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sid binary(32) NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY sid (sid)
);

#--=================  alchemy_course   ==================--

DROP TABLE IF EXISTS alchemy_course;
CREATE TABLE IF NOT EXISTS alchemy_course (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sid binary(32) NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  code VARCHAR(255) NOT NULL,
  start_time LONG,
  end_time LONG,
  fees double,
  status ENUM('NOTSTARTED','ONGOING','COMPLETED') NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY sid (sid),
  UNIQUE KEY code (code)
);

#--=================  alchemy_trainer   ==================--

DROP TABLE IF EXISTS alchemy_trainer;
CREATE TABLE IF NOT EXISTS alchemy_trainer (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sid binary(32) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  image_location VARCHAR(255) NOT NULL,
  last_training_conducted_on LONG,
  designation VARCHAR(255) NOT NULL,
  charges double,
  linked_in_path VARCHAR(255) NOT NULL,
  resume_path VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  mobile_number LONG NOT NULL,
  last_updated_on LONG,
  created_on LONG NOT NULL,
  course_path VARCHAR(255),
  reference_id INT(11) NOT NULL,
  client_id INT(11) NOT NULL,
  status ENUM('ENABLED','DISABLED') NOT NULL,
  rating double,
  mode_of_delivery ENUM('ILT','VILT','SELF_LEARNING') NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY sid (sid),
  UNIQUE KEY email (email),
  CONSTRAINT fk_alchemy_trainer_1 FOREIGN KEY (reference_id) REFERENCES alchemy_references (id),
  CONSTRAINT fk_alchemy_trainer_2 FOREIGN KEY (client_id) REFERENCES alchemy_client (id)
);

#--=================  alchemy_courses_skill   ==================--

DROP TABLE IF EXISTS alchemy_courses_skill;
CREATE TABLE IF NOT EXISTS alchemy_courses_skill (
  sid binary(32) NOT NULL,
  course_id INT(11) NOT NULL,
  skill_id INT(11) NOT NULL,
  UNIQUE KEY sid (sid),
  CONSTRAINT fk_alchemy_courses_skill_1 FOREIGN KEY (course_id) REFERENCES alchemy_course (id),
  CONSTRAINT fk_alchemy_courses_skill_2 FOREIGN KEY (skill_id) REFERENCES alchemy_skill (id)
);

#--=================  alchemy_courses_trainer   ==================--

DROP TABLE IF EXISTS alchemy_courses_trainer;
CREATE TABLE IF NOT EXISTS alchemy_courses_trainer (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sid binary(32) NOT NULL,
  course_id INT(11) NOT NULL,
  trainer_id INT(11) NOT NULL,
  active TINYINT(1) DEFAULT '0',
  PRIMARY KEY (id),
  UNIQUE KEY sid (sid),
  CONSTRAINT fk_alchemy_courses_trainer_1 FOREIGN KEY (course_id) REFERENCES alchemy_course (id),
  CONSTRAINT fk_alchemy_courses_trainer_2 FOREIGN KEY (trainer_id) REFERENCES alchemy_trainer (id)
);

#--=================  alchemy_trainer_skill   ==================--

DROP TABLE IF EXISTS alchemy_trainer_skill;
CREATE TABLE IF NOT EXISTS alchemy_trainer_skill (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sid binary(32) NOT NULL,
  trainer_id INT(11) NOT NULL,
  skill_id INT(11) NOT NULL,
  is_core TINYINT(1) DEFAULT '0',
  PRIMARY KEY (id),
  UNIQUE KEY sid (sid),
  CONSTRAINT fk_alchemy_trainer_skill_1 FOREIGN KEY (trainer_id) REFERENCES alchemy_trainer (id),
  CONSTRAINT fk_alchemy_trainer_skill_2 FOREIGN KEY (skill_id) REFERENCES alchemy_skill (id)
);


#--=================  alchemy_requester  ==================--

DROP TABLE IF EXISTS alchemy_requester;
CREATE TABLE IF NOT EXISTS alchemy_requester (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sid binary(32) NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY sid (sid)
);

#--=================  alchemy_trainer_rating   ==================--

DROP TABLE IF EXISTS alchemy_trainer_rating;
CREATE TABLE IF NOT EXISTS alchemy_trainer_rating (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sid binary(32) NOT NULL,
  comments VARCHAR(255) ,
  trainer_id INT(11) NOT NULL,
  student_id INT(11) NOT NULL,
  rating double,
  PRIMARY KEY (id),
  UNIQUE KEY sid (sid),
  CONSTRAINT fk_alchemy_trainer_rating_1 FOREIGN KEY (trainer_id) REFERENCES alchemy_trainer (id),
  CONSTRAINT fk_alchemy_trainer_rating_2 FOREIGN KEY (student_id) REFERENCES alchemy_requester (id)
);

#--=================  alchemy_admin ==================--

DROP TABLE IF EXISTS alchemy_admin;
CREATE TABLE IF NOT EXISTS alchemy_admin (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sid binary(32) NOT NULL,
  email VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY sid (sid)
);

#--=================  top_trainers ==================--

DROP VIEW IF EXISTS top_trainers;
CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `eservecloud`@`%` 
    SQL SECURITY DEFINER
VIEW `alchemy`.`top_trainers` AS
SELECT 
        LEFT(UUID(), 8) AS `id`,
        `t`.`sid` AS `sid`,
        CONCAT(`t`.`first_name`, ' ', `t`.`last_name`) AS `trainer_name`,
        `t`.`image_location` AS `image_location`,
        `t`.`email` AS `email`,
        `t`.`designation` AS `designation`,
        AVG(`tr`.`rating`) AS `avg_rating`
    FROM
        `alchemy`.`alchemy_trainer` `t`
        INNER JOIN `alchemy`.`alchemy_trainer_training` `td` ON `td`.`trainer_id`=`t`.`id`
        INNER JOIN `alchemy`.`alchemy_training_details` `tr` ON `tr`.`id` = `td`.`training_id`        
    GROUP BY `t`.`id`
    ORDER BY `avg_rating` DESC;

#--=================  top_technology ==================--

DROP VIEW IF EXISTS top_technology;
create view top_technology AS select LEFT(UUID(),8) as id,s.sid,s.name,s.description,
s.image_location, count(cs.course_id) AS course_count from alchemy_courses_skill cs
inner join alchemy_skill s on cs.skill_id = s.id group by cs.skill_id order by cs.course_id desc;

#--=================  trainer_skill_search ==================--

DROP VIEW IF EXISTS trainer_skill_search;
CREATE
    ALGORITHM = UNDEFINED
    DEFINER = `eservecloud`@`%`
    SQL SECURITY DEFINER
VIEW `alchemy`.`trainer_skill_search` AS
    SELECT
        UUID() AS `id`,
        `a`.`id` AS `trainer_id`,
        `a`.`first_name` AS `first_name`,
        `a`.`last_name` AS `last_name`,
        `a`.`location` AS `location`,
        `ass`.`name` AS `skill_name`
    FROM
        ((`alchemy`.`alchemy_trainer` `a`
        LEFT JOIN `alchemy`.`alchemy_trainer_skill` `ats` ON ((`ats`.`trainer_id` = `a`.`id`)))
        LEFT JOIN `alchemy`.`alchemy_skill` `ass` ON ((`ass`.`id` = `ats`.`skill_id`)))
	where a.status='ENABLED';

#--=================  alchemy_certificate  ==================--

DROP TABLE IF EXISTS alchemy_certificate;
CREATE TABLE IF NOT EXISTS alchemy_certificate (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sid binary(32) NOT NULL,
  name VARCHAR(255) NOT NULL,
  issued_by varchar(255),
  PRIMARY KEY (id),
  UNIQUE KEY sid (sid)
);

#--=================  alchemy_trainer_certificate   ==================--

DROP TABLE IF EXISTS alchemy_trainer_certificate;
CREATE TABLE IF NOT EXISTS alchemy_trainer_certificate (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sid binary(32) NOT NULL,
  trainer_id INT(11) NOT NULL,
  cerficate_id INT(11) NOT NULL,
  issue_date long NOT NULL,
  certificate_url VARCHAR(255) ,
  PRIMARY KEY (id),
  UNIQUE KEY sid (sid),
  CONSTRAINT fk_alchemy_trainer_certificate_1 FOREIGN KEY (trainer_id) REFERENCES alchemy_trainer (id),
  CONSTRAINT fk_alchemy_trainer_certificate_2 FOREIGN KEY (cerficate_id) REFERENCES alchemy_certificate (id)
);

#--=================  alchemy_training_details   ==================--

DROP TABLE IF EXISTS alchemy_training_details;
CREATE TABLE IF NOT EXISTS alchemy_training_details (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sid binary(32) NOT NULL,
  trainer_name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  rating double,
  status ENUM('ENABLED','DISABLED') NOT NULL,
  training_till LONG,
  training_from LONG NOT NULL,
  skill_id INT(11) NOT NULL,
  trainer_id INT(11) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY sid (sid),
  CONSTRAINT fk_alchemy_training_details_1 FOREIGN KEY (skill_id) REFERENCES alchemy_skill (id),
  CONSTRAINT fk_alchemy_training_details_2 FOREIGN KEY (trainer_id) REFERENCES alchemy_trainer (id)
);

#--=================  alchemy_training_skills   ==================--

DROP TABLE IF EXISTS alchemy_training_skills;
CREATE TABLE IF NOT EXISTS alchemy_training_skills (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sid binary(32) NOT NULL,
  training_id INT(11) NOT NULL,
  skill_id INT(11) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY sid (sid),
  CONSTRAINT fk_alchemy_training_skills_1 FOREIGN KEY (training_id) REFERENCES alchemy_training_details (id),
  CONSTRAINT fk_alchemy_training_skills_2 FOREIGN KEY (skill_id) REFERENCES alchemy_skill (id)
);

#--=================  alchemy_trainer_training   ==================--

DROP TABLE IF EXISTS alchemy_trainer_training;
CREATE TABLE IF NOT EXISTS alchemy_trainer_training (
  id INT(11) NOT NULL AUTO_INCREMENT,
  sid binary(32) NOT NULL,
  trainer_id INT(11) NOT NULL,
  training_id INT(11) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY sid (sid),
  CONSTRAINT fk_alchemy_trainer_training_1 FOREIGN KEY (trainer_id) REFERENCES alchemy_trainer (id),
  CONSTRAINT fk_alchemy_trainer_training_2 FOREIGN KEY (training_id) REFERENCES alchemy_training_details (id)
);

#--=================  training_skill_search ==================--

DROP VIEW IF EXISTS training_skill_search;
create view training_skill_search as
select uuid() as id, t.id as trainer_id,t.first_name,t.last_name,t.location,ass.name as skill_name
from alchemy_trainer t  left outer join 
alchemy_trainer_training att on att.trainer_id= t.id left outer join
alchemy_training_skills atss on atss.training_id=att.training_id left outer join
alchemy_skill ass on ass.id=atss.skill_id where t.status='ENABLED';

#--=================  trainer_training_skill_search ==================--

DROP VIEW IF EXISTS trainer_training_skill_search;




#--====== trainer rating view =======
create view vw_trainer_rating
as
select trainer_id as `id`,avg(rating) as `rating`,"someSid" as `sid` from alchemy_trainer_training at1 inner join alchemy_training_details at2 on at1.training_id=at2.id
group by trainer_id;

#--======== Rated trainer view ==========
create view `vw_rated_alchemy_trainer`
as
select at1.id,at1.sid,first_name,last_name,email,image_location,last_training_conducted_on,designation,charges,linked_in_path,
       resume_path,location,mobile_number,last_updated_on,reference_id,client_id,at1.status,description,created_on,course_path,mode_of_delivery,atr.rating as `rating`
from alchemy_trainer at1 left outer join vw_trainer_rating atr on at1.id = atr.id;