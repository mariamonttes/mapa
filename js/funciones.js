var marcadores_nuevos= [];
var marcadores_bd= [];
var mapa=null;



function quitar_marcadores(lista)
{
 for(i in lista)
 {

 lista[i].setMap(null);
 }
}
$(document).on("ready", function()
{

var formulario= $("#formulario");
var punto=new google.maps.LatLng(29.057370149865605, -110.950927734375);
var config={
zoom:15,
center:punto,
mapTypeId: google.maps.MapTypeId.ROADMAP
};

mapa=new google.maps.Map ( $("#mapa")[0], config);
google.maps.event.addListener(mapa, "click", function(event)
{
var coordenadas=event.latLng.toString();
coordenadas=coordenadas.replace("(","");
coordenadas=coordenadas.replace(")","");
var lista=coordenadas.split(",");
var direccion=new google.maps.LatLng(lista[0],lista[1]);

var marcador=new google.maps.Marker({
position:direccion,
map: mapa, 
animation: google.maps.Animation.DROP,
draggable: false
});
formulario.find("input[name='cx']").val(lista[0]);
formulario.find("input[name='cy']").val(lista[1]);
formulario.find("input[name='titulo']").focus();


marcadores_nuevos.push(marcador);
google.maps.event.addListener(marcador,"click",function()
{

})
quitar_marcadores(marcadores_nuevos);
marcador.setMap(mapa); 


$("#btn_grabar").on("click",function()
{

var f=$("#formulario");

if(f.find("input[name='titulo']").val().trim()=="")
{
	alert("falta titulo");
	return false;
}

	if(f.find("input[name='cx']").val().trim()=="")
	{
		alert("Falta cordenada X");
		return false;
	}

		if(f.find("input[name='cy']").val().trim()=="")
		{
			alert("Falta cordenada Y");
			return false;
		}

			if(f.find("input[name='fo']").val().trim()=="")
			{
				alert("Falta  Foto");
				return false;
			}

				if(f.hasClass("busy"))
				{
				
				return false;
				}

f.addClass("busy");

var loader_grabar=$("#loader_grabar");
$.ajax(
	{
	type: "POST",
	url:"iajax.php",
	dataType:"JSON",
	data:f.serialize()+"&tipo=grabar",
	success:function(data)
	{
if(data.estado=="ok")
{
	loader_grabar.removeClass("label-warning").addClass("label-success").text("Guardado").slideDown().delay(4000).slideUp();
	listar();
}
else
{
	alert(data.mensaje);
}
},
beforeSend:function()
	{
	loader_grabar.removeClass("label-success").addClass("label label-warning").text("Procesando...").slideDown();
	},
complete:function()
	{
	f.removeClass("busy");
	f[0].reset();
	}
	
	});
return false;
});


});
$("#btn_borrar").on("click",function()
{
if(confirm("Esta usted seguro?")==false)
{
return;
}
var formulario_edicion=$("#formulario_edicion");
$.ajax({
		type:"POST",
		url:"iajax.php",
		data:formulario_edicion.serialize()+"&tipo=borrar",
		dataType:"JSON",
		success:function(data){

		if(data.estado=="ok")
		{
		
			alert(data.mensaje);
			
			quitar_marcadores(marcadores_nuevos);
			
			formulario_edicion[0].reset();
			
			listar();
		}
		else{
			alert(data.mensaje);
		}
		},
		beforeSend:function(){
		
		},
		complete:function()
		{
		
		}
		});
		});

 $("#btn_actualizar").on("click", function(){
            var f_eliminar = $("#formulario_edicion");
            $.ajax({
               type:"POST",
               url:"iajax.php",
               data:f_eliminar.serialize()+"&tipo=actualizar",
               dataType:"JSON",
               success:function(data){
                  if(data.estado=="ok")
                   {
						quitar_marcadores(marcadores_nuevos);
                        alert(data.mensaje);
                        f_eliminar[0].reset();
                        listar();
                    }
                    else
                    {
                        alert(data.mensaje);
                    }
               },
               beforeSend:function(){
                   
               },
               complete:function(){
                   
               }
            });
        });


listar();
});

function listar()
{

quitar_marcadores(marcadores_bd);
var formulario_edicion=$("#formulario_edicion");
$.ajax(
	{
	type:"POST",
	url:"iajax.php",
	dataType:"JSON",
	data:"&tipo=listar",
	success:function(data)
	{
	if(data.estado=="ok")
	{
	
	$.each(data.mensaje, function(i,item)
	{

var posi= new google.maps.LatLng(item.cx, item.cy);

var marca=new google.maps.Marker(
{idMarcador:item.idPuntos,
position:posi,
titulo: item.Titulo,
cx: item.cx,
cy: item.cy,
fo: item.imagen,
audio: item.audio

});


google.maps.event.addListener(marca, "click", function(){
$("#collapseTwo").collapse("show");
$("#collapseOne").collapse("hide");

//pasar informacion del marcador al formulario
formulario_edicion.find("input[name='id']").val(marca.idMarcador);
formulario_edicion.find("input[name='titulo']").val(marca.titulo).focus();
formulario_edicion.find("input[name='cx']").val(marca.cx);
formulario_edicion.find("input[name='cy']").val(marca.cy);
formulario_edicion.find("input[name='fo']").val(marca.fo);
formulario_edicion.find("input[name='audio']").val(marca.audio);

var objhtml={ content: "<div style='height:200px;width:400px'>\n\
\n\
<h2>Nombre del lugar:</h2><h3>"+item.Titulo+"</h3><br><h2>Foto:</h2><img src=images/"+item.imagen+" height=100px;width=150px;><br><audio controls>"+
"<source src=audio/"+item.audio+" type='audio/mpeg'></audio></div>"}
var desc= new google.maps.InfoWindow(objhtml);

desc.open(mapa,marca);

});

marcadores_bd.push(marca);
//ubicar el marcador en el mapa
marca.setMap(mapa);
});



}
else
{
alert("No hay puntos en la bd");
}
}
});
}
