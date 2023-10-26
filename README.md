# Explique como você lidaria com a  geração, validação e renovação dos tokens JWT.

- Em uma aplicação real, ao efetuar o login as informações de login seriam 
salvas no banco de dados bem como a senha criptografada, mas apenas o identificador de 
usuário(um email por exemplo) e o token JWT seriam devolvidos para ao cliente, que poderia 
ser armazenado em um local storage pox exemplo.

- A validação deste token seria feito por meio de um Middleware interceptando todas as 
rotas protegidas. 

- Já para fazer a renovação existem alguns métodos, um deles seria após o frontend detectar 
que o token não é mais válido ao carregar a página, ele irá solicitar os dados de login novamente
para ao usuário para fazer um novo login e assim garantindo um novo token. 

# Liste pelo menos três bibliotecas Node.js que você consideraria úteis ao criar uma API  RESTful com autenticação JWT e explique por que você escolheria cada uma delas.

- dotEnv: para gestão de variáveis de ambiente
- bibliotécas de criptografia: para salvar senhas, gardar dados de cartão de crédito... 
- bibliotécas para calcular tempo como o moment: para um serviço de pagamento definir
a data da cobrança por exemplo
