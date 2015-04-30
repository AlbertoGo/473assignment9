

var main = function() {
    var toDos = ["Get groceries",
        "Make up some new ToDos",
        "Prep for Monday's class",
        "Answer emails",
        "Take Gracie to the park",
        "Finish writing this book"
    ];

    var socket = io.connect("http://localhost:3000");

    socket.on('add', function(task) {
        console.log(task);
        toDos.push(task);
        //TODO: Update page without refreshing.

        var $element = $(".tabs a span").toArray()[0];
        var $content, i;
        $(".tabs a span").removeClass("active");

        $("main .content").empty();
        $content = $("<ul>");
        for (i = toDos.length - 1; i >= 0; i--) {
            $content.append($("<li>").text(toDos[i]));
        }
        $("main .content").append($content);



    });


    $(".tabs a span").toArray().forEach(function(element) {
        var $element = $(element);

        // create a click handler for this element
        $element.on("click", function updates() {
            var $content,
                $input,
                $button,
                i;
            //setTimeout(updates, 10000);
            $(".tabs a span").removeClass("active");
            $element.addClass("active");
            $("main .content").empty();



            if ($element.parent().is(":nth-child(1)")) {
                // newest first, so we have to go through
                // the array backwards
                $content = $("<ul>");
                for (i = toDos.length - 1; i >= 0; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
            } else if ($element.parent().is(":nth-child(2)")) {
                // oldest first, so we go through the array forwards
                $content = $("<ul>");
                toDos.forEach(function(todo) {
                    $content.append($("<li>").text(todo));
                });
            } else if ($element.parent().is(":nth-child(3)")) {
                // input a new to-do
                $input = $("<input>"),
                    $button = $("<button>").text("+");

                $button.on("click", function() {
                    if ($input.val() !== "") {
                        toDos.push($input.val());
                        socket.emit('addTask', $input.val());
                        $input.val("");
                    }
                });

                $content = $("<div>").append($input).append($button);
                /* Alternatively append() allows multiple arguments so the above
                 can be done with $content = $("<div>").append($input, $button); */
            }

            $("main .content").append($content);
            //setTimeout(updates, 10000);
            return false;
        });
    });

    $(".tabs a:first-child span").trigger("click");
};

$(document).ready(main);