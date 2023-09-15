# cypress-basico-v2

## SOBRE O PROJETO 

- O projeto serve para atender usuários que precisam de ajuda, que queiram dar feedback ou elogiar os produtos oferecidos pela empresa.

## PRÉ REQUISITOS

Para utilizar a ferramenta **Cypress** precisamos de algumas configurações instaladas em sua máquina:
. Deve ser instalada a versão mais recente do NodeJS. Disponível: https://nodejs.org/en;
. Deve possuir uma conta GitHub e ter instalado o aplicativo no seu PC;
. Ter instalado o NPM em sua máquina para conseguir rodar o projeto de teste.

## Instalando dependências

1. Com o terminal do git aberto na pasta do projeto digite o seguinte comando: npm install cypress, onde será instalado a versão mais recente do Cypress em sua máquina.
2. Caso deseja verificar a versão instalada do cypress, digite o comando npx cypress --version.

## Executando os testes

Após instalar todas as dependecias e todos os plugins necessários, está na hora de executar os testes escritos.

Para executar os testes utilize o comando: npm run cy:open, onde será aberto uma UI do cypress que você poderá comandar todas as informações por ela.

**OBS** Caso queira executar por via NPM sem a UI, basta executar o comando npm test.

### Executando os testes mobile

Para executar os testes criados para versão mobile, deve ser utilizado os seguintes comandos

Com UI: npm run cy:open

Sem UI: npm run test:mobile