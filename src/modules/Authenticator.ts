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

  public login(password: string, hash: string, payload: Payload) {
    this.hasher.verify(hash, password).then((e) => {
      if (e) {
        return jwt.sign(payload, env.SECRET_KEY);
      } else {
        return null;
      }
    });
    return null;
  }

  public signup(password: string) {
    this.hasher.hash(password).then((e) => {
      return e;
    });
    return null;
  }

  public authenticate(token: string, id?: number, role?: string) {
    jwt.verify(token, env.SECRET_KEY, function (err, decoded) {
      if (decoded) {
        return true;
      }
    });
    return false;
  }
}

export default Authenticator;
