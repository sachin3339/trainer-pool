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
import React, { useState } from 'react';
import { BasicModal } from "react-bootstrap-dynamic-modal";
let refData = null;
export const useBasicModal = ({
    title,
    body,
    onClose = (dataRef) => { },
    hideFooter = false,
    hideHeader = false
}) => {
    const [modalProps, updateModalProps] = useState({
        size: 'xs',
        buttons: [
            {
                variant: "primary",
                handler: () => {
                    onClose(refData);
                    updateVisibility(false)
                },
                label: "Okay"
            }
        ],
        onHide: () => {
            onClose(refData);
            updateVisibility(false)
        },
        visibility: false,
        hideHeader: false
    });

    /*
        * Updates visibility of confirmation modal.
        * @parameter {Boolean} visibility - Default: false
    */
    const updateVisibility = (visibility = false) => updateModalProps({
        ...modalProps,
        buttons: hideFooter ? [] : modalProps.buttons,
        hideHeader,
        visibility
    });

    /*
        * To display confirmation modal.
        * @parameter {Anything} dataRef - It'll be used to identify in the callback method
    */
    const show = (refValue = null) => {
        refData = refValue;
        updateVisibility(true);
    }

    return [show, <BasicModal {
        ...{
            ...modalProps,
            body: body,
            title: title,
            modalClass: "esc-modal"
        }
    } />]
}