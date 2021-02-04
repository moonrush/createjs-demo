/**
 * Very minimal shared code for examples.
 */

(function() {
	if (document.body) { setupEmbed(); }
	else { document.addEventListener("DOMContentLoaded", setupEmbed); }
	
	function setupEmbed() {
		if (window.top != window) {
			document.body.className += " embedded";
		}
	}
	
	var o = window.shared = {};
	o.loading = function(id) {
		var div = id ? document.getElementById(id) : document.querySelector("div canvas").parentNode;
		div.className += " loading";
	};
	
	o.loaded = function() {
		var div = document.querySelector(".loading");
		div.className = div.className.replace(/\bloading\b/);
	};
})();