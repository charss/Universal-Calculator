

function initialTable() {
    const parentElement = document.querySelector('#' + current_tab);
    const re = /[\d]+/g;

    

    let string_input = parentElement.querySelector('#string-input').value
    let ref_string = string_input.match(re)

    let frame_count = parentElement.querySelector('#frame-count').value
    let table = parentElement.querySelector('#table')
    // table.innerHTML = ''
    let table_header = parentElement.querySelector('#thead')
    let table_body = parentElement.querySelector('#tbody')
    

    // let row = table_header.insertRow(-1);
    let row = table_header.insertRow(-1)

    let headerCell = document.createElement("th");
    headerCell.innerText = '';

    row.setAttribute('id', 'ref_string_row')
    row.appendChild(headerCell);

    // row.insertCell(0)

    for (let i = 0; i < ref_string.length; i++) {
        let headerCell = document.createElement("th");
        headerCell.innerText = ref_string[i];
        row.appendChild(headerCell);
    }

    let row_count = table.rows.length
    for (let i = 0; i < frame_count; i++) {
        row_count = table.rows.length;
        // let row = table_body.insertRow(-1);
        let row = table_body.insertRow(-1);
        console.log(row)
        row.setAttribute('id', 'frame' + (row_count - 1));
        row.insertCell(0).innerHTML = `<b>${row_count - 1}</b>`
    }
    

    let algo = parentElement.querySelector('#select-algo').value
    if (algo == 'fifo') {
        fifoAlgo(parentElement, ref_string, row_count)
    } else if (algo == 'optimal') {
        optimalAlgo(parentElement, ref_string, row_count)
    } else {
        lruAlgo(parentElement, ref_string, row_count)
    }
}

function addFrame() {
    // const parentElement = document.querySelector('#' + current_tab);
    let ref_string = document.querySelector('#string-input').textContent.replaceAll(' ', '').split(',')
    let unique = [...new Set(ref_string)];
    let table = document.querySelector('#table')
    let row_count = table.rows.length

    if (row_count > unique.length) {
        return
    }

    table.innerHTML = ''


    let row = table.insertRow(-1);
    row.setAttribute('id', 'ref_string_row')

    row.insertCell(0)

    for (let i = 0; i < ref_string.length; i++) {
        let cell = row.insertCell(-1)
        cell.innerText = ref_string[i]
    }

    let frame_count = row_count
    for (let i = 0; i < frame_count; i++) {
        row_count = table.rows.length
        row = table.insertRow(-1);
        row.setAttribute('id', 'frame' + (row_count - 1));
        row.insertCell(0).innerText = row_count - 1
    }
    

    fifoAlgo(ref_string, row_count)
}

function fifoAlgo(parentElement, ref_string, frame_count) {
    let framesArray = []
    let pageHits = 0
    let pageFaults = 0
    let q = new Queue();
    for (let i = 0; i < frame_count; i++) {
        framesArray.push('')
        q.enqueue(i)
    }

    for (let i = 0; i < ref_string.length; i++) {
        let element = ref_string[i]
        let position = -1
        let classToAdd = 'page-fault'
        
        if (framesArray.includes(element)) {
            position = framesArray.indexOf(element)
            classToAdd = 'page-hit'
            pageHits++
        } else {
            position = q.peek()
            q.dequeue()
            q.enqueue(position)
            pageFaults += 1
        }

        for (let j = 0; j < framesArray.length; j++) {
            if (j == position) {
                let cell = parentElement.querySelector(`#frame${position}`).insertCell(-1)
                cell.classList.add(classToAdd)
                cell.innerText = element
                framesArray[j] = element
            } else if (j != position) {
                let cell = parentElement.querySelector(`#frame${j}`).insertCell(-1)
                cell.innerText = framesArray[j]
            }
        }
    }

    parentElement.querySelector('#page-hits').innerText = pageHits
    parentElement.querySelector('#page-faults').innerText = pageFaults
}

