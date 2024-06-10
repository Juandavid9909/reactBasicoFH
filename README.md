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
```