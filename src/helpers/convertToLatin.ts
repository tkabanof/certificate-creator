export function convertToLatin(text: string) {
  // Создаем объект с соответствиями кирилических и латинских символов
  const cyrillicToLatinMap = {
    а: "a",
    е: "e",
    к: "k",
    м: "m",
    о: "o",
    р: "r",
    с: "c",
    у: "y",
    х: "x",
    А: "A",
    Е: "E",
    К: "K",
    М: "M",
    О: "O",
    Р: "P",
    С: "C",
    Т: "T",
    У: "Y",
    Х: "X",
  } as const;

  // Проходим по каждому символу в переданном тексте
  const convertedText = text
    .split("")
    .map((char) => {
      // Если символ есть в объекте соответствий, заменяем его
      if (cyrillicToLatinMap.hasOwnProperty(char)) {
        // @ts-ignore
        return cyrillicToLatinMap[char];
      }
      // Если символ не найден в объекте соответствий, оставляем его без изменений
      return char;
    })
    .join("");

  return convertedText;
}
