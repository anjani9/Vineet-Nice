
var userId = '';

$(function () {
    initializeDatatable();

    Validation();

    $(".styled, .multiselect-container input").uniform({
        radioClass: 'choice'
    });

    $('.emp_select, .usertype_select').select2();

    $('.usertype').css('display', 'none');

    $("#aLogout").on("click", function () {
        localStorage.clear();
        window.location.href = "index.html";
    });

    CustomerList();

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("data-tab") // activated tab
        if (target == "customer") {
            CustomerList();
            resetForm('#userfrm');
        } else if (target == "employee") {
            EmployeeList();
            resetForm('#userfrm');
        } else if (target == "admin") {
            AdminList();
            resetForm('#userfrm');
        }
    });

    $('#cutype').off('select2:select').on('select2:select', function (e) {
        if (userId == "0") {
            var usertype = $('#cutype').find(':selected').data('user');

            if (usertype == 'customer') {
                $('.usertype').show();
                $('.onlyemp').hide();
                $('.onlyadmin').hide();
                $('.txtemp, .txtadmin').prop('disabled', 'disabled');
            } else if (usertype == 'employee') {
                $('.usertype').show();
                $('.onlyemp').show();
                $('.onlyadmin').hide();
                $('.txtadmin').prop('disabled', 'disabled');
                $('.txtemp').prop('disabled', false);
            } else if (usertype == 'admin') {
                $('.usertype').show();
                $('.onlyemp').hide();
                $('.onlyadmin').show();
                $('.txtemp').prop('disabled', 'disabled');
                $('.txtadmin').prop('disabled', false);
            }
        }
    });

});

function ResetUser() {
    resetForm('#userfrm');
    $('.usertype').css('display', 'none');
}

function CustomerList() {

    var dataString = "queryfor=GetCustomerData";
    $.ajax({
        method: "GET",
        url: "config/common.php",
        data: dataString,
        success: function (response) {
            var res = JSON.parse(response.trim());
            var listdata = [];
            if (res.length > 0) {
                $.each(res, function (key, value) {
                    listdata.push({
                        cid: value.cid,
                        fname: value.fname,
                        lname: value.lname,
                        contact: value.contact,
                        email: value.email,
                        status: value.status,
                        type: 'customer'
                    });
                    actionbtn = "<ul class=\"icons-list\">" +
                                "<li data-toggle='modal' data-target='#user_view' data-popup='tooltip' title='View User' onclick='ViewUser(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-eye2'></i></a></li>" +
                                "<li data-toggle='modal' data-target='#user_edit' data-popup='tooltip' title='Edit User' onclick='EditUser(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-pencil7'></i></a></li>" +
                                "<li data-toggle='modal' data-target='#user_delete' data-popup='tooltip' title='Delete User' onclick='DeleteUser(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-trash'></i></a></li>" +
                                "</ul>";
                    listdata[key].actionbtn = actionbtn;

                });
            }

            $('#customerList').dataTable({
                bDestroy: true,
                data: listdata,
                columnDefs: [{
                    targets: [5]
                }],
                columns: [
                    { data: "fname" },
                    { data: "lname" },
                    { data: "contact" },
                    { data: "email" },
                    {
                        "mData": "status",
                        "mRender": function (data, type, full) {
                            if (data == 'E') {
                                return '<span class="label label-success">Enabled</span>';
                            } else if (data == 'D') {
                                return '<span class="label label-danger">Disabled</span>';
                            }
                        },
                        "sClass": "text-center"
                    },
                    { data: "actionbtn", sClass: "text-center", orderable: false, }
                ]
            });
        },
        error: function (err) {
            notifyMsg("error", "Something Went Wrong!!")
        }
    });
}

function AdminList() {

    var dataString = "queryfor=GetAdminData";
    $.ajax({
        method: "GET",
        url: "config/common.php",
        data: dataString,
        success: function (response) {
            var res = JSON.parse(response.trim());
            var listdata = [];
            if (res.length > 0) {
                $.each(res, function (key, value) {
                    listdata.push({
                        aid: value.aid,
                        username: value.username,
                        fname: value.fname,
                        lname: value.lname,
                        contact: value.contact,
                        email: value.email,
                        status: value.status,
                        type: 'admin'
                    });
                    actionbtn = "<ul class=\"icons-list\">" +
                                "<li data-toggle='modal' data-target='#user_view' data-popup='tooltip' title='View User' onclick='ViewUser(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-eye2'></i></a></li>" +
                                "<li data-toggle='modal' data-target='#user_edit' data-popup='tooltip' title='Edit User' onclick='EditUser(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-pencil7'></i></a></li>" +
                                "<li data-toggle='modal' data-target='#user_delete' data-popup='tooltip' title='Delete User' onclick='DeleteUser(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-trash'></i></a></li>" +
                                "</ul>";
                    listdata[key].actionbtn = actionbtn;

                });
            }

            $('#adminList').dataTable({
                bDestroy: true,
                data: listdata,
                columnDefs: [{
                    targets: [5]
                }],
                columns: [
                    { data: "username" },
                    { data: "fname" },
                    { data: "lname" },
                    { data: "contact" },
                    { data: "email" },
                    {
                        "mData": "status",
                        "mRender": function (data, type, full) {
                            if (data == 'E') {
                                return '<span class="label label-success">Enabled</span>';
                            } else if (data == 'D') {
                                return '<span class="label label-danger">Disabled</span>';
                            }
                        },
                        "sClass": "text-center"
                    },
                    { data: "actionbtn", sClass: "text-center", orderable: false, }
                ]
            });
        },
        error: function (err) {
            notifyMsg("error", "Something Went Wrong!!")
        }
    });
}

