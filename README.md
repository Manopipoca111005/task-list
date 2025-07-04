# Welcome to your Expo app 👋
# Lista de Tarefas com Perfil de Usuário

Um aplicativo React Native completo para gerenciamento de tarefas pessoais com autenticação de usuário, perfil personalizável e integração com API externa para frases motivacionais.

## Funcionalidades

### Autenticação de Usuário
- Login e cadastro de usuários
- Gerenciamento de estado global do usuário com Context API
- Armazenamento local com AsyncStorage

### Lista de Tarefas (CRUD)
- Adicionar, editar, marcar como concluída e excluir tarefas
- Filtros (todas, completas, incompletas)
- Armazenamento local com AsyncStorage

### Perfil do Usuário
- Foto de perfil (simulada)
- Edição de nome, email e bio
- Integração com API de frases motivacionais

### Extras
- Suporte a Modo Escuro
- UI/UX moderno e responsivo
- Feedback visual para todas as ações

## Tecnologias Utilizadas

- React Native (Expo)
- TypeScript
- Expo Router para navegação
- Context API para gerenciamento de estado
- AsyncStorage para persistência de dados
- Integração com API externa (Advice Slip API)
- Componentes de UI personalizados

## Como Executar

1. Clone este repositório
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npx expo start
   ```

## Estrutura do Projeto

- `/app` - Telas e navegação (usando Expo Router)
- `/components` - Componentes reutilizáveis
- `/contexts` - Contextos para gerenciamento de estado
- `/constants` - Constantes como cores e temas
- `/services` - Serviços de API
- `/assets` - Recursos estáticos como imagens e fontes

## Melhorias Futuras

- Implementar autenticação real com Firebase
- Adicionar sincronização em nuvem das tarefas
- Implementar notificações locais para lembretes
- Adicionar testes automatizados
- Integrar analytics para monitoramento de uso

## Licença

MIT
This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
