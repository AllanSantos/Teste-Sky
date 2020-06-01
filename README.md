# Desafio_Sky :rocket:

## Projeto
  Criar um aplicativo backend que irá expor uma API RESTful de criação de sing up/sign in.
  Todos os endpoints devem somente aceitar e somente enviar JSONs. 
  O servidor deverá retornar JSON para os casos de endpoint não encontrado também.

## Tecnologias utilizadas:

- **Express**
  > É um framework para Node. js.
  
- **Cors**
  > Permite que um site acesse recursos de outro site mesmo estando em domínios diferentes.
  
- **dotenv**
  > Gerenciar parametros em geral.
  
- **bcryptjs**
  > Gerador de senhas hash
  
- **jsonwebtoken**
  > Geração de token para gerenciamento de sessão
  
- **yup**
  > Ferramenta para validação de dados

- **EsLint**
  > É uma ferramenta de análise de código estática para identificar padrões problemáticos encontrados no código JavaScript

- **Prettier**
  > Responsável por formatar o código de acordo com regras cadastradas.
  
- **TypeORM**
  > ORM (Object-Relational Mapper) para Node/TypeScript.
  
- **Banco MongoDB**
  > Banco NoSql MongoDB.

- **mongoose**
  >  Biblioteca do Nodejs para modelar os dados do MongoDB.
  
- **nodemon**
  > Em modo Dev, é um file watcher que roda internamente o próprio comando node.
  
- **sucrase**
  > É uma alternativa ao Babel que permite um desenvolvimento muito rápido.


## Comandos Projeto
- Rodar comando yarn
  > Para baixar as dependecias.

- Rodando servidor yarn dev
  > Para iniciar o servidor NodeJS.

## API's
Foram criadas 4 rotas na aplicação, que são:

  - **post('/signUp') :** cadastra um usuário no banco de dados.
    ~~~JSON
    //Exemplo de Body
    {
      "nome": string,
      "email": string,
      "senha": string,
      "telefones": [
        {
          "numero": "123456789",
          "ddd": "11"
        }
      ]
     }
    ~~~
  
  - **post('/sessions') :** cria uma sessão e retorna o token do usuario.
  ~~~JSON
    //Exemplo de Body
    {
      "email": string,
      "senha": string
    }
  ~~~
  
  - **patch('/signIn') :** rota de login do usuario, a mesma atualiza o campo ultimo_login no banco, com o horario do login.  
   ~~~JSON
    //Exemplo de Body
    //passar o token do tipo Bearer retornado da rota sessions para validar o acesso a rota
    {
      "email": string,
      "senha": string
    }
  ~~~
  - **get('/user/:id') :** retorna um usuario, relacionado ao id informado na rota.
  ~~~JSON
    //passar o token do tipo Bearer retornado da rota sessions para validar o acesso a rota
  ~~~
 
