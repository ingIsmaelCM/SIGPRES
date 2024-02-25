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

Create Database

```mysql
CREATE DATABASE IF NOT EXIST `sigpres_main`
```

Migrate Data

```bash
npm run migrate all
npm run seed all
```

Run API Service

```bash
npm run dev
```

---

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
  "statusCode": 20X,
  "title": string,
  "content": any
}
```

</details>
<details>
<summary>
<code>Petición Fallida</code>
</summary>

```json
{
  "statusCode": 40X|50X,
  "content": any
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

<details>
<summary>
<code>Authentication</code>
</summary>
Para iniciar sesión, el usuario debe enviar su nombre de usuario y contraseña. Si las credenciales son correctas, la API retornará los datos del usuario y un token JWT en el cuerpo de la respuesta. Además, se incluirá el accessToken y el refreshToken en la cookie, para que no sea necesario enviarlos en cada petición.

#### Cuerpo de la Petición

```json
{
  "email": "username",
  "password": "password"
}
```

#### Cuerpo de la Respuestas

```json
{
    "statusCode": 200,
    "title": "Sesión iniciada correctamente",
    "content": {
        "userAuth": {
            ...{IAuth},
            "roles":IRole[],
            "permissions": IPermission[],
            "tenants": Itenant[],
            "company": ICompany
        },
        "token": string
    }
}
```

</details>

### Schema Auth

```Typescript
interface IAuth {
  id?: number;
  email: string;
  username: string;
  password: string;
  role_id: number;
  name: string;
  lastname: string;
  lastlogin?: string;
  role?: string;
}

interface IRole {
  id?: number;
  name: string;
}

interface IPermission {
  id?: number;
  name: string;
}

interface Itenant {
  id?: number;
  name: string;
  key: string;
}

```

<details>
 <summary>
 <code>POST</code>  <code>/api/auth/register</code></summary>

##### Parameters

> | name     | type     | data type | description                 |
> | -------- | -------- | --------- | --------------------------- |
> | email    | required | string    | Unique email to register    |
> | username | required | string    | Unique username to register |
> | password | required | string    | 6-25 length password        |
> | name     | required | string    | 1-50 length name            |
> | lastname | required | string    | 1-50 length lastname        |

##### Responses

> | http code | content-type     | response                                                     |
> | --------- | ---------------- | ------------------------------------------------------------ |
> | `201`     | application/json | `{"statusCode":"201","title":"Usuario creado exitosamente"}` |
> | `422`     | application/json | `{"statusCode":"422","content":"Unproccesable data"}`        |
> | `500`     | application/json | `{"statusCode":"500","content":"Unkonown server error"}`     |

##### Example Axios

> ```javascript
> axios({
>   method: "post",
>   url: "/api/auth/register",
>   data: {
> ```

            email: "email@example.com",
            username: "exampleuser",
            password: "password1234",
            name: "John",
            lastname: "Doe"
        },

> });
>
> ```
>
> ```

</details>

<details>
<summary><code>POST </code> <code>/api/auth/login</code> </summary>
##### Parameters

> | name     | type     | data type | description          |
> | -------- | -------- | --------- | -------------------- |
> | username | required | string    | Registered username  |
> | password | required | string    | 6-25 length password |

##### Responses

> | http code | content-type     | response                                                                                   |
> | --------- | ---------------- | ------------------------------------------------------------------------------------------ |
> | `200`     | application/json | `{"statusCode":"200", "title": "Sesión iniciada correctamente", ""content": auth: object}` |
> | `422`     | application/json | `{"statusCode":"422","message":"Unproccesable data"}`                                      |
> | `401`     | application/json | `{"statusCode":"401","message":"Credenciales incorrectas"}`                                |
> | `500`     | application/json | `{"statusCode":"500","message":"Unkonown server error"}`                                   |

##### Example Axios

> ```javascript
> axios({
>   method: "post",
>   url: "/api/auth/login",
>   data: {
> ```

            username: "exampleuser",
            password: "password1234"
          },

> });
>
> ```
>
> ```

</details>
<details>

<summary><code>POST </code> <code>/api/auth/logout</code> </summary>

##### Headers

> | name          | type     | data type    | description           |
> | ------------- | -------- | ------------ | --------------------- |
> | Authorization | required | Bearer Token | Token provided by api |

##### Parameters

> NONE

##### Responses

> | http code | content-type     | response                                                  |
> | --------- | ---------------- | --------------------------------------------------------- |
> | `200`     | application/json | `{"code":"200","content": "Sesión cerrada exitosamente"}` |
> | `401`     | application/json | `{"statusCode":"401","message":string}`                   |
> | `500`     | application/json | `{"code":"500","message":"Unkonown server error"}`        |

##### Example Axios

> ```javascript
> axios({
>   method: "post",
>   headers: {Authorization: `Bearer ${token}`}
>   url: "/api/auth/logout",
> });
> ```

</details>
<details>

<summary><code>POST </code> <code>/api/auth/logout/all</code> </summary>

##### Headers

> | name          | type     | data type    | description           |
> | ------------- | -------- | ------------ | --------------------- |
> | Authorization | required | Bearer Token | Token provided by api |

##### Parameters

> NONE

##### Responses

> | http code | content-type     | response                                                        |
> | --------- | ---------------- | --------------------------------------------------------------- |
> | `200`     | application/json | `{"code":"200","content": "Se han cerrado todas las sesiones"}` |
> | `401`     | application/json | `{"statusCode":"401","message":string}`                         |
> | `500`     | application/json | `{"code":"500","message":"Unkonown server error"}`              |

##### Example Axios

> ```javascript
> axios({
>   method: "post",
>   headers: {Authorization: `Bearer ${token}`}
>   url: "/api/auth/logout/all",
> });
> ```

</details>

---
