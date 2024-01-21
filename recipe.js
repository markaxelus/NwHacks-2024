function main() {
    let base_URL = "https://api.spoonacular.com/recipes/findByIngredients";

    //By calling this, the HTML for title and picture of the recipe will be updated inside the html
    //Also returns the ID of recipes
    let ingredient_input = document.getElementById("");

    ingredient_url(base_URL, ingredient_input.value) 
        .then(ingredient_ids => {
            //handle ids here (make api calls)
        })
        .catch(error => {
            alert("Ids not found");
        })

    
    
}

function ingredient_url(url,input) {
    let base_URL = url + "?ingredients=";

    //function to convert ingredient input{string} to an array
    let ingredients_array = convert_input_string(input);
    
    let array_URL = base_URL + ingredients_array.join(",+");

    let full_URL = array_URL + "&number=10" //might have to change later
    
    return ingredients_json(full_URL);
}

function ingredients_json(url){
    return new Promise((resolve, reject) => {
        $.get(url, function(data) {
            let ids = [];
            for (var i=0; i < data.length; i++) {
                $("#EcoRecipeName${i}").html(data[i].title);
                $("#EcoSuggestionPicture${i}").attr("src", data[i].image);
                ids.push(data[i].id);
            }
            
            resolve(ids);
        }).fail (function (error){
            reject(error);
        });
    });
}




// function ingredients_json(url) {
//     $.get(url, function(data){
//         analyze(data);
//     })      
// }


function convert_input_string(word) {
    return word.split(",");
}