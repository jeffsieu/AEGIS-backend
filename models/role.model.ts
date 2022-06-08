import {
  AllowNull,
  BelongsToMany,
  Column,
  Model,
  Table,
} from 'sequelize-typescript';
import Member from './member.model';
import Qualification from './qualification.model';

@Table
export default class Role extends Model<Role> {
  @AllowNull(false)
  @Column
  name!: string;

  @BelongsToMany(() => Member, () => Qualification)
  members!: Member[];
}
