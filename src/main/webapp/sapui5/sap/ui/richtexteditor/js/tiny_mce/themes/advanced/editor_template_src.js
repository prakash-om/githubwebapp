(function(d){var D=d.DOM,E=d.dom.Event,g=d.extend,j=d.each,C=d.util.Cookie,l,m=d.explode;function q(e,f){var n,p,a=e.dom,b='',c,h;previewStyles=e.settings.preview_styles;if(previewStyles===false)return'';if(!previewStyles)previewStyles='font-family font-size font-weight text-decoration text-transform color background-color';function r(v){return v.replace(/%(\w+)/g,'');};n=f.block||f.inline||'span';p=a.create(n);j(f.styles,function(v,n){v=r(v);if(v)a.setStyle(p,n,v);});j(f.attributes,function(v,n){v=r(v);if(v)a.setAttrib(p,n,v);});j(f.classes,function(v){v=r(v);if(!a.hasClass(p,v))a.addClass(p,v);});a.setStyles(p,{position:'absolute',left:-0xFFFF});e.getBody().appendChild(p);c=a.getStyle(e.getBody(),'fontSize',true);c=/px$/.test(c)?parseInt(c,10):0;j(previewStyles.split(' '),function(n){var v=a.getStyle(p,n,true);if(n=='background-color'&&/transparent|rgba\s*\([^)]+,\s*0\)/.test(v)){v=a.getStyle(e.getBody(),n,true);if(a.toHex(v).toLowerCase()=='#ffffff'){return;}}if(n=='font-size'){if(/em|%$/.test(v)){if(c===0){return;}v=parseFloat(v,10)/(/%$/.test(v)?100:1);v=(v*c)+'px';}}b+=n+':'+v+';';});a.remove(p);return b;};d.ThemeManager.requireLangPack('advanced');d.create('tinymce.themes.AdvancedTheme',{sizes:[8,10,12,14,18,24,36],controls:{bold:['bold_desc','Bold'],italic:['italic_desc','Italic'],underline:['underline_desc','Underline'],strikethrough:['striketrough_desc','Strikethrough'],justifyleft:['justifyleft_desc','JustifyLeft'],justifycenter:['justifycenter_desc','JustifyCenter'],justifyright:['justifyright_desc','JustifyRight'],justifyfull:['justifyfull_desc','JustifyFull'],bullist:['bullist_desc','InsertUnorderedList'],numlist:['numlist_desc','InsertOrderedList'],outdent:['outdent_desc','Outdent'],indent:['indent_desc','Indent'],cut:['cut_desc','Cut'],copy:['copy_desc','Copy'],paste:['paste_desc','Paste'],undo:['undo_desc','Undo'],redo:['redo_desc','Redo'],link:['link_desc','mceLink'],unlink:['unlink_desc','unlink'],image:['image_desc','mceImage'],cleanup:['cleanup_desc','mceCleanup'],help:['help_desc','mceHelp'],code:['code_desc','mceCodeEditor'],hr:['hr_desc','InsertHorizontalRule'],removeformat:['removeformat_desc','RemoveFormat'],sub:['sub_desc','subscript'],sup:['sup_desc','superscript'],forecolor:['forecolor_desc','ForeColor'],forecolorpicker:['forecolor_desc','mceForeColor'],backcolor:['backcolor_desc','HiliteColor'],backcolorpicker:['backcolor_desc','mceBackColor'],charmap:['charmap_desc','mceCharMap'],visualaid:['visualaid_desc','mceToggleVisualAid'],anchor:['anchor_desc','mceInsertAnchor'],newdocument:['newdocument_desc','mceNewDocument'],blockquote:['blockquote_desc','mceBlockQuote']},stateControls:['bold','italic','underline','strikethrough','bullist','numlist','justifyleft','justifycenter','justifyright','justifyfull','sub','sup','blockquote'],init:function(e,u){var t=this,s,v,o;t.editor=e;t.url=u;t.onResolveName=new d.util.Dispatcher(this);s=e.settings;e.forcedHighContrastMode=e.settings.detect_highcontrast&&t._isHighContrast();e.settings.skin=e.forcedHighContrastMode?'highcontrast':e.settings.skin;if(!s.theme_advanced_buttons1){s=g({theme_advanced_buttons1:"bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect",theme_advanced_buttons2:"bullist,numlist,|,outdent,indent,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code",theme_advanced_buttons3:"hr,removeformat,visualaid,|,sub,sup,|,charmap"},s);}t.settings=s=g({theme_advanced_path:true,theme_advanced_toolbar_location:'top',theme_advanced_blockformats:"p,address,pre,h1,h2,h3,h4,h5,h6",theme_advanced_toolbar_align:"left",theme_advanced_statusbar_location:"bottom",theme_advanced_fonts:"Andale Mono=andale mono,monospace;Arial=arial,helvetica,sans-serif;Arial Black=arial black,sans-serif;Book Antiqua=book antiqua,palatino,serif;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier,monospace;Georgia=georgia,palatino,serif;Helvetica=helvetica,arial,sans-serif;Impact=impact,sans-serif;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco,monospace;Times New Roman=times new roman,times,serif;Trebuchet MS=trebuchet ms,geneva,sans-serif;Verdana=verdana,geneva,sans-serif;Webdings=webdings;Wingdings=wingdings,zapf dingbats",theme_advanced_more_colors:1,theme_advanced_row_height:23,theme_advanced_resize_horizontal:1,theme_advanced_resizing_use_cookie:1,theme_advanced_font_sizes:"1,2,3,4,5,6,7",theme_advanced_font_selector:"span",theme_advanced_show_current_color:0,readonly:e.settings.readonly},s);if(!s.font_size_style_values)s.font_size_style_values="8pt,10pt,12pt,14pt,18pt,24pt,36pt";if(d.is(s.theme_advanced_font_sizes,'string')){s.font_size_style_values=d.explode(s.font_size_style_values);s.font_size_classes=d.explode(s.font_size_classes||'');o={};e.settings.theme_advanced_font_sizes=s.theme_advanced_font_sizes;j(e.getParam('theme_advanced_font_sizes','','hash'),function(v,k){var c;if(k==v&&v>=1&&v<=7){k=v+' ('+t.sizes[v-1]+'pt)';c=s.font_size_classes[v-1];v=s.font_size_style_values[v-1]||(t.sizes[v-1]+'pt');}if(/^\s*\./.test(v))c=v.replace(/\./g,'');o[k]=c?{'class':c}:{fontSize:v};});s.theme_advanced_font_sizes=o;}if((v=s.theme_advanced_path_location)&&v!='none')s.theme_advanced_statusbar_location=s.theme_advanced_path_location;if(s.theme_advanced_statusbar_location=='none')s.theme_advanced_statusbar_location=0;if(e.settings.content_css!==false)e.contentCSS.push(e.baseURI.toAbsolute(u+"/skins/"+e.settings.skin+"/content.css"));e.onInit.add(function(){if(!e.settings.readonly){e.onNodeChange.add(t._nodeChanged,t);e.onKeyUp.add(t._updateUndoStatus,t);e.onMouseUp.add(t._updateUndoStatus,t);e.dom.bind(e.dom.getRoot(),'dragend',function(){t._updateUndoStatus(e);});}});e.onSetProgressState.add(function(e,b,a){var c,i=e.id,f;if(b){t.progressTimer=setTimeout(function(){c=e.getContainer();c=c.insertBefore(D.create('DIV',{style:'position:relative'}),c.firstChild);f=D.get(e.id+'_tbl');D.add(c,'div',{id:i+'_blocker','class':'mceBlocker',style:{width:f.clientWidth+2,height:f.clientHeight+2}});D.add(c,'div',{id:i+'_progress','class':'mceProgress',style:{left:f.clientWidth/2,top:f.clientHeight/2}});},a||0);}else{D.remove(i+'_blocker');D.remove(i+'_progress');clearTimeout(t.progressTimer);}});D.loadCSS(s.editor_css?e.documentBaseURI.toAbsolute(s.editor_css):u+"/skins/"+e.settings.skin+"/ui.css");if(s.skin_variant)D.loadCSS(u+"/skins/"+e.settings.skin+"/ui_"+s.skin_variant+".css");},_isHighContrast:function(){var a,b=D.add(D.getRoot(),'div',{'style':'background-color: rgb(171,239,86);'});a=(D.getStyle(b,'background-color',true)+'').toLowerCase().replace(/ /g,'');D.remove(b);return a!='rgb(171,239,86)'&&a!='#abef56';},createControl:function(n,a){var b,c;if(c=a.createControl(n))return c;switch(n){case"styleselect":return this._createStyleSelect();case"formatselect":return this._createBlockFormats();case"fontselect":return this._createFontSelect();case"fontsizeselect":return this._createFontSizeSelect();case"forecolor":return this._createForeColorMenu();case"backcolor":return this._createBackColorMenu();}if((b=this.controls[n]))return a.createButton(n,{title:"advanced."+b[0],cmd:b[1],ui:b[2],value:b[3]});},execCommand:function(c,u,v){var f=this['_'+c];if(f){f.call(this,u,v);return true;}return false;},_importClasses:function(e){var a=this.editor,c=a.controlManager.get('styleselect');if(c.getLength()==0){j(a.dom.getClasses(),function(o,i){var n='style_'+i,f;f={inline:'span',attributes:{'class':o['class']},selector:'*'};a.formatter.register(n,f);c.add(o['class'],n,{style:function(){return q(a,f);}});});}},_createStyleSelect:function(n){var t=this,e=t.editor,c=e.controlManager,a;a=c.createListBox('styleselect',{title:'advanced.style_select',onselect:function(b){var f,h=[],r;j(a.items,function(i){h.push(i.value);});e.focus();e.undoManager.add();f=e.formatter.matchAll(h);d.each(f,function(i){if(!b||i==b){if(i)e.formatter.remove(i);r=true;}});if(!r)e.formatter.apply(b);e.undoManager.add();e.nodeChanged();return false;}});e.onPreInit.add(function(){var b=0,f=e.getParam('style_formats');if(f){j(f,function(h){var i,k=0;j(h,function(){k++;});if(k>1){i=h.name=h.name||'style_'+(b++);e.formatter.register(i,h);a.add(h.title,i,{style:function(){return q(e,h);}});}else a.add(h.title);});}else{j(e.getParam('theme_advanced_styles','','hash'),function(v,k){var h,i;if(v){h='style_'+(b++);i={inline:'span',classes:v,selector:'*'};e.formatter.register(h,i);a.add(t.editor.translate(k),h,{style:function(){return q(e,i);}});}});}});if(a.getLength()==0){a.onPostRender.add(function(e,n){if(!a.NativeListBox){E.add(n.id+'_text','focus',t._importClasses,t);E.add(n.id+'_text','mousedown',t._importClasses,t);E.add(n.id+'_open','focus',t._importClasses,t);E.add(n.id+'_open','mousedown',t._importClasses,t);}else E.add(n.id,'focus',t._importClasses,t);});}return a;},_createFontSelect:function(){var c,t=this,e=t.editor;c=e.controlManager.createListBox('fontselect',{title:'advanced.fontdefault',onselect:function(v){var a=c.items[c.selectedIndex];if(!v&&a){e.execCommand('FontName',false,a.value);return;}e.execCommand('FontName',false,v);c.select(function(s){return v==s;});if(a&&a.value==v){c.select(null);}return false;}});if(c){j(e.getParam('theme_advanced_fonts',t.settings.theme_advanced_fonts,'hash'),function(v,k){c.add(e.translate(k),v,{style:v.indexOf('dings')==-1?'font-family:'+v:''});});}return c;},_createFontSizeSelect:function(){var t=this,e=t.editor,c,i=0,a=[];c=e.controlManager.createListBox('fontsizeselect',{title:'advanced.font_size',onselect:function(v){var b=c.items[c.selectedIndex];if(!v&&b){b=b.value;if(b['class']){e.formatter.toggle('fontsize_class',{value:b['class']});e.undoManager.add();e.nodeChanged();}else{e.execCommand('FontSize',false,b.fontSize);}return;}if(v['class']){e.focus();e.undoManager.add();e.formatter.toggle('fontsize_class',{value:v['class']});e.undoManager.add();e.nodeChanged();}else e.execCommand('FontSize',false,v.fontSize);c.select(function(s){return v==s;});if(b&&(b.value.fontSize==v.fontSize||b.value['class']&&b.value['class']==v['class'])){c.select(null);}return false;}});if(c){j(t.settings.theme_advanced_font_sizes,function(v,k){var f=v.fontSize;if(f>=1&&f<=7)f=t.sizes[parseInt(f)-1]+'pt';c.add(k,v,{'style':'font-size:'+f,'class':'mceFontSize'+(i++)+(' '+(v['class']||''))});});}return c;},_createBlockFormats:function(){var c,f={p:'advanced.paragraph',address:'advanced.address',pre:'advanced.pre',h1:'advanced.h1',h2:'advanced.h2',h3:'advanced.h3',h4:'advanced.h4',h5:'advanced.h5',h6:'advanced.h6',div:'advanced.div',blockquote:'advanced.blockquote',code:'advanced.code',dt:'advanced.dt',dd:'advanced.dd',samp:'advanced.samp'},t=this;c=t.editor.controlManager.createListBox('formatselect',{title:'advanced.block',onselect:function(v){t.editor.execCommand('FormatBlock',false,v);return false;}});if(c){j(t.editor.getParam('theme_advanced_blockformats',t.settings.theme_advanced_blockformats,'hash'),function(v,k){c.add(t.editor.translate(k!=v?k:f[v]),v,{'class':'mce_formatPreview mce_'+v,style:function(){return q(t.editor,{block:v});}});});}return c;},_createForeColorMenu:function(){var c,t=this,s=t.settings,o={},v;if(s.theme_advanced_more_colors){o.more_colors_func=function(){t._mceColorPicker(0,{color:c.value,func:function(a){c.setColor(a);}});};}if(v=s.theme_advanced_text_colors)o.colors=v;if(s.theme_advanced_default_foreground_color)o.default_color=s.theme_advanced_default_foreground_color;o.title='advanced.forecolor_desc';o.cmd='ForeColor';o.scope=this;c=t.editor.controlManager.createColorSplitButton('forecolor',o);return c;},_createBackColorMenu:function(){var c,t=this,s=t.settings,o={},v;if(s.theme_advanced_more_colors){o.more_colors_func=function(){t._mceColorPicker(0,{color:c.value,func:function(a){c.setColor(a);}});};}if(v=s.theme_advanced_background_colors)o.colors=v;if(s.theme_advanced_default_background_color)o.default_color=s.theme_advanced_default_background_color;o.title='advanced.backcolor_desc';o.cmd='HiliteColor';o.scope=this;c=t.editor.controlManager.createColorSplitButton('backcolor',o);return c;},renderUI:function(o){var n,i,a,t=this,b=t.editor,s=t.settings,c,p,f;if(b.settings){b.settings.aria_label=s.aria_label+b.getLang('advanced.help_shortcut');}n=p=D.create('span',{role:'application','aria-labelledby':b.id+'_voice',id:b.id+'_parent','class':'mceEditor '+b.settings.skin+'Skin'+(s.skin_variant?' '+b.settings.skin+'Skin'+t._ufirst(s.skin_variant):'')+(b.settings.directionality=="rtl"?' mceRtl':'')});D.add(n,'span',{'class':'mceVoiceLabel','style':'display:none;',id:b.id+'_voice'},s.aria_label);if(!D.boxModel)n=D.add(n,'div',{'class':'mceOldBoxModel'});n=c=D.add(n,'table',{role:"presentation",id:b.id+'_tbl','class':'mceLayout',cellSpacing:0,cellPadding:0});n=a=D.add(n,'tbody');switch((s.theme_advanced_layout_manager||'').toLowerCase()){case"rowlayout":i=t._rowLayout(s,a,o);break;case"customlayout":i=b.execCallback("theme_advanced_custom_layout",s,a,o,p);break;default:i=t._simpleLayout(s,a,o,p);}n=o.targetNode;f=c.rows;D.addClass(f[0],'mceFirst');D.addClass(f[f.length-1],'mceLast');j(D.select('tr',a),function(n){D.addClass(n.firstChild,'mceFirst');D.addClass(n.childNodes[n.childNodes.length-1],'mceLast');});if(D.get(s.theme_advanced_toolbar_container))D.get(s.theme_advanced_toolbar_container).appendChild(p);else D.insertAfter(p,n);E.add(b.id+'_path_row','click',function(e){e=e.target;if(e.nodeName=='A'){t._sel(e.className.replace(/^.*mcePath_([0-9]+).*$/,'$1'));return false;}});if(!b.getParam('accessibility_focus'))E.add(D.add(p,'a',{href:'#'},'<!-- IE -->'),'focus',function(){tinyMCE.get(b.id).focus();});if(s.theme_advanced_toolbar_location=='external')o.deltaHeight=0;t.deltaHeight=o.deltaHeight;o.targetNode=null;b.onKeyDown.add(function(b,e){var h=121,k=122;if(e.altKey){if(e.keyCode===h){if(d.isWebKit){window.focus();}t.toolbarGroup.focus();return E.cancel(e);}else if(e.keyCode===k){D.get(b.id+'_path_row').focus();return E.cancel(e);}}});b.addShortcut('alt+0','','mceShortcuts',t);return{iframeContainer:i,editorContainer:b.id+'_parent',sizeContainer:c,deltaHeight:o.deltaHeight};},getInfo:function(){return{longname:'Advanced theme',author:'Moxiecode Systems AB',authorurl:'http://tinymce.moxiecode.com',version:d.majorVersion+"."+d.minorVersion}},resizeBy:function(a,b){var e=D.get(this.editor.id+'_ifr');this.resizeTo(e.clientWidth+a,e.clientHeight+b);},resizeTo:function(w,h,a){var b=this.editor,s=this.settings,e=D.get(b.id+'_tbl'),i=D.get(b.id+'_ifr');w=Math.max(s.theme_advanced_resizing_min_width||100,w);h=Math.max(s.theme_advanced_resizing_min_height||100,h);w=Math.min(s.theme_advanced_resizing_max_width||0xFFFF,w);h=Math.min(s.theme_advanced_resizing_max_height||0xFFFF,h);D.setStyle(e,'height','');D.setStyle(i,'height',h);if(s.theme_advanced_resize_horizontal){D.setStyle(e,'width','');D.setStyle(i,'width',w);if(w<e.clientWidth){w=e.clientWidth;D.setStyle(i,'width',e.clientWidth);}}if(a&&s.theme_advanced_resizing_use_cookie){C.setHash("TinyMCE_"+b.id+"_size",{cw:w,ch:h});}},destroy:function(){var i=this.editor.id;E.clear(i+'_resize');E.clear(i+'_path_row');E.clear(i+'_external_close');},_simpleLayout:function(s,a,o,p){var t=this,b=t.editor,h=s.theme_advanced_toolbar_location,i=s.theme_advanced_statusbar_location,n,k,r,c;if(s.readonly){n=D.add(a,'tr');n=k=D.add(n,'td',{'class':'mceIframeContainer'});return k;}if(h=='top')t._addToolbars(a,o);if(h=='external'){n=c=D.create('div',{style:'position:relative'});n=D.add(n,'div',{id:b.id+'_external','class':'mceExternalToolbar'});D.add(n,'a',{id:b.id+'_external_close',href:'javascript:;','class':'mceExternalClose'});n=D.add(n,'table',{id:b.id+'_tblext',cellSpacing:0,cellPadding:0});r=D.add(n,'tbody');if(p.firstChild.className=='mceOldBoxModel')p.firstChild.appendChild(c);else p.insertBefore(c,p.firstChild);t._addToolbars(r,o);b.onMouseUp.add(function(){var e=D.get(b.id+'_external');D.show(e);D.hide(l);var f=E.add(b.id+'_external_close','click',function(){D.hide(b.id+'_external');E.remove(b.id+'_external_close','click',f);return false;});D.show(e);D.setStyle(e,'top',0-D.getRect(b.id+'_tblext').h-1);D.hide(e);D.show(e);e.style.filter='';l=b.id+'_external';e=null;});}if(i=='top')t._addStatusBar(a,o);if(!s.theme_advanced_toolbar_container){n=D.add(a,'tr');n=k=D.add(n,'td',{'class':'mceIframeContainer'});}if(h=='bottom')t._addToolbars(a,o);if(i=='bottom')t._addStatusBar(a,o);return k;},_rowLayout:function(s,b,o){var t=this,e=t.editor,f,h,k=e.controlManager,n,p,r,a;f=s.theme_advanced_containers_default_class||'';h=s.theme_advanced_containers_default_align||'center';j(m(s.theme_advanced_containers||''),function(c,i){var v=s['theme_advanced_container_'+c]||'';switch(c.toLowerCase()){case'mceeditor':n=D.add(b,'tr');n=p=D.add(n,'td',{'class':'mceIframeContainer'});break;case'mceelementpath':t._addStatusBar(b,o);break;default:a=(s['theme_advanced_container_'+c+'_align']||h).toLowerCase();a='mce'+t._ufirst(a);n=D.add(D.add(b,'tr'),'td',{'class':'mceToolbar '+(s['theme_advanced_container_'+c+'_class']||f)+' '+a||h});r=k.createToolbar("toolbar"+i);t._addControls(v,r);D.setHTML(n,r.renderHTML());o.deltaHeight-=s.theme_advanced_row_height;}});return p;},_addControls:function(v,a){var t=this,s=t.settings,b,e=t.editor.controlManager;if(s.theme_advanced_disable&&!t._disabled){b={};j(m(s.theme_advanced_disable),function(v){b[v]=1;});t._disabled=b;}else b=t._disabled;j(m(v),function(n){var c;if(b&&b[n])return;if(n=='tablecontrols'){j(["table","|","row_props","cell_props","|","row_before","row_after","delete_row","|","col_before","col_after","delete_col","|","split_cells","merge_cells"],function(n){n=t.createControl(n,e);if(n)a.add(n);});return;}c=t.createControl(n,e);if(c)a.add(c);});},_addToolbars:function(c,o){var t=this,i,b,e=t.editor,s=t.settings,v,f=e.controlManager,k,n,h=[],a,p,r=false;p=f.createToolbarGroup('toolbargroup',{'name':e.getLang('advanced.toolbar'),'tab_focus_toolbar':e.getParam('theme_advanced_tab_focus_toolbar')});t.toolbarGroup=p;a=s.theme_advanced_toolbar_align.toLowerCase();a='mce'+t._ufirst(a);n=D.add(D.add(c,'tr',{role:'presentation'}),'td',{'class':'mceToolbar '+a,"role":"toolbar"});for(i=1;(v=s['theme_advanced_buttons'+i]);i++){r=true;b=f.createToolbar("toolbar"+i,{'class':'mceToolbarRow'+i});if(s['theme_advanced_buttons'+i+'_add'])v+=','+s['theme_advanced_buttons'+i+'_add'];if(s['theme_advanced_buttons'+i+'_add_before'])v=s['theme_advanced_buttons'+i+'_add_before']+','+v;t._addControls(v,b);p.add(b);o.deltaHeight-=s.theme_advanced_row_height;}if(!r)o.deltaHeight-=s.theme_advanced_row_height;h.push(p.renderHTML());h.push(D.createHTML('a',{href:'#',accesskey:'z',title:e.getLang("advanced.toolbar_focus"),onfocus:'tinyMCE.getInstanceById(\''+e.id+'\').focus();'},'<!-- IE -->'));D.setHTML(n,h.join(''));},_addStatusBar:function(a,o){var n,t=this,b=t.editor,s=t.settings,r,f,h,i;n=D.add(a,'tr');n=i=D.add(n,'td',{'class':'mceStatusbar'});n=D.add(n,'div',{id:b.id+'_path_row','role':'group','aria-labelledby':b.id+'_path_voice'});if(s.theme_advanced_path){D.add(n,'span',{id:b.id+'_path_voice'},b.translate('advanced.path'));D.add(n,'span',{},': ');}else{D.add(n,'span',{},'&#160;');}if(s.theme_advanced_resizing){D.add(i,'a',{id:b.id+'_resize',href:'javascript:;',onclick:"return false;",'class':'mceResize',tabIndex:"-1"});if(s.theme_advanced_resizing_use_cookie){b.onPostRender.add(function(){var o=C.getHash("TinyMCE_"+b.id+"_size"),c=D.get(b.id+'_tbl');if(!o)return;t.resizeTo(o.cw,o.ch);});}b.onPostRender.add(function(){E.add(b.id+'_resize','click',function(e){e.preventDefault();});E.add(b.id+'_resize','mousedown',function(e){var c,k,p,u,v,w,x,y,z,A,B;function F(e){e.preventDefault();z=x+(e.screenX-v);A=y+(e.screenY-w);t.resizeTo(z,A);};function G(e){E.remove(D.doc,'mousemove',c);E.remove(b.getDoc(),'mousemove',k);E.remove(D.doc,'mouseup',p);E.remove(b.getDoc(),'mouseup',u);z=x+(e.screenX-v);A=y+(e.screenY-w);t.resizeTo(z,A,true);b.nodeChanged();};e.preventDefault();v=e.screenX;w=e.screenY;B=D.get(t.editor.id+'_ifr');x=z=B.clientWidth;y=A=B.clientHeight;c=E.add(D.doc,'mousemove',F);k=E.add(b.getDoc(),'mousemove',F);p=E.add(D.doc,'mouseup',G);u=E.add(b.getDoc(),'mouseup',G);});});}o.deltaHeight-=21;n=a=null;},_updateUndoStatus:function(e){var c=e.controlManager,u=e.undoManager;c.setDisabled('undo',!u.hasUndo()&&!u.typing);c.setDisabled('redo',!u.hasRedo());},_nodeChanged:function(e,a,n,b,o){var t=this,p,f=0,v,c,s=t.settings,h,k,r,w,x,y,z;d.each(t.stateControls,function(c){a.setActive(c,e.queryCommandState(t.controls[c][1]));});function A(u){var i,F=o.parents,G=u;if(typeof(u)=='string'){G=function(H){return H.nodeName==u;};}for(i=0;i<F.length;i++){if(G(F[i]))return F[i];}};a.setActive('visualaid',e.hasVisual);t._updateUndoStatus(e);a.setDisabled('outdent',!e.queryCommandState('Outdent'));p=A('A');if(c=a.get('link')){c.setDisabled((!p&&b)||(p&&!p.href));c.setActive(!!p&&(!p.name&&!p.id));}if(c=a.get('unlink')){c.setDisabled(!p&&b);c.setActive(!!p&&!p.name&&!p.id);}if(c=a.get('anchor')){c.setActive(!b&&!!p&&(p.name||(p.id&&!p.href)));}p=A('IMG');if(c=a.get('image'))c.setActive(!b&&!!p&&n.className.indexOf('mceItem')==-1);if(c=a.get('styleselect')){t._importClasses();y=[];j(c.items,function(i){y.push(i.value);});z=e.formatter.matchAll(y);c.select(z[0]);d.each(z,function(i,u){if(u>0){c.mark(i);}});}if(c=a.get('formatselect')){p=A(e.dom.isBlock);if(p)c.select(p.nodeName.toLowerCase());}A(function(n){if(n.nodeName==='SPAN'){if(!h&&n.className)h=n.className;}if(e.dom.is(n,s.theme_advanced_font_selector)){if(!k&&n.style.fontSize)k=n.style.fontSize;if(!r&&n.style.fontFamily)r=n.style.fontFamily.replace(/[\"\']+/g,'').replace(/^([^,]+).*/,'$1').toLowerCase();if(!w&&n.style.color)w=n.style.color;if(!x&&n.style.backgroundColor)x=n.style.backgroundColor;}return false;});if(c=a.get('fontselect')){c.select(function(v){return v.replace(/^([^,]+).*/,'$1').toLowerCase()==r;});}if(c=a.get('fontsizeselect')){if(s.theme_advanced_runtime_fontsize&&!k&&!h)k=e.dom.getStyle(n,'fontSize',true);c.select(function(v){if(v.fontSize&&v.fontSize===k)return true;if(v['class']&&v['class']===h)return true;});}if(s.theme_advanced_show_current_color){function B(i,u){if(c=a.get(i)){if(!u)u=c.settings.default_color;if(u!==c.value){c.displayColor(u);}}};B('forecolor',w);B('backcolor',x);}if(s.theme_advanced_show_current_color){function B(i,u){if(c=a.get(i)){if(!u)u=c.settings.default_color;if(u!==c.value){c.displayColor(u);}}};B('forecolor',w);B('backcolor',x);}if(s.theme_advanced_path&&s.theme_advanced_statusbar_location){p=D.get(e.id+'_path')||D.add(e.id+'_path_row','span',{id:e.id+'_path'});if(t.statusKeyboardNavigation){t.statusKeyboardNavigation.destroy();t.statusKeyboardNavigation=null;}D.setHTML(p,'');A(function(n){var i=n.nodeName.toLowerCase(),u,F,G='';if(n.nodeType!=1||i==='br'||n.getAttribute('data-mce-bogus')||D.hasClass(n,'mceItemHidden')||D.hasClass(n,'mceItemRemoved'))return;if(d.isIE&&n.scopeName!=='HTML'&&n.scopeName)i=n.scopeName+':'+i;i=i.replace(/mce\:/g,'');switch(i){case'b':i='strong';break;case'i':i='em';break;case'img':if(v=D.getAttrib(n,'src'))G+='src: '+v+' ';break;case'a':if(v=D.getAttrib(n,'name')){G+='name: '+v+' ';i+='#'+v;}if(v=D.getAttrib(n,'href'))G+='href: '+v+' ';break;case'font':if(v=D.getAttrib(n,'face'))G+='font: '+v+' ';if(v=D.getAttrib(n,'size'))G+='size: '+v+' ';if(v=D.getAttrib(n,'color'))G+='color: '+v+' ';break;case'span':if(v=D.getAttrib(n,'style'))G+='style: '+v+' ';break;}if(v=D.getAttrib(n,'id'))G+='id: '+v+' ';if(v=n.className){v=v.replace(/\b\s*(webkit|mce|Apple-)\w+\s*\b/g,'');if(v){G+='class: '+v+' ';if(e.dom.isBlock(n)||i=='img'||i=='span')i+='.'+v;}}i=i.replace(/(html:)/g,'');i={name:i,node:n,title:G};t.onResolveName.dispatch(t,i);G=i.title;i=i.name;F=D.create('a',{'href':"javascript:;",role:'button',onmousedown:"return false;",title:G,'class':'mcePath_'+(f++)},i);if(p.hasChildNodes()){p.insertBefore(D.create('span',{'aria-hidden':'true'},'\u00a0\u00bb '),p.firstChild);p.insertBefore(F,p.firstChild);}else p.appendChild(F);},e.getBody());if(D.select('a',p).length>0){t.statusKeyboardNavigation=new d.ui.KeyboardNavigation({root:e.id+"_path_row",items:D.select('a',p),excludeFromTabOrder:true,onCancel:function(){e.focus();}},D);}}},_sel:function(v){this.editor.execCommand('mceSelectNodeDepth',false,v);},_mceInsertAnchor:function(u,v){var e=this.editor;e.windowManager.open({url:this.url+'/anchor.htm',width:320+parseInt(e.getLang('advanced.anchor_delta_width',0)),height:90+parseInt(e.getLang('advanced.anchor_delta_height',0)),inline:true},{theme_url:this.url});},_mceCharMap:function(){var e=this.editor;e.windowManager.open({url:this.url+'/charmap.htm',width:550+parseInt(e.getLang('advanced.charmap_delta_width',0)),height:265+parseInt(e.getLang('advanced.charmap_delta_height',0)),inline:true},{theme_url:this.url});},_mceHelp:function(){var e=this.editor;e.windowManager.open({url:this.url+'/about.htm',width:480,height:380,inline:true},{theme_url:this.url});},_mceShortcuts:function(){var e=this.editor;e.windowManager.open({url:this.url+'/shortcuts.htm',width:480,height:380,inline:true},{theme_url:this.url});},_mceColorPicker:function(u,v){var e=this.editor;v=v||{};e.windowManager.open({url:this.url+'/color_picker.htm',width:375+parseInt(e.getLang('advanced.colorpicker_delta_width',0)),height:250+parseInt(e.getLang('advanced.colorpicker_delta_height',0)),close_previous:false,inline:true},{input_color:v.color,func:v.func,theme_url:this.url});},_mceCodeEditor:function(u,v){var e=this.editor;e.windowManager.open({url:this.url+'/source_editor.htm',width:parseInt(e.getParam("theme_advanced_source_editor_width",720)),height:parseInt(e.getParam("theme_advanced_source_editor_height",580)),inline:true,resizable:true,maximizable:true},{theme_url:this.url});},_mceImage:function(u,v){var e=this.editor;if(e.dom.getAttrib(e.selection.getNode(),'class','').indexOf('mceItem')!=-1)return;e.windowManager.open({url:this.url+'/image.htm',width:355+parseInt(e.getLang('advanced.image_delta_width',0)),height:275+parseInt(e.getLang('advanced.image_delta_height',0)),inline:true},{theme_url:this.url});},_mceLink:function(u,v){var e=this.editor;e.windowManager.open({url:this.url+'/link.htm',width:310+parseInt(e.getLang('advanced.link_delta_width',0)),height:200+parseInt(e.getLang('advanced.link_delta_height',0)),inline:true},{theme_url:this.url});},_mceNewDocument:function(){var e=this.editor;e.windowManager.confirm('advanced.newdocument',function(s){if(s)e.execCommand('mceSetContent',false,'');});},_mceForeColor:function(){var t=this;this._mceColorPicker(0,{color:t.fgColor,func:function(c){t.fgColor=c;t.editor.execCommand('ForeColor',false,c);}});},_mceBackColor:function(){var t=this;this._mceColorPicker(0,{color:t.bgColor,func:function(c){t.bgColor=c;t.editor.execCommand('HiliteColor',false,c);}});},_ufirst:function(s){return s.substring(0,1).toUpperCase()+s.substring(1);}});d.ThemeManager.add('advanced',d.themes.AdvancedTheme);}(tinymce));