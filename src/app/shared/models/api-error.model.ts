export class ApiError {
  message: string;
  errors?: Array<string> = [];
  status?: number;
}