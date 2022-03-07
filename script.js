var current_tab = 'tabContent1'
var calcu_list = [
    "-----------------",
    "Memory Allocation - Variable Partition",
    "Caesar Cipher",
    "Inverse Modulo",
    "Page Replacement Algorithms",
];

function selectTab(tabIndex) {
    //Hide All Tabs
    var tab_contents = document.querySelectorAll('[class="content"]');
    for (var i = 0; i < tab_contents.length; i++) {
        document.getElementById(tab_contents[i].id).style.display = "none";
        document.getElementById('tab' + tab_contents[i].id.substring(10)).classList.remove('selected')
    }

    //Show the Selected Tab
    document.getElementById('tab' + 'Content' + tabIndex.id.substring(3)).style.display = "block";  
    document.getElementById('tab' + tabIndex.id.substring(3)).classList.add('selected')
    current_tab = `tabContent${tabIndex.id.substring(3)}`

    if (tabIndex.id.substring(3) == 1) {
        
    }
}

function addTab() {
    var tab_count = document.getElementById('all-tab-buttons').getElementsByClassName('tab').length + 1

    // Currently maximum 10 tabs allows for design issues
    if (tab_count > 10) {
        return
    }

    // Adding a tab
    var div_button = document.createElement("div");
    var div_button_name = document.createElement("div");
    var tab_close_button = document.createElement('button')

    tab_close_button.setAttribute('class', 'icon-button')
    tab_close_button.innerHTML = '<i class="bi bi-x-lg"></i>'

    div_button_name.setAttribute('id', `tabname${tab_count}`)
    div_button_name.innerHTML += "Tab " + (tab_count); 

    div_button.appendChild(div_button_name)
    div_button.appendChild(tab_close_button)

    
    div_button.setAttribute('class', 'tab')
    div_button.setAttribute('id', `tab${tab_count}`)
    div_button.setAttribute('onclick', 'selectTab(this)')
    document.getElementById('all-tab-buttons').insertBefore(div_button, document.getElementById('addTab'))

    // Adding the content
    var div = document.createElement("div");
    
    div.setAttribute('class', 'content')
    div.setAttribute('id', `tabContent${tab_count}`)

    var div_header = document.createElement('div');

    var select = document.createElement("select");
    select.name = "calcu";
    select.id = "select" + tab_count
    select.setAttribute('class', 'calcu-select form-control form-select')
    select.setAttribute('onchange', 'redirect(this, this.value)')

    for (const val of calcu_list) {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
        select.appendChild(option);
    }

    div_header.appendChild(select);


    var div_include = document.createElement("div");
    
    div_include.setAttribute('id', `divInclude${tab_count}`)

    div.appendChild(div_header)
    div.appendChild(div_include)
    document.getElementById('all-tab-contents').appendChild(div);
    div.style.display = 'none';

    selectTab(div_button)
}


function redirect(element, select_value) {
    var x = `#divInclude${element.id.substring(6)}`

    if (select_value == 'Memory Allocation - Variable Partition') {
        $(x).load("memory_alloc.html");
    } else if (select_value == 'Caesar Cipher') {
        $(x).load("caesar_cipher.html");
    } else if (select_value == 'Page Replacement Algorithms') {
        $(x).load("page_replacements.html");
    } else {
        x.innerHTML = ''
    }
    document.getElementById('tabname' + element.id.substring(6)).innerHTML = select_value
}

function check(element) {
    if (element.value == '') {
        element.classList.add("empty");
    } else {
        element.classList.remove("empty");
        
    }
}