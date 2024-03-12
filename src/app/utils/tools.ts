import { Request, Response } from "express";
import config from "../app.config";
import jwt from "jsonwebtoken";
import moment from "moment";
import "moment/locale/es";
import { Sequelize } from "sequelize";
import fs from "fs";
class Tool {
  parseOrZero(value: string | number | undefined): number {
    if (typeof value == "number") {
      return value;
    }

    const converted = Number(value);
    if (isNaN(converted)) {
      return 0;
    }

    return converted;
  }
  public async runSQLFile(filePath: string, sequelize: Sequelize): Promise<void> {
    const sql = fs.readFileSync(filePath, { encoding: "utf8" });
    const queries = sql.split(/;\s*$/m); // Divide el script en consultas individuales basándose en punto y coma
    let runned = 0;
    console.log(
        "\x1b[33m%s\x1b[0m",
        `Ejecutando consultas de ${filePath.split("db")[1]}`
    );
    for (const query of queries) {
      if (query.length > 0) {
        try {
          runned++;
          console.log(
              "\x1b[32m%s\x1b[0m",
              `Ejecutando consulta ${runned} de ${queries.length}`
          );
          await sequelize.query(query);
        } catch (error) {
          console.error(
              "\x1b[31m%s\x1b[0m",
              `Error ejecutando la consulta: ${query}`
          );
          throw error;
        }
      }
    }
    console.log(
        "\x1b[34m%s\x1b[0m",
        `Se ejecutaron las consultas de ${filePath.split("db")[1]}`
    );
  }
  setCookie(res: Response, name: string, value: string) {
    res.cookie(name, value, {
      httpOnly: true,
      sameSite: false,
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
  }

  getCookies(req: Request) {
    const cookies = req.headers["cookie"];
    if (!cookies) return null;
    return Object.fromEntries(
      cookies.split("; ").map((cookie) => {
        const [name, value] = cookie.split("=");
        return [name, decodeURIComponent(value)];
      })
    );
  }

  getToken(payload: object, expiresIn: number | string): String {
    return jwt.sign(payload, config.auth.secret, {
      expiresIn,
    });
  }

  dateToHuman(date: string): string {
    return moment(date).locale("es").format("DD MMM YYYY, hh:mm:ss A");
  }

  diffDates(start: any, end: any): number {
    start = moment(start);
    end = moment(end);
    return Math.round(moment.duration(end.diff(start)).asHours() * 100) / 100;
  }
  uppercaseFirst(str: string) {
    return `${str[0].toUpperCase()}${str.substring(1)}`;
  }

   initialToUpper(word:string){
    return word.replace(/\b\w/g, (match:string) => match.toUpperCase());
   }

  setUserRelated<
    T extends {
      createdBy?: any;
      updatedBy?: any;
      id?: number;
      [x: string]: any;
    }
  >(req: any, data: T): T {
    if (!data.id) {
      data.createdBy = req.auth.id;
    }
    data.updatedBy = req.auth.id;
    return data;
  }

  fromEnum(myEnum: Object) {
    const arr = Object.values(myEnum);
    return arr.slice(0, arr.length / 2);
  }
}

export default new Tool();