function EmployeeList() {

    var dataString = "queryfor=GetEmployeeData";
    $.ajax({
        method: "GET",
        url: "config/common.php",
        data: dataString,
        success: function (response) {
            var res = JSON.parse(response.trim());
            var listdata = [];
            if (res.length > 0) {
                $.each(res, function (key, value) {
                    listdata.push({
                        empid: value.empid,
                        fname: value.fname,
                        lname: value.lname,
                        contact: value.contact,
                        email: value.email,
                        salary: value.salary,
                        status: value.status,
                        type: 'employee'
                    });

                    actionbtn = "<ul class=\"icons-list\">" +
                                "<li data-toggle='modal' data-target='#user_view' data-popup='tooltip' title='View User' onclick='ViewUser(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-eye2'></i></a></li>" +
                                "<li data-toggle='modal' data-target='#user_edit' data-popup='tooltip' title='Edit User' onclick='EditUser(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-pencil7'></i></a></li>" +
                                "<li data-toggle='modal' data-target='#user_delete' data-popup='tooltip' title='Delete User' onclick='DeleteUser(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-trash'></i></a></li>" +
                                "</ul>";
                    listdata[key].actionbtn = actionbtn;

                });
            }

            $('#employeeList').dataTable({
                bDestroy: true,
                data: listdata,
                columnDefs: [{
                    targets: [5]
                }],
                columns: [
                    { data: "fname" },
                    { data: "lname" },
                    { data: "contact" },
                    { data: "email" },
                    { data: "salary" },
                    {
                        "mData": "status",
                        "mRender": function (data, type, full) {
                            if (data == 'E') {
                                return '<span class="label label-success">Enabled</span>';
                            } else if (data == 'D') {
                                return '<span class="label label-danger">Disabled</span>';
                            }
                        },
                        "sClass": "text-center"
                    },
                    { data: "actionbtn", sClass: "text-center", orderable: false, }
                ]
            });
        },
        error: function (err) {
            notifyMsg("error", "Something Went Wrong!!")
        }
    });
}

function ViewUser(viewData) {

    if (viewData.type == 'customer') {
        $('.vadmin, .vemp').css('display', 'none');
    } else if (viewData.type == 'employee') {
        $('.vadmin').css('display', 'none');
        $('.vemp').show();
    } else if (viewData.type == 'admin') {
        $('.vemp').css('display', 'none');
        $('.vadmin').show();
    }

    $('#user_view').on('shown.bs.modal', function () {

        $('#vfname').val(viewData.fname);
        $('#vlname').val(viewData.lname);
        $("#vcontact").val(viewData.contact);
        $("#vemail").val(viewData.email);
        $('#vsalary').val(viewData.salary);
        $("#vusername").val(viewData.username);

        $(this).off('shown.bs.modal');

    });

}

function EditUser(editData) {
    var update = {};

    if (editData.type == 'customer') {
        $('.eadmin, .eemp').css('display', 'none');
        update.id = editData.cid;
        update.type = editData.type;
    } else if (editData.type == 'employee') {
        $('.eadmin').css('display', 'none');
        $('.eemp').show();
        update.id = editData.empid;
        update.type = editData.type;
    } else if (editData.type == 'admin') {
        $('.eemp').css('display', 'none');
        $('.eadmin').show();
        update.id = editData.aid;
        update.type = editData.type;
    }

    $('#user_edit').on('shown.bs.modal', function () {

        $('#efname').val(editData.fname);
        $('#elname').val(editData.lname);
        $("#econtact").val(editData.contact);
        $("#eemail").val(editData.email);
        $('#esalary').val(editData.salary);
        $("#eusername").val(editData.username);

        if (editData.status == 'E') {
            $('#chkenabled').prop('checked', true).uniform('refresh');
        } else {
            $('#chkenabled').prop('checked', false).uniform('refresh');
        }

        $(this).off('shown.bs.modal');

    });

    $("#updateuser").unbind('click');

    $("#updateuser").click(function () {

        update.fname = $('#efname').val();
        update.lname = $('#elname').val();
        update.contact = $('#econtact').val();
        update.email = $('#eemail').val();
        update.salary = $('#esalary').val();
        update.status = $('#chkenabled').is(":checked") ? 'E' : 'D';
        UpdateUser(update);
    });
}

