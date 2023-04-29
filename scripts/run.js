//Es la funcion encargada de desplegar el contrato inteligente
const main = async () => {
  //Almacenamos el owner y una persona random del contrato
  const [owner, randomPerson] = await hre.ethers.getSigners();
  //Hre obtiene una instancia de la fabric del contrato llamado "WavePortal"
  //con ethers lo que hace es interactuar con la red de ethereum
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  //HH crea una red local ethereum solo para este contrato, cuando el script se complete se destruira la red local, cada que ejecutes el contrato sera una cadena de bloques nueva.
  const waveContract = await waveContractFactory.deploy();
  //Sirve para ver si el contrato se desplego correctamente
  await waveContract.deployed();

  //Lanzara el siguiente mensaje si fue correcto y la red
  console.log("Contract deployed to: ", waveContract.address);
  //Deployado por quien
  console.log("Contract deployed by: ", owner.address);

  //Ejecuta las 3 llamadas a la funcion de nuestro WavePortal.sol
  //Usamos el waveContract porque primero se hace el deploy y luego ya puedes interactuar con las funciones dentro del deploy
  //Aqui basicamente estaria en 0 su contenido, primero hace el wave() y ya despues corre wl waveContract()
  await waveContract.getTotalWaves();
  
  //
  //El valor de la funcion lo almacenamos para monitorearlo
  const waveTxn = await waveContract.wave();
  //Espera a que se complete la transaccion y la confirme la red de ethereum
  await waveTxn.wait();

  //Espera a que la transaccion que registra la nueva wave sea confirmada y agregada a la blockchain, antes de mostrar getTotalWaves()
  await waveContract.getTotalWaves();
};

const runMain = async () => {
  try {
    await main();
    //Termina el proceso de ejecucion
    process.exit(0); // exit Node process without error
  } catch (error) {
    console.log(error);
    process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
  }
  // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();
