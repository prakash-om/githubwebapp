/*
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define([
    'sap/chart/ChartType',
    'sap/chart/TimeUnitType'
],function(
    ChartType,
    TimeUnitType
) {
    "use strict";

    var ChartTypeAdapterUtils = {};

    var oAdapteredChartTypes = {
        "line": "timeseries_line",
        "column": "timeseries_column",
        "scatter": "timeseries_scatter",
        "bubble": "timeseries_bubble",
        "combination": "timeseries_combination",
        "dual_combination": "dual_timeseries_combination"
    };

    function timeSeriesAdaptHandler(sChartType, aDimensions) {
        var bHasTimeDimension = aDimensions.some(function(oDim) {
            return oDim instanceof sap.chart.data.TimeDimension;
        });
        if (bHasTimeDimension) {
            return oAdapteredChartTypes[sChartType];
        } else {
            return sChartType;
        }
    }

    ChartTypeAdapterUtils.adaptChartType = function(sChartType, aDimensions) {
        if (oAdapteredChartTypes[sChartType]) {
            return timeSeriesAdaptHandler(sChartType, aDimensions);
        } else {
            return sChartType;
        }
    };

    return ChartTypeAdapterUtils;
});
