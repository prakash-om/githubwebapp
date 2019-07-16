/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
/*
 * Keep track of series colors on different *pages*.
 */
sap.ui.define([], function() {
	"use strict";

	var _COLOR_FEEDS = {
			color: true,
			color2: true
	};
	
	function SeriesColorTracker() {
		this._mSeriesColor = {};
	}
	
	/**
	 * Convert CVOM data context into a string key
	 * @param {any} oCtx a single aCtx CVOM data context, which is an array of string/null/undefined/number/object
	 * @returns {string} string representation of the data context
	 */
	function seriesKey(oCtx) {
		var sType = jQuery.type(oCtx);
		switch (sType) {
		case "string":
			return '"' + oCtx + '"';
		case "null":
		case "undefined":
			return sType;
		case "array":
			return "[" + oCtx.map(seriesKey).join(",") + "]";
		case "object":
			return "{" + Object.keys(oCtx).map(function(sProp) {
				return '"' + sProp + '":' + seriesKey(oCtx[sProp]);
			}).join(",") + "}";
		case "number":
		case "boolean":
			return String(oCtx);
		default:
			return sType + "<" + String(oCtx) + ">";			
		}
	}
	
	/**
	 * Add CVOM runtime scales to record if not tracked already
	 * @param {object[]} aRuntimeScales CVOM runtime scales
	 */
	SeriesColorTracker.prototype.add = function(aRuntimeScales) {
		var mAllSeriesColor = this._mSeriesColor,
			mSeriesColor;
		aRuntimeScales.forEach(function(oRTScale) {
			var sFeed = oRTScale.feed;
			if (!_COLOR_FEEDS[sFeed]) {
				return;
			}
			
			mSeriesColor = mAllSeriesColor[sFeed];
			if (!mSeriesColor) {
				mSeriesColor = {};
				mAllSeriesColor[sFeed] = mSeriesColor;
			}
			
			oRTScale.results.forEach(function(oResult) {
				var sKey = seriesKey(oResult.dataContext);
				if (!mSeriesColor[sKey]) {
					mSeriesColor[sKey] = oResult;
				}
			});
		});
	};
	
	/**
	 * Return currently tracked series colors in CVOM runtime scales format
	 * @returns {object} series colors
	 */
	SeriesColorTracker.prototype.get = function() {
		var aFeeds = Object.keys(this._mSeriesColor);
		var mSeriesColor = this._mSeriesColor;
		return aFeeds.map(function(sFeedId) {
			var aKeys = Object.keys(mSeriesColor[sFeedId]);			
			return aKeys.length === 0 ? null : {
				results: aKeys.map(function(sKey) {
					return mSeriesColor[sFeedId][sKey];
				}),
				feed: sFeedId
			};	
		});		
	};
	
	SeriesColorTracker.prototype.clear = function() {
		this._mSeriesColor = {};
	};
	
	return SeriesColorTracker;
});