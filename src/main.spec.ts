import { generateCodeVerifier, generateCodeChallenge, templateTags } from "../dist/main";

describe("Plugin Tests", () => {
    test("Test if the code verifier is generated correctly", async () => {
        let codeVerifier = await generateCodeVerifier();
        expect(codeVerifier).not.toBeNull();
    });

    test("Test if the code challenge is returned once a valid code verifier is given", async () => {
        let codeVerifier = await generateCodeVerifier();
        let codeChallenge = generateCodeChallenge(codeVerifier);
        expect(codeVerifier).not.toBeNull();
        expect(codeChallenge).not.toBeNull();
    });
});
