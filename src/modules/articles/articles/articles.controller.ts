import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiSecurity,
} from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { QueryArticleDto } from '../dto/query-article.dto';
import { Article } from '../entities/article.entity';
import { ApiKeyGuard } from '../../../common/guards/api-key/api-key.guard';

@ApiTags('articles')
@ApiSecurity('X-API-KEY')
@Controller('articles')
@UseGuards(ApiKeyGuard)
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo artículo',
    description: 'Crea un nuevo artículo con los datos proporcionados',
  })
  @ApiResponse({
    status: 201,
    description: 'Artículo creado exitosamente',
    type: Article,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  async create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articlesService.create(createArticleDto);
  }

@Get()
@ApiOperation({
  summary: 'Obtener todos los artículos',
  description: 'Obtiene una lista paginada de artículos con filtros opcionales',
})
@ApiQuery({
  name: 'id',
  required: false,
  description: 'Filtrar por ID exacto',
  example: '1',
})
@ApiQuery({
  name: 'nombre',
  required: false,
  description: 'Filtrar por nombre (búsqueda parcial)',
  example: 'Laptop',
})
@ApiQuery({
  name: 'activo',
  required: false,
  description: 'Filtrar por estado de activación',
  example: 'true',
})
@ApiQuery({
  name: 'page',
  required: false,
  description: 'Número de página',
  example: 1,
})
@ApiQuery({
  name: 'limit',
  required: false,
  description: 'Elementos por página',
  example: 10,
})
@ApiResponse({
  status: 200,
  description: 'Lista paginada de artículos obtenida exitosamente',
  schema: {
    type: 'object',
    properties: {
      data: {
        type: 'array',
        items: { $ref: '#/components/schemas/Article' },
      },
      pagination: {
        type: 'object',
        properties: {
          page: { type: 'number', example: 1 },
          limit: { type: 'number', example: 10 },
          total: { type: 'number', example: 25 },
          totalPages: { type: 'number', example: 3 },
          hasNext: { type: 'boolean', example: true },
          hasPrevious: { type: 'boolean', example: false },
        },
      },
    },
  },
})
async findAll(@Query() queryDto: QueryArticleDto): Promise<{
  data: Article[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}> {
  return await this.articlesService.findAll(queryDto);
}

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un artículo por ID',
    description: 'Obtiene los detalles de un artículo específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del artículo',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Artículo encontrado',
    type: Article,
  })
  @ApiResponse({
    status: 404,
    description: 'Artículo no encontrado',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return await this.articlesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un artículo',
    description: 'Actualiza uno o varios campos de un artículo existente',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del artículo a actualizar',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Artículo actualizado exitosamente',
    type: Article,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: 404,
    description: 'Artículo no encontrado',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<Article> {
    return await this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Desactivar un artículo',
    description: 'Desactiva un artículo (eliminación lógica)',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del artículo a desactivar',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Artículo desactivado exitosamente',
  })
  @ApiResponse({
    status: 400,
    description: 'El artículo ya está desactivado',
  })
  @ApiResponse({
    status: 404,
    description: 'Artículo no encontrado',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{
    message: string;
    article: Article;
  }> {
    return await this.articlesService.remove(id);
  }
}