import { clearPage, renderPageTitle } from '../../utils/render';
import QuotesLibrary from '../domain/QuotesLibrary';
import imageSecours from '../../img/imageSecours.jpg'

const QuoteCarouselPage = async () => {
  clearPage();
  renderPageTitle('Carrousel de citations');

  const main = document.querySelector('main');
  const quoteContainer = document.createElement('div');
  quoteContainer.className = 'quote-container';
  main.appendChild(quoteContainer);

  const quotes = await QuotesLibrary.getAllQuotes();
  const sizeQuotes = quotes.length;

  let currentIndex = 0;
  const delay = localStorage.getItem('carouselDelay') || 5000; // Récupérer le délai configuré ou valeur par défaut

  const displayNextQuote = () => {
    if (currentIndex < sizeQuotes) {
      const currentQuote = quotes[currentIndex];
      displayQuote(currentQuote.thinker, currentQuote.quote, currentQuote.image);
      currentIndex += 1;
      setTimeout(displayNextQuote, delay); // Utiliser le délai configuré pour afficher la prochaine citation
    } else {
      displayEndMessage();
    }
  };

  displayNextQuote();

  function displayQuote(thinker, text, imageUrl) {
    quoteContainer.innerHTML = '';

    const quoteElement = document.createElement('div');
    quoteElement.className = 'quote';

    const thinkerElement = document.createElement('h3');
    thinkerElement.textContent = `${thinker.firstName || ''} ${thinker.lastName || ''}`;

    const textElement = document.createElement('p');
    textElement.textContent = text;

    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = `${thinker.firstName || ''} ${thinker.lastName || ''}`;
    imageElement.onerror = () => {
      imageElement.src = imageSecours;
    };

    quoteElement.appendChild(thinkerElement);
    quoteElement.appendChild(textElement);
    quoteElement.appendChild(imageElement);

    quoteContainer.appendChild(quoteElement);
  }

  function displayEndMessage() {
    quoteContainer.innerHTML = '<p>Rechargez la page si vous souhaitez réafficher le carrousel des citations !</p>';
  }
};

export default QuoteCarouselPage;