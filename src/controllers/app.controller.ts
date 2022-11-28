/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Query, UploadedFiles, UseInterceptors, } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { monthsService } from '../use-cases/ticker-the-for-month.service';
import { UploadService } from '../use-cases/upload-file.service';
import { tickerRequestDto } from '../core/dto/ticker-request';

@Controller()
export class AppController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly monthService: monthsService,
  ) { }

  @Get('ticker')
  async tickers(@Query() tickerrequestdto: tickerRequestDto) {
    return await this.monthService.execute(tickerrequestdto);
  }

  @Post('upload')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.uploadService.execute(files[0].filename, files[0].fieldname,);
  }
}
