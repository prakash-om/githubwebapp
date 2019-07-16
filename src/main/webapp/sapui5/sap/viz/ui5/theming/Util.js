/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(function(){"use strict";var U={};U._mapping={"sapUiChartLabelHoverColor":["categoryAxis.hoverShadow.color","categoryAxis2.hoverShadow.color","legend.hoverShadow.color","rowAxis.hoverShadow.color","columnAxis.hoverShadow.color","timeAxis.hoverShadow.color"],"sapUiChartLabelPressedColor":["categoryAxis.mouseDownShadow.color","categoryAxis2.mouseDownShadow.color","legend.mouseDownShadow.color","rowAxis.mouseDownShadow.color","columnAxis.mouseDownShadow.color","timeAxis.mouseDownShadow.color"],"sapUiChartCategoryAxisLabelFontColor":["categoryAxis.label.style.color","categoryAxis2.label.style.color","categoryAxis.label.parentStyle.color","categoryAxis2.label.parentStyle.color","columnAxis.label.style.color","rowAxis.label.style.color","timeAxis.label.style.color","plotArea.callout.label.style.color"],"sapUiChartValueAxisLabelFontColor":["valueAxis.label.style.color","valueAxis2.label.style.color"],"sapUiChartCategoryAxisLabelFontSize":["categoryAxis.label.style.fontSize","categoryAxis2.label.style.fontSize","categoryAxis.label.parentStyle.fontSize","categoryAxis2.label.parentStyle.fontSize","rowAxis.label.style.fontSize","columnAxis.label.style.fontSize","timeAxis.label.style.fontSize"],"sapUiChartValueAxisLabelFontSize":["valueAxis.label.style.fontSize","valueAxis2.label.style.fontSize"],"sapUiChartCategoryAxisLineColor":["categoryAxis.color","categoryAxis2.color","timeAxis.color"],"sapUiChartValueAxisLineColor":["valueAxis.color","valueAxis2.color"],"sapUiChartBackgroundColor":["general.background.color","plotArea.background.color","plotArea.referenceLine.defaultStyle.label.background"],"sapUiFontFamily":["plotArea.dataLabel.style.fontFamily","plotArea.dimensionLabel.style.fontFamily","plotArea.referenceLine.defaultStyle.label.fontFamily","plotArea.highlight.centerName.style.fontFamily","plotArea.highlight.centerValue.style.fontFamily","categoryAxis.title.style.fontFamily","categoryAxis2.title.style.fontFamily","categoryAxis.label.style.fontFamily","categoryAxis2.label.style.fontFamily","timeAxis.title.style.fontFamily","timeAxis.label.style.fontFamily","valueAxis.title.style.fontFamily","valueAxis.label.style.fontFamily","valueAxis2.label.style.fontFamily","valueAxis2.title.style.fontFamily","columnAxis.title.style.fontFamily","columnAxis.label.style.fontFamily","rowAxis.title.style.fontFamily","rowAxis.label.style.fontFamily","legend.title.style.fontFamily","legend.label.style.fontFamily","sizeLegend.title.style.fontFamily","sizeLegend.label.style.fontFamily","title.style.fontFamily","plotArea.callout.label.style.fontFamily"],"sapUiChartLabelFontWeight":["plotArea.dataLabel.style.fontWeight","plotArea.dimensionLabel.style.fontWeight","plotArea.referenceLine.defaultStyle.label.fontWeight","plotArea.highlight.centerName.style.fontWeight","plotArea.highlight.centerValue.style.fontWeight","categoryAxis.label.style.fontWeight","categoryAxis2.label.style.fontWeight","timeAxis.label.style.fontWeight","valueAxis.label.style.fontWeight","valueAxis2.label.style.fontWeight","columnAxis.label.style.fontWeight","rowAxis.label.style.fontWeight","legend.label.style.fontWeight","sizeLegend.label.style.fontWeight"],"sapUiChartLegendLabelFontColor":["legend.label.style.color","sizeLegend.label.style.color"],"sapUiChartLegendTitleFontColor":["legend.title.style.color","sizeLegend.title.style.color"],"sapUiChartLegendTitleFontSize":["legend.title.style.fontSize","sizeLegend.title.style.fontSize"],"sapUiChartLegendLabelFontSize":["legend.label.style.fontSize","sizeLegend.label.style.fontSize"],"sapUiChartPaletteUndefinedColor":"plotArea.defaultOthersStyle.color","sapUiChartGridlineColor":["plotArea.gridline.color","plotArea.grid.line.color","plotArea.dataLabel.line.color"],"sapUiChartReferenceLineColor":["plotArea.referenceLine.defaultStyle.color","plotArea.callout.line.color"],"sapUiChartReferenceLineLabelColor":"plotArea.referenceLine.defaultStyle.label.color","sapUiChartDataLabelFontSize":["plotArea.dataLabel.style.fontSize","plotArea.dimensionLabel.style.fontSize","plotArea.referenceLine.defaultStyle.label.fontSize","plotArea.callout.label.style.fontSize"],"sapUiChartScrollBarThumbColor":["plotArea.scrollbar.thumb.fill","legend.scrollbar.thumb.fill"],"sapUiChartScrollBarTrackColor":["plotArea.scrollbar.track.fill","legend.scrollbar.track.fill"],"sapUiChartScrollBarThumbHoverColor":["plotArea.scrollbar.thumb.hoverFill","legend.scrollbar.thumb.hoverFill"],"sapUiChartScrollbarThumbPadding":["plotArea.scrollbar.spacing","legend.scrollbar.spacing"],"sapUiChartScrollbarBorderColor":["plotArea.scrollbar.border.color","legend.scrollbar.border.color"],"sapUiChartScrollbarBorderSize":["plotArea.scrollbar.border.width","legend.scrollbar.border.width"],"sapUiChartMainTitleFontColor":"title.style.color","sapUiChartAxisTitleFontColor":["categoryAxis.title.style.color","categoryAxis2.title.style.color","valueAxis.title.style.color","valueAxis2.title.style.color","columnAxis.title.style.color","rowAxis.title.style.color","timeAxis.title.style.color"],"sapUiChartMainTitleFontSize":"title.style.fontSize","sapUiChartAxisTitleFontSize":["categoryAxis.title.style.fontSize","categoryAxis2.title.style.fontSize","valueAxis.title.style.fontSize","valueAxis2.title.style.fontSize","columnAxis.title.style.fontSize","rowAxis.title.style.fontSize","timeAxis.title.style.fontSize"],"sapUiChartTitleFontWeight":["title.style.fontWeight","legend.title.style.fontWeight","categoryAxis.title.style.fontWeight","categoryAxis2.title.style.fontWeight","categoryAxis.label.parentStyle.fontWeight","categoryAxis2.label.parentStyle.fontWeight","valueAxis.title.style.fontWeight","valueAxis2.title.style.fontWeight","columnAxis.title.style.fontWeight","rowAxis.title.style.fontWeight","timeAxis.title.style.fontWeight","plotArea.callout.label.style.fontWeight"],"sapUiChartDataPointBorderColor":["plotArea.dataPoint.stroke.color","interaction.deselected.stroke.color"],"sapUiChartDataPointBorderHoverSelectedColor":["interaction.hover.stroke.color","interaction.selected.stroke.color"],"sapUiChartDataPointNotSelectedBackgroundOpacity":"interaction.deselected.opacity","sapUiChartTargetColor":["plotArea.target.valueColor","plotArea.linkline.color"],"sapUiChartTargetShadowColor":"plotArea.target.shadowColor","sapUiChartBubbleBGOpacity":"plotArea.dataPoint.opacity","sapUiGroupContentBackground":"tooltip.background.color","sapVizChartTooltipBorderStroke":["tooltip.background.borderColor","tooltip.separationLine.color"],"sapUiChartPopoverDataItemFontColor":["tooltip.bodyDimensionLabel.color","tooltip.bodyDimensionValue.color","tooltip.bodyMeasureLabel.color","tooltip.bodyMeasureValue.color","tooltip.footerLabel.color"],"sapUiChartPaletteSemanticNeutral":["plotArea.dataPoint.color.total"],"sapUiChartPaletteQualitativeHue1":["plotArea.dataPoint.color.positive"],"sapUiChartPaletteQualitativeHue2":["plotArea.dataPoint.color.negative"],"sapUiChartLightText":["timeAxis.label.style.parentColor"],"sapUiChartZeroAxisColor":["plotArea.gridline.zeroLine.color"],"sapUiChartDataLabelFontColor":["plotArea.dataLabel.style.color"]};(function(){var i=(sap.ui.Device.system.tablet||sap.ui.Device.system.phone);if(i){U._mapping["sapUiChartBackgroundColor"]=["general.background.color","plotArea.background.color","plotArea.referenceLine.defaultStyle.label.background","plotArea.scrollbar.track.fill","legend.scrollbar.track.fill"];U._mapping["sapUiChartScrollBarThumbColor"]=[];U._mapping["sapUiChartScrollBarTrackColor"]=[];U._mapping["sapUiChartScrollBarThumbHoverColor"]=["plotArea.scrollbar.thumb.hoverFill","legend.scrollbar.thumb.hoverFill","plotArea.scrollbar.thumb.fill","legend.scrollbar.thumb.fill"];}else{U._mapping["sapUiChartBackgroundColor"]=["general.background.color","plotArea.background.color","plotArea.referenceLine.defaultStyle.label.background"];U._mapping["sapUiChartScrollBarThumbColor"]=["plotArea.scrollbar.thumb.fill","legend.scrollbar.thumb.fill"];U._mapping["sapUiChartScrollBarTrackColor"]=["plotArea.scrollbar.track.fill","legend.scrollbar.track.fill"];U._mapping["sapUiChartScrollBarThumbHoverColor"]=["plotArea.scrollbar.thumb.hoverFill","legend.scrollbar.thumb.hoverFill"];}})();U._exclude={"valueAxis.color":["*dual*"],"valueAxis.title.style.color":["*dual*"],"valueAxis2.color":["*dual*"],"valueAxis2.title.style.color":["*dual*"]};U.readCSSParameters=function(c,C){var p={};var m=U._mapping;var e=U._exclude;for(var k in m){if(m.hasOwnProperty(k)){var v=sap.ui.core.theming.Parameters.get(k,C);if(v){var a=v.indexOf('rem');if(a>-1){var t=v.substring(0,a);v=t*parseFloat(window.getComputedStyle(document.documentElement).fontSize)+'px';}var b=m[k];if(Object.prototype.toString.call(b)==='[object Array]'){for(var i=0;i<b.length;i++){if(!f(e,b[i],c)){d(p,b[i],v);}}}else{if(!f(e,b,c)){d(p,b,v);}}}}}return p;function d(p,b,v){var g=b.split('.');var h=p;for(var i=0;i<g.length-1;i++){var k=g[i];if(undefined==h[k]||null==h[k]){h[k]={}}h=h[k];}k=g[i];h[k]=v;}function f(e,b,c){var r=false;if(e.hasOwnProperty(b)){var g=e[b];for(var i=0;i<g.length;i++){var h=g[i].replace(/\*/g,'.*').replace(/\?/g,'.').replace(/\|/g,'$|^');var j=RegExp('^'+h+'$');if(j.test(c)){r=true;break;}}}return r;}};return U;},true);