$ = jQuery;

$('document').ready(function(){

    var searchParams, output = '';

    $('.search-btn').click(function(e){
        e.preventDefault();
        output = '';
        searchParams = $('#search').val();    
        $.ajax({
            url: 'http://www.omdbapi.com/?apikey=f3e326f5&s=' + searchParams,
            type: 'GET',
            success: function(result){
                if(result['Response'] === 'False'){
                    output += '<li>No results were found. Please try again.</li>';
                    $('#results').empty().append(output);
                } else {
                    $.when.apply($, result['Search'].map(function(i) {
                        var title = i['Title'];
                        var poster = i['Poster'];
                        var id = i['imdbID'];
                        output += '<li class="col-4 col-12-sm"><div class="movie">';
                        if( poster != 'N/A' ){
                            output += '<img src="' + poster + '" alt="' + title + '"/>';
                        }
                        output += '<a href="movie.html?id=' + id + '">' + title + '</a></div></li>';
                    })).then(function() {
                        $('#results').empty().append(output);
                    });
                }
            },
            error: function(error){
                console.log('Error: ' + error);
            }
        })
    });
});