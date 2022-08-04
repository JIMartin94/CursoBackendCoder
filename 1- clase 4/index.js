// mostrar letras

const mostrarLetras = (palabra,termine) =>{
    let contador = 0
    const timer = setInterval(()=>{
        if(contador < palabra.length){
            console.log(palabra[contador])
            contador++;
        }else{
            clearInterval(timer)
            termine()
        }
    },1000)
}

const fin = () =>{
    console.log("Termine!")
}




setTimeout(() => {
    mostrarLetras("hola",fin)    
}, 0);

// setInterval(() => {
//     mostrarLetras("hola como andas?",fin)    
// }, 250);

// setInterval(() => {
//     mostrarLetras("hola como andas?",fin)    
// }, 500);