import { Request, Response } from "express";
import crypto from "node:crypto";
import { googleOAuth2Client, googleScopes } from "../../../config/google.js";
import prisma from "../../../lib/prisma.js";
import { generateToken } from "../../../utils/jwt.js";

export const googleLogin = (
  req: Request,
  res: Response,
) => {
  const state = crypto.randomBytes(32).toString("hex");

  res.cookie("google_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60 * 1000,
  });

  const authorizationUrl =
    googleOAuth2Client.generateAuthUrl({
      access_type: "online",
      scope: googleScopes,
      state,
      prompt: "select_account",
    });

  return res.redirect(authorizationUrl);
};

export const googleCallback = async (
  req: Request,
  res: Response,
) => {
  try {
    const { code, state } = req.query;

    const savedState = req.cookies.google_oauth_state;

    if (
      !state ||
      typeof state !== "string" ||
      state !== savedState
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid OAuth state",
      });
    }

    res.clearCookie("google_oauth_state");

    if (!code || typeof code !== "string") {
      return res.status(400).json({
        success: false,
        message: "Authorization code missing",
      });
    }

    const { tokens } =
      await googleOAuth2Client.getToken(code);

    googleOAuth2Client.setCredentials(tokens);

    const ticket = await googleOAuth2Client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.sub || !payload.email) {
      return res.status(400).json({
        success: false,
        message: "Unable to get Google account information",
      });
    }

    const googleId = payload.sub;
    const email = payload.email;
    const name =
      payload.name || email.split("@")[0];

    let user = await prisma.user.findUnique({
      where: {
        googleId,
      },
    });

    if (!user) {
      user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        user = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            googleId,
          },
        });
      } else {
        user = await prisma.user.create({
          data: {
            name,
            email,
            googleId,
            password: null,
            role: "CUSTOMER",
          },
        });
      }
    }

    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // return res.redirect(
    //   "http://localhost:3000",
    // );
    return res.json({
  success: true,
  message: "Google login successful",
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});
  } catch (error) {
    console.error("Google OAuth error:", error);

    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
    });
  }
};