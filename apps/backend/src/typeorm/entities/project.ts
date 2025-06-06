import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { Feedback } from './feedback';
import { User } from './user';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  url: string;

  @Column('text', { nullable: true })
  description?: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Feedback, (feedback) => feedback.project)
  feedbacks: Feedback[];

  @ManyToOne(() => User, (user) => user.projects)
  user: User;
}
