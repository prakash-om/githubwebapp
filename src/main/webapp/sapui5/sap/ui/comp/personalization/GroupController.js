/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','./BaseController','sap/m/library','./Util'],function(q,B,l,U){"use strict";var G=B.extend("sap.ui.comp.personalization.GroupController",{constructor:function(i,s){B.apply(this,arguments);this.setType(sap.m.P13nPanelType.group);},metadata:{events:{afterGroupModelDataChange:{}}}});G.prototype.setTable=function(t){B.prototype.setTable.apply(this,arguments);if(t instanceof sap.ui.table.AnalyticalTable||t instanceof sap.ui.table.Table){t.detachGroup(this._onGroup,this);t.attachGroup(this._onGroup,this);}};G.prototype._getTable2Json=function(){var j=this.createPersistentStructure();var t=this.getTable();if(!t){return j;}var c=[];if(t instanceof sap.ui.table.Table&&t.getGroupBy){c=t.getGroupBy()||[];if(typeof c==="string"){c=[c];}}if(t instanceof sap.ui.table.AnalyticalTable&&t.getGroupedColumns){c=t.getGroupedColumns()||[];}var i=this.getIgnoreColumnKeys();c.forEach(function(C){if(typeof C==="string"){C=sap.ui.getCore().byId(C);}var s=U.getColumnKey(C);if(i.indexOf(s)>-1){return;}if(C.getGrouped()){q.sap.require("sap/m/P13nConditionPanel");j.group.groupItems.push({columnKey:s,operation:C.getSortOrder&&C.getSortOrder()===sap.ui.table.SortOrder.Ascending?sap.m.P13nConditionOperation.GroupAscending:sap.m.P13nConditionOperation.GroupDescending,showIfGrouped:C.getShowIfGrouped?C.getShowIfGrouped():false});}});return j;};G.prototype._getTable2JsonRestore=function(){return this._getTable2Json();};G.prototype.syncTable2TransientModel=function(){var t=this.getTable();var i=[];var c;var C;var o=this.getColumnMap(true);if(t){if(t instanceof sap.ui.table.AnalyticalTable||t instanceof sap.ui.table.Table){for(C in o){c=o[C];if(U.isGroupable(c)){i.push({columnKey:C,text:c.getLabel().getText(),tooltip:(c.getTooltip()instanceof sap.ui.core.TooltipBase)?c.getTooltip().getTooltip_Text():c.getTooltip_Text()});}}}if(t instanceof sap.m.Table){for(C in o){c=o[C];if(U.isGroupable(c)){i.push({columnKey:C,text:c.getHeader().getText(),tooltip:(c.getHeader().getTooltip()instanceof sap.ui.core.TooltipBase)?c.getHeader().getTooltip().getTooltip_Text():c.getHeader().getTooltip_Text()});}}}}U.sortItemsByText(i,"text");var g=this.getModel("$sapuicomppersonalizationBaseController").getData().transientData.group.items;if(q(i).not(g).length!==0||q(g).not(i).length!==0){this.getModel("$sapuicomppersonalizationBaseController").getData().transientData.group.items=i;}};G.prototype._onGroup=function(e){var t=this.getTable();var g=e.mParameters.groupedColumns;this.fireBeforePotentialTableChange();var d=this.getModel("$sapuicomppersonalizationBaseController").getData();d.persistentData.group.groupItems=[];g.forEach(function(c,i){if(typeof c==="string"){c=sap.ui.getCore().byId(c);}if(t&&t instanceof sap.ui.table.AnalyticalTable){if(c.getGrouped()){d.persistentData.group.groupItems.push({columnKey:U.getColumnKey(c),showIfGrouped:c.getShowIfGrouped?c.getShowIfGrouped():false});}}else if(t&&t instanceof sap.ui.table.Table){d.persistentData.group.groupItems.push({columnKey:U.getColumnKey(c),showIfGrouped:false});}},this);this.fireAfterPotentialTableChange();this.fireAfterGroupModelDataChange();};G.prototype._hasTableGroupableColumns=function(){var t=this.getTable();if(!t){return false;}var h=false;t.getColumns().some(function(c){if(U.isGroupable(c)){h=true;return true;}});return h;};G.prototype.getPanel=function(){sap.ui.getCore().loadLibrary("sap.m");q.sap.require("sap/m/P13nGroupPanel");q.sap.require("sap/m/P13nItem");q.sap.require("sap/m/P13nGroupItem");if(!this._hasTableGroupableColumns()){return null;}var t=this;var p=new sap.m.P13nGroupPanel({maxGroups:this.getTable()instanceof sap.ui.table.AnalyticalTable?"-1":"1",containerQuery:true,items:{path:"$sapmP13nPanel>/transientData/group/items",template:new sap.m.P13nItem({columnKey:"{$sapmP13nPanel>columnKey}",text:"{$sapmP13nPanel>text}",tooltip:"{$sapmP13nPanel>tooltip}"})},groupItems:{path:"$sapmP13nPanel>/persistentData/group/groupItems",template:new sap.m.P13nGroupItem({columnKey:"{$sapmP13nPanel>columnKey}",operation:"{$sapmP13nPanel>operation}",showIfGrouped:"{$sapmP13nPanel>showIfGrouped}"})},beforeNavigationTo:t.setModelFunction()});p.attachAddGroupItem(function(e){var d=this.getModel("$sapuicomppersonalizationBaseController").getData();var a=e.getParameters();var g={columnKey:a.groupItemData.getColumnKey(),operation:a.groupItemData.getOperation(),showIfGrouped:a.groupItemData.getShowIfGrouped()};if(a.index>-1){d.persistentData.group.groupItems.splice(a.index,0,g);}else{d.persistentData.group.groupItems.push(g);}this.getModel("$sapuicomppersonalizationBaseController").setData(d,true);},this);p.attachRemoveGroupItem(function(e){var a=e.getParameters();var d=this.getModel("$sapuicomppersonalizationBaseController").getData();if(a.index>-1){d.persistentData.group.groupItems.splice(a.index,1);this.getModel("$sapuicomppersonalizationBaseController").setData(d,true);}},this);return p;};G.prototype.syncJsonModel2Table=function(j){var t=this.getTable();var c;var C=this.getColumnMap();this.fireBeforePotentialTableChange();if(t instanceof sap.ui.table.TreeTable){return;}else if(t instanceof sap.ui.table.AnalyticalTable){for(var s in C){c=C[s];if(c&&c.getGrouped()){c.setGrouped(false);c.setShowIfGrouped(false);}}j.group.groupItems.forEach(function(g){c=C[g.columnKey];if(!c){return;}c.setGrouped(true);c.setShowIfGrouped(g.showIfGrouped);});}else if(t instanceof sap.ui.table.Table){if(j.group.groupItems.length>0){j.group.groupItems.some(function(g){c=C[g.columnKey];if(c){t.setGroupBy(c);return true;}},this);}else{t.setGroupBy(null);}}this.fireAfterPotentialTableChange();};G.prototype.getChangeType=function(p,P){if(!P||!P.group||!P.group.groupItems){return sap.ui.comp.personalization.ChangeType.Unchanged;}var i=JSON.stringify(p.group.groupItems)!==JSON.stringify(P.group.groupItems);return i?sap.ui.comp.personalization.ChangeType.ModelChanged:sap.ui.comp.personalization.ChangeType.Unchanged;};G.prototype.getChangeData=function(p,P){if(!p||!p.group||!p.group.groupItems){return this.createPersistentStructure();}if(!P||!P.group||!P.group.groupItems){return{group:U.copy(p.group)};}if(JSON.stringify(p.group.groupItems)!==JSON.stringify(P.group.groupItems)){return{group:U.copy(p.group)};}return null;};G.prototype.getUnionData=function(p,P){if(!P||!P.group||!P.group.groupItems){return{group:U.copy(p.group)};}return{group:U.copy(P.group)};};G.prototype.isGroupSelected=function(p,P,c){var i;if(!p){P.groupItems.some(function(g,I){if(g.columnKey===c){i=I;return true;}});return i>-1;}if(!p.selectedColumnKeys){return false;}if(p.selectedColumnKeys){p.selectedColumnKeys.some(function(s,I){if(s===c){i=I;return true;}});}return i>-1;};G.prototype.determineNeededColumnKeys=function(p){var n=[];if(!p||!p.group||!p.group.groupItems){return{group:[]};}p.group.groupItems.forEach(function(m){n.push(m.columnKey);});return{group:n};};G.prototype.exit=function(){B.prototype.exit.apply(this,arguments);var t=this.getTable();if(t&&(t instanceof sap.ui.table.AnalyticalTable||t instanceof sap.ui.table.Table)){t.detachGroup(this._onGroup,this);}};return G;},true);
