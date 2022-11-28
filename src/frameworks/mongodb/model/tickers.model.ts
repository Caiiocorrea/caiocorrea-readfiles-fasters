import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TickerDocument = HydratedDocument<Ticker>;

@Schema()
export class Ticker {
  @Prop({ required: true })
  Date: string;

  @Prop({ required: true })
  Open: string;

  @Prop({ required: true })
  High: string;

  @Prop({ required: true })
  Low: string;

  @Prop({ required: true })
  Volume: string;

  @Prop({ required: true })
  Close: string;

  @Prop({ required: true })
  Month: string;

  @Prop({ required: true })
  Ticker: string;
}

export const TickerSchema = SchemaFactory.createForClass(Ticker);
