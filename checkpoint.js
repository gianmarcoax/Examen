// ----- IMPORTANTE -----

// IMPORTANTE!: Para este checkpoint se les brindarán las implementaciones ya realizadas en las
// homeworks de Queue, LinkedLis y BinarySearchTree. Sobre dicha implementación van a tener que agregar nuevos
// métodos o construir determinadas funciones explicados más abajo. Pero todos los métodos ya implementados
// en las homeworks no es necesario que los vuelvan a definir.

//const { isInteractive } = require('jest-util');
const {
  Queue,
  Node,
  LinkedList,
  BinarySearchTree
} = require('./DS.js');

// ----------------------

// ----- Recursión -----

// EJERCICIO 1
// Implementar la función objContains: debe buscar dentro de un objeto anidado un par {clave: valor}
// especifico. Tanto el objeto como el nombre de la propiedad y su valor serán recibidos por parámetro.
// En el caso de que encuentre el valor indicado en cualquier nivel del objeto debe devolver true,
// de lo contrario, devolver false.
// Aclaraciones:
//   - Un objeto anidado es un objeto que dentro tiene uno o más objetos.
//     Ej:
//        const user = {
//            id: 6,
//            email: 'homero@maxpower.com',
//            infoPersonal: {
//                nombre: 'Homero Simpson',
//                direccion: {
//                    calle: 'Avenida Siempreviva',
//                    numero: 742,
//                    barrio: 'Springfield',
//                    estado: 'Massachusetts'
//                }
//            }
//        }
//   - Caso que devuelve true  --> objContains(user, "barrio", "Springfield");
//   - Caso que devuelve false --> objContains(user, "empleo", "Empleado en planta nuclear");
// Pista: utilizar typeof para determinar si el valor de una propiedad es un objeto para aplicar
// allí la recursión

var objContains = function(obj, prop, value) {
  var prop = prop;
  var value = value;
  var detalle = 0;

function recursion (obj){
     newUser = Object.values(obj);
     newKeys = Object.keys(obj);
     for(var i = 0; i < newUser.length; i++ ){
         if(typeof newUser[i] === "object"){
             recursion(newUser[i]);
         }
         else if (newKeys[i] === prop)  {
                     if(newUser[i] === value){
                         detalle = 1;
                     }
                     else{
                         detalle = 0;
                     }
         }
     }
}
recursion(obj);

if(detalle === 1){
  return true;
}
else {
  return false;
}
} 


// EJERCICIO 2
// Secuencia inventada: f(n) = (f(n-1) + f(n-2) + f(n-3)) x 2
// Donde las primeras tres posiciones son dadas por el array recibido por parametro y a partir de
// la siguiente se calcula como la suma de los 3 números anteriores multiplicados por dos.
// array es un arreglo de 3 posiciones que puede contener números o strings, aquellas posiciones que
// sean números debemos dejarlas tal cual están pero las que tengan strings debemos calcular su cantidad
// de caracteres para usarlos en la secuencia.
// Por ejemplo si recibimos: ["Franco", 1, "Henry"] deberíamos tener los siguientes 3 valores iniciales
// de la secuencia f(0) = 6, f(1) = 1 y f(2) = 5 (Ya que "Franco" tiene 6 caracteres y "Henry", 5)
// A partir de ahí la cuarta posición sería  (6 + 1 + 5) * 2 = 24 y así sucesivamente
// La función secuenciaHenry debe devolver el enésimo numero de la serie, por ejemplo para el array
// antes mencionado:
// secuencia: 6, 1, 5, 24, 60, 178, 524
// secuenciaHenry(0) // 6  ya que el elemento de la posición 0 es seis
// secuenciaHenry(1) // 1 ya que el elemento de la posición 1 es 1
// secuenciaHenry(6) // 524 ya que el elemento de la posición 6 es 524
// Para números negativos de n debe devolver false
function secuenciaHenry(array, n) {
  // Tu código aca:

  if(n < 0){
    return false;
  }

for(let i=0; i < 3; i++){
    if(typeof array[i] === "string"){
        array[i] = array[i].length;
    }
}
if(n < 3){
  return array[n];
}

var aux = 3;
var suma = 0;
function recursion(aux){
    array[aux] = (array[aux-1] + array[aux-2] + array[aux-3]) * 2;
    suma = array[aux];
    if(aux != n){
        recursion(aux+1);
    }
} 
recursion(aux);
return suma;

} 

