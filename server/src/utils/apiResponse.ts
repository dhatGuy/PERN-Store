export type StatusType =
  | "OK"
  | "FIELD_ERROR"
  | "UNAUTHORIZED"
  | "SERVER_ERROR"
  | "NOT_FOUND";

interface FieldError {
  id: string | number;
  error: string;
}

export class ApiResponse<T = any> {
  status: StatusType;
  message?: string;
  data?: T;
  formFields?: FieldError[];

  private constructor(
    status: StatusType,
    message?: string,
    data?: T,
    formFields?: FieldError[]
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.formFields = formFields;
  }

  static success<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponse<T>("OK", message, data);
  }

  static fieldError(message: string, formFields: FieldError[]): ApiResponse {
    return new ApiResponse("FIELD_ERROR", message, undefined, formFields);
  }

  static unauthorized(message: string = "Unauthorized"): ApiResponse {
    return new ApiResponse("UNAUTHORIZED", message);
  }

  static serverError(message: string = "Internal server error"): ApiResponse {
    return new ApiResponse("SERVER_ERROR", message);
  }

  static notFound(message: string = "Not found"): ApiResponse {
    return new ApiResponse("NOT_FOUND", message);
  }

  static paginated<T>(
    message: string,
    items: T[],
    page: number,
    limit: number,
    total: number
  ): ApiResponse<{ items: T[]; page: number; limit: number; total: number }> {
    return new ApiResponse<{
      items: T[];
      page: number;
      limit: number;
      total: number;
    }>("OK", message, {
      items,
      page,
      limit,
      total,
    });
  }
}
