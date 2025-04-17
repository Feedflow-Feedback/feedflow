// media-file.entity.ts
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Feedback } from './feedback';

@Entity('media_files')
export class MediaFile {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => Feedback, (feedback) => feedback.mediaFiles, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'feedback_id' })
  feedback: Feedback;

  @Column('text')
  file_url: string;

  @Column({
    type: 'enum',
    enum: ['image', 'video'],
  })
  file_type: 'image' | 'video';

  @CreateDateColumn()
  uploaded_at: Date;
}
