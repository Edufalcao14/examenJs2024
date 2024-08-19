import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';

const ConfigPage = () => {
  clearPage();
  renderPageTitle('Configuration du carrousel');

  const main = document.querySelector('main');
  const form = document.createElement('form');
  
  const label = document.createElement('label');
  label.textContent = 'Temps entre chaque citation (en millisecondes) :';
  
  const input = document.createElement('input');
  input.type = 'number';
  input.name = 'delay';
  input.value = 5000; // Valeur par défaut
  
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Enregistrer et afficher le carrousel';
  
  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(submitButton);
  main.appendChild(form);
  
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const delay = input.value || 5000; // Utiliser la valeur du formulaire ou la valeur par défaut
    localStorage.setItem('carouselDelay', delay);
    Navigate('/quotes'); // Redirection vers la page du carrousel
  });
};

export default ConfigPage;