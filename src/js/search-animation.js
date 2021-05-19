$('select.selected-country').each(function() {

    var dropdown = $('<div />').addClass('dropdown');

    $(this).wrap(dropdown);

    var label = $('<span />').text($(this).attr('placeholder')).insertAfter($(this));
    var list = $('<ul />');
    
    console.log ( $(this))
    console.log ( $(this).find($('option')).val())

    $(this).find('option').each(function() {
        list.append($('<li />').append($('<a/>').text($(this).text()).attr('Value', $(this).val())));
    });

    list.insertAfter($(this));    
});

$(document).on('click touch', '.dropdown ul li a', function(e) {
    e.preventDefault();
    var dropdown = $(this).parent().parent().parent();
    var active = $(this).parent().hasClass('active');
    var label = active ? dropdown.find('select').attr('placeholder') : $(this).text();

    dropdown.find('option').prop('selected', false);
    dropdown.find('ul li').removeClass('active');

    dropdown.toggleClass('filled', !active);
    dropdown.children('span').text(label);

    if(!active) {
        dropdown.find('option:contains(' + $(this).text() + ')').prop('selected', true);
        $(this).parent().addClass('active');
    }

    dropdown.removeClass('open');
});

$('.dropdown > span').on('click touch', function(e) {
    var self = $(this).parent();
    self.toggleClass('open');
});