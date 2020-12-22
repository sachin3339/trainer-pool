import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import { ICN_CLOSE_S } from '../Common/Icons';
import useToast from "../Common/Hooks/ToastHook";
import { AppUtils } from '../../Utils/AppUtils';
import GlobalConstants from '../../Constants/GlobalConstants';
import DatePicker from 'react-datepicker';
import { UploadFile } from '../../Services/AppService';
import Multiselect from 'react-dropdown-select';
import { RestService } from '../../Services/RestService';
import MESSAGES from '../../Constants/Message';
require('react-datepicker/dist/react-datepicker.css')

const AddCertificateModal = ({ trainerInfo, addCertificateModal, setAddCertificateModal, updateTrainer, allCertificateList, callback }) => {
    const Toast = useToast();
    const [selectedFile, setSelectedFile] = useState("");

    const certificateData = {
        "name": "",
        "issuedBy": "",
        "year": new Date(),
        "month": "",
        "certificateFile": ""

    }

    const handleFileUpload = async (file) => {
        try {
            const res = await UploadFile(file);
            setSelectedFile(res);
        } catch (err) {
            console.error("Error occurred while handleFileUplaoad--" + err);
        }
    }

    /* 
    * add certificate for particular trainer
    * @date - string -  date of certificate issue
    * @sid - string - sid of certificate
    */
    const addTrainerCertificate = (date, sid) => {
        try {
            let tmpObj = [{
                "issuedDate": date,
                "certificateurl": selectedFile ? selectedFile[0] : "",
                "certificate": {
                    "sid": sid,
                }
            }]
            if (AppUtils.isNotEmptyArray(tmpObj)) {
                let tmpTrainerInfo = { ...trainerInfo };
                tmpTrainerInfo.trainerCertificates = tmpObj;
                updateTrainer(tmpTrainerInfo, true);
                setAddCertificateModal(false)
            }
        } catch (err) {
            console.error("Error occurred while " + err);
        }
    }

    /* 
    * add new certificate
    * @name - string - name of certificate
    * @issuedBy - string - certificate issued by
    * @date - string -  date of certificate issue
    */
    const addCertificateToList = (name, issuedBy, date) => {
        try {
            RestService.AddCertificate({name: name, issuedBy: issuedBy}).then(([res]) => {
                addTrainerCertificate(date, res.sid);
                // update all list when add new certificate
                if(typeof callback === "function") callback();
            }).catch((err) => {
                setAddCertificateModal(false);
                Toast.error({ message: MESSAGES.CERTIFICATE_ERROR });
                console.error("Error occurred while addCertificate: " + err);
            })
        } catch (err) {
            console.error("Error occurred while addCertificate: " + err);
        }
    }


    /*
    * trigger when click on save button
    * @values - obj - form data
    */
    const handleSave = (values) => {
        try {
            let tmpDate = values.month ? values.year.setMonth(values.month) : values.year;
            if(tmpDate) {
                if (AppUtils.isNotEmptyArray(values.name) && values.name[0].sid) {
                    addTrainerCertificate(tmpDate, values.name[0].sid);
                } else {
                    // TO DO // if certificate already available set exist one
                    // let tmpData = allCertificateList && allCertificateList.find(f => f.name === values.name[0].name);
                    // AppUtils.isNotEmptyObject(tmpData) ? addTrainerCertificate(tmpDate, tmpData.sid) : addCertificateToList(values.name[0].name, values.issuedBy[0].issuedBy, tmpDate);
                    addCertificateToList(values.name[0].name, values.issuedBy[0].issuedBy, tmpDate);
                }
            }
        } catch (err) {
            console.error("Error occurred while handleSave" + err);
        }
    }


    return <Modal show={addCertificateModal} onHide={() => setAddCertificateModal(false)}>
        <Formik
            initialValues={certificateData}
            // onSubmit={(values) => console.log(values)}
            enableReinitialize={true} >
            {({ handleSubmit, isSubmitting, values, setFieldValue, errors, isValid, dirty, resetForm }) => (<>
                <Form className="slider-container">
                    <div className="add-trainer-modal">
                        <div className="atm-header jcb">
                            <div>Add Certificate</div>
                            <div className="atm-close-icon" onClick={() => { setAddCertificateModal(false); resetForm() }}>{ICN_CLOSE_S}</div>
                        </div>
                        <div className="atm-body p15">
                            <div className="mb-3">
                                <div className="form-lbl1">Name</div>
                                <Multiselect
                                    labelField="name"
                                    clearable={true}
                                    valueField="name"
                                    create
                                    onCreateNew={e => setFieldValue("name", e)}
                                    values={values.name.sid ? values.name : []}
                                    placeholder="Search Certificate"
                                    options={allCertificateList}
                                    onChange={e => setFieldValue("name", e)}
                                />
                                {/* <Field name="name" className="form-control form-control-sm" /> */}
                                <ErrorMessage component="span" name="name" className="text-danger mb-2 small-text" />
                            </div>
                            <div className="mb-3">
                                <div className="form-lbl1">Issued By</div>
                                <Multiselect
                                    className={values.name.sid ? "disabled" : ""}
                                    labelField="issuedBy"
                                    clearable={true}
                                    valueField="issuedBy"
                                    create
                                    onCreateNew={e => setFieldValue("issuedBy", e)}
                                    createNewEntries={true}
                                    values={AppUtils.isEmptyArray(values.name) ? [] : values.name}
                                    options={allCertificateList}
                                    onChange={e => setFieldValue("issuedBy", e)}
                                />
                                <ErrorMessage component="span" name="issuedBy" className="text-danger mb-2 small-text" />
                            </div>
                            <div className="mb-3">
                                <div className="form-lbl1">Issued On</div>
                                <div className="flx">
                                    <Field name="month" className="form-control form-control-sm mr-4 month-picker" as="select">
                                        <option value=""> -- Select Month -- </option>
                                        {!AppUtils.isEmptyArray(GlobalConstants.MONTH_LIST) && GlobalConstants.MONTH_LIST.map((r, i) => {
                                            return (
                                                <option key={i} value={i} id={r} name={r}>{r}</option>
                                            )
                                        })}
                                    </Field>

                                    <DatePicker
                                        name="year"
                                        className="form-control form-control-sm date-picker-input"
                                        selected={values.year ? values.year : new Date()}
                                        onChange={e => { setFieldValue("year", e) }}
                                        showYearPicker
                                        dateFormat="yyyy"
                                        yearItemNumber={9}
                                    />
                                </div>
                                <ErrorMessage component="span" name="month" className="text-danger mb-2 small-text" />
                            </div>
                            <div className="mb-3">
                                <div className="form-lbl1">Upload Certificate</div>
                                <div className="input-group mb-3">
                                    <input type="file" accept=".pdf" className="form-control form-control-sm file-input" onChange={(e) => handleFileUpload(e.target.files[0])} />
                                </div>
                            </div>
                        </div>
                        <footer className="sliderFooter">
                            <Button variant="secondary" className="modal-btns mr-2" onClick={() => { setAddCertificateModal(false); resetForm() }}>Cancel</Button>
                            <Button className="modal-btns saveBtn mr-3" onClick={() => handleSave(values)}>Save</Button>
                        </footer>
                    </div>
                </Form>
            </>
            )}
        </Formik>
    </Modal>;
}

export default AddCertificateModal;