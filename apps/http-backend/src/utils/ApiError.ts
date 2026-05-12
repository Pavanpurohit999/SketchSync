class ApiError extends Error {
  statusCode: number;
  errors: any[];
  success = false as const;
  data: null = null;
  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors: any[] = [],
    stack: string = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
