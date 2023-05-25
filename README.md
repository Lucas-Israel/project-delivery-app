# :toolbox: Tecnologias usadas:

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Axios](https://camo.githubusercontent.com/11abd4260687620f9dd088cd666c8533595314c7f9886fe4d044ef23418bd1f3/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d4178696f7326636f6c6f723d354132394534266c6f676f3d4178696f73266c6f676f436f6c6f723d464646464646266c6162656c3d)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Chai](https://img.shields.io/badge/chai.js-323330?style=for-the-badge&logo=chai&logoColor=red)
![Sinon](https://img.shields.io/badge/sinon.js-323330?style=for-the-badge&logo=sinon)

# :busts_in_silhouette: Projeto desenvolvido em conjunto com:
  
#### [Geomarcia](https://github.com/Geomarcia), [Júlio Adler](https://github.com/julioa-adl), [Ludson Pereira](https://github.com/Ludson96) e [Luis Arthur Rodrigues da Silva](https://github.com/luisArthurRodriguesDaSilva).

# :open_book: Objetivo do projeto <nome do projeto>

<details>
  <summary>:speech_balloon: Objetivos</summary>

  ```
  1. Desenvolver um app full stack em grupo de delivery para uma distribuidora de bebidas.
  2. O aplicativo tem:
    2.1 Acesso via login: tanto clientes como pessoas vendedoras e administradores do sistema, devem ter acesso ao aplicativo via login, porém para funções diferentes: (1) A pessoa cliente, que compra da lista de produtos; (2) A pessoa vendedora, que aprova, prepara e entrega; (3) A pessoa administradora, que gerencia quem usa o aplicativo;
    2.2 Fazer a comunicação entre clientes e pessoas vendedoras: a pessoa cliente faz o pedido via "carrinho de compras" e a pessoa vendedora aprova, prepara e envia esse pedido. Quando o produto é recebido por quem comprou, essa pessoa marca o pedido como "recebido". Ambos devem possuir detalhes sobre seus pedidos;
    2.3 Se a pessoa cliente faz o pedido, o mesmo deve aparecer para a pessoa vendedora em seu dash de pedidos após a atualização da página. A pessoa cliente, por sua vez, deve ter as informações sobre seu pedido quando sua página for atualizada, ou seja, ter informações se o pedido está sendo preparado ou se já saiu pra entrega;
  ```
</details>

<details>
  <summary>:speech_balloon: Exemplo de funcionamento</summary>
  
![Captura de tela de 2023-05-25 16-39-54](https://github.com/Lucas-Israel/project-delivery-app/assets/104790267/14b898c6-9c01-4b80-a6a4-2ff197d3eb8f)
![Captura de tela de 2023-05-25 17-00-59](https://github.com/Lucas-Israel/project-delivery-app/assets/104790267/5be58e38-7423-4a91-ae86-4635785276c4)

</details>

# :heavy_exclamation_mark: Arquivos desenvolvidos nesse projeto:

<details>
  <summary>:speech_balloon: Arquivos</summary>

  ```
  back-end/
  front-end/
  ```
</details

#### :warning: todos os outros arquivos foram desenvolvidos pela [Trybe](https://www.betrybe.com).

# :thinking: Como checar o projeto

```
git clone git@github.com:Lucas-Israel/project-delivery-app.git
npm install
  na pasta back-end e front-end configurar o .env usando o .env.example
  garantindo que a variavel API_PORT dentro do back-end/.env seja igual a variabel REACT_APP_BACKEND_PORT no front-end/.env 
  
  primeiro terminal:
    cd back-end
    npm install && npm run db:reset && clear && npm run test && npm start
  
  segundo terminal:
    cd front-end
    npm install && clear && npm run test && npm start
```

# :calendar: Datas para desenvolvimento

```
início: 28/02/23 às 14h36
término: 15/03/23 às 17h26
prazo: 7 dias
dias específicos para o desenvolvimento do projéto: 13
```

# :trophy: Percentual de conclusão do projeto

![Captura de tela de 2023-05-25 17-50-03](https://github.com/Lucas-Israel/project-delivery-app/assets/104790267/0cc900ac-db77-460c-80b7-e5525489af1d)

<details>
  <summary>:warning: Metodo de avaliação da Trybe</summary>
  
##### A escola de programação [Trybe](https://www.betrybe.com) utiliza um sistema de avaliação baseado na conclusão de requisitos em cada projeto, considerando a porcentagem de conclusão, com um mínimo de 80% dos requisitos obrigatórios, em um prazo regular de no máximo 7 dias, tendo dias específicos para o desenvolvimento do projeto que variam de acordo com a complexidade dele.

##### Não alcançando esse patamar mímino, o aluno entra em recuperação, tendo que entregar 90% dos requisitos obrigatórios mais os bonús, em outros 7 dias, caso o aluno falhe novamente ele é mudado de turma para refazer o conteúdo e projeto, caso falhe após mudar de turma, no mesmo conteúdo/projeto, o aluno é removido do curso.
  
</details>
