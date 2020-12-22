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
import React, { useEffect, useState } from 'react';
import { AppUtils } from '../../Utils/AppUtils';
import { getNameBySid } from '../../Services/MethodsFactory';
import moment from 'moment';
import classNames from 'classnames';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ICN_STAR, ICN_DELETE } from '../Common/Icons';
const NO_ARROW_HIGHLIGHTED = <svg xmlns="http://www.w3.org/2000/svg" width="6.953" height="9.059" viewBox="0 0 6.953 9.059" style={{ fill: "#adadad" }}><g transform="translate(-37.408 -3.313)"><path className="a" d="M7.559,8.064H1.776a.584.584,0,0,1-.413-1L4.254,4.176a.581.581,0,0,1,.824,0L7.97,7.068A.583.583,0,0,1,7.559,8.064Z" transform="translate(36.217 -0.691)" /><path className="a" d="M1.775,20.25H7.559a.584.584,0,0,1,.413,1L5.08,24.138a.581.581,0,0,1-.824,0L1.362,21.246A.584.584,0,0,1,1.775,20.25Z" transform="translate(36.217 -11.937)" /></g></svg>
const HIGHLIGHT_UP_ARROW = <svg xmlns="http://www.w3.org/2000/svg" width="6.953" height="9.059" viewBox="0 0 6.953 9.059"><g transform="translate(-48.707 -3.313)"><path className="a" style={{ fill: "#333" }} d="M7.559,8.064H1.776a.584.584,0,0,1-.413-1L4.254,4.176a.581.581,0,0,1,.824,0L7.97,7.068A.583.583,0,0,1,7.559,8.064Z" transform="translate(47.516 -0.691)" /><path className="b" style={{ fill: "#adadad" }} d="M1.775,20.25H7.559a.584.584,0,0,1,.413,1L5.08,24.138a.581.581,0,0,1-.824,0L1.362,21.246A.584.584,0,0,1,1.775,20.25Z" transform="translate(47.516 -11.938)" /></g></svg>
const HIGHLIGHT_DOWN_ARROW = <svg xmlns="http://www.w3.org/2000/svg" width="6.953" height="9.059" viewBox="0 0 6.953 9.059"><g transform="translate(-57.707 -3.313)"><path className="a" style={{ fill: "#adadad" }} d="M7.559,8.064H1.776a.584.584,0,0,1-.413-1L4.254,4.176a.581.581,0,0,1,.824,0L7.97,7.068A.583.583,0,0,1,7.559,8.064Z" transform="translate(56.516 -0.691)" /><path className="b" style={{ fill: "#333" }} d="M1.775,20.25H7.559a.584.584,0,0,1,.413,1L5.08,24.138a.581.581,0,0,1-.824,0L1.362,21.246A.584.584,0,0,1,1.775,20.25Z" transform="translate(56.516 -11.938)" /></g></svg>

