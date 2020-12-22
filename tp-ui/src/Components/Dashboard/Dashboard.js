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
import React, { useEffect, useState, useContext } from 'react';
import { ICN_HOME, ICN_TEAM, ICN_LOGOUT, ICN_SEARCH_S, ICN_CLOSE_S } from '../Common/Icons';
import GlobalConstants from '../../Constants/GlobalConstants';
import { AppUtils } from '../../Utils/AppUtils';
import TrainerList from '../TrainerList/TrainerList';
import { Modal, Button } from 'react-bootstrap';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import AppContext from "../../Contexts/App/App";
import { navigate } from "@reach/router";
import useToast from "../Common/Hooks/ToastHook";
import TrainerDetails from '../TrainerDetails/TrainerDetails';
import { RestService } from "../../Services/RestService";
import { UploadFile } from '../../Services/AppService';
import classNames from 'classnames';
import Multiselect from 'react-dropdown-select';
import { useConfirmationModal } from '../Common/Hooks/ConfirmationModalHook';
import * as Yup from 'yup';
import MESSAGES from '../../Constants/Message';

const INITIAL_VALUE = {
	"firstName": "",
	"lastName": "",
	"email": "",
	"imageLocation": "",
	"designation": "",
	// "charges": "",
	"linkedPath": "",
	"resumePath": "",
	"coursePath": "",
	"location": "",
	"mobileNumber": "",
	"referenceId": "",
	"clientId": "",
	"modeOfDelivery": "",
	"trainerSkills": [],
	"trainerCertificates" : []
};

