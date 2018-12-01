<?php

include('class_function.php');

$myclassobj = new Myclass();

$queryfor = '';

if (isset($_POST['queryfor']))
    $queryfor = $_POST['queryfor'];

if (isset($_GET['queryfor']))
    $queryfor = $_GET['queryfor'];



//*************** Authentication *********************//

//Login
if ($queryfor === "Login") {
    
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    $loginResult = $myclassobj->Login($username, $password);
    if ($loginResult->num_rows > 0) {
        
        $table = '[';
        $tempt = $table;
        foreach ($loginResult as $rows) {
            $table = '{"fname":"' . $rows['fname'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return trim($table);
        
    } else {
        echo '[]';
    }
}


//*************** Dashboard *********************//

//Total Income
if ($queryfor === "TotalIncome") {
    
    $incomeResult = $myclassobj->TotalIncome();
    if ($incomeResult->num_rows > 0) {
        
        $table = '[';
        $tempt = $table;
        foreach ($incomeResult as $rows) {
            $table = '{"income":"' . $rows['income'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return trim($table);
        
    } else {
        echo '[]';
    }
}

//Total Expense
if ($queryfor === "TotalExpense") {
    
    $expenseResult = $myclassobj->TotalExpense();
    if ($expenseResult->num_rows > 0) {
        
        $table = '[';
        $tempt = $table;
        foreach ($expenseResult as $rows) {
            $table = '{"fname":"' . $rows['fname'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return trim($table);
        
    } else {
        echo '[]';
    }
}

//Trending Items
if ($queryfor === "TrendingItems") {
    
    $trendingResult = $myclassobj->TrendingItems();
    if ($trendingResult->num_rows > 0) {
        
        $table = '[';
        $tempt = $table;
        foreach ($trendingResult as $rows) {
            $table = '{"items":"' . $rows['items'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return trim($table);
        
    } else {
        echo '[]';
    }
}

//Inventory Watch
if ($queryfor === "InventoryWatch") {
    
    $inventoryResult = $myclassobj->InventoryWatch();
    if ($inventoryResult->num_rows > 0) {
        
        $table = '[';
        $tempt = $table;
        foreach ($inventoryResult as $rows) {
            $table = '{"name":"' . $rows['name'] . '","qty":"' . $rows['qty'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return trim($table);
        
    } else {
        echo '[]';
    }
}


//Item Name
if ($queryfor === "ItemName") {

    $itemid  = $_POST['itemid'];
    
    $itemnameResult = $myclassobj->ItemName($itemid);
    if ($itemnameResult->num_rows > 0) {
        
        $table = '[';
        $tempt = $table;
        foreach ($itemnameResult as $rows) {
            $table = '{"name":"' . $rows['name'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return trim($table);
        
    } else {
        echo '[]';
    }
}

//**************** User Management ****************//

//Check User Exist
if ($queryfor === "CheckUserExist") {
    $contact = $_POST['contact'];
    $type    = $_POST['type'];
    
    $checkUserResult = $myclassobj->CheckUser($contact, $type);
    if ($checkUserResult->num_rows > 0) {
        $table = '[';
        $tempt = $table;
        foreach ($checkUserResult as $rows) {
            $table = '{"cid":"' . $rows['id'] . '","fname":"' . $rows['fname'] . '","lname":"' . $rows['lname'] . '","contact":"' . $rows['contact'] . '","email":"' . $rows['email'] . '","status":"' . $rows['status'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return $table;
    } else {
        $result = '{"code":"success","msg":"New User"}';
        echo $result;
        return $result;
    }
}


//Get Employee List only Name and Id
if ($queryfor === "GetEmployeeList") {
    
    $employeeListResult = $myclassobj->GetAllEmployee();
    if ($employeeListResult->num_rows > 0) {
        $table = '[';
        $tempt = $table;
        foreach ($employeeListResult as $rows) {
            $table = '{"id":"' . $rows['id'] . '","name":"' . $rows['Name'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return $table;
    } else {
        echo '[]';
    }
}

//Get Specific Customer with contact
if ($queryfor === "GetCustomerContact") {
    $contact = $_POST['contact'];
    
    $customerdataresult = $myclassobj->GetCustomerContact($contact);
    if ($customerdataresult->num_rows > 0) {
        $table = '[';
        $tempt = $table;
        foreach ($customerdataresult as $rows) {
            $table = '{"cid":"' . $rows['id'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return $table;
    } else {
        echo '[]';
    }
}

//Get Admin List
if ($queryfor === "GetAdminData") {
    
    $admindataresult = $myclassobj->GetAdminData();
    if ($admindataresult->num_rows > 0) {
        $table = '[';
        $tempt = $table;
        foreach ($admindataresult as $rows) {
            $table = '{"aid":"' . $rows['id'] . '","fname":"' . $rows['fname'] . '","lname":"' . $rows['lname'] . '","contact":"' . $rows['contact'] . '","email":"' . $rows['email'] . '","createddate":"' . $rows['createddate'] . '","modifieddate":"' . $rows['modifieddate'] . '","status":"' . $rows['status'] . '","username":"' . $rows['username'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return $table;
    } else {
        echo '[]';
    }
}

//Get Customer List
if ($queryfor === "GetCustomerData") {
    
    $customerdataresult = $myclassobj->GetCustomerData();
    if ($customerdataresult->num_rows > 0) {
        $table = '[';
        $tempt = $table;
        foreach ($customerdataresult as $rows) {
            $table = '{"cid":"' . $rows['id'] . '","fname":"' . $rows['fname'] . '","lname":"' . $rows['lname'] . '","contact":"' . $rows['contact'] . '","email":"' . $rows['email'] . '","createddate":"' . $rows['createddate'] . '","modifieddate":"' . $rows['modifieddate'] . '","status":"' . $rows['status'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return $table;
    } else {
        echo '[]';
    }
}

//Get Employee List with all Data
if ($queryfor === "GetEmployeeData") {
    
    $employeedataresult = $myclassobj->GetEmployeeData();
    if ($employeedataresult->num_rows > 0) {
        $table = '[';
        $tempt = $table;
        foreach ($employeedataresult as $rows) {
            $table = '{"empid":"' . $rows['id'] . '","fname":"' . $rows['fname'] . '","lname":"' . $rows['lname'] . '","contact":"' . $rows['contact'] . '","email":"' . $rows['email'] . '","salary":"' . $rows['salary'] . '","salarystatus":"' . $rows['salarystatus'] . '","createddate":"' . $rows['createddate'] . '","modifieddate":"' . $rows['modifieddate'] . '","status":"' . $rows['status'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return $table;
    } else {
        echo '[]';
    }
}

//Insert Customer
if ($queryfor === "InsertCustomer") {
    
    $fname   = $_POST['fname'];
    $lname   = $_POST['lname'];
    $contact = $_POST['contact'];
    $email   = $_POST['email'];
    
    $insertCustomerResult = $myclassobj->InsertCustomer($fname, $lname, $contact, $email);
    if ($insertCustomerResult > 0) {
        $result = '{"code":"success","msg":"Created Customer Successfully"}';
        echo $result;
        return $result;
    } else {
        $result = '{"code":"error","msg":"Something Went Wrong!!"}';
        echo $result;
        return $result;
    }
}

//Insert Employee
if ($queryfor === "InsertEmployee") {
    
    $fname   = $_POST['fname'];
    $lname   = $_POST['lname'];
    $contact = $_POST['contact'];
    $email   = $_POST['email'];
    $salary  = $_POST['salary'];
    
    $insertEmployeeResult = $myclassobj->InsertEmployee($fname, $lname, $contact, $email, $salary);
    if ($insertEmployeeResult > 0) {
        $result = '{"code":"success","msg":"Created Employee Successfully"}';
        echo $result;
        return $result;
    } else {
        $result = '{"code":"error","msg":"Something Went Wrong!!"}';
        echo $result;
        return $result;
    }
}

//Insert Admin
if ($queryfor === "InsertAdmin") {
    
    $fname    = $_POST['fname'];
    $lname    = $_POST['lname'];
    $contact  = $_POST['contact'];
    $email    = $_POST['email'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    
    $insertAdminResult = $myclassobj->InsertAdmin($fname, $lname, $contact, $email, $username, $password);
    
    if ($insertAdminResult > 0) {
        $result = '{"code":"success","msg":"Created Admin Successfully"}';
        echo $result;
        return $result;
    } else {
        $result = '{"code":"error","msg":"Something Went Wrong!!"}';
        echo $result;
        return $result;
    }
}

//Update User
if ($queryfor === "UpdateUser") {
    
    $id      = $_POST['id'];
    $type    = $_POST['type'];
    $fname   = $_POST['fname'];
    $lname   = $_POST['lname'];
    $contact = $_POST['contact'];
    $email   = $_POST['email'];
    $status  = $_POST['status'];
    $salary  = $_POST['salary'];
    
    $updateuserresult = $myclassobj->UpdatUser($id, $type, $fname, $lname, $contact, $email, $status, $salary);
    if ($updateuserresult > 0) {
        $result = '{"code":"success","msg":"User Updated Successfully"}';
        echo $result;
        return $result;
    } else {
        $result = '{"code":"error","msg":"Something Went Wrong!!"}';
        echo $result;
        return $result;
    }
}

//Delete User
if ($queryfor === "DeleteUser") {
    
    $type = $_POST['type'];
    $id   = $_POST['id'];
    
    $deleteuserresult = $myclassobj->DeleteUser($type, $id);
    if ($deleteuserresult > 0) {
        $result = '{"code":"success","msg":"User Deleted Successfully"}';
        echo $result;
        return $result;
    } else {
        $result = '{"code":"error","msg":"Something Went Wrong!!"}';
        echo $result;
        return $result;
    }
}

//************ Order Management ***********//

//Get Today Order
if ($queryfor === "GetTodayOrder") {
    
    $todayOrderResult = $myclassobj->GetTodayOrder();
    if ($todayOrderResult->num_rows > 0) {
        $table = '[';
        $tempt = $table;
        foreach ($todayOrderResult as $rows) {
            $table = '{"oid":"' . $rows['oid'] . '","deliverydate":"' . $rows['deliverydate'] . '","item":"' . $rows['items'] . '","contact":"' . $rows['contact'] . '","customer":"' . $rows['customer'] . '","email":"' . $rows['email'] . '","employee":"' . $rows['employee'] . '","totalamt":"' . $rows['amount'] . '","paid":"' . $rows['paid'] . '","balance":"' . $rows['balance'] . '","cid":"' . $rows['cid'] . '","empid":"' . $rows['empid'] . '","itemname":"' . $rows['itemname'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return $table;
    } else {
        echo '[]';
    }
}

//Update Order
if ($queryfor === "UpdateOrder") {
    $oid    = $_POST['oid'];
    $empid  = $_POST['empid'];
    $totalamt = $_POST['totalamt'];
    $status = $_POST['status'];
	$type = $_POST['type'];
    
    $updateOrderResult = $myclassobj->UpdateOrder($oid, $empid, $totalamt, $status, $type);
    if ($updateOrderResult > 0) {
        $result = '{"code":"success","msg":"Order Updated Successfully"}';
        echo $result;
        return $result;
    } else {
        $result = '{"code":"error","msg":"Something Went Wrong!!"}';
        echo $result;
        return $result;
    }
}

//Delete Order
if ($queryfor === "DeleteOrder") {
    $oid    = $_POST['oid'];
    $status = $_POST['status'];
    
    $deleteOrderResult = $myclassobj->DeleteOrder($oid, $status);
    if ($deleteOrderResult > 0) {
        $result = '{"code":"success","msg":"Order Deleted Successfully"}';
        echo $result;
        return $result;
    } else {
        $result = '{"code":"error","msg":"Something Went Wrong!!"}';
        echo $result;
        return $result;
    }
}

//Create Order
if ($queryfor === "CreateOrder") {
    
    $cid      = $_POST['cid'];
    $items    = $_POST['items'];
    $deldate  = $_POST['deldate'];
    $totalamt = $_POST['totalamt'];
    $paidamt  = $_POST['paidamt'];
    $balamt   = $_POST['balamt'];
    
    $insertOrderResult = $myclassobj->InsertOrder($cid, $items, $deldate, $totalamt, $paidamt, $balamt);
    if ($insertOrderResult > 0) {
        $result = '{"code":"success","msg":"Order Inserted Successfully"}';
        echo $result;
        return $result;
    } else {
        $result = '{"code":"error","msg":"Something Went Wrong!!"}';
        echo $result;
        return $result;
    }
}

//Get Upcoming Order
if ($queryfor === "GetUpcomingOrder") {
    
    $upcomingOrderResult = $myclassobj->GetUpcomingOrder();
    if ($upcomingOrderResult->num_rows > 0) {
        $table = '[';
        $tempt = $table;
        foreach ($upcomingOrderResult as $rows) {
            $table = '{"oid":"' . $rows['oid'] . '","deliverydate":"' . $rows['deliverydate'] . '","item":"' . $rows['items'] . '","contact":"' . $rows['contact'] . '","customer":"' . $rows['customer'] . '","email":"' . $rows['email'] . '","employee":"' . $rows['employee'] . '","totalamt":"' . $rows['amount'] . '","paid":"' . $rows['paid'] . '","balance":"' . $rows['balance'] . '","cid":"' . $rows['cid'] . '","empid":"' . $rows['empid'] . '","itemname":"' . $rows['itemname'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return $table;
    } else {
        echo '[]';
    }
}

//Get Pending Order
if ($queryfor === "GetPendingOrder") {
    
    $pendingOrderResult = $myclassobj->GetPendingOrder();
    if ($pendingOrderResult->num_rows > 0) {
        $table = '[';
        $tempt = $table;
        foreach ($pendingOrderResult as $rows) {
            $table = '{"oid":"' . $rows['oid'] . '","deliverydate":"' . $rows['deliverydate'] . '","createddate":"' . $rows['createddate'] . '","item":"' . $rows['items'] . '","contact":"' . $rows['contact'] . '","customer":"' . $rows['customer'] . '","email":"' . $rows['email'] . '","totalamt":"' . $rows['amount'] . '","paid":"' . $rows['paid'] . '","balance":"' . $rows['balance'] . '","cid":"' . $rows['cid'] . '","itemname":"' . $rows['itemname'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return $table;
    } else {
        echo '[]';
    }
}


//****************** Inventory Management ********************//

//Get Inventory List
if ($queryfor === "GetInventoryData") {
    
    $inventorydataresult = $myclassobj->GetInventoryData();
    if ($inventorydataresult->num_rows > 0) {
        $table = '[';
        $tempt = $table;
        foreach ($inventorydataresult as $rows) {
            $table = '{"inid":"' . $rows['inid'] . '","name":"' . $rows['name'] . '","qty":"' . $rows['qty'] . '","price":"' . $rows['price'] . '","createddate":"' . $rows['createddate'] . '","status":"' . $rows['status'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return $table;
    } else {
        echo '[]';
    }
}


//Insert Inventory
if ($queryfor === "InsertInventory") {
    
    $name  = $_POST['name'];
    $qty   = $_POST['qty'];
    $price = $_POST['price'];
    
    $insertinventorysresult = $myclassobj->InsertInventory($name, $qty, $price);
    if ($insertinventorysresult > 0) {
        $result = '{"code":"success","msg":"Inventory Inserted Successfully"}';
        echo $result;
        return $result;
    } else {
        $result = '{"code":"error","msg":"Something Went Wrong!!"}';
        echo $result;
        return $result;
    }
}

//Update Inventory
if ($queryfor === "Updatinventory") {
    
    $inid   = $_POST['inid'];
    $name   = $_POST['name'];
    $qty    = $_POST['qty'];
    $price  = $_POST['price'];
    $status = $_POST['status'];
    
    $updateinventorysresult = $myclassobj->UpdatInventory($inid, $name, $qty, $price, $status);
    if ($updateinventorysresult > 0) {
        $result = '{"code":"success","msg":"Inventory Updated Successfully"}';
        echo $result;
        return $result;
    } else {
        $result = '{"code":"error","msg":"Something Went Wrong!!"}';
        echo $result;
        return $result;
    }
}

//Delete Inventory
if ($queryfor === "Deleteinventory") {
    
    $inid = $_POST['inid'];
    
    $deleteinventoryresult = $myclassobj->DeleteInventory($inid);
    if ($deleteinventoryresult > 0) {
        $result = '{"code":"success","msg":"Inventory Deleted Successfully"}';
        echo $result;
        return $result;
    } else {
        $result = '{"code":"error","msg":"Something Went Wrong!!"}';
        echo $result;
        return $result;
    }
}


//****************** Item Management ********************//

//Get Item List
if ($queryfor === "GetItemsData") {
    
    $itemsdataresult = $myclassobj->GetItemsData();
    if ($itemsdataresult->num_rows > 0) {
        $table = '[';
        $tempt = $table;
        foreach ($itemsdataresult as $rows) {
            $table = '{"itid":"' . $rows['itid'] . '","name":"' . $rows['name'] . '","status":"' . $rows['status'] . '","price":"' . $rows['price'] . '","createddate":"' . $rows['createddate'] . '"},';
            $tempt = $tempt . $table;
        }
        $table = '';
        $table = substr($tempt, 0, -1);
        
        $tempt = '';
        $tempt = $table . ']';
        $table = '';
        $table = $tempt;
        echo $table;
        return $table;
    } else {
        echo '[]';
    }
}

//Insert Item
if ($queryfor === "InsertItems") {
    
    $name  = $_POST['name'];
    $price = $_POST['price'];
    
    $insertitemsresult = $myclassobj->InsertItems($name, $price);
    if ($insertitemsresult > 0) {
        $result = '{"code":"success","msg":"Item Inserted Successfully"}';
        echo $result;
        return $result;
    } else {
        $result = '{"code":"error","msg":"Something Went Wrong!!"}';
        echo $result;
        return $result;
    }
}

//Update Item
if ($queryfor === "UpdatItems") {
    
    $itid   = $_POST['itid'];
    $name   = $_POST['name'];
    $price  = $_POST['price'];
    $status = $_POST['status'];
    
    $updateitemsresult = $myclassobj->UpdatItems($itid, $name, $price, $status);
    if ($updateitemsresult > 0) {
        $result = '{"code":"success","msg":"Item Updated Successfully"}';
        echo $result;
        return $result;
    } else {
        $result = '{"code":"error","msg":"Something Went Wrong!!"}';
        echo $result;
        return $result;
    }
}

//Delete Item
if ($queryfor === "DeleteItems") {
    
    $itid = $_POST['itid'];
    
    $deleteitemsresult = $myclassobj->DeleteItems($itid);
    if ($deleteitemsresult > 0) {
        $result = '{"code":"success","msg":"Item Deleted Successfully"}';
        echo $result;
        return $result;
    } else {
        $result = '{"code":"error","msg":"Something Went Wrong!!"}';
        echo $result;
        return $result;
    }
}

?>
