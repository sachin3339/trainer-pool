import { navigate } from '@reach/router';
import React, { useEffect } from 'react';
import { AppUtils } from '../../Utils/AppUtils';
import Footer from '../Footer/Footer';
import TrainerDetails from '../TrainerDetails/TrainerDetails';

const SearchTrainerDetails = ({ location }) => {
    const trainerInfo = location.state.trainerInfo;
    const topTechnologyList = location.state.technologyList;
    const topTrainerList = location.state.topTrainerList;
    const clientList = location.state.clientList;
    useEffect(() => {
        // set scroll on top
        let scrollTop = document.getElementById("details-top");
        AppUtils && AppUtils.isNotEmptyObject(scrollTop) && scrollTop.scrollIntoView();
    }, [])
    return <div className="search-master">
        <div className="container searchTrainerContainer">
            <div className="search-breadcrumb" id="details-top">
                <span className="cp" onClick={() => navigate('/')}>Home / </span>
                <span className="current-active"> Current Page </span>
                {/* <span className="current-active">{trainerInfo && trainerInfo.firstName && trainerInfo.firstName + " " + trainerInfo.lastName}</span> */}
            </div>
            {/* trainer details page from admin settings */}
            {AppUtils.isNotEmptyObject(trainerInfo) && <TrainerDetails {...{trainerInfo, topTrainerList, topTechnologyList, clientList}}/>}
            {/* end trainer details page from admin settings */}
        </div>
        <Footer />
    </div>
}

export default SearchTrainerDetails;