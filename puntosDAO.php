<?php
include_once 'conex.php';//INCLUIR CONEXION DE BASE DE DATOS
 
class puntosDao
{
    private $r;
    public function __construct()
    {
        $this->r = array();
    }
    public function grabar($titulo, $cx,$cy,$fo)//METODO PARA GRABAR A LA BD
    {
        $con = conex::con();
        $titulo = mysql_real_escape_string($titulo);
        $cx = mysql_real_escape_string($cx);
        $cy = mysql_real_escape_string($cy);
		$fo = mysql_real_escape_string($fo);
        $q = "insert into puntos (Titulo, cx, cy, imagen)".
             "values ('".addslashes($titulo)."','".addslashes($cx)."','".addslashes($cy)."','".addslashes($fo)."')";
        $rpta = mysql_query($q, $con);
        mysql_close($con);
        if($rpta==1)
        {
            return TRUE;
        }
        else
        {
            return FALSE;
        }
    }
    public function listar_todo()
    {
        $q = "select * from puntos";
        $con = conex::con();
        $rpta = mysql_query($q,$con);
        mysql_close($con);
        while($fila = mysql_fetch_assoc($rpta))
        {
            $this->r[] = $fila;
        }
        return $this->r;
    }
    public function borrar($idPunto)
    {
        $con = conex::con();
        $idPunto = mysql_real_escape_string($idPunto);
        $q = "delete from puntos where idPuntos = ".(int)$idPunto;
        $rpta = mysql_query($q, $con);
        mysql_close($con);
		//echo $idPunto;
        if($rpta==1)
        {
            return TRUE;
			print_r($q);
        }
        else
        {
            return FALSE;
        }
    }
	public function actualizar($Id, $titulo, $cx,$cy,$fo)//METODO PARA ACTUALIZAR A LA BD
    {
        $con = conex::con();
        $Id = mysql_real_escape_string($Id);
        $titulo = mysql_real_escape_string($titulo);
        $cx = mysql_real_escape_string($cx);
        $cy = mysql_real_escape_string($cy);
		$fo = mysql_real_escape_string($fo);
        $q = "update puntos set Titulo='".$titulo."', cx='".$cx."' , cy ='".$cy."', imagen ='".$fo."' where idPuntos =".$Id;
        $rpta = mysql_query($q, $con);
        mysql_close($con);
        if($rpta==1)
        {
            return TRUE;
        }
        else
        {
            //return FALSE;
			print_r($q);
        }
    }
}
?>