<?php


class Database
{

    
	public function dbconn($sql)
		{
			
			$conn = mysqli_connect("localhost" , "root" , "" , "inventory")
			or die ('Could not connect to server');
			if($sql != ''){

				$retval = mysqli_query($conn, $sql);
				return $retval;
			
			}
			mysqli_close($conn);
		}
		
	
}
?>



       

	   