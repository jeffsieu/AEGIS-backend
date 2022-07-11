import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Member from './member.model';
import RequestDate from './request-date.model';

@Table
export default class Request extends Model<Request> {
  @AllowNull(false)
  @Column
  reason!: string;

  @HasMany(() => RequestDate)
  dates!: RequestDate[];

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
