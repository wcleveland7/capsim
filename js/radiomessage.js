

	function sanitize(val) {

	//	remove problematic chars such as:   &
		val = val.replaceAll('&', '-n-')

	//	might need to uriEncode ??

	return val;
}



class RadioMessage {

	//VID = '';
	ID = self.crypto.randomUUID();;
	Dtg = new Date();
	Precedence = 'R';
	Remarks = '';
	Message_Type = 1;
	Latitude = 0.0;
	Longitude = 0.0;
	Mission_Num = null;
	Mission_rid = null;
	Sortie_Num = 0;
	Sortie_Type = 0;

	constructor(remarks, latitude, longitude) {

		//this.VID = vid;
		//this.ID = self.crypto.randomUUID();
		//this.Dtg = new Date();
		//this.Precedence = 'R';
		//this.Message_Type = message_type;
		this.Remarks = sanitize(remarks);
		this.Latitude = latitude;
		this.Longitude = longitude;
	}

	set Message_Type_(val) { /* … */
		this.Message_Type = val;
		// now, set precedence
		//this.Precedence = 'x';
	}

	//set Remarks_(val) { /* … */

	//	// validate chars
	//	this.Remarks = validate(val);
	//}


}