// ---------------------

// ----- LinkedList -----

// EJERCICIO 3
// Implementar el método size dentro del prototype de LinkedList que deberá retornar el tamaño actual de
// la LinkedList. En el caso de que la lista se encuentre vacía deberá retornar cero.
// Ejemplo:
//    var lista = new LinkedList();
//    lista.size(); --> 0
//    lista.add(1);
//    lista.size(); --> 1
//    lista.add(2);
//    lista.add(3);
//    lista.size(); --> 3

LinkedList.prototype.size = function(){
    /* Tu codigo aqui */
    let refe = this.head;
    let count = 0;
    while(refe !== null){
      refe = refe.next;
      count++;
    }
    return count;

}

// EJERCICIO 4
// w en
// la posición indicada. Ambos datos serán brindados como parámetro (pos, value). Donde "pos" será la
// posición en la cual se deberá agregar el valor "value". En el caso de que la posición en la que se
// quiera hacer la inserción no sea válida (Supere el tamaño de la lista actual) debe devolver false.
// Si el nodo fue agregado correctamente devolver true.
// Aclaración: la posición cero corresponde al head de la LinkedList
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> [2] --> [4]
//    lista.addInPos(2, 3);
//    Ahora la lista quedaría: Head --> [1] --> [2] --> [3] --> [4]
// Ejemplo 2:
//    Suponiendo que la lista está vacía: Head --> null
//    lista.addInPos(2, 3); --> Debería devolver false ya que no es posible agregar en la posición 2
//    sin antes tener cargada la posición 0 y 1.

LinkedList.prototype.addInPos = function(pos,value){
      /* Tu codigo aqui */
      let newNodo = new Node(value);
      let aux = null;
      let refe = this.head;
      let cont = 0;
    
      if (pos < 0 || pos > this.size()){
        return false;
      }
    
      while (cont < pos){
        cont++;
        aux = refe;
        refe = refe.next; 
      }
    
      if (aux === null){
        newNodo.next = this.head;
        this.head = newNodo;
      }
      else{
        aux.next = newNodo;
        newNodo.next = refe;
      }
      return true;
}

// EJERCICIO 5
// Agregar al prototipo de LinkedList un método reverseLinkedList que invierta el orden de los elementos de la lista.
// Ejemplo:
// let myList = Head --> [1] --> [2] --> [3] --> [4]
// myList.reverseLinkedList()
// myList = Head --> [4] --> [3] --> [2] --> [1]
LinkedList.prototype.reverseLinkedList = function () {
  // Tu código aca:
  let refe = this.head;
  let aux = null;
  let auxplus = null;

  while(refe){
    auxplus = refe.next;
    refe.next = aux;
    aux = refe;
    refe = auxplus;
  }
  this.head = aux;

};


// ----------------------


// ----- QUEUE -----

// EJERCICIO 6
// Implementar la función controlAcces: a partir de una Queue que va a recibir como paráemtro que tiene
// en cada posición un objeto que va a representar a una persona y tiene la siguiente forma:
// {
//   fullname: "Franco Etcheverri",
//   age: 26,
//   ticket: {
//     number: 1,
//     event: "Tomorrowland"
//   }
// }
// La idea es ir verificando uno a uno si la primer persona de la cola tiene los requisitos necesarios para
// ingresar al evento correspondiente (también recibido por parámetro). Los requisitos que debe cumplir son:
// - Ser mayor de 18 años (18 inclusive es válido)
// - Tener un ticket que corresponda con el evento (prop event de ticket)
// - Que no haya ingresado ya otra persona al evento con ese mismo número de ticket
// Finalmente la función debe devolver un arreglo con todos los nombres de las personas que pudieron ingresar
// Importante!: Aquellas personas que no cumplan con los requisitos para ingresar deben ser removidos de la cola 

function controlAcces (queue, event){
  let aptos = []
  let arrayN = []


  while (queue.size() > 0){
    let persona = queue.dequeue();
    if(persona.age >= 18 && persona.ticket.event == event && !arrayN.includes(persona.ticket.number)){
      arrayN.push(persona.ticket.number)
      aptos.push(persona.fullname)
  }
  }

  return aptos;
}


// ---------------


// ----- BST -----

