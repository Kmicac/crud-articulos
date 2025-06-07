import { IsOptional, IsString, IsBoolean, IsNumberString, IsPositive, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class QueryArticleDto {
  @ApiProperty({
    description: 'Búsqueda por ID exacto',
    example: '1',
    required: false,
  })
  @IsOptional()
  @IsNumberString({}, { message: 'El ID debe ser un número válido' })
  id?: string;

  @ApiProperty({
    description: 'Búsqueda parcial por nombre',
    example: 'Laptop',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Transform(({ value }) => value?.trim())
  nombre?: string;

@ApiProperty({
  description: 'Filtrar por estado de activación',
  example: 'true',
  required: false,
})
@IsOptional()
activo?: string;

@ApiProperty({
  description: 'Número de página (empezando desde 1)',
  example: 1,
  required: false,
  default: 1,
})
@IsOptional()
@Transform(({ value }) => parseInt(value))
@IsPositive({ message: 'La página debe ser un número positivo' })
@Min(1, { message: 'La página debe ser mayor a 0' })
page?: number = 1;

@ApiProperty({
  description: 'Cantidad de elementos por página',
  example: 10,
  required: false,
  default: 10,
})
@IsOptional()
@Transform(({ value }) => parseInt(value))
@IsPositive({ message: 'El límite debe ser un número positivo' })
@Min(1, { message: 'El límite debe ser mayor a 0' })
limit?: number = 10;
}