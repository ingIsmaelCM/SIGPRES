// migrate.ts

import { Sequelize } from "sequelize";
import fs from "fs";
import path from "path";
import config from "../app.config";
import tools from "../utils/tools";

class Migration {
  constructor(private sequelize: Sequelize) {}



  public async run(migrations: string[]): Promise<void> {
    await this.sequelize.query("SET foreign_key_checks = 0");

    for (const migration of migrations) {
      await this.runFromMigration(migration);
    }
    await this.sequelize.query("SET foreign_key_checks = 1");
    console.log(
      "\x1b[34m%s\x1b[0m",
      "La migración se ha completado con éxito."
    );
  }

  private async runFromMigration(migration: string) {
    if (migration === "all") {
      // Asumiendo que tienes una estructura predefinida de carpetas para recorrer

      const folderPath = path.join(__dirname, "migrations");
      const files = fs.readdirSync(folderPath);
      for (const file of files) {
        if (file.endsWith(".sql")) {
          await tools.runSQLFile(path.join(folderPath, file), this.sequelize);
        }
      }
    } else {
      const filePath = path.join(__dirname, `migrations/${migration}.sql`);
      await tools.runSQLFile(filePath, this.sequelize);
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
const runner = new Migration(sequelize);
runner.run(process.argv.slice(2)).then(() => console.log("Finished"));

export default Migration
