/*
 Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.

 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license

*/
CKEDITOR.plugins.add("docprops",{requires:"wysiwygarea,dialog,colordialog",lang:"en,ko",icons:"docprops,docprops-rtl",hidpi:!0,init:function(a){var b=new CKEDITOR.dialogCommand("docProps");b.modes={wysiwyg:a.config.fullPage};b.allowedContent={body:{styles:"*",attributes:"dir"},html:{attributes:"lang,xml:lang"}};b.requiredContent="body";a.addCommand("docProps",b);CKEDITOR.dialog.add("docProps",this.path+"dialogs/docprops.js");a.ui.addButton&&a.ui.addButton("DocProps",{label:a.lang.docprops.label,command:"docProps",
toolbar:"document,30"})}});