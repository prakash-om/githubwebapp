/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2016 SAP SE. All rights reserved
 */
sap.ui.define([],function(){"use strict";function r(M){var R=M.getSemanticallyRelatedMeasures();var o={};if(R){if(R.projectedValueMeasure){o.projected=R.projectedValueMeasure;}if(R.referenceValueMeasure){o.reference=R.referenceValueMeasure;}return o;}return o;}function c(M){var C=M.reduce(function(C,o){C[o.getName()]={msr:o,sem:o.getSemantics()||"actual",rel:r(o)};return C;},{});jQuery.each(C,function(s,o){if(o.sem==="actual"){jQuery.each(o.rel,function(S,t){if(C[t].sem!==S){delete o.rel[S];}});}});return C;}function m(M,s){var t=[];jQuery.each(M.slice().sort(function(a,b){var d=s[a.getName()].sem,e=s[b.getName()].sem;if(d<e){return-1;}else if(d>e){return 1;}else{return M.indexOf(a)-M.indexOf(b);}}),function(i,o){var n=o.getName();if(!s[n]){return;}var S=s[n];var T={};T[S.sem]=n;if(S.sem==="actual"){if(S.rel.projected&&s[S.rel.projected]){T.projected=S.rel.projected;delete s[S.rel.projected];}if(S.rel.reference&&s[S.rel.reference]){T.reference=S.rel.reference;delete s[S.rel.reference];}delete s[n];}t.push(T);});return t;}return{getTuples:function(M){return m(M,c(M));}};});
