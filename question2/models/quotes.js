const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/quotes.json');

// Function to read all quotes
function readAllQuotes() {
  return parse(jsonDbPath, []);
}

// Function to read a single quote by ID
function readOneQuote(id) {
  const quotes = readAllQuotes();
  return quotes.find((quote) => quote.id === id);
}

// Function to add an evaluation to a quote
function evaluateQuote(id, username, score) {
  const quotes = readAllQuotes();
  const quote = quotes.find((q) => q.id === id);

  if (!quote) {
    return { error: 'Quote not found', statusCode: 404 };
  }

  if (score < 0 || score > 10) {
    return { error: 'Invalid score', statusCode: 400 };
  }
  let existingEvaluation = '';
  existingEvaluation = quote.evaluations?.find((evaluation) => evaluation.username === username);

  if (existingEvaluation) {
    return { error: 'User has already evaluated this quote', statusCode: 409 };
  }

  const newEvaluation = { username, score };

  if (!quote.evaluations) {
    quote.evaluations = [];
  }
  quote.evaluations.push(newEvaluation);

  serialize(jsonDbPath, quotes);

  return { idQuote: id, username, score };
}

module.exports = {
  readOneQuote,
  evaluateQuote,
};
