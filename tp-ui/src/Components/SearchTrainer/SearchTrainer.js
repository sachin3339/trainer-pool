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
import React, { useState, useEffect } from 'react';
import GlobalConstants from '../../Constants/GlobalConstants';
import { AppUtils } from '../../Utils/AppUtils';
import Footer from '../Footer/Footer';
import TrainerList from '../TrainerList/TrainerList';
import { navigate } from '@reach/router';
import { RestService } from "../../Services/RestService";
import TrainerDetails from '../TrainerDetails/TrainerDetails';
import classNames from 'classnames';
import useToast from "../Common/Hooks/ToastHook";
import { ICN_SEARCH_WHITE } from '../Common/Icons';
import MESSAGES from '../../Constants/Message';

const SearchTrainer = ({ location }) => {
    const Toast = useToast();
    const searchString = location.state.searchString;
    const topTechnologyList = location.state.technologyList;
    const topTrainerList = location.state.topTrainerList;
    const clientList = location.state.clientList;
    const [allTrainerList, setAllTrainerList] = useState([]);
    const [localTrainerList, setLocalTrainerList] = useState([]);
    const [trainerInfo, setTrainerInfo] = useState({});
    const [showTrainer, setShowTrainer] = useState(false);
    const [searchQuery, setSearchQuery] = useState(false);
    const [allSkills, setAllSkills] = useState([]);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [trainerLocation, setTrainerLocation] = useState(null);
    const [localSkillList, setLocalSkillList] = useState([]);
    const [localLocationList, setLocalLocationList] = useState([]);
    const [allLocations, setAllLocations] = useState([]);

    // get trainer list
    const populateAllTrainerList = () => {
        try {
            AppUtils.httpGet(GlobalConstants.TRAINER.GET_ALL_TRAINER).then(([res]) => {
                setAllTrainerList(res.map(e => ({ name: `${e.firstName} ${e.lastName}`, ...e })));
                setLocalTrainerList(res.map(e => ({ name: `${e.firstName} ${e.lastName}`, ...e })));
                clearFilteredData();
            }).catch((err) => {
                console.error("Error occurred while populateAllTrainerList -- " + err);
            })
        } catch (err) {
            console.error("Error occurred while populateAllTrainerList -- " + err);
        }
    };


    // get all skills list
    const getAllSkills = () => {
        try {
            RestService.GetAllSkill().then(([res]) => {
                setAllSkills(res);
            }).catch((err) => {
                console.error("Error occurred while getAllSkills: " + err);
            })
        } catch (err) {
            console.error("Error occurred while getAllSkills: " + err);
        }
    }

    // get all locations list
    const getAllLocations = () => {
        try {
            RestService.GetAllLocation().then(([res]) => {
                setAllLocations(res);
            }).catch((err) => {
                console.error("Error occurred while getAllLocations: " + err);
            })
        } catch (err) {
            console.error("Error occurred while getAllLocations: " + err);
        }
    }

    // get trainer details by sid
    const searchTraineByName = (searchstr = searchQuery) => {
        try {
            if (AppUtils.isNotEmptyString(searchstr)) {
                RestService.SearchTrainer(searchstr).then(([res]) => {
                    clearFilteredData(); // clear filtered data
                    if (AppUtils.isNotEmptyArray(res)) {
                        setAllTrainerList(res.map(e => ({ name: `${e.firstName} ${e.lastName}`, ...e })));
                        setLocalTrainerList(res.map(e => ({ name: `${e.firstName} ${e.lastName}`, ...e })));
                    } else {
                        Toast.error({ message: MESSAGES.TRAINER_NOT_AVAILABLE });
                    }
                }).catch((err) => {
                    Toast.error({ message: MESSAGES.TRAINER_NOT_AVAILABLE });
                    console.error("Error occurred while searchTraineByName: " + err);
                })
            }
        } catch (err) {
            console.error("Error occurred while searchTraineByName: " + err);
        }
    }

    // search data when press enter
    const handlePressenter = (e) => {
        if (e.which === 13 || e.keyCode === 13 && e.code === "Enter") {
            searchQuery ? searchTraineByName() : populateAllTrainerList();
        }
    }

    // get trainer details by sid
    const getTrainerDetailsBySid = (sid) => {
        try {
            if (sid) {
                RestService.GetTrainerDetailsBySid(sid).then(([res]) => {
                    setTrainerInfo(res);
                    setShowTrainer(true);
                }).catch((err) => {
                    console.error("Error occurred while getTrainerDetailsBySid: " + err);
                })
            }
        } catch (err) {
            console.error("Error occurred while getTrainerDetailsBySid: " + err);
        }
    }

    // local filter by trainer skill
    const onSkillChangeFilter = (skillQuerry) => {
        try {
            setSelectedSkill(skillQuerry)
            if (!searchString && !trainerLocation && !selectedSkill) populateAllTrainerList();
            let tmpTrainerListBySkill = !AppUtils.isEmptyArray(localLocationList) ? localLocationList.filter(r => r.trainerSkills.map(r => r.skill && r.skill.name).join().toUpperCase().indexOf(skillQuerry.toUpperCase()) > -1) : localTrainerList.filter(r => r.trainerSkills.map(r => r.skill && r.skill.name).join().toUpperCase().indexOf(skillQuerry.toUpperCase()) > -1)
            setLocalSkillList(tmpTrainerListBySkill);
            setAllTrainerList(tmpTrainerListBySkill);
        } catch (err) {
            console.error("Error occurred while onSkillChangeFilter: " + err);
        }
    }

    // local filter by trainer location
    const onLocationChangeFilter = (locationQuerry) => {
        try {
            setTrainerLocation(locationQuerry);
            if (!searchString && !trainerLocation && !selectedSkill) populateAllTrainerList();
            let tmpTrainerListByLocation = !AppUtils.isEmptyArray(localSkillList) ? localSkillList.filter(r => r.location.toUpperCase().indexOf(locationQuerry.toUpperCase()) > -1) : localTrainerList.filter(r => r.location.toUpperCase().indexOf(locationQuerry.toUpperCase()) > -1)
            setLocalLocationList(tmpTrainerListByLocation);
            setAllTrainerList(tmpTrainerListByLocation);
        } catch (err) {
            console.error("Error occurred while onLocationChangeFilter: " + err);
        }
    }

    // clear filtered data
    const clearFilteredData = () => {
        setSelectedSkill("");
        setTrainerLocation("");
        setLocalSkillList([]);
        setLocalLocationList([]);
    }

    //  when trainer location and selectedSkill both are empty fetch all trainer list
    // and empty the local search list for trainer location and skill
    useEffect(() => {
        // if(!searchString && !trainerLocation && !selectedSkill) {
        //     populateAllTrainerList();
        //     clearFilteredData();
        // }
        if(!trainerLocation) setLocalLocationList([]);
        if(!selectedSkill) setLocalLocationList([]);
    }, [trainerLocation, selectedSkill]);

    // if searched trainer list update table list
    useEffect(() => {
        setSearchQuery(searchString);
        searchTraineByName(searchString);
    }, [searchString])

    // if searched trainer list update table list
    useEffect(() => {
        if (searchQuery === "") {
            populateAllTrainerList();
            setSearchQuery("");
            clearFilteredData();
        }
    }, [searchQuery])

    useEffect(() => {
        getAllSkills();
        getAllLocations()
    }, [])

    return <>
        <div className="search-master">
            <div className="container searchTrainerContainer">
                <div className="search-breadcrumb">
                    <span className="cp mr-1" onClick={() => navigate('/')}>Home /</span>
                    <span className={classNames("mx-1", { "cp": showTrainer })} onClick={() => { if (showTrainer) setShowTrainer(false) }}>Search Results</span>
                    {showTrainer && <span className="current-active mx-1 tc">
                        {trainerInfo && trainerInfo.firstName && "/ " + trainerInfo.firstName + " " + trainerInfo.lastName}
                    </span>}
                </div>
                {!showTrainer && <>
                    {/*  trainer search bar */}
                    <div className="ts-div">
                        <div className="ts-body jcb flexWrap">
                            <div className="search-label-title mb-2">{searchQuery && allTrainerList.length + " Search Result For "}<span className="text-large">{searchQuery}</span></div>
                            <div>
                                <div className="input-group">
                                    <input type="text" className="form-control form-control-sm searchInp" value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyUp={(e) => handlePressenter(e)}
                                        placeholder="Search Trainer By Name, Technology, Location" aria-describedby="basic-addon2" />
                                    <div className="input-group-append" onClick={() => searchTraineByName()}>
                                        <span className="input-group-text searchBtn" id="basic-addon2">{ICN_SEARCH_WHITE}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  trainer search bar */}

                    {/* Search trainer  page  */}
                    <div className="row">
                        <div className="col-sm-12 col-md-4 col-12">
                            <div className="td-card">
                                <div className="activity-card">
                                    <div className="activity-card-header title1">Filter By</div>
                                    <div className="activity-card-info">

                                        <div className="activity-row">
                                            <div className="activity-info-title text-muted">Technology</div>
                                            <div className="activity-info-details">
                                                <select className="form-control form-control-sm" value={selectedSkill} onChange={(e) => onSkillChangeFilter(e.target.value)}>
                                                    <option value="">-- Select Technology --</option>
                                                    {!AppUtils.isEmptyArray(allSkills) && allSkills.map((s, i) => <option key={i} value={s.name} id={s.sid}>{s.name}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="activity-row">
                                            <div className="activity-info-title text-muted">Location</div>
                                            <div className="activity-info-details">
                                                <select className="form-control form-control-sm" value={trainerLocation} onChange={(e) => onLocationChangeFilter(e.target.value)}>
                                                    <option value="">-- Select Location --</option>
                                                    {!AppUtils.isEmptyArray(allLocations) && allLocations.map((l, i) => <option key={i} value={l}>{l}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-sm-12 col-md-8 col-12">
                            {/* trainer list table  */}
                            <TrainerList {...{ allTrainerList, clientList }} callback={(sid) => getTrainerDetailsBySid(sid)} />
                            {/* pagination  */}
                            {/* <div className="paginationContainer">
                                <div className="paginationDiv">
                                    {!AppUtils.isEmptyArray(allTrainerList) && allTrainerList.length > 1 && <Pagination totalCount={allTrainerList.length} onNavigate={(pageNumber) => setCurrentPage(pageNumber)} />}
                                </div>
                            </div> */}
                        </div>
                        {/* end Search trainer details*/}
                    </div>
                </>}
                {showTrainer && AppUtils.isNotEmptyObject(trainerInfo) && <TrainerDetails {...{ trainerInfo, topTrainerList, topTechnologyList, clientList }} />}
            </div>
            <Footer />
        </div>
    </>;
}

export default SearchTrainer;