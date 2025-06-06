import { IsNotEmpty, IsString, MaxLength, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateArticleDto {
  @ApiProperty({
    description: 'Nombre del artículo',
    example: 'Laptop Dell Inspiron 15',
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MaxLength(255, { message: 'El nombre no puede exceder 255 caracteres' })
  @Transform(({ value }) => value?.trim())
  nombre: string;

  @ApiProperty({
    description: 'Marca del artículo',
    example: 'Dell',
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'La marca es obligatoria' })
  @IsString({ message: 'La marca debe ser una cadena de texto' })
  @MaxLength(100, { message: 'La marca no puede exceder 100 caracteres' })
  @Transform(({ value }) => value?.trim())
  marca: string;

  @ApiProperty({
    description: 'Estado de activación del artículo',
    example: true,
    default: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'El campo activo debe ser un valor booleano' })
  activo?: boolean = true;
}