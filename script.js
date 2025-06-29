// SCRIPT INI DI BUAT DAN DI RAWAT SEPERTI ANAK SENDIRI   "~EJA" //
const lengthSlider = document.querySelector(".pass-length input"),
  options = document.querySelectorAll(".option input"),
  copyIcon = document.querySelector(".input-box span"),
  passwordInput = document.querySelector(".input-box input"),
  passIndicator = document.querySelector(".pass-indicator"),
  generateBtn = document.querySelector(".generate-btn");

const characters = {
  // OBJEK HURUF, ANGKA DAN SIMBOL
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~"
};

const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

  options.forEach((option) => {
    // MENGULANGI MELALUI KOTAK CENTANG PADA SETIAP OPSI YANG DI PILIH
    if (option.checked) {
      // JIKA KOTAK DI CENTANG
      // JIKA KOTAK CENTANG ID BUKAN DUPLIKAT DAN SPASI
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        // MENAMBAHKAN NILAI KUNCI TERTENTU DARI OBJEK KARAKTER KE STATIK SANDI
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        // JIKA ID KOTAK CENTANG ADALAH SPASI
        staticPassword += `  ${staticPassword}  `; // MENAMBAHKAN SPASI DI AWAL & AKHIR KATA SANDI STATIS
      } else {
        // SELAIN ITU BERIKAN NILAI SEBENARNYA UNTUK MENGECUALIKAN DUPLIKAT
        excludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    // MENDAPATKAN KARAKTER ACAK DARI KATA SANDI STATIS
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      // if excludeDuplicate is true
      // KE SPASI " " LALU TAMBAHKAN KARAKTER ACAK KE KATA SANDI ACAK YANG LAIN KURANG i dengan -1
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      // else TAMBAHKAN KARAKTER ACAK KE SANDI ACAK
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword; // MENERUSKAN SANDI ACAK KE NILAI SANDI INPUT
};

const upadatePassIndicator = () => {
  // JIKA NILAI lengthSlider KURANG DARI 8 MAKAN BERIKAN "WEAK" SEBAGAI passIndicator.id JIKA TIDAK lengthSlider
  // NILAINYA KURANG DARI 16 AKAN DIBERIKAN "MEDIUM". SEBAGAI id else pass BERIKAN "STRONG" SEBAGAI id
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

const updateSlider = () => {
  // MENERUSKAN NILAI PENGGESER SEBAGAI TEKS PENGHITUNG
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  upadatePassIndicator();
};
updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value); // SALIN PASSWORD ACAK
  copyIcon.innerText = "check"; // GANTI IKON SALIN MENJADI CENTANG
  copyIcon.style.color = "#4285F4";
  setTimeout(() => {
    // SETELAH 1500ms, IKON BERUBAH KEMBALI MENJADI IKON SALIN
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#707070";
  }, 1500);
};

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);

function myFunction() {
  alert("SIMPAN SANDI KAMU DENGAN AMAN!! JANGAN BERITAHU ORANG LAIN SELAIN KAMU!!           -maseja");
}
