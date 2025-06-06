import { IsOptional, IsString, IsBoolean, IsNumberString } from 'class-validator';
import { Transform } from 'class-transformer';
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
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsBoolean({ message: 'El campo activo debe ser true o false' })
  activo?: boolean;
}