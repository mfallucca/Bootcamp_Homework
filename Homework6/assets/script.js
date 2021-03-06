      var topics = ["The Matrix", "Pugs", "Sega", "Mario", "Luigi", "Royals", "Chiefs", "Bubb Rubb"];

      // displaytopicInfo function re-renders the HTML to display the appropriate content
      function displaytopicInfo() {

        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=dc6zaTOxFJmzC&limit=10";

        // Creating an AJAX call for the specific topic button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='col-sm-3, col-md-3, col-xs-3'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var personImage = $("<img data-state='still' class='gif'>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height_small_still.url);
              personImage.attr("data-still", results[i].images.fixed_height_small_still.url);
              personImage.attr("data-animate", results[i].images.fixed_height_small.url);
              personImage.attr("data-state", "still");

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#topics-view").prepend(gifDiv);
            }
          }
        });

      }

      // Function for displaying topic data
      function renderButtons() {

        // Deleting the topics prior to adding new topics
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each topic in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of topic to our button
          a.addClass("topic-clicked");
          a.addClass("btn-primary");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a topic button is clicked
      $("#add-topics").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#topics-input").val().trim();

        // Adding topic from the textbox to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our topic array
        renderButtons();
      });

      $(document).on("click", ".topic-clicked", function() {
        $("#topics-view").empty(); 
    });
      $(document).on("click", ".topic-clicked", displaytopicInfo);


    $(document).on("click", ".gif", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      console.log(state);
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });


      // Calling the renderButtons function to display the intial buttons
      renderButtons();

