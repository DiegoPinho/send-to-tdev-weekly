# Send to Touch Dev Weekly

Aplicação que dá suporte ao projeto Touch Dev Weekly, o jornal mensal de notícias sobre desenvolvimento da Touch Health.

Este projeto contém:
- Api
- Servidor
- Extensão para o Google Chrome

## Desenvolvimento

Este projeto foi arquitetado para subir facilmente o backend e o frontend em uma tacada só no Heroku. 

Para subir em modo de desenvolvimento:
`npm run start-dev`

Para subir em produção:
1. Execute o `npm run build` para gerar os arquivos do front. Eles serão construídos em `client\build`.
2. Executar o `npm start`
