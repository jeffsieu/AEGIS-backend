import {
  Column,
  Table,
  BelongsTo,
  Model,
  ForeignKey,
  AllowNull,
  DataType,
} from 'sequelize-typescript';
import Member from './member.model';
import RoleInstance from './role-instance.model';
import Schedule from './schedule.model';

@Table
export default class Duty extends Model<Duty> {
  @AllowNull(false)
  @Column(DataType.DATEONLY)
  date!: Date;

  @BelongsTo(() => Member)
  member!: Member;

  @AllowNull(true)
  @ForeignKey(() => Member)
  @Column
  memberId!: number;

  @BelongsTo(() => RoleInstance)
  roleInstance!: RoleInstance;

  @AllowNull(false)
  @ForeignKey(() => RoleInstance)
  @Column
  roleInstanceId!: number;

  @BelongsTo(() => Schedule)
  schedule!: Schedule;

  @AllowNull(false)
  @ForeignKey(() => Schedule)
  @Column
  scheduleId!: number;
}
