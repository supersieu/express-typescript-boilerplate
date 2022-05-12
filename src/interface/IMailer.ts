export default interface IMailer {
  sendMailLogin: (model: any) => void;
  sendMailCreateUser: (model: any) => void;
  sendMailAlarm: (model: any) => void;
}
