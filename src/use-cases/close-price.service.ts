import { Injectable } from '@nestjs/common';

@Injectable()
export class closePriceService {
  //O preço de fechamento no último dia do mês (Close);
  async execute(dados, propriedade) {
    return dados.reduce((objeto, elementoAtual) => {
      const grupo = elementoAtual[propriedade];
      if (!objeto.hasOwnProperty(grupo)) {
        objeto[grupo] = [];
      }
      objeto[grupo].push(elementoAtual.Close);
      return objeto;
    }, {});
  }
}
