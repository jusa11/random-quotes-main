// Генерирует случайную цитату

let lastIndex = null;

function generateRandomInt(qoutes) {
  if (qoutes.length === 1) return qoutes[0];

  let randomNum;

  do {
    randomNum = Math.floor(Math.random() * qoutes.length);
  } while (randomNum === lastIndex);

  lastIndex = randomNum;

  return qoutes[randomNum];
}

export { generateRandomInt };
