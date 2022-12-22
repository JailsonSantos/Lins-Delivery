import "express-async-errors";
import { routes } from './routes';
import express, { NextFunction, Request, Response } from "express";

const app = express();

app.use(express.json());

app.use(routes);

// Importante que seja depois da rotas
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({ message: err.message });
  }

  return response.status(500).json({
    status: 'error',
    message: "internal server error"
  });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));