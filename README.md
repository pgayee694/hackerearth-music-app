# Local Development Setup

## Setup Spotify API integration

Register a Spotify app at https://developer.spotify.com/documentation/general/guides/app-settings/#register-your-app.

Whitelist a redirect URI for:

```
http://localhost:3000/redirect
```

Set the following environment variables to your registered app's Spotify Client ID and Client Secret:

```
SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET
```

## Setup Weather API Key

Sign up at https://home.openweathermap.org/users/sign_up

Navigate to your name => My API Keys and set the following environment variable to the API key:

```
WEATHER_API_KEY
```

## Setup Bing API Key

Sign up at https://www.bingmapsportal.com/.

After registering an app, go to My Account => My Keys and set the following environment variable to the API key:

```
BING_API_KEY
```

## Install dependencies

Build the `./shared` directory (contains shared types):

```
cd ./shared && yarn install && yarn build && cd ..
```

Install dependencies in the root folder, as well as the `./frontend` and `./backend` subfolders:

```
yarn install && cd ./frontend && yarn install && cd ../backend && yarn install && cd ..
```

## Start the Frontend and Backend

Be sure to start two new terminal sessions so that the newly added environment variables will be present.

From the two separate terminal sessions start the `./frontend` and `./backend` applications, respectively:

```
cd ./frontend && yarn start
```

```
cd ./backend && yarn start
```

## Visit the app

Open the application at `http://localhost:3000/vibe`
