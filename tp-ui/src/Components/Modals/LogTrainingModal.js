import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import { ICN_CLOSE_S, ICN_CALENDER } from '../Common/Icons';
import useToast from "../Common/Hooks/ToastHook";
import MESSAGES from '../../Constants/Message';
import Multiselect from 'react-dropdown-select';
import { AppUtils } from '../../Utils/AppUtils';
import { RestService } from '../../Services/RestService';
import GlobalConstants from '../../Constants/GlobalConstants';
import DatePicker from 'react-datepicker';
import * as Yup from 'yup';
require('react-datepicker/dist/react-datepicker.css');

const TRAINING_INFO = {
    "trainingName": "",
    "companyName": "",
    "description": "",
    "location": "",
    "rating": 0,
    "status": "ENABLED",
    "to": "",
    "from": "",
    "trainerTrainings": [],
    "trainingSkills": []
}

const LogTrainingModal = ({ trainerInfo, showLogTrainingModal, setShowLogTrainingModal, allSkills, callback }) => {
    const Toast = useToast();
    const [trainingInfo, setTrainingInfo] = useState(TRAINING_INFO);
    const [selectedSkills, setSelectedSkills] = useState([]);

    // validation schema for add training modal
    const addTrainingSchema = Yup.object().shape({
        companyName: Yup.string()
            .required('Company Name is required'),
    });

    // trigger when add/remove skill
    const handleChangeSkill = (selectedList) => {
        try {
            let tmpSkill = selectedList.map(skill => ({ "skill": { "sid": skill.sid } }));
            setSelectedSkills(tmpSkill);
        } catch (err) {
            console.error("Error occurred while handleChangeSkill: ", err);
        }
    }

    /* 
    * add new training for trainer 
    * @values - obj -  form value
    */
    const addTraining = (values) => {
        try {
            let payload = { ...values };
            payload.trainerTrainings = [{ trainer: { sid: trainerInfo.sid } }];
            payload.trainingSkills = selectedSkills;
            payload.from = payload.from ? payload.from.getTime() : new Date().getTime();
            payload.to = payload.to ? payload.to.getTime() : new Date().getTime();
            payload.rating = (payload.rating / 20).toFixed(1);
            RestService.AddTraining(payload).then(([res]) => {
                if (typeof callback === "function") callback();
                setShowLogTrainingModal(false);
                Toast.success({ message: MESSAGES.TRAINING_ADDED });
            }).catch((err) => {
                setShowLogTrainingModal(false);
                Toast.error({ message: MESSAGES.SERVER_ERROR });
                console.error("Error occurred while addTraining: " + err);
            })
        } catch (err) {
            setShowLogTrainingModal(false);
            Toast.error({ message: MESSAGES.SERVER_ERROR });
            console.error("Error occurred while addTraining: " + err);
        }
    }

    return <>
        <Modal show={showLogTrainingModal} onHide={() => setShowLogTrainingModal(false)}>
            <Formik
                initialValues={trainingInfo}
                onSubmit={(values) => { addTraining(values); }}
                enableReinitialize={true}
                validationSchema={addTrainingSchema}
            >
                {
                    ({
                        handleSubmit,
                        resetForm,
                        values,
                        setFieldValue
                    }) => <Form className="slider-container" onSubmit={handleSubmit}>
                            <div className="add-trainer-modal">
                                <div className="atm-header jcb">
                                    <div>Log Training</div>
                                    <div className="atm-close-icon" onClick={() => {
                                        setShowLogTrainingModal(false);
                                        resetForm()
                                    }}>{ICN_CLOSE_S}</div>
                                </div>
                                <div className="atm-body p15">
                                    <div className="mb-3">
                                        <div className="form-lbl1">Trainer Name</div>
                                        <Field name="trainerName" value={trainerInfo.firstName + " " + trainerInfo.lastName} className="form-control form-control-sm disabled" />
                                        <ErrorMessage component="span" name="trainerName" className="text-danger mb-2 small-text" />
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-lbl1">Training Name</div>
                                        <Field name="trainingName" className="form-control form-control-sm" />
                                        <ErrorMessage component="span" name="trainingName" className="text-danger mb-2 small-text" />
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-lbl1">Company Name<span className="mandatory-field">*</span></div>
                                        <Field name="companyName" className="form-control form-control-sm" />
                                        <ErrorMessage component="span" name="companyName" className="text-danger mb-2 small-text" />
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-lbl1">Training Location</div>
                                        <Field name="location" className="form-control form-control-sm" />
                                        <ErrorMessage component="span" name="location" className="text-danger mb-2 small-text" />
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-lbl1">Skills</div>
                                        {
                                            !AppUtils.isEmptyArray(allSkills)
                                            && <Multiselect
                                                multi={true}
                                                labelField="name"
                                                valueField="name"
                                                color="#fac0f3"
                                                placeholder="Search skills"
                                                options={allSkills}
                                                values={[]}
                                                onChange={(e) => handleChangeSkill(e)}
                                            />
                                        }
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-lbl1">Training Date</div>
                                        <div className="jcb">
                                            <div className="jic">
                                                <span className="lt-date-lbl mr-2">From</span>
                                                <DatePicker
                                                    id="lt-from-date"
                                                    className="form-control form-control-sm lt-date-inp"
                                                    selected={values.from ? values.from : new Date()}
                                                    onChange={e => { setFieldValue("from", e) }}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                                <span className="cal-icn" onClick={() => document.getElementById('lt-from-date').click()}>{ICN_CALENDER}</span>
                                            </div>
                                            <div className="jic">
                                                <span className="lt-date-lbl mr-2">To</span>
                                                <DatePicker
                                                    id="lt-to-date"
                                                    className="form-control form-control-sm lt-date-inp"
                                                    selected={values.to ? values.to : new Date()}
                                                    onChange={e => { setFieldValue("to", e) }}
                                                    dateFormat="dd/MM/yyyy"
                                                />
                                                <span className="cal-icn" onClick={() => document.getElementById('lt-to-date').click()}>{ICN_CALENDER}</span>
                                            </div>
                                        </div>
                                        <ErrorMessage component="span" name="from" className="text-danger mb-2 small-text" />
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-lbl1">Training Session NPR Rating</div>
                                        <div className="lt-npr-count pl-1">{values.rating}</div>
                                        <div class="form-group">
                                            <input type="range" value={values.rating} class="form-control-range npr-range-selector" onChange={(e) => setFieldValue("rating", e.target.value)} id="formControlRange" />
                                        </div>
                                        <div className="jcb">
                                            {GlobalConstants.NPR_RANGE.map((r, i) => <div key={i} value={r} className="npr-range" onClick={() => setFieldValue("rating", r)}>{r}</div>)}
                                        </div>
                                    </div>
                                </div>
                                <footer className="sliderFooter">
                                    <Button variant="secondary" className="modal-btns mr-2" onClick={() => {
                                        setShowLogTrainingModal(false);
                                        resetForm()
                                    }}>Cancel</Button>
                                    <Button type="submit" className="modal-btns saveBtn mr-3">Save</Button>
                                </footer>
                            </div>
                        </Form>
                }
            </Formik>
        </Modal>


    </>;
}

export default LogTrainingModal