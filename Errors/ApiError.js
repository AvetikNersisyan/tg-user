export class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static BadRequest(message) {
    return new ApiError(400, { success: false, message });
  }

  static ServerError(message) {
    return new ApiError(500, message);
  }
}
