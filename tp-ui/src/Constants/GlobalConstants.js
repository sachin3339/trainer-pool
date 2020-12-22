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
let HOSTNAME = window.location.origin; // Storing  a  Host  Name in global variable
if (HOSTNAME !== null && ((HOSTNAME.indexOf('localhost') !== -1) || (HOSTNAME.indexOf('127.0.0.1') !== -1)))
    HOSTNAME = "http://54.83.96.76";

const RESTAPI_HOSTNAME = `${HOSTNAME}/alc/alchemy/`;
const GlobalConstants = {
    ADMIN: {
        VALIDATE_ADMIN_EMAIL: RESTAPI_HOSTNAME + "validateadmin/{adminEmail}",
    },
    API: {
        GET_ALL_SKILLS: RESTAPI_HOSTNAME + "getallskills",
        GET_ALL_LOCATION: RESTAPI_HOSTNAME + "get/locationlist",
        GET_REF_LIST: RESTAPI_HOSTNAME + "getallreferences",
        GET_CLIENT_LIST: RESTAPI_HOSTNAME + "getallclients",
        DELETE_TRAINER_SKILL: RESTAPI_HOSTNAME + "trainerskills/delete/{trainerId}/{skillId}",
        SEND_OTP: RESTAPI_HOSTNAME + "send/otp/{{EMAIL}}",
        RESEND_OTP: RESTAPI_HOSTNAME + "resend/otp/{{OTP_TOKEN}}/email/{{EMAIL}}",
        VERIFY_OTP: RESTAPI_HOSTNAME + "verify/{{OTP_TOKEN}}/otp/{{OTP}}",
        UPLOAD_FILE: RESTAPI_HOSTNAME + "upload",
        DOWNLOAD_FILE: RESTAPI_HOSTNAME + "download",
        GET_CERTIFICATE_LIST: RESTAPI_HOSTNAME + "get/certificates",
        DELETE_TRAINER_CERTIFICATE: RESTAPI_HOSTNAME + "delete/trainercertificates/{trainerSid}/{certificateSid}",
        ADD_CERTIFICATE: RESTAPI_HOSTNAME + "add/certificate",
        ADD_TRAINING: RESTAPI_HOSTNAME + "add/training",
        DELETE_TRAINING: RESTAPI_HOSTNAME + "training/{trainingSid}"
    },
    TRAINER: {
        GET_ALL_TRAINER: RESTAPI_HOSTNAME + "getalltrainers",
        GET_TRAINER_DETAILS_BY_SID: RESTAPI_HOSTNAME + "gettrainerdetails/{trainerSid}",
        GET_TRAINER_DETAILS_BY_EMAIL: RESTAPI_HOSTNAME + "gettrainer/{trainerEmailId}",
        GET_TOP_TRAINER_LIST: RESTAPI_HOSTNAME + "gettoptrainer/{trainerLimit}",
        ADD_TRAINER: RESTAPI_HOSTNAME + "add",
        UPDATE_TRAINER: RESTAPI_HOSTNAME + "update",
        DELETE_TRAINER: RESTAPI_HOSTNAME + "delete/trainer/{trainerSid}",
        SEARCH_TRAINER: RESTAPI_HOSTNAME + "get/trainers/{searchQuery}",
        GET_TRAINER_SKILLS: RESTAPI_HOSTNAME + "get/trainerskills/{trainerSid}",
        GET_TRAINER_CERTIFICATES: RESTAPI_HOSTNAME + "get/trainerCertificates/{trainerSid}"
    },
    TECHNOLOGY: {
        GET_TOP_TECHNOLOGY_LIST: RESTAPI_HOSTNAME + "gettoptechnology/{techLimit}",
    },

    MOD_OF_DELIVERY: [{"name": "ILT", "value": "ILT"}, {"name": "VILT", "value": "VILT"}, {"name": "Self Learning", "value": "SELF_LEARNING"}],
    MONTH_LIST: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
    NPR_RANGE: ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"]
};
export default GlobalConstants;