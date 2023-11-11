import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Cart } from 'src/carts/entities/cart.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  imageURL: string;

  @Column()
  category: string;

  @ManyToOne(() => User, (user) => user.products)
  admin: User;

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];
}
