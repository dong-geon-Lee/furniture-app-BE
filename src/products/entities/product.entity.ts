import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

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

  // @Column()
  // imageKey: string;

  // @Column()
  // imageBuffer: string;
  // @ManyToOne(() => User, (user) => user.products)
  // admin: User;
}