const Dashboard = () => {
	const appContext = useContext(AppContext);
	const Toast = useToast();
	const [trainerInfo, setTrainerInfo] = useState(INITIAL_VALUE);
	const [allTrainerList, setAllTrainerList] = useState([]);
	const [addTrainerModal, setAddTrainerModal] = useState(false);
	const [showTrainer, setShowTrainer] = useState(false);
	const [clientList, setClientList] = useState([]);
	const [referenceList, setReferenceList] = useState([]);
	const [searchQuery, setSearchQuery] = useState([]);
	const [selectedCourse, setSelectedCourse] = useState("");
	const [selectedResume, setSelectedResume] = useState("");
	const [allSkills, setAllSkills] = useState([]);
	const [selectedSkills, setSelectedSkills] = useState([]);
	const [selectedAdiSkills, setSelectedAdiSkills] = useState([]);


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

	const getReferenceList = () => {
		try {
			AppUtils.httpGet(GlobalConstants.API.GET_REF_LIST).then(([res]) => {
				setReferenceList(res);
			}).catch((err) => {
				console.error("Error occurred while getReferenceList -- " + err);
			})
		} catch (err) {
			console.error("Error occurred while getReferenceList -- " + err);
		}
	};

	const getClientList = () => {
		try {
			AppUtils.httpGet(GlobalConstants.API.GET_CLIENT_LIST).then(([res]) => {
				setClientList(res);
			}).catch((err) => {
				console.error("Error occurred while getClientList -- " + err);
			})
		} catch (err) {
			console.error("Error occurred while getClientList -- " + err);
		}
	};

	// get trainer details by sid
	const searchTraineByName = (searchstr = searchQuery) => {
		try {
			if (AppUtils.isNotEmptyString(searchstr)) {
				RestService.SearchTrainer(searchstr).then(([res]) => {
					if (AppUtils.isNotEmptyArray(res)) {
						setAllTrainerList(res);
					} else {
						Toast.error({ message: MESSAGES.TRAINER_NOT_AVAILABLE });
					}
				}).catch((err) => {
					Toast.error({ message: MESSAGES.TRAINER_NOT_AVAILABLE });
					console.error("Error occurred while searchTraineByName: " + err);
				})
			}
		} catch (err) {
			console.error("Error occurred while searchTraineByName: " + err);
		}
	}

	// search data when press enter
	const handlePressenter = (e) => {
		if (e.which === 13 || e.keyCode === 13 && e.code === "Enter") {
			searchQuery ? searchTraineByName() : populateAllTrainerList();
		}
	}


	// get trainer list
	const populateAllTrainerList = () => {
		try {
			AppUtils.httpGet(GlobalConstants.TRAINER.GET_ALL_TRAINER).then(([res]) => {
				setAllTrainerList(res.map(e => ({ name: `${e.firstName} ${e.lastName}`, ...e })));
			}).catch((err) => {
				console.error("Error occurred while populateAllTrainerList -- " + err);
			})
		} catch (err) {
			console.error("Error occurred while populateAllTrainerList -- " + err);
		}
	};

	const addTrainer = (values) => {
		try {
			let payload = {
				"firstName": values.firstName,
				"lastName": values.lastName,
				"email": values.email,
				"imageLocation": "",
				"designation": values.designation,
				"description": values.description,
				// "charges": values.charges,
				"linkedPath": values.linkedPath,
				"resumePath": selectedResume ? selectedResume : "",
				"coursePath": selectedCourse ? selectedCourse : "",
				"location": values.location,
				"mobileNumber": values.mobileNumber,
				"status": "ENABLED",
				"referenceId": values.referenceId,
				"clientId": values.clientId,
				"modeOfDelivery": values.modeOfDelivery,
				"trainerSkills": [...selectedSkills, ...selectedAdiSkills],
				"trainerCertificates": [],
				"trainerTrainings": []
			}
			resetFormData();
			AppUtils.httpPost(GlobalConstants.TRAINER.ADD_TRAINER, payload).then(([data]) => {
				populateAllTrainerList();
				setAddTrainerModal(false);
				Toast.success({ message: MESSAGES.TRAINER_ADDED });
			}).catch((err) => {
				setAddTrainerModal(false);
				Toast.error({ message: MESSAGES.SERVER_ERROR });
				console.error("Error occurred while addTrainer--" + err);
			});
		} catch (err) {
			setAddTrainerModal(false);
			Toast.error({ message: MESSAGES.SERVER_ERROR });
			console.error("Error occurred while addTrainer--" + err);
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

	// get trainer details by sid
	const getTrainerDetailsBySid = (sid) => {
		try {
			if (sid) {
				RestService.GetTrainerDetailsBySid(sid).then(([res]) => {
					setTrainerInfo(res);
					setShowTrainer(true);
				}).catch((err) => {
					console.error("Error occurred while getTrainerDetailsBySid: " + err);
				})
			}
		} catch (err) {
			console.error("Error occurred while getTrainerDetailsBySid: " + err);
		}
	}

	// get trainer details by sid
	const deleteTrainer = (sid) => {
		try {
			if (sid) {
				RestService.DeleteTrainer(sid).then(([res]) => {
					populateAllTrainerList();
					Toast.success({ message: MESSAGES.TRAINER_DELETE });
				}).catch((err) => {
					console.error("Error occurred while deleteTrainer: " + err);
				})
			}
		} catch (err) {
			console.error("Error occurred while deleteTrainer: " + err);
		}
	}

	// get all skills list
	const getAllSkills = () => {
		try {
			RestService.GetAllSkill().then(([res]) => {
				setAllSkills(res);
			}).catch((err) => {
				console.error("Error occurred while getAllSkills: " + err);
			})
		} catch (err) {
			console.error("Error occurred while getAllSkills: " + err);
		}
	}

	// trigger when add/remove skill
	const handleChangeSkill = (selectedList, core = true) => {
		try {
			let tmpList = selectedList.map(skill => ({ "skill": { "sid": skill.sid }, "core": core ? true : false }));
			core ? setSelectedSkills(tmpList) : setSelectedAdiSkills(tmpList);
		} catch (err) {
			console.error("Error occurred while handleChangeSkill: " + err);
		}
	}

	// reset some form data
	const resetFormData = () => {
		try {
			setSelectedAdiSkills([]);
			setSelectedSkills([]);
			setSelectedCourse("");
			setSelectedResume("")
		} catch (err) {
			console.log("Error occurred while resetFormData " + err);
		}
	}

	// Initializing Confirmation modal props
	const [showConfirmModal, ConfirmationComponent] = useConfirmationModal({
		title: "Delete Confirmation",
		body: <div className="p-3">Are you sure to delete trainer</div>,
		onConfirm: (sid) => deleteTrainer(sid),
		onCancel: () => { }
	});

	// if searched trainer list update table list
	useEffect(() => {
		if (searchQuery === "") {
			populateAllTrainerList();
			setSearchQuery("");
		}
	}, [searchQuery])

	// update list 
	useEffect(() => {
		if(!showTrainer) populateAllTrainerList();
	}, [showTrainer])


	useEffect(() => {
		populateAllTrainerList();
		getReferenceList();
		getClientList();
		getAllSkills();
	}, [])
	return <div className="main-div">
		<div className="container-fluid">
		<div className="row">
			<nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block sidebar collapse left-panel lpm40">
				<div className="sidebar-sticky">
					<div className="lt-top jic mt-2">
						<div className="py-2">
							<div className="logoIcn mx-4"></div>
							<div className="lt-top-title">
								<span className="title4">{appContext && appContext.userInfo && appContext.userInfo.email}</span>
							</div>
						</div>
					</div>
					<div className="admin-sub-menu" onClick={() => {navigate("/"); appContext.setUserInfo({...appContext.userInfo, isAdminLogin: true, showAdmin: false })}}><span className="pr-2">{ICN_HOME}</span><span className="ibvm">Home</span></div>
					<div className={classNames("admin-sub-menu admin-menu-active")} onClick={() => setShowTrainer(false)}><span className="pr-2">{ICN_TEAM}</span><span className="ibvm">Trainers</span></div>
					<div className="admin-sub-menu" onClick={() => window.location.replace("/alchemy/")}><span className="pr-2">{ICN_LOGOUT}</span><span className="ibvm">Logout</span></div>
				</div>
			</nav>
			<div className="col-md-9 col-lg-10 ml-sm-auto right-main">
				{/* right panel */}
				{/* top search bar */}
				<nav className="admin-top-bar pt-2">
					<div className="jcb flx-center">
						<div className="aic">
							<span className={classNames("mx-1", { "page-active": !showTrainer, "cp": showTrainer })} onClick={() => { if (showTrainer) setShowTrainer(false) }}>
								Trainers({allTrainerList.length})
							</span>
							{showTrainer && <span className="page-active tc">{trainerInfo && trainerInfo.firstName && " / " + trainerInfo.firstName + " " + trainerInfo.lastName}</span>}
						</div>
						
						{!showTrainer && <div className="aic mr50768">
							<div className="mr-3 flx flx-center">
								<span className="searchIcnSmall cp" id="dashSearchIcn" onClick={() => searchTraineByName()}>{ICN_SEARCH_S}</span><input type="text" id="dashSearchInp" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyUp={(e) => handlePressenter(e)} className="form-control t-search-box" placeholder="Search Trainer" />
							</div>
							<div><div className="addTrainerBtn jic" onClick={() => { setTrainerInfo(INITIAL_VALUE); setAddTrainerModal(true) }}>+ Add Trainer</div></div>
						</div>}
						
						{/* toggle icon */}
						<button class="navbar-toggler position-absolute d-md-none collapsed toggleBtn" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
							<span class="navbar-toggler-icon bar1"></span>
						</button>
					</div>
				</nav>

				<div className="right-panel">

					{/* right panel main body */}
					<div className="right-panel-body">
						<div className="h100">
							<div className="p15">
								{
									!showTrainer
									&& <TrainerList {...{
										allTrainerList,
										clientList
									}}
										callback={(sid) => getTrainerDetailsBySid(sid)}
										delCallBack={(sid) => showConfirmModal(sid)} />
								}
								{
									showTrainer
									&& AppUtils.isNotEmptyObject(trainerInfo)
									&& <TrainerDetails {...{
										trainerInfo,
										setTrainerInfo,
										referenceList,
										clientList,
										allSkills,
										getTrainerDetailsBySid,
										isFromAdmin: true,
									}} 
									callback={(sid) => getTrainerDetailsBySid(sid)}/>
								}
							</div>
						</div>
					</div>
					{/* /right panel main body */}
				</div>
				{/* /right panel */}
			</div>
		</div></div>
		{/* let panel */}


		{ConfirmationComponent}
		{/* Add trainer modal */}
		<Modal show={addTrainerModal} onHide={() => {setAddTrainerModal(false); resetFormData()}}>
			<Formik
				initialValues={trainerInfo}
				validationSchema={createTrainerShema}
				onSubmit={(values) => { addTrainer(values); }}
				enableReinitialize={true} >
				{({ handleSubmit, isSubmitting, values, setFieldValue, errors, isValid, dirty, resetForm }) => (<>
					<Form className="slider-container" onSubmit={handleSubmit}>
						<div className="add-trainer-modal">
							<div className="atm-header jcb">
								<div>Add Trainer</div>
								<div className="atm-close-icon" onClick={() => { setAddTrainerModal(false); resetForm(); resetFormData() }}>{ICN_CLOSE_S}</div>
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

								<div className="activity-card-header title1">Contact Info</div>
								<div className="mb-3">
									<div className="form-lbl1">Mobile<span className="mandatory-field">*</span></div>
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

								<div className="activity-card-header title1">Skills</div>
								<div className="mb-3">
									<div className="form-lbl1">Core Skill(s)</div>
									{!AppUtils.isEmptyArray(allSkills) && <Multiselect
										multi
										labelField="name"
										valueField="name"
										color={"#c0e8fa"}
										placeholder="Search skills"
										options={allSkills}
										onChange={(e) => handleChangeSkill(e)}
									/>}
								</div>
								<div className="mb-3">
									<div className="form-lbl1">Additional Skill(s)</div>
									{!AppUtils.isEmptyArray(allSkills) && <Multiselect
										multi
										labelField="name"
										valueField="name"
										color={"#e6fac0"}
										placeholder="Search skills"
										options={allSkills}
										onChange={(e) => handleChangeSkill(e, false)}
									/>}
									{/* <div className="skill-inp-div">
										<div className="courseBtn1 mr-2 mb-1">HTML <span className="ml-2">X</span></div>
										<div className="courseBtn1 mr-2 mb-1">Java <span className="ml-2">X</span></div>
									</div> */}
								</div>

								<div className="activity-card-header title1">Other Details</div>
								{/* <div className="mb-3">
									<div className="form-lbl1">Trainer Charges</div>
									<div className="flx"><Field name="charges" className="form-control form-control-sm" style={{ width: "100px" }} /><span className="ml-2 mt-1">/ day</span></div>
									<ErrorMessage component="span" name="charges" className="text-danger mb-2 small-text" />
								</div> */}
								<div className="mb-3">
									<div className="form-lbl1">Course Content</div>
									<div className="input-group mb-3">
										<input type="file" accept=".pdf" onChange={(e) => handleFileUplaoad(e.target.files[0], "coursePath")} className="form-control form-control-sm file-input" />
									</div>
									<ErrorMessage component="span" name="coursePath" className="text-danger mb-2 small-text" />
								</div>
								<div className="mb-3">
									<div className="form-lbl1">CV</div>
									<div className="input-group mb-3">
										<input type="file" accept=".pdf" onChange={(e) => handleFileUplaoad(e.target.files[0], "resumePath")} className="form-control form-control-sm file-input" />
									</div>
									<ErrorMessage component="span" name="cv" className="text-danger mb-2 small-text" />
								</div>
								{/* <div className="mb-3">
									<div className="form-lbl1">Reference</div>
									<Field name="referenceId" className="form-control form-control-sm" as="select">
										<option>-- Select Reference --</option>
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
										<option>-- Select Client --</option>
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
								<Button variant="secondary" className="modal-btns mr-2" onClick={() => { setAddTrainerModal(false); resetForm(); resetFormData(); }}>Cancel</Button>
								<Button type="submit" className="modal-btns saveBtn mr-3" disabled={isSubmitting || !isValid || !dirty}>Save</Button>
							</footer>
						</div>
					</Form>
				</>
				)}
			</Formik>
		</Modal>
	</div>;
}

export default Dashboard;