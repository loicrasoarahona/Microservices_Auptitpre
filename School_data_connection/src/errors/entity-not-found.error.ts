export class EntityNotFoundError extends Error {
  public constructor(message?: string) {
    super(message);
  }
}
