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
import React from 'react';
import Footer from '../Footer/Footer';

const ContactUs = () => {
    return <>
        <div>
            <div className="contact-top jic">
                <div className="contact-title">CONTACT US</div>
            </div>
            <div className="body-section">
                <div className="container">
                    <div className="row contact-body">
                        <div className="col-sm-12 col-md-6 col-12">
                            <div className="flx map-div">
                                <div className="contact-map-img"></div>
                                <div className="pt-4">
                                    <div className="title">Head Quarters:</div>
                                    <div className="title4">#984 Crown Towers 80ft Road, Koramangala 4th Block, </div>
                                </div>
                                <div className="pt-4">
                                    <div className="page-active f13 pb-2">training@alchemysolution.net</div>
                                    <div className="page-active f14">+91-80500007847</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-12">
                            <div className="contact-form">
                                <div className="title mb-3">Get In Touch</div>
                                <div className="form">
                                    <input type="text" className="form-control form-control-sm mb-2" placeholder="Your Name" />
                                    <input type="text" className="form-control form-control-sm mb-2" placeholder="Your Email" />
                                    <input type="text" className="form-control form-control-sm mb-2" placeholder="Your Phone" />
                                    <input type="text" className="form-control form-control-sm mb-2" placeholder="Your Place" />
                                    <textarea className="form-control form-control-sm mb-2" placeholder="Message"></textarea>
                                </div>
                                <button type="button" className="btn btn-sm btn-primary pl-3 pr-3 mt-3">SEND</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />

            </div>
        </div>
    </>;
}

export default ContactUs;