
var usrStatus = ""; var orderCid = "";
$(function () {

    initializeDatatable();

    Validation();

    $('.emp_select, .item_select').select2();

    $('.usrtxt').prop('disabled', 'disabled');

    $(".styled, .multiselect-container input").uniform({
        radioClass: 'choice'
    });


    $('.daterange-single').daterangepicker({
        singleDatePicker: true,
        minDate: new Date()
    });

    $("#aLogout").on("click", function () {
        localStorage.clear();
        window.location.href = "index.html";
    });

    UpcomingOrder();
    EmployeeList();
    ItemList();

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("data-tab");
        if (target == "upcoming") {
            UpcomingOrder();
            resetForm('#orderfrm');
        } else if (target == "pending") {
            PendingOrder();
            resetForm('#orderfrm');
        }
    });

    $('#citems').off('select2:select').on('select2:select', function (e) {
        var totalamount = $('#citems').find(':selected').data('price');
        $('#ctotalamt').val(totalamount);
    });

    $('#cpaidamt').off('change').on('change', function () {
        var bal = ($('#ctotalamt').val() - $('#cpaidamt').val());
        $('#cbalamt').val(bal);
    });

});

function ResetOrderForm() {
    resetForm('#orderfrm');
}

function UpcomingOrder() {

    var dataString = "queryfor=GetUpcomingOrder";
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
                        oid: value.oid,
                        cid: value.cid,
                        eid: value.empid,
                        customer: value.customer,
                        employee: value.employee,
                        contact: value.contact,
                        email: value.email,
                        items: value.item,
                        totalamt: value.totalamt,
                        paid: value.paid,
                        balance: value.balance,
                        deliverydate: value.deliverydate,
                        itemname: value.itemname,
                        type: 'upcoming'
                    });

                    actionbtn = "<ul class=\"icons-list\">" +
                                "<li data-toggle='modal' data-target='#order_view' data-popup='tooltip' title='View Order' onclick='ViewOrder(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-eye2'></i></a></li>" +
                                "<li data-toggle='modal' data-target='#order_edit' data-popup='tooltip' title='Edit Order' onclick='EditOrder(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-pencil7'></i></a></li>" +
                                "<li data-toggle='modal' data-target='#order_delete' data-popup='tooltip' title='Delete Order' onclick='DeleteOrder(" + value.oid + ");'><a href='#'><i class='icon-trash'></i></a></li>" +
                                "</ul>";
                    listdata[key].actionbtn = actionbtn;

                });
            }

            $('#upcomingOrder').dataTable({
                bDestroy: true,
                data: listdata,
                columnDefs: [{
                    targets: [5]
                }],
                order: [[5, "asc"]],
                columns: [
                    { data: "oid" },
                    { data: "customer" },
                    { data: "employee" },
                    { data: "contact" },
                    { data: "itemname" },
                    { data: "deliverydate" },
                    { data: "totalamt" },
                    { data: "actionbtn", sClass: "text-center", orderable: false, }
                ]
            });
        },
        error: function (err) {
            notifyMsg("error", "Something Went Wrong!!")
        }
    });
}

function PendingOrder() {

    var dataString = "queryfor=GetPendingOrder";
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
                        oid: value.oid,
                        cid: value.cid,
                        customer: value.customer,
                        createddate: value.createddate,
                        contact: value.contact,
                        email: value.email,
                        items: value.item,
                        totalamt: value.totalamt,
                        paid: value.paid,
                        balance: value.balance,
                        deliverydate: value.deliverydate,
                        itemname: value.itemname,
                        type: 'pending'
                    });

                    actionbtn = "<ul class=\"icons-list\">" +
                                "<li data-toggle='modal' data-target='#order_view' data-popup='tooltip' title='View Order' onclick='ViewOrder(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-eye2'></i></a></li>" +
                                "<li data-toggle='modal' data-target='#order_edit' data-popup='tooltip' title='Edit Order' onclick='EditOrder(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-pencil7'></i></a></li>" +
                                "<li data-toggle='modal' data-target='#order_delete' data-popup='tooltip' title='Delete Order' onclick='DeleteOrder(" + value.oid + ");'><a href='#'><i class='icon-trash'></i></a></li>" +
                                "</ul>";
                    listdata[key].actionbtn = actionbtn;

                });
            }

            $('#pendinggOrder').dataTable({
                bDestroy: true,
                data: listdata,
                columnDefs: [{
                    targets: [5]
                }],
                order: [[4, "asc"]],
                columns: [
                    { data: "oid" },
                    { data: "customer" },
                    { data: "contact" },
                    { data: "itemname" },
                    { data: "createddate" },
                    { data: "totalamt" },
                    { data: "actionbtn", sClass: "text-center", orderable: false, }
                ]
            });
        },
        error: function (err) {
            notifyMsg("error", "Something Went Wrong!!")
        }
    });
}

