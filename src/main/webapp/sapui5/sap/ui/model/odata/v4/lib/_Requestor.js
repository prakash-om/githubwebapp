/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./_Batch","./_Helper"],function(q,_,a){"use strict";var f={"Content-Type":"application/json;charset=UTF-8;IEEE754Compatible=true"},p={"Accept":"application/json;odata.metadata=minimal;IEEE754Compatible=true"},P={"Accept":"application/json;odata.metadata=minimal;IEEE754Compatible=true","OData-MaxVersion":"4.0","OData-Version":"4.0","X-CSRF-Token":"Fetch"};function d(r,G){var b=r.mBatchQueue[G];if(b[0].length===0&&b.length===1){delete r.mBatchQueue[G];}}function g(h){var r;h=h.toLowerCase();for(r in this.headers){if(r.toLowerCase()===h){return this.headers[r];}}}function R(s,h,Q,o){this.mBatchQueue={};this.mHeaders=h||{};this.fnOnCreateGroup=o;this.sQueryParams=a.buildQuery(Q);this.mRunningChangeRequests={};this.oSecurityTokenPromise=null;this.sServiceUrl=s;}R.prototype.batchRequestSent=function(G,h){if(h){if(G in this.mRunningChangeRequests){this.mRunningChangeRequests[G]+=1;}else{this.mRunningChangeRequests[G]=1;}}};R.prototype.batchResponseReceived=function(G,h){if(h){this.mRunningChangeRequests[G]-=1;if(this.mRunningChangeRequests[G]===0){delete this.mRunningChangeRequests[G];}}};R.prototype.cancelChangeRequests=function(F,G){var c=false,t=this;function b(s){var B=t.mBatchQueue[s],C,e,E,i;e=B[0];for(i=e.length-1;i>=0;i--){C=e[i];if(C.$cancel&&F(C)){C.$cancel();E=new Error("Request canceled: "+C.method+" "+C.url+"; group: "+s);E.canceled=true;C.$reject(E);e.splice(i,1);c=true;}}d(t,s);}if(G){if(this.mBatchQueue[G]){b(G);}}else{for(G in this.mBatchQueue){b(G);}}return c;};R.prototype.cancelChanges=function(G){if(this.mRunningChangeRequests[G]){throw new Error("Cannot cancel the changes for group '"+G+"', the batch request is running");}this.cancelChangeRequests(function(){return true;},G);};R.prototype.getServiceUrl=function(){return this.sServiceUrl;};R.prototype.hasPendingChanges=function(){var G,b;for(G in this.mBatchQueue){b=this.mBatchQueue[G][0].some(function(r){return r.$cancel;});if(b){return true;}}return Object.keys(this.mRunningChangeRequests).length>0;};R.prototype.refreshSecurityToken=function(){var t=this;if(!this.oSecurityTokenPromise){this.oSecurityTokenPromise=new Promise(function(r,b){q.ajax(t.sServiceUrl+t.sQueryParams,{method:"HEAD",headers:{"X-CSRF-Token":"Fetch"}}).then(function(D,T,j){t.mHeaders["X-CSRF-Token"]=j.getResponseHeader("X-CSRF-Token");t.oSecurityTokenPromise=null;r();},function(j,T,e){t.oSecurityTokenPromise=null;b(a.createError(j));});});}return this.oSecurityTokenPromise;};R.prototype.removePatch=function(o){var c=this.cancelChangeRequests(function(C){return C.$promise===o;});if(!c){throw new Error("Cannot reset the changes, the batch request is running");}};R.prototype.removePost=function(G,b){var c=this.cancelChangeRequests(function(C){return C.body===b;},G);if(!c){throw new Error("Cannot reset the changes, the batch request is running");}};R.prototype.request=function(m,r,G,h,o,s,c,i){var t=this,b,I=r==="$batch",e,j,k;G=G||"$direct";if(I){b=_.serializeBatchRequest(o);e=b.body;}else{if(G!=="$direct"){j=new Promise(function(l,n){var u=t.mBatchQueue[G];if(!u){u=t.mBatchQueue[G]=[[]];if(t.fnOnCreateGroup){t.fnOnCreateGroup(G);}}k={method:m,url:r,headers:q.extend({},p,t.mHeaders,h,f),body:o,$cancel:c,$reject:n,$resolve:l,$submit:s};if(m==="GET"){u.push(k);}else{u[0].push(k);}});k.$promise=j;return j;}e=JSON.stringify(o);if(s){s();}}return new Promise(function(l,n){q.ajax(t.sServiceUrl+r+(I?t.sQueryParams:""),{data:e,headers:q.extend({},P,t.mHeaders,h,I?b.headers:f),method:m}).then(function(o,T,u){t.mHeaders["X-CSRF-Token"]=u.getResponseHeader("X-CSRF-Token")||t.mHeaders["X-CSRF-Token"];if(I){o=_.deserializeBatchResponse(u.getResponseHeader("Content-Type"),o);}l(o);},function(u,T,E){var C=u.getResponseHeader("X-CSRF-Token");if(!i&&u.status===403&&C&&C.toLowerCase()==="required"){t.refreshSecurityToken().then(function(){l(t.request(m,r,G,h,o,undefined,undefined,true));},n);}else{n(a.createError(u));}});});};R.prototype.relocate=function(c,b,n){var r=this.mBatchQueue[c],t=this,F=r&&r[0].some(function(C,i){if(C.body===b){t.request(C.method,C.url,n,C.headers,b,C.$submit,C.$cancel).then(C.$resolve,C.$reject);r[0].splice(i,1);d(t,c);return true;}});if(!F){throw new Error("Request not found in group '"+c+"'");}};R.prototype.submitBatch=function(G){var c=[],h,o,r=this.mBatchQueue[G],t=this;function m(o,C){var B,i,s;if(o&&o.method==="PATCH"&&C.method==="PATCH"&&o.url===C.url&&q.sap.equal(o.headers,C.headers)){i=o.body;B=C.body;for(s in i){if(i[s]===null&&B[s]&&typeof B[s]==="object"){return undefined;}}return q.extend(true,i,B);}return undefined;}function v(r,i){var C;r.forEach(function(j,k){var E,l=i[k];if(Array.isArray(l)){v(j,l);}else if(!l){E=new Error("HTTP request was not processed because the previous request failed");E.cause=C;j.$reject(E);}else if(l.status>=400){l.getResponseHeader=g;C=a.createError(l);e(C,j);}else if(l.responseText){j.$resolve(JSON.parse(l.responseText));}else{j.$resolve();}});}function b(i){if(Array.isArray(i)){i.forEach(b);}else if(i.$submit){i.$submit();}}function e(E,i){if(Array.isArray(i)){i.forEach(e.bind(null,E));}else{i.$reject(E);}}if(!r){return Promise.resolve();}delete this.mBatchQueue[G];b(r);r[0].forEach(function(C){var M=m(o,C);if(M){o.body=M;C.$resolve(o.$promise);}else{c.push(C);o=C;}});if(c.length===0){r.splice(0,1);}else if(c.length===1){r[0]=c[0];}else{r[0]=c;}h=c.length>0;this.batchRequestSent(G,h);return this.request("POST","$batch",undefined,undefined,r).then(function(i){t.batchResponseReceived(G,h);v(r,i);}).catch(function(E){var i=new Error("HTTP request was not processed because $batch failed");function j(r){r.forEach(function(k){if(Array.isArray(k)){j(k);}else{k.$reject(i);}});}t.batchResponseReceived(G,h);i.cause=E;j(r);throw E;});};return{create:function(s,h,Q,o){return new R(s,h,Q,o);}};},false);