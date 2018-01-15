var seenInputs;

$(document).ready(function() {

    $("img.card").on("click", function() {
        $(this).siblings("button").click();
    });

    $(function() {
        $('[data-toggle="popover"]').popover();
    })

    $('#contact-form').validate({
        rules: {
            name: {
                required: true,
                lettersonly: true
            },
            contactNo: {
                required: true,
                digits: true,
            },
            email: {
                required: true,
                email: true
            },
            company: {
                required: true,
                letterswithbasicpunc: true
            },
            message: {
                required: true,
                letterswithbasicpunc: true
            }
        },
        messages: {
            name: {
                required: 'Please enter your name.',
                lettersonly: 'Invalid name.'
            },
            contactNo: {
                required: 'Please indicate a contact number.',
                digits: 'Please enter digits only.'
            },
            email: 'Please enter a valid email address.',
            company: {
                required: 'Please indicate the company that you are associated with.',
                letterswithbasicpunc: 'Please avoid special characters.'
            },
            message: {
                required: 'Please enter a message.',
                letterswithbasicpunc: 'Please avoid special characters.'
            }
        },
        errorElement: 'div',
        errorPlacement: function(error, element) {
            error.addClass('invalid-feedback');
            error.insertAfter(element);
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            $.ajax({
                'url': "submit.php",
                'data': $('#contact-form').serializeArray(),
                'method': 'POST',
                'success': function(data) {
                    var errors = {};
                    var report = JSON.parse(data);
                    for (var r in report) {
                        if (!report[r]) {
                            errors[r] = 'Please check your input and try again.';
                        }
                    }

                    $('#contact-form').validate().showErrors(errors);
                }
            });
        }
    });

})

function validateContactForm(e) {
    var name = $('#contact-name').val();
    var contactNo = $('#contact-no').val();
    var email = $('#contact-email').val();
    var company = $('#contact-company').val();
    var message = $('#contact-message').val();
    var data = $('#contact-form').serializeArray();

    // TODO: Client-side form validation

    var form = $('#contact-form');
    $('.form-control').removeClass('is-invalid');

    $('.invalid-feedback').remove();

    if (!isValidName((name))) {
        console.log("Value: " + name);
        console.log("ERROR: Name input is not valid.");
        
        $('#contact-name').addClass('is-invalid');
        $('<div/>', {
            class: 'invalid-feedback',
            text: 'Name input is not valid.'
        }).appendTo($('#contact-name').parent());
        
        e.preventDefault();
    }
    else {
        $('#contact-name').addClass('is-valid');
    }

    if (!contactNo || isNaN(contactNo)) {
        console.log("Value: " + contactNo);
        console.log("ERROR: Contact no. input is not valid.");
        
        $('#contact-no').addClass('is-invalid');
        $('<div/>', {
            class: 'invalid-feedback',
            text: 'Contact no. input is not valid.'
        }).appendTo($('#contact-no').parent());

        e.preventDefault();
    }
    else {
        $('#contact-no').addClass('is-valid');
    }

    if (!email || email.indexOf('@') == -1 || email.indexOf('.com') == -1) {
        console.log("Value: " + email);
        console.log("ERROR: Email input is not valid.");

        $('#contact-email').addClass('is-invalid');
        $('<div/>', {
            class: 'invalid-feedback',
            text: 'Email input is not valid.'
        }).appendTo($('#contact-email').parent());

        e.preventDefault();
    }
    else {
        $('#contact-email').addClass('is-valid');
    }

    if (!company) {
        console.log("Value: " + company);
        console.log("ERROR: Company input is not valid.");

        $('#contact-company').addClass('is-invalid');
        $('<div/>', {
            class: 'invalid-feedback',
            text: 'Company input is not valid.'
        }).appendTo($('#contact-company').parent());

        e.preventDefault();
    }
    else {
        $('#contact-company').addClass('is-valid');
    }

    if (!message) {
        console.log("Value: " + message);
        console.log("ERROR: Message input is not valid.");

        $('#contact-message').addClass('is-invalid');
        $('<div/>', {
            class: 'invalid-feedback',
            text: 'Message input is not valid.'
        }).appendTo($('#contact-message').parent());

        e.preventDefault();
    }
    else {
        $('#contact-message').addClass('is-valid');
    }
}

function isValidName(value) {
    return /^[A-Za-z\s]+$/.test(value);
}

// This is a functions that scrolls to #{blah}link
function goToByScroll(id){
    // Remove "link" from the ID
    id = id.replace("link", "");
    // Scroll
    $('html,body').animate({
        scrollTop: $("#"+id).offset().top},
    'slow');
}


function Service(name, src) {

}

function initialize() {
    // loadProducts();
    loadServices();
}

function loadData(source) {
} 

function loadServices() {
    for (var i = 0; i < services.length; i++) {
        var productName = services["serviceName"];
        $("<span/>", {
            class: "product-item"
        })
            .append($("<a/>", {
                href: "#"
            })
                .append($("<img/>", {
                    src: "images/service/" + services[i]["imageSrc"] + "." + services[i]["imageFormat"]
                }))
                .append($("<div/>", {
                    class: "product-name",
                    text: services[i]["serviceName"]
                }))
            )
        .appendTo($(".product-list"));
    }
}

function loadProducts() {
    for (var i = 0; i < products.length; i++) {
        var productName = products["productName"];
        $("<span/>", {
            class: "product-item"
        })
            .append($("<a/>", {
                href: "#"
            })
                .append($("<img/>", {
                    src: "images/product/" + products[i]["imageSrc"] + "." + products[i]["imageFormat"]
                }))
                .append($("<div/>", {
                    class: "product-name",
                    text: products[i]["productName"]
                }))
            )
        .appendTo($(".product-list"));
    }
}