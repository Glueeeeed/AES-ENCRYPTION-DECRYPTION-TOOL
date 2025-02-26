// MIT License

// Copyright (c) 2025 Glueeed

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


// ENCRYPTION FORM
function hideIV() {
    let mode = document.getElementById("AESMode").value;
    let form = document.getElementById("iv_form");
    let btn = document.getElementById("iv_btn");
    
    if (mode === "CBC") {
        form.hidden = false;
        btn.hidden = false;
    } else {
        form.hidden = true;
        btn.hidden = true;
    }
}
// DECRYPTION FORM
function dec_hideIV(){
    let dec_mode = document.getElementById("DECAESMode").value;
    let dec_form = document.getElementById("deciv_form")

    if (dec_mode ==="ECB") {
        dec_form.hidden = true;
    } else if (dec_mode === "CBC") {
        dec_form.hidden = false;
    }
}


function hideGenerateBtn(){
    let keytype = document.getElementById("AESKEYTYPE").value;
    let generatekey = document.getElementById("key_btn");
    let keyinput = document.getElementById("AESKey");


    if (keytype === "PBKDF2") {
        generatekey.hidden = true;
        // MAX LENGTH OF PASSWORD
        keyinput.maxLength = "30"; 
        keyinput.placeholder = "Enter password..";

    } else {
        generatekey.hidden = false;
    }
}



function changePlaceholderKeyToPassword() {
    let keytype = document.getElementById("DECAESKEYTYPE").value;
    let keyinput = document.getElementById("decAESKey");

    if (keytype === "DECPBKDF2") {
        keyinput.maxLength = "30";
        keyinput.placeholder = "Enter Password.."
    }
}

// ENCRYPTION FORM

function updatePlaceholder() {
    let keysizeSelect = document.getElementById("KeySize").value;
    let keyinput = document.getElementById("AESKey");
    let button = document.getElementById("generatekey_btn");

    let keySize = keysizeSelect
    if(keySize === "Size") {
        keyinput.placeholder = "Select Key Size..";
        keyinput.maxLength= "0";
        keyinput.readOnly = true;
        button.disabled = true;
    } else if (keySize === "128") {
        keyinput.placeholder = "16 characters long (128-bit)";
        keyinput.maxLength= "16"
        keyinput.readOnly = false;
        button.disabled = false;
    } else if (keySize === "192") {
        keyinput.placeholder = "24 characters long (196-bit)";
        keyinput.maxLength= "24";
        keyinput.readOnly = false;
        button.disabled = false;
    } else if (keySize === "256") {
        keyinput.placeholder = "32 characters long (256-bit)";
        keyinput.maxLength= "32";
        keyinput.readOnly = false; 
        button.disabled = false;
    }
}
// DECRYPTION FORM

function UpdatePlaceholder() {
    let keysizeSelect = document.getElementById("DECKeySize").value;
    let keyinput = document.getElementById("decAESKey");
    let button = document.getElementById("generatekey_btn");

    let keySize = keysizeSelect

    if(keySize === "Size") {
        keyinput.placeholder = "Select Key Size.."
        keyinput.maxLength= "0"
        keyinput.readOnly = true
        button.disabled = true;
        
    } else if (keySize === "128") {
        keyinput.placeholder = "16 characters long (128-bit)"
        keyinput.maxLength= "16"
        keyinput.readOnly = false
        button.disabled = false;
    } else if (keySize === "192") {
        keyinput.placeholder = "24 characters long (196-bit)"
        keyinput.maxLength= "24"
        keyinput.readOnly = false
        button.disabled = false;
    } else if (keySize === "256") {
        keyinput.placeholder = "32 characters long (256-bit)"
        keyinput.maxLength= "32"
        keyinput.readOnly = false
        button.disabled = false;
    }
}

function generateRandom(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(){}[]';
    let charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
     return result;

}

function generateKey() {
    let keysizeSelect = document.getElementById("KeySize").value;
    let keyinput = document.getElementById("AESKey");

    let keySize = keysizeSelect

    if (keySize === "Size") {
        alert("Key size is required!")
    } else if(keySize === "128") {
    keyinput.value = generateRandom(16);
    } else if (keySize === "192") {
    keyinput.value = generateRandom(24);
    } else if (keySize === "256") {
    keyinput.value = generateRandom(32);
}

};

function generateIV() {
    let ivinput = document.getElementById("IV");

    ivinput.value = generateRandom(16)



};