const TrainerList = ({ allTrainerList, callback, delCallBack, clientList }) => {
	const [tableData, setTableData] = useState([]);
	const [isAscn, setIsAscn] = useState(null);
	const [sortKey, setSortKey] = useState("");

	/*
	Sort the array by key.
	@param {Array of Objects} arr - Array of object which is source data
	@param {String} key - Object key which is used to sort the array
	@param {Boolean} isAsc - Default ascending order is true
	@return {Array of Objects} - Returns sorted array
	*/
	const sortByKey = (arr = [], key = "", isAsc = true) => (Array.isArray(arr) && key) ? (arr.sort((a, b) => (typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]) > (typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]) !== isAsc ? -1 : 1)) : arr;

	// trigger when click on table head for sorting
	const handleTableSort = (key = "") => {
		setSortKey(key);
		setIsAscn(!isAscn);
	}

	// listening for table sort
	useEffect(() => {
		if (!AppUtils.isEmptyArray(tableData) && sortKey) setTableData(sortByKey(tableData, sortKey, isAscn));
	}, [isAscn])

	// initialize component
	useEffect(() => {
		setTableData(allTrainerList)
	}, [allTrainerList])
	return <div class="table-responsive-sm">
		<table className="table alc-table">
			<thead>
				<tr>
					<th onClick={() => handleTableSort("name")} className={classNames({ "active-sort": sortKey === "name" })}>Trainer Name <span className="ml-2">{sortKey === "name" ? (isAscn ? HIGHLIGHT_DOWN_ARROW : HIGHLIGHT_UP_ARROW) : NO_ARROW_HIGHLIGHTED}</span></th>
					<th onClick={() => handleTableSort("rating")} className={classNames({ "active-sort": sortKey === "rating" })}>Rating<span className="ml-2">{sortKey === "rating" ? (isAscn ? HIGHLIGHT_DOWN_ARROW : HIGHLIGHT_UP_ARROW) : NO_ARROW_HIGHLIGHTED}</span></th>
					<th onClick={() => handleTableSort("location")} className={classNames({ "active-sort": sortKey === "location" })}>Location<span className="ml-2">{sortKey === "location" ? (isAscn ? HIGHLIGHT_DOWN_ARROW : HIGHLIGHT_UP_ARROW) : NO_ARROW_HIGHLIGHTED}</span></th>
					<th onClick={() => handleTableSort("designation")} className={classNames({ "active-sort": sortKey === "designation" })}>Core Skills<span className="ml-2">{sortKey === "designation" ? (isAscn ? HIGHLIGHT_DOWN_ARROW : HIGHLIGHT_UP_ARROW) : NO_ARROW_HIGHLIGHTED}</span></th>
					<th onClick={() => handleTableSort("clientId")} className={classNames({ "active-sort": sortKey === "clientId" })}>Client<span className="ml-2">{sortKey === "clientId" ? (isAscn ? HIGHLIGHT_DOWN_ARROW : HIGHLIGHT_UP_ARROW) : NO_ARROW_HIGHLIGHTED}</span></th>
					<th onClick={() => handleTableSort("lastUpdatedOn")} className={classNames({ "active-sort": sortKey === "lastUpdatedOn" })}>Last Updated On<span className="ml-2">{sortKey === "lastUpdatedOn" ? (isAscn ? HIGHLIGHT_DOWN_ARROW : HIGHLIGHT_UP_ARROW) : NO_ARROW_HIGHLIGHTED}</span></th>
					{delCallBack && <th></th>}
				</tr>
			</thead>
			<tbody>
				{!AppUtils.isEmptyArray(tableData) && !AppUtils.isEmptyArray(clientList) && tableData.map((trainer, i) => <tr key={i} >
					<td className="elps">
						<div className="flx flx-center" onClick={() => { if (typeof callback === "function") callback(trainer.sid) }}>
							<div className="mr10">
								<span className="user-img-sm" style={{ backgroundImage: "url(" + trainer.imageLocation + ")" }}>
									{!trainer.imageLocation && <span>{(trainer.firstName && trainer.firstName.slice(0, 2).toUpperCase())}</span>}
								</span>
							</div>
							<div className="flx1 elps fsmall tcaps">
								{trainer.firstName} {trainer.lastName}
								{!trainer.firstName && <span className="text-muted">NA</span>}
							</div>
						</div>
					</td>
					<td className="elps"><span className="rating-star mr-1">{ICN_STAR}</span><span>{trainer.rating && trainer.rating.toFixed(1)}</span></td>
					<td className="elps">{trainer.location}{!trainer.location && <span className="text-muted">NA</span>}</td>

					<td className="elps">
						{!AppUtils.isEmptyArray(trainer.trainerSkills) && <OverlayTrigger
							key="left"
							placement="left"
							overlay={
								<Tooltip id={i}>
									{trainer.trainerSkills.map(r => r.skill.name).join()}
								</Tooltip>
							}>
							<span>{trainer.trainerSkills.map(r => r.skill.name).join()}</span>
						</OverlayTrigger>}
						{AppUtils.isEmptyArray(trainer.trainerSkills) && <span className="text-muted">NA</span>}
					</td>
					<td className="elps">{getNameBySid(clientList, trainer.clientId) === "IBM" ? "IBM" : "Others"}{!trainer.clientId && <span className="text-muted">NA</span>}</td>
					<td className="elps">{moment(parseInt(trainer.lastUpdatedOn)).format("YYYY-MM-DD")}</td>
						{delCallBack && <td><span className="p-1" onClick={() => { if (typeof delCallBack === "function") delCallBack(trainer.sid) }}>{ICN_DELETE}</span></td>}
				</tr>)}
			</tbody>
		</table>
	</div>;
}

export default TrainerList;