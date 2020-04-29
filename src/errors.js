const capitalize = string => string[0].toUpperCase() + string.slice(1);
const withPeriod = string => string.slice(-1)[0] === '.' ? string : `${string}.`;
const humanizeErrorCode = input => input.split('-').map(capitalize).join(' ');
const humanizeErrorMessage = input => capitalize(withPeriod(input.trim()));

export class HasuraApiError extends Error {
  constructor(response) {
    super();
    this.name = 'HasuraApiError';
    this.code = response.code;
    // This message will be displayed to the user in a Notification
    this.message = [
      response.code && humanizeErrorCode(response.code),
      response.error && humanizeErrorMessage(response.error)
    ].filter(Boolean).join(': ');
  }
}
