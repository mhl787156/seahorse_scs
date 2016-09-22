export class Customer {
    id        :string;
	date_added :string;

	firstname :string;
	surname   :string;

	company_name :string;
	address     :string;
	postcode    :string;

	home_phone   :string;
    mobile_phone :string;
	fax_number   :string;

	email :string;

	mailing :boolean;

	notes :string;

	orderids :string[];

	active :boolean;

	constructor() {
		this.id = 'default';
		this.date_added = '';
		this.firstname = '';
		this.surname = '';
		this.company_name = '';
		this.address = '';
		this.postcode = '';
		this.home_phone = '';
		this.mobile_phone = '';
		this.fax_number = '';
		this.email = '';
		this.mailing = false;
		this.notes = '';
		this.orderids = []
		this.active = false;
	}
}
