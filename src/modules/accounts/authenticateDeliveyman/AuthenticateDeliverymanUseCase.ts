import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {

    // Receber username e password


    // Verifica se username está cadastrado
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: {
        username
      }
    });

    if (!deliverymanExists) {
      throw new Error("Username or password is invalid");
    }

    // Verifica se password corresponde ao do username cadastrado
    const passwordMatch = await compare(password, deliverymanExists.password);

    if (!passwordMatch) {
      throw new Error("Username or password is invalid");
    }

    // Gerar um token
    const token = sign({ username }, "b878493383f77de79f73e8513eba5010", {
      subject: deliverymanExists.id,
      expiresIn: "1d"
    });

    return token;
  }
}