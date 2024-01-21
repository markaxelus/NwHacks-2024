let ID_ARRAY = [];
let apikey = "apiKey=5a1eb6775112410f90aa898fe292a09e"

async function loadCard() {
    let base_URL = "https://api.spoonacular.com/recipes/findByIngredients?" + apikey; //Search Recipes by Ingredients API
    
    let ingredient_input = document.getElementById("ingredients").value;
    
    let id_array = await ingredient_url(base_URL, ingredient_input) 
    console.log(id_array);
    let diet_array = getSelectedOptions();
    await search_recipes(id_array,diet_array);
    $(".page2").show();
}


//Function search recipes by ID -> dietary booleans, summary, price, picture, title
async function search_recipes(ids_array,diet_array) {
    
    for (var i = 0; i < ids_array.length; i++) {
        let url = `https://api.spoonacular.com/recipes/${ids_array[i]}/information?${apikey}&includeNutrition=false`
        $.get(url, function(data) {
            for (let items of diet_array) {
                if (data[items] === true){
                    displayResults(data);
                }
            }

        })
    }
}

async function loadDescription(id, title, image) {
    let recipe_base_URL = "https://api.spoonacular.com/recipes/{id_data}/information?" + apikey + "&includeNutrition=false" //Search Recipes Informations

    await priceBreakdownMetrics(id);
    await getNutrients(id);
    $("#EcoSuggestionPicture").attr("src", image);
    $("#recipeTitle").text(title);
    $(".page2").hide();
    $(".description").show();
}


//Function that returns the option based on the user input, not ALL DROPDOWNS
function getSelectedOptions() {
    let selectElements = document.getElementById("diet");
    let selectValues = Array.from(selectElements.selectedOptions).map(option => option.value);
    return selectValues;
}


async function getNutrients(id) {
    let nutrient_base_URL = "https://api.spoonacular.com/recipes/{id_data}/nutritionWidget.json?" + apikey;
    let nutrient_URL = nutrient_base_URL.replace("{id_data}", id);                
    let calories = '';
    let fat = '';
    let protein = '';
    let carbohydrates = '';

    $.get(nutrient_URL, function(data) {
        for (let items of data.nutrients) {
            if (items.name === "Calories"){
                calories = items.amount + '' + items.unit;
            }
            else if (items.name === "Fat"){
                fat = items.amount + '' + items.unit; 
            }
            else if (items.name === "Protein"){
                protein = items.amount + '' + items.unit;
            }
            else if (items.name === "Carbohydrates"){
                carbohydrates = items.amount + '' + items.unit;
            }

        }
        $("#calories").text(calories);
        $("#fat").text(fat);
        $("#protein").text(protein);
        $("#carbohydrates").text(carbohydrates);
    });
}

// Function takes in individual ids, NOT AN ARRAY OF IDS ! ! ! !
async function priceBreakdownMetrics(id) {
    let price_base_URL = "https://api.spoonacular.com/recipes/{id_data}/priceBreakdownWidget.json?" + apikey
    let price_URL = price_base_URL.replace("{id_data}", id);

    $.get(price_URL, function(data){
        for (let items of data.ingredients){
            let name = items.name;
            let metricUnit = items.amount.metric.unit; //Gets u the metrix UNIT 'g'
            let valueUnit = items.amount.metric.value; //Gets u the metrix VALUE '1.5'
            let price = items.price; //Gets u the price
            let ingredient = "<th>" + name + "</th><th>" + valueUnit + " " + metricUnit + "</th><th>" + price + "</th>"
            $("#ingredientsTable").append(ingredient);
        }
    })
        
}

async function displayResults(data) {
   
    let card = '<div><div class="image"><img onclick="loadDescription(' + data.id + ',\'' +  data.title + '\',\'' + data.image + '\')" src="' + data.image + '"><button onclick="loadDescription(' + data.id + ',\'' +  data.title + '\',\'' + data.image + '\')">View Recipe</button></div><p>' + data.title + '</p></div>';
    $(".container").append(card);
}

function ingredient_url(url,input) {
    let base_URL = url + "&ingredients=";

    //function to convert ingredient input{string} to an array
    let ingredients_array = convert_input_string(input);
    
    let array_URL = base_URL + ingredients_array.join(",+");

    let full_URL = array_URL + "&number=10" //might have to change later
   
    return ingredients_json(full_URL);
}

//Returns the data of the data URL searched by the user and then obtains the ID of that particular recipe
function ingredients_json(url){
    return new Promise(resolve => {
        let ids = [];
      
        $.get(url, function(data) {
            for (var i=0; i < data.length; i++) {
                ids.push(data[i].id);
            }
            resolve(ids)
        });
        
    })

}

function convert_input_string(word) {
    return word.split(",");
}

