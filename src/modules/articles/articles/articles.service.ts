import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Article } from '../entities/article.entity';
import { CreateArticleDto } from '../dto/create-article.dto';
import { UpdateArticleDto } from '../dto/update-article.dto';
import { QueryArticleDto } from '../dto/query-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) { }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    try {
      const article = this.articleRepository.create(createArticleDto);
      return await this.articleRepository.save(article);
    } catch (error) {
      throw new BadRequestException('Error al crear el artículo');
    }
  }

  async findAll(queryDto: QueryArticleDto): Promise<{
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
    const { id, nombre, activo, page = 1, limit = 10 } = queryDto;
    const where: any = {};

    if (id) {
      where.id = parseInt(id);
    }

    if (nombre) {
      where.nombre = Like(`%${nombre}%`);
    }

    if (activo !== undefined) {
      if (activo === 'true') {
        where.activo = true;
      } else if (activo === 'false') {
        where.activo = false;
      }
    }

    const offset = (page - 1) * limit;

    const [data, total] = await this.articleRepository.findAndCount({
      where,
      order: {
        fechaModificacion: 'DESC',
      },
      take: limit,
      skip: offset,
    });

    const totalPages = Math.ceil(total / limit);
    const hasNext = page < totalPages;
    const hasPrevious = page > 1;

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext,
        hasPrevious,
      },
    };
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException(`Artículo con ID ${id} no encontrado`);
    }

    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    const article = await this.findOne(id);

    if (updateArticleDto.fechaModificacion) {
      updateArticleDto.fechaModificacion = new Date(updateArticleDto.fechaModificacion).toISOString();
    }

    try {
      await this.articleRepository.update(id, updateArticleDto);
      return await this.findOne(id);
    } catch (error) {
      throw new BadRequestException('Error al actualizar el artículo');
    }
  }

  async remove(id: number): Promise<{ message: string; article: Article }> {
    const article = await this.findOne(id);

    if (!article.activo) {
      throw new BadRequestException('El artículo ya está desactivado');
    }

    await this.articleRepository.update(id, { activo: false });
    const updatedArticle = await this.findOne(id);

    return {
      message: 'Artículo desactivado correctamente',
      article: updatedArticle,
    };
  }
}