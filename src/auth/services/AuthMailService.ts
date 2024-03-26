import Mail from "@app/services/MailService";
import {IMailOptions} from "@app/interfaces/AppInterfaces";

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

    async sendEmail(options: IMailOptions) {
        return await this.mailService
            .to(options.to)
            .subject(options.subject)
            .context(options.context)
            .template(options.template)
            .attachment(options.attachment || [])
            .send();
    }
}
