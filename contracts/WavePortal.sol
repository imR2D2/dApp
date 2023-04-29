//Nos indica que no hay restricciones sobre como se puede usar el codigo y explica la licencia sobre la cual se libera el contrato
// SPDX-License-Identifier: UNLICENSED

//Is the version of solidity compiler, the same in hardhat.config.js
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    //Registra el total de veces que se llama a la funcion "wave"
    uint256 totalWaves;
    
    constructor() {
        console.log("WOOOOO LET'S GO.");
    }
    //Sirve para poder saludar al contrato y muestra la direccion de donde se llamo
    //Como es publica cualquier usuario puede llamarla y aumentar el contador desde fuera del contrato
    function wave() public {
	totalWaves += 1;
	//Lo que hace el msg.sender es mandar a traer a la direccion
	//Con %s (tipo valor string) se muestra la direccion de la persona
	console.log("%s has waved", msg.sender);
    }
    //Solamente indica la cantidad de veces que se saludaron
    //La funcion VIEW indica que no modificara el estado de la blockchain, sino que solamente leera y devolvera info. Significa que la funcion no consumira gas, ya que no guarda nada en la blockchain, ayudando a no pagar por esa transaccion
    //El returns () se usa para indicar el tipo de dato que devolvera
    //El %d indica que es de tipo entero con signo o sin signo
    function getTotalWaves() public view returns (uint256) {
	console.log("We have %d total waves!", totalWaves);
	return totalWaves;
    }
}
