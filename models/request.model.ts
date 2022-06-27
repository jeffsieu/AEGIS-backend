import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ENUM } from 'sequelize/types';
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

  @Column(ENUM('Work', 'Personal'))
  type!: 'Work' | 'Personal';
}
