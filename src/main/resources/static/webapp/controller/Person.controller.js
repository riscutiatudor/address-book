sap.ui.define([
	"ro/riscutiatudor/controller/BaseController",
	"ro/riscutiatudor/service/PersonService",
	"sap/ui/model/json/JSONModel"
], function (BaseController, PersonService, JSONModel) {
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
		onInit: function () {
			// attach handler before pattern matched
			this.getRouter().getRoute("person").attachPatternMatched(
				this._matchPattern, this);			
		},
		
		/* =========================================================== */
		/* event handlers */
		/* =========================================================== */

		/**
		 * Switch to change
		 * @public
		 */
		onChange: function () {
			this._toggleButtonsAndView(true);			
		},

		/**
		 * Save changes and switch back to display
		 * @public
		 */
		onSave: function () {
			this._toggleButtonsAndView(false);			
		},

		/**
		 * Cancel changes and switch back to display
		 * @public
		 */
		onCancel: function () {
			this._toggleButtonsAndView(false);			
		},
		
		/* =========================================================== */
		/* internal methods */
		/* =========================================================== */

		_formFragments: {},
		
		/**
		 * Load person by provided ID (via hash)
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_matchPattern: function (oEvent) {
			this._getById(oEvent.getParameter("arguments").id);

			// Set the initial form to be the display one
			this._showFormFragment("PersonDisplay");
		},

		/**
		 * Get a person with the given ID
		 * @param {string} sPersonId Person ID
		 * @private
		 */
		_getById: function (sPersonId) {
			var oThis = this;
			PersonService.getById(sPersonId, function (oPerson) {
				var oModel = new JSONModel();
				oModel.setData(oPerson);
				oThis.setModel(oModel, "person");
			});
		},

		/**
		 * Switch between change/display modes
		 * @param {boolean} bEdit Edit mode
		 * @private
		 */
		_toggleButtonsAndView : function (bEdit) {
			var oView = this.getView();
 
			// Show the appropriate action buttons
			oView.byId("edit").setVisible(!bEdit);
			oView.byId("save").setVisible(bEdit);
			oView.byId("cancel").setVisible(bEdit);
 
			// Set the right form type
			this._showFormFragment(bEdit ? "PersonChange" : "PersonDisplay");
		},

		/**
		 * Load a fragment from by name (from this namespace) 
		 * @param {string} sFragmentName Fragment name
		 * @private
		 */
		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];
 
			if (oFormFragment) {
				return oFormFragment;
			}
 
			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "ro.riscutiatudor.view.fragment." + sFragmentName);
			return this._formFragments[sFragmentName] = oFormFragment;
		},

		/**
		 * Show fragment in page
		 * @param {string} sFragmentName Fragment name
		 * @private
		 */
		_showFormFragment : function (sFragmentName) {
			var oPage = this.getView().byId("page");
 
			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
		}

	});

});
