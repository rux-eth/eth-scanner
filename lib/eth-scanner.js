(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("eth-scanner", [], factory);
	else if(typeof exports === 'object')
		exports["eth-scanner"] = factory();
	else
		root["eth-scanner"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
function ethScanner() {
    var client = {};
    /*
     * Get total value of all assets in account.
     * NFT value determined by LooksRare floor. ERC20's determined by coingecko API
     */
    client.evaluateAccounts = function (address) { };
    return client;
}
exports["default"] = ethScanner;

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXRoLXNjYW5uZXIuanMiLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87Ozs7Ozs7Ozs7O0FDRkEsU0FBd0IsVUFBVTtJQUNoQyxJQUFNLE1BQU0sR0FBUSxFQUFFLENBQUM7SUFDdkI7OztPQUdHO0lBQ0gsTUFBTSxDQUFDLGdCQUFnQixHQUFHLFVBQUMsT0FBK0IsSUFBTSxDQUFDLENBQUM7SUFDbEUsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQVJELGdDQVFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZXRoLXNjYW5uZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2V0aC1zY2FubmVyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwiZXRoLXNjYW5uZXJcIiwgW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZXRoLXNjYW5uZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZXRoLXNjYW5uZXJcIl0gPSBmYWN0b3J5KCk7XG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiLyogZXNsaW50LWRpc2FibGUgaW1wb3J0L25vLXVucmVzb2x2ZWQgKi9cbi8qIGVzbGludC1kaXNhYmxlIGltcG9ydC9leHRlbnNpb25zICovXG5pbXBvcnQgeyBldGhlcnMgfSBmcm9tIFwiZXRoZXJzXCI7XG5cbmltcG9ydCBnZXRBbGxBc3NldHMgZnJvbSBcIi4vY29tbWFuZHMvZ2V0QWxsQXNzZXRzXCI7XG5pbXBvcnQgZXZhbHVhdGVBY2NvdW50cyBmcm9tIFwiLi9jb21tYW5kcy9ldmFsdWF0ZUFjY291bnRzXCI7XG5pbXBvcnQgY2hlY2tBZGRyZXNzIGZyb20gXCIuL3V0aWwvY2hlY2tBZGRyZXNzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGV0aFNjYW5uZXIoKSB7XG4gIGNvbnN0IGNsaWVudDogYW55ID0ge307XG4gIC8qXG4gICAqIEdldCB0b3RhbCB2YWx1ZSBvZiBhbGwgYXNzZXRzIGluIGFjY291bnQuXG4gICAqIE5GVCB2YWx1ZSBkZXRlcm1pbmVkIGJ5IExvb2tzUmFyZSBmbG9vci4gRVJDMjAncyBkZXRlcm1pbmVkIGJ5IGNvaW5nZWNrbyBBUElcbiAgICovXG4gIGNsaWVudC5ldmFsdWF0ZUFjY291bnRzID0gKGFkZHJlc3M6IHN0cmluZyB8IEFycmF5PHN0cmluZz4pID0+IHt9O1xuICByZXR1cm4gY2xpZW50O1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9