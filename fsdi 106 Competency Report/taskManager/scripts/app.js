var important = false;
var formVisible = true;
var icon;

function togglePriority() {
    console.log("Clicked");

    if(important == true) {
        // set it as important
        icon.removeClass("fas").addClass("far");
        important = false;
    }
    else {
        // set it as important
        icon.removeClass("far").addClass("fas");
        important = true;
    }
}
function toggleForm() {
    if(formVisible) {
        $(".section-form").hide();
        formVisible = false;
    }
    else {
        $(".section-form").show();
        formVisible = true;
    }
}

function fetchTasksFromServer() {
    $.ajax({
        url: 'https://fsdiapi.azurewebsites.net/api/tasks',
        type: "GET",
        success: function(dataString) {            
            // parse json string to js object
            let allTasks = JSON.parse(dataString);
            let numOfTasks = 0;

            for(let i=0; i< allTasks.length; i++) {
                let task = allTasks[i];

                // print the task, only if the task name is equal to your name
                if(task.name === "Brandon") {
                    displayTask(task);
                    //numOfTasks = numOfTasks + 1;
                    numOfTasks += 1;
                }
                
            }
            
            // set the count on the screen
            let text = "Total: " + numOfTasks + " tasks";
            $("#lblCount").text(text);
        },
        error: function(err) {
            console.log("Error getting data", err);
        }
    });
}

function saveTask() {
    console.log("Saving task...");

    let title = $("#txtTitle").val();
    let desc = $("#txtDescription").val();
    let dueDate = $("#dpDueDate").val();
    let status = $("#selStatus").val();
    let category = $("#txtCategory").val();
    let color = $("#selColor").val();
           
    let theTask = new Task(important, title, desc, dueDate, status, category, color);
   let stringData = JSON.stringify(theTask);

   console.log(theTask);
   console.log(stringData);

    // send the object to the server
   $.ajax({
       url: 'https://fsdiapi.azurewebsites.net/api/tasks',
       type: 'POST',
       data: stringData,
       contentType: "application/json",

       success: function(res) {
           console.log("Server says:", res);

           displayTask(theTask);
           clearForm();
       },
       error: function(err) {
           console.log("Error saving task", res);
       }
   });
}

function clearForm() {
    $("#txtTitle").val("");
    $("#txtDescription").val("");
    $("#dpDueDate").val("");
    $("#selStatus").val("");
    $("#txtCategory").val("");
    $("#selColor").val("");
}
    
function displayTask(task) {
    
    let syntax = `<div class="task">
        <i class="far fa-star"></i>
    
        <div class="info">
            <h5>${task.title}</h5>
            <p>${task.description}</p>
        </div>
    
        <div class="details">
            <label class="status">${task.status}</label>
            <label class="category">${task.category}</label>
        </div>
    </div>`;
    
    $(".task-list").append(syntax);
}

function testHttpRequest() {
    $.ajax({
        type: 'GET',
        url: 'https://restclass.azurewebsites.net/api/test',
        success: function(response) {
            console.log("Server says: ", response);
        },
        error: function(err) {
            console.log("Error on request", err);
        }
    });
}
    
function init() {
    console.log("Task manager");
    icon = $("#iPriority");
        
    // hook events
    icon.click(togglePriority);
    $("#btnShowDetails").click(toggleForm);
    $("#btnSave").click(saveTask);
    

    // load data
    fetchTasksFromServer();
}



window.onload = init;


/**
 * create the button
 * cath the click on the button
 * call a function (saveTask)
 * inside the fn console log a message
 */