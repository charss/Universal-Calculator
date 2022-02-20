function myCreateFunction() {
    var values = []
    var test = 2

    if (test == 1) {
        document.getElementById('os_size').value = "56"
        document.getElementById('memory_size').value = "256"
        document.getElementById('job_size_1').value = "30"
        document.getElementById('arrival_time_1').value = "12:00"
        document.getElementById('run_time_1').value = "10"

        values = [
            {
                job_size: "30",
                arrival_time: "12:00",
                run_time: "10"
            },
            {
                job_size: "150",
                arrival_time: "12:05",
                run_time: "15"
            },
            {
                job_size: "50",
                arrival_time: "12:05",
                run_time: "15"
            },
            {
                job_size: "20",
                arrival_time: "12:10",
                run_time: "20"
            },
            {
                job_size: "170",
                arrival_time: "12:12",
                run_time: "5"
            }
        ]
    } else if (test == 2) {
        document.getElementById('os_size').value = "300"
        document.getElementById('memory_size').value = "1024"
        document.getElementById('job_size_1').value = "450"
        document.getElementById('arrival_time_1').value = "9:00"
        document.getElementById('run_time_1').value = "8"

        values = [
            {
                job_size: "450",
                arrival_time: "9:00",
                run_time: "8"
            },
            {
                job_size: "200",
                arrival_time: "9:02",
                run_time: "2"
            },
            {
                job_size: "120",
                arrival_time: "9:03",
                run_time: "6"
            },
            {
                job_size: "315",
                arrival_time: "9:07",
                run_time: "5"
            },
            {
                job_size: "400",
                arrival_time: "9:09",
                run_time: "9"
            },
            {
                job_size: "280",
                arrival_time: "9:10",
                run_time: "7"
            },
            {
                job_size: "160",
                arrival_time: "9:13",
                run_time: "2"
            },
            {
                job_size: "270",
                arrival_time: "9:14",
                run_time: "3"
            },
        ]
    }

    if (document.getElementById("table").rows.length > 1) {
        document.getElementById("delete-button").disabled = false;
    }

    var table = document.getElementById("table");
    var row_count = table.rows.length;
    var row = table.insertRow(-1);
    row.setAttribute('id', 'job' + row_count)
    var job_number = row.insertCell(0);
    
    job_number.innerHTML = row_count;



    for (var i = 1; i <= 3; i++) {
        var x = row.insertCell(i);
        let newinputbox = document.createElement("input");
        newinputbox = document.createElement("input");
        newinputbox.setAttribute("type", "text");
        if (i == 1) {
            var new_input_id = "job_size_" + row_count
            newinputbox.setAttribute("id", new_input_id);
            newinputbox.setAttribute("onchange", "check(this)");
            newinputbox.setAttribute("value", values[row_count - 1]["job_size"]);
        } else if (i == 2) {
            var new_input_id = "arrival_time_" + row_count
            newinputbox.setAttribute("id", new_input_id);
            newinputbox.setAttribute("onchange", "check(this)");
            newinputbox.setAttribute("value", values[row_count - 1]["arrival_time"]);
        } else {
            var new_input_id = "run_time_" + row_count
            newinputbox.setAttribute("id", new_input_id);
            newinputbox.setAttribute("onchange", "check(this)");
            newinputbox.setAttribute("value", values[row_count - 1]["run_time"]);
        }
        x.appendChild(newinputbox);
    }

    for (var i = 4; i <= 7; i++) {
        var x = row.insertCell(i);
        let newspanbox = document.createElement("p");
        if (i == 4) {
            var new_input_id = "time_started_" + row_count
            newspanbox.setAttribute("id", new_input_id);
        } else if (i == 5) {
            var new_input_id = "time_finished_" + row_count
            newspanbox.setAttribute("id", new_input_id);
        } else if (i == 6) {
            var new_input_id = "waiting_time_" + row_count
            newspanbox.setAttribute("id", new_input_id);
        } else {
            var new_input_id = "memory_" + row_count
            newspanbox.setAttribute("id", new_input_id);
        }
        x.appendChild(newspanbox);
    }

}

function myDeleteFunction() {
    if (document.getElementById("table").rows.length > 2) {
        document.getElementById("table").deleteRow(-1);
    } 
    
    if (document.getElementById("table").rows.length == 2) {
        document.getElementById("delete-button").disabled = true;
    }


}

