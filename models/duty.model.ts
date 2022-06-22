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
import Role_Instance from './roleinstance.model';
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

  @BelongsTo(() => Role_Instance)
  role_instance!: Role_Instance;

  @AllowNull(false)
  @ForeignKey(() => Role_Instance)
  @Column
  role_instanceId!: number;

  @BelongsTo(() => Schedule)
  schedule!: Schedule;

  @AllowNull(false)
  @ForeignKey(() => Schedule)
  @Column
  scheduleId!: number;
}
