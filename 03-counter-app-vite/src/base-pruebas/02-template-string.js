const nombre = "Juan";
const apellido = "David";

const nombreCompleto = `${ nombre } ${ apellido }`;

console.log(nombreCompleto);

export function getSaludo(nombre) {
    return "Hola " + nombre;
}