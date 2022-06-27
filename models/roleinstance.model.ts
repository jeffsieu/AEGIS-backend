import {
    AllowNull,
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    Table,
  } from 'sequelize-typescript';
  import Role from './role.model';
  
  @Table
  export default class Role_Instance extends Model<Role_Instance> {
    @AllowNull(false)
    @ForeignKey(() => Role)
    @Column
    roleId!: number;

    @BelongsTo(() => Role)
    role!: Role[];

    @AllowNull(false)
    @Column
    description!: string;
  }
  