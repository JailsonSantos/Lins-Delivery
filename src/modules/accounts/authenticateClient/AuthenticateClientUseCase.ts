import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {

    // Receber username e password


    // Verifica se username está cadastrado
    const clientExists = await prisma.clients.findFirst({
      where: {
        username
      }
    });

    if (!clientExists) {
      throw new Error("Username or password is invalid");
    }

    // Verifica se password corresponde ao do username cadastrado
    const passwordMatch = await compare(password, clientExists.password);

    if (!passwordMatch) {
      throw new Error("Username or password is invalid");
    }

    // Gerar um token
    const token = sign({ username }, "b878493383f58de79f73e8513eba5010", {
      subject: clientExists.id,
      expiresIn: "1d"
    });

    return token;

    // Verificar se password corresponde ao userrname
  }
}