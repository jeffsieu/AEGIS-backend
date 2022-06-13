import {
  Column,
  Table,
  BelongsTo,
  Model,
  ForeignKey,
  AllowNull,
} from 'sequelize-typescript';
import Member from './member.model';
import Role from './role.model';
import Schedule from './schedule.model';

@Table
export default class Duty extends Model<Duty> {
  @AllowNull(false)
  @Column
  date!: Date;

  @BelongsTo(() => Member)
  member!: Member;

  @AllowNull(false)
  @ForeignKey(() => Member)
  @Column
  memberId!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @AllowNull(false)
  @ForeignKey(() => Role)
  @Column
  roleId!: number;

  @BelongsTo(() => Schedule)
  schedule!: Schedule;

  @AllowNull(false)
  @ForeignKey(() => Schedule)
  @Column
  scheduleId!: number;
}
