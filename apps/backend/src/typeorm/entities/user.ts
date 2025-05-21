// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ length: 255 })
  email: string;

  @Column({ select: false })
  password: string;

  @Column('simple-array', { nullable: true })
  projectIds: string[];
}
