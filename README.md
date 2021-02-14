# realm-monitoring
realm app to monitor your deployment

## install realm cli

- install realm-cli from here. https://docs.mongodb.com/realm/deploy/realm-cli-reference/#realm-cli

```
npm install -g mongodb-realm-cli
```

- login realm cli using Atlas Api key

```
realm-cli login --api-key="<my api key>" --private-api-key="<my private api key>"
```

- clone this repo
- go inside the directory 
realm-monitoring

- import realm-monitoring app, this will prompt you to create new app, finish creation of new app
```
realm-cli import \
  --path=realm-monitoring \
  --strategy=merge \
  --include-hosting \
  --include-dependencies
```