tinymce.PluginManager.add('anchor',function(a){function s(){var b=a.selection.getNode(),n='';var i=b.tagName=='A'&&a.dom.getAttrib(b,'href')==='';if(i){n=b.name||b.id||'';}a.windowManager.open({title:'Anchor',body:{type:'textbox',name:'name',size:40,label:'Name',value:n},onsubmit:function(e){var c=e.data.name;if(i){b.id=c;}else{a.selection.collapse(true);a.execCommand('mceInsertContent',false,a.dom.createHTML('a',{id:c}));}}});}a.addCommand('mceAnchor',s);a.addButton('anchor',{icon:'anchor',tooltip:'Anchor',onclick:s,stateSelector:'a:not([href])'});a.addMenuItem('anchor',{icon:'anchor',text:'Anchor',context:'insert',onclick:s});});