sap.ui.define([
	"ro/riscutiatudor/controller/BaseController",
	"ro/riscutiatudor/service/PersonService",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel"
], function(BaseController, PersonService, Device, JSONModel) {
	"use strict";
	
	/**
	 * Controller for PersonList view
	 *
	 * @author Tudor Riscutia
	 * @version 1.0
	 */
	return BaseController.extend("ro.riscutiatudor.controller.PersonList", {
		
		/* =========================================================== */
		/* lifecycle methods */
		/* =========================================================== */

		/**
		 * Called when the controller is instantiated
		 * @public
		 */
		onInit : function () {
			this._oList = this.byId("list");
			this._oSearchField = this.byId("searchField");
						
			this.getRouter().attachBypassed(this.onBypassed, this);
			this.getRouter().getRoute("personList").attachPatternMatched(
				this._matchPattern, this);			
		},
		
		/* =========================================================== */
		/* event handlers */
		/* =========================================================== */
		
		/**
		 * Override event handler for back navigation to browser history
		 * @override
		 * @public
		 */
		onNavBack : function() {
			history.go(-1);
		},
		
		/**
		 * Search persons for given criteria
		 * @param {sap.ui.base.Event} oEvent the search event
		 * @public
		 */
		onSearch : function (oEvent) {
			if (oEvent.getParameters().refreshButtonPressed) {
				// Search field's 'refresh' button has been pressed
				this.onRefresh();
				return;
			}
			
			if (oEvent.getParameters().clearButtonPressed) {
				// Search field's 'clear' button has been pressed
				this._find(null);
				return;
			}
			
			this._find(this._oSearchField.getValue());
		},

		/**
		 * Refresh persons list
		 * @public
		 */
		onRefresh : function () {
			this._find(this._oSearchField.getValue());
		},
		
		/**
		 * Event handler for the bypassed event, which is fired when no routing pattern matched.
		 * If there was an object selected in the master list, that selection is removed.
		 * @public
		 */
		onBypassed : function () {
			this._oList.removeSelections(true);
			this._find(null);
		},

		/**
		 * Event handler for the list selection event
		 * @param {sap.ui.base.Event} oEvent the list selectionChange event
		 * @public
		 */
		onSelectionChange  : function (oEvent) {
			// get the list item, either from the listItem parameter 
			// or from the event's source itself (will depend on the device-dependent mode)
			var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
			var sPath = oItem.getBindingContextPath();
			
			var oPerson = this.getModel("persons").getProperty(sPath);
			this._showPerson(oPerson.id);
		},
		
		/**
		 * Navigate to new person view
		 * @public
		 */
		onNewPerson : function () {
			// display the "newPerson" target without changing the hash
			this.getRouter().getTargets().display("newPerson");
		},
		
		/* =========================================================== */
		/* internal methods */
		/* =========================================================== */

		/**
		 * Trigger refresh if the master route was hit (empty hash)
		 * @private
		 */
		_matchPattern : function () {
			this._find(null);
		},
		
		/**
		 * Find persons by search criteria or all if empty
		 * @param {string} sSearch Search criteria
		 * @private
		 */		
		_find : function (sSearch) {
			this._oList.setBusy(true);

			var oThis = this;
			PersonService.find(sSearch, function(aPersons) {
	     		var oModel = new JSONModel();					
				oModel.setData(aPersons);

				oThis.setModel(oModel, "persons");
				oThis._oList.setBusy(false);		
	     	});
		},

		/**
		 * Navigate to person view with given ID
		 * @param {string} sPersonId Person ID
		 * @private
		 */		
		_showPerson : function (sPersonId) {
			var bReplace = !Device.system.phone;
				
			this.getRouter().navTo("person", {
				id : encodeURIComponent(sPersonId)
			}, bReplace);
		}
		
	});
	
});
