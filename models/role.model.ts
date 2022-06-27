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
import RoleInstance from './role-instance.model';

@Table
export default class Role extends Model<Role> {
  @AllowNull(false)
  @Unique
  @Column
  name!: string;

  @BelongsToMany(() => Member, () => Qualification)
  members!: Member[];

  @HasMany(() => RoleInstance)
  roleInstances!: RoleInstance[];
}
