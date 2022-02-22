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

    if (tabIndex.id.substring(3) == 1) {
        
    }
}

function addTab() {
    var tab_count = document.getElementById('all-tab-buttons').getElementsByTagName('div').length

    // Currently maximum 10 tabs allows for design issues
    if (tab_count > 10) {
        return
    }

    // Adding a tab
    var div_button = document.createElement("div");
    div_button.innerHTML += "Tab " + (tab_count); 
    div_button.setAttribute('class', 'tab')
    div_button.setAttribute('id', `tab${tab_count}`)
    div_button.setAttribute('onclick', 'selectTab(this)')

    // let insertedNode = parentNode.insertBefore(newNode, referenceNode)

    // document.getElementById('all-tab-buttons').appendChild(div_button);
    // div_button.insertBefore(document.getElementById('addTab'))
    document.getElementById('all-tab-buttons').insertBefore(div_button, document.getElementById('addTab'))

    // Adding the content
    var div = document.createElement("div");
    

    // element.appendChild(document.createTextNode('The man who mistook his wife for a hat'));
    div.innerHTML += "This is the content of Tab " + (tab_count); 
    div.setAttribute('class', 'content')
    div.setAttribute('id', `tabContent${tab_count}`)

    var values = ["dog", "cat", "parrot", "rabbit"];

    var select = document.createElement("select");
    select.name = "pets";
    select.id = "select" + tab_count
    select.setAttribute('onchange', 'test(this)')

    for (const val of values)
    {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
        select.appendChild(option);
    }

    var label = document.createElement("label");
    label.innerHTML = "Choose your pets: "
    label.htmlFor = "pets";

    div.appendChild(label).appendChild(select);

    div.style.display = 'none';

    document.getElementById('all-tab-contents').appendChild(div);

    selectTab(div_button)
}


function test(element) {
    console.log(element.id.substring(6))
    var x = `#tabContent${element.id.substring(6)}`
    $(x).load("index.html");

}