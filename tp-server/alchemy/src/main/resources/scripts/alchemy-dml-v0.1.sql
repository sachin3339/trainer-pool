#--=================  alchemy_skill   ==================--

insert into alchemy_skill (sid,name,image_location,description) values(unhex('312ACBAD982547FAAA1111653833AAD5A269BB9B6FD74D689E5A9730F5F932AA'),'Java','/home/eservecloud','java 8');
insert into alchemy_skill (sid,name,image_location,description) values(unhex('402ACBAD982547FAAA1111653833AAD5A269BB9B6FD74D689E5A9730F5F932AA'),'Java','/home/eservecloud/downloads','java 9');
insert into alchemy_skill (sid,name,image_location,description) values(unhex('612ACBAD982547FAAA1111653833AAD5A269BB9B6FD74D689E5A9730F5F932AA'),'Springboot','/home/eservecloud/downloads','Springboot 2.4');
insert into alchemy_skill (sid,name,image_location,description) values(unhex('713ACBAD982547FAAA1111653833AAD5A269BB9B6FD74D689E5A9730F5F932AA'),'C#','/home/eservecloud/downloads','.net Framework');

#--=================  alchemy_references   ==================--

insert into alchemy_references (sid,name) values(unhex('013ACBAD982547FAAA1111653833AAD5A269BB9B6FD74D689E5A9730F5F932AA'),'abc');
insert into alchemy_references (sid,name) values(unhex('913ACBAD982547FAAA1111653833AAD5A269BB9B6FD74D689E5A9730F5F932AA'),'cde');
insert into alchemy_references (sid,name) values(unhex('003ACBAD982547FAAA1111653833AAD5A269BB9B6FD74D689E5A9730F5F932AA'),'efg');
insert into alchemy_references (sid,name) values(unhex('223ACBAD982547FAAA1111653833AAD5A269BB9B6FD74D689E5A9730F5F932AA'),'hij');


#--=================  alchemy_client   ==================--

insert into alchemy_client (sid,name) values(LEFT(UUID(),8),'IBM');
insert into alchemy_client (sid,name) values(LEFT(UUID(),8),'Accenture');
insert into alchemy_client (sid,name) values(LEFT(UUID(),8),'Tesco');
insert into alchemy_client (sid,name) values(LEFT(UUID(),8),'Wipro');
insert into alchemy_client (sid,name) values(LEFT(UUID(),8),'Capgemini');
insert into alchemy_client (sid,name) values(LEFT(UUID(),8),'CGI');
insert into alchemy_client (sid,name) values(LEFT(UUID(),8),'Wellsfargo');
insert into alchemy_client (sid,name) values(LEFT(UUID(),8),'HDFC');
insert into alchemy_client (sid,name) values(LEFT(UUID(),8),'Citibank');
insert into alchemy_client (sid,name) values(LEFT(UUID(),8),'HDFC');

#--=================  alchemy_trainer   ==================--

insert into alchemy_trainer (sid,first_name,last_name,email,image_location,last_training_conducted_on,designation,charges,linked_in_path,resume_path,location,
mobile_number,last_updated_on,reference_id,client_id,status,rating) 
values(unhex('312ACBAD982547FAAA1111653833AAD5A269BB9B6FD74D689E5A9730F5F932AA'),'Kanhiya','Kumar','kanhiya@alchemy.com','/home/eservecloud',14112020,
'Cloud Engineer',6000.0,'linked.com/kanhiyakumar','/home/eservecloud','Bangalore',9785489836,14112020,2,3,'DISABLED',4);
insert into alchemy_trainer (sid,first_name,last_name,email,image_location,last_training_conducted_on,designation,charges,linked_in_path,resume_path,location,
mobile_number,last_updated_on,reference_id,client_id,status,rating) 
values(unhex('402ACBAD982547FAAA1111653833AAD5A269BB9B6FD74D689E5A9730F5F932AA'),'Kanhiya','Kumar','kanhiyak@alchemy.com','/home/eservecloud',14112020,'C# developer',000.0,'linked.com/kanhiyakumar','/home/eservecloud','Bangalore',8785489836,14112020,2,3,'DISABLED',4.5);
insert into alchemy_trainer (sid,first_name,last_name,email,image_location,last_training_conducted_on,designation,charges,linked_in_path,resume_path,location,
mobile_number,last_updated_on,reference_id,client_id,status,rating) 
values(unhex('612ACBAD982547FAAA1111653833AAD5A269BB9B6FD74D689E5A9730F5F932AA'),'Ankit','Kumar','ankit@alchemy.com','/home/eservecloud/downloads',13112020,'Java developer',8000.0,'linked.com/ankitkumar','/home/eservecloud','Pune',9785425836,13112020,1,3,'DISABLED',4);
insert into alchemy_trainer (sid,first_name,last_name,email,image_location,last_training_conducted_on,designation,charges,linked_in_path,resume_path,location,
mobile_number,last_updated_on,reference_id,client_id,status,rating) 
values(unhex('713ACBAD982547FAAA1111653833AAD5A269BB9B6FD74D689E5A9730F5F932AA'),'Himanshu','Kumar','himanshu@alchemy.com','/home/eservecloud/downloads',14112020,'Python developer',5000.0,'linked.com/kanhiyakumar','/home/eservecloud','Pune',9785889836,14112020,3,3,'DISABLED',4.3);

#--=================  alchemy_courses_trainer   ==================--

insert into alchemy_courses_trainer(sid,course_id,trainer_id,active) values(LEFT(UUID(),8),2,3,1);
insert into alchemy_courses_trainer(sid,course_id,trainer_id,active) values(LEFT(UUID(),8),2,3,1);
insert into alchemy_courses_trainer(sid,course_id,trainer_id,active) values(LEFT(UUID(),8),3,4,1);
insert into alchemy_courses_trainer(sid,course_id,trainer_id,active) values(LEFT(UUID(),8),1,1,1);

#--=================  alchemy_courses_trainer   ==================--

insert into alchemy_trainer_skill(sid,trainer_id,skill_id,is_core) values(LEFT(UUID(),8),4,3,1);

#--=================  alchemy_certificate   ==================--

insert into alchemy_certificate (sid,name,issued_by) values(unhex('013ACBAD982547FAAA1111653833AAD5A269BB9B6FD74D689E5A9730F5F932AA'),'Java','Oracle corporation');
insert into alchemy_certificate (sid,name,issued_by) values(unhex('913ACBAD982547FAAA1111653833AAD5A269BB9B6FD74D689E5A9730F5F932AA'),'C#','Microsoft corporation');
insert into alchemy_certificate (sid,name,issued_by) values(unhex('003ACBAD982547FAAA1111653833AAD5A269BB9B6FD74D689E5A9730F5F932AA'),'Cloud Computing','EMC2 corporation');

#--=================  alchemy_trainer_certificate   ==================--

insert into alchemy_trainer_certificate(sid,trainer_id,cerficate_id,issue_date,certificate_url) values(LEFT(UUID(),8),4,1,26112020,'/home/eservecloud/downloads');
insert into alchemy_trainer_certificate(sid,trainer_id,cerficate_id,issue_date,certificate_url) values(LEFT(UUID(),8),4,2,26112020,'/home/eservecloud');
insert into alchemy_trainer_certificate(sid,trainer_id,cerficate_id,issue_date,certificate_url) values(LEFT(UUID(),8),5,3,26112020,'/home/eservecloud');
insert into alchemy_trainer_certificate(sid,trainer_id,cerficate_id,issue_date,certificate_url) values(LEFT(UUID(),8),6,3,26112020,'/home/eservecloud/downloads');
