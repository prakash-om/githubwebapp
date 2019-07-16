/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */

sap.ui.define([], function() {
	"use strict";

	function rel(oMsr) {
		var oRel = oMsr.getSemanticallyRelatedMeasures();
		var oResult = {};

		if (oRel) {
			if (oRel.projectedValueMeasure) {
				oResult.projected = oRel.projectedValueMeasure;
			}
			if (oRel.referenceValueMeasure) {
				oResult.reference = oRel.referenceValueMeasure;
			}
			return oResult;
		}

		return oResult;
	}

	function calc(aMsrs) {
		var mComputed = aMsrs.reduce(function(mComputed, oMsr) {
			mComputed[oMsr.getName()] = {
				msr: oMsr,
				sem: oMsr.getSemantics() || "actual",
				rel: rel(oMsr)
			};
			return mComputed;
		}, {});

		// remove mis matched (semantics, relation semantics) from each semantic relation
		jQuery.each(mComputed, function(sMsr, oCfg) {
			if (oCfg.sem === "actual") {
				jQuery.each(oCfg.rel, function(sSem, sTargetMsr) {
					if (mComputed[sTargetMsr].sem !== sSem) {
						delete oCfg.rel[sSem];
					}
				});
			}
		});

		return mComputed;
	}

	function makeTuples(aMsrs, mSems) {
		var aTuples = [];

		jQuery.each(aMsrs.slice().sort(function(a, b) {
			var semA = mSems[a.getName()].sem,
				semB = mSems[b.getName()].sem;
			if (semA < semB) {
				return -1;
			} else if (semA > semB) {
				return 1;
			} else {
				return aMsrs.indexOf(a) - aMsrs.indexOf(b);
			}
		}), function(idx, oMsr) {
			var sName = oMsr.getName();
			if (!mSems[sName]) {
				return;
			}

			var oSemCfg = mSems[sName];
			var oTuple = {};

			oTuple[oSemCfg.sem] = sName;

			if (oSemCfg.sem === "actual") {
				if (oSemCfg.rel.projected && mSems[oSemCfg.rel.projected]) {
					oTuple.projected = oSemCfg.rel.projected;
					delete mSems[oSemCfg.rel.projected];
				}
				if (oSemCfg.rel.reference && mSems[oSemCfg.rel.reference]) {
					oTuple.reference = oSemCfg.rel.reference;
					delete mSems[oSemCfg.rel.reference];
				}
				delete mSems[sName];
			}

			aTuples.push(oTuple);

		});

		return aTuples;
	}

	return {
		getTuples: function(aMsrs) {
			return makeTuples(aMsrs, calc(aMsrs));
		}
	};
});
