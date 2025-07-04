const API_URL = 'https://api.adviceslip.com/advice';

export type MotivationalQuote = {
  id: number;
  text: string;
};

export const getRandomMotivationalQuote = async (): Promise<MotivationalQuote> => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error('Falha ao obter frase motivacional');
    }

    const data = await response.json();

    return {
      id: data.slip.id,
      text: data.slip.advice,
    };
  } catch (error) {
    console.error('Erro ao buscar frase motivacional:', error);
    return {
      id: 0,
      text: 'Acredite em você mesmo e tudo será possível.',
    };
  }
};
