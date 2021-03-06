function myCreateFunction() {
    const parentElement = document.querySelector('#' + current_tab);
    let table = parentElement.querySelectorAll('table')[0]

    // var values = []
    // var test = 3


    // if (test == 1) {
    //     parentElement.querySelector('#os_size').value = '56'
    //     parentElement.querySelector('#memory_size').value = '256'
    //     parentElement.querySelector('#job_size_1').value = '30'
    //     parentElement.querySelector('#arrival_time_1').value = '12:00'
    //     parentElement.querySelector('#run_time_1').value = '10'

    //     values = [
    //         {
    //             job_size: "30",
    //             arrival_time: "12:00",
    //             run_time: "10"
    //         },
    //         {
    //             job_size: "150",
    //             arrival_time: "12:05",
    //             run_time: "15"
    //         },
    //         {
    //             job_size: "50",
    //             arrival_time: "12:05",
    //             run_time: "15"
    //         },
    //         {
    //             job_size: "20",
    //             arrival_time: "12:10",
    //             run_time: "20"
    //         },
    //         {
    //             job_size: "170",
    //             arrival_time: "12:12",
    //             run_time: "5"
    //         }
    //     ]
    // } else if (test == 2) {
    //     parentElement.querySelector('#os_size').value = '300'
    //     parentElement.querySelector('#memory_size').value = '1024'
    //     parentElement.querySelector('#job_size_1').value = '450'
    //     parentElement.querySelector('#arrival_time_1').value = '9:00'
    //     parentElement.querySelector('#run_time_1').value = '8'

    //     values = [
    //         {
    //             job_size: "450",
    //             arrival_time: "9:00",
    //             run_time: "8"
    //         },
    //         {
    //             job_size: "200",
    //             arrival_time: "9:02",
    //             run_time: "2"
    //         },
    //         {
    //             job_size: "120",
    //             arrival_time: "9:03",
    //             run_time: "6"
    //         },
    //         {
    //             job_size: "315",
    //             arrival_time: "9:07",
    //             run_time: "5"
    //         },
    //         {
    //             job_size: "400",
    //             arrival_time: "9:09",
    //             run_time: "9"
    //         },
    //         {
    //             job_size: "280",
    //             arrival_time: "9:10",
    //             run_time: "7"
    //         },
    //         {
    //             job_size: "160",
    //             arrival_time: "9:13",
    //             run_time: "2"
    //         },
    //         {
    //             job_size: "270",
    //             arrival_time: "9:14",
    //             run_time: "3"
    //         },
    //     ]
    // } else if (test == 3) {
    //     parentElement.querySelector('#os_size').value = '56'
    //     parentElement.querySelector('#memory_size').value = '256'
    //     parentElement.querySelector('#job_size_1').value = '30'
    //     parentElement.querySelector('#arrival_time_1').value = '0'
    //     parentElement.querySelector('#run_time_1').value = '10'

    //     values = [
    //         {
    //             job_size: "30",
    //             arrival_time: "0",
    //             run_time: "10"
    //         },
    //         {
    //             job_size: "150",
    //             arrival_time: "5",
    //             run_time: "15"
    //         },
    //         {
    //             job_size: "50",
    //             arrival_time: "5",
    //             run_time: "15"
    //         },
    //         {
    //             job_size: "20",
    //             arrival_time: "10",
    //             run_time: "20"
    //         },
    //         {
    //             job_size: "170",
    //             arrival_time: "12",
    //             run_time: "5"
    //         }
    //     ]
    // }

    if (table.rows.length) {
        parentElement.querySelector('[id="delete-button"]').disabled = false;
    }

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
            // newinputbox.setAttribute("value", values[row_count - 1]["job_size"]);
        } else if (i == 2) {
            var new_input_id = "arrival_time_" + row_count
            newinputbox.setAttribute("id", new_input_id);
            newinputbox.setAttribute("onchange", "check(this)");
            // newinputbox.setAttribute("value", values[row_count - 1]["arrival_time"]);
        } else {
            var new_input_id = "run_time_" + row_count
            newinputbox.setAttribute("id", new_input_id);
            newinputbox.setAttribute("onchange", "check(this)");
            // newinputbox.setAttribute("value", values[row_count - 1]["run_time"]);
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
    const parentElement = document.querySelector('#' + current_tab);
    let table = parentElement.querySelectorAll('table')[0]

    if (table.rows.length > 2) {
        table.deleteRow(-1);
    } 
    
    if (table.rows.length == 2) {
        parentElement.querySelector('[id="delete-button"]').disabled = true;
    }
}

