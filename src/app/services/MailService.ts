import nodemailer from "nodemailer";
import config from "@app/app.config";
import hbs from "nodemailer-express-handlebars";
import path from "path";

interface IEmail {
  context?: any;
  template?: string;
  to: string;
  from?: string;
  subject?: string;
  attachment?: Array<any>;
}

export default class MailService {
  private transporter: nodemailer.Transporter;
  private static instance: MailService;
  private email: IEmail = { to: "" };

  private constructor() {
    this.transporter = nodemailer.createTransport(config.mail);
    this.initTemplate();
  }

  public to(toEmail: string): MailService {
    this.email.to = toEmail;
    return this;
  }

  public subject(subject: string): MailService {
    this.email.subject = subject;
    return this;
  }

  public template(template: string): MailService {
    this.email.template = template;
    return this;
  }

  public context(context: any): MailService {
    this.email.context = context;
    return this;
  }

  public attachment(attachment: Array<any>): MailService {
    this.email.attachment = attachment;
    return this;
  }

  private clearEmail(): void {
    this.email = {
      to: "",
    };
  }

  public static getMailInstance() {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }

  private initTemplate() {
    this.transporter.use(
      "compile",
      hbs({
        viewEngine: {
          extname: ".hbs",
          partialsDir: path.join(config.app.views, "templates"),
          layoutsDir: path.join(config.app.views, "layouts"),
          defaultLayout: "",
        },
        viewPath: path.join(config.app.views, "templates"),
        extName: ".hbs",
      })
    );
  }

  async send(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.email.from = config.mail.from;
      this.transporter.sendMail(this.email, (err, info) => {
        if (err) {
          this.clearEmail();
          reject(err);
        }
        this.clearEmail();
        resolve(info);
      });
    });
  }
}
