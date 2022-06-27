import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Member from './member.model';

@Table
export default class Request extends Model<Request> {
  @Column
  startDate!: Date;

  @Column
  endDate!: Date;

  @AllowNull(false)
  @Column
  reason!: string;

  @BelongsTo(() => Member)
  member!: Member;

  @AllowNull(false)
  @ForeignKey(() => Member)
  @Column
  memberId!: number;

  @AllowNull(false)
  @Column(DataTypes.ENUM('Work', 'Personal'))
  type!: 'Work' | 'Personal';
}
