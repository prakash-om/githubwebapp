/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/base/ManagedObject'], function(ManagedObject) {
	"use strict";

	/**
	 * Basic implementation for the command stack pattern.
	 * 
	 * @class
	 * @extends sap.ui.base.ManagedObject
	 * @author SAP SE
	 * @version 1.44.4
	 * @constructor
	 * @private
	 * @since 1.34
	 * @alias sap.ui.rta.command.Stack
	 * @experimental Since 1.34. This class is experimental and provides only limited functionality. Also the API might be
	 *               changed in future.
	 */
	var Stack = ManagedObject.extend("sap.ui.rta.command.Stack", {
		metadata : {
			library : "sap.ui.rta",
			properties : {},
			aggregations : {
				commands : {
					type : "sap.ui.rta.command.BaseCommand",
					multiple : true
				}
			},
			events : {
				modified : {}
			}
		}
	});

	Stack.prototype._toBeExecuted = -1;

	Stack.prototype._getCommandToBeExecuted = function() {
		return this.getCommands()[this._toBeExecuted];
	};

	/**
	 * Allows to push a command on the stack that has already been executed and shouldn't be executed next
	 */
	Stack.prototype.pushExecutedCommand = function(oCommand) {
		this.push(oCommand, true);
	};

	Stack.prototype.push = function(oCommand, bExecuted) {
		// undone commands have to be removed as a new command is added
		if (this._bUndoneCommands) {
			this._bUndoneCommands = false; // distinguish undone commands from not yet executed commands
			while (this._toBeExecuted > -1) {
				this.pop();
			}
		}
		this.insertCommand(oCommand, 0);
		if (!bExecuted) {
			this._toBeExecuted++;
		}
		this.fireModified();
	};

	Stack.prototype.top = function() {
		return this.getCommands()[0];
	};

	Stack.prototype.pop = function() {
		if (this._toBeExecuted > -1) {
			this._toBeExecuted--;
		}
		return this.removeCommand(0);
	};

	Stack.prototype.removeCommand = function(vObject, bSuppressInvalidate) {
		var oRemovedCommand = this.removeAggregation("commands", vObject, bSuppressInvalidate);
		this.fireModified();
		return oRemovedCommand;
	};

	Stack.prototype.removeAllCommands = function(bSuppressInvalidate) {
		var aCommands = this.removeAllAggregation("commands", bSuppressInvalidate);
		this._toBeExecuted = -1;
		this.fireModified();
		return aCommands;
	};

	Stack.prototype.isEmpty = function() {
		return this.getCommands().length === 0;
	};

	Stack.prototype.execute = function() {
		var oCommand = this._getCommandToBeExecuted();
		if (oCommand) {
			try {
				oCommand.execute();
			} catch (oError) {
				this.pop(); // remove failing command
				throw (oError);
			}
			this._toBeExecuted--;
			this.fireModified();
		}
	};

	Stack.prototype._unExecute = function() {
		if (this.canUndo()) {
			this._bUndoneCommands = true;
			this._toBeExecuted++;
			var oCommand = this._getCommandToBeExecuted();
			if (oCommand) {
				oCommand.undo();

				this.fireModified();
			}
		}
	};

	Stack.prototype.canUndo = function() {
		return (this._toBeExecuted + 1) < this.getCommands().length;
	};

	Stack.prototype.undo = function() {
		this._unExecute();
	};

	Stack.prototype.canRedo = function() {
		return !!this._getCommandToBeExecuted();
	};

	Stack.prototype.redo = function() {
		this.execute();
	};

	Stack.prototype.pushAndExecute = function(oCommand) {
		this.push(oCommand);
		this.execute();
	};

	Stack.prototype.serialize = function() {
		var aResult = [];
		var aCommands = this.getSerializableCommands();
		aCommands.forEach(function(oCommand) {
			var vSerialize = oCommand.serialize();
			if (Array.isArray(vSerialize)) {
				aResult.concat(vSerialize);
			} else {
				aResult.push(vSerialize);
			}
		});
		return aResult;
	};

	Stack.prototype.getSerializableCommands = function() {
		var aSerializableCommands = [];
		var aCommands = this.getCommands();
		for (var i = aCommands.length - 1; i > this._toBeExecuted; i--) {
			var aSubCommands = this._getSubCommands(aCommands[i]);
			aSerializableCommands = aSerializableCommands.concat(aSubCommands);
		}
		return aSerializableCommands;
	};

	Stack.prototype._getSubCommands = function(oCommand) {
		var that = this;
		var aCommands = [];
		if (oCommand.getCommands) {
			oCommand.getCommands().forEach(function(oSubCommand) {
				var aSubCommands = that._getSubCommands(oSubCommand);
				aCommands = aCommands.concat(aSubCommands);
			});
		} else {
			aCommands.push(oCommand);
		}
		return aCommands;
	};

	return Stack;

}, /* bExport= */true);
