

$(function () {

    initializeDatatable();

    $(".styled, .multiselect-container input").uniform({
        radioClass: 'choice'
    });

    ItemList();

    Validation();

    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("data-tab") // activated tab
        if (target == "item") {
            ItemList();
            resetForm('#itemfrm');
        }
    });

    $("#aLogout").on("click", function () {
        localStorage.clear();
        window.location.href = "index.html";
    });

});

function ItemList() {

    var dataString = "queryfor=GetItemsData";
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
                        itid: value.itid,
                        name: value.name,
                        price: value.price,
                        status: value.status
                    });

                    actionbtn = "<ul class=\"icons-list\">" +
                                "<li data-toggle='modal' data-target='#item_view' data-popup='tooltip' title='View Item' onclick='ViewItems(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-eye2'></i></a></li>" +
                                "<li data-toggle='modal' data-target='#item_edit' data-popup='tooltip' title='Edit Item' onclick='EditItems(" + JSON.stringify(listdata[key]) + ");'><a href='#'><i class='icon-pencil7'></i></a></li>" +
                                "<li data-toggle='modal' data-target='#item_delete' data-popup='tooltip' title='Delete Item' onclick='DeleteItems(" + value.itid + ");'><a href='#'><i class='icon-trash'></i></a></li>" +
                                "</ul>";
                    listdata[key].actionbtn = actionbtn;

                });
            }

            $('#itemList').dataTable({
                bDestroy: true,
                data: listdata,
                columnDefs: [{
                    targets: [3]
                }],
                columns: [
                    { data: "name" },
                    { data: "price" },
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
                    { data: "actionbtn", sClass: "text-center", orderable: false }
                ]
            });
        },
        error: function (err) {
            notifyMsg("error", "Something Went Wrong!!")
        }
    });
}

function ResetItem() {
    resetForm('#itemfrm');
}

function CreateNewItem() {
    if ($("#itemfrm").data('validator').form()) {
        var queryfor, name, price;

        name = $('#citemname').val();
        price = $('#citemprice').val();
        queryfor = "InsertItems";

        var dataString = "queryfor=" + queryfor + "&name=" + name + "&price=" + price;

        $.ajax({
            type: 'POST',
            url: "config/common.php",
            data: dataString,
            success: function (response) {
                var res = JSON.parse(response.trim());
                notifyMsg(res.code, res.msg);
                resetForm('#itemfrm');
            }
        });

    }
}

function ViewItems(viewData) {

    $('#item_view').on('shown.bs.modal', function () {

        $('#vitem_name').val(viewData.itid);
        $('#vitem_price').val(viewData.price);
        $(this).off('shown.bs.modal');

    });

}

function EditItems(editData) {

    var update = {};
    update.itid = editData.itid;

    $('#item_edit').on('shown.bs.modal', function () {

        $('#eitemname').val(editData.name);
        $('#eitemprice').val(editData.price);

        if (editData.status == 'E') {
            $('#chkenabled').prop('checked', true).uniform('refresh');
        } else {
            $('#chkenabled').prop('checked', false).uniform('refresh');
        }

        $(this).off('shown.bs.modal');

    });

    $("#updateitem").unbind('click');
    $("#updateitem").click(function () {
        update.name = $('#eitemname').val();
        update.price = $('#eitemprice').val();
        update.status = $('#chkenabled').is(":checked") ? 'E' : 'D';
        UpdateItems(update);
    });
}

function UpdateItems(updateData) {
    var queryfor = "UpdatItems";
    var itid = updateData.itid;
    var name = updateData.name;
    var price = updateData.price;
    var status = updateData.status;
    var dataString = "queryfor=" + queryfor + "&itid=" + itid + "&name=" + name + "&price=" + price + "&status=" + status;
    $.ajax({
        type: 'POST',
        url: "config/common.php",
        data: dataString,
        success: function (response) {
            $('#item_edit').modal('hide');
            var res = JSON.parse(response.trim());
            notifyMsg(res.code, res.msg);
            ItemList();
        }
    });
}

function DeleteItems(delData) {
    $('#item_delete').on('shown.bs.modal', function () {
        $("#yes_delete").click(function () {
            var dataString = "queryfor=DeleteItems&itid=" + delData;
            $.ajax({
                type: 'POST',
                url: "config/common.php",
                data: dataString,
                success: function (response) {
                    $('#item_delete').modal('hide');
                    var res = JSON.parse(response.trim());
                    notifyMsg(res.code, res.msg);
                    ItemList();
                }
            });
        });
        $(this).off('shown.bs.modal');
    });
}