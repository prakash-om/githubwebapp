/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define(['sap/chart/data/TimeDimension','sap/chart/utils/MeasureSemantics'],function(T,M){"use strict";function R(f){this._sFeedingId=f;}R.prototype.toFeedingId=function(d){return this._sFeedingId;};function a(){this._bTimeFed=false;}R.TimeCategory=a;a.prototype=Object.create(R.prototype);a.prototype.toFeedingId=function(d){if(d instanceof T&&!this._bTimeFed){this._bTimeFed=true;return"timeAxis";}else{return"@context";}};function t(A){while(A.length&&!A[A.length-1]){A.pop();}return A;}R.semantics={semanticBulletMsrs:function(m){var b=m["@semanticBulletMsrs"];var c=b.reduce(function(c,o){c[o.getName()]=o;return c;},{});var s=M.getTuples(b);var S={actualValues:[],forecastValues:[],targetValues:[]};jQuery.each(s,function(i,o){S.actualValues.push(o.actual?c[o.actual]:null);S.forecastValues.push(o.projected?c[o.projected]:null);S.targetValues.push(o.reference?c[o.reference]:null);});Object.keys(S).forEach(function(k){S[k]=t(S[k]);});delete m["@semanticBulletMsrs"];jQuery.extend(m,S);}};return R;});
