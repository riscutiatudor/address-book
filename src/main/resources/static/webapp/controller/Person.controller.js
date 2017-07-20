sap.ui.define([
	"ro/riscutiatudor/controller/BaseController",
	"ro/riscutiatudor/service/PersonService",
	"sap/ui/model/json/JSONModel"
], function(BaseController, PersonService, JSONModel) {
	"use strict";

	/**
	 * Controller for Person view
	 *
	 * @author Tudor Riscutia
	 * @version 1.0
	 */
	return BaseController.extend("ro.riscutiatudor.controller.Person", {
		
		/* =========================================================== */
		/* lifecycle methods */
		/* =========================================================== */

		/**
		 * Called when the controller is instantiated
		 * @public
		 */
		onInit : function () {
			// attach handler before pattern matched
			this.getRouter().getRoute("person").attachPatternMatched(
				this._matchPattern, this);
		},
		
		/* =========================================================== */
		/* event handlers */
		/* =========================================================== */
	
		
		/* =========================================================== */
		/* internal methods */
		/* =========================================================== */

		/**
		 * Load person by provided ID (via hash)
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_matchPattern : function (oEvent) {
			this._getById(oEvent.getParameter("arguments").id);
		},
		
		/**
		 * Get a person with the given ID
		 * @param {string} sPersonId Person ID
		 * @private
		 */		
		_getById : function (sPersonId) {
			var oThis = this;
			PersonService.getById(sPersonId, function(oPerson) {
				var oModel = new JSONModel();
				oModel.setData(oPerson);			
				oThis.setModel(oModel, "person");
			});
		}	
		
	});
	
});
