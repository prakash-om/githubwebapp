/*
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['sap/chart/ChartType'], function(ChartType) {
	"use strict";

	var _CONFIG = {
		chartTypes: [
			ChartType.Bar,
			ChartType.Column,
			ChartType.Line,
			ChartType.Combination,
			ChartType.Pie,
			ChartType.Donut,
			ChartType.Scatter,
			ChartType.Bubble,
			ChartType.Heatmap,
			ChartType.Bullet,
			ChartType.VerticalBullet,
			ChartType.StackedBar,
			ChartType.StackedColumn,
			ChartType.StackedCombination,
			ChartType.HorizontalStackedCombination,
			ChartType.DualBar,
			ChartType.DualColumn,
			ChartType.DualLine,
			ChartType.DualStackedBar,
			ChartType.DualStackedColumn,
			ChartType.DualCombination,
			ChartType.DualHorizontalCombination,
			ChartType.DualStackedCombination,
			ChartType.DualHorizontalStackedCombination,
			ChartType.PercentageStackedBar,
			ChartType.PercentageStackedColumn,
			ChartType.PercentageDualStackedBar,
			ChartType.PercentageDualStackedColumn,
			ChartType.Waterfall,
			ChartType.HorizontalWaterfall
		],
		pagingChartTypes: [
		    ChartType.Bar,
			ChartType.Column,
			ChartType.Line,
			ChartType.Combination,
			ChartType.Bullet,
			ChartType.VerticalBullet,
			ChartType.StackedBar,
			ChartType.StackedColumn,
			ChartType.StackedCombination,
			ChartType.HorizontalStackedCombination,
			ChartType.DualBar,
			ChartType.DualColumn,
			ChartType.DualLine,
			ChartType.DualStackedBar,
			ChartType.DualStackedColumn,
			ChartType.DualCombination,
			ChartType.DualHorizontalCombination,
			ChartType.DualStackedCombination,
			ChartType.DualHorizontalStackedCombination,
			ChartType.PercentageStackedBar,
			ChartType.PercentageStackedColumn,
			ChartType.PercentageDualStackedBar,
			ChartType.PercentageDualStackedColumn
		],
		timeChartTypes: [
			"timeseries_line",
			"timeseries_column",
			"timeseries_bubble",
			"timeseries_scatter",
			"timeseries_combination",
			"dual_timeseries_combination"
		]
	};
	return {
		CONFIG: _CONFIG,
		makeNotifyParentProperty: function(sPropertyName) {
			return function(oValue, bSuppressInvalidate) {
				var oOldValue = this.mProperties[sPropertyName];

				oValue = this.validateProperty(sPropertyName, oValue);

				if (jQuery.sap.equal(oOldValue, oValue)) {
					return this;
				}

				this.setProperty(sPropertyName, oValue, bSuppressInvalidate);

				if (bSuppressInvalidate) {
					return this;
				}

				var oParent = this.getParent();
				if (oParent && typeof oParent._invalidateBy === "function") {
					oParent._invalidateBy({
						source: this,
						property: sPropertyName,
						oldValue: oOldValue,
						newValue: oValue
					});
				}

				return this;
			};
		},
		hostVizPropertySetter: function(sProp, sVizProp, oConfig) {
			var validateFn = oConfig.validate,
				convertFn = oConfig.convert;

			return function(oValue) {
				oValue = this.validateProperty(sProp, oValue);
				if (typeof convertFn === "function") {
					oValue = convertFn(oValue);
				}
				if (!validateFn || validateFn.call(this, oValue)) {
					this.setProperty(sProp, oValue);
					var oVizFrame = this._getVizFrame();
					if (oVizFrame) {
						var args = {};
						args[sVizProp] = oValue;
						oVizFrame.setVizProperties(args);
					}
				}
				return this;
			};
		},
		hostVizPropertyGetter: function(sProp, sVizProp) {
			return function() {
				var oVizFrame = this._getVizFrame();
				if (!oVizFrame) {
					return this.getProperty(sProp);
				} else {
					return sVizProp.split(".").reduce(function(val, path) {
						return val.hasOwnProperty(path) ? val[path] : undefined;
					}, oVizFrame.getVizProperties());
				}
			};
		}
	};
});
