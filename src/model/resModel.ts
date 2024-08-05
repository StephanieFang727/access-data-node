class BaseModel {
  data: any;
  message!: string;
  errno!: number;
  constructor(data: string | object | null, message: string | null) {
    // data是对象，message是字符串，并兼容不传data的情况
    if (typeof data === "string") {
      this.message = data;
      data = null;
      message = null;
    }

    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

class SuccessModel extends BaseModel {
  data: any;
  message!: string;
  errno!: number;
  constructor(data: string | object | null, message: string | null) {
    super(data, message);
    this.errno = 0;
  }
}

class ErrorModel extends BaseModel {
  constructor(data: string | object | null, message: string | null) {
    super(data, message);
    this.errno = -1;
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
