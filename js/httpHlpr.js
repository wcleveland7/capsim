
/*
 * 
 *	https://www.w3schools.com/xml/xml_http.asp
 *	https://www.w3schools.com/xml/ajax_intro.asp
 *	
 *	https://medium.com/analytics-vidhya/how-to-return-the-response-from-an-asynchronous-call-2ef494308423
 * 
 *	https://javascript.info/xmlhttprequest
 *	
 *	
 * */

/*
 *
 * https://www.w3schools.com/xml/ajax_xmlhttprequest_response.asp
 * 
Property	Description
onreadystatechange	Defines a function to be called when the readyState property changes

readyState	Holds the status of the XMLHttpRequest.
0: request not initialized
1: server connection established
2: request received
3: processing request
4: request finished and response is ready

status	200: "OK"
403: "Forbidden"
404: "Page not found"

For a complete list go to the Http Messages Reference
statusText	Returns the status-text (e.g. "OK" or "Not Found")
 * */


/*
async function httpGet(theUrl) {
	//alert(theUrl);

	console.log('httpGet(' + theUrl + ')');
	let encodedUrl = encodeURI(theUrl);
	console.log('httpGet(' + encodedUrl + ')');

	var xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			console.log('httpGet() ' + this.responseText);
		}
		else {
			console.log(`httpGet(${theUrl}) : ${this.readyState}, ${this.status} ` + this.responseText);
		}
	};
	xhr.open("GET", encodeURI(encodedUrl), true);
	xhr.send(null);

	xhr.onload = function () {
		if (xhr.status != 200) { // analyze HTTP status of the response
			console.log(`httpGet() Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
		} else { // show the result
			console.log(`httpGet() Done, got ${xhr.response.length} bytes`); // response is the server response
		}
	};

	xhr.onprogress = function (event) {
		if (event.lengthComputable) {
			console.log(`httpGet() Received ${event.loaded} of ${event.total} bytes`);
		} else {
			console.log(`httpGet() Received ${event.loaded} bytes`); // no Content-Length
		}

	};

	xhr.onerror = function () {
		console.log("httpGet() Request failed");
	};

	console.log(`httpGet() response.text = [${xhr.responseText}]`);
	return xhr.responseText;
}
*/

/*
async function httpGetAsync(theUrl) {

	const xhr = new XMLHttpRequest();
	xhr.open("GET", encodeURI(theUrl), true);

	xhr.onload = (e) => {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				console.log(xhr.responseText);
			} else {
				console.error(xhr.statusText);
			}
		}
	};
	xhr.onerror = (e) => {
		console.error(xhr.statusText);
	};
	xhr.send(null);

	return xhr.responseText;
}
*/

async function httpGet(theUrl) {

	try {
		//  https://www.w3schools.com/xml/ajax_xmlhttprequest_create.asp
		//  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
		//
		//	https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests

		//var xmlHttp = null;
		const xmlHttp = new XMLHttpRequest();

		xmlHttp.onreadystatechange = function () {

			if (this.readyState == 4 && this.status == 200) {
				// Typical action to be performed when the document is ready:
				//document.getElementById("demo").innerHTML = xhttp.responseText;
				console.log(xmlHttp.responseText);
				return xmlHttp.responseText;
			}
			else {
				console.log(`readystate = ${this.readyState}, status = ${this.status}`)
			}
		};

		xmlHttp.onload = (e) => {
			if (xmlHttp.readyState === 4) {
				if (xmlHttp.status === 200) {
					console.log(xmlHttp.responseText);
				} else {
					console.error(xmlHttp.statusText);
				}
			}
		};

		xmlHttp.onerror = (e) => {
			console.error(xmlHttp.statusText);
		};

		xmlHttp.open("GET", encodeURI(theUrl), false);
		xmlHttp.send();

		console.log(xmlHttp.status);
		console.log(xmlHttp.responseText);
		//console.log(xmlHttp.getAllResponseHeaders());
		//console.log(xmlHttp);

		if (xmlHttp.status != 200) {
			//alert(xmlHttp.status);
			console.log(xmlHttp.status);
			return xmlHttp.status;
		}
		return xmlHttp.responseText;
	}
	catch (err) {
		console.log(err);
		//alert(err);
	}

	return 500;
}


