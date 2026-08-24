import { Response, Request } from "express";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma.js";
import { registerSchema } from "../validators/auth.validator.js";
import { generateToken } from "../../../utils/jwt.js";

export const register = async (req: Request, res: Response) => {
  try {
    // validate Request Body

    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid Input",
        errors: result.error.flatten(),
      });
    }

    const { name, email, password } = result.data;

    // 2. Check existing user
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered",
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 4. Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 5. Generate JWT
    const token = generateToken(user.id);

    // 6. Set HttpOnly Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 7. Response
    return res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
