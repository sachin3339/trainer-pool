/*********
    * 
    * Alchemy Solutions Pvt Ltd. Confidential
    * ____
    * 
    *  Copyright Alchemy Solutions Pvt Ltd. 2020. All rights reserved
    * 
    * NOTICE:  All information contained herein is, and remains
    * the property of Alchemy Solutions Pvt Ltd. and its suppliers,
    * if any.  The intellectual and technical concepts contained
    * herein are proprietary to Alchemy Solutions Pvt Ltd.
    * and its suppliers and may be covered by U.S. and Foreign Patents,
    * patents in process, and are protected by trade secret or copyright law.
    * Dissemination of this information or reproduction of this material
    * is strictly forbidden unless prior written permission is obtained
    * from Alchemy Solutions Pvt Ltd.
*/
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import { ICN_CAMERA, ICN_CLOSE_S, ICN_STAR, ICN_DUSTBIN, ICN_TRASH_RED, ICN_DOWNLOAD, ICN_ADD } from '../Common/Icons';
import { useConfirmationModal } from '../Common/Hooks/ConfirmationModalHook';
import useToast from "../Common/Hooks/ToastHook";
import { AppUtils } from '../../Utils/AppUtils';
import GlobalConstants from '../../Constants/GlobalConstants';
import moment from 'moment';
import classNames from 'classnames';
import { UploadFile } from '../../Services/AppService';
import * as Yup from 'yup';
import { getNameBySid } from '../../Services/MethodsFactory';
import MESSAGES from '../../Constants/Message';
import Multiselect from 'react-dropdown-select';
import { RestService } from '../../Services/RestService';
// import RatingModal from '../Modals/RatingModal';
import AddCertificateModal from '../Modals/AddCertificateModal';
import LogTrainingModal from '../Modals/LogTrainingModal';

// technology
import javalogo from '../../Assets/img/technology/javaW.png';
import csharplogo from '../../Assets/img/technology/csharp.png';
import microserviceslogo from '../../Assets/img/technology/micro.png';
import springlogo from '../../Assets/img/technology/spring.png';
import awslogo from '../../Assets/img/technology/aws.png';
import hadooplogo from '../../Assets/img/technology/hadoop.png';
import juniperlogo from '../../Assets/img/technology/juniper.png';
import pythonlogo from '../../Assets/img/technology/python.png';

