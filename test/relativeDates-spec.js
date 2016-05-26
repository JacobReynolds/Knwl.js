var Knwl = require('../knwl');
var knwl = new Knwl();

knwl.register('relativeDates', require('../experimental_plugins/relativeDates.js'))

describe("relativeDates", function () {
	it("should detect dates formatted like 'tomorrow'", function () {
		knwl.init("I'd like to make an appointment for tomorrow at Church");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setDate((new Date).getDate() + 1);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'tomorrow'", function () {
		knwl.init("I saw you yesterday");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setDate((new Date).getDate() - 1);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'next week'", function () {
		knwl.init("I will see you next week");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setDate((new Date).getDate() + 7);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'last week'", function () {
		knwl.init("I saw you last week");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setDate((new Date).getDate() - 7);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'x weeks ago'", function () {
		knwl.init("I saw you 3 weeks ago");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setDate((new Date).getDate() - 21);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'x days ago'", function () {
		knwl.init("I saw you 3 days ago");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setDate((new Date).getDate() - 3);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'x months ago'", function () {
		knwl.init("I saw you 3 months ago");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setMonth((new Date).getMonth() - 3);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'last x weeks'", function () {
		knwl.init("I haven't seen in you in the last 3 weeks");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setDate((new Date).getDate() - 21);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'x weeks ago'", function () {
		knwl.init("I haven't seen in you in the last 3 weeks");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setDate((new Date).getDate() - 21);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'in x days'", function () {
		knwl.init("I will see you in 9 days");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setDate((new Date).getDate() + 9);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'in x years'", function () {
		knwl.init("I will see you in 9 years");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setFullYear((new Date).getFullYear() + 9);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

})
