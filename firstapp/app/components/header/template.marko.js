function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      ___navTemplate_template = __helpers.l(require.resolve("../navTemplate/template"));

  return function render(data, out) {
    out.w('<head><title> ' +
      escapeXml(data.title) +
      ' </title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta http-equiv="Content-Language" content="en"><script src="/static/bower_components/jquery/jquery.min.js"></script><script src="/static/bower_components/bootstrap/dist/js/bootstrap.js"></script><link rel="stylesheet" href="/static/bower_components/bootstrap/dist/css/bootstrap.min.css"><link rel="stylesheet" href="/static/css/styles.css"></head><div class="container main__container">');

    ___navTemplate_template.render({}, out);

    out.w('</div>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);