function ViewOrder(viewData) {

    $('#order_view').on('shown.bs.modal', function () {
        $('#vorder_id').val(viewData.oid);
        $('#vdelivery_date').val(viewData.deliverydate);
        $('#vitems').val(viewData.itemname)
        $("#vcustomer_name").val(viewData.customer);
        $("#vemployee_name").val(viewData.employee);
        $('#vmobile').val(viewData.contact);
        $("#vemail").val(viewData.email);
        $("#vtotal_amount").val(viewData.totalamt);
        $("#vpaid").val(viewData.paid);
        $('#vbalance').val(viewData.balance);
        $(this).off('shown.bs.modal');
    });

}

function EmployeeList() {
    var dataString = "queryfor=GetEmployeeList";
    $.ajax({
        type: 'GET',
        url: "config/common.php",
        data: dataString,
        success: function (response) {
            var res = JSON.parse(response.trim());
            $.each(res, function (key, value) {
                $("#eemployee").append($("<option></option>").val(value.id).html(value.name));
            });
        }
    });
}

function EditOrder(editData) {
    var update = {};

    if (editData.type == 'pending') {
        $('.uporder').css('display', 'none');
    } else if (editData.type == 'upcoming') {
        $('.uporder').show();
    }

    update.oid = editData.oid;
    update.type = editData.type;
    update.status = "P";
    $('#order_edit').on('shown.bs.modal', function () {

        $('#eorderid').val(editData.oid);
        $('#eitems').val(editData.itemname);
        $("#ename").val(editData.customer);
        $("#enumber").val(editData.contact);
        $('#eemail').val(editData.email);
        $('#eemployee').select2("val", editData.eid);
        $("#etotalamt").val(editData.totalamt);
        $("#epaid").val(editData.paid);
        $("#ebalance").val(editData.balance);
        $('#chkpaid').prop('checked', false).uniform('refresh');
        $('#chkpaid').change(function () {
            if (this.checked) {
                var cevap = window.confirm("Confirm its paid?");
                if (cevap) {
                    update.status = "C";
                } else {
                    $('#chkpaid').prop('checked', false).uniform('refresh');
                }
            }
        });

        $(this).off('shown.bs.modal');

    });

    $('#chkpaid').unbind('change');
    $("#updateorder").unbind('click');

    $("#updateorder").click(function () {
        if ($('#eemployee').val() == 0) {
            notifyMsg('error', 'Assign Employee!');
        } else {
            update.empid = $('#eemployee').find('option:selected').val();
            update.totalamt = editData.totalamt;
            UpdateOrder(update);
        }

    });
}

function UpdateOrder(updateData) {
    var queryfor = "UpdateOrder";
    var oid = updateData.oid;
    var empid = updateData.empid;
    var totalamt = updateData.totalamt;
    var status = updateData.status;
    var type = updateData.type;
    var dataString = "queryfor=" + queryfor + "&oid=" + oid + "&empid=" + empid + "&status=" + status + "&totalamt=" + totalamt + "&type=" + type;
    $.ajax({
        type: 'POST',
        url: "config/common.php",
        data: dataString,
        success: function (response) {
            $('#order_edit').modal('hide');
            var res = JSON.parse(response.trim());
            notifyMsg(res.code, res.msg);
            if (updateData.type == "upcoming") {
                UpcomingOrder();
                resetForm('#orderEdit');
            } else if (updateData.type == "pending") {
                PendingOrder();
                resetForm('#orderEdit');
            }
        }
    });
}

function DeleteOrder(delData) {
    $('#order_delete').on('shown.bs.modal', function () {
        $("#yes_delete").click(function () {
            var dataString = "queryfor=DeleteOrder&oid=" + delData + "&status=D";
            $.ajax({
                type: 'POST',
                url: "config/common.php",
                data: dataString,
                success: function (response) {
                    $('#order_delete').modal('hide');
                    var res = JSON.parse(response.trim());
                    notifyMsg(res.code, res.msg);
                    if (delData.type == "upcoming") {
                        UpcomingOrder();
                    } else if (delData.type == "pending") {
                        PendingOrder();
                    }
                }
            });
        });
        $(this).off('shown.bs.modal');
    });
}

