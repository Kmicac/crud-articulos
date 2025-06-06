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
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    try {
      const article = this.articleRepository.create(createArticleDto);
      return await this.articleRepository.save(article);
    } catch (error) {
      throw new BadRequestException('Error al crear el artículo');
    }
  }

  async findAll(queryDto: QueryArticleDto): Promise<Article[]> {
    const { id, nombre, activo } = queryDto;
    const where: any = {};

    if (id) {
      where.id = parseInt(id);
    }

    if (nombre) {
      where.nombre = Like(`%${nombre}%`);
    }

    if (activo !== undefined) {
      where.activo = activo;
    }

    return await this.articleRepository.find({
      where,
      order: {
        fechaModificacion: 'DESC',
      },
    });
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