/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/rta/controlAnalyzer/Base','sap/ui/rta/Utils','sap/ui/dt/ElementUtil','sap/ui/fl/Utils'],function(B,U,E,F){"use strict";var a=B.extend("sap.ui.rta.controlAnalyzer.Form",{metadata:{library:"sap.ui.rta",properties:{}}});a.prototype.init=function(){};a.prototype.getFlexChangeType=function(t,e,s){var f;switch(t){case"rename":if(E.isInstanceOf(e,"sap.ui.layout.form.FormContainer")){f="renameTitle";}else if(E.isInstanceOf(e,"sap.ui.layout.form.FormElement")){f="renameLabel";}break;case"hide":if(E.isInstanceOf(e,"sap.ui.layout.form.FormContainer")){f="removeSimpleFormGroup";}else if(E.isInstanceOf(e,"sap.ui.layout.form.FormElement")){f="hideSimpleFormField";}break;case"unhide":if(E.isInstanceOf(e,"sap.ui.layout.form.FormElement")){f="unhideSimpleFormField";}break;case"add":if(E.isInstanceOf(e,"sap.ui.layout.form.SimpleForm")){f="addSimpleFormGroup";}break;default:break;}return f;};a.prototype.getCommandClass=function(c){var C;switch(c){case"rename":C='sap.ui.rta.command.RenameForm';break;case"hide":C='sap.ui.rta.command.HideForm';break;case"unhide":C='sap.ui.rta.command.UnhideForm';break;case"add":C='sap.ui.rta.command.AddSimple';break;default:break;}return C;};a.prototype.getConfiguredElement=function(e){return this._getSimpleFormContainer(e);};a.prototype.getRenamableControl=function(e){if(E.isInstanceOf(e,"sap.ui.layout.form.FormElement")){return e.getLabel();}else if(E.isInstanceOf(e,"sap.ui.layout.form.FormContainer")){return e.getTitle();}};a.prototype.getLabel=function(e){return this.getRenamableControl(e).getText();};a.prototype.getLabelBinding=function(e){return e.getBindingInfo("text");};a.prototype.resumeLabelBinding=function(e){var b=e.getBinding("text");if(b){b.resume();}};a.prototype.createChangeData=function(c,C,h,s){var m={};var b=c.getBindingContext().getObject();var d=b.controlId?b.controlId:b.fieldLabel;var o=sap.ui.getCore().byId(d);var e=!!o;var f=function(){if(e){if(b.visibilityType==="hide"){m={controlId:d,changeType:h?"hideControl":"unhideControl",controlType:"SimpleForm"};}}return m;};return new Promise(function(r,g){r(f());});};a.prototype.getSelectedBlock=function(c){return U.findSupportedBlock(c,["sap.ui.layout.form.SimpleForm"]);};a.prototype.getClosestType=function(c){return U.getClosestTypeForControl(c,"sap.ui.layout.form.SimpleForm");};a.prototype.prepare=function(){var e=this._getSimpleFormElements(this.getControl());if(!this.getPrepared()){for(var i=0;i<e.length;i++){var t=e[i].getText?e[i].getText():e[i].getId();var v=e[i].getVisible?e[i].getVisible():e[i].getParent().getVisible();if(v===false){this._mAvailableElements[e[i].getId()]={fieldLabel:t,quickInfo:t,entityType:"",controlId:e[i].getId(),visibilityType:"hide"};}else{this._mHiddenElements[e[i].getId()]={fieldLabel:t,quickInfo:t,entityType:"",controlId:e[i].getId(),visibilityType:"hide"};}}sap.ui.rta.controlAnalyzer.Base.prototype.prepare.apply(this);}return Promise.resolve();};a.prototype._getSimpleFormElements=function(e){var b=[];var s=this._getSimpleFormContainer(e);var c=s.getContent();c.forEach(function(f){if(f instanceof sap.m.Label){b.push(f);}});return b;};a.prototype._getSimpleFormContainer=function(e){if(E.isInstanceOf(e,"sap.ui.layout.form.SimpleForm")){return e;}else if(E.isInstanceOf(e,"sap.ui.layout.form.Form")||E.isInstanceOf(e,"sap.ui.layout.form.FormContainer")||E.isInstanceOf(e,"sap.ui.layout.form.FormElement")){return this._getSimpleFormContainer(e.getParent());}};a.prototype._hasStableIds=function(e){if(E.isInstanceOf(e,"sap.ui.layout.form.SimpleForm")&&F.checkControlId(e)){var h=e.getContent().some(function(c){var H=!F.checkControlId(c);return H;});return!h;}};a.prototype._determineGroupIndex=function(e){var i=0;if(e.getMetadata().getName()==="sap.ui.layout.form.FormContainer"){var c=this._getSimpleFormContainer(e).getContent();var s=-1;var t=e.getTitle();if(t!==null){c.some(function(f,b){if(f===t){s=b;}if(s>=0&&b>s){if(f instanceof sap.ui.core.Title){i=b;return true;}}});i=(!i)?c.length:i;}}return i;};a.prototype._determineIndexOfFormElement=function(f,o){var c=f.getParent().getAggregation("formElements");var i;c.some(function(C,b){if(C===f){i=b;return true;}});i=(o)?i+1:i;return i;};a.prototype._getStableElementForCommand=function(e){var s;if(e.getMetadata().getName()==="sap.ui.layout.form.FormContainer"){s=e.getTitle();}else if(e.getMetadata().getName()==="sap.ui.layout.form.FormElement"){s=e.getLabel();}return s;};a.prototype.mapSpecificChangeData=function(t,s){var r;switch(t){case"Add":r=this._mapAddSpecificChangeData(t,s);break;default:r=this.prototype.mapSpecificChangeData(t,s);break;}return r;};a.prototype._mapAddSpecificChangeData=function(t,s){if(s.changeType==="addSimpleFormGroup"){s.groupLabel=s.labels[0];delete s.labels;}return s;};a.prototype.isHideable=function(e){var i=(E.isInstanceOf(e,"sap.ui.layout.form.FormElement")||E.isInstanceOf(e,"sap.ui.layout.form.FormContainer"));return(i&&!this.isMandatory(e));};return a;},true);