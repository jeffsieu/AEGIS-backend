import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';

import Role from './role.model';
import Duty from './duty.model';
import Qualification from './qualification.model';
import Request from './request.model';

@Table
export default class Member extends Model<Member> {
  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING,
    validate: {
      notEmpty: { msg: 'Callsign must not be empty' },
    },
  })
  callsign!: string;

  @AllowNull(false)
  @Column
  sqn!: string;

  @AllowNull(false)
  @Column
  type!: string;

  @BelongsToMany(() => Role, () => Qualification)
  roles!: Role[];

  @HasMany(() => Duty)
  duties!: Duty[];

  @HasMany(() => Request)
  requests!: Request[];
}
