import { EventEmitter } from "stream";
import IMailer from "../interface/IMailer";
import nodemailer from "nodemailer";

const templateLogin = {
  subject: "Information de connexion",
  html: ` <p>Bonjour,</p><br>
            <p>Une connexion à votre compte a eu lieu le ${
              new Date(Date.now()).toLocaleDateString("fr-FR") +
              " à " +
              new Date(Date.now()).toTimeString()
            }.</p><br>
            <p>Merci de votre confiance.</p>,`,
};

function templateCreateUser(user: any) {
  return {
    subject: "Bienvenue",
    html: ` <p>Bonjour ${user.username},</p><br>
            <p>Merci d'avoir choisir notre api</p><br>
            <p>Bonne journée.</p>,`,
  };
}

function templateAlarm(sensor: any, receiver: string = "") {
  return {
    subject: "Alert movement",
    html: ` <p>Bonjour ${receiver},</p><br>
            <p>Nous avons détecté du mouvement dans votre pièce</p><br>
            <p>Bonne journée.</p>,`,
  };
}

export class Mailer implements IMailer {
  private _user = "mason.nicolas12@ethereal.email";
  private _password = "sYnWnFtmZN86X4EaKM";
  private _sender = '"Dang" <mason.nicolas12@ethereal.email>';
  private _receiverUsername: string | undefined;
  private _receiverEmail: string | undefined;
  private _transporter;
  private _emitter: EventEmitter;
  private _alarmStatus = 0;
  constructor(emitter: EventEmitter) {
    this._transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: this._user,
        pass: this._password,
      },
    });
    this._emitter = emitter;

    this._emitter.on("login", (user) => {
      this.sendMailLogin(user);
    });

    this._emitter.on("createUser", (user) => {
      this.sendMailCreateUser(user);
    });

    this._emitter.on("alarm", (sensor) => {
      this.sendMailAlarm(sensor);
    });
  }

  public async sendMailLogin(model: any) {
    this._receiverUsername = model.username;
    this._receiverEmail = model.email;
    await this._transporter.sendMail({
      ...templateLogin,
      from: this._sender,
      to: model.email,
    });
  }

  public async sendMailCreateUser(model: any) {
    await this._transporter.sendMail({
      ...templateCreateUser(model),
      from: this._sender,
      to: model.email,
    });
  }

  public async sendMailAlarm(model: any) {
    if (model.rawValue == 1 && this._alarmStatus != 1) {
      this._alarmStatus = model.rawValue;
      await this._transporter.sendMail({
        ...templateAlarm(model, this._receiverUsername),
        from: this._sender,
        to: this._receiverEmail,
      });
    }
    this._alarmStatus = model.rawValue;
  }
}
