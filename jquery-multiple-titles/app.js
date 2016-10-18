$(document).ready(function() {

    var movieTemplateSource = $("#movie-card-template").html();
    var movieTemplate = Handlebars.compile(movieTemplateSource);

    //Search for movie by title
    $("#movie-search-form").on("submit", function(event) {
        event.preventDefault();

        var movieTitle = encodeURIComponent($("#movie-title").val());

        $.ajax({
            type: "GET",
            url: "http://omdbapi.com?s=" + movieTitle,
            success: function(results) {
                if (results.Response === "False") {
                    alert("No movie found!");
                } else {
                    $("#search-input-box").hide();

                    var $movieCardContainer = $("#movie-card-container");

                    results.Search.forEach(function(imdbMatch) {
                        console.log(imdbMatch.imdbID);

                        $.ajax({
                            type: "GET",
                            url: "http://omdbapi.com?i=" + imdbMatch.imdbID,
                            success: function(movie) {
                                var newMovieHtml = movieTemplate(movie);

                                $movieCardContainer.prepend(newMovieHtml);
                            },
                            error: function() {
                                console.log("Problem getting movie via ID");
                            }
                        });
                    });

                    $("#reset-search-button").show();
                }
            },
            error: function() {
                alert("Error getting movie data");
            }
        });
    });

    //Show search screen again and hide movie cards
    $("#reset-search").on("click", function() {
        $("#movie-card-container").html("");

        $("#movie-title").val("");

        $("#reset-search-button").hide();

        $("#search-input-box").fadeIn();
    });

});
