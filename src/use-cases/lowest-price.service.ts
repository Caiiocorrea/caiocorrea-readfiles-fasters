import { Injectable } from '@nestjs/common';

@Injectable()
export class lowestPriceService {
  //O menor preço alcançado pela ação no mês (Low);
  async execute(array, propriedade) {
    return array.reduce((objeto, elementoAtual) => {
      const grupo = elementoAtual[propriedade];
      if (!objeto.hasOwnProperty(grupo)) {
        objeto[grupo] = [];
      }
      objeto[grupo].push(elementoAtual.Low);
      return objeto;
    }, {});
  }
}