function solve() {
    const parentElement = document.querySelector('#' + current_tab);


    var time_unit = parentElement.querySelector('[id="unit"]').value
    var inputs = parentElement.querySelectorAll("input[type=text]")
    var empty_inputs = []

    for (var i = 0; i < inputs.length; i++) {
        var element = parentElement.querySelector(`[id="${inputs[i].id}"]`);
        if (inputs[i].value == '') {
            empty_inputs.push(inputs[i].id)
            element.classList.add("empty");
        } else {
            element.classList.remove("empty");
        }
    }

    var time_inputs = parentElement.querySelectorAll('[id^="arrival_time"]');
    console.log(time_unit)

    if (time_unit == 'hour') {
        for (var i = 0; i < time_inputs.length; i++) {
            var x = time_inputs[i].value
            if (!(x.includes(':'))) {
                empty_inputs.push(time_inputs[i].id)
                time_inputs[i].classList.add("empty");
            } else {
                time_inputs[i].classList.remove("empty");
            }
        }
    } else if (time_unit == 'milli') {
        for (var i = 0; i < time_inputs.length; i++) {
            var x = time_inputs[i].value
            if (isNaN(x)) {
                empty_inputs.push(time_inputs[i].id)
                time_inputs[i].classList.add("empty");
            } else {
                time_inputs[i].classList.remove("empty");

            }
            // if (!(x.includes(':'))) {
            //     empty_inputs.push(time_inputs[i].id)
            //     time_inputs[i].classList.add("empty");
            // } else {
            //     time_inputs[i].classList.remove("empty");
            // }
        }
    }

    if (empty_inputs.length != 0) {
        return
    }

    // var history = document.getElementById("history")
    let table = parentElement.querySelectorAll('table')[0]
    var os_size = parentElement.querySelector("[id='os_size']").value
    var memory_size = parentElement.querySelector("[id='memory_size']").value
    var actual_memory = memory_size - os_size
    var curr_time = 0;
    var values = []
    var queue = []
    var work_list = [];
    var total_jobs = job_done = 0;


    for (var i = 1; i < table.rows.length; i++) {
        var trs = table.getElementsByTagName("tr")[i]
        var new_job = {
            job_num: trs.cells[0].innerText,
            job_size: parseInt(trs.cells[1].children[0].value),
            arrival_time: trs.cells[2].children[0].value,
            run_time: parseInt(trs.cells[3].children[0].value),
            time_started: '',
            time_finished: '',
            waiting_time: 0,
            memory: -1,
            status: 'not'
        };

        values.push(new_job)
    }


    total_jobs = values.length 

    while (job_done != total_jobs) {
        for (var i = 0; i < values.length; i++) {
            if (time_unit == 'hour') {
                if (parseInt(values[i]['arrival_time'].split(':')[1]) == curr_time) {
                    queue.push(values[i])
                }
            } else {
                if (parseInt(values[i]['arrival_time']) == curr_time) {
                    queue.push(values[i])
                }
            }
        }

        for (var i = 0; i < work_list.length; i++) {
            if (work_list[i]['run_time'] == 1 && work_list[i]['status'] == "not") {
                actual_memory += work_list[i]['job_size']
                work_list[i]['status'] = 'done'
                job_done++;
                work_list[i]['run_time'] -= 1
            } else {
                work_list[i]['run_time'] -= 1
            }
        }

        while (true && queue.length != 0) {
            if (queue[0]['job_size'] <= actual_memory) {
                actual_memory -= queue[0]['job_size']
                
                work_list.push(queue[0])

                if (time_unit == 'hour') {
                    var x = solveHour(queue[0])
                    queue[0]['time_started'] = x[0]
                    queue[0]['time_finished'] = x[1]
                } else {
                    var x = solveMilli(queue[0])
                    queue[0]['time_started'] = x[0]
                    queue[0]['time_finished'] = x[1]
                }

                parentElement.querySelector(`#time_started_${queue[0]['job_num']}`).innerHTML = queue[0]['time_started']
                parentElement.querySelector(`#time_finished_${queue[0]['job_num']}`).innerHTML = queue[0]['time_finished']
                parentElement.querySelector(`#waiting_time_${queue[0]['job_num']}`).innerHTML = queue[0]['waiting_time']
                parentElement.querySelector(`#memory_${queue[0]['job_num']}`).innerHTML = actual_memory
                queue.shift()
            } else {
                for (var i = 0; i < queue.length; i++) {
                    queue[i]['waiting_time']++
                }
                break
            }
        }

        curr_time += 1
    }
}

function solveHour(job) {
    var time_started = `${job['arrival_time'].split(':')[0]}:`
    var mins = parseInt(job['arrival_time'].split(':')[1]) + job['waiting_time']
    if (mins < 10) {
        time_started += `0${mins}`
    } else {
        time_started += `${mins}`
    }

    job['time_started'] = time_started
    
    job['time_finished'] = parseInt(job['time_started'].split(':')[1]) + job['run_time']

    var hour = parseInt(job['time_started'].split(':')[0])
    mins = parseInt(job['time_started'].split(':')[1]) + job['run_time']
    if (mins > 59) {
        hour += 1
        mins -= 60
    }

    if (mins < 10) {
        mins = `0${mins}`
    } 
    var time_finished = `${hour}:${mins}`

    return [time_started, time_finished]
}

function solveMilli(job) {
    console.log("MILLI")
    var time_started = parseInt(`${job['arrival_time']}`) + job['waiting_time']
    job['time_started'] = time_started
    job['time_finished'] = time_started + job['run_time']
    var time_finished = `${job['time_finished']}`

    return [time_started, time_finished]
}

