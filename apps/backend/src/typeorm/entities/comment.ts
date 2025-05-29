import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Feedback } from './feedback'; // Adjust the import path as necessary

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  commentId: string;

  @ManyToOne(() => Feedback, (feedback) => feedback.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'feedback_id' })
  feedback: Feedback;

  @CreateDateColumn()
  submitted_at: Date;
  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  author: string;

  @Column('text')
  authorEmail: string;
}
