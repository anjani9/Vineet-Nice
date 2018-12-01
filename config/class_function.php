<?php

include('dbconfig.php');

class Myclass
{
    //*************** Authentication *********************//
    
    //Login
    public function Login($username, $password)
    {
        $objconn = new Database();
        $sql     = "select * from admin where username='" . $username . "' && password='" . $password . "'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }


	//*************** Dashboard *********************//
    
	//Total Income
    public function TotalIncome()
    {
        $objconn = new Database();
        $sql     = "select sum(amount) as income from orders where status='C'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }

	//Total Expense
    public function TotalExpense()
    {
        $objconn = new Database();
        $sql     = "select sum(amount) as expense from orders where status='C'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }

	//Trending Items
    public function TrendingItems()
    {
        $objconn = new Database();
        $sql     = "select items from orders group by items desc limit 1";
        $result  = $objconn->dbconn($sql);
        return $result;
    }

	//Inventory Watch
    public function InventoryWatch()
    {
        $objconn = new Database();
        $sql     = "select name, qty from inventory where qty < 5";
		$result  = $objconn->dbconn($sql);
        return $result;
    }

	//Item Name
    public function ItemName($itemid)
    {
        $objconn = new Database();
        $sql     = "select name from items where itid ='" . $itemid . "'";
		$result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //**************** User Management ****************//
    
    //Check User
    public function CheckUser($contact, $type)
    {
        $objconn = new Database();
        $sql     = "select * from " . $type . " where contact='" . $contact . "'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Get All Employee
    public function GetAllEmployee()
    {
        $objconn = new Database();
        $sql     = "SELECT id, concat(fname, ' ',lname) AS Name FROM nice.employee where status != 'R'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    
    //Get Specific Customer
    public function GetCustomerContact($contact)
    {
        $objconn = new Database();
        $sql     = "select id from customer where contact='" . $contact . "'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Get Customer 
    public function GetCustomerData()
    {
        $objconn = new Database();
        $sql     = "select * from customer where status != 'R'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Get Admin 
    public function GetAdminData()
    {
        $objconn = new Database();
        $sql     = "select * from admin where status != 'R'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    
    //Get Employee 
    public function GetEmployeeData()
    {
        $objconn = new Database();
        $sql     = "select * from employee where status != 'R'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Insert Customer
    public function InsertCustomer($fname, $lname, $contact, $email)
    {
        $objconn = new Database();
        $sql     = "insert into customer (fname, lname, contact, email, createddate, modifieddate, status) 
        values ('" . $fname . "','" . $lname . "','" . $contact . "','" . $email . "', NOW() , NOW() ,'E')";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Insert Employee
    public function InsertEmployee($fname, $lname, $contact, $email, $salary)
    {
        $objconn = new Database();
        $sql     = "insert into employee (fname, lname, contact, email, salary, salarystatus, createddate, modifieddate, status) 
        values ('" . $fname . "','" . $lname . "','" . $contact . "','" . $email . "', '" . $salary . "','paid', NOW() , NOW() ,'E')";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Insert Admin
    public function InsertAdmin($fname, $lname, $contact, $email, $username, $password)
    {
        $objconn = new Database();
        $sql     = "insert into admin (fname, lname, contact, email, username, password, createddate, modifieddate, status) 
        values ('" . $fname . "','" . $lname . "','" . $contact . "','" . $email . "','" . $username . "','" . $password . "', NOW() , NOW() ,'E')";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Update User
    public function UpdatUser($id, $type, $fname, $lname, $contact, $email, $status, $salary)
    {
        $objconn = new Database();
        if ($type == 'customer') {
            $sql = "update " . $type . " SET fname='" . $fname . "',lname='" . $lname . "',contact='" . $contact . "',email='" . $email . "',status='" . $status . "',modifieddate=NOW()  where id ='" . $id . "'";
        } else if ($type == 'employee') {
            $sql = "update " . $type . " SET fname='" . $fname . "',lname='" . $lname . "',contact='" . $contact . "',email='" . $email . "',status='" . $status . "',salary='" . $salary . "',modifieddate=NOW() where id ='" . $id . "'";
        } else if ($type == 'admin') {
            $sql = "update " . $type . " SET fname='" . $fname . "',lname='" . $lname . "',contact='" . $contact . "',email='" . $email . "',status='" . $status . "',modifieddate=NOW()  where id ='" . $id . "'";
        }
        $result = $objconn->dbconn($sql);
        return $result;
    }
    
    //Delete User
    public function DeleteUser($type, $id)
    {
        $objconn = new Database();
        if ($type == 'customer') {
            $sql = "update " . $type . " SET status='R' where id ='" . $id . "'";
        } else if ($type == 'employee') {
            $sql = "update " . $type . " SET status='R' where id ='" . $id . "'";
        } else if ($type == 'admin') {
            $sql = "update " . $type . " SET status='R' where id ='" . $id . "'";
        }
        $result = $objconn->dbconn($sql);
        return $result;
    }
    
    //************ Order Management ***********//
    
    //Get Today Order
    public function GetTodayOrder()
    {
        $objconn = new Database();
        $sql     = "SELECT orders.oid, orders.deliverydate, orders.items, orders.createddate, orders.amount, orders.paid, orders.balance, orders.cid, orders.empid, items.name as itemname,
        CONCAT(customer.fname , ' ', customer.lname) as customer, customer.contact, customer.email,
        CONCAT(employee.fname ,' ', employee.lname) as employee FROM customer 
        INNER JOIN orders ON customer.id = orders.cid 
        INNER JOIN items ON orders.items = items.itid
        INNER JOIN employee ON orders.empid = employee.id where orders.deliverydate=CURDATE() && orders.status = 'P'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Update Today Order
    public function UpdateOrder($oid, $empid, $totalamt, $status, $type)
    {
        $objconn = new Database();
		if($type == 'pending'){
			$sql     = "update orders SET empid='" . $empid . "',status='" . $status . "' where oid ='" . $oid . "'";
		}else if($type == 'upcoming'){
			$sql     = "update orders SET empid='" . $empid . "',paid='" . $totalamt . "',balance=0,status='" . $status . "' where oid ='" . $oid . "'";
		}

        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Delete Today Order
    public function DeleteOrder($oid, $status)
    {
        $objconn = new Database();
        $sql     = "update orders SET status='" . $status . "' where oid ='" . $oid . "'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    
    //Get Upcoming Order
    public function GetUpcomingOrder()
    {
        $objconn = new Database();
        $sql     = "SELECT orders.oid, orders.deliverydate, orders.items, orders.createddate, orders.amount, orders.paid, orders.balance, orders.cid, orders.empid, items.name as itemname,
        CONCAT(customer.fname , ' ', customer.lname) as customer, customer.contact, customer.email,
        CONCAT(employee.fname ,' ', employee.lname) as employee FROM customer 
        INNER JOIN orders ON customer.id = orders.cid 
        INNER JOIN items ON orders.items = items.itid
        INNER JOIN employee ON orders.empid = employee.id where orders.deliverydate>CURDATE() && orders.status = 'P'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Get Pending Order
    public function GetPendingOrder()
    {
        $objconn = new Database();
        $sql     = "SELECT orders.oid, orders.cid, orders.deliverydate, orders.items, orders.createddate, orders.amount, orders.paid, orders.balance,orders.status,items.name as itemname,
        CONCAT(customer.fname , ' ', customer.lname) as customer, customer.contact, customer.email FROM customer 
        INNER JOIN orders ON customer.id = orders.cid 
        INNER JOIN items ON orders.items = items.itid
        where orders.status='N'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Insert Order
    public function InsertOrder($cid, $items, $deldate, $totalamt, $paidamt, $balamt)
    {
        $objconn = new Database();
        $sql     = "insert into orders (cid, items, deliverydate, createddate, amount, paid, balance, status) 
        values ('" . $cid . "','" . $items . "','" . $deldate . "',NOW() ,'" . $totalamt . "', '" . $paidamt . "', '" . $balamt . "','N')";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    
    //****************** Inventory Management ********************//
    //Get Inventory  
    public function GetInventoryData()
    {
        $objconn = new Database();
        $sql     = "select * from inventory where status != 'R'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Insert Inventory
    public function InsertInventory($name, $qty, $price)
    {
        $objconn = new Database();
        $sql     = "insert into inventory (name, qty, price, status, createddate) 
        values ('" . $name . "','" . $qty . "','" . $price . "','E',NOW())";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Update Inventory
    public function UpdatInventory($inid, $name, $qty, $price, $status)
    {
        $objconn = new Database();
        $sql     = "update inventory SET name='" . $name . "',qty='" . $qty . "',price='" . $price . "',status='" . $status . "' where inid ='" . $inid . "'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Delete Inventory
    public function DeleteInventory($inid)
    {
        $objconn = new Database();
        $sql     = "update inventory SET status='R' where inid ='" . $inid . "'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //****************** Item Management ********************//
    //Get Item 
    public function GetItemsData()
    {
        $objconn = new Database();
        $sql     = "select * from items where status != 'R'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Insert Item
    public function InsertItems($name, $price)
    {
        $objconn = new Database();
        $sql     = "insert into items (name,  price,status, createddate) 
        values ('" . $name . "','" . $price . "','E',NOW())";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Update Item
    public function UpdatItems($itid, $name, $price, $status)
    {
        $objconn = new Database();
        $sql     = "update items SET name='" . $name . "',price='" . $price . "',status='" . $status . "' where itid ='" . $itid . "'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
    
    //Delete Item
    public function DeleteItems($itid)
    {
        $objconn = new Database();
        $sql     = "update items SET status='R' where itid ='" . $itid . "'";
        $result  = $objconn->dbconn($sql);
        return $result;
    }
}
?>