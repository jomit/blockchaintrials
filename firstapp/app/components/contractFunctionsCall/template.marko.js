function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      forEach = __helpers.f,
      attr = __helpers.a,
      forEachProp = __helpers.fp,
      escapeXmlAttr = __helpers.xa,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w('<div id="functionsContainer"> <h5>Contract Functions</h5>');

    forEach(data.contractMeta, function(contract) {
      out.w('<div' +
        attr("id", data.contractMeta.name) +
        ' class="contractDiv">');

      forEachProp(contract.xabi.funcs, function(symbol,symbolObj) {
        out.w('<div><div id="' +
          escapeXmlAttr(symbol) +
          'Div"><button style="background-color: #223765; color: white" class="btn col-sm-12" onclick="callFunc(&#39;' +
          escapeXmlAttr(symbol) +
          '&#39;)">' +
          escapeXml(symbol) +
          '</button> ');

        forEachProp(symbolObj.args, function(argName,_) {
          out.w('<input class="form-control col-sm-12" type="text"' +
            attr("name", argName) +
            attr("placeholder", argName) +
            ' id="' +
            escapeXmlAttr(symbol) +
            escapeXmlAttr(argName) +
            '">');
        });

        out.w(' <input class="form-control col-sm-12" type="value" name="' +
          escapeXmlAttr(symbol) +
          'ValueField" placeholder="send value in Ether" id="' +
          escapeXmlAttr(symbol) +
          'ValueField"> </div></div>');
      });

      out.w('<textarea class="form-control" id="afterTXarea" readonly="true" rows="14"></textarea> </div>');
    });

    out.w('</div>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);