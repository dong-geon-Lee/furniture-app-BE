import { Cart } from 'src/carts/entities/cart.entity';
import { OrderDetail } from 'src/order_details/entities/order_detail.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { Shipping } from 'src/shippings/entities/shipping.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Product, (product) => product.admin)
  products: Product[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.user)
  orderDetails: OrderDetail[];

  @OneToOne(() => Shipping, (shippings) => shippings.user)
  shippings: Shipping;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
