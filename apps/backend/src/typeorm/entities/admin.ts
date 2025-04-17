// admin.entity.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { FeedbackStatusHistory } from './feedback-status-history'; // Correct path if needed

@Entity('admins')
export class Admin {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password_hash: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'owner'],
    default: 'admin',
  })
  role: 'admin' | 'owner';

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => FeedbackStatusHistory, (history) => history.changed_by)
  statusChanges: FeedbackStatusHistory[];
}
