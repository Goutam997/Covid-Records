'use strict';
function render_table(){
    document.getElementById("display").innerHTML = `<div class="jumbotron">
    <table class="table table-stripped table-bordered">
        <thead>
            <tr>
                <td>Country</td>
                <td>Population</td>
                <td>Confirmed cases</td>
                <td>Deaths</td>
                <td>Recovered</td>
            </tr>
        </thead>
        <tbody id="tablebody"></tbody>
    </table>            
    </div>`;
};

function displayDetails(key, value){
    let disp_obj="";
    disp_obj = `<tr>
    <td>${key}</td>
    <td>${value.All.population}</td>
    <td>${value.All.confirmed}</td>
    <td><span class="badge bg-danger">${value.All.deaths}</span></td>
    <td><span class="badge bg-success">${(value.All.confirmed) -(value.All.deaths)}</span></td>
    </tr>`;
    tablebody.innerHTML += disp_obj;
};


const getAPI = async(type) =>{
    try {
        const data  = await fetch("https://covid-api.mmediagroup.fr/v1/cases");
        let cases = await data.json();
        // console.log(cases);//gets an object with countries as key and various parameters as values
        if(type === "all"){
            document.getElementById("country").value = "";
            render_table();
            for (const country in cases) {
                if (Object.hasOwnProperty.call(cases, country)) {
                    const element = cases[country];
                    console.log(country, element);
                    displayDetails(country, element);    
                }
            }
        }
        else{
            render_table();
            type = type.toUpperCase();
            for (const country in cases) {
                if (Object.hasOwnProperty.call(cases, country)) {
                    if((country.toLocaleUpperCase()).includes(type)){
                        const element = cases[country];
                        console.log(country, element);
                        displayDetails(country,element);
                    }    
                }
            }
        }    
    } catch (error) {
        console.log("error", error);
    }
};


let country_name="";

document.getElementById("display_all").addEventListener("click", () => {
    getAPI("all");
});
document.getElementById("search_btn").addEventListener("click", () => {
    country_name = document.getElementById("country").value;
    if(country_name !== null){
        console.log("1");
        getAPI(country_name);
    }
    else{
        alert("enter a country name to search");
    }   
});
