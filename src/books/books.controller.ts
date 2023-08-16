import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookEntity } from './entities/book.entity';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  async create(@Body() book: BookEntity): Promise<BookEntity> {
    return await this.booksService.create(book);
  }

  @Get()
  async findAll(): Promise<BookEntity[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BookEntity> {
    return this.booksService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() book: BookEntity,
  ): Promise<number> {
    return this.booksService.update(+id, book);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<number> {
    return this.booksService.remove(+id);
  }
}
