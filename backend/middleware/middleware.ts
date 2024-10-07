import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err: any) {
    console.error(err);
    const message = err.errors[0].message;
    res.status(400).json({ msg: message });
  }
};

export default validate;
