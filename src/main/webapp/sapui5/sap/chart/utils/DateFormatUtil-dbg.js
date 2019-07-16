/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
/*
 * Parse and Format Date String depending on sap.ui.core.format.DateFormat
 */
sap.ui.define([
	'sap/chart/TimeUnitType',
	'sap/ui/core/format/DateFormat'
], function(
	TimeUnitType,
	DateFormat
) {
	"use strict";

	function getInstance(sTimeUnitType) {
		var sPattern;
		switch (sTimeUnitType) {
			case TimeUnitType.yearmonthday:
			    sPattern = "yyyyMMdd";
			    break;
			default:
			    return null;
		}
		return DateFormat.getDateInstance({pattern: sPattern});
	}

	return {
		getInstance: getInstance
	};
});