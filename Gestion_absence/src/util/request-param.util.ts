import { Request } from "express";

type QueryParameterType = "string" | "string[]" | "number";

type QueryParameterTypeMap = {
  string: String;
  "string[]": string[];
  number: number;
};

export function retrieveQueryParameter<T extends QueryParameterType>(
  request: Request,
  field: string,
  typeOfValue: T,
): QueryParameterTypeMap[T] {
  const value = request.query[field];

  if (value === undefined) {
    throw new UndefinedQueryParameterError(`parameter ${field} not provided`);
  }

  switch (typeOfValue) {
    case "string":
      return String(value) as unknown as QueryParameterTypeMap[T];

    case "string[]":
      return (
        Array.isArray(value) ? value.map(String) : [String(value)]
      ) as QueryParameterTypeMap[T];

    case "number": {
      const numberValue = Number(value);

      if (Number.isNaN(numberValue)) {
        throw new Error(`parameter ${field} must be a number`);
      }

      return numberValue as QueryParameterTypeMap[T];
    }
  }
}
export class UndefinedQueryParameterError extends Error {
  public constructor(message?: string) {
    super(message);
  }
}
