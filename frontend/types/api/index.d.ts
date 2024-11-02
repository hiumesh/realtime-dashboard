export interface APISuccessResponse<Type = unknown> {
  statusCode: number;
  method: string;
  message: string;
  data: Type;
}

export interface APIErrorResponse<Type = unknown> {
  statusCode: number;
  method: string;
  message: string;
  data: Type;
}

export interface APIServiceHandler<
  SuccessDataType = unknown,
  ErrorDataType = unknown
> {
  data: APISuccessResponse<SuccessDataType> | null;
  error: APIErrorResponse<ErrorDataType> | null;
}
