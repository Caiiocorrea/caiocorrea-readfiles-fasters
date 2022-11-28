import { Ticker, TickerSchema } from './frameworks/mongodb/model/tickers.model';
import { monthsService } from './use-cases/ticker-the-for-month.service';
import { highestPriceService } from './use-cases/highest-price.service';
import { lowestPriceService } from './use-cases/lowest-price.service';
import { closePriceService } from './use-cases/close-price.service';
import { openPriceService } from './use-cases/open-price.service';
import { volumeService } from './use-cases/volume-month.service';
import { UploadService } from './use-cases/upload-file.service';
import { AppController } from './controllers/app.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING),
    MongooseModule.forFeature([{ name: Ticker.name, schema: TickerSchema }]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    monthsService,
    UploadService,
    openPriceService,
    highestPriceService,
    volumeService,
    closePriceService,
    lowestPriceService,
  ],
})
export class AppModule {}