function UpdateUser(updateData) {
    var queryfor = "UpdateUser";

    var dataString = "queryfor=" + queryfor + "&type=" + updateData.type + "&id=" + updateData.id + "&fname=" + updateData.fname + "&lname=" + updateData.lname + "&contact=" + updateData.contact + "&email=" + updateData.email + "&status=" + updateData.status + "&salary=" + updateData.salary;
    $.ajax({
        type: 'POST',
        url: "config/common.php",
        data: dataString,
        success: function (response) {
            $('#user_edit').modal('hide');
            var res = JSON.parse(response.trim());
            notifyMsg(res.code, res.msg);
            resetForm('#userEdit');
            if (updateData.type == 'customer') {
                CustomerList();
            } else if (updateData.type == 'employee') {
                EmployeeList();
            } else if (updateData.type == "admin") {
                AdminList();
            }
        }
    });
}

function DeleteUser(delData) {

    if (delData.type == 'customer') {
        delData.id = delData.cid;
    } else if (delData.type == 'employee') {
        delData.id = delData.empid;
    } else if (delData.type == 'admin') {
        delData.id = delData.aid;
    }

    $('#user_delete').on('shown.bs.modal', function () {
        $("#yes_delete").click(function () {
            var dataString = "queryfor=DeleteUser&id=" + delData.id + "&type=" + delData.type;
            $.ajax({
                type: 'POST',
                url: "config/common.php",
                data: dataString,
                success: function (response) {
                    $('#order_delete').modal('hide');
                    var res = JSON.parse(response.trim());
                    notifyMsg(res.code, res.msg);
                    $('#user_delete').modal('hide');
                    if (delData.type == 'customer') {
                        CustomerList();
                    } else if (delData.type == 'employee') {
                        EmployeeList();
                    } else if (delData.type == "admin") {
                        AdminList();
                    }
                }
            });
        });
        $(this).off('shown.bs.modal');
    });
}

function CheckUser() {

    if ($('#cutype').val() == 0) {
        notifyMsg('error', 'Select User Type First!');
    } else {
        if ($("[name='cucontact']").valid()) {
            var queryfor, contact, type;

            contact = $('#cucontact').val();
            type = $('#cutype').find(':selected').data('user');
            queryfor = "CheckUserExist";

            var dataString = "queryfor=" + queryfor + "&contact=" + contact + "&type=" + type;
            $.ajax({
                type: 'POST',
                url: "config/common.php",
                data: dataString,
                success: function (response) {
                    var res = JSON.parse(response.trim());
                    if (res.length > 0) {
                        userId = res[0].cid;
                        $('.usertype').hide();
                        $('.onlyemp').hide();
                        $('.onlyadmin').hide();
                        $('.txtemp, .txtadmin').prop('disabled', 'disabled');
                        notifyMsg('success', 'User Exist Already!');
                    } else {
                        userId = '0';
                        var usertype = $('#cutype').find(':selected').data('user');

                        if (usertype == 'customer') {
                            $('.usertype').show();
                            $('.onlyemp').hide();
                            $('.onlyadmin').hide();
                            $('.txtemp, .txtadmin').prop('disabled', 'disabled');
                        } else if (usertype == 'employee') {
                            $('.usertype').show();
                            $('.onlyemp').show();
                            $('.onlyadmin').hide();
                            $('.txtadmin').prop('disabled', 'disabled');
                            $('.txtemp').prop('disabled', false);
                        } else if (usertype == 'admin') {
                            $('.usertype').show();
                            $('.onlyemp').hide();
                            $('.onlyadmin').show();
                            $('.txtemp').prop('disabled', 'disabled');
                            $('.txtadmin').prop('disabled', false);
                        }

                        notifyMsg('information', 'User Available!');
                    }
                }
            });
        }

    }

}

function CreateNewUser() {
    if ($("#userfrm").data('validator').form()) {
        var queryfor, type, fname, lname, contact, email, salary, username, password;

        type = $('#cutype').find(':selected').data('user');
        fname = $('#cufname').val();
        lname = $('#culname').val();
        contact = $('#cucontact').val();
        email = $('#cuemail').val();
        salary = $('#cusalary').val();
        username = $('#cuusername').val();
        password = $('#cupassword').val();

        if (type == 'admin') {
            queryfor = "InsertAdmin";
        } else if (type == 'customer') {
            queryfor = "InsertCustomer";
        } else if (type == 'employee') {
            queryfor = "InsertEmployee";
        }

        var dataString = "queryfor=" + queryfor + "&fname=" + fname + "&lname=" + lname + "&contact=" + contact + "&email=" + email + "&salary=" + salary + "&username=" + username + "&password=" + password;
        if (userId == '0') {
            $.ajax({
                type: 'POST',
                url: "config/common.php",
                data: dataString,
                success: function (response) {
                    var res = JSON.parse(response.trim());
                    notifyMsg(res.code, res.msg);
                    resetForm('#userfrm');
                    $('.usertype').css('display', 'none');
                }
            });
        } else {
            notifyMsg('success', 'User Exist Already!');
        }
    }
}

