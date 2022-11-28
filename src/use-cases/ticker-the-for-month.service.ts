/* eslint-disable prettier/prettier */
import { tickerResponseDto } from 'src/core/dto/ticker.response';
import { highestPriceService } from './highest-price.service';
import { tickerRequestDto } from '../core/dto/ticker-request';
import { lowestPriceService } from './lowest-price.service';
import { closePriceService } from './close-price.service';
import { Ticker } from 'src/core/entities/ticker-entity';
import { openPriceService } from './open-price.service';
import { volumeService } from './volume-month.service';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Model } from 'mongoose';

@Injectable()
export class monthsService {
    private readonly tickerResponseDto: tickerResponseDto[] = [];

    constructor(
        private readonly openPrice: openPriceService,
        private readonly highestPrice: highestPriceService,
        private readonly lowestPrice: lowestPriceService,
        private readonly volumeMonth: volumeService,
        private readonly closePrice: closePriceService,
        @InjectModel('Ticker') private tickerModel: Model<Ticker>,
    ) { }

    //Format month by month
    async execute(tickerrequestdto: tickerRequestDto) {
        return await this.tickerModel.find({ Date: tickerrequestdto.year, Ticker: tickerrequestdto.ticker }).then((data) => {
            return data.reduce(async (groupMonths, currentmonthgroup) => {
                const grupo = currentmonthgroup["Month"];
                if (!groupMonths.hasOwnProperty(grupo)) {
                    groupMonths[grupo] = [];
                }

                //Group and calculate properties
                groupMonths[grupo].push({
                    Month: currentmonthgroup.Month,
                    open_price: await this.openPrice.execute(data, 'Month').then((open) => +open[grupo][0]),
                    highest_price: await this.highestPrice.execute(data, 'Month').then((high) => Math.max(...high[grupo])),
                    lowest_price: await this.lowestPrice.execute(data, 'Month').then((low) => Math.min(...low[grupo])),
                    volume: await this.volumeMonth.execute(data, 'Month').then((volume) => +volume[grupo].reduce((accum, curr) => parseFloat(accum + curr).toFixed(2),)),
                    close_price: await this.closePrice.execute(data, 'Month').then((close) => +close[grupo][close[grupo].length - 1]),
                    ticker: tickerrequestdto.ticker,
                    Date: moment(currentmonthgroup.Date).year(),
                });

                //Clear array before display
                this.tickerResponseDto.push(groupMonths[grupo][0]);
                [this.tickerResponseDto].reduce((acc, it) => [...acc, ...it], [])
                return this.tickerResponseDto.filter(function (data) { return !this[JSON.stringify(data)] && (this[JSON.stringify(data)] = true) }, Object.create(null))
            }, {});
        })
    }
}
