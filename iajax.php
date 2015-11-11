<?php
 sleep(2);
header('content-type: application/json; charset=utf-8');//HEADER PARA JSON
include_once 'puntosDAO.php';
$ac = isset($_POST["tipo"])?$_POST["tipo"]:"x"; //PARAMETRO PARA DETERMINAR LA ACCION
 
switch ($ac) {
    case "grabar":
        $p = new puntosDao();
        $exito = $p->grabar($_POST["titulo"],$_POST["cx"],$_POST["cy"],$_POST["fo"]);
        if($exito)
        {
            $r["estado"] = "ok";
            $r["mensaje"] = "Grabado Correctamente";
        }
        else
        {
            $r["estado"] = "error";
            $r["mensaje"] = "Error al guardar";
        }
    break;
 
    case "listar":
        $p = new puntosDao();
        $resultados = $p->listar_todo();
        if(sizeof($resultados)>0)
        {
            $r["estado"] = "ok";
            $r["mensaje"] = $resultados;
        }
        else
        {
            $r["estado"] = "error";
            $r["mensaje"] = "No hay registros";
        }
    break;
    case "borrar":
        $p = new puntosDao();
        $resultados = $p->borrar($_POST["id"]);
        if($resultados)
        {
            $r["estado"] = "ok";
            $r["mensaje"] = "Borrado Correctamente";
        }
        else
        {
            $r["estado"] = "error";
            $r["mensaje"] = "Error al borrar";
        }
    break;
    case "actualizar":
        $p = new puntosDao();
        $exito = $p->actualizar($_POST["id"], $_POST["titulo"], $_POST["cx"], $_POST["cy"], $_POST["fo"]);
        if($exito)
        {
            $r["estado"] = "ok";
            $r["mensaje"] = "Actualizado Correctamente";
        }
        else
        {
            $r["estado"] = "error";
            $r["mensaje"] = "Error al actualizar";
			
        }
    break;
    default:
        $r["estado"] = "error";
        $r["mensaje"] = "Datos no validos";
    break;
}
echo json_encode($r);//IMPRIMIR JSON
?>