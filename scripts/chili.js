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
};

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


//Sorting function
$('.sort-by-button-group').on( 'click', 'button', function() {
    var sortByValue = $(this).attr('data-sort-by');
    var sortByAsc= ($(this).attr('data-sort-asc') == "true");
    $grid.isotope({ sortBy: sortByValue, sortAscending:sortByAsc });
});


//Filtering values
var $minHeat=1;
var $maxHeat=5;


//Filter update
function updateFilter()
{
    $grid.isotope({filter: function() {
        //heat filtering
        var number = $(this).find('.heat').text();
        var parsedNumber =parseInt( number, 10 );
        var rightHothess=(parsedNumber >= $minHeat) && (parsedNumber <= $maxHeat);
        //Concatenating filters
        return  rightHothess;
    }})
}

//Sauce heat slider
$( "#heat-slider" ).slider({
    range: true,
    min: 1,
    max: 5,
    values: [ 1, 5 ],
    slide: function( event, ui ) {
        $minHeat=ui.values[0];
        $maxHeat=ui.values[1];
        updateFilter();
    }
});