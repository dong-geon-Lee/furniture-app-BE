import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'imp_uid' })
  impUid: string;

  @Column({ name: 'merchant_uid' })
  merchantUid: string;

  @Column({ name: 'buyer_addr' })
  buyerAddr: string;

  @Column({ name: 'buyer_email' })
  buyerEmail: string;

  @Column({ name: 'buyer_name' })
  buyerName: string;

  @Column({ name: 'buyer_tel' })
  buyerTel: string;

  @Column({ name: 'buyer_postcode' })
  buyerPostcode: string;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'pay_method' })
  payMethod: string;

  @Column({ name: 'paid_amount' })
  paidAmount: number;

  @Column({ name: 'paid_at' })
  paidAt: number;

  @Column({ name: 'quantity' })
  quantity: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  @JoinColumn({ name: 'orderDetails' })
  orderDetails: OrderDetail[];
}
