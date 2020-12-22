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

import { AppUtils } from '../Utils/AppUtils';

/*
*   Returns name by sid.
*   @param {array} list - list array
 *  @param {String} Sid - particular sid
*/
export const getNameBySid = (list = [], sid = "") => {
    let tmpName = "";
    try {
        if (AppUtils.isNotEmpty(sid)) {
            let nameObj = list.find(a => a.sid === sid);
            if (AppUtils.isNotEmptyObject(nameObj)) tmpName = nameObj.name;
        }
    } catch (err) {
        console.error("Error occurred while getNameBySid -- ", err);
    }
    return tmpName;
}