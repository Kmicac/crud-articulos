import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('articles')
export class Article {
  @ApiProperty({
    description: 'Identificador único del artículo',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Nombre del artículo',
    example: 'Laptop Dell Inspiron',
    maxLength: 255,
  })
  @Column({ type: 'varchar', length: 255, nullable: false })
  nombre: string;

  @ApiProperty({
    description: 'Marca del artículo',
    example: 'Dell',
    maxLength: 100,
  })
  @Column({ type: 'varchar', length: 100, nullable: false })
  marca: string;

  @ApiProperty({
    description: 'Fecha de última modificación',
    example: '2024-06-05T10:30:00.000Z',
  })
  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @ApiProperty({
    description: 'Estado de activación del artículo',
    example: true,
    default: true,
  })
  @Column({ type: 'boolean', default: true })
  activo: boolean;

  @ApiProperty({
    description: 'Fecha de creación del artículo',
    example: '2024-06-01T08:00:00.000Z',
  })
  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;
}