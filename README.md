# crypto-viewer

> Crypto viewer is a simple app for displaying basics information about cryptocurrencies provided by CoinMarketCap api.

## Technologies

- react, version 17.0.2

## How to use

To run this application you need to:

- create account in [coinmarketcap](https://coinmarketcap.com/api/), copy your api key and set it as environmental variable with name API_KEY
- have [npm](http://npmjs.com) installed on your computer,
- have [docker](https://www.docker.com/) installed on your computer,

```bash
# Clone repository
$ git clone https://github.com/aniawala/crypto-viewer

# Enter the server
$ cd crypto-viewer/server

# Start server
$ docker build --tag crypto-viewer .
$ docker run -d -p 3001:3001 --rm crypto-viewer:latest

# Enter the client
$ cd crypto-viewer/client

# Install dependencies
$ npm install

# Run the app
$ npm start
```

## Status

Project is _in progress_

## License

MIT
