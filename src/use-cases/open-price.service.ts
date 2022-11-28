import { Injectable } from '@nestjs/common';

@Injectable()
export class openPriceService {
  //Preço de abertura no primeiro dia do mês (Open);
  async execute(array, propriedade) {
    return array.reduce((objeto, elementoAtual) => {
      const grupo = elementoAtual[propriedade];
      if (!objeto.hasOwnProperty(grupo)) {
        objeto[grupo] = [];
      }
      objeto[grupo].push(elementoAtual.Open);
      return objeto;
    }, {});
  }
}
