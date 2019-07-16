/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2016 SAP SE. All rights reserved
	
 */
sap.ui.define(['jquery.sap.global','./library','sap/ui/core/Control','sap/m/Size'],function(q,l,C,S){"use strict";var D=C.extend("sap.suite.ui.microchart.DeltaMicroChart",{metadata:{library:"sap.suite.ui.microchart",properties:{value1:{type:"float",group:"Misc",defaultValue:null},value2:{type:"float",group:"Misc",defaultValue:null},title1:{type:"string",group:"Misc",defaultValue:null},title2:{type:"string",group:"Misc",defaultValue:null},displayValue1:{type:"string",group:"Misc",defaultValue:null},displayValue2:{type:"string",group:"Misc",defaultValue:null},deltaDisplayValue:{type:"string",group:"Misc",defaultValue:null},color:{type:"sap.m.ValueColor",group:"Misc",defaultValue:"Neutral"},width:{type:"sap.ui.core.CSSSize",group:"Misc"},size:{type:"sap.m.Size",group:"Misc",defaultValue:"Auto"},isResponsive:{type:"boolean",group:"Appearance",defaultValue:false}},events:{press:{}}}});D.EDGE_CASE_WIDTH_RESIZEFONT=168;D.EDGE_CASE_HEIGHT_SHOW_BOTTOM_LABEL=16;D.EDGE_CASE_HEIGHT_SHOW_TOP_BOTTOM_LABELS=32;D.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart");this.setAggregation("tooltip","{AltText}",true);this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this));}else{this._handleCoreInitialized();}};D.prototype.setSize=function(s){if(s===S.Responsive){this.setIsResponsive(true);}else{this.setIsResponsive(false);}return this.setProperty("size",s,true);};D.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();if(!this._bThemeApplied){sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this);}};D.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this.invalidate();sap.ui.getCore().detachThemeChanged(this._handleThemeApplied,this);};D.prototype._calcChartData=function(){var v=this.getValue1();var V=this.getValue2();var m=Math.min(v,V,0);var M=Math.max(v,V,0);var t=M-m;function c(f){return(t===0?0:Math.abs(f)/t*100).toFixed(2);}var o={};var d=v-V;o.delta={left:M===0,width:c(d),isFirstStripeUp:v<V,isMax:(v<0&&V>=0)||(v>=0&&V<0),isZero:v===0&&V===0,isEqual:d===0};o.bar1={left:V>=0,width:c(v),isSmaller:Math.abs(v)<Math.abs(V)};o.bar2={left:v>=0,width:c(V),isSmaller:Math.abs(V)<Math.abs(v)};return o;};D.prototype._getLocalizedColorMeaning=function(c){return this._oRb.getText(("SEMANTIC_COLOR_"+c).toUpperCase());};D.prototype._digitsAfterDecimalPoint=function(v){var a=(""+v).match(/[.,](\d+)/g);return(a)?(""+a).length-1:0;};D.prototype.getAltText=function(){var d=this.getDisplayValue1();var s=this.getDisplayValue2();var a=this.getDeltaDisplayValue();var v=this.getValue1();var V=this.getValue2();var A=d?d:""+v;var b=s?s:""+V;var c=a?a:""+Math.abs(v-V).toFixed(Math.max(this._digitsAfterDecimalPoint(v),this._digitsAfterDecimalPoint(V)));var m=this._getLocalizedColorMeaning(this.getColor());return this.getTitle1()+" "+A+"\n"+this.getTitle2()+" "+b+"\n"+this._oRb.getText("DELTAMICROCHART_DELTA_TOOLTIP",[c,m]);};D.prototype.getTooltip_AsString=function(){var t=this.getTooltip();var T=this.getAltText();if(typeof t==="string"||t instanceof String){T=t.split("{AltText}").join(T).split("((AltText))").join(T);return T;}else if(this.isBound("tooltip")&&!t){return T;}return t?t:"";};D.prototype._isCalcSupported=function(){return q.sap.byId(this.getId()+"-calc").css("max-width")=="11px";};D.prototype._isRoundingSupported=function(){return q.sap.byId(this.getId()+"-calc1").width()==4;};D.prototype.onBeforeRendering=function(){if(l._isInGenericTile(this)){this.setIsResponsive(true);l._removeStandardMargins(this);}this._oChartData=this._calcChartData();if(this._sResizeHandlerId){sap.ui.core.ResizeHandler.deregister(this._sResizeHandlerId);}};D.prototype.onAfterRendering=function(){this._bCalc=this._isCalcSupported();this._bRounding=this._isRoundingSupported();if(this.getIsResponsive()){var c=this.$();this._adjustToParent(c);this._resizeVertically(c);this._resizeHorizontally(c);}if(!this._bCalc||!this._bRounding){var o=q.sap.domById(this.getId()+"-dmc-chart");this._sResizeHandlerId=sap.ui.core.ResizeHandler.register(o,q.proxy(this._adjust,this));if(!this._bCalc){this._adjustCalc();}if(!this._bRounding){this._adjustRound();}}};D.prototype._adjustToParent=function(c){if(q.isFunction(this.getParent)&&this.getParent()instanceof sap.m.FlexBox){var p=parseInt(this.getParent().$().height(),10);var P=parseInt(this.getParent().$().width(),10);c.outerHeight(p-parseInt(c.css("margin-top"),10)-parseInt(c.css("margin-bottom"),10));c.outerWidth(P-parseInt(c.css("margin-left"),10)-parseInt(c.css("margin-right"),10));}};D.prototype._resizeVertically=function(c){var v=c.find(".sapSuiteDMCVerticalAlignmentContainer");var $=c.find(".sapSuiteDMCResponsive.sapSuiteDMCChart");var L=c.find(".sapSuiteDMCPositionTop.sapSuiteDMCTitle");var r=c.find(".sapSuiteDMCLbls .sapSuiteDMCValue1");var R=c.find(".sapSuiteDMCLbls .sapSuiteDMCDelta");var h=D.EDGE_CASE_HEIGHT_SHOW_TOP_BOTTOM_LABELS+parseInt($.css("min-height"),10);var V=parseInt(v.css("height"),10);var H=parseInt(c.css("height"),10);if(H<=V){c.addClass("sapSuiteDMCSmallFont");}if(H<D.EDGE_CASE_HEIGHT_SHOW_BOTTOM_LABEL){c.hide();}else if(H<D.EDGE_CASE_HEIGHT_SHOW_TOP_BOTTOM_LABELS){r.hide();R.hide();L.hide();$.hide();}else if(H<=h){R.hide();$.hide();}};D.prototype._resizeHorizontally=function(c){var L=c.find(".sapSuiteDMCResponsive.sapSuiteDMCCnt");var r=c.find(".sapSuiteDMCResponsive.sapSuiteDMCLbls");var i=parseInt(c.css("width"),10);var w=parseInt(L.css("min-width"),10);if(i<D.EDGE_CASE_WIDTH_RESIZEFONT||!this._rightSideTruncated(c,r)){c.addClass("sapSuiteDMCSmallFont");}if(!this._rightSideTruncated(c,r)){c.hide();}if(parseInt(L.css("width"),10)<=w){L.hide();}};D.prototype._rightSideTruncated=function(c,r){return parseInt(c.css("width"),10)>=parseInt(r.css("width"),10);};D.prototype._adjust=function(){if(!this._bCalc){this._adjustCalc();}if(!this._bRounding){this._adjustRound();}};D.prototype._adjustRound=function(){var c=q.sap.byId(this.getId()+"-dmc-chart").width();var d=Math.round(c*this._oChartData.delta.width/100);q.sap.byId(this.getId()+"-dmc-bar-delta").width(d);if(this._oChartData.bar1.isSmaller&&!this._oChartData.delta.isMax){q.sap.byId(this.getId()+"-dmc-bar1").width(c-d);}if(this._oChartData.bar2.isSmaller&&!this._oChartData.delta.isMax){q.sap.byId(this.getId()+"-dmc-bar2").width(c-d);}};D.prototype._adjustCalc=function(){var c=q.sap.byId(this.getId()+"-dmc-chart").width();function a(b){b.css("max-width",c-parseInt(b.css("max-width"),10)+"px");}a(q.sap.byId(this.getId()+"-dmc-bar1"));a(q.sap.byId(this.getId()+"-dmc-bar2"));a(q.sap.byId(this.getId()+"-dmc-bar-delta"));};D.prototype.attachEvent=function(e,d,f,L){sap.ui.core.Control.prototype.attachEvent.call(this,e,d,f,L);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapSuiteUiMicroChartPointer");}return this;};D.prototype.detachEvent=function(e,f,L){sap.ui.core.Control.prototype.detachEvent.call(this,e,f,L);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapSuiteUiMicroChartPointer");}return this;};D.prototype.ontap=function(e){if(sap.ui.Device.browser.internet_explorer){this.$().focus();}this.firePress();};D.prototype.onkeydown=function(e){if(e.which==q.sap.KeyCodes.SPACE){e.preventDefault();}};D.prototype.onkeyup=function(e){if(e.which==q.sap.KeyCodes.ENTER||e.which==q.sap.KeyCodes.SPACE){this.firePress();e.preventDefault();}};return D;});
