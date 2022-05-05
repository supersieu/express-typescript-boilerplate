import { EventEmitter } from "stream";
import { IAuthenticator, Payload } from "@/interface/IAuthenticator";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { load } from "ts-dotenv";
const env = load({
  DATABASE_URL: String,
  SECRET_KEY: String,
});

class Authenticator extends EventEmitter implements IAuthenticator {
  hasher = argon2;

  constructor() {
    super();
  }

  public async login(password: string, hash: string, payload: Payload) {
    const e = await this.hasher.verify(hash, password);
    if (e) {
      return jwt.sign(payload, env.SECRET_KEY);
    } else {
      return null;
    }
  }

  public async signup(password: string) {
    const e = await this.hasher.hash(password);
    return e;
  }

  public authenticate(token: string, id?: number, role?: string) {
    const decoded = jwt.verify(token.split(" ")[1], env.SECRET_KEY);
    if (decoded) {
      return true;
    } else {
      return false;
    }
  }
}

export default Authenticator;
