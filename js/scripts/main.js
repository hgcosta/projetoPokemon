// scripts do slide principal
var slide_hero = new Swiper('.slide-hero', {
  effect: 'fade',
  pagination: {
    el: '.slide-hero .main-area .area-explore .swiper-pagination',
  },
});

const areaPokemons = document.getElementById('js-list-pokemons');

// Deixando a primeira letra maiuscula do pokemon
function primeiraLetraMaiuscula(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Criando os elementos com as informações da api
function createCardPokemon(code, type, nome, imagePok) {
  let card = document.createElement('button');
  card.classList = `card-pokemon js-open-details-pokemon ${type}`;
  areaPokemons.appendChild(card);

  let image = document.createElement('div');
  image.classList = 'image';
  card.appendChild(image);

  let imageSrc = document.createElement('img');
  imageSrc.classList = 'thumb-img';
  imageSrc.setAttribute('src', imagePok);
  image.appendChild(imageSrc);

  let infoCardPokemon = document.createElement('div');
  infoCardPokemon.classList = 'info';
  card.appendChild(infoCardPokemon);

  let infoTextPokemon = document.createElement('div');
  infoTextPokemon.classList = 'text';
  infoCardPokemon.appendChild(infoTextPokemon);

  let codePokemon = document.createElement('span');
  codePokemon.textContent =
    code < 10 ? `#00${code}` : code < 100 ? `#0${code}` : `#${code}`;
  infoTextPokemon.appendChild(codePokemon);

  let namePokemon = document.createElement('h3');
  namePokemon.textContent = primeiraLetraMaiuscula(nome);
  infoTextPokemon.appendChild(namePokemon);

  let areaIcon = document.createElement('div');
  areaIcon.classList = 'icon';
  infoCardPokemon.appendChild(areaIcon);

  let imgType = document.createElement('img');
  imgType.setAttribute('src', `img/icon-types/${type}.svg`);
  areaIcon.appendChild(imgType);
}

// Função q trás os 9 primeiros pokemons
function listingPokemons(urlApi) {
  axios({
    method: 'GET',
    url: urlApi,
  }).then((response) => {
    const countPokemons = document.getElementById('js-count-pokemons');
    const { results, count, next } = response.data;

    countPokemons.innerText = count;

    //Pega a url de api de detalhes de cada pokemon
    results.forEach((pokemon) => {
      let urlApiDetails = pokemon.url;

      // Trás cada detalhe do pokemon
      axios({
        method: 'GET',
        url: `${urlApiDetails}`,
      }).then((response) => {
        const { name, id, sprites, types } = response.data;

        const infoCard = {
          nome: name,
          code: id,
          image: sprites.other.dream_world.front_default,
          type: types[0].type.name,
        };

        createCardPokemon(
          infoCard.code,
          infoCard.type,
          infoCard.nome,
          infoCard.image,
        );

        const cardPokemon = document.querySelectorAll(
          '.js-open-details-pokemon',
        );
        cardPokemon.forEach((card) => {
          card.addEventListener('click', openDetailsPokemon);
        });
      });
    });
  });
}

listingPokemons('https://pokeapi.co/api/v2/pokemon?limit=9offset=0');

function teste() {
  console.log('treser');
}

function openDetailsPokemon() {
  document.documentElement.classList.add('open-modal');
}

function closeDetailsPokemon() {
  document.documentElement.classList.remove('open-modal');
}

// const btnCloseModal = document.querySelector('.js-close-modal-details-pokemon');
// const countPokemons = document.getElementById('js-count-pokemons');

if (btnCloseModal) {
  btnCloseModal.addEventListener('click', closeDetailsPokemon);
}

const btnDropdownSelect = document.querySelector('.js-open-select-custom');

btnDropdownSelect.addEventListener('click', () => {
  btnDropdownSelect.parentElement.classList.toggle('active');
});