module.exports =  function() {
    return `<style>
        body{ background-color:#ffffff; font-size:11px; margin-left:40px; margin-right:40px; line-height: 15px; overflow:hidden}
        #kth-logo{ height:80px; margin-left:15px; margin-bottom: 20px;}
        i, cite, em, dfn { font-weight:600; }
        .pdfContainer{ max-width:540px; background-color:#ffffff;}
        .pdfFooterText{  background-color:#ffffff; font-size: 9px; margin-left:10px; margin-right:10px; margin-top:20px; border-top: 1px solid #ddd; color: #444;}
        .pdfContent p{ page-break-inside: avoid;}
        .pdfContent h3{margin-top: 20px;}
        .pdfSection{page-break-inside: avoid;}
        .secondTitle{ margin-top: 15px; margin-bottom: 17px; color:#808080; font-size: 16px; border-bottom:1px solid #808080}
        ul li{font-family: "Open Sans", Arial, "Helvetica Neue", helvetica, sans-serif;}
        </style>
        `
}