/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define([
    'jquery.sap.global',
    './ShapeMarker',
    'sap/ui/core/Control'
],
function(jQuery, ShapeMarker, Control) {
	
    var ContentPanel = Control.extend('sap.viz.ui5.controls.chartpopover.ContentPanel', {
        metadata : {
            properties : {
                'showLine' : 'boolean',
            },
            publicMethods : ["setContentData"]
        },

        renderer : {
            render : function(oRm, oControl) {
                oRm.write('<div');
                oRm.addClass("viz-controls-chartPopover-contentPanel");
                oRm.writeClasses();
                oRm.writeControlData(oControl);
                oRm.writeAttribute("aria-labelledby", oControl._oDimLabel.getId() + " " + oControl._oForm.getId());
                oRm.writeAttribute('tabindex', -1);
                oRm.write('>');
                oRm.renderControl(oControl._oShapeLabel);
                oRm.renderControl(oControl._oPanel);
                oRm.write('</div>');
            }
        }
    });

    ContentPanel.prototype.init = function() {
        this._measureItemsLen = 0;
        this._maxMeasureLableLen = 15;
        this._maxMeasureValueLen = 12;

        this._oShapeLabel = new ShapeMarker(this._createId('vizShapeMarker'), {
        }).addStyleClass('viz-controls-chartPopover-dimension-marker');
        this._oDimLabel = new sap.m.Text(this._createId('vizDimensionLabel'), {
        }).addStyleClass('viz-controls-chartPopover-dimension-label');
        
        this._oForm = new sap.ui.layout.form.SimpleForm({
            editable : false,
            //minWidth : 80,
            maxContainerCols : 2,
            layout:"ResponsiveGridLayout",
            labelSpanL: 6,
            labelSpanM: 6,
            labelSpanS: 6,
            emptySpanL: 0,
            emptySpanM: 0,
            emptySpanS: 0,
            columnsL: 2,
            columnsM: 2,
            content: [  
            ]
        });    
        this._oPanel = new sap.ui.layout.Grid({
            width: '100%',
            defaultSpan:"L12 M12 S12",
            content : [
                this._oDimLabel, 
                this._oForm
            ]
        }).addStyleClass('viz-controls-chartPopover-Vlt');

    };

    ContentPanel.prototype.setContentData = function(data) {        
        var values = data.val, dims = '', meas = [], measureValue, dimensionValue;
        this._measureItemsLen = 0;
        if (values) {
            this._oForm.removeAllContent();

	        //Check measure's type long text mode or not
	        var isLongMode = false, i, displayValue;
	        for (i = 0; i < values.length; i++) {
	            if (values[i].type && values[i].type.toLowerCase()  === 'dimension') {
	                if(data.isTimeSeries && values.hasOwnProperty("timeDimensions") &&
	                        values.timeDimensions.indexOf(i) > -1){
	                        //Time Dimension
	                    dimensionValue = values[i].value;
	                    displayValue = dimensionValue.time;
	                    if(dimensionValue.day){
	                        if(!displayValue || displayValue.length < dimensionValue.day.length){
	                            displayValue = dimensionValue.day;
	                        }
	                    }
	                    
	                    if(values[i].name.length > this._maxMeasureLableLen || 
	                            displayValue.length > this._maxMeasureValueLen){
	                        isLongMode = true;
	                        break;
	                    }
	                }
	            } else if (values[i].type && values[i].type.toLowerCase()  === 'measure') {
                    measureValue = values[i].value;
                    if (measureValue == null){
                        measureValue = this._getNoValueLabel();
                    }
                    if((values[i].dataName || values[i].name).length > this._maxMeasureLableLen || 
                            measureValue.length > this._maxMeasureValueLen){
	                    isLongMode = true;
	                    break;
	                }
	            }
	        }
	
	        for (i = 0; i < values.length; i++) {
	            if (values[i].type && values[i].type.toLowerCase() === 'dimension') {
	                var dimensionValue = values[i].value;
	                if(data.isTimeSeries && values.hasOwnProperty("timeDimensions") &&
                        values.timeDimensions.indexOf(i) > -1){
	                    //Time Dimension
	                    var dimensionName = values[i].dataName || values[i].name;
	                    if(dimensionValue.time){
	                        this._renderLabels(isLongMode, dimensionName, dimensionValue.time, data.isTimeSeries);
	                    }
	                    if(dimensionValue.day){
                            this._renderLabels(isLongMode, (dimensionValue.time ? "" : dimensionName),
                                dimensionValue.day, data.isTimeSeries);
                        }
	                } else {
                        if (dims == null) {
                            dims = this._getNoValueLabel();
                        }
                        else if (dims.length > 0) {
                            if(dimensionValue === null){
                                dims = dims + ' - ' + this._getNoValueLabel();
                            }else{
                                dims = dims + ' - ' + dimensionValue;                              
                            }
    	                } else {
                            if(dimensionValue === null){
                                dims = this._getNoValueLabel();
                            } else {
                            dims = dimensionValue.toString();                            
                            }
    	                }
	                }
	            } else if (values[i].type && values[i].type.toLowerCase()  === 'measure') {
                    measureValue = values[i].value;
                    if (measureValue == null){
                        measureValue = this._getNoValueLabel();
                    }
                    this._renderLabels(isLongMode, (values[i].dataName || values[i].name), measureValue);
                }
            }
	
	        if(typeof data.color === 'string'){
	            var markerSize = this._oDimLabel.$().css('margin-left');
	            if (markerSize) {
	                markerSize = parseInt(markerSize.substr(0, markerSize.length - 2), 10);
	                this._oShapeLabel.setMarkerSize(markerSize);
	            }
	            this._oShapeLabel.setColor(data.color).setType((data.shape ? data.shape : 'square'));
	            if(this.getShowLine()){
	                this._oShapeLabel.setShowWithLine(data.type).setLineInfo(data.lineInfo);
	            } else {
	                this._oShapeLabel.setShowWithLine(undefined);
	            }
	            if(data.stroke && data.stroke.visible){
	                //Draw marker with stroke
	                this._oShapeLabel.setStroke(data.stroke);
	            }
	        }else{
	            this._oShapeLabel.setType(null);
	            this._oShapeLabel.setShowWithLine(undefined);
	        }
	        
	        if(data.pattern){
	            this._oShapeLabel.setPattern(data.pattern);
	        } else {
                this._oShapeLabel.setPattern(null);
            }

            if (dims && dims.length > 0) {
                this._oDimLabel.setVisible(true);
                this._oDimLabel.setText(dims);
            } else {
                this._oDimLabel.setVisible(false);
            }
	
	        this._measureItemsLen = data.val.length;
        }
    };
    
    ContentPanel.prototype._renderLabels = function(isLongMode, name, value, isTimeSeries){
        var valueLabel;
        if(isLongMode){
            this._oForm.setLabelSpanS(12);
            if(name !== ''){
                this._oForm.addContent(new sap.m.Text({ 
                    text: name
                }).addStyleClass('viz-controls-chartPopover-measure-labels')
               // .addStyleClass('viz-controls-chartPopover-measure-name')
                .addStyleClass('viz-controls-chartPopover-measure-labels-wrapper-name'));
            }
            valueLabel = new sap.m.Text({
                text: value,
                textAlign: sap.ui.core.TextAlign.Start
            }).addStyleClass('viz-controls-chartPopover-measure-labels')
            .addStyleClass('viz-controls-chartPopover-measure-labels-wrapper-value');
            this._oForm.addContent(valueLabel);
            if(isTimeSeries && (name === '')){
                valueLabel.addStyleClass('viz-controls-chartPopover-timeDayDimValue');
            }
        }else{
            this._oForm.setLabelSpanS(6);
            this._oForm.addContent(new sap.m.Label({ 
                text: name
            }).addStyleClass('viz-controls-chartPopover-measure-labels')
            .addStyleClass('viz-controls-chartPopover-measure-name'));
            valueLabel = new sap.m.Text({
                text: value,
                textAlign: sap.ui.core.TextAlign.End
            }).addStyleClass('viz-controls-chartPopover-measure-labels')
            .addStyleClass('viz-controls-chartPopover-measure-value');
            if(isTimeSeries && (name === '')){
                //Time axis and min level is second. 
                valueLabel.addStyleClass('viz-controls-chartPopover-timeDayValue');
            }
            this._oForm.addContent(valueLabel);
        }
    };

    ContentPanel.prototype.isMultiSelected = function() {
        return this._measureItemsLen === 0;
    };        

    /**
     * Creates an id for an Element prefixed with the control id
     *
     * @return {string} id
     * @public
     */
    ContentPanel.prototype._createId = function(sId) {
        return this.getId() + "-" + sId;
    };
    
    ContentPanel.prototype._getNoValueLabel = function(){
        return sap.viz.extapi.env.Language.getResourceString("IDS_ISNOVALUE");
    };

    ContentPanel.prototype.exit = function(sId) {
        if (this._oForm) {
            this._oForm.destroy();
            this._oForm = null;
        }

        if (this._oShapeLabel) {
            this._oShapeLabel.destroy();
            this._oShapeLabel = null;
        }

        if (this._oDimLabel) {
            this._oDimLabel.destroy();
            this._oDimLabel = null;
        }

        if (this._oPanel) {
            this._oPanel.destroy();
            this._oPanel = null;
        }
    };
    
    return ContentPanel;
});
