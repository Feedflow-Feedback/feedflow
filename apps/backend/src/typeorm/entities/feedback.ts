// feedback.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Project } from './project';
import { MediaFile } from './media-file';
import { FeedbackStatusHistory } from './feedback-status-history';

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, (project) => project.feedbacks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  htmlElement: string;

  @Column('json', { nullable: true })
  metadata: object;

  @Column({
    type: 'enum',
    enum: ['open', 'resolved'],
    default: 'open',
  })
  status: 'open' | 'resolved';

  @CreateDateColumn()
  submitted_at: Date;
  /*
  @Column({ type: 'varchar', length: 45, nullable: true })
  created_by_ip: string;*/

  @Column({ default: false })
  integration_sent: boolean;

  @OneToMany(() => MediaFile, (media) => media.feedback)
  mediaFiles: MediaFile[];

  @OneToMany(() => FeedbackStatusHistory, (history) => history.feedback)
  feedbackStatusHistories: FeedbackStatusHistory[];
}
