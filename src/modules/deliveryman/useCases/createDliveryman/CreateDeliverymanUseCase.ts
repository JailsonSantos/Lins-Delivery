import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliveryMan {
  username: string;
  password: string;
}

export class CreateDeliveryManUseCase {
  async execute({ username, password }: ICreateDeliveryMan) {
    // Validar se o deliveryman existe
    const deliverymanExist = await prisma.deliveryman.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive"
        }
      }
    });

    if (deliverymanExist) {
      throw new Error("Deliveryman already exists.");
    }

    // Criptografar a senha
    const hashPassword = await hash(password, 10);

    // Salvar o Deliveryman
    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword
      }
    });
    return deliveryman;
  }
}