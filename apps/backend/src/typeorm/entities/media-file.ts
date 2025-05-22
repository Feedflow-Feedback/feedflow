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

  @Column()
  filename: string;

  @Column()
  mimetype: string;

  @Column({ type: 'longblob' })
  file_data: Buffer;

  @Column({
    type: 'enum',
    enum: ['image'], // restrict to images only
  })
  file_type: 'image';

  @CreateDateColumn()
  uploaded_at: Date;
}
