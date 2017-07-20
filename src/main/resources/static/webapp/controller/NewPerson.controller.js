sap.ui.define([
	"ro/riscutiatudor/controller/BaseController",
	"ro/riscutiatudor/service/PersonService",
	"sap/ui/model/json/JSONModel"
], function (BaseController, PersonService, JSONModel) {
	"use strict";

	/**
	 * Controller for NewPerson view
	 *
	 * @author Tudor Riscutia
	 * @version 1.0
	 */
	return BaseController.extend("ro.riscutiatudor.controller.NewPerson", {

		/* =========================================================== */
		/* lifecycle methods */
		/* =========================================================== */

		/**
		 * Called when the controller is instantiated
		 * @public
		 */
		onInit: function () {
			// attach handler before target display
			this.getRouter().getTarget("newPerson").attachDisplay(this._display, this);
		},

		/* =========================================================== */
		/* event handlers */
		/* =========================================================== */

		/**
		 * Cancel create process and navigate back
		 * @public
		 */
		onCancel: function () {
			this.onNavBack();
		},

		/**
		 * Create new person and navigate to it
		 * @public
		 */
		onSave: function () {
			var oPerson = this.getModel("new").getData();

			var oThis = this;
			PersonService.create(oPerson, function (oPerson) {
				oThis.getRouter().navTo("person", { id: encodeURI(oPerson.id) }, true);
			});
		},

		/* =========================================================== */
		/* internal methods */
		/* =========================================================== */

		/**
		 * Refresh model before display
		 * @private
		 */
		_display: function () {
			this.setModel(new JSONModel({
				title: "MR",
				firstName: "",
				lastName: "",
				emailAddress: ""
			}), "new");
		}

	});

});
