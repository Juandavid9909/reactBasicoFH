t# ¿Qué es JSX?

Básicamente es JavaScript + XML, nos permite alterar el DOM más fácilmente con los comandos preparados en React.


# ¿Qué es Babel?

Transforma nuestro código para que cualquier navegador lo pueda entender a pesar de usar features que no son soportadas.


# ¿Qué es un componente?

Pequeña pieza de código encapsulada re-utilizable que puede tener un estado o no.


# Hooks

Son funciones que nos permiten hacer ciertas cosas en nuestro código para detectar o lanzar eventos.


## useState

Nos permite crear variables, y su sintaxis nos permite colocar el nombre de la variable y el nombre de la función que queremos utilizar para cambiar su valor:

```javascript
const [variable, setVariable] = useState("");
```