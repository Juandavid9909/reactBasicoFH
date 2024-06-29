# ¿Qué es JSX?

Básicamente es JavaScript + XML, nos permite alterar el DOM más fácilmente con los comandos preparados en React.


#  ¿Qué es Babel?

Transforma nuestro código para que cualquier navegador lo pueda entender a pesar de usar features que no son soportadas.


#  ¿Qué es un componente?

Pequeña pieza de código encapsulada re-utilizable que puede tener un estado o no.


#  Hooks

Son funciones que nos permiten hacer ciertas cosas en nuestro código para detectar o lanzar eventos. Para más información sobre los Hooks se puede acceder a este [link](https://es.legacy.reactjs.org/docs/hooks-reference.html#uselayouteffect).


##  useState

Nos permite crear variables, y su sintaxis nos permite colocar el nombre de la variable y el nombre de la función que queremos utilizar para cambiar su valor:

```jsx
const [variable, setVariable] =  useState("");

// Actualizar state con json
setFormState((prev)  => ({
	...prev,
	[name]: value
}));

// o también
setFormState((prev)  => ({
	...formState,
	[name]: value
}));
```


## useEffect

Es un hook de React que sirve para disparar efectos secundarios. Un efecto secundario es algún proceso que nosotros  queremos ejecutar cuando algo suceda.

```jsx
useEffect(() => {
	nuestroCodigo();
}, [dependencias]);
```

Al useEffect le podemos colocar el arreglo de dependencias que dispararán nuestro useEffect para ejecutar lo que necesitemos. Lo recomendado es crear un useEffect pequeño por cada cambio específico que necesitemos, evitar las funciones con muchas instrucciones en nuestros useEffect.

También podemos crear una función de retorno que se ejecutará cuando ya se acabe el llamado a un componente.

```jsx
useEffect(()  => {
	const  onMouseMove  =  ({ x, y })  => {
		const  coords  = { x, y };
		console.log(coords);
	}

	window.addEventListener("mousemove", onMouseMove);

	return  ()  => {
		window.removeEventListener("mousemove", onMouseMove);
	}
}, []);
```


## useRef

Nos sirve para manejar un valor de alguna variable que podemos cambiar, trabajar con ella, pero no dispara renderizaciones cuando hacemos un cambio. Es como un useState que no dispara renderizaciones. Esto nos permite seleccionar por ejemplo elementos HTML para obtener sus datos y demás sin renderizar nada.

```jsx
const  inputRef  =  useRef();

<input
	ref={ inputRef }
	type="text"
	placeholder="Ingrese su nombre"
	className="form-control"
/>
```


## useLayoutEffect

Tiene una firma idéntica del useEffect, pero se dispara de forma síncrona después de que todas las mutaciones del DOM se han disparado.

```jsx
useLayoutEffect(()  => {
	const { height, width } = (pRef.current.getBoundingClientRect());

	setBoxSize({ height, width });
}, [sprites]);
```


## Función memo

Básicamente le dice a React que memorice un componente para no renderizarlo a pesar de que se apliquen cambios en el componente padre. Sólo se renderiza cuando se hacen cambios en el componente donde se agregó la función memo.

```jsx
import { memo } from  "react";

export  const  Small  =  memo(({ value })  => {
	console.log("Me volví a generar :(");

	return (
		<small>{ value }</small>
	);
});
```


## useMemo

Nos permite memorizar el resultado o el valor de una variable, para cuando React vuelva a redibujar un componente, si dicho valor no ha cambiado no reprocese lo que esté asociado a la variable que tenemos asociada a nuestro hook useMemo.

```jsx
const  memorizedValue  =  useMemo(()  =>  heavyStuff(counter), [counter]);

return(
	<h4>{ memorizedValue }</h4>
);
```


## useCallback

Un claro ejemplo de uso de este Hook es cuando pasamos funciones de un componente a otro. Esto es debido a cómo funciona React, ya que las funciones cada vez que se genera el componente apuntan a un espacio en memoria distinto, por lo que detecta la función como una diferente y generará las renderizaciones adicionales.

```jsx
const  incrementFather  =  useCallback((value)  => {
	setCounter((c) => c + value);
}, [counter]);
```


## useReducer

Es una función común y corriente, la cual no puede ser asíncrona. Esta debe ser una función pura (todas las instrucciones deben de resolverse de manera interna) y debe retornar siempre un nuevo estado. También hay que tener en cuenta que sólo recibe 2 argumentos, los cuales son el valor inicial y la acción a ejecutar.

```jsx
const initialTodos = [
	{
		id: 1,
		todo: "Comprar pan",
		done: false
	}
];

const todoReducer = (state= initialTodos, action) => {
	return state;
}
```

### Función pura
1. No debe de tener efectos secundarios. Es decir que no debe de llamar a otras funciones, todo debe ejecutarse internamente.
2. No debe de tener tareas asíncronas.
3. Debe de retornar siempre un estado nuevo.
4. No debe de llamar **localStorage** ni **sessionStorage**.
5. No debe de requerir más que una acción que puede tener un argumento.

### Funcionamiento
Al iniciar la aplicación tendremos un estado inicial, en este caso un arreglo que tiene TODOs, luego el componente se muestra en pantalla y el state le pasa los datos a la pantalla para que se vean. También se crea una acción, en este caso podría ser para agregar nuevos TODOs, borrar y/o actualizarlos.


## useContext

Muchas veces tendremos datos anidados, es decir que se crean en un componente padre y se pasan del padre al hijo, del hijo al nieto, y del nieto al bisnieto (pueden ser más niveles). Esto es un claro indicador de que podríamos hacer uso de un context para guardar la información y que esta esté disponible donde la necesitemos sin necesidad de pasar los datos por tantos componentes de forma anidada.

```jsx
// Archivo donde se crea el contexto
import { createContext } from  "react";

export  const  UserContext  =  createContext();


// Provider
import { UserContext } from  "./UserContext";

export const UserProvider = ({ children }) => {
	return (
		<UserContext.Provider value={{ hola: "mundo" }}>
			{ children }
		</UserContext.Provider>
	);
}


// Obtener el valor
const { hola } =  useContext(UserContext);
```


# Rutas

En React podemos utilizar el paquete **react-router-dom** para construir las rutas de nuestra aplicación. Este es un High Order Component, lo que significa que es un componente normal de React como los que construimos, pero recibe otros componentes dentro, se debe configurar en nuestro main.jsx.

```jsx
import { BrowserRouter } from  "react-router-dom";
import  React  from  "react";
import  ReactDOM  from  "react-dom/client";

import { MainApp } from  "./09-useContext/MainApp";

import  "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<React.StrictMode>
			<MainApp  />
		</React.StrictMode>
	</BrowserRouter>
);
```

Hecho esto podemos configurar las rutas en nuestro componente principal utilizando las herramientas que nos brinda react-router-dom.

```jsx
import { Navigate, Route, Routes } from  "react-router-dom";

import { AboutPage } from  "./AboutPage";
import { HomePage } from  "./HomePage";
import { LoginPage } from  "./LoginPage";

export  const  MainApp  =  ()  => {
	return (
		<>
			<h1>MainApp</h1>

			<hr  />

			<Routes>
				<Route  path="/"  element={  <HomePage  />  }  />

				<Route  path="/login"  element={  <LoginPage  />  }  />

				<Route  path="/about"  element={  <AboutPage  />  }  />

				{/* <Route path="/*" element={ <LoginPage /> } /> */}

				<Route  path="/*"  element={  <Navigate  to="/about"  />  }  />
			</Routes>
		</>
	);
}
```

También existen los NavLink, los cuales nos permiten actuar dependiendo de la ruta en la que nos encontremos, por ejemplo si queremos agregar clases basados en si nos encontramos en la ruta o no, lo podemos hacer fácilmente con los NavLink.

```jsx
import { Link, NavLink } from  "react-router-dom";

export  const  Navbar  =  ()  => {
	return (
		<nav  className="navbar navbar-expand-lg navbar-dark bg-dark rounded-3">
			<div  className="container-fluid">
				<Link  className="navbar-brand"  to="/">useContext</Link>

				<button  className="navbar-toggler"  type="button"  data-bs-toggle="collapse"  data-bs-target="#navbarNav"  aria-controls="navbarNav"  aria-expanded="false"  aria-label="Toggle navigation">
					<span  className="navbar-toggler-icon"></span>
				</button>

				<div  className="collapse navbar-collapse"  id="navbarNav">
					<ul  className="navbar-nav">
						<NavLink
							className={  ({ isActive })  =>  `nav-link ${ isActive  ?  "active"  :  "" }`  }
							to="/"
						>
							Home
						</NavLink>

						<NavLink
							className={  ({ isActive })  =>  `nav-link ${ isActive  ?  "active"  :  "" }`  }
							to="/about"
						>
							About
						</NavLink>

						<NavLink
							className={  ({ isActive })  =>  `nav-link ${ isActive  ?  "active"  :  "" }`  }
							to="/login"
						>
							Login
						</NavLink>
					</ul>
				</div>
			</div>
		</nav>
	);
}
```


#  Tipos de pruebas

-  **Unitarias:** Enfocadas en pequeñas funcionalidades.
-  **Integración:** Enfocadas en cómo reaccionan varias piezas en conjunto.


## Mocks en Jest

Esto nos permite sobreescribir funciones de nuestro código para realizar pruebas, pero para poder probar de forma satisfactoria será necesario indicar el valor de retorno en nuestro Test Suite.

```javascript
jest.mock("../../src/hooks/useFetchGifs");

describe("Pruebas en <GifGrid />", ()  => {
	const  category  =  "One Punch";

	test("debe de mostrar el loading inicialmente", ()  => {
		useFetchGifs.mockReturnValue({
			images: [],
			isLoading: true
		});
	});
});
```


#  Configurar Jest en React


##  yarn

```bash
yarn  add  --dev  jest
yarn  add  --dev  @types/jest
yarn  add  --dev  babel-jest  @babel/core  @babel/preset-env
yarn  add  --dev  watwg-fetch
```


##  npm

```bash
npm  install  --save-dev  jest
npm  install  --save-dev  @types/jest
npm  install  --save-dev  babel-jest  @babel/core  @babel/preset-env
npm  install  --save-dev  watwg-fetch
```

Luego de haber instalado la dependencia debemos agregar el comando al `package.json`:

```json
"test": "jest"
```

Después de todo esto se debe crear el archivo `babel.config.cjs` y colocar lo siguiente:

```javascript
module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				targets: {
					node: "current"
				}
			}
		]
	]
}
```

Creamos el archivo `jest.setup.js` y agregamos el siguiente import:

```javascript
import  "whatwg-fetch";
```

Y por último configuramos el `jest.config.cjs`:

```javascript
module.exports = {
	setupFiles: ["./jest.setup.js"]
}
```

Con todo esto podemos probar JavaScript puro, ahora para probar React se requieren hacer estos pasos adicionales:

###  yarn
```bash
yarn  add  --dev  @testing-library/react
yarn  add  --dev  jest-environment-jsdom
yarn  add  --dev  @babel/preset-react
```

###  npm
```bash
npm  install  --save-dev  @testing-library/react
npm  install  --save-dev  jest-environment-jsdom
npm  install  --save-dev  @babel/preset-react
```

Y adicional, se configura el `jest.config.cjs`:

```javascript
module.exports = {
	testEnvironment: "jest-environment-jsdom",
	setupFiles: ["./jest.setup.js"]
}
```

Y también se ajusta el `babel.config.cjs`:

```javascript
module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				targets: {
					esmodules: true
				}
			}
		],
		[
			"@babel/preset-react",
			{
				runtime: "automatic"
			}
		]
	]
}
```


## Instalación y configuracion de Jest + React Testing Library
## En proyectos de React + Vite

1. Instalaciones:
```bash
yarn add --dev jest babel-jest @babel/preset-env @babel/preset-react 
yarn add --dev @testing-library/react @types/jest jest-environment-jsdom
```

2. Opcional: Si usamos Fetch API en el proyecto:
```bash
yarn add --dev whatwg-fetch
```

3. Actualizar los scripts del __package.json__
```json
"scripts: {
	...
	"test": "jest --watchAll"
}
```

4. Crear la configuración de babel __babel.config.cjs__
```json
module.exports = {
    presets: [
        [ '@babel/preset-env', { targets: { esmodules: true } } ],
        [ '@babel/preset-react', { runtime: 'automatic' } ],
    ],
};
```

5. Opcional, pero eventualmente necesario, crear Jest config y setup:

__jest.config.cjs__
```json
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js']
}
```

__jest.setup.js__
```jsx
// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
```


##  Comandos de Jest

###  JavaScript

```javascript
// toBe valida que sea igual
expect("Hola mundo").toBe("Hola mundo");

// toEqual para objetos
expect({ test: "Hola" }).toEqual({ test: "Hola" });

// toStrictEqual para objetos validando tipos de datos
expect({ test: "Hola" }).toStrictEqual({ test: "Hola" });

// expect.any() para validar tios de datos
expect("Texto").toBe(expect.any(String));

// toBeFalsy para evaluar datos false, null o undefined
expect(undefined).toBeFalsy();

// toBeTruthy para evaluar datos true o que una variable contenga data
expect(true).toBeTruthy();

// toContain para validar que un dato contenga otro
expect("Hola").toContain("la");
```

###  React
```jsx
// Renderiza la etiqueta seleccionada
render(<etiqueta />);


// Container retorna el html, getByText verifica que un texto exista en el elemento, y getByTestId permite obtener elementos html por el atributo data-testid
const { container, getByText, getByTestId } =  render(<FirstApp  title={  title  } />);


// Trae todas las coincidencias en un arreglo, para las anteriores se puede usar lo mismo, sól ose debe cambiar el getBy por getAllBy
getAllByText();


// screen tiene la opción de utilizar getByText, getByRole que es parecido al querySelector
expect(screen.getByRole("heading", { level: 1 }).innerHTML).toContain(title);


// fireEvent para disparar eventos en el DOM
fireEvent.click(screen.getByText("+1"));


// Si se quiere seleccionar por un aria-label
<button  aria-label="btn-reset"  onClick={  handleReset  }>Reset</button>

fireEvent.click(screen.getByRole("button", { name: "btn-reset" }));


// Si queremos hacer debug del elemento que estamos renderizando
screen.debug();


// Validar propiedades de una etiqueta HTML
expect(screen.getByRole("img").src).toBe(url);
expect(screen.getByRole("img").alt).toBe(title);

// Otra alternativa para validar propiedades de una etiqueta HTML
const { src, alt } =  screen.getByRole("img");

expect(src).toBe(url);
expect(alt).toBe(title);


// Validar un JSON en Jest
expect(gifs[0]).toEqual({
	id: expect.any(String),
	title: expect.any(String),
	url: expect.any(String)
});


// Disparar evento para comparar valores
render(<AddCategory  onNewCategory={  ()  => {} }  />);

const  input  =  screen.getByRole("textbox");

fireEvent.input(input, { target: { value: "Saitama" } });
expect(input.value).toBe("Saitama");


// Probar hooks
const { result } =  renderHook(()  =>  useCounter());
const { counter, decrement, increment, reset } =  result.current;

expect(counter).toBe(10);
expect(decrement).toEqual(expect.any(Function));
expect(increment).toEqual(expect.any(Function));
expect(reset).toEqual(expect.any(Function));


// Probar función en Hook que cambia el valor de las variables
const { result } =  renderHook(()  =>  useCounter(100));
const { counter, increment } =  result.current;

act(()  => {
	increment();
});

expect(result.current.counter).toBe(101);
```