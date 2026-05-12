interface IApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  success: boolean;
}

class ApiResponse<T> implements IApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  success: boolean;
  constructor(statusCode: number, message: string, data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = this.statusCode < 400;
  }
}

export default ApiResponse;
