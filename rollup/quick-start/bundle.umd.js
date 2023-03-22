(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.volvol = {}));
})(this, (function (exports) { 'use strict';

	function helloword() {
		console.log('hello word');
	}

	exports.helloword = helloword;

}));
