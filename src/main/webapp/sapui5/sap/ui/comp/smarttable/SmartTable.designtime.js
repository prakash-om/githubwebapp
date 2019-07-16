/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define([],function(){"use strict";return{aggregations:{customToolbar:{ignore:true},semanticObjectController:{ignore:true},noData:{ignore:true}},annotations:{sortable:{namespace:"Org.OData.Capabilities.V1",annotation:"SortRestrictions/NonSortableProperties",target:["EntitySet"],defaultValue:true,interpretation:"exclude",appliesTo:["columns/#"],group:["Behavior"],since:"1.28.1"},filterable:{namespace:"Org.OData.Capabilities.V1",annotation:"FilterRestrictions/NonFilterableProperties",target:["EntitySet"],defaultValue:true,interpretation:"exclude",appliesTo:["columns/#"],group:["Behavior"],since:"1.28.1"},columnLabelOnProperty:{namespace:"com.sap.vocabularies.Common.v1",annotation:"Label",target:["Property","PropertyPath"],defaultValue:null,appliesTo:["columns/#/label"],group:["Appearance","Behavior"],since:"1.28.1"},columnLabelOnLineItem:{namespace:"com.sap.vocabularies.UI.v1",annotation:"LineItem/Label",target:["Property","Parameter"],defaultValue:null,appliesTo:["columns/#/label"],group:["Behavior"],since:"1.28.1"},columnVisible:{namespace:"com.sap.vocabularies.Common.v1",annotation:"FieldControlType/Hidden",target:["Property"],defaultValue:false,appliesTo:["columns/#/visible"],group:["Behavior"],since:"1.28.1"},columnCurrencyCode:{namespace:"Org.OData.Measures.V1",annotation:"ISOCurrency",target:["Property"],defaultValue:null,appliesTo:["columns/#/cellContent"],group:["Behavior"],since:"1.28.1"},columnUnitOfMeasure:{namespace:"Org.OData.Measures.V1",annotation:"Unit",target:["Property"],defaultValue:null,appliesTo:["columns/#/cellContent"],group:["Behavior"],since:"1.28.1"},columnUpperCase:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsUpperCase",target:["Property","Parameter"],defaultValue:true,appliesTo:["columns/#","columns/#/cellContent"],group:["Behavior"],since:"1.28.1"},lineItem:{namespace:"com.sap.vocabularies.UI.v1",annotation:"LineItem",target:["EntityType"],defaultValue:null,appliesTo:["columns"],group:["Behavior"],since:"1.28.1"},presentationVariant:{namespace:"com.sap.vocabularies.UI.v1",annotation:"PresentationVariant",target:["EntitySet","EntityType"],defaultValue:null,appliesTo:["columns"],group:["Behavior"],since:"1.28.1"},columnImportance:{namespace:"com.sap.vocabularies.UI.v1",annotation:"Importance",target:["Record","Annotation"],defaultValue:null,appliesTo:["columns/#/visible"],group:["Behavior"],since:"1.28.1"},columnDataField:{namespace:"com.sap.vocabularies.UI.v1",annotation:"LineItem/DataField",target:["Record"],defaultValue:null,appliesTo:["columns/cellContent"],group:["Behavior"],since:"1.28.1"},columnDataFieldWithUrl:{namespace:"com.sap.vocabularies.UI.v1",annotation:"LineItem/DataFieldWithUrl",target:["Record"],defaultValue:null,appliesTo:["columns/cellContent"],group:["Behavior"],since:"1.38.1"},columnCriticality:{namespace:"com.sap.vocabularies.UI.v1",annotation:"CriticalityType",target:["PropertyPath"],defaultValue:null,appliesTo:["columns/criticality"],group:["Behavior"],since:"1.38.1"},columnCriticalityRepresentationType:{namespace:"com.sap.vocabularies.UI.v1",annotation:"CriticalityRepresentationType/WithoutIcon",target:["Property"],interpretation:"excludeIcon",defaultValue:null,appliesTo:["columns/criticalityIcon"],group:["Behavior"],since:"1.38.1"},semanticKey:{namespace:"com.sap.vocabularies.Common.v1",annotation:"SemanticKey",target:["EntityType"],defaultValue:null,appliesTo:["columns/cellContent"],group:["Behavior"],since:"1.38.1"},columnIsImageUrl:{namespace:"com.sap.vocabularies.Common.v1",annotation:"IsImageUrl",target:["Property"],defaultValue:true,appliesTo:["columns/image"],group:["Behavior"],since:"1.38.1"}},customData:{useSmartField:{type:"boolean",defaultValue:false,group:["Appearance","Behavior"],since:"1.28.1"},dateFormatSettings:{type:"string",defaultValue:"{ UTC : true }",group:["Appearance"],since:"1.28.1"},currencyFormatSettings:{type:"string",defaultValue:null,appliesTo:["cellContent"],since:"1.28.1"},columnKey:{type:"string",defaultValue:null,group:["Behavior"],since:"1.28.1"},sortProperty:{type:"string",defaultValue:null,group:["Behavior"],since:"1.28.1"},filterProperty:{type:"string",defaultValue:null,group:["Behavior"],since:"1.28.1"},type:{type:"string",defaultValue:null,group:["Behavior"],since:"1.28.1"},maxLength:{type:"string",defaultValue:null,group:["Appearance"],since:"1.28.1"},precision:{type:"string",defaultValue:null,group:["Appearance"],since:"1.28.1"},scale:{type:"string",defaultValue:null,group:["Appearance"],since:"1.28.1"}},properties:{entitySet:{ignore:true},smartFilterId:{ignore:true},ignoredFields:{ignore:true},initiallyVisibleFields:{ignore:true},requestAtLeastFields:{ignore:true},ignoreFromPersonalisation:{ignore:true},tableType:{ignore:true},useVariantManagement:{ignore:true},showVariantManagement:{ignore:false},useExportToExcel:{ignore:false},useTablePersonalisation:{ignore:true},showTablePersonalisation:{ignore:false},showRowCount:{ignore:false},header:{ignore:false},toolbarStyleClass:{ignore:true},enableCustomFilter:{ignore:true},persistencyKey:{ignore:true},useOnlyOneSolidToolbar:{ignore:true},currentVariantId:{ignore:true},editable:{ignore:false},enableAutoBinding:{ignore:true},tableBindingPath:{ignore:true},editTogglable:{ignore:true},demandPopin:{ignore:false},showFullScreenButton:{ignore:true}}};},false);
