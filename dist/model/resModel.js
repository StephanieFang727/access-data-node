"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuccessModel = exports.ErrorModel = void 0;
class BaseModel {
  message = "";
  errno = -1;
  constructor(data, message) {
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}
class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = 0;
  }
}
exports.SuccessModel = SuccessModel;
class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = -1;
  }
}
exports.ErrorModel = ErrorModel;