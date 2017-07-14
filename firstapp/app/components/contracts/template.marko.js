function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      ___header_template = __helpers.l(require.resolve("../header/template")),
      ___keyModal_template = __helpers.l(require.resolve("../keyModal/template")),
      ___contractJS_template = __helpers.l(require.resolve("../contractJS/template")),
      ___selectUser_template = __helpers.l(require.resolve("../selectUser/template")),
      ___contractFunctionsCall_template = __helpers.l(require.resolve("../contractFunctionsCall/template")),
      ___contractStatus_template = __helpers.l(require.resolve("../contractStatus/template"));

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html lang="en">');

    ___header_template.render({}, out);

    ___keyModal_template.render({}, out);

    ___contractJS_template.render({"apiURL": data.apiURL, "contractMeta": data.contractMeta, "txFailedHandlerName": data.txFailedHandlerName, "txFailedHandlerCode": data.txFailedHandlerCode}, out);

    out.w('<body><div class="container"><div class="row"><div class="col-md-9">');

    ___selectUser_template.render({}, out);

    out.w('<div id="functionsDiv">');

    ___contractFunctionsCall_template.render({"contractMeta": data.contractMeta, "body": __helpers.c(out, function() {
    })}, out);

    out.w('</div></div><div class="col-md-3">');

    ___contractStatus_template.render({"contractMeta": data.contractMeta, "apiURL": data.apiURL}, out);

    out.w('</div></div> </div> </body><script>\n$( document ).ready( afterTX() );\n</script></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);