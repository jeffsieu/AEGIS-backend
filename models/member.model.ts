import {
  AllowNull,
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';

import Role from './role.model';
import Duty from './duty.model';
import Qualification from './qualification.model';

@Table
export default class Member extends Model<Member> {
  @AllowNull(false)
  @Unique
  @Column
  callsign!: string;

  @AllowNull(false)
  @Column
  squadron!: string;

  @AllowNull(false)
  @Column
  type!: string;

  @BelongsToMany(() => Role, () => Qualification)
  roles!: Role[];

  @HasMany(() => Duty)
  duties!: Duty[];
}
