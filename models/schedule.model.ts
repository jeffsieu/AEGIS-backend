import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  Table,
  Unique,
  Validate,
} from 'sequelize-typescript';
import Duty from './duty.model';

@Table
export default class Schedule extends Model<Schedule> {
  @Default(false)
  @Column
  isPublished!: boolean;

  @AllowNull(false)
  @Unique
  @Validate({
    isFirstDayOfMonth(value: string) {
      if (new Date(value).getDate() !== 1) {
        throw new Error(
          'Schedule date must be set to the first day of the month.'
        );
      }
    },
  })
  @Column(DataType.DATEONLY)
  month!: Date;

  @HasMany(() => Duty)
  duties!: Duty[];
}
