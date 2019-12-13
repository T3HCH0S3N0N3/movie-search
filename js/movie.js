$('document').ready(function(){

    var output = '', url = window.location.href, id = url.substr(url.length - 9);

    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=f3e326f5&i=' + id,
        type: 'GET',
        success: function(result){
            if(result['Response'] === 'False'){
                output += '<li>No movie was found</li>';
                $('h1').append(output);
            } else {
                $('h1').append(result['Title']);
                output = '<li><strong>Year:</strong> ' + result['Year'] + '</li><li><strong>Rating:</strong> ' +
                result['Rated']  + '</li><li><strong>Released: </strong> ' +
                result['Released']  + '</li><li><strong>Runtime: </strong> ' +
                result['Runtime']  + '</li><li><strong>Director: </strong>' +
                result['Director']  + '</li><li><strong>Staring: </strong>' +
                result['Actors']  + '</li>';
                $('#details').append(output);
                $('.plot').append(result['Plot']);
                $('.poster').append('<img src="' + result['Poster'] + '" alt="' + result['Title'] + '" />');
            }
        },
        error: function(error){
            console.log('Error: ' + error);
        }
    });
});