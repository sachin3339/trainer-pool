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

import GlobalConstants from "../Constants/GlobalConstants";
import { RestService } from "./RestService";

/** 
    * UploadFile method used to upload file 
    * @param {File} file - File object
*/
export const UploadFile = async (file) => {
    return new Promise((resolve, reject) => {
        let data = new FormData();
        data.append("file", file);

        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", function () {
            let response = null;
            try {
                response = JSON.parse(this.responseText);
            } catch (err) {
                response = this.responseText
            }

            if (this.readyState === 4 && this.status >= 200 && this.status <= 299) {
                resolve([response, this.status, this.getAllResponseHeaders()]);
            } else if (this.readyState === 4 && !(this.status >= 200 && this.status <= 299)) {
                reject([response, this.status, this.getAllResponseHeaders()]);
            }
        });
        xhr.open("POST", GlobalConstants.API.UPLOAD_FILE);
        xhr.send(data);
    })
}

/** 
    * DownloadFile method used to download file by name
    * @param {String} fName - File name
*/
export const DownloadFile = async (fileName) => RestService.DownloadFile(fileName)