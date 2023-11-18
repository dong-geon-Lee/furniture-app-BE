import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'shippings' })
export class Shipping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'user_email' })
  userEmail: string;

  @Column({ name: 'user_phone' })
  userPhone: string;

  @Column()
  address: string;

  @Column({ default: '카카오페이' })
  method: string;

  @Column({ name: 'post_code' })
  postcode: number;

  @Column({ name: 'product_price' })
  productPrice: number;

  @Column({ name: 'product_ship' })
  productShip: number;

  @Column({ name: 'product_total' })
  productTotal: number;

  @OneToOne(() => User, (user) => user.shippings)
  @JoinColumn({ name: 'userId' })
  user: User;
}
