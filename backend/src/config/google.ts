import { google } from "googleapis";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_CALLBACK_URL;

if (!clientId || !clientSecret || !redirectUri) {
  throw new Error("Google OAuth environment variables are missing");
}

export const googleOAuth2Client = new google.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUri,
);

export const googleScopes = [
  "openid",
  "email",
  "profile",
];