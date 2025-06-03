// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Project } from './project'; // Adjust the import path as necessary

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ length: 255 })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];
}
