import Mail from "@app/services/MailService";
export default class AuthMailService {
  private mailService: Mail = Mail.getMailInstance();

 /* public async sendConfirmation(user: any) {
    const email = {
      to: user.email,
      subject: `Bienvenido(a) ${user.email}`,
      template: "confirmation",
      context: user,
    };
    return await this.mailService
      .to(email.to)
      .subject(email.subject)
      .context(email.context)
      .template(email.template)
      .attachment([])
      .send();
  }*/

  public async sendRecoverLink(context: any) {
    const email = {
      to: context.email,
      subject: `Recupere su contraseña: ${context.email}`,
      template: "recoverPassword",
      context: context,
    };
    return await this.mailService
      .to(email.to)
      .subject(email.subject)
      .context(email.context)
      .template(email.template)
      .attachment([])
      .send();
  }
}
