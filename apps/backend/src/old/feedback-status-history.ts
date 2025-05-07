// feedback-status-history.entity.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
//import { Feedback } from './feedback';
import { Admin } from './admin';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    forwardRef(() => FeedbackStatusHistory),
  ],
  /*providers: [FeedbackService],
    controllers: [FeedbackController],
    exports: [FeedbackService],*/
})
@Entity('feedback_status_history')
export class FeedbackStatusHistory {
  @PrimaryColumn('uuid')
  id: string;

  /*@ManyToOne(() => Feedback, (feedback) => feedback.statusHistory, {
    onDelete: 'CASCADE',
  })*/
  /*@JoinColumn({ name: 'feedback_id' })
  feedback: Feedback;*/

  @ManyToOne(() => Admin, (admin) => admin.statusChanges)
  @JoinColumn({ name: 'changed_by' })
  changed_by: Admin;

  @Column({
    type: 'enum',
    enum: ['open', 'resolved'],
  })
  old_status: 'open' | 'resolved';

  @Column({
    type: 'enum',
    enum: ['open', 'resolved'],
  })
  new_status: 'open' | 'resolved';

  @CreateDateColumn()
  changed_at: Date;
}
