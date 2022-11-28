import { IsNotEmpty, IsString } from 'class-validator';

export class tickerResponseDto {
  @IsString()
  @IsNotEmpty()
  Date: string;

  @IsString()
  @IsNotEmpty()
  Open: string;

  @IsString()
  @IsNotEmpty()
  High: string;

  @IsString()
  @IsNotEmpty()
  Low: string;

  @IsString()
  @IsNotEmpty()
  Volume: string;

  @IsString()
  @IsNotEmpty()
  Close: string;

  @IsString()
  @IsNotEmpty()
  Month: string;

  @IsString()
  @IsNotEmpty()
  Ticker: string;
}
