class RecintosZoo {
  constructor() {
    this.animais = [
      { especie: 'LEAO', carnivoro: true, tamanho: 3, bioma: ['savana'] },
      { especie: 'LEOPARDO', carnivoro: true, tamanho: 2, bioma: ['savana'] },
      { especie: 'CROCODILO', carnivoro: true, tamanho: 3, bioma: ['rio'] },
      {
        especie: 'MACACO',
        carnivoro: false,
        tamanho: 1,
        bioma: ['savana', 'floresta'],
      },
      { especie: 'GAZELA', carnivoro: false, tamanho: 2, bioma: ['savana'] },
      {
        especie: 'HIPOPOTAMO',
        carnivoro: false,
        tamanho: 4,
        bioma: ['savana', 'rio'],
      },
    ];

    this.recintos = [
      {
        numero: 1,
        bioma: ['savana'],
        tamanhoTotal: 10,
        animaisExistentes: [{ tipo: 'MACACO', quantidade: 3 }],
      },
      {
        numero: 2,
        bioma: ['floresta'],
        tamanhoTotal: 5,
        animaisExistentes: [],
      },
      {
        numero: 3,
        bioma: ['savana', 'rio'],
        tamanhoTotal: 7,
        animaisExistentes: [{ tipo: 'GAZELA', quantidade: 1 }],
      },
      { numero: 4, bioma: ['rio'], tamanhoTotal: 8, animaisExistentes: [] },
      {
        numero: 5,
        bioma: ['savana'],
        tamanhoTotal: 9,
        animaisExistentes: [{ tipo: 'LEAO', quantidade: 1 }],
      },
    ];
  }

  analisaRecintos(animal, quantidade) {
    const animalCompativel = this.animais.find((a) => a.especie === animal);
    let recintosViaveis = [];

    if (!animalCompativel) {
      return { erro: 'Animal inválido', recintosViaveis: null };
    }

    if (quantidade <= 0) {
      return { erro: 'Quantidade inválida', recintosViaveis: null };
    }

    this.recintos.forEach((recinto) => {
      const recintoValido = recinto.bioma.some((biomaOuRecinto) =>
        animalCompativel.bioma.includes(biomaOuRecinto)
      );
      if (!recintoValido) return;

      const recintosHabitados = recinto.animaisExistentes.length > 0;

      // LÓGICA DO MACACO AQUI! --- sem entender ainda oq pede exatamente a regra 05.
      if (animal === 'MACACO' && !recintosHabitados) {
        if (quantidade < 2) return;
      }

      if (animalCompativel.carnivoro && recintosHabitados) {
        const seExisteOutroAnimal = recinto.animaisExistentes.some(
          (animais) => animais.tipo !== animal
        );
        if (seExisteOutroAnimal) return;
      }

      const seTemCarnivoroNoRecinto = recinto.animaisExistentes.some(
        (animais) => {
          let informacaoDoAnimal = this.animais.find(
            (a) => a.especie === animais.tipo
          );
          return informacaoDoAnimal.carnivoro;
        }
      );

      if (seTemCarnivoroNoRecinto && !animalCompativel.carnivoro) return;

      const espacoOcupado = recinto.animaisExistentes.reduce((total, ani) => {
        let infoAnimal = this.animais.find((a) => a.especie === ani.tipo);
        return total + infoAnimal.tamanho * ani.quantidade;
      }, 0);

      const espacoNecessario = animalCompativel.tamanho * quantidade;
      let espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;

      if (recintosHabitados) {
        let existeOutraEspecie = recinto.animaisExistentes.some(
          (ani) => ani.tipo !== animal
        );

        if (animal === 'HIPOPOTAMO' && existeOutraEspecie) {
          const biomaIncluiSavanaRio =
            recinto.bioma.includes('savana') && recinto.bioma.includes('rio');
          if (!biomaIncluiSavanaRio) return;
        }

        if (existeOutraEspecie) {
          espacoDisponivel -= 1;
        }
      }

      const espacoLivreApos = espacoDisponivel - espacoNecessario;

      if (espacoDisponivel < espacoNecessario) return;

      recintosViaveis.push(
        `Recinto ${recinto.numero} (espaço livre: ${espacoLivreApos} total: ${recinto.tamanhoTotal})`
      );
    });

    recintosViaveis.sort((a, b) => {
      const numeroA = parseInt(a.match(/Recinto (\d+)/)[1]);
      const numeroB = parseInt(b.match(/Recinto (\d+)/)[1]); //'d' é digito, blz? d+ -> 1 ou + digitos
      return numeroA - numeroB;
    });

    if (recintosViaveis.length > 0) {
      return { erro: null, recintosViaveis };
    } else {
      return { erro: 'Não há recinto viável', recintosViaveis: null };
    }
  }
}

export { RecintosZoo as RecintosZoo };
