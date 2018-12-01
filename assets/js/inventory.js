

$(function () {

    initializeDatatable();

    $(".styled, .multiselect-container input").uniform({
        radioClass: 'choice'
    });

    InventoryList();

    Validation();

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("data-tab") // activated tab
        if (target == "inventory") {
            InventoryList();
            resetForm('#inventoryfrm');
        }
    });

    $("#aLogout").on("click", function () {
        localStorage.clear();
        window.location.href = "index.html";
    });
});

function InventoryList() {

    var dataString = "queryfor=GetInventoryData";
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
                        inid: value.inid,
                        name: value.name,
                        qty: value.qty,
                        price: value.price,
                        status: value.status
                    });

                    actionbtn = "<ul class=\"icons-list\">" +
                                "<li data-toggle='modal' data-target='#inventory_view' data-popup='tooltip' title='View Inventory' onclick='ViewInventory(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-eye2'></i></a></li>" +
                                "<li data-toggle='modal' data-target='#inventory_edit' data-popup='tooltip' title='Edit Inventory' onclick='EditInventory(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-pencil7'></i></a></li>" +
                                "<li data-toggle='modal' data-target='#inventory_delete' data-popup='tooltip' title='Delete Inventory' onclick='DeleteInventory(" + value.inid + ");'><a href='#'><i class='icon-trash'></i></a></li>" +
                                "</ul>";
                    listdata[key].actionbtn = actionbtn;

                });
            }

            $('#inventoryList').dataTable({
                bDestroy: true,
                data: listdata,
                columnDefs: [{
                    targets: [4]
                }],
                columns: [
                    { data: "name" },
                    { data: "qty" },
                    { data: "price" },
                    {
                        "mData": "status",
                        "mRender": function (data, type, full) {
                            if (data == 'E') {
                                return '<span class="label label-success">Enabled</span>';
                            } else if (data == 'D') {
                                return '<span class="label label-danger">Disabled</span>';
                            }
                        }
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

function ResetInventory() {
    resetForm('#inventoryfrm');
}

function CreateNewInventory() {
    if ($("#inventoryfrm").data('validator').form()) {
        var queryfor, name, price;

        name = $('#cinventoryname').val();
        qty = $('#cinventoryqty').val();
        price = $('#cinventoryprice').val();
        queryfor = "InsertInventory";

        var dataString = "queryfor=" + queryfor + "&name=" + name + "&qty=" + qty + "&price=" + price;

        $.ajax({
            type: 'POST',
            url: "config/common.php",
            data: dataString,
            success: function (response) {
                var res = JSON.parse(response.trim());
                notifyMsg(res.code, res.msg);
                resetForm('#inventoryfrm');
            }
        });

    }
}

function ViewInventory(viewData) {
    $('#inventory_view').on('shown.bs.modal', function () {
        $('#vinventory_name').val(viewData.name);
        $('#vinventory_qty').val(viewData.qty);
        $('#vinventory_price').val(viewData.price);
        $(this).off('shown.bs.modal');
    });
}

function EditInventory(editData) {

    var update = {};
    update.inid = editData.inid;

    $('#inventory_edit').on('shown.bs.modal', function () {

        $('#einventoryname').val(editData.name);
        $('#einventoryqty').val(editData.qty);
        $('#einventoryprice').val(editData.price);

        if (editData.status == 'E') {
            $('#chkenabled').prop('checked', true).uniform('refresh');
        } else {
            $('#chkenabled').prop('checked', false).uniform('refresh');
        }

        $(this).off('shown.bs.modal');

    });

    $("#updateinventory").unbind('click');
    $("#updateinventory").click(function () {
        update.name = $('#einventoryname').val();
        update.qty = $('#einventoryqty').val();
        update.price = $('#einventoryprice').val();
        update.status = $('#chkenabled').is(":checked") ? 'E' : 'D';
        UpdateInventory(update);
    });
}

function UpdateInventory(updateData) {
    var queryfor = "Updatinventory";
    var inid = updateData.inid;
    var name = updateData.name;
    var qty = updateData.qty;
    var price = updateData.price;
    var status = updateData.status;
    var dataString = "queryfor=" + queryfor + "&inid=" + inid + "&name=" + name + "&qty=" + qty + "&price=" + price + "&status=" + status;
    $.ajax({
        type: 'POST',
        url: "config/common.php",
        data: dataString,
        success: function (response) {
            $('#inventory_edit').modal('hide');
            var res = JSON.parse(response.trim());
            notifyMsg(res.code, res.msg);
            InventoryList();
        }
    });
}

function DeleteInventory(delData) {
    $('#inventory_delete').on('shown.bs.modal', function () {
        $("#yes_delete").click(function () {
            var dataString = "queryfor=Deleteinventory&inid=" + delData;
            $.ajax({
                type: 'POST',
                url: "config/common.php",
                data: dataString,
                success: function (response) {
                    $('#inventory_delete').modal('hide');
                    var res = JSON.parse(response.trim());
                    notifyMsg(res.code, res.msg);
                    InventoryList();
                }
            });
        });
        $(this).off('shown.bs.modal');
    });
}