/*
EJERCICIO #1
Crear un algoritmo que muestre los números impares entre el 0 y el 100.
*/

const { log } = require("console");

const numerosImpares = [];
for (let i = 1; i <= 100; i += 2) {
    numerosImpares.push(i);
}

console.log('Números impares del 1 al 100:');
console.log(numerosImpares);
console.log('Cantidad de números impares:', numerosImpares.length);

console.log("\n");

/*
EJERCICIO #2
Realizar un programa que ingrese los sueldos de 5 operarios en un vector. 
Realizar la creación y carga del vector en el constructor. Crear un método para imprimir el vector.
*/

class SueldosOperarios {
    constructor() {
        this.sueldos = [];

        console.log('Ingresando sueldos de 5 operarios:');

        for (let i = 0; i < 5; i++) {
            const sueldo = Math.floor(Math.random() * 50000) + 30000;
            this.sueldos.push(sueldo);

            console.log(`Operario ${i + 1}: $${sueldo.toLocaleString()}`);
        }
    }

    imprimirSueldos() {

        console.log('\n**** Array de sueldos ****');
        console.log(this.sueldos);

        const total = this.sueldos.reduce((sum, sueldo) => sum + sueldo, 0);

        console.log(`Total de operarios: ${this.sueldos.length}`);
        console.log(`Suma total de sueldos: $${total.toLocaleString()}`);
    }
}

const gestionSueldos = new SueldosOperarios();
gestionSueldos.imprimirSueldos();

console.log("\n");

/*
EJERCICIO #3
Plantear una clase llamada Alumno y definir como atributos su nombre y su edad. En el constructor realizar el ingreso de datos. 
Definir otros dos métodos para imprimir los datos ingresados y un mensaje si es mayor o no de edad (edad >= 18)
*/

class Alumno {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    imprimirDatos() {
        console.log("**** Datos del Alumno ****");
        console.log(`Nombre: ${this.nombre}`);
        console.log(`Edad: ${this.edad} años`);
    }

    esMayorDeEdad() {
        const mayorDeEdad = this.edad >= 18;
        const estado = mayorDeEdad ? 'Sí' : 'No';
        console.log(`¿${this.nombre} es mayor de edad? ${estado}`);
        return mayorDeEdad;
    }
}

const alumno1 = new Alumno("María García", 20);
const alumno2 = new Alumno("Camilo Pacheco", 17);

alumno1.imprimirDatos();
alumno1.esMayorDeEdad();

console.log("\n");

alumno2.imprimirDatos();
alumno2.esMayorDeEdad();

console.log("\n");

/*
EJERCICIO #4
 Dados los siguientes array, imprimir por consola los elementos del array “y” que no se encuentran en el array “x” 
 utilizando para tal fin una única línea de código. const x = ["n", "bro", "c", "|"]; const y = ["d", "n", "l", "bro", "g"];
*/


const x = ["n", "bro", "c", "|"];
const y = ["d", "n", "l", "bro", "g"];

const elementosNoEncontrados = y.filter(elemento => !x.includes(elemento));
console.log('Elementos de "y" que NO están en "x":', elementosNoEncontrados);