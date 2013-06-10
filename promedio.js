var calificacion, creditos, suma_creditos, factor_ponderacion;
calificacion = 0;
creditos = 0;
suma_creditos = 0;
factor_ponderacion = 0;

$(document).on("ready",asignaFunciones);
function asignaFunciones () {
	$('#btn-calculador').on("click",promedio);
}

function promedio () {
    $.ajax({
            dataType: 'html',
            type: 'post',
            url: 'http://dsiapes.uv.mx/MiUV/Portales/estudiantes/SZICALC.aspx',
            crossDomain:true,
            success: function(html){
                calcular_promedio(html);
                },
             error:function(msg){
            $('#promedio').text("Hubo un problema al realizar a petición, probablemente no estes logueado");
        }
        });


}


function calcular_promedio (html) 
{
	try
	{
		var body= $('tbody',html).eq(2);
		var tabla_calificaciones = body.children(0).toArray();
		for (var i = 4; i < tabla_calificaciones.length ; i++) 
		{
			if (tabla_calificaciones[i].childElementCount<7)
				continue;
			if (tabla_calificaciones[i].childNodes[0].innerText == "EXPERIENCIA EDUCATIVA")
				continue;
			calificacion = parseInt(tabla_calificaciones[i].childNodes[8].innerText);
			creditos = parseInt(tabla_calificaciones[i].childNodes[2].innerText);
			factor_ponderacion += calificacion*creditos;
			suma_creditos += creditos;
		}
		$('#promedio').text('');
		factor_ponderacion = factor_ponderacion/(suma_creditos*1.0)
		if (factor_ponderacion>0)
		{
			factor_ponderacion = Math.round(factor_ponderacion * 100) / 100;
			$('#promedio').text("Tu promedio es: "+factor_ponderacion);
		}
		else
			$('#promedio').text("No tienes materias en tu cardex, o no te colocaste en la página adecuada");
		
	}
	catch(err)
	{
	 $('#promedio').text("Hubo problemas al procesar los datos, es posible que haya cambiado el formato");
	}
}

