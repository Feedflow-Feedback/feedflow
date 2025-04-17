// project.entity.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Feedback } from './feedback';
import { IntegrationConfig } from './integration-config';

@Entity('projects')
export class Project {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column('text', { nullable: true })
  description?: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Feedback, (feedback) => feedback.project)
  feedbacks: Feedback[];

  @OneToMany(() => IntegrationConfig, (config) => config.project)
  integrationConfigs: IntegrationConfig[];
}
