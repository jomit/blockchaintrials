function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne;

  return function render(data, out) {
    out.w('<div class="form-group"><label for="sel1">Select User</label><select class="form-control" id="userId" onchange="userChangeHandler(this.value)"></select></div><div class="form-group"><label for="sel1">Select Address</label><select class="form-control" id="globalKeystoreId" onchange="keyChangeHandler(this.value)"></select></div><script>\n\nvar globalUser;\nvar globalAddress;\nvar globalPassword;\n\nfunction userChangeHandler(user) {\n  console.log(\'user is now: \' + user);\n  globalUser = user;\n  \n  $.getJSON( "/users/" + user, function( data ) {\n      $(\'#globalKeystoreId\').empty();\n\t\t\t \n      $.each( data, function( key, val ) {\n          $(\'#globalKeystoreId\')\n              .append($(\'<option>\', { key : val })\n\t      .text(val));\n\t\t\t\t      \n      });\n\n      keyChangeHandler($(\'#globalKeystoreId\').val());\n  });\n}\n\nfunction keyChangeHandler(address) {\n  globalAddress = address;\n  $(\'#passwordModal\').modal(\'show\');\n  afterTX();\n}\n\nfunction loadHandler() {\n   $.getJSON( "/users/", function( data ) {\n      $.each( data, function( key, val ) {\n          console.log("iterating over data, key: " + key + " val: " + val);\n\n          $(\'#userId\')\n              .append($(\'<option>\', { key : val })\n\t      .text(val));\n\t\t\t \n      });\n\n      userChangeHandler(data[0]);\n   });\n}\n\n$( document ).ready( function () {\n    loadHandler();\n});\n\n</script>');
  };
}
(module.exports = require("marko").c(__filename)).c(create);