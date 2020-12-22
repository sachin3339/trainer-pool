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
import { useEffect, useState, useContext } from "react"
import { useBasicModal } from "./Common/Hooks/BasicModalHook"
import { ICN_CLOSE, ICN_LOGIN } from './Common/Icons'
import { AppUtils } from '../Utils/AppUtils'
import { RestService } from "../Services/RestService"
import OtpInput from 'react-otp-input'
import { Formik, Field } from "formik"
import classNames from "classnames"
import AppContext from "../Contexts/App/App"
import { navigate } from "@reach/router"
import useToast from "./Common/Hooks/ToastHook"
import MESSAGES from "../Constants/Message"

export const Login = ({
    show,
    setShow
}) => {
    const appContext = useContext(AppContext);
    const Toast = useToast();
    const [token, setToken] = useState(null);
    const [otp, setOtp] = useState(null);
    const [email, setEmail] = useState(null);

    // This method used to send OTP
    const sendOTP = async (values) => {
        try {
            setEmail(values.email);
            const [res] = await RestService.SendOTP(values.email);
            setToken(res.key);
            Toast.success({ message: MESSAGES.SUCCESS_SEND_OTP });
        } catch (err) {
            setToken(null);
            Toast.error({ message: MESSAGES.ERROR_INVALID_EMAIL });
        }
    }

    // This method used to re-send OTP
    const resendOTP = async () => {
        try {
            const [res] = await RestService.ResendOTP(token, email);
            Toast.success({ message: MESSAGES.SUCCESS_SEND_OTP });
        } catch (err) {
            Toast.error({ message: MESSAGES.ERROR_RESEND_OTP });
        }
    }

    // This method used to verify otp which is entered by user
    const verifyOTP = async () => {
        try {
            const [res] = await RestService.VerifyOTP(token, otp);
            appContext.setUserInfo({ email, isAdminLogin: true, showAdmin: true });
            navigate("/admin");
        } catch (err) {
            Toast.error({ message: MESSAGES.ERROR_INVALID_OTP });
        }
    }

    // Login modal initialization
    const [showLoginModal, LoginComponent] = useBasicModal({
        body: <div className="login-modal">
            <div className="login-modal-header">
                <div className="login-close cp"
                    onClick={() => setShow(false)}>{ICN_CLOSE}</div>
                <div className="lmh-center">
                    <div className="jcc mb-1">
                        <span className="lh-logo">
                            <span>{ICN_LOGIN}</span>
                        </span>
                    </div>
                    <div className="lh-text">Admin Login</div>
                </div>
            </div>
            <div className="login-modal-body">
                {
                    AppUtils.isEmpty(token)
                    && <Formik
                        onSubmit={sendOTP}
                        initialValues={{}}>
                        {
                            ({
                                handleSubmit,
                                isSubmitting,
                                touched,
                                errors,
                                isValid,
                                dirty
                            }) => <form
                                className="form-signin"
                                onSubmit={handleSubmit}>
                                    <div className="lmb-content">
                                        <div className="loginForm">
                                            <div className="f13 text-muted mb-1">
                                                Enter your Registered Email ID
                                            <span className="mandatory-field">*</span>
                                            </div>
                                            <Field
                                                type="email"
                                                name="email"
                                                id="login-email"
                                                placeholder="Email"
                                                className={classNames("form-control form-control-sm", { "is-invalid": touched.email && errors.email })} />
                                            {touched.email && errors.email && <label className="error" htmlFor="login-email">{errors.email}</label>}
                                        </div>
                                        <div className="jcc">
                                            <button
                                                className="btn btn-sm btn-primary pl-3 pr-3 mt-3"
                                                type="submit"
                                                disabled={isSubmitting || !isValid || !dirty}>
                                                {!isSubmitting && <span>Get OTP</span>}
                                                {
                                                    isSubmitting &&
                                                    <span>
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                        &nbsp;Generating...
                                                    </span>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                </form>
                        }
                    </Formik>
                }

                {
                    AppUtils.isNotEmptyString(token)
                    && <Formik
                        onSubmit={verifyOTP}
                        initialValues={{}}>
                        {
                            ({
                                handleSubmit,
                            }) => <form
                                className="form-signin text-center"
                                onSubmit={handleSubmit}>
                                    <div>
                                        <div className="otp-Form">
                                            <div className="f13 text-muted mb-1">Enter the OTP</div>
                                            <div className="otp-inp-box">
                                                <OtpInput
                                                    value={otp}
                                                    onChange={(otp) => setOtp(otp)}
                                                    numInputs={6}
                                                    shouldAutoFocus={true}
                                                    inputStyle="otp-inp"
                                                />
                                            </div>
                                            <div
                                                className="text-link jcc f12 mt-1 cp"
                                                onClick={resendOTP}>Resend OTP</div>
                                        </div>
                                        <div className="jcc">
                                            <button
                                                type="submit"
                                                className="btn btn-sm btn-primary pl-3 pr-3 mt-3"
                                                disabled={AppUtils.isEmpty(otp)
                                                    || (AppUtils.isNotEmptyString(otp)
                                                        && otp.length < 6)}>Login</button>
                                        </div>
                                    </div>
                                </form>
                        }
                    </Formik>
                }
            </div>
        </div>,
        hideFooter: true,
        hideHeader: true,
        onClose: () => setShow(false)
    })

    // Listens props value of show and displays login modal
    useEffect(() => {
        if (show)
            showLoginModal();
    }, [show])

    return <>
        {LoginComponent}
    </>
}