function ItemList() {
    var dataString = "queryfor=GetItemsData";
    $.ajax({
        type: 'GET',
        url: "config/common.php",
        data: dataString,
        success: function (response) {
            var res = JSON.parse(response.trim());
            $.each(res, function (key, value) {
                $("#citems").append($("<option data-price=" + value.price + "></option>").val(value.itid).html(value.name));
            });
        }
    });
}

function CheckUser() {
    if ($("[name='ccontact']").valid()) {
        var queryfor, contact;

        contact = $('#ccontact').val();
        queryfor = "CheckUserExist";

        var dataString = "queryfor=" + queryfor + "&contact=" + contact + "&type=customer";
        $.ajax({
            type: 'POST',
            url: "config/common.php",
            data: dataString,
            success: function (response) {
                var res = JSON.parse(response.trim());
                if (res.length > 0) {
                    if (res[0].status == 'D') {
                        usrStatus = 'D';
                        notifyMsg('error', 'User Exist and Disabled. Enable it first!');
                    } else {
                        $('#cfname').val(res[0].fname);
                        $('#clname').val(res[0].lname);
                        $('#cemail').val(res[0].email);
                        orderCid = res[0].cid;
                        $('.usrtxt').prop('disabled', true);
                        notifyMsg('success', 'User Exist Already!');
                    }
                } else {
                    $('#cfname').val('');
                    $('#clname').val('');
                    $('#cemail').val('');
                    orderCid = "";
                    notifyMsg(res.code, res.msg);
                    $('.usrtxt').prop('disabled', false);
                }
            }
        });
    }
}

function CreateNewOrder() {

    if (usrStatus == 'D') {
        notifyMsg('error', 'User Exist and Disabled. Enable it first!');
    } else {
        if ($("#orderfrm").data('validator').form()) {
            var cid, queryfor, fname, lname, contact, email, items, deldate, totalamt, paidamt, balamt;
            fname = $('#cfname').val();
            lname = $('#clname').val();
            contact = $('#ccontact').val();
            email = $('#cemail').val();
            items = $('#citems').val();
            deldate = moment($('#cdeldate').val()).format("YYYY-MM-DD");
            totalamt = $('#ctotalamt').val();
            paidamt = $('#cpaidamt').val();
            balamt = $('#cbalamt').val();

            if (orderCid) {
                cid = orderCid;
                queryfor = "CreateOrder";
                var dataString = "queryfor=" + queryfor + "&cid=" + cid + "&items=" + items + "&deldate=" + deldate + "&totalamt=" + totalamt + "&paidamt=" + paidamt + "&balamt=" + balamt;
                $.ajax({
                    type: 'POST',
                    url: "config/common.php",
                    data: dataString,
                    success: function (response) {
                        var res = JSON.parse(response.trim());
                        notifyMsg(res.code, res.msg);
                        resetForm('#orderfrm');
                    }
                });
            } else {

                queryfor = "InsertCustomer";
                var dataString = "queryfor=" + queryfor + "&fname=" + fname + "&lname=" + lname + "&contact=" + contact + "&email=" + email;
                $.ajax({
                    type: 'POST',
                    url: "config/common.php",
                    data: dataString,
                    success: function (response) {
                        var res = JSON.parse(response.trim());
                        queryfor = "GetCustomerContact";
                        var dataString = "queryfor=" + queryfor + "&contact=" + contact;
                        $.ajax({
                            type: 'POST',
                            url: "config/common.php",
                            data: dataString,
                            success: function (response) {
                                var res = JSON.parse(response.trim());
                                cid = res[0].cid;
                                queryfor = "CreateOrder";
                                var dataString = "queryfor=" + queryfor + "&cid=" + cid + "&items=" + items + "&deldate=" + deldate + "&totalamt=" + totalamt + "&paidamt=" + paidamt + "&balamt=" + balamt;
                                $.ajax({
                                    type: 'POST',
                                    url: "config/common.php",
                                    data: dataString,
                                    success: function (response) {
                                        var res = JSON.parse(response.trim());
                                        notifyMsg(res.code, res.msg);
                                        resetForm('#orderfrm');
                                    }
                                });
                            }
                        });
                    }
                });
            }

        }
    }




}
