
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('feedbacks')
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sessionId: string;

  @Column()
  fromUserId: string;

  @Column()
  toUserId: string;

  @Column({ type: 'int', nullable: false })
  rating: number; // 1-5 scale

  @Column({ type: 'text', nullable: true })
  comment: string;

  @Column({ default: 'general' })
  type: string; // 'session', 'general', etc.

  @CreateDateColumn()
  createdAt: Date;
}
