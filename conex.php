<?php
class conex //CLASE PARA CONEXION A BASE DE DATOS
{
    public static function con()
    {
        $conexion = mysql_connect("localhost", "root", "");
        mysql_select_db("mapas");
        mysql_query("SET NAMES 'utf8'");
        if(!$conexion)
        {
            return FALSE;
        }
        else
        {
            return $conexion;
           
        }
    }
}
?>