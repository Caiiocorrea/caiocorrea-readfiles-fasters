import { Injectable } from '@nestjs/common';

@Injectable()
export class highestPriceService {
  //O maior preço alcançado pela ação no mês (High);
  async execute(array, propriedade) {
    return array.reduce((objeto, elementoAtual) => {
      const grupo = elementoAtual[propriedade];
      if (!objeto.hasOwnProperty(grupo)) {
        objeto[grupo] = [];
      }
      objeto[grupo].push(elementoAtual.High);
      return objeto;
    }, {});
  }
}
