import {
  AllowNull,
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import Member from './member.model';
import Qualification from './qualification.model';
import Role_Instance from './roleinstance.model';

@Table
export default class Role extends Model<Role> {
  @AllowNull(false)
  @Unique
  @Column
  name!: string;

  @BelongsToMany(() => Member, () => Qualification)
  members!: Member[];

  @HasMany(() => Role_Instance)
  roleInstances!: Role_Instance[]
}
