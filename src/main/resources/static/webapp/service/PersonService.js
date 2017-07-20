sap.ui.define([], function () {
    "use strict";

    return {
    
    	/**
		 * Find persons by search criteria or get all if empty
		 * @param {string} sSearch Search string
		 * @param {function} fnSuccess Function for successful call
		 * @private
		 */
    	find : function(sSearch, fnSuccess) {
    		var sPath = "../rest/persons";
    		
    		if (sSearch !== null)
    			sPath = sPath + "/search/by?name=" + sSearch;
    		
    		var oRequest = new XMLHttpRequest();			
			oRequest.open("GET", sPath, true);
			oRequest.setRequestHeader("Content-Type", "application/json");
			
			oRequest.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					var oResponse = JSON.parse(this.response);
					fnSuccess(oResponse._embedded.persons);
				}
			};
			
			oRequest.send();		
    	},
    	
    	/**
		 * Get a person with the given ID
		 * @param {string} sPersonId Person ID
		 * @param {function} fnSuccess Function for successful call
		 * @private
		 */
    	getById : function(sPersonId, fnSuccess) {
    		var sPath = "../rest/persons/" + sPersonId;
    		
    		var oRequest = new XMLHttpRequest();			
			oRequest.open("GET", sPath, true);
			oRequest.setRequestHeader("Content-Type", "application/json");
			
			oRequest.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200)
					fnSuccess(JSON.parse(this.response));
			};
			
			oRequest.send();
    	},

    	/**
		 * Create new person
		 * @param {object} oPerson Person to be created
		 * @param {function} fnSuccess Function for successful call
		 * @private
		 */
    	create : function(oPerson, fnSuccess) {
    		var sPath = "../rest/persons";
    		
    		var oRequest = new XMLHttpRequest();
			oRequest.open("POST", sPath, true);
			oRequest.setRequestHeader("Content-Type", "application/json");

			oRequest.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 201)
					fnSuccess(JSON.parse(this.response));								
			};

			oRequest.send(JSON.stringify(oPerson));    		
    	}

    }
    
});
