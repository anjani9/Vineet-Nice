

$(function () {

    //$.get("components/header.html", function (response) {
    //    $('.navbar-inverse').html(response);
    //});

    //$.get("components/sidebar.html", function (response) {
    //    $('.sidebar-main').html(response);
    //});

    //$.get("components/footer.html", function (response) {
    //    $('.footer-section').html(response);
    //});

    $("#aLogout").on("click", function () {
        localStorage.clear();
        window.location.href = "index.html";
    });
});

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
    // ---------------------------------------------------//

    $
        .validator
        .addClassRules("text", {
            required: true,
            alphaonly: true
        });

    $
        .validator
        .addClassRules("textButNotRequired", { alphaonly: true });

    $
        .validator
        .addClassRules("number", {
            required: true,
            numeric: true
        });


    $
        .validator
        .addClassRules("decimal_Numeric", { decimalNumeric: 'optional' });

    $
        .validator
        .addClassRules("email", {
            required: true,
            email: true
        });

    $
        .validator
        .addClassRules("alphanum", {
            required: true,
            alphanumeric: true
        });

  

  

    $
        .validator
        .addClassRules("new_password", {
            required: true,
            password1: true
        });

    $
        .validator
        .addClassRules("confirm_password", {
            required: true,
            equalTo: "#txtNewPassword"
        });

    $
        .validator
        .addClassRules("phone", {
            required: true,
            phone_number: true
        });

    $
        .validator
        .addClassRules("zip", {
            required: true,
            zipcode: true
        });



    // ---------------------------------------   Rule Methods
    // ---------------------------------------------------// ----- For IPV4 & IPV6


    $
        .validator
        .addMethod("domainname", function (value, element, param) {
            var qualified_domain = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
            if (param === 'optional') {
                return this.optional(element) || value.match(qualified_domain);
            } else {
                return value.match(qualified_domain);
            }
        }, 'Please Enter Valid Domain Name');

    // ----- For Domain name / IP Fields
    $
        .validator
        .addMethod("domainname_ip", function (value, element, param) {
            var ip = /^(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{2}|[0-9])(\.(25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{2}|[0-9])){3}$/;
            var simple_domain = /^[a-zA-Z0-9]+[a-zA-Z0-9-]*[a-zA-Z0-9]+$/;
            var qualified_domain = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
            if (param === 'optional') {
                return (this.optional(element) || value.match(ip) || value.match(simple_domain) || value.match(qualified_domain)) && value.length <= 64;
            } else {
                return (value.match(ip) || value.match(simple_domain) || value.match(qualified_domain)) && value.length <= 64;
            }
        }, 'Please Enter Correct Format of Either Domain Name or IP');

    // ----- For Multiple IP's and Domain name's.
    $
        .validator
        .addMethod('domainnames_ips', function (value, element, param) {
            var ips = /^\*$|^(?:\d|1?\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d|1?\d\d|2[0-4]\d|25[0-5])){3}(?:\s*,\s*(?:\d|1?\d\d|2[0-4]\d|25[0-5])(?:\.(?:\d|1?\d\d|2[0-4]\d|25[0-5])){3})*$/;
            var simple_domains = /^([a-zA-Z0-9]+[a-zA-Z0-9-]*[a-zA-Z0-9]|,(?!,|$)){1,}$/;
            var qualified_domains = /^(([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}|,(?!,|$)){1,}$/;
            if (param === 'optional') {
                return this.optional(element) || value.match(ips) || value.match(simple_domains) || value.match(qualified_domains);
            } else {
                return value.match(ips) || value.match(simple_domains) || value.match(qualified_domains);
            }
        }, 'Please Enter Correct Format of Either Domain Names or IPs');

    // ----- For Simple & Qualified hostname
    $
        .validator
        .addMethod('hostname', function (value, element, param) {
            var simple_domain = /^[a-zA-Z0-9]+[a-zA-Z0-9-]*[a-zA-Z0-9]+$/;
            var qualified_domain = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
            if (param === 'optional') {
                return (this.optional(element) || value.match(simple_domain) || value.match(qualified_domain)) && value.length() <= 64;
            } else {
                return (value.match(simple_domain) || value.match(qualified_domain)) && value.length <= 32;
            }
        }, 'Please Enter Proper Hostname');

    // ----- For Alphanumeric Only.
    $
        .validator
        .addMethod('alphanumeric', function (value, element, param) {
            var alphanum = /^[a-zA-Z0-9]*$/;
            if (param === 'optional') {
                return (this.optional(element) || value.match(alphanum)) && value.length() <= 64;
            } else {
                return (value.match(alphanum) && value.length <= 64);
            }
        }, 'Only Alphabets and Numbers are allowed');

    // ----- For Alphanumeric & Special Characters
    $
        .validator
        .addMethod('alphanumeric_special', function (value, element, param) {
            var alphanum_special = /^[ a-zA-Z0-9!"@#$%&()*\+,.':\/;\[\\\]\^_`-]+$/;
            if (param === 'optional') {
                return this.optional(element) || value.match(alphanum_special);
            } else {
                return value.match(alphanum_special);
            }
        }, 'Only Alphabets,Numbers & Special Characters are allowed');

    // ----- For Alphabets only with spaces
    $
        .validator
        .addMethod("alphaonly", function (value, element, param) {
            var alpha = /^[a-zA-Z ]*$/;
            if (param === 'optional') {
                return this.optional(element) || value.match(alpha);
            } else {
                return value.match(alpha);
            }
        }, 'Please Enter Alphabets Only');

    // ----- For Number only with spaces
    $
        .validator
        .addMethod('numeric', function (value, element, param) {
            var number = /^[0-9]+$/;
            if (param === 'optional') {
                return this.optional(element) || value.match(number);
            } else {
                return value.match(number);
            }
        }, 'Please Enter Numbers Only');

    // ----- For Number only with spaces greater than zero
    $
        .validator
        .addMethod('nozeronumber', function (value, element, param) {
            var number = /^(?=.*[1-9])[0-9,]+$/;
            if (param === 'optional') {
                return this.optional(element) || value.match(number);
            } else {
                return value.match(number);
            }
        }, 'Please Enter Numbers Greater Than Zero');

    // ----- For Number only with separater
    $
        .validator
        .addMethod('numericwithseparater', function (value, element, param) {
            var number = /^[0-9,]+$/;
            if (param === 'optional') {
                return this.optional(element) || value.match(number);
            } else {
                if (typeof (value) === "boolean")
                    return "0";

                return value.match(number);
            }
        }, 'Please Enter Positive Numbers Only');

    // ----- For decimal number
    $
        .validator
        .addMethod('decimalNumeric', function (value, element, param) {
            var number = /^\d+(\.\d{1,3})?$/;
            if (param === 'optional') {

                return this.optional(element) || value.match(number);
            } else {
                if (typeof (value) === "boolean")
                    return "0";

                return value.match(number);
            }
        }, 'Please Enter Positive Numbers Only');

    // ----- For Port only with 5 maxlength
    $
        .validator
        .addMethod('port', function (value, element, param) {
            var port = /^([0-9]){0,5}$/;
            var val = parseInt(value, 10);
            if (param === 'optional') {
                return (this.optional(element) || value.match(port)) && (val <= port_range && val > 0);
            } else {
                return value.match(port) && (val <= port_range && val > 0);
            }
        }, 'Please Enter Proper Port Number');

    // ----- For Phone Number ('+' (is also optional) followed by 15 digits, spaces
    // are optional and minimum 10 digits - maximum 15 digits.)
    $
        .validator
        .addMethod('phone_number', function (value, element, param) {
            var phonenumber = /^\+?([0-9][ ]*){10,15}$/;
            if (param === 'optional') {
                return this.optional(element) || value.match(phonenumber);
            } else {
                return value.match(phonenumber);
            }
        }, 'Please Enter Valid Phone Number');

    // ----- For Phone Number ('+' (is also optional) followed by 15 digits spaces
    // optional and minimum 10 digits - maximum 15 digits.)
    $
        .validator
        .addMethod('fax', function (value, element, param) {
            var faxnumber = /^\+?([0-9][ ]*){10,15}$/;
            if (param === 'optional') {
                return this.optional(element) || value.match(faxnumber);
            } else {
                return value.match(faxnumber);
            }
        }, 'Please Enter Valid Fax Number');

    // ----- For ZipCode (Alphabet with Number maximum 20 digits No spaces)
    $
        .validator
        .addMethod('zipcode', function (value, element, param) {
            var zip = /^([a-zA-Z0-9]){5,20}$/;
            if (param === 'optional') {
                return this.optional(element) || value.match(zip);
            } else {
                return value.match(zip);
            }
        }, 'Please Enter Valid Zipcode');

    // ----- For Email (Case Sensitive accept only small Letter.)
    $
        .validator
        .addMethod('email', function (value, element, param) {
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
    $
        .validator
        .addMethod('password1', function (value, element, param) {
            var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[=~!{|<>?}"@#$%&()*\+,.':\/;\[\\\]\^_`-])[A-Za-z\d=~!{|<>?}"@#$%&()*\+,.':\/;\[\\\]\^_`-]{8,32}$/;
            if (param === 'optional') {
                return this.optional(element) || value.match(pass);
            } else {
                return value.match(pass);
            }
        }, 'Please Enter Correct Password Format');

    // ----- For Password2 (The password is limited to 31 alphanumerical characters
    // plus the following characters: +, -, _, *, @)
    $
        .validator
        .addMethod('password2', function (value, element, param) {
            var pass = /^[a-zA-Z0-9@*+_-]{0,31}$/;
            if (param === 'optional') {
                return this.optional(element) || value.match(pass);
            } else {
                return value.match(pass);
            }
        }, 'Please Enter Correct Password Format');

    // ----- For validating SSN
    $
        .validator
        .addMethod('ssn', function (value, element, param) {
            // var number =
            // /^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}
            // $/;
            var number = /^\d{3}-\d{2}-\d{4}$/;
            if (param === 'optional') {
                return this.optional(element) || value.match(number);
            } else {
                return value.match(number);
            }
        }, 'Invalid SSN');

}

function Validation() {
    Validate();
    Validator();
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function delete_cookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

function notifyMsg(msgType, message) {
    //console.log("Notify");
    noty({
        width: 4000,
        text: message,
        type: 'ui-pnotify-shadow alert-' + msgType,
        dismissQueue: true,
        timeout: 2000,
        layout: 'center',
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
        }
    });
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

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function resetMultiSelect(){
    $('.multiselect-select-all option:selected').each(function() {
        $(this).prop('selected', false);
    })
    $('.multiselect-select-all').multiselect('refresh');
    $.uniform.update();
}
function resetMultiSelectPeriodicity(){
    $("#filter_type").find('option').attr("selected",false) ;
    $('#filter_type').parent().find('.multiselect-selected-text').text("Select Periodicity")
}
//To delete all the Cookie and the localStorage data
function deleteAllCookieAndStorageContent() {
    delete_cookie("connect.sid");
    localStorage.clear();
}

//Form Validation
function formValidateCheck(formName) {
    var formValidationState = $("#" + formName)
        .data('validator')
        .form();
    return formValidationState;
}



