var buttonarr = ['Cars', 'Frog', 'Jackets', 'Shoes', 'Karate', 'pokemon']

$(document).ready(function() {
    $("#gifs").hide();
});

$(document).on('click', '.buttons', function () {
    // queryURL for Giphy API
    $('#gifs').empty()
    $("#gifs").show()
    var buttonChoice = $(this).attr('data-name')
    console.log(buttonChoice)
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + buttonChoice + "&api_key=dbIMESa7m194GaURIiVggjKEQlCfoyTn&limit=10"
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response)
        for (var i = 0; i < response.data.length; i++) {
            var searchItems = $('<div>')
            var image = $('<img>')
            var rating = $('<p>').text('Rating: ' + response.data[i].rating.toUpperCase())
            var still = response.data[i].images.fixed_height_still.url
            var animated = response.data[i].images.fixed_height.url
            image.attr('src', still)
            image.attr('data-still', still)
            image.attr('data-animated', animated)
            image.attr('data-state', 'still')
            image.addClass('image')
            searchItems.append(rating); 
            searchItems.append(image); 
            $('#gifs').append(searchItems); 
        }
    })
})


function showButtons() {
    $('#choicebutton').empty()
    for (i = 0; i < buttonarr.length; i++) {
        var btn = $("<button>")
        btn.addClass("buttons")
        btn.attr("data-name", buttonarr[i])
        btn.text(buttonarr[i])
        $("#choicebutton").append(btn)
    }
}


//still/animate
$(document).on('click', '.image', function () {
    var state = $(this).attr('data-state')
    if (state === 'still') {
        $(this).attr('src', $(this).data('animated'))
        $(this).attr('data-state', 'animated')
    }
    else {
        $(this).attr('src', $(this).data('still'))
        $(this).attr('data-state', 'still')
    }
})
// onclick function for 
/* when Submit button is clicked, push user's typed entry to initial array;
return false is to prevent page refresh on submit click*/
$("input[type='submit']").on('click', function () {
    $("#gifs").show()
    var search = $('#topic-input').val()
    buttonarr.push(search)
    showButtons()
    return false
})


showButtons()