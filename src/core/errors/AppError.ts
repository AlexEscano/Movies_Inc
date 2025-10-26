// Standard application error to surface user-friendly messages.
export class AppError extends Error {
  constructor(
    message: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const mapToAppError = (error: unknown, fallbackMessage: string): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, error);
  }

  return new AppError(fallbackMessage, error);
};
