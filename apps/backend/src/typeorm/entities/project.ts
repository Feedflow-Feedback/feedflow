// project.entity.ts
import {
  Entity,
  Column,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Feedback } from './feedback';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Feedback, (feedback) => feedback.project)
  feedbacks: Feedback[];

  /*@OneToMany(() => IntegrationConfig, (config) => config.project)
  integrationConfigs: IntegrationConfig[];*/
}
