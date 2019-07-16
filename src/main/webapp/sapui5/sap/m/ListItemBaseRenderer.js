/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2016 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/IconPool','sap/ui/core/theming/Parameters'],function(q,I,P){"use strict";var L={};var a={};L.renderInvisible=function(r,l){this.openItemTag(r,l);r.writeInvisiblePlaceholderData(l);r.write(">");this.closeItemTag(r,l);};L.isModeMatched=function(m,o){var O=(sap.m.ListBaseRenderer||{}).ModeOrder||{};return(O[m]==o);};L.renderMode=function(r,l,o){var m=l.getMode();if(!this.isModeMatched(m,o)){return;}var M=l.getModeControl(true);if(M){this.renderModeContent(r,l,M);}};L.renderModeContent=function(r,l,m){var M=l.getMode(),b={Delete:"D",MultiSelect:"M",SingleSelect:"S",SingleSelectLeft:"SL"};r.write("<div");r.writeAttribute("id",l.getId()+"-mode");r.addClass("sapMLIBSelect"+b[M]);this.decorateMode(r,l);r.writeClasses();r.writeStyles();r.write(">");r.renderControl(m);r.write("</div>");};L.decorateMode=function(r,l){if(!sap.ui.getCore().getConfiguration().getAnimation()||!l.getListProperty("modeAnimationOn")){return;}var m=l.getMode(),s=l.getListProperty("lastMode");if(!s||s==m){return;}if(m==sap.m.ListMode.None){r.addClass("sapMLIBUnselectAnimation");}else{r.addClass("sapMLIBSelectAnimation");}};L.renderCounter=function(r,l){var c=l.getCounter();if(c){this.renderCounterContent(r,l,c);}};L.renderCounterContent=function(r,l,c){r.write("<div");r.writeAttribute("id",l.getId()+"-counter");var A=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("LIST_ITEM_COUNTER",c);r.writeAttribute("aria-label",A);r.addClass("sapMLIBCounter");r.writeClasses();r.write(">");r.write(c);r.write("</div>");};L.renderType=function(r,l){var t=l.getTypeControl();if(t){r.renderControl(t);}};L.openItemTag=function(r,l){r.write("<li");};L.closeItemTag=function(r,l){r.write("</li>");};L.renderTabIndex=function(r,l){r.writeAttribute("tabindex","-1");};L.renderTooltip=function(r,l){var t=l.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t);}};L.addFocusableClasses=function(r,l){if(sap.ui.Device.system.desktop){r.addClass("sapMLIBFocusable");this.addLegacyOutlineClass(r,l);}};L.addLegacyOutlineClass=function(r,l){if(sap.ui.Device.browser.msie){r.addClass("sapMLIBLegacyOutline");}};L.getAriaAnnouncement=function(k,b){if(a[k]){return a[k];}b=b||"LIST_ITEM_"+k.toUpperCase();a[k]=new sap.ui.core.InvisibleText({text:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText(b)}).toStatic().getId();return a[k];};L.getAriaRole=function(l){return"option";};L.getAriaLabelledBy=function(l){if(l.getAriaLabelledBy().length){return l.getId();}};L.getAriaDescribedBy=function(l){var d=[],t=l.getType(),T=sap.m.ListType;if(l.getListProperty("showUnread")&&l.getUnread()){d.push(this.getAriaAnnouncement("unread"));}if(l.getMode()==sap.m.ListMode.Delete){d.push(this.getAriaAnnouncement("deletable"));}if(t==T.Navigation){d.push(this.getAriaAnnouncement("navigation"));}else{if(t==T.Detail||t==T.DetailAndActive){d.push(this.getAriaAnnouncement("detail"));}if(t==T.Active||t==T.DetailAndActive){d.push(this.getAriaAnnouncement("active"));}}return d.join(" ");};L.getAccessibilityState=function(l){var A=this.getAriaLabelledBy(l),s=this.getAriaDescribedBy(l),m={role:this.getAriaRole(l)};if(l.isSelectable()){m.selected=l.getProperty("selected");}if(A){m.labelledby={value:A.trim(),append:true};}if(s){m.describedby={value:s.trim(),append:true};}return m;};L.renderLIContent=function(r,l){};L.renderLIAttributes=function(r,l){};L.renderContentFormer=function(r,l){this.renderMode(r,l,-1);};L.renderContentLatter=function(r,l){this.renderCounter(r,l);this.renderType(r,l);this.renderMode(r,l,1);};L.renderLIContentWrapper=function(r,l){r.write('<div class="sapMLIBContent"');r.writeAttribute("id",l.getId()+"-content");r.write(">");this.renderLIContent(r,l);r.write('</div>');};L.render=function(r,l){if(!l.getVisible()){this.renderInvisible(r,l);return false;}this.openItemTag(r,l);r.writeControlData(l);r.addClass("sapMLIB");r.addClass("sapMLIB-CTX");r.addClass("sapMLIBShowSeparator");r.addClass("sapMLIBType"+l.getType());if(sap.ui.Device.system.desktop&&l.isActionable()){r.addClass("sapMLIBActionable");r.addClass("sapMLIBHoverable");}if(l.getSelected()){r.addClass("sapMLIBSelected");}if(l.getListProperty("showUnread")&&l.getUnread()){r.addClass("sapMLIBUnread");}this.addFocusableClasses(r,l);this.renderTooltip(r,l);this.renderTabIndex(r,l);if(sap.ui.getCore().getConfiguration().getAccessibility()){r.writeAccessibilityState(l,this.getAccessibilityState(l));}this.renderLIAttributes(r,l);r.writeClasses();r.writeStyles();r.write(">");this.renderContentFormer(r,l);this.renderLIContentWrapper(r,l);this.renderContentLatter(r,l);this.closeItemTag(r,l);};return L;},true);
