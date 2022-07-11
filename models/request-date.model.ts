import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import Request from './request.model';

@Table
export default class RequestDate extends Model<RequestDate> {
  @AllowNull(false)
  @ForeignKey(() => Request)
  @Column
  requestId!: number;

  @BelongsTo(() => Request)
  request!: Request;

  @AllowNull(false)
  @Column
  date!: Date;
}
