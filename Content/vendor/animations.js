$(document).ready(function () {
    var enableTooltip = function () {
        $('.sidebar-menu, .sidebar-link, .sidebar-submenu').tooltip('enable');
    };

    var disableTooltip = function () {
        $('.sidebar-menu, .sidebar-link, .sidebar-submenu').tooltip('disable');
    };

    var openSidebar = function () {
        $('.sidebar-container').addClass('open');
        $('.sidebar-toggle').find('i.fa').removeClass('fa-bars');
        $('.sidebar-toggle').find('i.fa').addClass('fa-chevron-left');
        disableTooltip();
    };

    var collapseSidebar = function () {
        $('.sidebar-container').removeClass('open');
        $('.sidebar-toggle').find('i.fa').removeClass('fa-chevron-left');
        $('.sidebar-toggle').find('i.fa').addClass('fa-bars');
        setTimeout(function () {
            enableTooltip();
        }, 300);
    };

    enableTooltip();

    $('.sidebar-toggle').click(function () {
        if (!$('.sidebar-container').hasClass('open')) {
            openSidebar();
        } else {
            collapseSidebar();
        }
    });

    $('.sidebar-overlay').click(function () {
        collapseSidebar();
    });

    $('.sidebar-menu.sidebar-menu-dropdown').click(function () {
        $(this).toggleClass('active');
    });

    $('.dropdown').on('show.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });

    $('.dropdown').on('hide.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
    });

    $('#txtUsername, #txtPassword').off('focus').on('focus', function () {
        $(this).closest('.form-group').toggleClass('focused');
    }).off('blur').on('blur', function () {
        $(this).closest('.form-group').toggleClass('focused');
    });
});