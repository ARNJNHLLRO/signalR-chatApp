$(document).ready(function () {
    InitLoginComponents();
});

//Initializes the events of the login page components
function InitLoginComponents() {
    $('#txtUsername').onEnter(function () {
        $('#txtPassword').focus();
    });

    $('#txtPassword').onEnter(function () {
        $('#btnLogin').click();
    });

    //Checks if caps lock is turned on
    $('#txtPassword').keypress(function (e) {
        var s = String.fromCharCode(e.which);
        if ((s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey) || (s.toUpperCase() !== s && s.toLowerCase() === s && e.shiftKey)) {
            $('#txtPassword').closest('.form-group').addClass('caps-on');
        } else if ((s.toLowerCase() === s && s.toUpperCase() !== s && !e.shiftKey) || (s.toLowerCase() !== s && s.toUpperCase() === s && e.shiftKey)) {
            $('#txtPassword').closest('.form-group').removeClass('caps-on');
        }
    });

    $('#txtPassword').blur(function () {
        $('#txtPassword').closest('.form-group').removeClass('caps-on');
    });

    $('#btnLogin').unbind().click(function () {
        ToggleLoading();
    });
}