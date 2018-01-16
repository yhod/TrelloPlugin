sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller) {
	"use strict";
	
	var key = "9274332328c83c8ed05a4759875b1c49";
	var token = "5bb9afefd648f0e9e752d9da48ff49625934fc859ee0279f897cf64261c5550e";
	var todoList = "55c8e0033b153498bb53172c";
	var doingList = "55c8e03b5afd4959bf3831c4";

	return Controller.extend("trello_app.controller.boards", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf client.trello_app.view.boards
		 */
			onInit: function() {
				var oMessages = new sap.ui.model.json.JSONModel();
				this.getView().setModel(oMessages, "cards");	
			
				this.getList();
				
			// //define value
			// "sap/ui/model/json/JSONModel"				
			
			// //onInit code
			// var oMessages = new JSONModel();
			// this.getView().setModel(oMessages, "cards");
			},
			
			getList: function() {
				var self = this;
				
				$.ajax({
					type: 'GET',
					url: "https://api.trello.com/1/lists/" + todoList + "/cards/?key=" + key + "&token=" + token,
					async: true
				}).done(function(results) {
					console.log(results);
					self.getView().getModel("cards").setProperty("/data", results);
				});
			},
			
			onPress: function(){
				this.getList();
			},
			onItemPress: function(oEvent){
				var card = oEvent.getSource().getBindingContext("cards").getObject();
				var self = this;
				var cardId = card.id;
				
				$.ajax({
					type: 'PUT',
					url: "https://api.trello.com/1/cards/" + cardId + "?idList=" + doingList  + "&key="+key+"&token="+token,
					async: true
				}).done(function(results) {
					sap.m.MessageToast.show("Card moved!");
					self.getList();
				});
				
			}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf client.trello_app.view.boards
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf client.trello_app.view.boards
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf client.trello_app.view.boards
		 */
		//	onExit: function() {
		//
		//	}

	});

});