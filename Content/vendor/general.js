$(document).ready(function () {
    
});

//Toggles the loading animation
function ToggleLoading() {
    if ($('.loader-bg, .loader-wrapper').length === 0) {
        $('body').prepend('<div class="loader-bg"></div><div class="loader-wrapper"><div class="loader"></div ></div >');
        setTimeout(function () {
            $('.loader-wrapper, .loader-bg').addClass('show');
        }, 10);

        return 'Loading...';
    } else {
        $('.loader-wrapper, .loader-bg').removeClass('show');
        setTimeout(function () {
            $('.loader-wrapper, .loader-bg').remove();
        }, 200);

        return 'Loading has ended';
    }
}

function IsEmpty(value) {
    if (value === null || value.toString().toLowerCase() === 'null' || value === '' || value.toString().toLowerCase() === undefined) {
        return true;
    } else {
        return false;
    }
}


// Plugins
(function ($) {
    // On Enter function
    $.fn.onEnter = function (func) {
        this.bind('keypress', function (e) {
            if (e.keyCode == 13) func.apply(this, [e]);
        });
        return this;
    }

    // Dynamic Modal
    $.fn.DynamicModal = function (options) {
         
        // Default variable values
        var settings = $.extend({
            title: 'Dynamic Modal',
            size: 'medium',
            content: 'Sample Content',
            okButtonId: ''
        }, options);


        /* Generates the html content using the value of settings.content
        ------------------------------------------------------------*/

        /*----------------------------------------------------------*/


        // Adds the corresponding attributes into the element
        $(this).attr({
            'role': 'dialog',
            'tabindex': '-1',
            'class': 'modal fade'
        });


        /* Inserts the dynamic html content into the main element
        -------------------------------------------------------*/
        if (settings.size === 'small') {
            var htmlString = '<div class="modal-dialog  modal-sm" role="document">';
        } else if (settings.size === 'medium') {
            var htmlString = '<div class="modal-dialog  modal-md" role="document">';
        } else if (settings.size === 'large') {
            var htmlString = '<div class="modal-dialog  modal-lg" role="document">';
        } else {
            var htmlString = '<div class="modal-dialog  modal-md" role="document">';
        }

        htmlString += '<div class="modal-content">';
        htmlString += '<div class="modal-header">';
        htmlString += '<h5 class="modal-title" id="exampleModalLabel">' + settings.title + '</h5>';
        htmlString += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
        htmlString += '<span aria-hidden="true">&times;</span>';
        htmlString += '</button>';
        htmlString += '</div>';
        htmlString += '<div class="modal-body">' + settings.content;
        htmlString += '</div>';
        htmlString += '<div class="modal-footer">';
        htmlString += '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
        htmlString += '<button type="button" id="' + settings.okButtonId + '" class="btn btn-primary">Save changes</button>';
        htmlString += '</div>';
        htmlString += '</div>';
        htmlString += '</div>';
        htmlString += '</div>';

        $(this).html(htmlString);
        /*-----------------------------------------------------*/

        return this;
    }
})(jQuery);