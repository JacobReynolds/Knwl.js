/*
TODO
-------
Interested in doing the following:
	Sentences like '3 days from monday, 3 days from today, etc...'
		-Issue, '3 days from monday' could mean last monday or next monday.  Need a sentence analyzer for past/present tense
		-Issue, hard to calculate '3 days from monday' vs '3 years from monday' without it just being a lot of if statements.

*/
function RelativeDates(knwl) {

	this.languages = { //supported languages
		english: true
	};
	this.dayAbbrs = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

	this.constructDateObj = function (year, month, day) {
		return {
			year: year,
			month: month,
			day: day,
			preview: null
		};
	};


	this.dates = {};
	this.dates.prefixes = [{
		prefix: 'ago',
		create: function (length) {
			return -length || -1;
		}
    }, {
		prefix: 'since',
		create: function (length) {
			return -length || -1;
		}
    }, {
		prefix: 'next',
		create: function (length) {
			return length || 1;
		}
    }, {
		prefix: 'last',
		create: function (length) {
			return -length || -1;
		}
    }, {
		prefix: 'after',
		create: function (length) {
			return length || 1;
		}
    }, {
		prefix: 'in',
		create: function (length) {
			return length || 1;
		}
    }]
	this.dates.roots = [{
		root: 'tomorrow',
		create: function () {
			return (new Date).setDate((new Date).getDate() + 1);
		}
    }, {
		root: 'yesterday',
		create: function () {
			return (new Date).setDate((new Date).getDate() - 1);
		}
    }, {
		root: 'day',
		create: function (prefix, length) {
			var days = relativeDates.dates.getPrefix(prefix).create(length);
			return (new Date).setDate((new Date).getDate() + days);
		}
    }, {
		root: 'week',
		create: function (prefix, length) {
			var days = relativeDates.dates.getPrefix(prefix).create(length);
			return (new Date).setDate((new Date).getDate() + (days * 7));
		}
    }, {
		root: 'month',
		create: function (prefix, length) {
			var months = relativeDates.dates.getPrefix(prefix).create(length);
			return (new Date).setMonth((new Date).getMonth() + months);
		}
    }, {
		root: 'year',
		create: function (prefix, length) {
			var years = relativeDates.dates.getPrefix(prefix).create(length);
			return (new Date).setFullYear((new Date).getFullYear() + years);
		}
    }]

	this.dates.getPrefix = function (prefix) {
		var prefixes = relativeDates.dates.prefixes;
		for (var i = 0; i < prefixes.length; i++) {
			var relativePrefix = prefixes[i];
			if (relativePrefix.prefix === prefix) return relativePrefix;
		}
	}
	this.dates.getRoot = function (root) {
		var roots = relativeDates.dates.roots;
		for (var i = 0; i < roots.length; i++) {
			var relativeRoot = roots[i];
			if (relativeRoot.root === root || relativeRoot.root + 's' === root) return relativeRoot;
		}
	}

	this.calls = function () {

		var words = knwl.words.get('words'); //get the String as an array of words
		var results = [];

		//for dates like "tomorrow", "next week", "3 days ago" (relative)
		for (var i = 0; i < words.length; i++) {
			this.createRelativeDateObject = function (workableRoot, workablePrefix, number) {
				var result;
				var dateObj = {};
				try {
					result = new Date(workableRoot.create(workablePrefix, Number(number)));
				} catch (err) {
					console.log(err);
					return;
				}
				dateObj = relativeDates.constructDateObj(result.getFullYear(), result.getMonth() + 1, result.getDate());
				dateObj.found = i;
				dateObj.preview = knwl.tasks.preview(i, words);
				results.push(dateObj);
			}


			var root = words[i] //[i + 1];
			var prefix = words[i - 1]; //[i];
			var number = words[i - 2]; //[i - 1];
			var workableRoot = relativeDates.dates.getRoot(root);
			var workablePrefix = relativeDates.dates.getPrefix(prefix);
			//Need to worry about phrases like "in 3 days", "3 days from now"
			if (!isNaN(number)) {
				if (workableRoot) {
					if (workablePrefix) {
						relativeDates.createRelativeDateObject(workableRoot, workablePrefix.prefix, Number(number));
					}
				} else {
					var workablePrefix = relativeDates.dates.getPrefix(root);
					if (workablePrefix) {
						workableRoot = relativeDates.dates.getRoot(prefix);
						if (workableRoot) {
							relativeDates.createRelativeDateObject(workableRoot, workablePrefix.prefix, Number(number));
						}
					}
				}
			} else if (!isNaN(prefix)) {
				workablePrefix = relativeDates.dates.getPrefix(number);
				if (workablePrefix) {
					number = prefix;
					if (workableRoot) {
						relativeDates.createRelativeDateObject(workableRoot, workablePrefix.prefix, Number(number));
					}
				}
			} else {
				if (workableRoot) {
					if (workablePrefix) {
						relativeDates.createRelativeDateObject(workableRoot, workablePrefix.prefix);
					} else {
						relativeDates.createRelativeDateObject(workableRoot);
					}
				}
			}
		}
		return results;
	};
	var relativeDates = this;
}

module.exports = RelativeDates;
