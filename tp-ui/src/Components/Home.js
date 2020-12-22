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
import React, { useEffect, useState, useContext } from 'react';
import { navigate } from "@reach/router"
import Footer from '../Components/Footer/Footer';
import GlobalConstants from '../Constants/GlobalConstants';
import { AppUtils } from '../Utils/AppUtils';
import useToast from "../../src/Components/Common/Hooks/ToastHook";
import { ICN_STAR_B } from '../Components/Common/Icons';
import OwlCarousel from 'react-owl-carousel';
import AppContext from "../Contexts/App/App"
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import ibmlogo from '../Assets/img/partners/ibm.png';
import microsoftlogo from '../Assets/img/partners/microsoft.png';
import redhatlogo from '../Assets/img/partners/redhat.png';
import itillogo from '../Assets/img/partners/itil.png';
import bmclogo from '../Assets/img/partners/bmc.png';
import citrixlogo from '../Assets/img/partners/citrix.png';
import rededulogo from '../Assets/img/partners/red_education.png';
import pearsonlogo from '../Assets/img/partners/pearson.png';
import vmwarelogo from '../Assets/img/partners/vmware.png';

import hplogo from '../Assets/img/clients/hp.png';
import infylogo from '../Assets/img/clients/infosys.png';
import tcslogo from '../Assets/img/clients/tcs.png';
import wiprologo from '../Assets/img/clients/wipro.png';
import ltilogo from '../Assets/img/clients/lti.png';
import accenturelogo from '../Assets/img/clients/accenture.png';
import tescologo from '../Assets/img/clients/tesco.png';
import mphasislogo from '../Assets/img/clients/mphasis.png';
import oraclelogo from '../Assets/img/clients/oracle.png';
import mindtreelogo from '../Assets/img/clients/mindtree.png';

// technology
import javalogo from '../Assets/img/technology/javaW.png';
import csharplogo from '../Assets/img/technology/csharp.png';
import microserviceslogo from '../Assets/img/technology/micro.png';
import springlogo from '../Assets/img/technology/spring.png';
import awslogo from '../Assets/img/technology/aws.png';
import hadooplogo from '../Assets/img/technology/hadoop.png';
import juniperlogo from '../Assets/img/technology/juniper.png';
import pythonlogo from '../Assets/img/technology/python.png';
import MESSAGES from '../Constants/Message';



