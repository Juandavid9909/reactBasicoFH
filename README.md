# ¿Qué es JSX?

Básicamente es JavaScript + XML, nos permite alterar el DOM más fácilmente con los comandos preparados en React.


#  ¿Qué es Babel?

Transforma nuestro código para que cualquier navegador lo pueda entender a pesar de usar features que no son soportadas.


#  ¿Qué es un componente?

Pequeña pieza de código encapsulada re-utilizable que puede tener un estado o no.


#  Hooks

Son funciones que nos permiten hacer ciertas cosas en nuestro código para detectar o lanzar eventos.


##  useState

Nos permite crear variables, y su sintaxis nos permite colocar el nombre de la variable y el nombre de la función que queremos utilizar para cambiar su valor:

```javascript
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

```javascript
useEffect(() => {
	nuestroCodigo();
}, [dependencias]);
```

Al useEffect le podemos colocar el arreglo de dependencias que dispararán nuestro useEffect para ejecutar lo que necesitemos. Lo recomendado es crear un useEffect pequeño por cada cambio específico que necesitemos, evitar las funciones con muchas instrucciones en nuestros useEffect.

Tambi{en podemos crear una función de retorno que se ejecutará cuando ya se acabe el llamado a un componente.

```javascript
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
```javascript
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