// EJERCICIO 7
// Implementar la función generateBST para que a partir de un array recibido como parametro
// genere un BinarySearchTree. Devolver dicho arbol generado.
// Ejemplo:
//    - array(16,6,23,2,17,31,14,5);
//    - arbol generado:
//             16
//          /      \
//        6         23
//      /  \       /   \
//     2    14    17    31
//      \
//       5

function generateBST(array){
  if(array){
      let BST = new BinarySearchTree(array[0])
      //console.log(array[0])
      for(var i = 1; i < array.length;i++){
          BST.insert(array[i])
      }
      return BST;
  }else{
      return false;
  }
}

// Ejercicio 8
// Implementar la función searchMin que busque en nuestro arbol binario, el valor minimo.
// Ejemplo:
//             16
//          /      \
//        6         23
//      /  \       /   \
//     2    14    17    31
//      \
//       5
//  Debería retornarnos 2
BinarySearchTree.prototype.searchMin = function() {
  let menor = 0;
  let nodo = this;
  while(nodo.left != null){
      menor = nodo.left.value;
      nodo = nodo.left;
  }
  
  return menor;
  };


//----- ALGORITMOS -----

// EJERCICIO 9
// Ordená un arreglo de números usando un bubble sort pero con algunas particularidades.
// El nuevo arreglo debe ser devuelto.
// El algortimo va a recibir un arreglo de objetos de la siguiente forma:
// {
//   name: "Notebook",
//   price: 1200,
//   review: 8
// }
// Esos objetos deben ser ordenados en función de lo que indique los siguientes parámetros
// "firstOrd", "secondOrd" los cuales van a tener alguna de las propiedades del objeto anterior
// para saber cual va a ser la que debemos tomar para el ordenamiento. La "secondOrd" se usa en los
// casos en los cuales para la "firstOrd" tengan el mismo valor.
// var array = [
//   {name: "Notebook", price: 1200, review: 8},
//   {name: "Smartphone", price: 300, review: 9},
//   {name: "TV", price: 800, review: 1},
//   {name: "PS5", price: 1200, review: 7}
// ]
// Ejemplo 1:
// specialSort(array, "price") --> Debería quedar:
// [
//   {name: "Smartphone", price: 300, review: 9},
//   {name: "TV", price: 800, review: 1},
//   {name: "Notebook", price: 1200, review: 8}
//   {name: "PS5", price: 1200, review: 7}
// ]
// Ejemplo 2:
// specialSort(array, "price", "review") --> Debería quedar:
// [
//   {name: "Smartphone", price: 300, review: 9},
//   {name: "TV", price: 800, review: 1},
//   {name: "PS5", price: 1200, review: 7},
//   {name: "Notebook", price: 1200, review: 8}
// ]
// (Siempre el ordenamiento es de menor a mayor sea cual fuera la propiedad indicada para el orden)


var specialSort = function(array, firstOrd, secondOrd) {
    // Tu código aca:
    let firstOrd = firstOrd;
    let secondOrd = secondOrd;
    
    if(arguments.length === 2){
      array.sort((a, b) => a.firstOrd - b.firstOrd);
    }
    else if(arguments.length === 3){
      array.sort((a, b) => a.secondOrd - b.secondOrd);
      array.sort((a, b) => a.firstOrd - b.firstOrd);
    }
  return array;
}

// ----- Closures -----

// EJERCICIO 10
// Implementar la función closureSum que recibe un parámetro (numFijo) y que debe retornar otra función
// que también debe recibir un parámetro y debe devolver la suma de este últimom parámetro con numFijo.
// Ejemplo 1:
//    var sumaCinco = closureSum(5);
//    sumaCinco(2);  --> Devolverá 7 (Ya que 2 + 5 = 7)
//    sumaCinco(11); --> Devolverá 16 (Ya que 11 + 5 = 16)
// Ejemplo 2:
//    var sumaDiez = closureSum(10);
//    sumaDiez(2);  --> Devolverá 12 (Ya que 2 + 10 = 12)
//    sumaDiez(11); --> Devolverá 21 (Ya que 11 + 10 = 21)

function closureSum(numFijo) {
  return function(x) {
    return x + numFijo;
  };
}


// ------------------- No Cambies nada de aqui abajo ----------------------------



module.exports = {
  objContains,
  secuenciaHenry,
  LinkedList,
  Queue,
  controlAcces,
  generateBST,
  BinarySearchTree,
  specialSort,
  closureSum,
}
