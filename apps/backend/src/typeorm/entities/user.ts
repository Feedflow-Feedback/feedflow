// user.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Project } from './project'; // Adjust the import path as necessary

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ length: 255 })
  email: string;

  @Column({ select: false })
  password: string;

  @ManyToMany(() => Project, { nullable: true })
  @JoinTable()
  projects: Project[];
}
