/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/dt/plugin/ElementMover','sap/ui/dt/OverlayUtil','sap/ui/dt/ElementUtil','sap/ui/fl/Utils','sap/ui/rta/Utils','sap/ui/rta/command/CommandFactory'],function(E,O,a,F,U,C){"use strict";var R=E.extend("sap.ui.rta.plugin.RTAElementMover",{metadata:{library:"sap.ui.rta",properties:{commandFactory:{type:"any",defaultValue:C},movableTypes:{type:"string[]",defaultValue:["sap.ui.core.Element"]}},associations:{},events:{}}});function g(o,i){var r;if(o.isInHiddenTree()&&o.getPublicParentElementOverlay()){r=o.getPublicParentElementOverlay().getElementInstance();}else if(!o.isInHiddenTree()){var e=o.getElementInstance();var d=o.getDesignTimeMetadata();if(i&&!d.getData().getRelevantContainer){r=e;}else{r=d.getRelevantContainer(e);}}return r;}E.prototype.isMovableType=function(e){return true;};R.prototype.checkMovable=function(o){var m=E.prototype.checkMovable.apply(this,arguments);var e;if(m){e=o.getElementInstance();m=U.isEditable(o);if(m){var p=o.getPublicParentAggregationOverlay();if(p){var P=p.getDesignTimeMetadata();var M=P.getMoveAction(e);m=!!(M);}else{m=false;}}}return m&&U.hasParentStableId(o);};R.prototype.checkTargetZone=function(A){var t=E.prototype.checkTargetZone.call(this,A);if(t){var m=this.getMovedOverlay();var o=A.getParent();var M=g(m,false);var T=g(o,true);if(!M||!T){return false;}else{t=(M===T)&&U.isEditable(o,m.getElementInstance());}}return t;};return R;},true);
