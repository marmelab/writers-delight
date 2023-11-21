# writers-delight

Write notes, essays, and stories with an AI assistant.

This demo uses [react-admin](https://marmelab.com/react-admin)'s built-in [AI capabilities](https://marmelab.com/react-admin/PredictiveTextInput.html) to provide an inline writing assistant. Try editing a composition to see text suggestions appearing in ghost text.

By default, the suggestions use fake latin text, but you can connect the app to OpenAI to get real suggestions powered by ChatGPT. Your OpenAI API key will not be sent to any third-party, just to the OpenAI API.

This is an offline-first application: all your compositions are stored in your browser's local storage. You can even use it offline.

## Installation

Install the application dependencies by running:

```sh
yarn
```

You will need an active subscription for [React-admin Enterprise Edition](https://marmelab.com/ra-enterprise/).

## Development

Start the application in development mode by running:

```sh
yarn dev
```

## Production

Build the application in production mode and deploy it to gh-pages by running:

```sh
yarn build
yarn deploy
```
