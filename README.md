# Gasteio

Gasteio é um software mobile desenvolvido para gerenciar despesas pessoais ou familiares. Com ele, você pode adicionar diferentes categorias para organizar suas despesas de forma eficiente. Em cada categoria, é possível registrar suas despesas individualmente, com informações como título, data e valor. Na parte superior da interface, você pode visualizar o valor total acumulado de todas as categorias e verificar os gastos específicos ao acessar cada uma delas. O Gasteio foi pensado para facilitar o controle financeiro do seu dia a dia, e continuará evoluindo continuamente.

## Tecnologias Utilizadas

- **IDE Recomendada**: [VSCode](https://code.visualstudio.com/) com extensão [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
- **Frontend**: Vue Framework com TypeScript
- **Mobile**: Capacitor para compilação em Android
- **Ferramentas de Desenvolvimento**: npm, Android Studio

## Configuração do Projeto

### Instale as dependências
```sh
npm install
```
### Iniciar o servidor de desenvolvimento

```sh
npm run dev
```
### Compilação para produção

```sh
npm run build
```

### Adicione a plataforma Android

```sh
npx cap add android
```
### Sincronize o build com o Capacitor

```sh
npx cap sync android
```

### Abra o projeto no Android Studio

```sh
npx cap open android
```
