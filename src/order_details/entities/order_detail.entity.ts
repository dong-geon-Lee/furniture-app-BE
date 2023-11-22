import { Order } from 'src/orders/entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orderDetails' })
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  cartItems: any[];

  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.orderDetails)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  @JoinColumn({ name: 'orderId' })
  order: Order;
}
