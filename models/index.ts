import { Sequelize } from 'sequelize-typescript';
import Duty from './duty.model';
import Member from './member.model';
import Qualification from './qualification.model';
import Role from './role.model';
import Schedule from './schedule.model';
import Request from './request.model';
import RequestDate from './request-date.model';
import RoleInstance from './role-instance.model';
import dotenv from "dotenv"
dotenv.config()

// type Environment = keyof typeof configJson;
// const environment: Environment =
//   (process.env.NODE_ENV as Environment) || 'test';

// type Config = typeof configJson[Environment] & {
//   dialect: Dialect;
// };

// const config: Config = configJson[environment] as Config;

// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password ?? undefined,
//   {
//     host: config.host,
//     dialect: config.dialect,
//   }
// );

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbHost = process.env.DB_HOST
const dbDialect = "mssql"
const dbPassword = process.env.DB_PASSWORD

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect, 
})

sequelize.addModels([__dirname + '/**/*.model.ts']);
sequelize.sync({logging: false})

export default sequelize;
export { Duty, Member, Role, RoleInstance, Qualification, Schedule, Request, RequestDate };
