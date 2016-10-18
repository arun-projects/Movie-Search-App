$(document).ready(function() {

    //Search for movie by title
    $("#movie-search-form").on("submit", function(event) {
        event.preventDefault();

        var movieTitle = encodeURIComponent($("#movie-title").val());

        $.ajax({
            type: "GET",
            url: "http://omdbapi.com?t=" + movieTitle,
            success: function(results) {
                if (results.Response === "False") {
                    alert("No movie found!");
                } else {
                    HANDLE.renderTemplate({
                        templateSource: "#movie-card-template",
                        data: results,
                        where: "#movie-card-container",
                        clearOriginal: true
                    });

                    $("#search-input-box").hide();

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