/*
function httpPost(theUrl) {
	alert(theUrl);

	console.log('httpPost(' + theUrl + ')');
	let encodedUrl = encodeURI(theUrl);
	console.log('httpPost(' + encodedUrl + ')');

	var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", encodeURI(encodedUrl), true);
	xmlHttp.send(null);
	console.log(xmlHttp.responseText);
	return xmlHttp.responseText;
}
*/

//async function httpPost(theUrl, jsonData) {

//	console.log(theUrl);

//	//
//	//	https://javascript.info/fetch
//	//

//	/*
//	let response = await fetch(theUrl, {
//		method: 'POST',
//		headers: {
//			'Content-Type': 'application/json;charset=utf-8'
//		},
//		body: JSON.stringify(jsonData)
//	});
//	*/
//}


// unused:
async function httpGetFetch(theUrl) {

	//	https://developer.mozilla.org/en-US/docs/Web/API/fetch

	console.log(theUrl);
	;
	//const response = await fetch(theUrl

	//const response = fetch(theUrl);

	let options = {
		method: "GET", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	};

	// Default options are marked with *
	let response0 = await fetch(theUrl, {
		method: "GET", // *GET, POST, PUT, DELETE, etc.
		mode: "cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow", // manual, *follow, error
		referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

	}).then(response => response.text())
		.then(data => { console.log(data); return data; });

	/*
}).then((response) => {
	if (!response.ok) {
		//throw new Error(`HTTP error! Status: ${response.status}`);
		console.log(`HTTP error! Status: ${response.status}`);
		return response.status;
	}

	return response.json();
});
	*/

	//return response.json(); // parses JSON response into native JavaScript objects
	//);

	//console.log(response);

	//const jsonData = await response0;
	//console.log(jsonData);
	//return jsonData;

	//return jsonData;

}

//	unused
async function fetchGetText(url) {

	try {

		let options = {
			method: "GET", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: "follow", // manual, *follow, error
			referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		};

		let response = await fetch(url, options);
		let data = await response.text();
		//let data = await response.json();
		console.log(data);
		return data;
	}
	catch (err) {
		console.log(`fetchGetJson(${url}) - ${err}`);
		//alert(err);
	}

	return '';

}


async function fetchGetJson(url) {

	try {
		let options = {
			method: "GET", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: "follow", // manual, *follow, error
			referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		};

		let response = await fetch(url, options);
		//let data = await response.text();
		let data = await response.json();
		console.log(data);
		return data;

	}
	catch (err) {
		console.log(`fetchGetJson(${url}) - ${err}`);
		//alert(err);
	}

	return [];

}


async function fetchPostJson(url, data_in) {

	try {

		let options = {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin", // include, *same-origin, omit
			headers: {
				"Content-Type": "application/json",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: "follow", // manual, *follow, error
			referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data_in), // body data type must match "Content-Type" header
		};

		console.log('fetchPostJson');
		console.log(url);
		console.log(options);

		let response = await fetch(url, options);
		//let data = await response.text();
		let data_out = await response.json();
		console.log(data_out);
		return data_out;
	}
	catch (err) {
		console.log(`fetchPostJson(${url}) - ${err}`);
		//alert(err);
	}

	return null;	// TODO: what should this return?
}

async function fetchPostText(url, data_in) {

	try {

		let options = {
			method: "POST", // *GET, POST, PUT, DELETE, etc.
			mode: "cors", // no-cors, *cors, same-origin
			cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
			credentials: "same-origin", // include, *same-origin, omit
			headers: {
				"Content-Type": "text/plain",
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: "follow", // manual, *follow, error
			referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			//		body: JSON.stringify(data_in), // body data type must match "Content-Type" header
		};

		console.log('fetchPostText');
		console.log(url);
		console.log(options);

		let response = await fetch(url, options);
		let data_out = await response.text();
		console.log(response);
		//let data_out = await response.json();
		console.log(data_out);
		return data_out;

	}
	catch (err) {
		console.log(`fetchPostText(${url}) - ${err}`);
		//alert(err);
	}

	return '';	// TODO: what should this return?
}

