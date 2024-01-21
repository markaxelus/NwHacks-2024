let ID_ARRAY = [];

function main() {
    let base_URL = "https://api.spoonacular.com/recipes/findByIngredients"; //Search Recipes by Ingredients API
    
    let ingredient_input = document.getElementById("ingredients");

    ingredient_url(base_URL) 
        .then(ingredient_ids => {
            ID_ARRAY = ingredient_ids;
        })
        .catch(error => {
            alert("Ids not found");
        })

    let diet_array = getSelectedOptions(ID_ARRAY);
    let recipe_data = search_recipes(ID_ARRAY,diet_array);
    // WHAT TO DO HERE NOW?
}


//Function that returns the option based on the user input, not ALL DROPDOWNS
function getSelectedOptions() {
    let selectElements = getElementsById("diet");
    let selectValues = Array.from(selectElements.selectedOptions).map(option => option.value);
    return selectValues;
}

//Function search recipes by ID -> dietary booleans, summary, price, picture, title
function search_recipes(ids,diet_array) {
    let recipe_base_URL = "https://api.spoonacular.com/recipes/{id_data}/information?includeNutrition=false" //Search Recipes Informations

    for (var i = 0; i < ids.length; i++) {
        recipe_URL = recipe_base_URL.replace("{id_data}", ids[i]);
        $.get(recipe_URL, function(data) {
            for (let item of diet_array){
                if (data[item] === true) {
                    //THEN WE WANT TO DISPLAY THE TITLE AND PRICE AND SUMMARY AND PICTURE\
                    priceBreakdownMetrics(data.id);
                    getNutrients(data.id);
                }
            }
        })
    }
}

function getNutrients(id) {
    let nutrient_base_URL = "https://api.spoonacular.com/recipes/{id_data}/nutritionWidget.json";
    let nutrient_URL = nutrient_base_URL.replace("{id_data}", id);
    $.get(recipe_URL, function(data) {
        for (let items of data.nutrients) {
            if (items.name === "Calories"){
                let calories = items.amount + '' + items.unit;
            }
            else if (items.name === "Fat"){
                let fat = items.amount + '' + items.unit; 
            }
            else if (items.name === "Protein"){
                let protein = items.amount + '' + items.unit;
            }
            else if (items.name === "Carbohydrates"){
                let carbohydrates = items.amount + '' + items.unit;
            }
        }

        //Pouria needs to combine this with the JQuery stuff
    });
}

// Function takes in individual ids, NOT AN ARRAY OF IDS ! ! ! !
function priceBreakdownMetrics(id) {
    let price_base_URL = "https://api.spoonacular.com/recipes/{id_data}/priceBreakdownWidget.json"
    let price_URL = price_base_URL.replace("{id_data}", id);

    $.get(price_URL, function(data){
        for (let items of data.ingredients){
            let metricUnit = items.amount.metric.unit; //Gets u the metrix UNIT 'g'
            let valueUnit = items.amount.metric.value; //Gets u the metrix VALUE '1.5'
            let price = items.price; //Gets u the price
            //Pouria needs to combine this with the JQuery stuff
        }
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

//Returns the data of the data URL searched by the user and then obtains the ID of that particular recipe
function ingredients_json(url){
    return new Promise((resolve, reject) => {
        $.get(url, function(data) {
            let ids = [];
            for (var i=0; i < data.length; i++) {
                ids.push(data[i].id); //

            }
            
            resolve(ids);
        }).fail (function (error){
            reject(error);
        });
    });
}

function convert_input_string(word) {
    return word.split(",");
}

