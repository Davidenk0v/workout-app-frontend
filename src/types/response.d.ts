export interface ErrorResponse {
  code: string;
  message: string;
  response: ResponseMessage;
  status: number;
}

export interface ResponseMessage {
  data: string;
  status: number;
}
