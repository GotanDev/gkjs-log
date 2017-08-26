/** Logging management for JS Application
	 * 
 * Built by freelance software craftmans network : 
 * @see http://gotan.io
 * 
 * @version 1.2.2
 * @author Damien Cuvillier <damien@gotan.io>
 * @license Apache2
 */
var logger = {
	
	active: function(){
		var result =  
			_config != null
			&& _config.debug
			&& window.console != null
			&& typeof window.console == "object";
		
		return result;
	},
	/** Active le mode debug dans une instance qui est en production. */
	activeDebugMode: function(){
		_config.debug = true;
		_config.logger.level = 1;
	},
	log: function(message, level){
		try {
			throw new Error();
		} catch (e) {
			var csObject = this.parseCallStack(e.stack);
			if (this.activeLevel() <= 2) {
				message = 
					message 
					+ "\t %c on " + csObject.file + ", line " + csObject.line 
					+ "\t at " + (new Date()).toLocaleString();
			}
			var additionnalAttr = "color: #777; text-align:right;float:right;font-size: 6pt;";
			switch(level){
				case "debug": 
					console.log(message,additionnalAttr);
					break;
				case "info":
					console.info(message,additionnalAttr);
					break;
				case "warn":
					console.warn(message,additionnalAttr);
					break;
				case "error": 
					console.error(message,additionnalAttr);
					break;
			}
		}
	},
	debug: function(message) {
		if (logger.active() && this.activeLevel() <= 2) {
			this.log(message,"debug");
		}
	}, 
	info: function(message) {
		if (logger.active() && this.activeLevel() <= 3) {
			this.log(message,"info");
		}
	}, 
	warn: function(message){
		if (logger.active() && this.activeLevel() <= 4) {
			this.log(message, "warn");
		}
	}, 
	error: function(message){
		if (logger.active() && this.activeLevel() <= 5) {
			this.log(message,"error");
		}
	},
	trace: function(){
		if (logger.active() && this.activeLevel() <= 1) {
			console.trace();
		}	
	}, 
	
	activeLevel : function() {
		if (_config.logger.level == null) {
			return 1;
		} else {
			return _config.logger.level;
		}
		
	}, 

	parseCallStack : function(stack){
		var caller = stack.split("\n")[3];

		if (caller.indexOf("http") == -1) {
			return {
				file: "NULL", 
				line: 0
			};
		}

		caller = caller.substring(
			caller.indexOf("http")
		);
		
		var path = caller.split("/").slice(3).join("/");

		//var callerFile = caller.;
		return {
			stack : stack, 
			file: path.split(":")[0],
			host: caller.split("/")[2].split(":")[0],
			port: caller.split("/")[2].split(":")[1],
			protocol: caller.split(":")[0],
			line: path.split(":")[1],
			col: path.split(":")[2]
		}
	}, 
	disclaimer: function(){
		if(!_config || ! _config.logger || !_config.logger.disclaimer) {
			return;
		}
		try {
			if (typeof _config.logger.messages != "undefined") {
				console.log("%c" + _config.logger.messages.appTitle, "font-size: 30pt; color:orange");
				console.log("%cSTOP !", "font-size: 26pt;color:red")
				console.log("%c" + _config.logger.messages.consoleWarning, "font-size: 12pt;")
				
			} else if (typeof __ == "function") { 
				console.log("%c" + __("AppTitle"), "font-size: 30pt; color:orange");
				console.log("%cSTOP !", "font-size: 26pt;color:red")
				console.log("%c" + __("Console Warning"), "font-size: 12pt;")
			} else {
				console.log("%cSTOP !", "font-size: 26pt;color:red")
				console.log("%c" +"Console is browser feature designed for web developpers. \nIf you have been invited to type something here, you have do it in your own responsability. It can be hacking purpose and illegal.", "font-size: 12pt;")
			}
		} catch (e) {
			setTimeout(function(){
				logger.disclaimer();
			},500);
		}
	}
};

if (typeof jQuery == "function") {
	/* If jQuery is available, we use ready event, with is more complex than simple DomContentLoaded.*/
	jQuery(document).ready(function(){
		setTimeout(function(){
			logger.disclaimer();
		},1500);
	});
} else {
	document.addEventListener("DOMContentLoaded", function(event) { 
		setTimeout(function(){
			logger.disclaimer();
		},1500);
	});
}



