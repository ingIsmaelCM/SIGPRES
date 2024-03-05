## Sigpres Documentation

---

### Get Started

Clone this Repository

```bash
git clone https://github.com/AtrionTechSD/SIGPRES
```

Install Dependencies

```bash
npm install
```

Set up Environments Vars

```bash
//Windows
copy .env.example .env
```

```bash
//linux
cp .env.example .env
```

Create Databases

```mysql
CREATE DATABASE IF NOT EXIST `sigpres_main`
CREATE DATABASE IF NOT EXIST `sigpres_main_tenant`
```

Migrate Data

```bash
npm run migrate all
npm run seed all
```

Run Scripts

```
Copy and run script on ./src/app/db/migrations/tenants/database.sql. You can use phpMyAdmin, Workbench or wathever you want.
```

Run API Service

```bash
npm run dev
```

---

## MultiTenant

## BaseConnection

A class for managing connections to a database using Sequelize.

### Constructor

- Check if not exists a connecion and create a new connection with config.db properties.
- Assign this new connection to `BaseConnectio.connection` static property.

### Properties

- `connection`: Sequelize | null - The static Sequelize connection instance.

### Methods

#### getConnection(): Sequelize

- Run class constructor to build a connection if not exists.
- Return the connection instance for main database.

@Returns

- `Sequelize`: The Sequelize connection instance.

#### getTrans(): Promise<any>

- Create a new transaction from the current sequelize connection.

@Returns

- `Promise<any>`: A Promise resolving to a transaction object.

## Notes

- BaseConnection must be used for models on main database (Auth, Tenant, Role, Permission)

## TenantConnection

A class for managing connections to a database for each tenant using Sequelize.

### Properties

- `connections`: A Map set containing a collection of connections according each tenant (databases).

### Methods

#### getConection(dbName?: string): Sequelize

@ param dbName (optional) the name of the tenant

- If tenant is not provided, gets it from `request.headers` object or default on config.bd.database
- Check if not exists a connecion with given tenant on static connections property and create a new for it.
- Set the created connection to connections map property.
- Initialize models for this new connection.

@ Returns

- A connection for given tenant from connections map property.

#### getTrans(): Promise<any>

- Create a new transaction from the current sequelize connection.

@Returns

- `Promise<any>`: A Promise resolving to a transaction object.

## Notes

- TenantConnection must be used for models on tenant database (Client, Loan, Payment ...)

#### Api URL

`/api/`

<details>
<summary>
<code>Formato de Respuesta</code>
</summary>
Las respuestas a las llamadas de la API retornan dos formatos, dependiendo de si la petición fue resuelta exitosamente o ha ocurrido algún error.

<details>
<summary>
<code>Petición Resuelta</code>
</summary>

```json
{
  "statusCode": "20X",
  "title": "string",
  "content": "any"
}
```

</details>
<details>
<summary>
<code>Petición Fallida</code>
</summary>

```json
{
  "statusCode": "40X|50X",
  "content": "any"
}
```

</details>
</details>

<details>
<summary>
<code>Query parameters</code>
</summary>
Los siguientes parámetros de consulta pueden usarse para filtar los datos a la hora de hacer peticiones en la api, cuando aplique.

- `order`: Ordena los datos de acuerdo al campo que se especifique. Ejemplo: `/users/?order=name`.
- `desc?`: Cuando se usa `order`, indica si los datos se van a ordernar de forma descendente. Ejemplo: `/users/?order=name&desc=true`
- `perpage`: Indica cuántos registros debe traer la consulta para paginación. _Requiere el parámetro `page`_. Ejemplo: `/users/?perpage=10`
- `page`: Indica la página que debe cargar cuando se usa `perpage`. _Requiere el parámetro `perpage`_. Ejemplo: `/users/?perpage=10&page=2`
- `include`: Indica cuáles relaciones deben cargarse al consultar datos. Ejemplo: `/users/?include=image`.
  - Pueden indicarse varias relaciones separadas por coma. Ejemplo: `/users/?include=image,auth`
  - Pueden anidarse relaciones a través de puntos. Ejemplo: `/?include=auth.role`
- `limit`: Limita la cantidad de registros a consultar. _Su uso suprime la paginación_. Ejemplo `/users/?limit=5`
- `fields`: Indica cuáles campos de una tabla debe devolver la consulta. _Los campos se separan por coma_. Ejemplo: `/users/?fields=name,lastname`.
- `withtrashed`: Indica si la consulta debe incluir elementos eliminados (softdeletes). Ejemplo: `/users/?withtrashed=true`.
- `filter`: Permite filtrar la consulta por campos específicos. _Debe ser un array_. Ejemplo: `/users/?filter[]=name:eq:jhon:and&filter[]=id:gt:1:or
  - Luego del parámetro, se indica el par campo-valor separados por dos puntos.
- `search`: Permite buscar el término ingresado en todas las columnas de una tabla que sean filtrables. _Es case insensitive_ . Ejemplo: `/users/?search=jhon`.
- `scopes`: Aplica los scopes a la consulta del modelo correspondiente. Se indican separados por coma. _Es case insensitive_ . Ejemplo: `/users/?scopes=hasPayments`.

</details>

- [Authentication](docs/endpoints/auth.json)
