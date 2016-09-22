export class User {
    id        :number;
	admin     :boolean;
	date_added :string;

	firstname :string;
	surname   :string;

	address     :string;
	postcode    :string;

	home_phone   :string;
    mobile_phone :string;
	fax_number   :string;

	email :string;

	constructor() {
		this.id = 0;
		this.admin = false;
		this.date_added = '';
		this. firstname = '';
		this.surname = '';
		this.address = '';
		this.postcode = '';
		this.home_phone = '';
		this.mobile_phone = '';
		this.fax_number = '';
		this.email = '';
	}
}