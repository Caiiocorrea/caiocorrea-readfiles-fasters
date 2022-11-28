import { Injectable } from '@nestjs/common';

@Injectable()
export class volumeService {
  //O volume total de vendas no mês (Volume);
  async execute(array: any[], propriedade: string) {
    return array.reduce((objeto, elementoAtual) => {
      const grupo = elementoAtual[propriedade];
      if (!objeto.hasOwnProperty(grupo)) {
        objeto[grupo] = [];
      }
      objeto[grupo].push(elementoAtual.Volume);
      return objeto;
    }, {});
  }
}
