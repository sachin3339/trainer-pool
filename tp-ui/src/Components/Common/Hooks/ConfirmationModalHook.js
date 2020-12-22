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
import { ConfirmationModal } from "react-bootstrap-dynamic-modal";
let refData = null;
export const useConfirmationModal = ({
    title,
    body,
    primaryLabel = "Confirm",
    secondaryLabel = "Cancel",
    onConfirm = (dataRef) => { },
    onCancel = (dataRef) => { },
    onClose = (dataRef) => { },
    hideHeader = false
}) => {
    const [modalProps, updateModalProps] = useState({
        size: 'xs',
        buttons: [
            {
                variant: "secondary",
                handler: () => {
                    onCancel(refData);
                    updateVisibility(false)
                },
                label: secondaryLabel
            },
            {
                variant: "primary",
                handler: () => {
                    onConfirm(refData);
                    updateVisibility(false)
                },
                label: primaryLabel
            }
        ],
        onHide: () => {
            onClose(refData);
            updateVisibility(false)
        },
        visibility: false
    });

    /*
        * Updates visibility of confirmation modal.
        * @parameter {Boolean} visibility - Default: false
    */
    const updateVisibility = (visibility = false) => updateModalProps({
        ...modalProps,
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

    return [show, <ConfirmationModal {
        ...{
            ...modalProps,
            body: (body ? body : "Are you sure you want to delete?"),
            title: (title ? title : "Delete Confirmation"),
            modalClass: "esc-modal"
        }
    } />]
}