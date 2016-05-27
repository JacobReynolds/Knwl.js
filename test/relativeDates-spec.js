var Knwl = require('../knwl');
var knwl = new Knwl();

knwl.register('relativeDates', require('../experimental_plugins/relativeDates.js'))

describe("relativeDates", function () {
	it("should detect dates formatted like 'tomorrow'", function () {
		knwl.init("I will see you tomorrow");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setDate((new Date).getDate() + 1);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'yesterday'", function () {
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

	it("should detect dates formatted like 'next 3 days'", function () {
		knwl.init("I will see you in the next 3 days");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setDate((new Date).getDate() + 3);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'next 3 days'", function () {
		knwl.init("I haven't seen you in the last 3 days");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setDate((new Date).getDate() - 3);
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

	it("should detect dates formatted like 'x years ago'", function () {
		knwl.init("I haven't seen in you in the last 3 years");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setFullYear((new Date).getFullYear() - 3);
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

	it("should detect dates formatted like 'x months ago'", function () {
		knwl.init("I saw you 3 years ago");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setFullYear((new Date).getFullYear() - 3);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'in x days' for future", function () {
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

	it("should detect dates formatted like 'in x days' for past", function () {
		knwl.init("I haven't seen you in 9 days");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setDate((new Date).getDate() - 9);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'in x weeks' for future", function () {
		knwl.init("I will see you in 9 weeks");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setDate((new Date).getDate() + (9 * 7));
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'in x weeks' for past", function () {
		knwl.init("I haven't seen you in 9 weeks");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setDate((new Date).getDate() - (9 * 7));
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'in x months' for future", function () {
		knwl.init("I will see you in 9 months");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setMonth((new Date).getMonth() + 9);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'in x months' for past", function () {
		knwl.init("I haven't seen you in 9 months");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setMonth((new Date).getMonth() - 9);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted like 'in x years' for future", function () {
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

	it("should detect dates formatted like 'in x years' for past", function () {
		knwl.init("I haven't seen you in 9 years");
		var output = knwl.get("relativeDates")[0];
		var date = (new Date()).setFullYear((new Date).getFullYear() - 9);
		date = new Date(date);
		if (output) {
			expect(output.month + "/" + output.day + "/" + output.year).toBe((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted with multiple days", function () {
		knwl.init("I will see you in 3 days and then in 9 years");
		var output = knwl.get("relativeDates");
		var date1 = (new Date()).setDate((new Date).getDate() + 3);
		var date2 = (new Date()).setFullYear((new Date).getFullYear() + 9);
		date1 = new Date(date1);
		date2 = new Date(date2);
		if (output.length === 2) {
			expect(output[0].month + "/" + output[0].day + "/" + output[0].year).toBe((date1.getMonth() + 1) + "/" + date1.getDate() + "/" + date1.getFullYear());
			expect(output[1].month + "/" + output[1].day + "/" + output[1].year).toBe((date2.getMonth() + 1) + "/" + date2.getDate() + "/" + date2.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

	it("should detect dates formatted with multiple days and tenses", function () {
		knwl.init("I haven't seen you in 3 days and but I will see you in 9 years");
		var output = knwl.get("relativeDates");
		var date1 = (new Date()).setDate((new Date).getDate() - 3);
		var date2 = (new Date()).setFullYear((new Date).getFullYear() + 9);
		date1 = new Date(date1);
		date2 = new Date(date2);
		if (output.length === 2) {
			expect(output[0].month + "/" + output[0].day + "/" + output[0].year).toBe((date1.getMonth() + 1) + "/" + date1.getDate() + "/" + date1.getFullYear());
			expect(output[1].month + "/" + output[1].day + "/" + output[1].year).toBe((date2.getMonth() + 1) + "/" + date2.getDate() + "/" + date2.getFullYear());
		} else {
			throw new Error("No output object detected");
		}
	});

})
