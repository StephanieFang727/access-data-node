"use strict";

var _app = _interopRequireDefault(require("./app"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const port = 3000;
_app.default.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});