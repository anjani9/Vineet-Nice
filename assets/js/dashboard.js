

$(function () {

    initializeDatatable();

    $('.emp_select').select2();

    $(".styled, .multiselect-container input").uniform({
        radioClass: 'choice'
    });

    TodayOrder();
    EmployeeList();

    $("#aLogout").on("click", function () {
        localStorage.clear();
        window.location.href = "index.html";
    });

    TotalIncome();
    //  TotalExpense();
    TrendingItems();
    InventoryWatch();

});


function TotalIncome() {
    var dataString = "queryfor=TotalIncome";
    $.ajax({
        type: 'GET',
        url: "config/common.php",
        data: dataString,
        success: function (response) {
            var res = JSON.parse(response.trim());
            $('#incomecnt').text(res[0].income);
        }
    });
}

function TotalExpense() {
    var dataString = "queryfor=TotalExpense";
    $.ajax({
        type: 'GET',
        url: "config/common.php",
        data: dataString,
        success: function (response) {
            var res = JSON.parse(response.trim());
            $('#expensecnt').text(res[0].income);
        }
    });
}

function TrendingItems() {
    var dataString = "queryfor=TrendingItems";
    $.ajax({
        type: 'GET',
        url: "config/common.php",
        data: dataString,
        success: function (response) {
            var res = JSON.parse(response.trim());
            var dataString = "queryfor=ItemName" + "&itemid=" + res[0].items;
            $.ajax({
                type: 'POST',
                url: "config/common.php",
                data: dataString,
                success: function (response) {
                    var res = JSON.parse(response.trim());
                    $('#trendingitem').text(res[0].name);
                }
            });
        }
    });
}

function InventoryWatch() {
    var dataString = "queryfor=InventoryWatch";
    $.ajax({
        type: 'GET',
        url: "config/common.php",
        data: dataString,
        success: function (response) {
            var res = JSON.parse(response.trim());
            $('#inventorycnt').text(res[0].name + ' - ' + res[0].qty);
        }
    });
}

function TodayOrder() {

    var dataString = "queryfor=GetTodayOrder";
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
                        itemname: value.itemname
                    });

                    actionbtn = "<ul class=\"icons-list\">" +
                                "<li data-toggle='modal' data-target='#order_view' data-popup='tooltip' title='View Order' onclick='ViewOrder(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-eye2'></i></a></li>" +
                                "<li data-toggle='modal' data-target='#order_edit' data-popup='tooltip' title='Edit Order' onclick='EditOrder(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-pencil7'></i></a></li>" +
                                "<li data-toggle='modal' data-target='#order_delete' data-popup='tooltip' title='Delete Order' onclick='DeleteOrder(" + value.oid + ");'><a href='#'><i class='icon-trash'></i></a></li>" +
                                "</ul>";
                    listdata[key].actionbtn = actionbtn;

                });
            }

            $('#todayOrder').dataTable({
                bDestroy: true,
                data: listdata,
                columnDefs: [{
                    targets: [4]
                }],
                columns: [
                    { data: "oid" },
                    { data: "customer" },
                    { data: "employee" },
                    { data: "contact" },
                    { data: "itemname" },
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
    update.oid = editData.oid;
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

    $("#updateorder").unbind('click');

    $("#chkpaid").unbind('change');

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
    var dataString = "queryfor=" + queryfor + "&oid=" + oid + "&empid=" + empid + "&status=" + status + "&totalamt=" + totalamt;
    $.ajax({
        type: 'POST',
        url: "config/common.php",
        data: dataString,
        success: function (response) {
            $('#order_edit').modal('hide');
            var res = JSON.parse(response.trim());
            notifyMsg(res.code, res.msg);
            TodayOrder();
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
                    TodayOrder();
                }
            });
        });
        $(this).off('shown.bs.modal');
    });
}