function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" id="passwordModal"><div class="modal-dialog modal-sm"><div class="modal-content"><form id="submitPass" action="/login"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title">Keystore Password</h4></div><div class="modal-body row"><p class="col-xs-12">Enter your password to sign transactions:</p><div class="col-xs-12"><input class="form-control" type="password" id="privkeyPassword" name="password"></div></div><div class="modal-footer"><button id="submitPassButton" class="btn btn-primary col-sm-4" data-target="#passwordModal">Submit</button></div></form></div></div></div><script>\n\n$(\'#submitPassButton\').on(\'click\',function(e){\n    e.preventDefault();\n    globalPassword = privkeyPassword.value;\n    console.log("globalPassword set to: " + globalPassword);\n    $(\'#passwordModal\').modal(\'hide\');\n});\n\n</script>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);