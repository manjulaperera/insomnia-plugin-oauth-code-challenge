import { encode as base64encode } from "base64-arraybuffer";

export async function generateRandomString(length: number) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

export async function generateCodeVerifier() {
    return generateRandomString(96);
}

const codeVerifier = await generateCodeVerifier();

export async function generateCodeChallenge(codeVerifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  const base64Digest = base64encode(digest);

  return base64Digest
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

export const templateTags = [
    {
        name: 'oauth-code-challenge-and-verifier',
        displayName: 'Oauth 2 code challenge and verifier',
        description: 'This is to generate an OAuth 2 PKCE (Proof Key for Code Exchange) code challenge and verifier',
        async run(context: object) {
            let codeChallenge = await  generateCodeChallenge(codeVerifier);

            return new Array(codeChallenge, codeVerifier);
        },
    }
]
