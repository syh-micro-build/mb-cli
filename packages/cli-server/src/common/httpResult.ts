import { HTTP_CODE } from "../enum";

export default class HttpResult<T> {
  private code: number;

  private message: string;

  private data: T;

  constructor(code: number, message: string, data: any) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  static success<T>(data: T): HttpResult<T> {
    return new HttpResult(HTTP_CODE.SUCCESS, "success", data);
  }

  static error<T>(message: string): HttpResult<T> {
    return new HttpResult(HTTP_CODE.ERROR, message, null);
  }
}
