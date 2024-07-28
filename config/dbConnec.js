import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "socialmedia",
  process.env.DB_USER,
  process.env.DB_Pass,
  {
    host: "localhost",
    dialect: "postgres",
    port: process.env.DB_PORT,
  }
);

try {
  await sequelize.authenticate();
} catch (error) {
  process.exit(1);
}

export default sequelize;
