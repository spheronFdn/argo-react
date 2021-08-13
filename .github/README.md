[![CircleCI](https://circleci.com/gh/argoapp-live/argo-react/tree/master.svg?style=shield)](https://circleci.com/gh/argoapp-live/argo-react/tree/master)

<p align="center">
  <a href="https://argoapp.live/">
    <img src="../static/logo_light.png" alt="ArGo logo (light version)" width="210">
  </a>

  <h3 align="center">ArGo</h3>

  <p align="center">
   :point_up: One-click deployment service on the top of Arweave.
 </p>
</p>

> Important Notice: ArGo is in its Alpha stage. If you have a suggestion, idea, or find a bug, please report it! The ArGo team will not be held accountable for any funds lost.

## About Argo

ArGo is a one-click ☝️ deployment service platform on top of Arweave Permaweb. It offers a Vercel-like seamless experience for the developer to deploy web apps to Arweave Permaweb directly from the ArGo dashboard.

## Installation Instructions

> Note: Our current latest stable branch is dev. After clone make sure to checkout to dev branch

Follow these easy steps to run ArGo in your machine:

1. Clone repo in your local
2. `npm install`
3. `npm start`

ArGo Web App will start running on http://localhost:3000/

> Note: To run the app you need to run our api, you can follow the api setup provided in [argoapp-live/argo-api](https://github.com/argoapp-live/argo-api)

## Docker Installation Instructions

- Fork or Clone this repository

```
git clone https://github.com/argoapp-live/argo-react.git
```

- Docker build -

```
docker build -t argo-react .
```

- Docker run -

```
docker run -p 3000:3000 argo-react
```

## Contributing

Any contributions are very much welcomed. Feel free to fork and make a PR with any additions (or fixes)!

## Have questions?

Reach out to @rekpero#3898 on the ArGo Discord ([https://discord.gg/HTMqYAm](https://discord.gg/HTMqYAm)) or head to the #contributors-forum channel for further discussion!
