import crypto from "node:crypto";
import prisma from "../../../lib/prisma.js";

export const createEmailVerificationToken = async (
  userId: number,
) => {
  const token = crypto.randomBytes(32).toString("hex");

  const expiresAt = new Date(
    Date.now() + 15 * 60 * 1000,
  );

  await prisma.emailVerificationToken.deleteMany({
    where: {
      userId,
    },
  });

  await prisma.emailVerificationToken.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  return token;
};