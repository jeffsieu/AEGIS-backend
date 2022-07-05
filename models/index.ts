import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize/types';

import configJson from '../config/config.json';
import Duty from './duty.model';
import Member from './member.model';
import Qualification from './qualification.model';
import Role from './role.model';
import Schedule from './schedule.model';
import Request from './request.model';
import RoleInstance from './role-instance.model';

type Environment = keyof typeof configJson;
const environment: Environment =
  (process.env.NODE_ENV as Environment) || 'test';

type Config = typeof configJson[Environment] & {
  dialect: Dialect;
};

const config: Config = configJson[environment] as Config;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password ?? undefined,
  {
    host: config.host,
    dialect: config.dialect,
  }
);

sequelize.addModels([__dirname + '/**/*.model.ts']);
sequelize.sync({logging: false})

export default sequelize;
export { Duty, Member, Role, RoleInstance, Qualification, Schedule, Request };