function optimalAlgo(parentElement, ref_string, frame_count) {
    let framesArray = []
    let inFrame = []
    let framesDict = {}
    let pageHits = 0
    let pageFaults = 0
    let q = new Queue();

    for (let i = 0; i < frame_count; i++) {
        q.enqueue(i)
    }

    for (let i = 0; i < ref_string.length; i++) {
        let element = ref_string[i]
        let position = -1
        let classToAdd = 'page-fault'
        
        if (inFrame.includes(element)) {
            position = inFrame.indexOf(element)
            framesArray[position] = `${element}~${ref_string.indexOf(element, i + 1)}`
            classToAdd = 'page-hit'
            pageHits++
        } else if (inFrame.length < frame_count) {
            position = q.peek()
            q.dequeue()
            q.enqueue(position)
            framesArray.push(`${element}~${ref_string.indexOf(element, i + 1)}`)
            inFrame.push(element)
            pageFaults += 1
        } else {
            let highest = 0
            let to_change = ''
            framesArray.forEach(element => {
                if (element.split('~')[1] == '-1') {
                    highest = 100000
                    to_change = element
                } else if (highest < parseInt(element.split('~')[1])) {
                    highest = parseInt(element.split('~')[1])
                    to_change = element
                }
            });

            position = framesArray.indexOf(to_change)

            framesArray[position] = `${element}~${ref_string.indexOf(element, i + 1)}`
            inFrame[position] = element
            pageFaults += 1
        }

        for (let j = 0; j < frame_count; j++) {
            if (j == position) {
                let cell = parentElement.querySelector(`#frame${position}`).insertCell(-1)
                cell.classList.add(classToAdd)
                cell.innerText = element
            } else if (j != position) {
                let cell = parentElement.querySelector(`#frame${j}`).insertCell(-1)
                if (framesArray[j] != undefined) {
                    cell.innerText = framesArray[j].split('~')[0]
                } else {
                    cell.innerText = ''

                }
            }
        }

        parentElement.querySelector('#page-hits').innerText = pageHits
        parentElement.querySelector('#page-faults').innerText = pageFaults
    }
}

function lruAlgo(parentElement, ref_string, frame_count) {
    let framesArray = []
    let inFrame = []
    let pageHits = 0
    let pageFaults = 0
    let q = new Queue();

    for (let i = 0; i < frame_count; i++) {
        q.enqueue(i)
    }

    for (let i = 0; i < ref_string.length; i++) {
        let element = ref_string[i]
        let position = -1
        let classToAdd = 'page-fault'
        
        if (inFrame.includes(element)) {
            position = inFrame.indexOf(element)
            framesArray[position] = `${element}~0`
            classToAdd = 'page-hit'
            pageHits++
        } else if (inFrame.length < frame_count) {
            position = q.peek()
            q.dequeue()
            q.enqueue(position)
            framesArray.push(`${element}~0`)
            inFrame.push(element)
            pageFaults += 1
        } else {
            let highest = -1
            let to_change = ''

            framesArray.forEach(element => {
                if (element.split('~')[1] == '-1') {
                    highest = 100000
                    to_change = element
                } else if (highest < parseInt(element.split('~')[1])) {
                    highest = parseInt(element.split('~')[1])
                    to_change = element
                }
            });

            position = framesArray.indexOf(to_change)

            framesArray[position] = `${element}~0`
            inFrame[position] = element
            pageFaults += 1
        }

        for (let j = 0; j < frame_count; j++) {
            if (j == position) {
                let cell = parentElement.querySelector(`#frame${position}`).insertCell(-1)
                cell.classList.add(classToAdd)
                cell.innerText = element
                // framesArray[j] = `${element}~${ref_string.indexOf(element, i + 1)}`  
            } else if (j != position) {
                let cell = parentElement.querySelector(`#frame${j}`).insertCell(-1)
                if (framesArray[j] != undefined) {
                    cell.innerText = framesArray[j].split('~')[0]
                    framesArray[j].split('~')[0]
                    framesArray[j] = `${framesArray[j].split('~')[0]}~${parseInt(framesArray[j].split('~')[1]) + 1}`
                } else {
                    cell.innerText = ''
                }
            }
        }

        parentElement.querySelector('#page-hits').innerText = pageHits
        parentElement.querySelector('#page-faults').innerText = pageFaults
    }
}

function Queue() {
  this.elements = [];
}

Queue.prototype.enqueue = function (e) {
  this.elements.push(e);
};

Queue.prototype.dequeue = function () {
    return this.elements.shift();
};

Queue.prototype.isEmpty = function () {
    return this.elements.length == 0;
};

Queue.prototype.peek = function () {
    return !this.isEmpty() ? this.elements[0] : undefined;
};

Queue.prototype.length = function () {
  return this.elements.length;
};