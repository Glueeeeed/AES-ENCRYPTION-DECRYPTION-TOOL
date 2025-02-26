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


// If you want to use the code, you need to replace the placeholders with your own data. The placeholders are marked with the comment "Enter your private key here" or "Enter your certificate path".



// ====================
// LIBRARIES
// ====================

const express = require("express");
const cors = require("cors");
const CryptoJS = require("crypto-js");
const https = require("https");
const fs = require("fs");
const forge = require("node-forge");

const app = express();
const port = 3000;

// ====================
// CERTIFICATE SSL
// ====================


const options = {
  key: fs.readFileSync("Enter your private key path"),
  cert: fs.readFileSync("Enter your certificate path"),
  ca: fs.readFileSync("Enter your ca path"),
};

// ====================
// RSA PRIVATE KEY
// ====================
const privatePem = `Enter your private key here`;
const privateKey = forge.pki.privateKeyFromPem(privatePem);


// If you want host the server on your own domain, you need to replace the origin in the corsOptions object with your domain. The origin is marked with the comment "https://yourdomain.com" or you can remove the corsOptions object and the cors middleware.
const corsOptions = {
  origin: "https://yourdomain.com",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

// ====================
// ENCRYPTION
// ====================
app.post("/api/encrypt", (req, res) => {
  // ====================
  // Receiving data from the client
  // ====================

  const input = req.body.input;
  const keyinput = req.body.keyinput;
  const ivinput = req.body.ivinput;
  const keysize = req.body.keysize;
  const mode = req.body.mode;
  const keytype = req.body.keyType;

  // ====================
  // DECRYPTING DATA
  // ====================
  const decrypted_data_key = privateKey.decrypt(keyinput);
  const key = CryptoJS.enc.Hex.parse(decrypted_data_key);

  // ====================
  // LOGS
  // ====================
  console.log("===================    AES ENCRYPTOR   ====================");
  console.log("Started encrypting data...");
  console.log("Received data:");
  console.log(`KeySize: ${keysize}`);
  console.log(`KeyType: ${keytype}`);
  console.log(`Mode: ${mode}`);

  // ====================
  // CUSTOM KEY
  // ====================
  if (keytype === "CUSTOM") {
    // ====================
    // CBC
    // ====================
    if (mode === "CBC") {
      const decrypted_data_iv = privateKey.decrypt(ivinput);
      const iv = CryptoJS.enc.Hex.parse(decrypted_data_iv);
      const encrypted = CryptoJS.AES.encrypt(input, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        keySize: keysize / 32,
      });
      const encryptedText = encrypted.toString();

      console.log(`Successfully encrypted data`);
      console.log("=======================================================");

      res.json({ response: encryptedText });

      // ====================
      // ECB
      // ====================
    } else if (mode === "ECB") {
      const encrypted = CryptoJS.AES.encrypt(input, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
        keySize: keysize / 32,
      });

      const encryptedText = encrypted.toString();

      console.log(`Successfully encrypted data`);
      console.log("=======================================================");

      res.json({ response: encryptedText });
    }
  } else {
    // ====================
    // PBKDF2
    // ====================
    if (mode === "CBC") {
      // ====================
      // CBC
      // ====================
      const salt = CryptoJS.lib.WordArray.random(16).toString();
      const decrypted_data_iv = privateKey.decrypt(ivinput);
      const iv = CryptoJS.enc.Hex.parse(decrypted_data_iv);

      const password = CryptoJS.PBKDF2(key, salt, {
        keySize: keysize / 32,
        iterations: 10000,
      });

      const encrypted = CryptoJS.AES.encrypt(input, password, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        keySize: keysize / 32,
      });
      const encryptedText = encrypted.toString();
      const result = encryptedText + "::" + salt;
      console.log(`Password ${password}`);
      console.log(`Salt: ${salt}`);
      console.log(`Successfully encrypted data`);
      console.log("=======================================================");

      res.json({ response: result });
    } else if (mode === "ECB") {
      // ====================
      // ECB
      // ====================
      const salt = CryptoJS.lib.WordArray.random(16).toString();

      const password = CryptoJS.PBKDF2(key, salt, {
        keySize: keysize / 32,
        iterations: 10000,
      });

      const encrypted = CryptoJS.AES.encrypt(input, password, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
        keySize: keysize / 32,
      });

      const encryptedText = encrypted.toString();
      const result = encryptedText + "::" + salt;
      console.log(`Salt: ${salt}`);
      console.log(`Successfully encrypted data`);
      console.log("=======================================================");

      res.json({ response: result });
    }
  }
});

