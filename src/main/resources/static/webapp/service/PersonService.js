sap.ui.define([], function () {
	"use strict";

	/**
	 * Facade for Person Service
	 *
	 * @author Tudor Riscutia
	 * @version 1.0
	 */
	return {

    	/**
		 * Find persons by search criteria or get all if empty
		 * @param {string} sSearch Search string
		 * @param {function} fnSuccess Function for successful call
		 * @private
		 */
		find: function (sSearch, fnSuccess) {
			var sPath = "../rest/persons";

			if (sSearch !== null)
				sPath = sPath + "/search/by?name=" + sSearch;

			jQuery.get(sPath).then(function (oResponse) {
				fnSuccess(oResponse._embedded.persons);
			});
		},

    	/**
		 * Get a person with the given ID
		 * @param {string} sPersonId Person ID
		 * @param {function} fnSuccess Function for successful call
		 * @private
		 */
		getById: function (sPersonId, fnSuccess) {
			var sPath = "../rest/persons/" + sPersonId;
			jQuery.get(sPath).then(fnSuccess);
		},

    	/**
		 * Create new person
		 * @param {object} oPerson Person to be created
		 * @param {function} fnSuccess Function for successful call
		 * @private
		 */
		create: function (oPerson, fnSuccess) {
			jQuery.ajax({
				type: "POST",
				url: "../rest/persons",
				data: JSON.stringify(oPerson),
				contentType: "application/json"
			}).then(fnSuccess);
		}

	}

});
