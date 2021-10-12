let monto = document.getElementById('monto');
let tiempo = document.getElementById('tiempo');
let interes = document.getElementById('interes');
let btnCalcular = document.getElementById('btnCalcular');
let mostrarTabla = document.querySelector('#lista-tabla tbody');

btnCalcular.addEventListener('click', () => {
   calcularCuota(monto.value, tiempo.value, interes.value);
});

function calcularCuota(monto, tiempo, interes){

    while(mostrarTabla.firstChild){
        mostrarTabla.removeChild(mostrarTabla.firstChild);
    }

    let fechas = [];
    let fechaActual = Date.now();
    let mesActual = moment(fechaActual);
    mesActual.add(1, 'month');

    let pagoIntereses=0, pagoCapital=0, cuota=0;

    cuota = monto * (Math.pow(1+interes/100, tiempo)*interes/100)/(Math.pow(1+interes/100, tiempo)-1);

    //console.log(cuota);

    for(let i = 1; i <= tiempo; i++){
        pagoIntereses = parseFloat(monto*(interes/100));
        pagoCapital = cuota - pagoIntereses;
        monto = parseFloat(monto - pagoCapital);

        //Formato fechas
        fechas[i] = mesActual.format('DD-MM-YYYY');
        mesActual.add(1, 'month');

        const row = document.createElement('tr');
        row.innerHTML =
        `   <td>${fechas[i]}</td>
            <td>$${cuota.toFixed(2)}</td>
            <td>$${pagoCapital.toFixed(2)}</td>
            <td>$${pagoIntereses.toFixed(2)}</td>
            <td>$${monto.toFixed(2)}</td>
        `;
        mostrarTabla.appendChild(row);
    }
    
}