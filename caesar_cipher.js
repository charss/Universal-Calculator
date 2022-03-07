
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

function encrypt() {
    var parentElement = document.querySelector('#' + current_tab);

    let columns = parentElement.querySelectorAll('[class="ciphertext-column"]')
    let encoder_input = parentElement.querySelector('#encoder-text-input')
    let encrypt_shift_input = parentElement.querySelector('#encoder-shift')

    if (encrypt_shift_input.value == '') {
        // Error handling when no input in #encoder-shift
        encrypt_shift_input.classList.add("empty");
        return
    } else {
        encrypt_shift_input.classList.remove("empty");
    }

    for (let i = 0; i < columns.length; i++) {
        let x = (i + parseInt(encrypt_shift_input.value)) % 26
        columns[i].innerHTML = `<span class='letter'>${alphabet[x]}</span><br><span class='subletter'>${x}</span>`
    }

    let to_encode_text = encoder_input.value.replaceAll(' ', '')
    let to_encode_array = []
    let encoded_values = []

    for (let i = 0; i < to_encode_text.length; i += 5) {
        let encoded = ''
        let x = to_encode_text.substring(i, i + 5)
        for (let i = 0; i < x.length; i++) {
            let value = x.charCodeAt(i) - 65 + parseInt(encrypt_shift_input.value) % 26
            encoded += alphabet[value]
            encoded_values.push(value)
        }
        to_encode_array.push(encoded)
    }

    
    let encoded = '' 

    to_encode_array.forEach(element => {
        encoded += element + ' ' 
    });
    

    parentElement.querySelector('#caesar-cipher-result').style.display = 'flex'
    parentElement.querySelector('#encrypted-text').innerHTML = encoded
    parentElement.querySelector('#encrypted-values').innerHTML = (encoded_values).join(', ')
}