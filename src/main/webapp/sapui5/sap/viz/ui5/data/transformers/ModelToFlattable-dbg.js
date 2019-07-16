/*
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(function() {
	"use strict";

	var ModelToFlattable = function() {
		this.reset();
	};

	ModelToFlattable.prototype.reset = function(oOther) {
		this._oVIZFlatTable = null;
		this._aFlatContextLookup = null;
	};
    
    var ostring = Object.prototype.toString;
   
    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }


	ModelToFlattable.prototype.getVizDataset = function(oBinding, dimensions, measures, defaultSelectionInfo, info, dataBindingInfo, oPagingOption, contexts) {
	    if (!this._oVIZFlatTable && sap.viz.__svg_support) {
	        this._createVIZFlatTable(oBinding, dimensions, measures, dataBindingInfo, oPagingOption, contexts);
	    }
	    return this._oVIZFlatTable || null;
	};

	ModelToFlattable.prototype.findContext = function(oCriteria) {
		if (this._aFlatContextLookup && typeof oCriteria === 'object' && oCriteria._context_row_number !== undefined) {
			return this._aFlatContextLookup[oCriteria._context_row_number];
		}
	};

	ModelToFlattable.prototype._createVIZFlatTable = function(oBinding, dimensions, measures, dataBindingInfo, oPagingOption, contexts) {
	    var index = (!dataBindingInfo || dataBindingInfo.startIndex === undefined) ? 0 : dataBindingInfo.startIndex;
	    var len;
	    if (!dataBindingInfo || dataBindingInfo.length === undefined) {
            if (oBinding) {
                len = oBinding.getLength();
            }
	    } else {
            len = dataBindingInfo.length;
	    }

        //By default, we will show all context dimension in tooltip
        var context = ['_context_row_number'];
        if (contexts) {
            if (!isArray(contexts)) {
                contexts = [contexts];
            }
            for (var i = 0; i < contexts.length; ++i) {
                var name = contexts[i];
                var bShowInTooltip =  !(name.showInTooltip === false);
                if (name.id) {
                    name = name.id;
                }
                context.push({id : name, showInTooltip : bShowInTooltip});
                
            }
        }
        var aAxis = [], aMeasures = [], flatTableDS = {
            'metadata' : {
                'fields' : []
            },
            'context' : context,
            'data' : []
        }, aContextLookup = [];

	    jQuery.each(dimensions, function(i, oColumn) {
	        aAxis.push({
	            def : oColumn,
	            vAdapter : oColumn._getAdapter(),
	            dAdapter : oColumn._getDisplayValueAdapter()
	        });
	        var dataType = oColumn.getDataType();
	        flatTableDS.metadata.fields.push({
	            'id' : oColumn.getIdentity() || oColumn.getName(),
	            'name' : oColumn.getName() || oColumn.getIdentity(),
	            'semanticType' : 'Dimension',
	            'dataType': dataType,
	            'inResult': oColumn.getInResult()
	        });
	    });

		jQuery.each(measures, function(i, oColumn) {
			aMeasures.push({
				def : oColumn,
				adapter : oColumn._getAdapter()
			});
			var cfg = {
				'id' : oColumn.getIdentity() || oColumn.getName(),
				'name' : oColumn.getName() || oColumn.getIdentity(),
				'semanticType' : 'Measure'
			};
			
			if (oColumn.getFormat()) {
				cfg.formatString = oColumn.getFormat();
			}
			
			if (oColumn.getUnit()) {
				cfg.unit = oColumn.getUnit();
			}

			var aRange = oColumn.getRange();
			if (aRange && aRange.length) {
				cfg.min = aRange[0];
				cfg.max = aRange[1];
			}
			flatTableDS.metadata.fields.push(cfg);
		});

		var nStart, nTop, aContexts,
			AnalyticalBinding = sap.ui.require("sap/ui/model/analytics/AnalyticalBinding"),
			ODataListBinding = sap.ui.require("sap/ui/model/odata/ODataListBinding");
			
		if (oBinding) {
			if ((AnalyticalBinding  && oBinding instanceof AnalyticalBinding) || 
				(ODataListBinding && oBinding instanceof ODataListBinding)) {
				if (oPagingOption) {
					// support to set paging info
					nStart = oPagingOption.iStartIndex;
					nTop = oPagingOption.iLength;
					if (oPagingOption.bEnabled) {
						flatTableDS.metadata.options = {
								pagination: {
									mode: oPagingOption.sMode,
									ratio: oPagingOption.thumbRatio
								}	
							};
					}
					this._iRenderedPageNo = oPagingOption.iPageNo;
				} else {
					nStart = 0;
					if (AnalyticalBinding  && oBinding instanceof AnalyticalBinding) {
						nTop = +oBinding.getTotalSize();
					} else {
						nTop = +oBinding.getLength();
					}
					nTop = Math.max(nTop, 0);
				}
				aContexts = oBinding.getContexts(nStart, nTop);
			} else {
				aContexts = oBinding && oBinding.getContexts(index, len);
			}
		}
		// handle no data
        if (!aContexts || aContexts.length === 0) {
            this.reset();
            this._oVIZFlatTable = new sap.viz.api.data.FlatTableDataset(flatTableDS);
            return;
        }

	    // analyze data
	    jQuery.each(aContexts, function(iIndex, oContext) {
	        if (!flatTableDS.data[iIndex]) {
	            flatTableDS.data[iIndex] = [];
	        }
	        for (var i = 0; i < aAxis.length; i++) {
	            var value = aAxis[i].vAdapter(oContext);
	            if (value instanceof Date) {
					value = value.getTime();
				}
	            var dValueObj = aAxis[i].dAdapter(oContext);
	            flatTableDS.data[iIndex].push(
	                dValueObj.enableDisplayValue ? 
	                {v: value, d: dValueObj.value} : value
	            );
	        }
	        for (var j = 0; j < aMeasures.length; j++) {
	            var value = aMeasures[j].adapter(oContext);
	            flatTableDS.data[iIndex].push(value);
	        }
	        aContextLookup[iIndex] = oContext;
	    });
	    this._aFlatContextLookup = aContextLookup;

	    // finally create the VIZ flat table from the transformed data
	    this._oVIZFlatTable = new sap.viz.api.data.FlatTableDataset(flatTableDS);
	    
	};

	ModelToFlattable.prototype.getRenderedPageNo = function() {
		return this._iRenderedPageNo;
	};

	return ModelToFlattable;

}, /* bExport= */ true);
