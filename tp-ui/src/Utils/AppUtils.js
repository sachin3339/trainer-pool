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
export const AppUtils = (() => {
	const utilsObj = {}
	/**
	 * @arg - field to check passed argument is whether object or not.
	 * @returns
	 *        true if object
	 *        false if not object.
	 */
	utilsObj.isObject = function (arg) {
		return typeof arg === "object";
	}

	/**
	 * @arg - field to check passed argument is whether boolean or not.
	 * @returns
	 *        true if object
	 *        false if not object.
	 */
	utilsObj.isBoolean = function (arg) {
		return typeof arg === "boolean";
	}

	/**
	 * @param - field to check whether empty or not.
	 * @returns
	 *        true if empty
	 *        false if not empty.
	 */
	utilsObj.isEmpty = function (param) {
		if (param === null ||
			typeof param === "undefined" ||
			utilsObj.isObject(param))
			return true;

		if (param !== null &&
			param.toString().trim().length !== 0)
			return false;

		return true;
	}

	/**
	 * @param - field to check whether not empty or not.
	 * @returns
	 *        true if not empty
	 *        false if empty.
	 */
	utilsObj.isNotEmpty = function (param) {
		return !utilsObj.isEmpty(param);
	}

	/**
	 * @param - field to check whether not empty string or not.
	 * @returns
	 *        true if not empty string
	 *        false if empty string
	 */
	utilsObj.isNotEmptyString = function (param) {
		return !utilsObj.isEmpty(param) && typeof param === "string";
	}

	/**
	 * @param - field to check whether sid or not.
	 * @returns
	 *        true if sid.
	 *        false if not sid.
	 */
	utilsObj.isSid = function (param) {
		if (utilsObj.isNotEmpty(param) &&
			param.trim().length === 64) {
			return true;
		}

		return false;
	}

	/**
	 * @param - field to check the length.
	 * @param2 - length of the value to check
	 * @returns
	 *        true if length equals.
	 *        false if length not equals.
	 */
	utilsObj.isLength = function (param, param2) {
		if (utilsObj.isNotEmpty(param) &&
			param.length === param2) {
			return true;
		}

		return false;
	}

	/**
	 * @param - field to compare
	 * @param2 - field to compare
	 * @returns
	 *        true if both param are equal.
	 *        false if both param are not equal
	 */
	utilsObj.isEqual = function (param, param2) {
		if (utilsObj.isNotEmpty(param) &&
			utilsObj.isNotEmpty(param2) &&
			param === param2) {
			return true;
		}

		return false;
	}

	utilsObj.isTrue = function (param) {
		if (param === null)
			return false;
		if (param !== null &&
			param === true) {
			return true;
		}

		return false;
	}

	utilsObj.isFalse = function (param) {
		return !utilsObj.isTrue(param);
	}

	/**
	 * @param - field to compare without case.
	 * @param2 - field to compare without case.
	 * @returns
	 *        true if both param are equal.
	 *        false if both param are not equal
	 */
	utilsObj.isEqualIgnoreCase = function (param, param2) {
		if (utilsObj.isNotEmpty(param) &&
			utilsObj.isNotEmpty(param2) &&
			param.toUpperCase() === param2.toUpperCase()) {
			return true;
		}

		return false;
	}

	/**
	 * To check whether empty array or not.
	 */
	utilsObj.isEmptyArray = function (array) {
		if (Array.isArray(array) &&
			array.length > 0) {
			return false;
		}
		return true;
	}

	/**
	 * To check whether is not empty array
	 */
	utilsObj.isNotEmptyArray = (arr) => !utilsObj.isEmptyArray(arr);

	/**
	 * To check passed data is array or not
	 */
	utilsObj.isArray = function (array) {
		return Array.isArray(array);
	}

	/**
	 * To check whether array contains element or not.
	 * @array - list of elements
	 * @param - element
	 *
	 */
	utilsObj.isContains = function (array, param) {
		if (!utilsObj.isEmptyArray(array) &&
			utilsObj.isNotEmpty(param) &&
			array.indexOf(param) !== -1)
			return true;

		return false;
	}

	/**
	 * To check whether string contains param2.
	 * @param - string
	 * @param2 - string
	 *
	 */
	utilsObj.isStringContains = function (param, param2) {
		if (utilsObj.isNotEmpty(param) &&
			utilsObj.isNotEmpty(param2) &&
			param.toUpperCase().indexOf(param2.toUpperCase()) >= 0) {
			return true;
		}

		return false;
	}

	/**
	 * Validate the email ID
	 * @param email - String
	 * @returns - boolean
	 */
	utilsObj.isEmail = function (email) {
		var re = /^\S+@\S+\.\S+$/;
		return utilsObj.isNotEmpty(email) && re.test(email);
	}

	/**
	 * To check whether string starts with param2.
	 * @array - list of elements
	 * @param - element
	 *
	 */
	utilsObj.isStringStartsWith = function (param, param2) {
		if (utilsObj.isNotEmpty(param) &&
			utilsObj.isNotEmpty(param2) &&
			param.indexOf(param2) === 0) {
			return true;
		}

		return false;
	}

	/**
	 * Get date by add/substract
	 * @param interval - Number
	 * @param fromDayBegins - Boolean
	 * @returns - Date object
	 */
	utilsObj.getDate = function (interval, fromDayBegins) {
		//Set 0 if passed interval not-an-number
		if (isNaN(interval)) interval = 0
		var expectedDate = new Date();
		expectedDate.setDate(expectedDate.getDate() - interval);
		if (fromDayBegins) expectedDate.setHours(0, 0, 0, 0);
		return expectedDate;
	}

	/**
	 * Generate unique id
	 * @returns - boolean
	 */
	utilsObj.getUniqueId = function () {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	}

	utilsObj.isObject = function (arg) {
		return (typeof arg === "object") ? true : false;
	}

	utilsObj.isEmptyObject = function (arg) {
		return ((arg === null || arg === "" || typeof arg === "undefined") || (utilsObj.isObject(arg) && Object.getOwnPropertyNames(arg).length <= 0)) ? true : false;
	}

	utilsObj.isNotEmptyObject = function (arg) {
		return !utilsObj.isEmptyObject(arg);
	}

	// This method is used to get user browser name(Accuracy: 50%)
	utilsObj.getBrowserName = function getBrowserName() {
		var ua = navigator.userAgent,
			tem,
			M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		if (/trident/i.test(M[1])) {
			tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
			return 'IE ' + (tem[1] || '');
		}
		if (M[1] === 'Chrome') {
			tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
			if (tem !== null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
		}
		M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
		if ((tem = ua.match(/version\/(\d+)/i)) !== null) M.splice(1, 1, tem[1]);
		return M.join(' ');
	}

	/*
	 * This method is used to detect user from mobile or desktop
	 * @param: None
	 * @Returns: Boolean True => if mobile
	 */
	utilsObj.isMobile = function isMobile() {
		return /Mobile/i.test(navigator.userAgent);
	}

	/*
	 * This method is used to collect a user browser information
	 * 1. OS platform
	 * 2. Name of the browser
	 * 3. isMobile => Boolean
	 * 4. language => Browser default language
	 * 5. Location => longitude, latitude
	 */
	utilsObj.getBrowserInfo = function getBrowserInfo() {
		var brwInfo = {}
		brwInfo.name = AppUtils.getBrowserName();
		brwInfo.platform = navigator.platform;
		brwInfo.language = navigator.language;
		brwInfo.domain = document.location.origin;
		if (document.location.href) brwInfo.referer = document.location.href;
		brwInfo.userAgent = navigator.userAgent;
		brwInfo.isMobile = AppUtils.isMobile();
		brwInfo.pageTitle = document.title;

		//Device Name
		var device = navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i);
		brwInfo.device = (device) ? device[0] : "Desktop";
		return brwInfo;
	}


	utilsObj.cloneAsObject = function cloneAsObject(obj) {
		if (obj === null || !(obj instanceof Object)) {
			return obj;
		}
		var temp = (obj instanceof Array) ? [] : {}
		// ReSharper disable once MissingHasOwnPropertyInForeach
		for (var key in obj) {
			temp[key] = cloneAsObject(obj[key]);
		}
		return temp;
	}

	utilsObj.getColor = function () {
		return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
	}

	utilsObj.getQueryParameterByName = function getQueryParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	utilsObj.unCamelCase = function unCamelCase(str) {
		if (AppUtils.isEmpty(str)) return str;
		return str
			.replace(/([a-z])([A-Z])/g, '$1 $2') // insert a space between lower & upper
			.replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3') // space before last upper in a sequence followed by lower
			.replace(/^./, function (str) {
				return str.toUpperCase();
			}) // uppercase the first character
	}

	// To play sound 
	utilsObj.playSoundByHowl = function (soundFiles) {
		if (soundFiles && window.Howl) {
			var sound = new window.Howl({
				src: soundFiles,
				autoplay: true,
				loop: false,
				volume: 1
			});
			sound.play();
		}
	}

	//This method used to play sound
	utilsObj.playNotificationSound = function playNotificationSound(soundFiles) {
		try {
			if (typeof Howl !== "undefined") {
				AppUtils.playSoundByHowl(soundFiles);
			} else {
				AppUtils.loadJs("https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.5/howler.min.js", () => {
					AppUtils.playSoundByHowl(soundFiles);
				});
			}
		} catch (err) {
			//Error occured while playing audio
		}
	}

	/**
	   * This function is used to load javascript files dynamically
	   * @param url - url string / array of url string
   */
	utilsObj.loadJs = function loadJs(jsFile, callback) {
		var jsElm = document.createElement("script"); // DOM: Create the script element
		jsElm.type = "application/javascript"; // set the type attribute
		jsElm.src = (jsFile.indexOf("//") !== -1) ? jsFile : window.location.origin + jsFile; // make the script element load file
		document.body.appendChild(jsElm); // finally insert the element to the body element in order to load the script
		jsElm.onload = callback;
	};

	// This method converts CSV data to downloadable file
	utilsObj.downloadCSV = function (downloadCSV, fileName, callback) {
		try {
			var hiddenElement = document.createElement('a');
			document.body.appendChild(hiddenElement); // Append anchor to DOM
			hiddenElement.href = 'data:attachment/csv;charset=utf-8,' + encodeURI(downloadCSV);
			hiddenElement.target = '_blank';
			hiddenElement.download = fileName;
			hiddenElement.click();
			hiddenElement.remove(); // Remove/delete anchor to DOM
			callback(true);
		} catch (err) {
			console.error("Error occured while downloadCSV -- " + err);
			callback(false);
		}
	}

	/**
	 * This function will decide to open/download attachement based on browser support.
	 * @param fUrl - file path to download 
	 */
	utilsObj.downloadFile = function downloadFile(fUrl, callback) {
		try {
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState === 4 && this.status === 200) {
					//Creating new link node.
					var fileName = fUrl.substring(fUrl.lastIndexOf("/") + 1, (fUrl.indexOf("?") < 0 ? fUrl.length : fUrl.indexOf("?")));
					if (fileName) {
						var downloadLink = window.document.createElement('a');
						downloadLink.href = fUrl;
						if (downloadLink.download !== undefined)
							downloadLink.download = fileName; // If browser does support to download open in new tab of browser.
						downloadLink.target = "_blank"; // Fallback option for firefox to open in new tab -- if(!fUrl.match(/(xls|doc|dot|wbk|ppt|xps|zip)/) || isIE) 
						document.body.appendChild(downloadLink);
						downloadLink.click();
						document.body.removeChild(downloadLink);
						if (callback) callback(true);
					} else {
						alert("There has been an error while recieving this file, please ask the sender to resend again.");
					}
				} else if (this.readyState === 4 && this.status !== 200) {
					if (callback) callback(false);
					alert("There has been an error while recieving this file, please ask the sender to resend again.");
				}
			}
			xhttp.open("GET", fUrl, true);
			xhttp.send();
		} catch (err) {
			if (callback) callback(false);
		}
	}

	// Get current geolocation
	utilsObj.getCurrentLocation = function getCurrentLocation(callback) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				callback({
					"status": 1,
					"message": position
				});
			}, function () {
				callback({
					"status": 0,
					"message": "Error: Access is denied!"
				});
			});
		} else {
			callback({
				"status": 0,
				"message": "Sorry, browser does not support geolocation!"
			});
		}
	}

	// This method used to mask the email address
	utilsObj.encryptEmail = function encryptEmail(emailAddress) {
		try {
			var emailSubstr = emailAddress.substring(2, emailAddress.search("@") - 1);
			return emailAddress.replace(emailSubstr, emailSubstr.split('').map(function () {
				return '*'
			})).replace(/,/g, "");
		} catch (err) {
			return emailAddress
		}
	}

	// Escape HTML 
	utilsObj.escapeHTML = function escapeHTML(s) {
		try {
			if (s) {
				var el = document.createElement("div");
				el.innerText = el.textContent = s;
				s = el.innerHTML;
			}
		} catch (err) {
			//TODO - Nothing to do
		}
		return s;
	}

	// This method used to escape RegEx pattern from the passed string
	utilsObj.escapeRegExString = (str) => {
		const matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;
		if (typeof str === 'string')
			return str.replace(matchOperatorsRegex, '\\$&');
		else
			return str;
	}

	// Returns textarea current cursor position
	utilsObj.getTextareaCursorPosition = function getTextareaCursorPosition(textarea) {
		var p = 0;
		try {
			p = [textarea.value.substring(0, textarea.selectionStart), textarea.value.substring(textarea.selectionStart, textarea.selectionEnd), textarea.value.substring(textarea.selectionEnd, textarea.value.length)];
		} catch (err) {
			p = -1;
		}
		return p;
	}

	utilsObj.GUID = function GUID() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var d = new Date().getTime();
			var r = (d + Math.random() * 16) % 16 | 0;
			return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
	}

	utilsObj.renameFile = function renameFile(file) {
		try {
			var blob = file.slice(0, -1, file.type);
			return new File([blob], file.name.replace(/[^\w\s\.]/gi, '_'), {
				type: file.type
			});
		} catch (err) {
			return file;
		}
	}

	utilsObj.isValidFileNames = function isValidFileNames(files) {
		var flag = true;
		try {
			for (var i = 0; i < files.length; i++) {
				if (/[\*]/gi.test(files[i].name)) { //[\#\%\+\?]
					flag = false;
					break;
				}
			}
		} catch (err) {
			flag = false;
		}
		return flag;
	}

	// This method sends a beacon request to the server in the global browsing context 
	utilsObj.sendBeacon = function sendBeacon(url, data) {
		try {
			if (navigator.sendBeacon) {
				navigator.sendBeacon(url, data); // Send the beacon
			} else {
				var xhr = new XMLHttpRequest();
				xhr.open('POST', url, true)
				xhr.onload = function () {
					if (this.readyState === 4) {
						if (this.status === 200)
							console.error("Chat ended successfully"); // Log the data and result
						else
							console.error("Error occured in sendBeacon -- " + this.responseText);
					}
				}
				xhr.setRequestHeader('Content-Type', 'text/plain');
				xhr.send(data);
			}
		} catch (err) {
			console.error("Error occured in sendBeacon -- " + err);
		}
	}

	utilsObj.plainToLink = function plainToLink(text) {
		let linkyExp = /(((https|http)?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=(&)]*))/gm; // Converts plain url to anchor tags
		let tempText = "";
		try {
			tempText = text.replace(linkyExp, (m) => {
				return m.search("http") >= 0 ? "<a href=" + m + " target='_blank'>" + m + "</a>" : "<a href=//" + m + " target='_blank'>" + m + "</a>";
			})
		} catch (err) {
			tempText = text;
		}
		return tempText;
	}

	utilsObj.bytesToSize = function bytesToSize(bytes) {
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes === 0) return '0 Byte';
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
	}

	/*
	 * httpGet method used to retrieve  information 
	 * @url - Resource URL
	 */
	utilsObj.httpGet = (url, headers) => {
		return new Promise((resolve, reject) => {
			let xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				let response = null;
				try {
					response = JSON.parse(this.responseText);
				} catch (err) {
					response = this.responseText
				}

				if (this.readyState === 4 && this.status >= 200 && this.status <= 299) {
					resolve([response, this.status, this.getAllResponseHeaders()]);
				} else if (this.readyState === 4 && !(this.status >= 200 && this.status <= 299)) {
					reject([response, this.status, this.getAllResponseHeaders()]);
				}
			}
			xhttp.open("GET", url, true);
			xhttp.setRequestHeader("Content-type", "application/json");
			if (utilsObj.isNotEmptyObject(headers)) {
				for (let key in headers)
					xhttp.setRequestHeader(key, headers[key]);
			}
			xhttp.send();
		});
	}

	/*
	 * httpGet method used to retrieve  information 
	 * @url - Resource URL
	 */
	utilsObj.httpDelete = (url, headers) => {
		return new Promise((resolve, reject) => {
			let xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				let response = null;
				try {
					response = JSON.parse(this.responseText);
				} catch (err) {
					response = this.responseText
				}

				if (this.readyState === 4 && this.status >= 200 && this.status <= 299) {
					resolve([response, this.status, this.getAllResponseHeaders()]);
				} else if (this.readyState === 4 && !(this.status >= 200 && this.status <= 299)) {
					reject([response, this.status, this.getAllResponseHeaders()]);
				}
			}
			xhttp.open("DELETE", url, true);
			xhttp.setRequestHeader("Content-type", "application/json");
			if (utilsObj.isNotEmptyObject(headers)) {
				for (let key in headers)
					xhttp.setRequestHeader(key, headers[key]);
			}
			xhttp.send();
		});
	}

	/*
	 * httpPost method used to post  information 
	 * @url - Resource URL
	 * @data - Payload
	 */
	utilsObj.httpPost = (url, data, headers) => {
		return new Promise((resolve, reject) => {
			let xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				let response = null;
				try {
					response = JSON.parse(this.responseText);
				} catch (err) {
					response = this.responseText
				}

				if (this.readyState === 4 && this.status >= 200 && this.status <= 299) {
					resolve([response, this.status, this.getAllResponseHeaders()]);
				} else if (this.readyState === 4 && !(this.status >= 200 && this.status <= 299)) {
					reject([response, this.status, this.getAllResponseHeaders()]);
				}
			}
			xhttp.open("POST", url, true);
			xhttp.setRequestHeader("Content-type", "application/json");
			if (utilsObj.isNotEmptyObject(headers)) {
				for (let key in headers)
					xhttp.setRequestHeader(key, headers[key]);
			}
			xhttp.send(JSON.stringify(data));
		});
	}

	/*
	 * httpPost method used to post  information 
	 * @url - Resource URL
	 * @data - Payload
	 */
	utilsObj.httpPut = (url, data, headers) => {
		return new Promise((resolve, reject) => {
			let xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				let response = null;
				try {
					response = JSON.parse(this.responseText);
				} catch (err) {
					response = this.responseText
				}

				if (this.readyState === 4 && this.status >= 200 && this.status <= 299) {
					resolve([response, this.status, this.getAllResponseHeaders()]);
				} else if (this.readyState === 4 && !(this.status >= 200 && this.status <= 299)) {
					reject([response, this.status, this.getAllResponseHeaders()]);
				}
			}
			xhttp.open("PUT", url, true);
			xhttp.setRequestHeader("Content-type", "application/json");
			if (utilsObj.isNotEmptyObject(headers)) {
				for (let key in headers)
					xhttp.setRequestHeader(key, headers[key]);
			}
			xhttp.send(JSON.stringify(data));
		});
	}

	/*
	 * Get Hours by milliseconds
	 * @ param - milliSeconds
	 */
	utilsObj.getHoursByMilliSeconds = function (milliSeconds) {
		// if milliSeconds undefined then we have to return default value's
		if (milliSeconds) {
			return utilsObj.getHoursBySeconds((milliSeconds - (milliSeconds % 1000)) / 1000);
		} else {
			return "00:00:00";
		}

	}

	// This method used to copy text/html to clipboard
	utilsObj.copyHTML = (str, type = "text/html") => {
		try {
			function listener(e) {
				e.clipboardData.setData(type, str);
				// e.clipboardData.setData("text/plain", str);
				e.preventDefault();
			}
			document.addEventListener("copy", listener);
			document.execCommand("copy");
			document.removeEventListener("copy", listener);
		} catch (err) {
			console.error("Error occured while copying HTML--" + err);
		}
	}

	utilsObj.getHoursBySeconds = (seconds) => {
		if (isNaN(seconds)) return '00:00:00'
		return utilsObj.getCallDuration(seconds);
	}

	utilsObj.getCallDuration = (duration, isTwoDigit) => {
		if (!duration && isTwoDigit) return '00:00';
		var durationStr = isTwoDigit ? "00:00" : "00:00:00";
		try {
			var hrs = isTwoDigit ? Math.floor(duration / (3600 * 1000)) : Math.floor(duration / 3600);
			duration = isTwoDigit ? ((duration / 1000) % 3600) : (duration % 3600);
			var mins = Math.floor(duration / 60);
			var secs = Math.floor(duration % 60);
			hrs = isTwoDigit ? (hrs === 0 ? '' : (hrs > 9 ? hrs : "0" + hrs) + ":") : ((hrs > 9 ? hrs : "0" + hrs) + ":");
			durationStr = hrs + (mins > 9 ? mins : "0" + mins) + ":" + (secs > 9 ? secs : "0" + secs);
		} catch (err) {
			durationStr = "00:00:00"
		}
		return durationStr;
	};

	utilsObj.filter = (arr, searchText) => arr.filter((item) => (Object.keys(item).some((key) => item[key].includes(searchText))));

	//This method used to calculate Percentage
	utilsObj.getPercentage = (num, total) => {
		let value = 0;
		try {
			if (typeof (num) !== 'undefined' && typeof (total) !== 'undefined') {
				const number = parseInt(num);
				const totalNumber = parseInt(total);
				value = totalNumber === 0 ? 0 : ((number / totalNumber) * 100).toFixed(0)
			}
			return value;
		} catch (err) {
			console.error('Error occured while Percentage ()', err)
		}
	}

	// Conver single digits to double digit
	utilsObj.pad2 = (number) => number < 10 ? '0' + number : number

	// check number is undefined or null then return zero else return number
	utilsObj.getNumber = (num) => isNaN(num) || num === null || num === "" ? 0 : parseInt(num);

	// check number is 0 | 00 | 0.00 | 00:00:00 | 00:00 or then set className is text-muted 
	utilsObj.isMute = (num) => num === 0 || num === '00' || num === '00:00' || num === "00:00:00" || num === "0.00" || num === "00:00:00" ? 'text-muted' : null;

	// Uppercase the first character of a string
	utilsObj.ucFirst = (s) => {
		let r = "";
		try {
			if (typeof s === "string") {
				r = s.toLowerCase();
				r = r.charAt(0).toUpperCase() + r.substr(1);
			}
		} catch (err) {
			r = s;
		}
		return r;
	}

	// Converts { key : value } object to array and returns the same 
	utilsObj.object2Array = (obj) => Object.keys(obj).map(key => obj[key]);

	// Returns file extension by filename
	utilsObj.getFileExtension = (filename) => {
		return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : null;
	}

	// Get Value by property path
	utilsObj.getValueByPropertyPath = (path = "", obj = {}) => {
		const convArrNotation = (str) => str.split("[").reduce((acc, key) => 
			`${acc}${(utilsObj.isNotEmptyString(acc) && ".") || ""}${(key.indexOf("]") >= 0 && key.replace("]", ""))|| key}`, "")

		try {
			if (utilsObj.isNotEmptyString(path)
				&& utilsObj.isNotEmptyObject(obj)) {
				if (path.includes("["))
					path = convArrNotation(path);
					
				return path.split('.').reduce((o, i) => o[i], obj)
			} else {
				return null
			}
		} catch (err) {
			return null
		}
	}

	// Escape special characters in string
	utilsObj.escapeRegExp = (str) => (typeof str === "string" && str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
		|| str;

	return utilsObj;
})();