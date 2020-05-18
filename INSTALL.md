# Instalación

## Instalación del proyecto

1. Clonar el código fuente desde el repositorio.

```sh
$ git clone https://gitlab.agetic.gob.bo/agetic/base-frontend-react.git
```

> Es posible que al descargar el proyecto con HTTPs, muestre siguiente error:
> ```sh
> Cloning into 'nombre-del-proyecto'...
> fatal: unable to access 'https://url-del-proyecto.git/': server certificate verification >failed. CAfile: /etc/ssl/certs/ca-certificates.crt CRLfile: none
> ```


> Configurar lo siguiente e intentar nuevamente la clonación:
> ```sh
> git config --global http.sslverify false
> ```

2. Ingresar a la carpeta.

```sh
$ cd base-frontend-react
```

3. Verificar que se encuentra en la rama master o develop.

```sh
$ git branch
```

4. Instalar las dependencias de paquetes npm

```sh
$ npm install
```

5. Configurar URLs `.env.development`

```js
REACT_APP_SITENAME=app
REACT_APP_FRONTEND=http://localhost:8080
REACT_APP_API_URL=http://localhost:3000/api/v1/
REACT_APP_BASE_SERVER=http://localhost:3000/api/
REACT_APP_PUBLIC_URL=/
REACT_APP_AUTH_TOKEN=Bearer
REACT_APP_DEBUG_MODE=true
REACT_APP_ONBEFOREUNLOAD=false
```

## Generar archivos minificados

1. Si los archivos se serviran desde un subdominio, debemos adicionar en el package.json el atributo `homepage`

```sh
$ "name": "frontend-base-react",
  "description": "Frontend base realizado con react en su última version con react, hooks, material-ui y otras tecnologías",
  "author": "dbarra@agetic.gob.bo",
  "version": "1.0.0",
  "private": false,
  "homepage": "https://test.agetic.gob.bo/SUB_DOMINIO/"
```

2. Ejecutar el siguiente comando y esperar los resultados, debe generarse la carpeta `build`

```sh
$ npm run build
```

2. Renombrar la capeta `build` como `nueva_ruta`

```sh
$ mv build nueva_ruta
```
---

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run start

# build for production with minification
npm run build
