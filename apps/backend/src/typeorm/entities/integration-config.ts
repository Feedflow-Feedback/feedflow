// integration-config.entity.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './project';

@Entity('integration_configs')
export class IntegrationConfig {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.integrationConfigs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({
    type: 'enum',
    enum: ['trello', 'jira', 'github'],
  })
  provider: 'trello' | 'jira' | 'github';

  @Column('text')
  config: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;
}
