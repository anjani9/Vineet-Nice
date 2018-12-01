




$(function () {
    var ignore = ["index.html", ""];
    page = window.location.pathname.split("/");
    page = page[page.length - 1];
    if (ignore.indexOf(page) < 0) {
        checksession();
    }

});


function checksession() {
    if (!localStorage.getItem("Admin")) {
        window.location.href = "index.html?sessiontimeout=0";
    }
    else {
        $('#adminname').text(localStorage.getItem("Admin"));
        return true;
    }
}


function Validate() {
    $('form')
        .each(function () {
            var validator = $(this).validate({
                ignore: 'input[type=hidden], .select2-input',
                highlight: function (element) {
                    $(element)
                        .closest('.form-group')
                        .addClass('has-error');
                },
                unhighlight: function (element) {
                    $(element)
                        .closest('.form-group')
                        .removeClass('has-error');
                    $(element)
                        .closest('.form-group')
                        .find('.help-block')
                        .hide();
                },
                errorElement: 'span',
                errorClass: 'help-block',
                errorPlacement: function (error, element) {

                    if (element.parents('div').hasClass("checker") || element.parents('div').hasClass("choice") || element.parent().hasClass('bootstrap-switch-container')) {
                        if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
                            error.appendTo(element.parent().parent().parent().parent());
                        } else {
                            error.appendTo(element.parent().parent().parent().parent().parent());
                        }
                    } else if (element.parents('div').hasClass('checkbox') || element.parents('div').hasClass('radio')) {
                        error.appendTo(element.parent().parent().parent());
                    } else if (element.parents('div').hasClass('has-feedback')) {
                        error.appendTo(element.parent());
                    } else if (element.parents('div').hasClass('multi-select-full')) {
                        error.insertAfter(element.parent());
                    } else if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
                        error.insertAfter(element.parent().parent());
                    } else if (element.parent().hasClass('uploader') || element.parents().hasClass('input-group')) {
                        error.appendTo(element.parent().parent());
                    } else {
                        error.insertAfter(element);
                    }
                },
                successClass: 'validation-valid-label',
                validClass: "validation-valid-label",
                success: function (element) {
                    $(element)
                        .closest('.form-group')
                        .removeClass('has-error');
                    $(element)
                        .closest('.form-group')
                        .find('.help-block')
                        .hide()
                }
            });
        });
}

