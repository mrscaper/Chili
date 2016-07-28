// hack for alphabetical sorting
String.prototype.removeAccents = function(){
    return this
        .toLowerCase()
        .replace(/[á]/gi,"a")
        .replace(/[é]/gi,"e")
        .replace(/[é]/gi,"i")
        .replace(/[óöő]/gi,"o")
        .replace(/[úüű]/gi, "u")
        .replace(/[^a-zA-Z0-9]/g," ");
}

// init Isotope
var $grid = $('.grid').isotope({
    itemSelector: '.product',
    layoutMode: 'fitRows',
    getSortData: {
        name: function( itemElem ) {
            var name = $( itemElem ).find('.name').text();
            return name.removeAccents();
        },
        heat: '.heat parseInt'
    }
});

$('.sort-by-button-group').on( 'click', 'button', function() {
    var sortByValue = $(this).attr('data-sort-by');
    var sortByAsc= ($(this).attr('data-sort-asc') == "true");
    $grid.isotope({ sortBy: sortByValue, sortAscending:sortByAsc });
});