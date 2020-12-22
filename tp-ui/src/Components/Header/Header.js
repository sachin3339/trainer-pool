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
import React, { useState, useContext, useEffect } from 'react';
import { Link } from "@reach/router";
import { Login } from '../Login';
import AppContext from '../../Contexts/App/App';
import { AppUtils } from '../../Utils/AppUtils';
import { navigate } from "@reach/router";

const Header = () => {
    const appContext = useContext(AppContext);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(false);
    }, [AppUtils.isNotEmptyObject(appContext.userInfo) && appContext.userInfo.showAdmin])

    return <>
        {AppUtils.isNotEmptyObject(appContext.userInfo) && !appContext.userInfo.showAdmin
           && <div className="navbar navbar-expand-md fixed-top bg-white alc-navbar">
                <div className="container">
                    <Link to="/">
                        <div className="logoIcn" />
                    </Link>
                    <div className="navbar-menu">
                        <nav class="my-2 my-md-0 mr-md-3">
                            <Link to="/contact" className="alc-nav-menu">Contact Us</Link>
                        </nav>
                        {appContext.userInfo && !appContext.userInfo.isAdminLogin && <button className="loginBtn mr-2" onClick={() => setShow(true)}>LOGIN</button>}
                        {appContext.userInfo && appContext.userInfo.isAdminLogin && <button className="loginBtn mr-2" onClick={() => {navigate("/admin"); appContext.setUserInfo({...appContext.userInfo, showAdmin: true })}}>SWITCH TO ADMIN</button> }
                    </div>   
                </div>     
                   
                {
                    show && <Login {...{ show, setShow }} />
                }
            </div>
        }

    </>
}

export default Header;