function Validator() {
    $.validator.prototype.elements = function () {
        var validator = this,
            rulesCache = {};
        return $([])
            .add(this.currentForm.elements)
            .filter(":input")
            .not(":submit, :reset, :image, [disabled]")
            .not(this.settings.ignore)
            .filter(function () {
                var elementIdentification = this.id || this.name;
                !elementIdentification && validator.settings.debug && window.console && console.error("%o has no id nor name assigned", this);
                if (elementIdentification in rulesCache || !validator.objectLength($(this).rules()))
                    return false;
                rulesCache[elementIdentification] = true;
                return true;
            });
    };

    // ---------------------------------------   Rule Class

    $.validator.addClassRules("text", {
        required: true,
        alphaonly: true
    });

    $.validator.addClassRules("textButNotRequired", {
        alphaonly: true
    });

    $.validator.addClassRules("number", {
        required: true,
        numeric: true
    });

    $.validator.addClassRules("email", {
        required: 'optional',
        email: true
    });

    $.validator.addClassRules("alphanum", {
        required: true,
        alphanumeric: true
    });

    $.validator.addClassRules("new_password", {
        required: true,
        alphanumeric: true
    });

    $.validator.addClassRules("confirm_password", {
        required: true,
        equalTo: "#cupassword"
    });

    $.validator.addClassRules("password", {
        required: true,
        alphanumeric: true
    });

    $.validator.addClassRules("cpassword", {
        required: true,
        equalTo: "#epassword"
    });

    $.validator.addClassRules("phone", {
        required: true,
        phone_number: true
    });

    $.validator.addClassRules("zip", {
        required: true,
        zipcode: true
    });


    // ---------------------------------------   Rule Methods

    // ----- For Alphanumeric Only.
    $.validator.addMethod('alphanumeric', function (value, element, param) {
        var alphanum = /^[a-zA-Z0-9]*$/;
        if (param === 'optional') {
            return (this.optional(element) || value.match(alphanum)) && value.length() <= 64;
        } else {
            return (value.match(alphanum) && value.length <= 64);
        }
    }, 'Only Alphabets and Numbers are allowed');

    // ----- For Alphanumeric & Special Characters
    $.validator.addMethod('alphanumeric_special', function (value, element, param) {
        var alphanum_special = /^[ a-zA-Z0-9!"@#$%&()*\+,.':\/;\[\\\]\^_`-]+$/;
        if (param === 'optional') {
            return this.optional(element) || value.match(alphanum_special);
        } else {
            return value.match(alphanum_special);
        }
    }, 'Only Alphabets,Numbers & Special Characters are allowed');

    // ----- For Alphabets only with spaces
    $.validator.addMethod("alphaonly", function (value, element, param) {
        var alpha = /^[a-zA-Z ]*$/;
        if (param === 'optional') {
            return this.optional(element) || value.match(alpha);
        } else {
            return value.match(alpha);
        }
    }, 'Please Enter Alphabets Only');

    // ----- For Number only with spaces
    $.validator.addMethod('numeric', function (value, element, param) {
        var number = /^[0-9]+$/;
        if (param === 'optional') {
            return this.optional(element) || value.match(number);
        } else {
            return value.match(number);
        }
    }, 'Please Enter Numbers Only');

    // ----- For Phone Number ('+' (is also optional) followed by 15 digits, spaces
    // are optional and minimum 10 digits - maximum 15 digits.)
    $.validator.addMethod('phone_number', function (value, element, param) {
        var phonenumber = /^\+?([0-9][ ]*){10,15}$/;
        if (param === 'optional') {
            return this.optional(element) || value.match(phonenumber);
        } else {
            return value.match(phonenumber);
        }
    }, 'Please Enter Valid Phone Number');

    // ----- For Phone Number ('+' (is also optional) followed by 15 digits spaces
    // optional and minimum 10 digits - maximum 15 digits.)
    $.validator.addMethod('fax', function (value, element, param) {
        var faxnumber = /^\+?([0-9][ ]*){10,15}$/;
        if (param === 'optional') {
            return this.optional(element) || value.match(faxnumber);
        } else {
            return value.match(faxnumber);
        }
    }, 'Please Enter Valid Fax Number');

    // ----- For ZipCode (Alphabet with Number maximum 20 digits No spaces)
    $.validator.addMethod('zipcode', function (value, element, param) {
        var zip = /^([a-zA-Z0-9]){5,20}$/;
        if (param === 'optional') {
            return this.optional(element) || value.match(zip);
        } else {
            return value.match(zip);
        }
    }, 'Please Enter Valid Zipcode');

    // ----- For Email (Case Sensitive accept only small Letter.)
    $.validator.addMethod('email', function (value, element, param) {
        var emailid = /^[A-Za-z0-9]+([._\+\-]?[A-Za-z0-9])*@[A-Za-z0-9]+([-]?[A-Za-z0-9])*([.][A-Za-z]{1,})+$/;
        if (param === 'optional') {
            return this.optional(element) || value.match(emailid);
        } else {
            return value.match(emailid);
        }
    }, 'Please Enter Valid Email Address');

    // ----- For Password1 (Passwords must be 8-32 characters in length, and contain
    // at least 1 uppercase, 1 lowercase letter, 1 digit, and 1 non-alphanumeric
    // character)
    $.validator.addMethod('password1', function (value, element, param) {
        var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[=~!{|<>?}"@#$%&()*\+,.':\/;\[\\\]\^_`-])[A-Za-z\d=~!{|<>?}"@#$%&()*\+,.':\/;\[\\\]\^_`-]{8,32}$/;
        if (param === 'optional') {
            return this.optional(element) || value.match(pass);
        } else {
            return value.match(pass);
        }
    }, 'Please Enter Correct Password Format');

    // ----- For Password2 (The password is limited to 31 alphanumerical characters
    // plus the following characters: +, -, _, *, @)
    $.validator.addMethod('password2', function (value, element, param) {
        var pass = /^[a-zA-Z0-9@*+_-]{0,31}$/;
        if (param === 'optional') {
            return this.optional(element) || value.match(pass);
        } else {
            return value.match(pass);
        }
    }, 'Please Enter Correct Password Format');


}

function resetForm(formID) {

    $(formID).each(function (index, form) {

        $(':text').val('');
        $(".select-search").select2('val', '0');
        //$(".multiselect-full-featured").multiselect("clearSelection");

        //$('input[type=radio], input[type=checkbox]').prop('checked', function () {
        //    return this.getAttribute('checked') == 'checked';
        //});

        var validator = $("form").validate();
        validator.resetForm();

    });
}

function initializeDatatable() {

    // Setting datatable defaults
    $.extend($.fn.dataTable.defaults, {
        autoWidth: false,
        columnDefs: [{
            orderable: false,
            width: '100px',
            targets: [5]
        }],
        dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
        language: {
            search: '<span>Filter:</span> _INPUT_',
            searchPlaceholder: 'Type to filter...',
            lengthMenu: '<span>Show:</span> _MENU_',
            paginate: { 'first': 'First', 'last': 'Last', 'next': '&rarr;', 'previous': '&larr;' }
        },
        drawCallback: function () {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').addClass('dropup');
        },
        preDrawCallback: function () {
            $(this).find('tbody tr').slice(-3).find('.dropdown, .btn-group').removeClass('dropup');
        }
    });

    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });
}