const Home = ({ location }) => {
  const TECH_LIMIT = 8;
  const TRAINER_LIMIT = 8;
  const Toast = useToast();
  const appContext = useContext(AppContext);
  const [topTrainerList, setTopTrainerList] = useState([]);
  const [technologyList, setTechnologyList] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [clientList, setClientList] = useState([]);

  // get trainer list
  const getTrainerDetailsBySid = (sid = "") => {
    try {
      AppUtils.httpGet(GlobalConstants.TRAINER.GET_TRAINER_DETAILS_BY_SID.replace("{trainerSid}", sid)).then(([res]) => {
        navigate(`/search-trainer-details`, { state: { trainerInfo: res, topTrainerList, technologyList, clientList } });
      }).catch((err) => {
        Toast.error({ message: MESSAGES.SERVER_ERROR });
        console.error("Error occurred while getTrainerDetailsBySid -- " + err);
      })
    } catch (err) {
      console.error("Error occurred while getTrainerDetailsBySid -- " + err);
    }
  };

  // get top trainer list
  const populateTopTrainerList = () => {
    try {
      AppUtils.httpGet(GlobalConstants.TRAINER.GET_TOP_TRAINER_LIST.replace("{trainerLimit}", TRAINER_LIMIT)).then(([res]) => {
        setTopTrainerList(res);
      }).catch((err) => {
        console.error("Error occurred while populateTopTrainerList -- " + err);
      })
    } catch (err) {
      console.error("Error occurred while populateTopTrainerList -- " + err);
    }
  };

  // get top Technology list
  const populateTopTechnologyList = () => {
    try {
      AppUtils.httpGet(GlobalConstants.TECHNOLOGY.GET_TOP_TECHNOLOGY_LIST.replace("{techLimit}", TECH_LIMIT)).then(([res]) => {
        setTechnologyList(res);
      }).catch((err) => {
        console.error("Error occurred while populateTopTechnologyList -- " + err);
      })
    } catch (err) {
      console.error("Error occurred while populateTopTechnologyList -- " + err);
    }
  };

  // get trainer details by sid
  const handleSearch = () => {
    try {
      if (AppUtils.isNotEmptyString(searchString)) {
        navigate(`/search-page`, { state: { searchString, topTrainerList, technologyList, clientList } });
      }
    } catch (err) {
      console.error("Error occurred while handleSearch: " + err);
    }
  }

  // search data when press enter
  const handlePressenter = (e) => {
    if (e.which === 13 || e.keyCode === 13 && e.code === "Enter") {
      if (searchString) navigate(`/search-page`, { state: { searchString, topTrainerList, technologyList, clientList } });
    }
  }

  // get client list
  const getClientList = () => {
		try {
			AppUtils.httpGet(GlobalConstants.API.GET_CLIENT_LIST).then(([res]) => {
				setClientList(res);
			}).catch((err) => {
				console.error("Error occurred while getClientList -- " + err);
			})
		} catch (err) {
			console.error("Error occurred while getClientList -- " + err);
		}
	};

  useEffect(() => {
    populateTopTechnologyList();
    getClientList();
  }, [location.pathname])

  useEffect(() => {
    // TODO: Component initializations
    populateTopTrainerList();
    populateTopTechnologyList();
    AppUtils.isEmptyObject(appContext.userInfo)
      && appContext.setUserInfo({ isAdminLogin: false, showAdmin: false });
  }, [])

  return <div>
    {/* top search section */}
    <div className="search-section">
      <div className="container">
        <div className="about-section">
          <h4>About Alchemy</h4>
          <div id="homePageCarousel" className="carousel slide alc-carousel" data-ride="carousel">

            <div className="carousel-inner">
              <div className="carousel-item active">
                <p className="carousel-paragraph">A Complete Corporate Training/Consulting, Solutions Company with a turnover of Rs.400 million. Established in the year 2000.</p>
              </div>
              <div className="carousel-item">
                <p className="carousel-paragraph">PAN India : We have 8 offices across Bangalore, Delhi, Chennai, Hyderabad and Mumbai with employee strength of 112. International : U.S, UAE ,Bangladesh & Srilanka</p>
              </div>
              <div className="carousel-item">
                <p className="carousel-paragraph">We work with over 120 clients who have presence in Asia, Europe, US.</p>
              </div>
            </div>

            <ol className="carousel-indicators">
              <li data-target="#homePageCarousel" data-slide-to="0" class="active"></li>
              <li data-target="#homePageCarousel" data-slide-to="1"></li>
              <li data-target="#homePageCarousel" data-slide-to="2"></li>
            </ol>
          </div>
        </div>
        <div className="ss-body">
          <div className="ss-title">Learn from the best in the Industry.</div>
          <div>
            <div className="ss-search">
              <div className="jcc">
                <input type="text" className="form-control mainSearchInp" value={searchString} onChange={(e) => setSearchString(e.target.value)} onKeyUp={(e) => handlePressenter(e)} placeholder="Search Trainer By Name, Technology, Location" />
                <button type="button" className="btn btn-primary mainSearchBtn" onClick={handleSearch}>Search</button>
              </div>
              {/* <div className="top-search">
                  <span className="mr-2">Top Searches:</span>
                  <span className=""></span>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="body-section">
      <div className="container">
        {/* top trainer list */}
        <div className="top-trainers">
          <div className="tt-title-div p-4">
            <div className="tt-title jcc">Top Trainers</div>
            <div className="tt-subtitle jcc">Get trained from the best rated industry experts</div>
          </div>
          <div className="tl-div">
            <div className="jcc flexWrap">
              {AppUtils.isEmptyArray(topTrainerList) && <div className="py-4 jic text-muted">No Trainers Available</div>}
              <OwlCarousel
                className="owl-theme"
                loop={topTrainerList.length > 4 ? true : false}
                nav={true}
                dots={true}
                margin={10}
                autoWidth={true}
                center={true}
                items={4}
                autoplay={true}
                autoplayTimeout={1000}
                autoplayHoverPause={true}
                fallbackEasing={"swing"}
                animateIn={true}
                responsive={{
                  0: {
                    items: 1,
                    nav: true
                  },
                  600: {
                    items: 3,
                    nav: true
                  },
                }}
              >
                <>
                  {!AppUtils.isEmptyArray(topTrainerList) && topTrainerList.map((tl, i) => <div key={i} className="trainer-card" onClick={() => getTrainerDetailsBySid(tl.sid)}>
                    <div className="jic pt-3">
                      <span className="profile-pic" style={{ backgroundImage: "url(" + tl.trainerImageUrl + ")" }}>
                        {!tl.trainerImageUrl && <span>{(tl.trainerName && tl.trainerName.slice(0, 2).toUpperCase())}</span>}
                      </span>
                    </div>
                    <div className="my-3">
                      <div className="t-card-title jcc">{tl.trainerName}</div>
                      <div className="t-card-sub-title jcc">{tl.designation}</div>
                    </div>
                    <div className="rating jcc">
                      <span className="mr-1 rating-star">
                        {ICN_STAR_B}
                      </span>
                      <span className="">{tl.avgRating && tl.avgRating.toFixed(1)}</span>
                    </div>
                  </div>)}
                </>
              </OwlCarousel>
            </div>
          </div>
        </div>
        {/* end top trainer list */}
        {/* top technology list */}
        <div className="top-technology">
          <div className="tt-title-div p-4">
            <div className="tt-title jcc">Top Technology</div>
            <div className="tt-subtitle jcc">Get trained on the world class technology that are trending</div>
          </div>
          <div className="tl-div">
            <div className="jcc flexWrap">
            {AppUtils.isEmptyArray(technologyList) && <div className="py-4 jic text-muted">No Technology Available</div>}
              <OwlCarousel
                className="owl-theme"
                loop={technologyList.length > 4 ? true : false}
                nav={true}
                dots={true}
                margin={10}
                autoWidth={true}
                center={true}
                items={4}
                autoplay={true}
                autoplayTimeout={1000}
                autoplayHoverPause={true}
                fallbackEasing={"swing"}
                animateIn={true}
                responsive={{
                  0: {
                    items: 1,
                    nav: true
                  },
                  600: {
                    items: 3,
                    nav: true
                  },
                }}
              >
                <>
                  {!AppUtils.isEmptyArray(technologyList) && technologyList.map((tech, i) => <div key={i} className="technology-card">
                    <div className="tech-pic jic">
                      {!tech.technologyName && <span className="">{tech.technologyName}</span>}
                      {tech.technologyName === "Java" && <img src={javalogo}></img>}
                      {tech.technologyName === "C#" && <img src={csharplogo} style={{ width: "120px" }}></img>}
                      {tech.technologyName === "Microservice" && <img src={microserviceslogo}></img>}
                      {tech.technologyName === "AWS" && <img src={awslogo}></img>}
                      {tech.technologyName === "Hadoop" && <img src={hadooplogo}></img>}
                      {tech.technologyName === "Juniper" && <img src={juniperlogo}></img>}
                      {tech.technologyName === "Springboot" && <img src={springlogo}></img>}
                      {tech.technologyName === "Python" && <img src={pythonlogo}></img>}
                    </div>
                    <div className="tech-text-div">
                      <div className="">
                        <div className="t-card-title">{tech.technologyName}</div>
                        <div className="t-card-sub-title">{tech.description}</div>
                      </div>
                    </div>
                  </div>)}
                </>
              </OwlCarousel>
              {/* card list */}

            </div>
          </div>
        </div>
        {/* end top technology list */}
        {/* Partners list */}
        <div className="top-technology">
          <div className="tt-title-div p-4">
            <div className="tt-title jcc">Our Training Partners</div>
            <div className="tt-subtitle jcc">We have partnered with the best in the business</div>
          </div>
          <div className="tl-div">
            <div className="jcc flexWrap">
              <div className="logos-container">
                <div className="brand-logo-box">
                  <img src={ibmlogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={microsoftlogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={redhatlogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={itillogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={bmclogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={citrixlogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={rededulogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={pearsonlogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={vmwarelogo}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Partners list */}
        {/* Clients list */}
        <div className="top-technology">
          <div className="tt-title-div p-4">
            <div className="tt-title jcc">Our Clients</div>
            <div className="tt-subtitle jcc">Companies that trust us</div>
          </div>
          <div className="tl-div">
            <div className="jcc flexWrap">
              <div className="logos-container">
                <div className="brand-logo-box">
                  <img src={ibmlogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={microsoftlogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={hplogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={infylogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={tcslogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={wiprologo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={ltilogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={accenturelogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={tescologo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={mphasislogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={oraclelogo}></img>
                </div>
                <div className="brand-logo-box">
                  <img src={mindtreelogo}></img>
                </div>
              </div>

            </div>
          </div>
        </div>
        {/* Clients list */}
      </div>
      {/* footer */}
      <Footer />
    </div>

  </div>
}

export default Home;