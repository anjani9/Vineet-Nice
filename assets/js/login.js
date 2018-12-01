

$(function () {
    $('.styled').uniform();

    Validation();


    $("#loginfrm").submit(function (e) {
        e.preventDefault();
		
		window.location = "dashboard.html";
		localStorage.setItem("Admin", "Vineet");
		return;
						
        if ($("#loginfrm").data('validator').form()) {

            var queryfor = "Login";
            var username = $('#uname').val();
            var password = $('#upass').val();

           var dataString = "queryfor=" + queryfor + "&username=" + username + "&password=" + password;

            $.ajax({
                method: "POST",
                url: "config/common.php",
                data: dataString,
                success: function (response) {
                    var res = JSON.parse(response.trim());
                    if (res.length > 0) {
                        window.location = "dashboard.html";
                        localStorage.setItem("Admin", res[0].fname);
                    } else {
                        console.log("error");
                        notifyMsg("error", "No User Found")
                    }
                },
                error: function (err) {
                    notifyMsg("error", "No User Found")
                }
            });
        }
    });


});


