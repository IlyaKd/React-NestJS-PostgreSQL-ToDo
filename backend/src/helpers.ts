import { HttpException, HttpStatus } from "@nestjs/common";

export function errorHandler(response: { pointer: string; text: string }, e: Error) {
  if (!(e instanceof HttpException)) {
    const error = new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR, { cause: e });

    return Promise.reject(error);
  }
  return Promise.reject(e);
}