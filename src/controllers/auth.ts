/** @format */

import { Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export const signUp = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (user) {
    throw Error("User already exists");
  }

  user = await prismaClient.user.create({
    data: {
      email,
      password: hashSync(password, 10),
      name,
    },
  });
  res.json({user})
};

export const login = async (req: Request, res: Response) => {
   const { email, password } = req.body;

   let user = await prismaClient.user.findFirst({ where: { email } });
   
   if (!user) {
     throw Error("User already exists");
   }

   if (!compareSync(password, user.password)) {
        throw Error("Password is incorrect");
   }

   const token = jwt.sign({
    userId: user.id
   }, JWT_SECRET)

   res.json({ user, token });
};
