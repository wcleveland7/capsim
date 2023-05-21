

// This function left pads numbers:
function lpad(num, count, char ) {

	if (char == null) {
		char = '0';
	}

	if (count == null || count < 0) {
		count = 2;
	}

	if (num == null) {
		num = 0;
	}

	console.log('lpad:');
	console.log(num);
	console.log(count);
	console.log('[' + char + ']');

	let str = String(num);

	if (str.length < count) {

		let addCt = count - str.length;
		let i;
		for (i = 0; i < addCt; i++) {
			str = char + str;
		}
	}


	//alert(str);
	console.log(str);

	return str;
}

// this function returns the ISO date  YYYY-MM-DD
function getISODateString() {

	let str = '';

	let today = new Date();
	let y = today.getUTCFullYear();
	let m = today.getUTCMonth() + 1;
	let d = today.getUTCDate();

	//alert(y);
	//alert(m);
	//alert(d);
	//console.log(y + '-' + lpad(m) + '-' + lpad(d));
	//alert(lpad(m));

	str = y + '-' + lpad(m) + '-' + lpad(d);
	console.log(str);

	return str;
}

function getISODateStringFromUnixTime(unix_timestamp) {

	let str = '';

/*
	let today = new Date();
	let y = today.getUTCFullYear();
	let m = today.getUTCMonth() + 1;
	let d = today.getUTCDate();

	//alert(y);
	//alert(m);
	//alert(d);
	//console.log(y + '-' + lpad(m) + '-' + lpad(d));
	//alert(lpad(m));

	str = y + '-' + lpad(m) + '-' + lpad(d);
	console.log(str);
*/
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
//	var date = new Date(unix_timestamp * 1000);
	var date = new Date(unix_timestamp);

	let y = date.getUTCFullYear();
	let m = date.getUTCMonth() + 1;
	let d = date.getUTCDate();

	str = y + '.' + lpad(m) + '.' + lpad(d);
	console.log(str);

	return str;
}

function getISODateTimeStringFromUnixTime(unix_timestamp) {

	let str = '';

	/*
		let today = new Date();
		let y = today.getUTCFullYear();
		let m = today.getUTCMonth() + 1;
		let d = today.getUTCDate();
	
		//alert(y);
		//alert(m);
		//alert(d);
		//console.log(y + '-' + lpad(m) + '-' + lpad(d));
		//alert(lpad(m));
	
		str = y + '-' + lpad(m) + '-' + lpad(d);
		console.log(str);
	*/
	// Create a new JavaScript Date object based on the timestamp
	// multiplied by 1000 so that the argument is in milliseconds, not seconds.
	//	var date = new Date(unix_timestamp * 1000);
	var date = new Date(unix_timestamp);

	let y = date.getUTCFullYear();
	let m = date.getUTCMonth() + 1;
	let d = date.getUTCDate();
	let hr = date.getUTCHours();
	let mi = date.getUTCMinutes();
	let s = date.getUTCSeconds();

	str = y + '.' + lpad(m) + '.' + lpad(d) + ' ' + lpad(hr) + ':' + lpad(mi) + ':' + lpad(s);
	console.log(str);

	return str;
}

function getCoordinatesToString1(hemi, d, m, s, digits)
{
	//	hemi is string representing hemisphere:  N = North, S = South, W = West, E = East
	//	d is degrees.
	//	m is minutes
	//	s is seconds
	//	digits is the number of decimal places
	//
	//	return format is decimal degrees
	if (digits === undefined) {
		digits = 5;
	}
//	let str = hemi + (d + (m + (s / 60.0)) / 60.0).toFixed(digits);

	let str = (d + (m + (s / 60.0)) / 60.0).toFixed(digits);

	if (hemi == 'S' || hemi == 'W') {
		str *= -1;
	}

	return str;
}


/*
function getCoordinatesToString1(hemi, d, m, s, digits) {
	//	hemi is string representing hemisphere:  N = North, S = South, W = West, E = East
	//	d is degrees.
	//	m is minutes
	//	s is seconds
	//	digits is the number of decimal places
	//
	//	return format is decimal degrees
	if (digits === undefined) {
		digits = 4;
	}

	if (hemi === undefined || d === undefined || m === undefined || s === undefined) {
		return "";
	}

	let str = hemi + (d + (m + (s / 60.0)) / 60.0).toFixed(digits) + '°';

	return str;
}
*/


function getCoordinatesToString2(hemi, d, m, s, digits) {
	//	hemi is string representing hemisphere:  N = North, S = South, W = West, E = East
	//	d is degrees.
	//	m is minutes
	//	s is seconds
	//	digits is the number of decimal places
	//
	//	return format is degrees + decimal minutes

	if (digits === undefined) {
		digits = 4;
	}

	if (hemi === undefined || d === undefined || m === undefined || s === undefined) {
		return "";
	}

	let str = hemi + d + '° ' + (m + (s / 60.0)).toFixed(digits) + "'";

	return str;
}

function getCoordinatesToString3(hemi, d, m, s, digits) {
	//	hemi is string representing hemisphere:  N = North, S = South, W = West, E = East
	//	d is degrees.
	//	m is minutes
	//	s is seconds
	//	digits is the number of decimal places
	//
	//	return format is degrees minutes seconds

	if (hemi === undefined || d === undefined || m === undefined || s === undefined) {
		return "";
	}

	let str = hemi + d.toFixed(0) + '° ' + m.toFixed(0) + "' " + s.toFixed(0) + '"';

	return str;
}

function getBrowserType() {

	let browser_type = 'unknown';

	if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
		//alert("Chrome");
		browser_type = 'Chrome';
	} else if (navigator.userAgent.toLowerCase().indexOf('edg') > -1) {
		//alert("Edge");
		browser_type = 'Edge';
	} else if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
		//alert('Firefox');
		browser_type = 'Firefox';
	} else if (navigator.userAgent.toLowerCase().indexOf('safari') > -1) {
		//alert('Safari');
		browser_type = 'Safari';
	} else if ((navigator.userAgent.indexOf('opera') || navigator.userAgent.indexOf('OPR')) != -1) {
		//alert('Opera');
		browser_type = 'Opera';
	} else if (navigator.userAgent.indexOf("MSIE") != -1) {
		alert('IE');
		browser_type = "";
	} else {
		//alert('none');
		browser_type = "unknown";
	}

	let nav = navigator;
	console.log('userAgent	= ' + navigator.userAgent);
	console.log('appName	= ' + navigator.appName);
	console.log('appVersion	= ' + navigator.appVersion);
	console.log('Browser Type: ' + browser_type);
	console.log(navigator);
	return browser_type;
}

function displayBrowser() {
	alert(getBrowserType());
}

function isBrowserSafari() {

	return getBrowserType() == 'Safari';

}