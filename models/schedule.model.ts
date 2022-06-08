import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import Duty from './duty.model';

@Table
export default class Schedule extends Model<Schedule> {
  @Default(false)
  @Column
  isPublished!: boolean;

  @AllowNull(false)
  @Column(DataType.DATEONLY)
  month!: Date;

  @HasMany(() => Duty)
  duties!: Duty[];
}