function solve() {

    var inputs = document.querySelectorAll("input[type=text]")
    var empty_inputs = []

    for (var i = 0; i < inputs.length; i++) {
        var element = document.getElementById(inputs[i].id);
        if (inputs[i].value == '') {
            empty_inputs.push(inputs[i].id)
            element.classList.add("empty");
        } else {
            element.classList.remove("empty");
        }
    }

    if (empty_inputs.length != 0) {
        return
    }

    var history = document.getElementById("history")
    var table = document.getElementById("table");
    var os_size = document.getElementById("os_size").value
    var memory_size = document.getElementById("memory_size").value
    var actual_memory = memory_size - os_size
    var curr_time = 0;
    var values = []
    var queue = []
    var started = false
    var work_list = [];
    var total_jobs = job_done = 0;
    // var row_count = table.rows.length;   

    for (var i = 1; i < table.rows.length; i++) {
        var trs = table.getElementsByTagName("tr")[i]
        var new_job = {
            job_num: trs.cells[0].innerText,
            job_size: parseInt(trs.cells[1].children[0].value),
            arrival_time: trs.cells[2].children[0].value,
            run_time: parseInt(trs.cells[3].children[0].value),
            time_started: -1,
            time_finished: -1,
            waiting_time: 0,
            memory: -1
        };
        // var job_size = trs.cells[1].children[0].value
        // var arrival_time = trs.cells[2].children[0].value
        // var run_time = trs.cells[3].children[0].value
        

        // values.push(`${job_size} ${arrival_time} ${run_time}`)
        values.push(new_job)
        // myFunction("Jobs:", values);
    }


    total_jobs = values.length 

    // while (values.length > 0) {
    while (job_done != total_jobs) {
        for (var i = 0; i < values.length; i++) {
            // console.log(parseInt(values[i].split(' ')[1].split(':')[1]))
            // console.log(parseInt(values[i]['arrival_time']))
            if (parseInt(values[i]['arrival_time'].split(':')[1]) == curr_time) {
                console.log("TIME:", curr_time)
                queue.push(values[i])
            }
        }

        for (var i = 0; i < work_list.length; i++) {
            if (work_list[i]['time_finished'] == curr_time) {
                console.log("JOB DONE")
                actual_memory += work_list[i]['job_size']
                job_done++;
            }

        }

        while (true && queue.length != 0) {
            if (queue[0]['job_size'] <= actual_memory) {
                actual_memory -= queue[0]['job_size']
                queue[0]['time_finished'] = curr_time + queue[0]['run_time']
                queue[0]['time_started'] = curr_time
                
                work_list.push(queue[0])
                // console.log(document.getElementById(`time_started_${queue[0]['job_num']}`))
                document.getElementById(`time_started_${queue[0]['job_num']}`).innerHTML = curr_time
                document.getElementById(`time_finished_${queue[0]['job_num']}`).innerHTML = queue[0]['time_finished']
                document.getElementById(`waiting_time_${queue[0]['job_num']}`).innerHTML = queue[0]['waiting_time']
                document.getElementById(`memory_${queue[0]['job_num']}`).innerHTML = actual_memory
                queue.shift()
            } else {
                for (var i = 0; i < queue.length; i++) {
                    queue[i]['waiting_time']++
                }
                break
            }
        }

        

        curr_time += 1
        // myFunction("Queue:", queue);
        // myFunction("Work:", work_list);
    }
}

function load() {
    var inputs = document.querySelectorAll("input[type=text]")

    for (var i = 0; i < inputs.length; i++) {
        var element = document.getElementById(inputs[i].id);
        element.setAttribute("onclick", function() {check(element)});
        transport_select.setAttribute("onchange", function(){toggleSelect(transport_select_id);});
    }
}

function check(element) {
    console.log('CHECKING')
    if (element.value == '') {
        element.classList.add("empty");
    } else {
        element.classList.remove("empty");
    }
}

// function myFunction(title, object_value) {
//     var myJSON = ''

//     if (typeof object_value == 'object') {
//         var myJSON = JSON.stringify(object_value);
//     } else {
//         var myJSON = object_value

//     }

//     // Create an "li" node:
//     const node = document.createElement("li");

//     // Create a text node:
//     const textnode = document.createTextNode(title + ' ' +myJSON);

//     // Append the text node to the "li" node:
//     node.appendChild(textnode);

//     // Append the "li" node to the list:
//     document.getElementById("list").appendChild(node);
// }