class BaseModel {
  data: any;
  message: string = "";
  errno: number = -1;
  constructor(data: string | object | null, message?: string | null) {
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data: string | object | null, message?: string | null) {
    super(data, message);
    this.errno = 0;
  }
}

class ErrorModel extends BaseModel {
  constructor(data: string | object | null, message?: string | null) {
    super(data, message);
    this.errno = -1;
  }
}

export { SuccessModel, ErrorModel };