const TrainerDetails = ({
    trainerInfo,
    setTrainerInfo,
    // referenceList,
    clientList,
    allSkills,
    isFromAdmin = false,
    getTrainerDetailsBySid,
    callback
}) => {
    const Toast = useToast();
    const coreSkills = trainerInfo.trainerSkills.filter(r => r.core === true).map(s => s.skill);
    const additionalSkills = trainerInfo.trainerSkills.filter(r => r.core === false).map(s => s.skill);
    const [profileInfoModal, setProfileInfoModal] = useState(null);
    const [contactInfoModal, setContactInfoModal] = useState(null);
    const [skillInfoModal, setSkillInfoModal] = useState(null);
    const [otherInfoModal, setOtherInfoModal] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedResume, setSelectedResume] = useState("");
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    // const [showRatingModal, setShowRatingModal] = useState(null);
    const [selectedRating, setSelectedRating] = useState("");
    const [addCertificateModal, setAddCertificateModal] = useState(null);
    const [allCertificateList, setAllCertificateList] = useState([]);
    const [trainerCertificateList, setTrainerCertificateList] = useState([]);
    const [showLogTrainingModal, setShowLogTrainingModal] = useState(null);

    // validation schema for add trainer modal
    const createTrainerShema = Yup.object().shape({
        firstName: Yup.string()
            .required('Name is required'),
        email: Yup.string()
            .email('Please enter a valid email address')
            .required('Email id is required')
    });

    // validate mobile field
    const validateMobileNumber = (value) => {
        let error;
        if (!value) {
            error = "Mobile number is required";
        } else if (!/(^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$)/i.test(value)) {
            error = "Please enter valid mobile number"
        }
        return error;
    }

    // Initializing Confirmation modal props
    const [showConfirmModal, ConfirmationComponent] = useConfirmationModal({
        title: "Delete Confirmation",
        body: <div className="p-3">Are you sure to delete training</div>,
        onConfirm: (sid) => deleteTraining(sid),
        onCancel: () => { }
    });

    // this method fires when user click on delete on training
    const deleteTraining = (trainerSid) => {
        try {
            RestService.DeleteTraining(trainerSid).then(([res]) => {
                // update trainer info
                if(typeof callback === "function") callback(trainerInfo.sid);
                Toast.success({message: "Training deleted successfully"});
            }).catch((err) => {
                console.error("Error occurred while deleteTraining" + err);
            });
        } catch (err) {
            console.error("Error occurred while deleteTraining" + err);
        }

    }

    /*
    * update trainer
    * @{object} values
    */
    const updateTrainer = (values, isCertAddded = false) => {
        try {
            let payload = { ...trainerInfo }
            payload.firstName = values.firstName;
            payload.lastName = values.lastName;
            payload.email = values.email;
            payload.imageLocation = selectedImage ? selectedImage : values.imageLocation;
            payload.designation = values.designation;
            // payload.charges = values.charges;
            payload.linkedPath = values.linkedPath;
            payload.location = values.location;
            payload.mobileNumber = values.mobileNumber;
            payload.description = values.description;
            payload.referenceId = values.referenceId;
            payload.clientId = values.clientId;
            payload.rating = (selectedRating / 20).toFixed(1);
            payload.resumePath = selectedResume ? selectedResume : "";
            payload.coursePath = selectedCourse ? selectedCourse : "";
            payload.trainerSkills = AppUtils.isEmptyArray(selectedSkills) ? [] : selectedSkills;
            payload.trainerCertificates = !AppUtils.isEmptyArray(values.trainerCertificates) && isCertAddded ? values.trainerCertificates : [];
            payload.modeOfDelivery = values.modeOfDelivery;

            AppUtils.httpPut(GlobalConstants.TRAINER.UPDATE_TRAINER, payload).then(([data]) => {
                setTrainerInfo(data);
                Toast.success({ message: MESSAGES.TRAINER_UPDATE });
                setProfileInfoModal(false);
                setContactInfoModal(false);
                setSkillInfoModal(false);
                setOtherInfoModal(false);
            }).catch((err) => {
                console.error("Error occurred while updateTrainer--" + err);
            });
        } catch (err) {
            console.error("Error occurred while updateTrainer--" + err);
        }
    }

    // get all locations list
    const getAllCertificateList = () => {
        try {
            RestService.GetAllCertificateList().then(([res]) => {
                setAllCertificateList(res);
            }).catch((err) => {
                console.error("Error occurred while getAllCertificateList: " + err);
            })
        } catch (err) {
            console.error("Error occurred while getAllCertificateList: " + err);
        }
    }

    // get trainer certificate
    const getTrainerCertificate = (trainerSid) => {
        try {
            RestService.GetTrainerCertificate(trainerSid).then(([res]) => {
                setTrainerCertificateList(res);
            }).catch((err) => {
                console.error("Error occurred while getTrainerCertificate: " + err);
            })
        } catch (err) {
            console.error("Error occurred while getTrainerCertificate: " + err);
        }
    }

    // delete trainer certificate
    const deleteTrainerCertificate = (trainerSid, certificateSid) => {
        try {
            RestService.DeleteTrainerCertificate(trainerSid, certificateSid).then(([res]) => {
                getTrainerDetailsBySid(trainerInfo.sid);
            }).catch((err) => {
                console.error("Error occurred while deleteTrainerCertificate: " + err);
            })
        } catch (err) {
            console.error("Error occurred while deleteTrainerCertificate: " + err);
        }
    }

    // trigger when add/remove skill
    const handleChangeSkill = async (selectedList, core = true) => {
        try {
            // Add new skills business logics goes below
            let tmpSkill = selectedList.filter(val => !trainerInfo.trainerSkills.map(e => e.skill).includes(val))
                .map(skill => ({ "skill": { "sid": skill.sid }, "core": core }));
            setSelectedSkills(tmpSkill);

            // Delete skills business logics goes below
            if (!AppUtils.isNotEmptyArray(tmpSkill)) {
                tmpSkill = trainerInfo.trainerSkills.filter(e => e.core === core)
                    .map(e => e.skill)
                    .filter(val => !selectedList.includes(val));

                if (AppUtils.isNotEmptyArray(tmpSkill)) {
                    for (let i = 0, l = tmpSkill.length; i < l; i++)
                        await RestService.DeleteTrainerSkill(trainerInfo.sid, tmpSkill[i].sid);
                    getTrainerDetailsBySid(trainerInfo.sid)
                }
            }
        } catch (err) {
            console.error("Error occurred while handleChangeSkill: ", err);
        }
    }

    // handle file upload
    const handleUplaoadImage = async (file) => {
        try {
            const res = await UploadFile(file);
            setSelectedImage(res[0]);
        } catch (err) {
            console.error("Error occurred while handleUplaoadImage--" + err);
        }
    }

    // handle file upload
    const handleFileUplaoad = async (file, name) => {
        try {
            const res = await UploadFile(file);
            name === "resumePath" ? setSelectedResume(res[0]) : setSelectedCourse(res[0]);
        } catch (err) {
            console.error("Error occurred while handleFileUplaoad--" + err);
        }
    }

    // update image
    useEffect(() => {
        if (selectedImage) updateTrainer(trainerInfo);
    }, [selectedImage])

    // update selectedResume path and selectedCourse path
    useEffect(() => {
        if (AppUtils.isNotEmptyObject(trainerInfo)) {
            if (trainerInfo.sid) getTrainerCertificate(trainerInfo.sid);
            if (trainerInfo.resumePath) setSelectedResume(trainerInfo.resumePath);
            if (trainerInfo.coursePath) setSelectedCourse(trainerInfo.coursePath);
            if (trainerInfo.rating) setSelectedRating(trainerInfo.rating * 20);
        }
    }, [trainerInfo])

    useEffect(() => {
        getAllCertificateList();
        let scrollTop = document.getElementById("details-top1");
        AppUtils && AppUtils.isNotEmptyObject(scrollTop) && scrollTop.scrollIntoView();
    }, [])

    return <>
        {/* trainer details page from admin settings */}
        <div className="row" id="details-top1">
            <div className="col-sm-12 col-md-8 col-12">
                <div className="td-card-container">
                    <div className="fdc">
                        {/* profile details card */}
                        <div className="td-card">
                            <div className="tpd-header">
                                <div className="tpd-header-action">
                                    {/* <div className={classNames("downloadProfileBtn jic mr-2", {})} onClick={() => setShowRatingModal(true)}><span className="mr-2 mb-1">{ICN_BLUE_STAR}</span><span>Rate Trainer</span></div> */}
                                    <div className={classNames("downloadProfileBtn jic mr-2", { "disabled": trainerInfo.resumePath === "" || trainerInfo.resumePath === null })} onClick={() => AppUtils.downloadFile(trainerInfo.resumePath)}>Download CV</div>
                                    {isFromAdmin && <div className="editBtn" onClick={() => setProfileInfoModal(true)}><i className="fa fa-pencil"></i></div>}
                                </div>
                            </div>
                            <div className="tpd-body">
                                <div className="tpd-pic-div">
                                    <span className="ct-rating">
                                        <div className="rating-badge box-shadow">
                                            <span className="rating-star mr-1">{ICN_STAR}</span>
                                            <span>{trainerInfo.rating && trainerInfo.rating.toFixed(1)}</span>
                                        </div>
                                    </span>
                                    {isFromAdmin && <div className="upl-pic-bg">
                                        <input type="file" accept="image/*" onChange={(e) => handleUplaoadImage(e.target.files[0])} name="file" className="upl-pic-inp" multiple="" uploadcategory="trainer" usersid={trainerInfo.sid} />
                                        {ICN_CAMERA}
                                    </div>}
                                    <span className="user-profile-pic" style={{ backgroundImage: "url(" + trainerInfo.imageLocation + ")" }}>
                                        {!trainerInfo.imageLocation && <span>{(trainerInfo.firstName && trainerInfo.firstName.slice(0, 2).toUpperCase())}</span>}
                                    </span>
                                </div>
                                <div className="tpd-info">
                                    <div className="title22 jcc">{trainerInfo.firstName} {trainerInfo.lastName}</div>
                                    <div className="f16 c333 jcc">{trainerInfo.designation}<span className="text-muted">{!trainerInfo.designation && "NA"}</span></div>
                                    <div className="f16 c333 jcc">{trainerInfo.location}<span className="text-muted">{!trainerInfo.location && "NA"}</span></div>
                                </div>
                                <div className="tpd-desc">
                                    <div className="tpd-desc-title">Brief Profile</div>
                                    <div className="tpd-desc-info" >{trainerInfo.description}<span className="text-muted">{!trainerInfo.description && "NA"}</span></div>
                                </div>
                            </div>
                        </div>
                        {/* contact details card */}
                        <div className="td-card">
                            <div className="tcd-header">
                                <div className="tpd-header-action">
                                    {isFromAdmin && <div className="editBtn" onClick={() => setContactInfoModal(true)}><i className="fa fa-pencil"></i></div>}
                                </div>
                            </div>
                            <div className="tcd-info">
                                <div className="tcd-title">Contact Info</div>
                                <div className="row mb10">
                                    <div className="col-sm-12 col-md-3 col-12 text-muted">Phone:</div>
                                    <div className="col-sm-12 col-md-9 col-12 elps"><a href={`tel:${trainerInfo.mobileNumber}`}>{trainerInfo.mobileNumber}<span className="text-muted">{!trainerInfo.mobileNumber && "NA"}</span></a></div>
                                </div>
                                <div className="row mb10">
                                    <div className="col-sm-12 col-md-3 col-12 text-muted">Email:</div>
                                    <div className="col-sm-12 col-md-9 col-12 elps"><a href={`mailto:${trainerInfo.email}`}>{trainerInfo.email}<span className="text-muted">{!trainerInfo.email && "NA"}</span></a></div>
                                </div>
                                <div className="row mb10">
                                    <div className="col-sm-12 col-md-3 col-12 text-muted">Linkedin:</div>
                                    <div className="col-sm-12 col-md-9 col-12 elps"><a href={trainerInfo.linkedPath} target="_blank">{trainerInfo.linkedPath}<span className="text-muted">{!trainerInfo.linkedPath && "NA"}</span></a></div>

                                </div>
                            </div>
                        </div>
                        {/* end contact details card */}

                        {/* Core skill(s) details card */}
                        <div className="td-card">
                            <div className="tcd-header">
                                <div className="tpd-header-action">
                                    {
                                        isFromAdmin
                                        && <div className="editBtn" onClick={() => setSkillInfoModal(true)}>
                                            <i className="fa fa-pencil"></i>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="tcd-info fdc">
                                <div className="tcd-title">Core Skill(s)</div>
                                <div className="flx flexWrap">
                                    {AppUtils.isEmptyArray(trainerInfo.trainerSkills) ||
                                        (!AppUtils.isEmptyArray(trainerInfo.trainerSkills) && AppUtils.isEmptyArray(trainerInfo.trainerSkills.filter(r => r.core === true))) && <div className="text-muted">No core skill found</div>}
                                    {!AppUtils.isEmptyArray(trainerInfo.trainerSkills) && trainerInfo.trainerSkills.filter(r => r.core === true).map((trSkill, i) => <div key={i} className="courseBtn mr-2 mb-1">{trSkill.skill.name}</div>)}
                                </div>
                                <div className="tcd-title">Additional Skill(s)</div>
                                <div className="flx flexWrap">
                                    {AppUtils.isEmptyArray(trainerInfo.trainerSkills) ||
                                        (!AppUtils.isEmptyArray(trainerInfo.trainerSkills) && AppUtils.isEmptyArray(trainerInfo.trainerSkills.filter(r => r.core === false))) && <div className="text-muted">No additional skill found</div>}
                                    {!AppUtils.isEmptyArray(trainerInfo.trainerSkills) && trainerInfo.trainerSkills.filter(r => r.core === false).map((trSkill, i) => <div key={i} className="courseBtn1 mr-2 mb-1">{trSkill.skill.name}</div>)}
                                </div>
                            </div>
                        </div>
                        {/* end core skill card */}

                        {/* add certificate details card */}
                        <div className="td-card">
                            <div className="tcd-header">
                                <div className="tpd-header-action">
                                    {isFromAdmin && <div className="editBtn addCertBtn" onClick={() => setAddCertificateModal(true)}>{ICN_ADD}</div>}
                                </div>
                            </div>
                            <div className="tcd-info">
                                <div className="tcd-title">Certifications</div>
                                {AppUtils.isEmptyArray(trainerCertificateList) && <div className="text-muted">No certification found</div>}
                                {AppUtils.isNotEmptyArray(trainerCertificateList) && trainerCertificateList.map((r, i) => <div key={i} className="tc-card">
                                    <div className="tc-card-body">
                                        <div className=""><span className={classNames("px-2 current-active cp", { "disabled": !r.certificateurl })} onClick={() => AppUtils.downloadFile(r.certificateurl)}>{ICN_DOWNLOAD}</span><span className="tc-title">{r.certificate.name}</span></div>
                                        <div className="tc-subtitle"><span>{r.certificate.issuedBy}</span> -<span className="mx-1">{moment(parseInt(r.issuedDate)).format('MMMM')}</span><span>{moment(parseInt(r.issuedDate)).format('YYYY')}</span></div>
                                        {isFromAdmin && <div className="tc-deleteBtn cp" onClick={() => deleteTrainerCertificate(trainerInfo.sid, r.certificate.sid)}>{ICN_TRASH_RED}</div>}
                                    </div>
                                </div>)}
                            </div>
                        </div>
                        {/* end certificate details card */}

                        {/* other details card */}
                        <div className="td-card">
                            <div className="tcd-header">
                                <div className="tpd-header-action">
                                    {isFromAdmin && <div className="editBtn" onClick={() => setOtherInfoModal(true)}><i className="fa fa-pencil"></i></div>}
                                </div>
                            </div>
                            <div className="tcd-info">
                                <div className="tcd-title">Other Details</div>
                                {/* <div className="row mb10">
                                    <div className="col-sm-12 col-md-3 col-12 text-muted">Trainer Charge:</div>
                                    <div className="col-sm-12 col-md-9 col-12 elps"><span>INR </span>{trainerInfo.charges}<span> / day</span></div>
                                </div> */}
                                <div className="row mb10">
                                    <div className="col-sm-12 col-md-3 col-12 text-muted">Course Content:</div>
                                    <div className="col-sm-12 col-md-9 col-12 elps"><span className="text-link cp" onClick={() => AppUtils.downloadFile(trainerInfo.coursePath)}>{trainerInfo && trainerInfo.coursePath && trainerInfo.coursePath.split("-")[trainerInfo.coursePath.split("-").length - 1]}<span className="text-muted">{!trainerInfo.coursePath && "NA"}</span></span></div>
                                </div>
                                <div className="row mb10">
                                    <div className="col-sm-12 col-md-3 col-12 text-muted">CV:</div>
                                    <div className="col-sm-12 col-md-9 col-12 elps"><span className="text-link cp" onClick={() => AppUtils.downloadFile(trainerInfo.resumePath)}>{trainerInfo && trainerInfo.resumePath && trainerInfo.resumePath.split("-")[trainerInfo.resumePath.split("-").length - 1]}<span className="text-muted">{!trainerInfo.resumePath && "NA"}</span></span></div>
                                </div>
                                {/* <div className="row mb10">
                                    <div className="col-sm-12 col-md-3 col-12 text-muted">Reference:</div>
                                    <div className="col-sm-12 col-md-9 col-12 elps">{getNameBySid(referenceList, trainerInfo.referenceId)}<span className="text-muted">{!trainerInfo.referenceId && "NA"}</span></div> 
                                </div>*/}
                                <div className="row mb10">
                                    <div className="col-sm-12 col-md-3 col-12 text-muted">Client:</div>
                                    <div className="col-sm-12 col-md-9 col-12 elps">{getNameBySid(clientList, trainerInfo.clientId) === "IBM" ? "IBM" : "Others"}<span className="text-muted">{!trainerInfo.clientId && "NA"}</span></div>
                                </div>
                                <div className="row mb10">
                                    <div className="col-sm-12 col-md-3 col-12 text-muted">Mode of Delivery:</div>
                                    <div className="col-sm-12 col-md-9 col-12 elps">{trainerInfo.modeOfDelivery && GlobalConstants.MOD_OF_DELIVERY.find(r => r.value === trainerInfo.modeOfDelivery).name}<span className="text-muted">{!trainerInfo.modeOfDelivery && "NA"}</span></div>
                                </div>
                            </div>
                        </div>
                        {/* end contact details card */}
                    </div>
                </div>
            </div>
            <div className="col-sm-12 col-md-4 col-12">
                <div className="fdc">
                    {isFromAdmin && <>
                        {/* activity card details */}
                        <div className="td-card">
                            <div className="activity-card">
                                <div className="activity-card-header title1">Activity</div>
                                <div className="activity-card-info">

                                    <div className="activity-row">
                                        <div className="activity-info-title text-muted">Added On:</div>
                                        <div className="activity-info-details">{moment(parseInt(trainerInfo.createdOn)).format("YYYY-MM-DD hh:MM A")}</div>
                                    </div>

                                    <div className="activity-row">
                                        <div className="activity-info-title text-muted">Last Updated On:</div>
                                        <div className="activity-info-details">{moment(parseInt(trainerInfo.lastUpdatedOn)).format("YYYY-MM-DD hh:MM A")}</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        {/* end activity card details */}
                    </>}

                    {/* Training history card details */}
                    <div className="td-card">
                        <div className="activity-card">
                            <div className="activity-card-header jcb">
                                <div className="title1">Training History</div>
                                {isFromAdmin && <div className="logTrainingBtn jic" onClick={() => setShowLogTrainingModal(true)}>+ Log Training</div>}
                            </div>
                            <div className="activity-card-info">
                                {AppUtils.isEmptyArray(trainerInfo.trainerTrainings) && <div className="text-muted py-3 jic">No training available</div>}
                                {AppUtils.isNotEmptyObject(trainerInfo)
                                    && AppUtils.isNotEmptyArray(trainerInfo.trainerTrainings)
                                    && trainerInfo.trainerTrainings.map((trainings, i) => <div key={i} className="trainer-log-card">
                                        <div className="log-card jcb flexWrap">
                                            <div className="activity-info-title">
                                                <div className="cardTitle elps">{trainings.training.companyName},&nbsp;<span className="elps">{trainings.training.trainingName}</span></div>
                                                <div className="f12 text-muted elps">{trainings.training.location}</div>
                                                <div className="f12 text-muted"><span>{moment(parseInt(trainings.training.from)).format("DD-MM-YYYY")}</span>{trainings.training.to !== trainings.training.from && <><span className="mx-1">-</span><span>{moment(parseInt(trainings.training.to)).format("DD-MM-YYYY")}</span></>}</div>
                                            </div>
                                            <div className="rating-badge">
                                                <span className="rating-star mr-1">{ICN_STAR}</span>
                                                <span>{trainings.training.rating && trainings.training.rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                        {isFromAdmin && <div className="eidt-delete-btn" onClick={() => showConfirmModal(trainings.training.sid)}><span className="">{ICN_DUSTBIN}</span></div>}
                                    </div>)}
                            </div>
                        </div>
                    </div>
                    {/* end Training history card details */}

                    {/* {!isFromAdmin && <>
                        <div className="td-card">
                            <div className="activity-card">
                                <div className="activity-card-header jcb">
                                    <div className="title1">Top Trainers</div>
                                </div>
                                <div className="activity-card-info">
                                    {!AppUtils.isEmptyArray(topTrainerList) && topTrainerList.map((trainer, i) => <div key={i} className="activity-row jcb flexWrap">
                                        <div className="activity-info-title flx flx-center">
                                            <div className="mr10">
                                                <span className="top-trainer-pic" style={{ backgroundImage: "url(" + trainer.trainerImageUrl + ")" }}>
                                                    {!trainer.trainerImageUrl && <span>{(trainer.trainerName && trainer.trainerName.slice(0, 2).toUpperCase())}</span>}
                                                </span>
                                            </div>
                                            <div className="">
                                                <div className="cardTitle">{trainer.trainerName}</div>
                                                <div className="f12 text-muted">{trainer.designation}</div>
                                            </div>
                                        </div>
                                        <div className="rating-badge mt-2">
                                            <span className="rating-star mr-1">{ICN_STAR}</span>
                                            <span>{trainer.avgRating && trainer.avgRating.toFixed(1)}</span>
                                        </div>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                        
                        <div className="td-card">
                            <div className="activity-card">
                                <div className="activity-card-header title1">Top Technology</div>
                                <div className="activity-card-info">
                                    {!AppUtils.isEmptyArray(topTechnologyList) && topTechnologyList.map((tech, i) => <div key={i} className="activity-row jcb flexWrap">
                                        <div className="activity-info-title flx flx-center">
                                            <div className="mr10">
                                                <span className="top-tech-pic">
                                                    {tech.technologyName === "Java" && <img src={javalogo}></img>}
                                                    {tech.technologyName === "C#" && <img src={csharplogo}></img>}
                                                    {tech.technologyName === "Microservice" && <img src={microserviceslogo}></img>}
                                                    {tech.technologyName === "AWS" && <img src={awslogo}></img>}
                                                    {tech.technologyName === "Hadoop" && <img src={hadooplogo}></img>}
                                                    {tech.technologyName === "Juniper" && <img src={juniperlogo}></img>}
                                                    {tech.technologyName === "Springboot" && <img src={springlogo}></img>}
                                                    {tech.technologyName === "Python" && <img src={pythonlogo}></img>}
                                                </span>
                                            </div>
                                            <div className="">
                                                <div className="cardTitle">{tech.technologyName}</div>
                                                <div className="f12 text-muted elps">{tech.description}</div>
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </>} */}
                </div>
            </div>
        </div>
        {/* end trainer details page from admin settings */}

        {/* profile info */}
        <Modal show={profileInfoModal} onHide={() => setProfileInfoModal(false)}>
            <Formik
                initialValues={trainerInfo}
                validationSchema={createTrainerShema}
                onSubmit={(values) => updateTrainer(values)}
                enableReinitialize={true} >
                {({ handleSubmit, isSubmitting, errors, isValid, dirty, resetForm }) => (<>
                    <Form className="slider-container" onSubmit={handleSubmit}>
                        <div className="add-trainer-modal">
                            <div className="atm-header jcb">
                                <div>Edit Basic Info</div>
                                <div className="atm-close-icon" onClick={() => { setProfileInfoModal(false); resetForm() }}>{ICN_CLOSE_S}</div>
                            </div>
                            <div className="atm-body p15">
                                <div className="activity-card-header title1">Basic Info</div>
                                <div className="mb-3">
                                    <div className="form-lbl1">Trainer Name<span className="mandatory-field">*</span></div>
                                    <Field name="firstName" className="form-control form-control-sm" />
                                    <ErrorMessage component="span" name="firstName" className="text-danger mb-2 small-text" />
                                </div>
                                <div className="mb-3">
                                    <div className="form-lbl1">Designation</div>
                                    <Field name="designation" className="form-control form-control-sm" />
                                    <ErrorMessage component="span" name="designation" className="text-danger mb-2 small-text" />
                                </div>
                                <div className="mb-3">
                                    <div className="form-lbl1">Location</div>
                                    <Field name="location" className="form-control form-control-sm" />
                                    <ErrorMessage component="span" name="location" className="text-danger mb-2 small-text" />
                                </div>
                                <div className="mb-3">
                                    <div className="form-lbl1">Brief Profile</div>
                                    <Field name="description" className="form-control form-control-sm" as="textarea" />
                                    <ErrorMessage component="span" name="description" className="text-danger mb-2 small-text" />
                                </div>
                            </div>
                            <footer className="sliderFooter">
                                <Button variant="secondary" className="modal-btns mr-2" onClick={() => { setProfileInfoModal(false); resetForm() }}>Cancel</Button>
                                <Button type="submit" className="modal-btns saveBtn mr-3">Save</Button>
                            </footer>
                        </div>
                    </Form>
                </>
                )}
            </Formik>
        </Modal>

        {/* contact modal  */}
        <Modal show={contactInfoModal} onHide={() => setContactInfoModal(false)}>
            <Formik
                initialValues={trainerInfo}
                validationSchema={createTrainerShema}
                onSubmit={(values) => updateTrainer(values)}
                enableReinitialize={true} >
                {
                    ({
                        handleSubmit,
                        resetForm
                    }) => <Form className="slider-container" onSubmit={handleSubmit}>
                            <div className="add-trainer-modal">
                                <div className="atm-header jcb">
                                    <div>Edit Contact Info</div>
                                    <div className="atm-close-icon" onClick={() => {
                                        setContactInfoModal(false);
                                        resetForm()
                                    }}>{ICN_CLOSE_S}</div>
                                </div>
                                <div className="atm-body p15">
                                    <div className="activity-card-header title1">Contact Info</div>
                                    <div className="mb-3">
                                        <div className="form-lbl1">Mobile Number<span className="mandatory-field">*</span></div>
                                        <Field name="mobileNumber" validate={validateMobileNumber} className="form-control form-control-sm" />
                                        <ErrorMessage component="span" name="mobileNumber" className="text-danger mb-2 small-text" />
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-lbl1">Email<span className="mandatory-field">*</span></div>
                                        <Field name="email" className="form-control form-control-sm" />
                                        <ErrorMessage component="span" name="email" className="text-danger mb-2 small-text" />
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-lbl1">Linkedin</div>
                                        <Field name="linkedPath" className="form-control form-control-sm" />
                                        <ErrorMessage component="span" name="linkedPath" className="text-danger mb-2 small-text" />
                                    </div>
                                </div>
                                <footer className="sliderFooter">
                                    <Button variant="secondary" className="modal-btns mr-2" onClick={() => {
                                        setContactInfoModal(false);
                                        resetForm()
                                    }}>Cancel</Button>
                                    <Button type="submit" className="modal-btns saveBtn mr-3">Save</Button>
                                </footer>
                            </div>
                        </Form>
                }
            </Formik>
        </Modal>

        {/* skills info modal  */}
        <Modal
            show={skillInfoModal}
            onHide={() => setSkillInfoModal(false)}>
            <Formik
                initialValues={trainerInfo}
                onSubmit={(values) => updateTrainer(values)}
                enableReinitialize={true} >
                {
                    ({
                        handleSubmit,
                        resetForm
                    }) => <Form className="slider-container" onSubmit={handleSubmit}>
                            <div className="add-trainer-modal">
                                <div className="atm-header jcb">
                                    <div>Edit Skill</div>
                                    <div className="atm-close-icon" onClick={() => {
                                        setSkillInfoModal(false);
                                        resetForm()
                                    }}>{ICN_CLOSE_S}</div>
                                </div>
                                <div className="atm-body p15">
                                    <div className="activity-card-header title1">Skills</div>
                                    <div className="mb-3">
                                        <div className="form-lbl1">Core Skill(s)</div>
                                        {
                                            !AppUtils.isEmptyArray(allSkills)
                                            && <Multiselect
                                                multi={true}
                                                labelField="name"
                                                valueField="name"
                                                color="#c0e8fa"
                                                placeholder="Search skills"
                                                options={allSkills}
                                                values={coreSkills}
                                                onChange={(e) => handleChangeSkill(e, true)}
                                            />
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-lbl1">Additional Skill(s)</div>
                                        {
                                            !AppUtils.isEmptyArray(allSkills)
                                            && <Multiselect
                                                multi={true}
                                                labelField="name"
                                                valueField="name"
                                                color={"#e6fac0"}
                                                placeholder="Search skills"
                                                options={allSkills}
                                                values={additionalSkills}
                                                onChange={(e) => handleChangeSkill(e, false)}
                                            />
                                        }
                                    </div>
                                </div>
                                <footer className="sliderFooter">
                                    <Button
                                        variant="secondary"
                                        className="btn btn-secondary modal-btns mr-2"
                                        onClick={() => {
                                            setSkillInfoModal(false);
                                            resetForm();
                                        }}>Cancel</Button>
                                    <Button type="submit" className="modal-btns saveBtn mr-3">Save</Button>
                                </footer>
                            </div>
                        </Form>
                }
            </Formik>
        </Modal>

        {/* other info modal  */}
        <Modal show={otherInfoModal} onHide={() => setOtherInfoModal(false)}>
            <Formik
                initialValues={trainerInfo}
                onSubmit={(values) => { updateTrainer(values) }}
                enableReinitialize={true} >
                {({ handleSubmit, isSubmitting, values, setFieldValue, errors, isValid, dirty, resetForm }) => (<>
                    <Form className="slider-container" onSubmit={handleSubmit}>
                        <div className="add-trainer-modal">
                            <div className="atm-header jcb">
                                <div>Edit Other Info</div>
                                <div className="atm-close-icon" onClick={() => { setOtherInfoModal(false); resetForm() }}>{ICN_CLOSE_S}</div>
                            </div>
                            <div className="atm-body p15">
                                <div className="activity-card-header title1">Other Details</div>
                                {/* <div className="mb-3">
                                    <div className="form-lbl1">Trainer Charges</div>
                                    <div className="flx"><Field name="charges" className="form-control form-control-sm" style={{ width: "100px" }} /><span className="ml-2 mt-1">/ day</span></div>
                                    <ErrorMessage component="span" name="charges" className="text-danger mb-2 small-text" />
                                </div> */}
                                <div className="mb-3">
                                    <div className="form-lbl1">Course Content</div>
                                    <div className="input-group mb-3">
                                        <input type="file" accept=".pdf" onChange={(e) => handleFileUplaoad(e.target.files[0], "coursePath")} id="uploadCourse" className="form-control form-control-sm file-input" />
                                    </div>
                                    <ErrorMessage component="span" name="courseContent" className="text-danger mb-2 small-text" />
                                </div>
                                <div className="mb-3">
                                    <div className="form-lbl1">CV</div>
                                    <div className="input-group mb-3">
                                        <input type="file" accept=".pdf" className="form-control form-control-sm file-input" onChange={(e) => handleFileUplaoad(e.target.files[0], "resumePath")} />
                                    </div>
                                    <ErrorMessage component="span" name="cv" className="text-danger mb-2 small-text" />
                                </div>
                                {/* <div className="mb-3">
                                    <div className="form-lbl1">Reference</div>
                                    <Field name="referenceId" className="form-control form-control-sm" as="select">
                                        <option value=""> -- Select Reference -- </option>
                                        {!AppUtils.isEmptyArray(referenceList) && referenceList.map((r, i) => {
                                            return (
                                                <option key={i} value={r.sid} defaultValue={values && values.referenceId === r.sid ? 'selected' : ''} id={r.sid} name={r.name}>
                                                    {r.name}
                                                </option>
                                            )
                                        })}
                                    </Field>
                                    <ErrorMessage component="span" name="referenceId" className="text-danger mb-2 small-text" />
                                </div> */}
                                <div className="mb-3">
                                    <div className="form-lbl1">Client</div>
                                    <Field name="clientId" className="form-control form-control-sm" as="select">
                                        <option value=""> -- Select Client -- </option>
                                        {!AppUtils.isEmptyArray(clientList) && clientList.map((r, i) => {
                                            return (
                                                <option key={i} value={r.sid} defaultValue={values && values.clientId === r.sid ? 'selected' : ''} id={r.sid} name={r.name}>{r.name}</option>
                                            )
                                        })}
                                    </Field>
                                    <ErrorMessage component="span" name="clientId" className="text-danger mb-2 small-text" />
                                </div>
                                <div className="mb-3">
                                    <div className="form-lbl1">Mode of Delivery</div>
                                    <Field name="modeOfDelivery" className="form-control form-control-sm" as="select">
                                        <option value=""> -- Select Mode of Delivery -- </option>
                                        {!AppUtils.isEmptyArray(GlobalConstants.MOD_OF_DELIVERY) && GlobalConstants.MOD_OF_DELIVERY.map((r, i) => {
                                            return (
                                                <option key={i} value={r.value} defaultValue={values && values.modeOfDelivery === r ? 'selected' : ''} id={r.value} name={r.name}>{r.name}</option>
                                            )
                                        })}
                                    </Field>
                                    <ErrorMessage component="span" name="modeOfDelivery" className="text-danger mb-2 small-text" />
                                </div>

                            </div>
                            <footer className="sliderFooter">
                                <Button variant="secondary" className="modal-btns mr-2" onClick={() => { setOtherInfoModal(false); resetForm() }}>Cancel</Button>
                                <Button type="submit" className="modal-btns saveBtn mr-3">Save</Button>
                            </footer>
                        </div>
                    </Form>
                </>
                )}
            </Formik>
        </Modal>

        {ConfirmationComponent}

        {/* {showRatingModal && <RatingModal {...{ trainerInfo, showRatingModal, setShowRatingModal, selectedRating, setSelectedRating, updateTrainer }} />} */}
        {addCertificateModal && <AddCertificateModal {...{ trainerInfo, addCertificateModal, setAddCertificateModal, handleFileUplaoad, updateTrainer, allCertificateList }} callback={() => getAllCertificateList()} />}
        {showLogTrainingModal && <LogTrainingModal {...{ trainerInfo, showLogTrainingModal, setShowLogTrainingModal, selectedRating, setSelectedRating, allSkills, updateTrainer }} callback={() => updateTrainer(trainerInfo)} />}
    </>;
}

export default TrainerDetails;