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
import GlobalConstants from "../Constants/GlobalConstants"
import { AppUtils } from "../Utils/AppUtils"
export const RestService = {
    SendOTP: (email) => AppUtils.httpGet(GlobalConstants.API.SEND_OTP.replace("{{EMAIL}}", email)),
    ResendOTP: (otpToken, email) => AppUtils.httpGet(GlobalConstants.API.RESEND_OTP.replace("{{OTP_TOKEN}}", otpToken).replace("{{EMAIL}}", email)),
    VerifyOTP: (otpToken, otp) => AppUtils.httpGet(GlobalConstants.API.VERIFY_OTP.replace("{{OTP_TOKEN}}", otpToken).replace("{{OTP}}", otp)),
    DownloadFile: (fileName) => AppUtils.httpPost(GlobalConstants.API.DOWNLOAD_FILE, { fileName }),
    GetTrainerDetailsBySid: (sid) => AppUtils.httpGet(GlobalConstants.TRAINER.GET_TRAINER_DETAILS_BY_SID.replace("{trainerSid}", sid)),
    GetTrainerDetailsByEmail: (email) => AppUtils.httpGet(GlobalConstants.TRAINER.GetTrainerDetailsByEmail.replace("{trainerEmailId}", email)),
    SearchTrainer: (searchQuery) => AppUtils.httpGet(GlobalConstants.TRAINER.SEARCH_TRAINER.replace("{searchQuery}", searchQuery)),
    DeleteTrainer: (trainerSid) => AppUtils.httpDelete(GlobalConstants.TRAINER.DELETE_TRAINER.replace("{trainerSid}", trainerSid)),
    GetAllSkill: () => AppUtils.httpGet(GlobalConstants.API.GET_ALL_SKILLS),
    GetAllLocation: () => AppUtils.httpGet(GlobalConstants.API.GET_ALL_LOCATION),
    GetAllCertificateList: () => AppUtils.httpGet(GlobalConstants.API.GET_CERTIFICATE_LIST),
    DeleteTrainerSkill: (trainerId, skillId) => AppUtils.httpDelete(GlobalConstants.API.DELETE_TRAINER_SKILL.replace("{trainerId}", trainerId).replace("{skillId}", skillId)),
    DeleteTrainerCertificate: (trainerSid, certificateSid) => AppUtils.httpDelete(GlobalConstants.API.DELETE_TRAINER_CERTIFICATE.replace("{trainerSid}", trainerSid).replace("{certificateSid}", certificateSid)),
    GetTrainerCertificate: (trainerSid) => AppUtils.httpGet(GlobalConstants.TRAINER.GET_TRAINER_CERTIFICATES.replace("{trainerSid}", trainerSid)),
    AddCertificate: (payload) => AppUtils.httpPost(GlobalConstants.API.ADD_CERTIFICATE, payload),
    AddTraining: (payload) => AppUtils.httpPost(GlobalConstants.API.ADD_TRAINING, payload),
    DeleteTraining: (trainingSid) => AppUtils.httpDelete(GlobalConstants.API.DELETE_TRAINING.replace("{trainingSid}", trainingSid)),
}