app.post("/api/decrypt", (req, res) => {
  //  ====================
  // Receiving data from the client
  // ====================

  const decinput = req.body.input;
  const deckeyinput = req.body.deckeyinput;
  const decivinput = req.body.IVinput;
  const deckeysize = req.body.keysize;
  const decmode = req.body.mode;
  const deckeytype = req.body.keyType;

  // ====================
  // LOGS
  // ====================
  console.log("===================    AES DECRYPTOR   ====================");
  console.log("Started decrypting data...");
  console.log("Received data:");
  console.log(`KeySize: ${deckeysize}`);
  console.log(`KeyType: ${deckeytype}`);
  console.log(`Mode: ${decmode}`);
  console.log(`Input: ${decinput}`);

  // ====================
  // DECRYPTING DATA
  // ====================
  if (deckeytype === "DECCUSTOM") {
    const decrypted_key = privateKey.decrypt(deckeyinput);
    const deckey = CryptoJS.enc.Hex.parse(decrypted_key);

    // ====================
    // CBC
    // ====================
    if (decmode === "CBC") {
      const decrypted_iv = privateKey.decrypt(decivinput);
      const deciv = CryptoJS.enc.Hex.parse(decrypted_iv);
      const decrypted = CryptoJS.AES.decrypt(decinput, deckey, {
        iv: deciv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        keySize: deckeysize / 32,
      });

      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      if (!decryptedText) {
        console.log(`Failed to decrypt data`);
        console.log(`====================================`);
        res.json({ response: `Error: Failed decrypt` });
      } else {
        res.json({ response: decryptedText });
        console.log(`====================================`);
      }

      // ====================
      // ECB
      // ====================
    } else {
      const decrypted = CryptoJS.AES.decrypt(decinput, deckey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
        keySize: deckeysize / 32,
      });
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      if (!decryptedText) {
        console.log(`Failed to decrypt data`);
        console.log(`====================================`);
        res.json({ response: `Error: Failed decrypt` });
      } else {
        res.json({ response: decryptedText });
        console.log(`====================================`);
      }
    }

    // ====================
    // PBKDF2
    // ====================
  } else if (deckeytype === "DECPBKDF2") {
    let [Encrypted_input, salt] = decinput.split("::");

    console.log(`Salt: ${salt}`);
    const decrypted_key = privateKey.decrypt(deckeyinput);
    const deckey = CryptoJS.enc.Hex.parse(decrypted_key);

    const password = CryptoJS.PBKDF2(deckey, salt, {
      keySize: deckeysize / 32,
      iterations: 10000,
    });

    // ====================
    // CBC
    // ====================
    if (decmode === "CBC") {
      const decrypted_iv = privateKey.decrypt(decivinput);
      const deciv = CryptoJS.enc.Hex.parse(decrypted_iv);
      const decrypted = CryptoJS.AES.decrypt(Encrypted_input, password, {
        iv: deciv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        keySize: deckeysize / 32,
      });
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      if (!decryptedText) {
        console.log(`Failed to decrypt data`);
        console.log(`Password ${password}`);
        console.log(`====================================`);
        res.json({ response: `Error: Failed decrypt` });
      } else {
        res.json({ response: decryptedText });
        console.log(`====================================`);
      }

      // ====================
      // ECB
      // ====================
    } else {
      let [Encrypted_input, salt] = decinput.split("::");
      const password = CryptoJS.PBKDF2(deckey, salt, {
        keySize: deckeysize / 32,
        iterations: 10000,
      });

      const decrypted = CryptoJS.AES.decrypt(Encrypted_input, password, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
        keySize: deckeysize / 32,
      });
      const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
      if (!decryptedText) {
        console.log(`Failed to decrypt data`);
        console.log(`====================================`);
        res.json({ response: `Error: Failed decrypt` });
      } else {
        res.json({ response: decryptedText });
        console.log(`====================================`);
      }
    }
  }
});

// if you want to host the server locally change https://yourdomain.com:${port} to http://localhost:${port}
https.createServer(options, app).listen(port, "0.0.0.0", () => {
  console.log(`Server is running at https://yourdomain.com:${port}`);
});
