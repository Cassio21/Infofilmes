'use strict';

const nomeBusca = document.querySelector('.input');
const mensagemErro = document.querySelector('#mensagemErro');
const botaoBuscar = document.querySelector('#botao_buscar');
const titulo = document.querySelector('#titulo');
const ano = document.querySelector('#ano');
const duracao = document.querySelector('#duracao');
const genero = document.querySelector('#genero');
const diretor = document.querySelector('#diretor');
const atores = document.querySelector('#atores');
const poster = document.querySelector('.poster');
const sinopse = document.querySelector('#sinopse');

const apiKey = 'c2ab9914';
const imgDefault = './default_image.png';

async function buscaFilme(nomeBusca) {
  const resposta = await fetch(
    `https://www.omdbapi.com/?t=${nomeBusca}&apikey=${apiKey}`
  );
  return resposta.json();
}

const core = async () => {
  try {
    const filme = await buscaFilme(nomeBusca.value);
    validaDados(filme);
    defineValores(filme);
  } catch (error) {
    console.log(error);
    mensagemErro.textContent = `${error}`;
  }
};

const defineValores = (filme) => {
  titulo.textContent = filme.Title;
  sinopse.textContent = filme.Plot;
  ano.textContent = `Year ${filme.Year}`;
  duracao.textContent = `Run time: ${filme.Runtime}`;
  genero.textContent = `Genre: ${filme.Genre}`;
  atores.textContent = `Actors: ${filme.Actors}`;
  diretor.textContent = `Director: ${filme.Director}`;
  poster.setAttribute('src', filme.Poster);
};

const limparCampos = () => {
  titulo.textContent = '';
  sinopse.textContent = '';
  ano.textContent = '';
  duracao.textContent = '';
  genero.textContent = '';
  atores.textContent = '';
  diretor.textContent = '';
  poster.setAttribute('src', imgDefault);
};

const validaDados = (filme) => {
  if (
    filme.Plot === undefined ||
    filme.Year === undefined ||
    filme.Actors === 'N/A'
  ) {
    throw (Error = 'Filme não encontrado 😓');
  }
};

botaoBuscar.addEventListener('click', async () => {
  limparCampos();

  await core();
});