function Validation() {
    Validate();
    Validator();
}

function notifyMsg(msgType, message, confirm) {
    var self = this;
    self.dfd = $.Deferred();
    var notification = noty({
        width: 4000,
        text: message,
        type: msgType,
        dismissQueue: true,
        timeout: 2000,
        layout: "center",
        killer: true,
        animation: {
            open: {
                height: 'toggle'
            },
            close: {
                height: 'toggle'
            },
            easing: 'swing',
            speed: 0
        },
        buttons: (confirm != 'confirm') ? false : [
            {
                addClass: 'btn btn-primary btn-xs',
                text: 'Ok',
                onClick: function ($noty) { //this = button element, $noty = $noty element
                    $noty.close();
                    self.dfd.resolve(true);
                }
            },
            {
                addClass: 'btn btn-danger btn-xs',
                text: 'Cancel',
                onClick: function ($noty) {
                    $noty.close();
                    self.dfd.resolve(false);
                }
            }
        ]
    });
    return self.dfd.promise();
}

function blockMyUI(message) {
    $(".pageContent").block({
        message: '<span class="text-semibold"><i class="icon-fontello-spinner2 position-left"></i>' +
            '&nbsp;' + message + '</span>',
        overlayCSS: {
            backgroundColor: '#1b2024',
            opacity: 0.5,
            cursor: 'wait'
        },
        css: {
            border: 0,
            padding: '10px 15px',
            color: '#fff',
            width: 'auto',
            '-webkit-border-radius': 2,
            '-moz-border-radius': 2,
            backgroundColor: '#333',
            top: '45%',
            left: '45%'
        }
    });
}

function unblockMyUI() {
    $(".pageContent").unblock();
    // $.unblockUI();
}

function formValidateCheck(formName) {
    var formValidationState = $("#" + formName)
        .data('validator')
        .form();
    return formValidationState;
}