# Gaia-X Frontend

The repository includes the code for Gaia-X Wizard & Gaia-X Catalogue frontend app.

## Development

### Install

```bash
yarn
```

### Wizard App

```bash
yarn build:components-lib
yarn start:wizard
```

### Catalogue App

```bash
yarn build:components-lib
yarn start:catalogue
```

## Deployment

### Wizard

```bash
docker build -f Dockerfile.wizard -t fe-wizard . --build-arg ENVIRONMENT=development
docker run -it -p 4000:8080 fe-wizard
```

### Catalogue

```bash
docker build -f Dockerfile.catalogue -t fe-catalogue . --build-arg ENVIRONMENT=development
docker run -it -p 4001:8080 fe-catalogue
```
