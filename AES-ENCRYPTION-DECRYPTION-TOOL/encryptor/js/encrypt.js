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


const publicKeyPEM = `enter your public key here`;

// Function responsible for validating user input data for encryption (CBC MODE)
function validateInputCBC(input,keyinput,ivinput,requiredkeysize) {
    if (!input) {
        alert("The text for encryption cannot be empty!");
        return false;
      } else if (!keyinput) {
        alert("The key cannot be empty!");
        return false;
      } else if (!ivinput) {
        alert("The IV cannot be empty!");
        return false;
      } else if (input.length > 10000) {
        alert("The Text cannot be more than 10000 characters long!");
        return false;
      } else if (keyinput.length !== requiredkeysize) {
        alert(`The Key should be ${requiredkeysize} characters long!`);
        return false;
      } else if (ivinput.length !== 16) {
        alert("The Initializator Vector should be 16 characters long!");
        return false;
      }
      return true;
}

//  (ECB MODE)
function validateInputECB(input,keyinput,requiredkeysize) {
    if (!input) {
        alert("The text for encryption cannot be empty!");
        return false;
      } else if (!keyinput) {
        alert("The key cannot be empty!");
        return false;
      } else if (input.length > 10000) {
        alert("The Text cannot be more than 10000 characters long!");
        return false;
      } else if (keyinput.length !== requiredkeysize) {
        alert(`The Key should be ${requiredkeysize} characters long!`);
        return false;
      }
      return true;
}

//  (CBC MODE) with PBKDF2
function validateInputPBDKF2CBC(input,keyinput,ivinput) {

    let uppercaseRegex = /[A-Z]/;
    let lowercaseRegex = /[a-z]/;
    let numbersRegex = /[0-9]/;
    let polishRegex = /[ąćęłńóśżźĄĆĘŁŃÓŚŻŹ]/;

    if (!input) {
        alert("The text for encryption cannot be empty!");
        
        console.log("The text for encryption cannot be empty!");
        return false;
      } else if (!keyinput) {
        alert("The key cannot be empty!");
        console.log("The key cannot be empty!");
        return false;
      } else if (!ivinput) {
        alert("The IV cannot be empty!");
        console.log("The IV cannot be empty!");
        return false;
      } else if (ivinput.length !== 16) {
        alert("The Initializator Vector should be 16 characters long!");
        console.log("The Initializator Vector should be 16 characters long!");
        return false;
        }else if (input.length > 10000) {
        alert("The Text cannot be more than 10000 characters long!");
        console.log("The Text cannot be more than 10000 characters long!");
        return false;
      } else if (!keyinput.match(lowercaseRegex) || !keyinput.match(uppercaseRegex) || !keyinput.match(numbersRegex) || keyinput.length < 8 || keyinput.match(polishRegex)) {
        alert(`The password should consist of at least 8 characters, include both lowercase and uppercase letters, and not contain Polish characters (ąćęłńóśżźĄĆĘŁŃÓŚŻŹ).`);
        console.log(`The password should consist of at least 8 characters, include both lowercase and uppercase letters, and not contain Polish characters (ąćęłńóśżźĄĆĘŁŃÓŚŻŹ).`);
        return false;
      }
      return true;

}

//  (ECB MODE) with PBKDF2
function validateInputPBDKF2EBC(input,keyinput,ivinput) {

    let uppercaseRegex = /[A-Z]/;
    let lowercaseRegex = /[a-z]/;
    let numbersRegex = /[0-9]/;
    let polishRegex = /[ąćęłńóśżźĄĆĘŁŃÓŚŻŹ]/;

    if (!input) {
        alert("The text for encryption cannot be empty!");
        return false;
      } else if (!keyinput) {
        alert("The key cannot be empty!");
        return false;
      } else if (input.length > 10000) {
        alert("The Text cannot be more than 10000 characters long!");
        return false;
      } else if (!keyinput.match(lowercaseRegex) || !keyinput.match(uppercaseRegex) || !keyinput.match(numbersRegex) || keyinput.length < 8 || keyinput.match(polishRegex)) {
        alert(`The password should consist of at least 8 characters, include both lowercase and uppercase letters, and not contain Polish characters (ąćęłńóśżźĄĆĘŁŃÓŚŻŹ).`);
        return false;
      }
      return true;

}
// Function responsible for sending the encrypted key and IV to the server and receiving the encryption result

function encryptData(input,keyinput,ivinput,keysize,mode,keytype) {
    let publicKey = forge.pki.publicKeyFromPem(publicKeyPEM);
    let encrypted_Key = publicKey.encrypt(keyinput);
    let encrypted_IV = publicKey.encrypt(ivinput);

    fetch("https://glueeeed.pl:3000/api/encrypt", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: input,
          keysize: keysize,
          mode: mode,
          keyinput: encrypted_Key,
          ivinput: encrypted_IV,
          keyType: keytype,
        }),
      })
        .then((response) => response.json()) 
        .then((data) => {
          document.getElementById("EncryptedText").value = data.response;
        });
}


function encrypt() {
    let input = document.getElementById("InputText").value;
    let keyinput = document.getElementById("AESKey").value;
    let ivinput = document.getElementById("IV").value;
    let keysize = parseInt(document.getElementById("KeySize").value);
    let mode = document.getElementById("AESMode").value;
    let keytype = document.getElementById("AESKEYTYPE").value;

    //  Checking keysize and setting required keysize
    let requiredkeysize;
    switch (keysize) {
      case 128:
        requiredkeysize = 16;
        break;
      case 192:
        requiredkeysize = 24;
        break;
      case 256:
        requiredkeysize = 32;
        break;
      default:
        alert("Invalid key size!");
        return;
    }

    if (keytype === "CUSTOM") {
        if (mode === "CBC") {
            if (validateInputCBC(input,keyinput,ivinput,requiredkeysize)) {
                encryptData(input,keyinput,ivinput,keysize,mode,keytype);
            }
        } else if (mode === "ECB") {
            if (validateInputECB(input,keyinput,requiredkeysize)) {
                encryptData(input,keyinput,ivinput,keysize,mode,keytype);
            }
        }
    } else if (keytype === "PBKDF2") {
        if (mode === "CBC" && validateInputPBDKF2CBC(input,keyinput,ivinput)) {
            encryptData(input,keyinput,ivinput,keysize,mode,keytype);
        } else if (mode === "ECB" && validateInputPBDKF2EBC(input,keyinput,ivinput)) {
            encryptData(input,keyinput,ivinput,keysize,mode,keytype);
        }
    }
}