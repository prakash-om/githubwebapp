/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/core/Control','sap/ui/layout/VerticalLayout','sap/ui/layout/HorizontalLayout','sap/m/Label','sap/m/Text','sap/m/ObjectNumber'],function(C,V,H,L,T,O){"use strict";var a=C.extend("sap.viz.ui5.controls.charttooltip.ContentPanel",{metadata:{properties:{}},renderer:{render:function(r,c){var i=c.getId();r.write('<div');r.writeAttribute("id",i);r.addClass("viz-controls-chartTooltip-contentPanel");r.writeClasses();r.write('>');r.renderControl(c._oPanel);r.write('</div>');}}});a.prototype.init=function(){this._oPanel=new V({});};a.prototype.setContent=function(d){var p=this._oPanel;p.destroyContent();var f=true;var t=this;d.forEach(function(b,i){if(b.type){var l=new L({text:b.name});l.addStyleClass("viz-controls-chartTooltip-label");var v,c,m,h;var e=new L({text:":"});e.addStyleClass("viz-controls-chartTooltip-separator");if(b.type.toLowerCase()==="dimension"){var g;var j=b.value;if(d.timeDimensions&&d.timeDimensions.indexOf(i)>-1){if(j.time&&j.time.legnth>j.day.length){g=j.time;}else{g=j.day;}}else{g=j;}g=(g==null)?t._getNoValueLabel():g;c=new T({text:g});c.addStyleClass("viz-controls-chartTooltip-dimension-value");v=c;}else if(b.type.toLowerCase()==="measure"){var k=b.value||t._getNoValueLabel();m=new O({number:k,unit:b.unit});m.addStyleClass("viz-controls-chartTooltip-measure-value");v=m;}h=new H({content:[l,e,v]});if(!f){h.addStyleClass("sapUI5TooltipRowSpacing");}else{f=false;}p.addContent(h);}});};a.prototype.exit=function(){if(this._oPanel){this._oPanel.destroy();this._oPanel=null;}};a.prototype._getNoValueLabel=function(){return sap.viz.extapi.env.Language.getResourceString("IDS_ISNOVALUE");};return a;});
