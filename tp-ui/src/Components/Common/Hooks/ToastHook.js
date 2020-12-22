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
import { useContext } from 'react';
import Alert from "rct-bs-alert";
export const useToast = () => {
    const [rctAlert] = useContext(Alert);
    const DEFAULT_TIME = 2500;
    const display = ({ variant = "primary", message = "", time = DEFAULT_TIME }) => rctAlert({ variant, message, time })
    const success = ({ message, time = DEFAULT_TIME }) => display({ variant: "primary", message, time });
    const error = ({ message, time = DEFAULT_TIME }) => display({ variant: "danger", message, time });
    const warning = ({ message, time = DEFAULT_TIME }) => display({ variant: "warning", message, time });
    return { display, success, error, warning }
}
export default useToast;