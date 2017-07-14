function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      forEach = __helpers.f,
      escapeXmlAttr = __helpers.xa,
      escapeXml = __helpers.x;

  return function render(data, out) {
    forEach(data.contractMeta, function(cs) {
      out.w('<div><ul class="list-group"><li class="list-group-item">Contract Address<br><a href="' +
        escapeXmlAttr(data.apiURL) +
        '/eth/v1.2/account?address=' +
        escapeXmlAttr(cs.address) +
        '" , target="_blank"><span class="upload-address">' +
        escapeXml(cs.address) +
        '</span></a></li><li class="list-group-item">Contract<br><a href="/contracts/' +
        escapeXmlAttr(cs.name) +
        '/' +
        escapeXmlAttr(cs.address) +
        '/state" , target="_blank"><span class="upload-address">State</span></a></li></ul></div>');
    });
  };
}
(module.exports = require("marko").c(__filename)).c(create);