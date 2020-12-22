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
import React, { useContext } from 'react';
import AppContext from '../src/Contexts/App/App';
import { AppProvider } from './Contexts/App/App';
import { Router } from "@reach/router"
import Home from './Components/Home';
import Header from './Components/Header/Header';
import ContactUs from './Components/ContactUs/ContactUs';
import Dashboard from './Components/Dashboard/Dashboard';
import SearchTrainer from './Components/SearchTrainer/SearchTrainer';
import SearchTrainerDetails from './Components/SearchTrainerDetails/SearchTrainerDetails';
import '../src/Assets/css/blue.css';
import '../src/Assets/css/main_app.css';
import '../src/Assets/css/common.css';
import './App.css';

const App = () => {
	const appContext = useContext(AppContext);

	return <AppProvider>
		<Header />
		<Router>
			<Home path="/" default/>
			<ContactUs path="contact" />
			<Dashboard path="admin" />
			<SearchTrainer path="search-page" />
			<SearchTrainerDetails path="search-trainer-details" />
		</Router>
	</AppProvider>;
}

export default App;