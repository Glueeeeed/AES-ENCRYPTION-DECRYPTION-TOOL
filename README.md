# AES Encryptor 🔒

A cool web app for encrypting and decrypting text with AES, built from scratch by a self-taught teen coder.

## What’s This About?
AES Encryptor is my first big project—a tool that lets you encrypt and decrypt text using the AES algorithm. It keeps your keys and IVs safe with RSA encryption before sending them to the server. I created it to dive into web development, cryptography, and APIs, learning everything on my own outside school. Whether you’re securing a secret message or just playing with code, this app’s got you covered!

**Preview**
![Example screenshot](https://glueeeed.pl/encryptor.png)

## ● Features
- **Encryption & Decryption**: Supports AES-CBC and AES-ECB modes.
- **Key Options**: Use your own key (CUSTOM) or generate one with PBKDF2.
- **Secure Key Transfer**: RSA encryption for keys and IVs.
- **Client-Side Checks**: Built-in validation to catch mistakes early.
- **Responsive Design**: Works on any screen size.
- **Full Backend**: Powered by Node.js with HTTPS for safety.

## ● How to Run It
1. **What You Need**:
   - Node.js (v16+ recommended)
   - A web browser
2. **Setup**:
   ```bash
   # Clone this repository
   git clone https://github.com/Glueeeeed/AES-ENCRYPTION-DECRYPTION-TOOL.git
   # Go into the repository
   cd AES-ENCYRPTION-DECRYPTION-TOOL
   # Install dependencies
   npm install

3. **Start the server**
   ```bash
    npm start
 
4. ***IMPORTANT***

    *If you want to use the code, replace the placeholders with your own data. Look for comments like "Enter your private key here" or "Enter your certificate path" in server.js, encrypt.js, and decrypt.js.*

## ● Tech Stack
- **Backend**: `Node.js, Express, CryptoJS`
- **Frontend**: `HTML, JavaScript , Forge (RSA)`
- **Seciurity**: `HTTTPS with Let's Encrypt certificates`

## ● Status
This is a fully working project—both encryption (`/api/encrypt`) and decryption (`/api/decrypt`) are ready to go. It’s my early take on crypto tools, later rewritten with `ECDH` and `Argon2` (**SOON**).

## ● License
Licensed under the MIT License—see the [LICENSE](LICENSE) file for details. Feel free to use, tweak, or share it, just keep the copyright notice!







