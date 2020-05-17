# SISTEMA DE DISEÑO BASE FRONTEND - React.js

> Base Frontend desarrollado con el framework React.js

## Técnologias empleadas
- React.js como Framework principal. [Sitio oficial](https://reactjs.org/) o en [español](https://es.reactjs.org/)
- Se esta empleando el uso de LazyLoading para todos los componentes [Sitio oficial](https://reactjs.org/docs/code-splitting.html#reactlazy) o en [español](https://es.reactjs.org/docs/code-splitting.html#reactlazy)
- React-router-dom para el manejo de rutas. [Documentación oficial](https://reacttraining.com/react-router/web/guides/quick-start)
- Redux para el manejo de estados del sistema. [Documentación oficial](https://redux.js.org/), libreria aplicada a react [Documentación oficial](https://react-redux.js.org/)
- Material-UI como framework CSS y componentes. [Sitio oficial](https://material-ui.com/)
- Axios para el manejo de peticiones AJAX y demás. [Documentación](https://github.com/mzabriskie/axios)
- Sass como preprocesador CSS. [Documentación](http://sass-lang.com/)
- Airbnb como lint configurado [Documentación](https://github.com/airbnb/javascript)

## Características del sistema

## Estructura general
Para la creación de la estructura general del proyecto base se hizo uso de `create-react-app`
## Plugins
El proyecto cuenta con plugins(librerías que extienden la funcionalidad de `React.js`) para diversos usos y requerimientos:

Plugin | Descripción | Ejemplo |
--- | --- | --- |
util | Plugin con funciones generales del sistema | `Util.toType([])` devuelve el tipo de dato más específico, en este caso devuelve `array` |
Storage | Plugin wrapper de funciones para el manejo de `localstorage`, su uso es obligatorio | `Storage.get('mi-dato')` |
Datetime | Plugin con funciones para el manejo de fechas | `Datetime.format('2017-08-17T23:59:14.357Z', 'dd/MM/YYYY')` lo convierte a `17/08/2017` |
Message | Plugin con funciones de mensajes de notificaciones | `MessageSuccess('¡Hola mundo!')` |
Alert | Plugin que reemplaza envia muestra un mensaje al usuario | `openAlert('¡Hola mundo!')` |
Confirm | Plugin que realiza una consulta al usuario mediante un popup | `openConfirm('¿Desea continuar?', () => { ... esto se ejecuta cuando se acepte el mensaje ...})` |
Service | Plugin wrapper con funciones para el manejo de peticiones con `axios` su uso es obligatorio | `Service.post('usuarios', { ... datos ... }).then(response => { ... })` |

> Nota.- Se recomienda usar todos estos plugins empleando el uso de los hooks de react-redux

## Componentes adicionales

Componente | Descripción | Documentación
--- | --- | --- |
CrudTable | Contenedor para crear un datatable con su CRUD

## React Router
La configuración general de rutas se encuentra en `src/Router/routes.js`.

## State
La configuración general de redux para el manejo de estados se encuentra en `src/redux/store.js` se recomienda manejarlo por módulos.

## Components
Se deben crear todos los componentes de la aplicación en `src/components/`

## Config
La configuración de las variables de entorno se encuentra  el archivo `.env.development` para desarrollo y `.env.production` para producción.

## Archivos estáticos
Los archivos estáticos(fuentes, imágenes, etc.) se encuentran en la carpeta `src/`

## Configuración variables del sistema de diseño
Para cambiar los colores del sistema basado en variables se debe cambiar en `src/plugins/Theme/index.js`

## Importante
La elección de `material-ui` fue debido a que esta ya tiene la mayoría de los componentes más comunes para la construcción de cualquier sistema, es importante usar todo lo que nos ofrece y no tratar de colocar librerías que ya tengan funcionalidades similares a las que ya se tienen, para no así sobrecargar el sistema.

## Instalación
Para instalar la aplicación se recomienda revisar el siguiente enlace:

> [INSTALL.md](INSTALL.md)