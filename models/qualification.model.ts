import {
  AllowNull,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Member from './member.model';
import Role from './role.model';

@Table
export default class Qualification extends Model<Qualification> {
  @AllowNull(false)
  @ForeignKey(() => Member)
  @Column
  memberId!: number;

  @AllowNull(false)
  @ForeignKey(() => Role)
  @Column
  roleId!: number;
}
