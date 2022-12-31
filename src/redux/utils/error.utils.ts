import _ from 'lodash';

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
  error: unknown,
): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
}

const HTTP_ERROR_MESSAGE_PATH = 'data.message';

export function getErrorMessage(error: unknown): string | undefined {
  let result: string | undefined;

  if (_.has(error, HTTP_ERROR_MESSAGE_PATH)) {
    result = _.get<unknown, string>(error, HTTP_ERROR_MESSAGE_PATH);
  } else if (isErrorWithMessage(error)) {
    result = error.message;
  } else if (typeof error === 'string') {
    result = error;
  }

  return result;
}
