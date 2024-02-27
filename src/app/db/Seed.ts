// migrate.ts

import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
import config from "../app.config";

class Seed {
  constructor(private sequelize: Sequelize) {}

  private async runSQLFile(filePath: string): Promise<void> {
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
          await this.sequelize.query(query);
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

  public async run(seeds: string[]): Promise<void> {
    await this.sequelize.query("SET foreign_key_checks = 0");

    for (const seed of seeds) {
      await this.runFromSeed(seed);
    }
    await this.sequelize.query("SET foreign_key_checks = 1");
    console.log(
      "\x1b[34m%s\x1b[0m",
      "La inserción se ha completado con éxito."
    );
  }

  private async runFromSeed(seed: string) {
    if (seed === "all") {
      // Asumiendo que tienes una estructura predefinida de carpetas para recorrer

      const folderPath = path.join(__dirname, "seeds");
      const files = fs.readdirSync(folderPath);
      for (const file of files) {
        if (file.endsWith(".sql")) {
          await this.runSQLFile(path.join(folderPath, file));
        }
      }
    } else {
      const filePath = path.join(__dirname, `seeds/${seed}.sql`);
      await this.runSQLFile(filePath);
    }
  }
}
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    dialect: config.db.dialect,
    host: config.db.host,
    logging: config.db.logging,
    timezone: "-04:00",
  }
);
const runner = new Seed(sequelize);
runner.run(process.argv.slice(2));
