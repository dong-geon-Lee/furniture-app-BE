// import { Product } from 'src/products/entities/product.entity';
import { Product } from 'src/products/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  // @OneToMany(() => Product, (product) => product.admin)
  // products: Product[];

  @OneToMany(() => Product, (product) => product.admin)
  products: Product[];
}
