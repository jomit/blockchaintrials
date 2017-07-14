function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      ___header_template = __helpers.l(require.resolve("../header/template")),
      forEachProp = __helpers.fp,
      escapeXml = __helpers.x,
      forEach = __helpers.f,
      escapeXmlAttr = __helpers.xa;

  return function render(data, out) {
    out.w('<!DOCTYPE html> <html lang="en">');

    ___header_template.render({}, out);

    out.w('<body><div class="container"><h4>Compiled Contracts</h4><div class="row">');

    forEachProp(data, function(contractName,contractList) {
      out.w('<div>');

      if ((notEmpty(contractList))) {
        out.w('<h5> ' +
          escapeXml(contractName) +
          ' </h5>');
      }

      out.w('<table class="table">');

      forEach(contractList, function(contract) {
        out.w('<tr><td><a href="/contracts/' +
          escapeXmlAttr(contractName) +
          '/' +
          escapeXmlAttr(contract.address) +
          '"> ' +
          escapeXml(contract.address) +
          '</a></td><td><a href="/contracts/' +
          escapeXmlAttr(contractName) +
          '/' +
          escapeXmlAttr(contract.address) +
          '.html">Generated HTML</a></td><td><a href="/contracts/' +
          escapeXmlAttr(contractName) +
          '/' +
          escapeXmlAttr(contract.address) +
          '/state"> Contract State</a></td></tr>');
      });

      out.w('</table></div>');
    });

    out.w('</div></div></body></html>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);