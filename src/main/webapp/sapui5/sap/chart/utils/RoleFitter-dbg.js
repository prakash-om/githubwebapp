/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */

sap.ui.define([
	'sap/viz/ui5/data/DimensionDefinition',
	'sap/viz/ui5/data/MeasureDefinition',
	'sap/viz/ui5/controls/common/feeds/FeedItem',
	'sap/viz/ui5/controls/common/feeds/AnalysisObject',
    'sap/chart/TimeUnitType',
    'sap/chart/utils/DateFormatUtil',
    'sap/chart/utils/ChartUtils',
    'sap/chart/utils/RoleMapper'
], function(
	DimensionDefinition,
	MeasureDefinition,
	FeedItem,
	AnalysisObject,
	TimeUnitType,
	DateFormatUtil,
	ChartUtils,
	RoleMapper
) {
	"use strict";

	var suggestFeeds = function() {
		return sap.viz.vizservices.BVRService.suggestFeeds.apply(null, arguments);
	};
	var validateFeeds = function(chartType, feedItems) {
		var oResults = sap.viz.vizservices.FeedService.validate(chartType, feedItems);
		if (!oResults.valid) {
			var bindings = oResults.results ? oResults.results.bindings : null;
			if (bindings && Object.keys(bindings).every(function(item) {
					return bindings[item].allowMND && (!bindings[item].missing || bindings[item].missing === 1) && !bindings[item].incorrect;
				})) {
				// previously we suggest mnd to check feeding, but BVR will remove invalid feeding items in some case
				// currently for case whose feeding only miss mnd, we let it pass directly
				return {
					valid: true
				};
			}
		}
		return oResults;
	};

	var _mRoleFeedMapping = [
		{"types":"*","toViz":{"category|category2":"categoryAxis","series":"color","axis1|axis2|axis3|axis4":"valueAxis"}},
		{"types":"column|bar|stacked_bar|stacked_column|line|combination|100_stacked_bar|100_stacked_column|stacked_combination|horizontal_stacked_combination","toViz":{}},
		{"types":"scatter|bubble|time_bubble|timeseries_scatter|timeseries_bubble","toViz":{"series":"series","category|category2":"@context","axis1":"valueAxis","axis2":"valueAxis2"}},
		{"types":"bubble|time_bubble","toViz":{"axis3":"bubbleWidth"}},
		{"types":"pie|donut","toViz":{"category|series|category2":"color","axis1|axis2|axis3|axis4":"size"}},
		{"types":"bullet|vertical_bullet","toViz":{"axis1|axis2|axis3|axis4": "@semanticBulletMsrs"}},
		{"types":"dual_combination|dual_horizontal_combination|dual_stacked_bar|100_dual_stacked_bar|dual_stacked_column|100_dual_stacked_column|dual_bar|dual_column|dual_line|dual_stacked_combination|dual_horizontal_stacked_combination","toViz":{"axis1":"valueAxis","axis2|axis3|axis4":"valueAxis2"}},
		{"types":"timeseries_line","toViz":{"category":"timeAxis", "axis1|axis2|axis3":"valueAxis"}},
		{"types":"timeseries_scatter","toViz":{"category":RoleMapper.TimeCategory,"axis2|axis3":false}},
		{"types":"timeseries_bubble","toViz":{"category":RoleMapper.TimeCategory,"axis2":false,"axis3":"bubbleWidth"}},
		{"types":"timeseries_column","toViz":{"category":"timeAxis", "series":"timeAxis", "axis1|axis2|axis3|axis4":"valueAxis"}},
		{"types":"timeseries_combination","toViz":{"category":"timeAxis", "axis1|axis2|axis3|axis4":"valueAxis"}},
		{"types":"dual_timeseries_combination","toViz":{"category":"timeAxis", "axis1":"valueAxis", "axis2|axis3|axis4":"valueAxis2"}},
		{"types":"heatmap","toViz":{"category":"categoryAxis","category2|series":"categoryAxis2","axis1|axis2|axis3|axis4":"color"}},
		{"types":"waterfall","toViz":{"series":"waterfallType", "axis1|axis2|axis3|axis4":"valueAxis"}},
		{"types":"horizontal_waterfall","toViz":{"series":"waterfallType", "axis1|axis2|axis3|axis4":"valueAxis"}}
	].reduce(function(m, row) {
		var cfg = Object.keys(row.toViz).reduce(function(cfg, roles) {
			roles.split("|").forEach(function(r) {
				cfg[r] = row.toViz[roles];
				return cfg;
			});
			return cfg;
		}, {});
		row.types.split("|").forEach(function(type) {
			if (!m.hasOwnProperty(type)) {
				m[type] = [];
			}
			m[type].push(cfg);
		});
		return m;
	}, {});

	var _mRoleLookUp = Object.keys(_mRoleFeedMapping).reduce(function(m, type) {
		if (type !== "*") {
			m[type] = jQuery.extend.apply(null, [true, {}].concat(_mRoleFeedMapping["*"].concat(_mRoleFeedMapping[type])));
		}
		return m;
	}, {});

	function _groupBy(aList, oKey, fnVal) {
		var keyFn = (typeof oKey === "function") ? oKey : function(obj) {
			return obj[oKey];
		};
		return aList.reduce(function(oGrouped, oElement) {
			var key = keyFn(oElement),
				val = (typeof fnVal === "function") ? fnVal(oElement) : oElement;
			if (key && !oGrouped[key]) {
				oGrouped[key] = [val];
			} else if (key) {
				oGrouped[key].push(val);
			}
			return oGrouped;
		}, {});
	}

	function _sorter(aList, keyFn) {
		return aList.reduce(function(map, elem, idx) {
			map[keyFn(elem)] = idx;
			return map;
		}, {});
	}

	function _calibrate(mDef, aDimsOrMsrs) {
		var mMapper = Object.keys(mDef).reduce(function(mMapper, role) {
			if (typeof mDef[role] === "function") {
				mMapper[role] = new mDef[role]();
			} else {
				mMapper[role] = new RoleMapper(mDef[role]);
			}
			return mMapper;
		}, {});
		return _groupBy(aDimsOrMsrs, function(oDorM) {
			return mMapper[oDorM.getRole()].toFeedingId(oDorM, aDimsOrMsrs);
		});
	}

	var LwFeed = {
		from: FeedItem.fromLightWeightFmt,
		build: function(oObject) {
			var aLwFeeds = [];
			jQuery.each(oObject.dims, function(k, v) {
				aLwFeeds.push({
					id: k,
					type: "Dimension",
					values: v.map(analysisObjectFmt("Dimension"))
				});
			});
			jQuery.each(oObject.msrs, function(k, v) {
				aLwFeeds.push({
					id: k,
					type: "Measure",
					values: v.map(analysisObjectFmt("Measure"))
				});
			});
			return aLwFeeds;
		}
	};

	function analysisObjectFmt(sType) {
		return function(oDorM) {
			var sId = oDorM.getName();
			if (sId === "MND") {
				// feeding MND is special, its type is not Dimension
				return {
					id: "MND",
					type: "MND"
				};
			}
			var analysisObj = {
				id: sId,
				name: sId,
				type: sType
			};

			if (oDorM instanceof sap.chart.data.TimeDimension) {
				analysisObj.dataType = "Date";
			}

			return analysisObj;
		};
	}

	function wrapDimension(oDimension, sChartType) {
		var sName = oDimension.getName(),
			sLabel = oDimension.getLabel(),
			sText = oDimension.getTextProperty(),
			fFormatter = oDimension.getTextFormatter(),
			bDisplyaText = oDimension.getDisplayText();
		var oDimConfig = {
			identity: sName,
			name: sLabel || sName,
			value: "{" + sName + "}"
		};

		if (typeof fFormatter === "function") {
			oDimConfig.displayValue = {
				formatter: fFormatter,
				parts: [{
					path: sName,
					type: new sap.ui.model.type.String()
				}]
			};
			if (sText) {
				oDimConfig.displayValue.parts.push({
					path: sText,
					type: new sap.ui.model.type.String()
				});
			}
		} else if (bDisplyaText && sText) {
			oDimConfig.displayValue = "{" + sText + "}";
		}

		var oDimensionDefinition = new DimensionDefinition(oDimConfig);
		if (ChartUtils.CONFIG.timeChartTypes.indexOf(sChartType) > -1 && oDimension instanceof sap.chart.data.TimeDimension) {
			var oDateInstance = DateFormatUtil.getInstance(oDimension.getTimeUnit());
			var fnParser = oDateInstance ? oDateInstance.parse.bind(oDateInstance) : undefined;
			oDimensionDefinition.getBindingInfo("value").formatter = fnParser;
			oDimensionDefinition.setDataType("Date");
		}
		return oDimensionDefinition;
	}

	function wrapMeasure(oMeasure) {
		var sName = oMeasure.getName();

		var oMsrDef = new MeasureDefinition({
			identity: sName,
			name: oMeasure.getLabel() || sName,
			value: "{" + sName + "}"
		});
		oMsrDef.setUnit(oMeasure.getUnitBinding());
		return oMsrDef;
	}

	function dimOrder(sChartType, aFeeds) {
		var oMetadata = sap.viz.api.metadata.Viz.get("info/" + sChartType),
			mBindings = _groupBy(oMetadata.bindings, "role"),
			mFeeds = _groupBy(aFeeds, "id"),
			aCatFeeds = mBindings["layout.category"] || [],
			aSerFeeds = mBindings["mark.color"] || [];

		if (aCatFeeds.length === 0) {
			return [];
		} else {
			var aOrder = [];

			jQuery.each(aCatFeeds.concat(aSerFeeds), function(id, oBnd) {
				var oFeed = mFeeds[oBnd.id];
				if (oFeed && oFeed.length > 0) {
					jQuery.each(oFeed[0].values, function(iid, oVal) {
						aOrder.push(oVal.id);
					});
				}
			});

			return aOrder;
		}
	}

	function fitBasic(sChartType, aDimensions, aMeasures, sSeriesFeedingId) {
		var mRoleToFeed = _mRoleLookUp[sChartType];
		var oMapped = {
			dims: _calibrate(mRoleToFeed, aDimensions),
			msrs: _calibrate(mRoleToFeed, aMeasures)
		};
		var aContexts = null;

		if (oMapped.dims.series) {
			oMapped.dims[sSeriesFeedingId] = oMapped.dims.series;
			delete oMapped.dims.series;
		}

		if (oMapped.dims["@context"]) {
			aContexts = oMapped.dims["@context"];
			delete oMapped.dims["@context"];
		}

		if (oMapped.msrs["@semanticBulletMsrs"]) {
			RoleMapper.semantics.semanticBulletMsrs(oMapped.msrs);
		}

		var aFeeds = LwFeed.build(oMapped);
		aFeeds.contexts = aContexts;

		return aFeeds;
	}

	var INRESULT_SUPPORT = [{
		chartTypes: "bar,column,line,combination,heatmap,bullet,vertical_bullet,stacked_bar,stacked_column,stacked_combination,horizontal_stacked_combination,dual_bar,dual_column,dual_line,dual_stacked_bar,dual_stacked_column,dual_combination,dual_horizontal_combination,dual_stacked_combination,dual_horizontal_stacked_combination,100_stacked_bar,100_stacked_column,100_dual_stacked_bar,100_dual_stacked_column,waterfall,horizontal_waterfall".split(","),
		feed: "categoryAxis"
	}, {
		chartTypes: "donut,pie,scatter,bubble".split(","),
		feed: "color"
	}];
	function appendInResults(sChartType, aFeeds, aInResults) {
		var i, sFeedId;
		for (i = 0; i < INRESULT_SUPPORT.length; i++) {
			if (INRESULT_SUPPORT[i].chartTypes.indexOf(sChartType) !== -1) {
				sFeedId = INRESULT_SUPPORT[i].feed;
				break;
			}
		}

		var bHasAppendableFeed = aFeeds.some(function(oFeed) {
			return oFeed.id === sFeedId;
		});
		// no visible dimension, reconstruct feedItems with MND
		if (!bHasAppendableFeed) {
			var aFeedsWithMND = suggestFeeds("info/" + sChartType, aFeeds, [{id:"MND",type:"MND"}]).feedItems;
			aFeeds.splice(0, aFeeds.length);
			aFeedsWithMND.forEach(function(oFeed) {
				if (oFeed.values.length > 0) {
					aFeeds.push(oFeed);
				}
			});
			aFeeds = enforceFeedType(sChartType, aFeeds);
		}
		for (i = 0; i < aFeeds.length; i++) {
			if (aFeeds[i].id === sFeedId && aFeeds[i].type === "Dimension") {
				aFeeds[i].values = aFeeds[i].values.concat(aInResults.map(function(oDim) {
					return {id: oDim.getName(), name: oDim.getName(), type: "Dimension"};
				}));
			}
		}

		return validateFeeds("info/" + sChartType, aFeeds);
	}

	function fit(sChartType, aDimensions, aMeasures, aInResults, sSeriesFeedingId) {
		var aFeeds = fitBasic(sChartType, aDimensions, aMeasures, sSeriesFeedingId);
		var aContexts = aFeeds.contexts;
		var oValidation = validateFeeds("info/" + sChartType, aFeeds);

		if (!oValidation.valid) {
			aFeeds = fix(sChartType, oValidation, aFeeds, aDimensions, aMeasures);
			oValidation = validateFeeds("info/" + sChartType, aFeeds);
		}

		if (oValidation.valid && aInResults && aInResults.length > 0) {
			var mVisDims = _groupBy(aDimensions, function(o) {return o.getName();});
			appendInResults(sChartType, aFeeds, aInResults.filter(function(oDim) {
                return !mVisDims[oDim.getName()];
            }));
		}

		var	mVisibles = aFeeds.reduce(function(map, f) {
			f.values.forEach(function(v) {
				map[v.id] = true;
			});
			return map;
		}, {});

		var aFeedItems = LwFeed.from(aFeeds);

		if (aContexts) {
			aContexts.forEach(function(ctx) {
				mVisibles[ctx.getName()] = true;
			});
			aFeedItems._context = aContexts.map(function(dim) {
				return dim.getName();
			});
		}

		aFeedItems._unused = unUsedDimsOrMsrs(aFeeds, aDimensions, aMeasures).filter(function(name) {
			return !mVisibles[name];
		});
		aFeedItems._def = createDefinitions(aDimensions, oValidation.valid ? aInResults : [], aMeasures, mVisibles, sChartType);
		aFeedItems._order = dimOrder(sChartType, aFeeds);
		aFeedItems._valid = oValidation.valid;

		return aFeedItems;
	}

	function getBindingMap(sChartType) {
		return _groupBy(sap.viz.api.metadata.Viz.get("info/" + sChartType).bindings, "id");
	}

	function enforceFeedType(sChartType, aFeeds, mBindings) {
		mBindings = mBindings || getBindingMap(sChartType);
		aFeeds.forEach(function(oFeed) {
			oFeed.type = mBindings[oFeed.id][0].type;
		});
		return aFeeds;
	}

	function fix(sChartType, oValidation, aEffectiveFeeds, aDimensions, aMeasures) {
		var mBindings = getBindingMap(sChartType),
			bDimError = false,
			bMsrError = false;
		var mValidationBindings = oValidation.results.bindings;
		Object.keys(mValidationBindings).forEach(function(k) {
			if (!mBindings[k]) {
				return;
			}
			if (mBindings[k][0].type === "Measure") {
				bMsrError = true;
			}
			if (mBindings[k][0].type === "Dimension" && !(mValidationBindings[k].allowMND &&
					(!mValidationBindings[k].missing || mValidationBindings[k].missing === 1))) {
				bDimError = true;
			}
		});
		var aGoodFeeds = aEffectiveFeeds.filter(function(feed) {
			return !((feed.type === "Dimension") ? bDimError : bMsrError);
		}), mGoodDimOrMsr = aGoodFeeds.reduce(function(map, feed) {
			(feed.values || []).forEach(function(v) {
				map[v.id] = true;
			});
			return map;
		}, {});
		if (aEffectiveFeeds.contexts) {
			aEffectiveFeeds.contexts.forEach(function(ctx) {
				mGoodDimOrMsr[ctx.getName()] = true;
			});
		}
		var aDimAnalysisObjs = aDimensions.map(analysisObjectFmt("Dimension")),
			aMsrAnalysisObjs = aMeasures.map(analysisObjectFmt("Measure")),
			mDimSorting = _sorter(aDimensions, function(o) {
				return o.getName();
			}),
			mMsrSorting = _sorter(aMeasures, function(o) {
				return o.getName();
			});
		aDimAnalysisObjs.sort(function(a, b) {return mDimSorting[a.id] - mDimSorting[b.id];});
		aMsrAnalysisObjs.sort(function(a, b) {return mMsrSorting[a.id] - mMsrSorting[b.id];});
		var aSuggested = suggestFeeds("info/" + sChartType, aGoodFeeds, aDimAnalysisObjs.concat(aMsrAnalysisObjs).filter(function(ao) {
			return !mGoodDimOrMsr[ao.id];
		})).feedItems;

		enforceFeedType(sChartType, aSuggested, mBindings);

		return aSuggested;
	}

	function unUsedDimsOrMsrs(aFeeds, aDimensions, aMeasures) {
		var	mUsed = aFeeds.reduce(function(map, f) {
			f.values.forEach(function(v) {
				map[v.id] = true;
			});
			return map;
		}, {});

		return aDimensions.concat(aMeasures).filter(function(n) {
			return !mUsed[n.getName()];
		}).map(function(n) {
			return n.getName();
		});
	}

	function createDefinitions(aDimensions, aInResults, aMeasures, mVisibles, sChartType) {
		return {
			dim: aDimensions.reduce(function(aVisibleDimDefs, oDim) {
				if (mVisibles[oDim.getName()]) {
					aVisibleDimDefs.push(wrapDimension(oDim, sChartType));
				}
				return aVisibleDimDefs;
			}, []).concat(aInResults.map(function(oDim) {
				var oDimDef = wrapDimension(oDim);
				oDimDef.setInResult(true);
				return oDimDef;
			})),
			msr: aMeasures.reduce(function(aVisibleMsrDefs, oMsr) {
				if (mVisibles[oMsr.getName()]) {
					aVisibleMsrDefs.push(wrapMeasure(oMsr));
				}
				return aVisibleMsrDefs;
			}, [])
		};
	}

	return {
		fit: fit,
		compatible: function(sChartType, aDimensions, aMeasures) {
			var sInternalChartType = "info/" + sChartType,
				compatibility = {
					used: {},
					error: null,
					compatible: true
				};
			var aFeeds = fitBasic(sChartType, aDimensions, aMeasures, "color"),
				oValidation = validateFeeds(sInternalChartType, aFeeds);

			if (!oValidation.valid) {
				aFeeds = fix(sChartType, oValidation, aFeeds, aDimensions, aMeasures);
				oValidation = validateFeeds(sInternalChartType, aFeeds);
				compatibility.needFix = true;
			}
			if (oValidation.valid) {
				compatibility.used = _groupBy(aFeeds, function(oFeed) {
					return oFeed.type;
				}, function(oFeed) {
					return oFeed.values.filter(function(oVal) {
						return oVal.type === "Dimension" || oVal.type === "Measure";
					}).map(function(oVal) {
						return oVal.id;
					});
				});
				jQuery.each(compatibility.used, function(k, v) {
					compatibility.used[k] = v.reduce(function(aAll, aNames) {
						return aAll.concat(aNames);
					}, []);
				});
			} else {
				compatibility.compatible = false;
				var aChartFeedings = sap.viz.api.metadata.Viz.get(sInternalChartType).bindings,
					mFeedingByType = _groupBy(aChartFeedings, "type", function(o) {return o.id;}),
					mMissingByType = {dim: 0, msr: 0, time: 0};

				jQuery.each(oValidation.results.bindings, function(k, v) {
					if (!v.missing) { // only support missing error currently
						return;
					}
					if (mFeedingByType.Dimension.indexOf(k) !== -1 && !(v.allowMND && v.missing === 1)) {
						// for invalid feeding, since we do not suggest mnd during validation, so remove mnd error here
						mMissingByType[k === "timeAxis" ? "time" : "dim"] += v.missing;
					} else if (mFeedingByType.Measure.indexOf(k) !== -1) {
						mMissingByType.msr += v.missing;
					}
				});
				compatibility.error = {
					missing: mMissingByType
				};

			}

			return compatibility;
		}
	};
});
