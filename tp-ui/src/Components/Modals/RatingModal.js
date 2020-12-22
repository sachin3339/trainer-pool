import React, { useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { ICN_CLOSE_S } from '../Common/Icons';
import GlobalConstants from '../../Constants/GlobalConstants';

const RatingModal = ({ trainerInfo, showRatingModal, setShowRatingModal, selectedRating, setSelectedRating, updateTrainer }) => {
    useEffect(() => {
        setSelectedRating(trainerInfo.rating * 20)
    }, [showRatingModal])
    return <>
        <Modal show={showRatingModal} onHide={() => setShowRatingModal(false)}>
            <Formik
                initialValues={trainerInfo}
                onSubmit={(values) => {updateTrainer(values); setShowRatingModal(false)}}
                enableReinitialize={true} >
                {
                    ({
                        handleSubmit,
                        resetForm
                    }) => <Form className="slider-container" onSubmit={handleSubmit}>
                            <div className="add-trainer-modal">
                                <div className="atm-header jcb">
                                    <div>Rate Trainer</div>
                                    <div className="atm-close-icon" onClick={() => {
                                        setShowRatingModal(false);
                                        resetForm()
                                    }}>{ICN_CLOSE_S}</div>
                                </div>
                                <div className="npr-body">
                                    <div className="jic npr-rating-header">NPR Rating</div>
                                    <div className="jic npr-count">{selectedRating}</div>
                                    <div class="form-group">
                                        <input type="range" value={selectedRating} class="form-control-range npr-range-selector" onChange={(e) => setSelectedRating(e.target.value)} id="formControlRange" />
                                    </div>
                                    <div className="jcb">
                                        {GlobalConstants.NPR_RANGE.map((r, i) => <div key={i} value={r} className="npr-range" onClick={() => setSelectedRating(r)}>{r}</div>)}
                                    </div>
                                </div>
                                <footer className="sliderFooter">
                                    <Button variant="secondary" className="modal-btns mr-2" onClick={() => {
                                        setShowRatingModal(false);
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

export default RatingModal