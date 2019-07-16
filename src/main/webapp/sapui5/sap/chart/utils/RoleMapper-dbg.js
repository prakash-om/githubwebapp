/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */

sap.ui.define([
	'sap/chart/data/TimeDimension',
	'sap/chart/utils/MeasureSemantics'
], function(
	TimeDimension,
	MeasureSemantics
) {
	"use strict";

	function RoleMapper(sFeedingId) {
		this._sFeedingId = sFeedingId;
	}

	RoleMapper.prototype.toFeedingId = function(oDimOrMsr) {
		return this._sFeedingId;
	};

	function TimeCategory() {
		this._bTimeFed = false;
	}
	RoleMapper.TimeCategory = TimeCategory;
	TimeCategory.prototype = Object.create(RoleMapper.prototype);
	TimeCategory.prototype.toFeedingId = function(oDim) {
		if (oDim instanceof TimeDimension && !this._bTimeFed) {
			this._bTimeFed = true;
			return "timeAxis";
		} else {
			return "@context";
		}
	};

	function trimRight(aArray) {
		while (aArray.length && !aArray[aArray.length - 1]) {
			aArray.pop();
		}
		return aArray;
	}

	RoleMapper.semantics = {
		semanticBulletMsrs: function(oMsrFeeds) {
			var aMsrs = oMsrFeeds["@semanticBulletMsrs"];
			var mMsrs = aMsrs.reduce(function(mMsrs, oMsr) {
				mMsrs[oMsr.getName()] = oMsr;
				return mMsrs;
			}, {});
			var aSemanticTuples = MeasureSemantics.getTuples(aMsrs);

			var oSemFeeds = {
				actualValues: [],
				forecastValues: [],
				targetValues: []
			};

			jQuery.each(aSemanticTuples, function(idx, oTuple) {
				oSemFeeds.actualValues.push(oTuple.actual ? mMsrs[oTuple.actual] : null);
				oSemFeeds.forecastValues.push(oTuple.projected ? mMsrs[oTuple.projected] : null);
				oSemFeeds.targetValues.push(oTuple.reference ? mMsrs[oTuple.reference] : null);
			});

			Object.keys(oSemFeeds).forEach(function(key) {
				oSemFeeds[key] = trimRight(oSemFeeds[key]);
			});

			delete oMsrFeeds["@semanticBulletMsrs"];

			jQuery.extend(oMsrFeeds, oSemFeeds);
		}
	};

	return RoleMapper;
});
