$(document).ready(function() {
  getAnimals();
    $("#submit-animal").on("click", postAnimal);
});

function postAnimal() {
    event.preventDefault();
    var animal = {};

    $.each($("#animal-form").serializeArray(), function(i, field) {
        animal[field.name] = field.value;
    });
    $.ajax({
        type: 'POST',
        url: '/animal',
        data: animal,
        success: function() {
            console.log("I did the thing!");
            $("#animal-list").empty();
            getAnimals();
        },
        error: function() {
            console.log("I didn't work");
        }
    });
}

function getAnimals() {
    $.ajax({
        type: 'GET',
        url: "/animal",
        success: function(animals) {
          animals.forEach(function(animal){
            $("#animal-list").append('<div>' + animal.animal_type + ' ' + animal.animal_number + '</div>');
          });
        },
        error: function(){
          console.log("Something went wrong");
        }
    });
}
