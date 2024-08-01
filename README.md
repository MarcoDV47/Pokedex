# Pokedex

## Breve descrição do propósito da aplicação

Esta aplicação tem como propósito listar todos os pokémons disponíveis na API, e também buscar mais detalhes sobre um pokémon específico

## Breve descrição das funcionalidades da aplicação entregue

- Possui vários cards de pokémons com as seguintes funcionalidades:
  - Ao clicar no card mais detalhes sobre o pokémon são exibidos
  - Ao clicar no ícone de tipo do pokémon pode-se filtrar por pokémon somentes daquele tipo
- Possui um botão para alterar o tema entre claro e escuro
- Possui um input para pesquisar um pokémon específico ou um select para selecionar por tipo.

## Ferramentas utilizadas, e o por que estas foram escolhidas para a realização do desafio

- **React:** Ferramenta que facilita o armazenamento e alteração dos elementos e dados da aplicação, adicionando dinamismo.
- **Vitest:** O fato de ser muito mais fácil utilizá-lo com módulos de JS em comparação ao JEST e a semelhança com este me fizeram escolher esta ferramenta de testes.
- **styled-components:** Ferramenta que permite a fácil customização de elementos.
- **react-router-dom:** Facilita muito a navegação entre páginas e é usada para tornar a aplicação uma Single Page Application

## Decisões adotadas durante o planejamento e execução do desafio, justificando-as

- **Transição demorada:** Resolvi ir por um caminho diferente e estender a duração das transições, pois adiciona mais peso para a mudança de dia/noite e acredito ser mais agradável aos olhos.

## Passo a passo dos comandos para que possamos rodar o seu projeto no nosso computador

### Abra o seu cmd em uma pasta vazia e execute os seguintes comandos

```sh
1. git clone https://github.com/MarcoDV47/Pokedex.git
2. cd Pokedex
3. npm i
4. npm run dev
```

**Observação:**
Dependendo do aplicativo usado, o atalho para colar comandos no console é Shift + Insert

## Objetivos bônus

- Possui testes unitários que podem ser executados com o comando `npm run test`. ✅
- Possui um filtro para pesquisar por tipos específicos. ✅

### Agradecimentos

- Pablo Viana
