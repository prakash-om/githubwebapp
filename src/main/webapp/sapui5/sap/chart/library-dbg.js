/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */

/**
 * Initialization Code and shared classes of library sap.chart.
 */
sap.ui.define([
	'jquery.sap.global',
	'sap/viz/ui5/format/ChartFormatter',
	'sap/ui/core/library', // library dependency
	'sap/viz/library',
	'sap/chart/utils/RoleFitter',
	'sap/chart/ChartType'
], function(jQuery, ChartFormatter, corelib, vizlib, RoleFitter, ChartType) {
	"use strict";

	/**
	 * Chart controls based on Vizframe
	 *
	 * @namespace
	 * @name sap.chart
	 * @public
	 */

	// delegate further initialization of this library to the Core
	sap.ui.getCore().initLibrary({
		name: "sap.chart",
		dependencies: ["sap.ui.core", "sap.viz"],
		types: [
			"sap.chart.data.MeasureSemantics"
		],
		interfaces: [],
		controls: [
			"sap.chart.Chart"
		],
		elements: [
			"sap.chart.data.Dimension",
			"sap.chart.data.TimeDimension",
			"sap.chart.data.Measure"
		],
		noLibraryCSS: true,
		version: "1.44.4"
	});


	/**
	 * @class
	 * Enumeration for supported selection mode in analytical chart
	 *
	 * @static
	 * @public
	 * @alias sap.chart.SelectionMode
	 */
	sap.chart.SelectionMode = {
		/**
		 * Multi selection mode, multiple sets of data points can be selected at once.
		 * @public
		 */
		Multi: "MULTIPLE",
		/**
		 * Single selection mode, only one set of data points can be selected at once.
		 * @public
		 */
		Single: "SINGLE",
        /**
         * None selection mode, no data points can be selected.
         * @public
         */
        None : "NONE"
	};

	/**
	 * Package with additional chart APIs
	 * @namespace
	 * @public
	 */
	sap.chart.api = {};

	/**
	 * Returns all chart types currently supported by chart control (subset of viz types).
	 *
	 * @public
	 * @returns {object} a map with chartType as key, localized chart name as value.
	 */
	sap.chart.api.getChartTypes = function() {
		var sPath = jQuery.sap.getModulePath("sap.chart");
		var oBundle = jQuery.sap.resources({
			url: sPath + "/i18n/i18n.properties"
		});

		return Object.keys(sap.chart.ChartType).reduce(function(oMap, sChartTypeKey) {
			var sChartType = sap.chart.ChartType[sChartTypeKey];
			oMap[sChartType] = oBundle.getText("info/" + sChartType);
			return oMap;
		}, {});
	};

	/**
	 * Package with additional chart data APIs
	 * @namespace
	 * @public
	 */
	sap.chart.data = sap.chart.data || {};

	/**
	 * Enum of available semantics value for Measure.
	 * 
	 * @enum {string}
	 * @public
	 */
	sap.chart.data.MeasureSemantics = {
		/**
		 * facts that happened in the past. 
		 * @public
		 */
		Actual: "actual",
		/**
		 * where values will be, e.g.: forecasts, estimations, predictions.
		 * @public
		 */
		Reference: "reference",
		/**
		 * where values should be, e.g.: thresholds, targets.
		 * @public
		 */
		Projected: "projected"
	};

	/**
	 * Get the Dimensions and Measures layout for a certain ChartType with provided Dimensions and Measures.
	 *
	 * @param {string} sChartType chart type
	 * @param {object[]} aDimensions visible Dimensions of the form {name: sName}
	 * @param {object[]} aMeasures visible Measures of the form {name: sName}.
	 *
	 * @public
	 * @returns {object} the chart layout object of the following form:
	 * <pre>
	 * {
	 *   dimensions: [],     // names of dimensions that will be rendered
	 *	 measures:	 [],     // names of measures that will be rendered
	 *	 errors:	 [],     // reasons of why the chart cannot be rendered with the given (chartType, dimensions, measures) combination
	 * }
	 */
	sap.chart.api.getChartTypeLayout = function(sChartType, aDimensions, aMeasures) {
		var aDims, aMsrs;
		if (!sChartType) {
			throw new Error("Invalid chart type: " + String(sChartType));
		}
		if (aDimensions) {
			aDims = aDimensions.map(function(oDimCfg, i) {
				if (oDimCfg && oDimCfg.name) {
					return {
						getName: function() {return oDimCfg.name;},
						getRole: function() {return oDimCfg.role || "category";}
					};
				} else {
					throw new Error("Invalid Dimension at [" + i + "]: " + String(oDimCfg) + ". Dimension should be an object of the format{name:'name'}.");
				}
			});
		} else {
			aDims = [];
		}
		if (aMeasures) {
			aMsrs = aMeasures.map(function(oMsrCfg, i) {
				if (oMsrCfg && oMsrCfg.name) {
					return {
						getName: function() {return oMsrCfg.name;},
						getRole: function() {return oMsrCfg.role || "axis1";}
					};
				} else {
					throw new Error("Invalid Measure at [" + i + "]: " +  String(oMsrCfg) + ". Measure should be an object of the format{name:'name'}.");
				}
			});
		} else {
			aMsrs = [];
		}

		var oCompatibility = RoleFitter.compatible(sChartType, aDims, aMsrs);

		return {
			dimensions: oCompatibility.used.Dimension || [],
			measures: oCompatibility.used.Measure || [],
			errors: Object.keys(oCompatibility.error || {}).reduce(function(aErrs, sCause) {
				return aErrs.concat({cause: sCause, detail: oCompatibility.error[sCause]});
			}, [])
		};
	};

	var FIORI_LABEL_SHORTFORMAT_10 = "__UI5__ShortIntegerMaxFraction10";
	var FIORI_LABEL_FORMAT_2 = "__UI5__FloatMaxFraction2";
	var FIORI_LABEL_SHORTFORMAT_2 = "__UI5__ShortIntegerMaxFraction2";

	var chartFormatter = ChartFormatter.getInstance();
	chartFormatter.registerCustomFormatter(FIORI_LABEL_SHORTFORMAT_10, function(value) {
		var fixedInteger = sap.ui.core.format.NumberFormat.getIntegerInstance({style: "short",
			maxFractionDigits: 10});
		return fixedInteger.format(value);
	});
	chartFormatter.registerCustomFormatter(FIORI_LABEL_FORMAT_2, function(value) {
		var fixedFloat = sap.ui.core.format.NumberFormat.getFloatInstance({style: 'Standard',
			maxFractionDigits: 2});
		return fixedFloat.format(value);
	});
	chartFormatter.registerCustomFormatter(FIORI_LABEL_SHORTFORMAT_2, function(value) {
		var fixedInteger = sap.ui.core.format.NumberFormat.getIntegerInstance({style: "short",
			maxFractionDigits: 2});
		return fixedInteger.format(value);
	});
	this._oChartForamtter = chartFormatter;
		
	if (!(sap.viz.api.env.Format.numericFormatter() instanceof ChartFormatter)) {
		sap.viz.api.env.Format.numericFormatter(chartFormatter);
	}

	return sap.chart;

});
