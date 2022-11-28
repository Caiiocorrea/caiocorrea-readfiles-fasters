import { IsNotEmpty, IsString } from 'class-validator';

export class tickerRequestDto {
  @IsString()
  @IsNotEmpty()
  year: string;

  @IsString()
  @IsNotEmpty()
  ticker: string;
}
