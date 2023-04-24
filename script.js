

let day = null;
let month = null;
let year = null;

let birthday = null;
let today = luxon.DateTime.local().startOf("day");
let diff = null;




function formSubmit(){
    console.log("Form submitted");

    day = parseInt(document.getElementById("day").value);
    month = parseInt(document.getElementById("month").value);
    year = parseInt(document.getElementById("year").value);


    showErrors();
    console.log({day, month, year});

    birthday = luxon.DateTime.fromFormat(`${day}-${month}-${year}`, "d-M-yyyy").startOf("day");


    if (!birthday.isValid){
        showErrorMessage("day", "Must be a valid date");
        showErrorMessage("month", "");
        showErrorMessage("year", "");

    }
    else if( birthday > today){
        showErrorMessage("day", "Must be in the past");
        showErrorMessage("month", "");
        showErrorMessage("year", "");

    }
    else{
        diff = today.diff(birthday, ["years", "months", "days"]);

        document.getElementById("age-years").textContent = diff.years;
        document.getElementById("age-months").textContent = diff.months;
        document.getElementById("age-days").textContent = diff.days;

        // Handles singular/plural for "years", "months", "days".
        for (const [key, value] of Object.entries(diff.values)) {
            if(value === 1){
                document.getElementById(`age-${key}-label`).textContent = key.slice(0,-1);
            }
            else{
                document.getElementById(`age-${key}-label`).textContent = key;
            }


        }
        

    }
    

}

function showErrors(){
    fields = ["day", "month","year"]
    fields.forEach(field => {
        document.getElementById(`${field}`).style = "none";
        document.querySelector(`label[for="${field}"]`).style = "none";
        document.getElementById(`${field}-error`).textContent = "";
        
    });

    if(!day & day !== 0){
        showErrorMessage("day", "This field is required");
    }
    else if(day === 0 || day >= 32 || day <= -1){
        showErrorMessage("day", "Must be a valid day");
    }

    if(!month & month !== 0){
        showErrorMessage("month", "This field is required");
    }
    else if(month === 0 || month >= 13 || month <= -1){
        showErrorMessage("month", "Must be a valid month");
    }

    if(!year & year !== 0){
        showErrorMessage("year", "This field is required");
    }
    else if(year < 0){
        showErrorMessage("year", "Must be a valid year");
    }

    

    
}

function showErrorMessage(field, message){
    // field: day, month or year


    inputField = document.getElementById(`${field}`);
    label = document.querySelector(`label[for="${field}"]`);
    errorMessageDiv = document.getElementById(`${field}-error`);

    inputField.style.border = "1px solid red";
    label.style.color = "red";
    errorMessageDiv.textContent = message;
}


$("#date-form").submit(function(event){
    formSubmit();
    event.preventDefault();




})