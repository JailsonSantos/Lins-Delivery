import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

interface IPayload {
  sub: string;
}

export async function ensureAuthorizateClient(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: "Token missing."
    });
  }

  // Pegando o Token dos headers
  // Bearer fafdasdfldsasjf
  // [0] => Bearer
  // [1] => fafdasdfldsasjf
  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, "b878493383f58de79f73e8513eba5010") as IPayload;

    request.id_client = sub;

    return next();

  } catch (error) {
    return response.status(401).json({
      message: "Token invalid."
    });
  }
}