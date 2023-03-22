System.register([], (function (exports) {
	'use strict';
	return {
		execute: (function () {

			exports('helloword', helloword);

			function helloword() {
				console.log('hello word');
			}

		})
	};
}));
