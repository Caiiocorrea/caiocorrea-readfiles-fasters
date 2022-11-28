/* eslint-disable prettier/prettier */
import { Ticker } from 'src/core/entities/ticker-entity';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import * as CSVToJSON from 'csvtojson';
import * as moment from 'moment';
import { Model } from 'mongoose';
import * as fs from 'fs';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel('Ticker') private tickerModel: Model<Ticker>
  ) { }

  async execute(filename: string, fieldname: string) {
    return CSVToJSON().fromFile(`./upload/${filename}`).then(async (data_csv) => {
      fs.unlinkSync(`./upload/${filename}`); //Delete file
      data_csv.map(async (new_data_csv) => {//Read historical stock quotes files
        new_data_csv.Month = moment(new_data_csv.Date).format('MMMM');
        new_data_csv.Date = moment(new_data_csv.Date).year();
        new_data_csv.Ticker = fieldname;
        await new this.tickerModel(new_data_csv).save();
      });
      return { message: 'File uploaded successfully!' };
    });
  }
}
