/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/dt/Plugin','sap/ui/fl/Utils','sap/ui/rta/Utils','sap/ui/dt/OverlayRegistry'],function(P,F,R,O){"use strict";var C=P.extend("sap.ui.rta.plugin.CreateContainer",{metadata:{library:"sap.ui.rta",properties:{},associations:{},events:{}}});C.prototype.getEffectiveDesignTimeMetadata=function(o){return o.getDesignTimeMetadata();};C.prototype._getParentOverlay=function(s,o){var p;if(s){p=o.getPublicParentElementOverlay();}else{p=o;}return p;};C.prototype.getCreateAction=function(s,o){var p=this._getParentOverlay(s,o);var d=this.getEffectiveDesignTimeMetadata(p);var a=d.getAggregationAction("createContainer",o.getElementInstance());return a[0];};C.prototype.isCreateAvailable=function(s,o){return!!this.getCreateAction(s,o);};C.prototype.isCreateEnabled=function(s,o){var a=this.getCreateAction(s,o);if(!a){return false;}if(a.isEnabled&&typeof a.isEnabled==="function"){var i=a.isEnabled;return i.call(null,o.getElementInstance());}else{return true;}};C.prototype._getCreatedContainerId=function(a,n){var i=n;if(a.getCreatedContainerId&&typeof a.getCreatedContainerId==="function"){var m=a.getCreatedContainerId;i=m.call(null,n);}return O.getOverlay(i);};C.prototype._determineIndex=function(p,s,a,g){return R.getIndex(p,s,a,g);};C.prototype._getText=function(a,d,t){var c=d.getLibraryText(a.containerTitle);var T=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");return T.getText(t,c);};C.prototype.getCreateContainerText=function(s,o){var a=this.getCreateAction(s,o);var p=this._getParentOverlay(s,o);var d=this.getEffectiveDesignTimeMetadata(p);var t="CTX_CREATE_CONTAINER";return this._getText(a,d,t);};C.prototype._getContainerTitle=function(a,d){var t="TITLE_CREATE_CONTAINER";return this._getText(a,d,t);};C.prototype.handleCreate=function(s,o){var a=this.getCreateAction(s,o);var p=this._getParentOverlay(s,o);var d=this.getEffectiveDesignTimeMetadata(p);var t=p.getElementInstance();var v=F.getViewForControl(t);var S;if(s){S=o.getElementInstance();}var n=v.createId(jQuery.sap.uid());var g=d.getAggregation(a.aggregation).getIndex;var i=this._determineIndex(t,S,a.aggregation,g);var c=this.getCommandFactory().getCommandFor(t,"createContainer",{newControlId:n,label:this._getContainerTitle(a,d),index:i},d);this.fireElementModified({"command":c});var N=this._getCreatedContainerId(a,n);N.setSelected(true);return N;};return C;},true);