import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { ArticlesService } from '../articles/articles/articles.service';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { QueryArticleDto } from './dto/query-article.dto';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let repository: Repository<Article>;

  const mockArticle: Article = {
    id: 1,
    nombre: 'Test Article',
    marca: 'Test Brand',
    activo: true,
    fechaCreacion: new Date('2024-01-01'),
    fechaModificacion: new Date('2024-01-01'),
  };

  const mockArticles: Article[] = [
    mockArticle,
    {
      id: 2,
      nombre: 'Second Article',
      marca: 'Second Brand',
      activo: false,
      fechaCreacion: new Date('2024-01-02'),
      fechaModificacion: new Date('2024-01-02'),
    },
  ];

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findAndCount: jest.fn(),
    update: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getRepositoryToken(Article),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    repository = module.get<Repository<Article>>(getRepositoryToken(Article));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new article successfully', async () => {
      const createArticleDto: CreateArticleDto = {
        nombre: 'Test Article',
        marca: 'Test Brand',
        activo: true,
      };

      mockRepository.create.mockReturnValue(mockArticle);
      mockRepository.save.mockResolvedValue(mockArticle);

      const result = await service.create(createArticleDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createArticleDto);
      expect(mockRepository.save).toHaveBeenCalledWith(mockArticle);
      expect(result).toEqual(mockArticle);
    });

    it('should throw BadRequestException when save fails', async () => {
      const createArticleDto: CreateArticleDto = {
        nombre: 'Test Article',
        marca: 'Test Brand',
        activo: true,
      };

      mockRepository.create.mockReturnValue(mockArticle);
      mockRepository.save.mockRejectedValue(new Error('Database error'));

      await expect(service.create(createArticleDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return paginated articles without filters', async () => {
      const queryDto: QueryArticleDto = { page: 1, limit: 10 };
      const expectedResult = {
        data: mockArticles,
        pagination: {
          page: 1,
          limit: 10,
          total: 2,
          totalPages: 1,
          hasNext: false,
          hasPrevious: false,
        },
      };

      mockRepository.findAndCount.mockResolvedValue([mockArticles, 2]);

      const result = await service.findAll(queryDto);

      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        where: {},
        order: { fechaModificacion: 'DESC' },
        take: 10,
        skip: 0,
      });
      expect(result).toEqual(expectedResult);
    });

    it('should return paginated articles with filters', async () => {
      const queryDto: QueryArticleDto = {
        nombre: 'Test',
        activo: 'true',
        page: 1,
        limit: 5,
      };

      mockRepository.findAndCount.mockResolvedValue([[mockArticle], 1]);

      const result = await service.findAll(queryDto);

      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        where: {
          nombre: expect.objectContaining({
            _type: 'like',
            _value: '%Test%',
          }),
          activo: true,
        },
        order: { fechaModificacion: 'DESC' },
        take: 5,
        skip: 0,
      });
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });

    it('should handle ID filter correctly', async () => {
      const queryDto: QueryArticleDto = {
        id: '1',
        page: 1,
        limit: 10,
      };

      mockRepository.findAndCount.mockResolvedValue([[mockArticle], 1]);

      await service.findAll(queryDto);

      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        where: { id: 1 },
        order: { fechaModificacion: 'DESC' },
        take: 10,
        skip: 0,
      });
    });

    it('should calculate pagination correctly for multiple pages', async () => {
      const queryDto: QueryArticleDto = { page: 2, limit: 1 };

      mockRepository.findAndCount.mockResolvedValue([[mockArticles[1]], 2]);

      const result = await service.findAll(queryDto);

      expect(result.pagination).toEqual({
        page: 2,
        limit: 1,
        total: 2,
        totalPages: 2,
        hasNext: false,
        hasPrevious: true,
      });
    });
  });

  describe('findOne', () => {
    it('should return an article when found', async () => {
      mockRepository.findOne.mockResolvedValue(mockArticle);

      const result = await service.findOne(1);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockArticle);
    });

    it('should throw NotFoundException when article not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(
        NotFoundException,
      );
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe('update', () => {
    it('should update an article successfully', async () => {
      const updateArticleDto: UpdateArticleDto = {
        nombre: 'Updated Article',
        marca: 'Updated Brand',
      };

      const updatedArticle = { ...mockArticle, ...updateArticleDto };

      mockRepository.findOne
        .mockResolvedValueOnce(mockArticle) 
        .mockResolvedValueOnce(updatedArticle);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(1, updateArticleDto);

      expect(mockRepository.update).toHaveBeenCalledWith(1, updateArticleDto);
      expect(result).toEqual(updatedArticle);
    });

    it('should handle custom fechaModificacion', async () => {
      const updateArticleDto: UpdateArticleDto = {
        nombre: 'Updated Article',
        fechaModificacion: '2024-12-31T23:59:59.000Z',
      };

      mockRepository.findOne
        .mockResolvedValueOnce(mockArticle)
        .mockResolvedValueOnce(mockArticle);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      await service.update(1, updateArticleDto);

      expect(mockRepository.update).toHaveBeenCalledWith(1, {
        nombre: 'Updated Article',
        fechaModificacion: '2024-12-31T23:59:59.000Z',
      });
    });

    it('should throw NotFoundException when article not found', async () => {
      const updateArticleDto: UpdateArticleDto = {
        nombre: 'Updated Article',
      };

      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update(999, updateArticleDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when update fails', async () => {
      const updateArticleDto: UpdateArticleDto = {
        nombre: 'Updated Article',
      };

      mockRepository.findOne.mockResolvedValue(mockArticle);
      mockRepository.update.mockRejectedValue(new Error('Database error'));

      await expect(service.update(1, updateArticleDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('remove', () => {
    it('should deactivate an article successfully', async () => {
      const activeArticle = { ...mockArticle, activo: true };
      const deactivatedArticle = { ...mockArticle, activo: false };

      mockRepository.findOne
        .mockResolvedValueOnce(activeArticle) 
        .mockResolvedValueOnce(deactivatedArticle); 
      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);

      expect(mockRepository.update).toHaveBeenCalledWith(1, { activo: false });
      expect(result).toEqual({
        message: 'Artículo desactivado correctamente',
        article: deactivatedArticle,
      });
    });

    it('should throw BadRequestException when article is already inactive', async () => {
      const inactiveArticle = { ...mockArticle, activo: false };

      mockRepository.findOne.mockResolvedValue(inactiveArticle);

      await expect(service.remove(1)).rejects.toThrow(
        BadRequestException,
      );
      expect(mockRepository.update).not.toHaveBeenCalled();
    });

    it('should throw NotFoundException when article not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty result in findAll', async () => {
      const queryDto: QueryArticleDto = { page: 1, limit: 10 };

      mockRepository.findAndCount.mockResolvedValue([[], 0]);

      const result = await service.findAll(queryDto);

      expect(result.data).toEqual([]);
      expect(result.pagination.total).toBe(0);
      expect(result.pagination.totalPages).toBe(0);
    });

    it('should handle invalid activo filter', async () => {
      const queryDto: QueryArticleDto = {
        activo: undefined, 
        page: 1,
        limit: 10,
      };

      mockRepository.findAndCount.mockResolvedValue([mockArticles, 2]);

      await service.findAll(queryDto);

      expect(mockRepository.findAndCount).toHaveBeenCalledWith({
        where: {}, 
        order: { fechaModificacion: 'DESC' },
        take: 10,
        skip: 0,
      });
    });

    it('should handle large page numbers', async () => {
      const queryDto: QueryArticleDto = { page: 999, limit: 10 };

      mockRepository.findAndCount.mockResolvedValue([[], 2]);

      const result = await service.findAll(queryDto);

      expect(result.pagination.hasNext).toBe(false);
      expect(result.pagination.hasPrevious).toBe(true);
    });
  });
});
