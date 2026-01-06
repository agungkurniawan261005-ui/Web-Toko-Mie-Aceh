document.addEventListener("DOMContentLoaded", function () {
  
  /* =========================================
     FITUR 1: DARK MODE TOGGLE (Semua Halaman)
     ========================================= */
  const toggleButton = document.getElementById("darkModeToggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    if (toggleButton) toggleButton.innerHTML = "☀️";
  }

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        toggleButton.innerHTML = "☀️";
      } else {
        localStorage.setItem("theme", "light");
        toggleButton.innerHTML = "🌙";
      }
    });
  }

  /* =========================================
     FITUR 2: TRIGGER BOOTSTRAP MODAL (Beranda Only)
     ========================================= */
  // Kita cari elemen modal bootstrap-nya
  const myModalEl = document.getElementById('bootstrapPromoModal');
  
  if (myModalEl) {
    // Kita panggil fungsi dari Library Bootstrap
    // (Ini menggunakan 'bootstrap.Modal', jadi bukan JS murni 100%)
    const myModal = new bootstrap.Modal(myModalEl);

    // Munculkan otomatis setelah 2 detik
    setTimeout(() => {
      myModal.show();
    }, 2000);
  }

  /* =========================================
     FITUR 3: KIRIM KE WHATSAPP (VALIDASI + REDIRECT)
     ========================================= */
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Mencegah reload halaman

      // Ambil elemen input
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const msgInput = document.getElementById("message");

      // Reset pesan error
      document.getElementById("errorName").innerText = "";
      document.getElementById("errorEmail").innerText = "";
      document.getElementById("errorMsg").innerText = "";

      let isValid = true;

      // 1. Validasi Nama
      if (nameInput.value.trim() === "") {
        document.getElementById("errorName").innerText = "Nama wajib diisi!";
        isValid = false;
      }

      // 2. Validasi Email
      if (emailInput.value.trim() === "") {
        document.getElementById("errorEmail").innerText = "Email wajib diisi!";
        isValid = false;
      } else if (!emailInput.value.includes("@")) {
        document.getElementById("errorEmail").innerText = "Format email salah!";
        isValid = false;
      }

      // 3. Validasi Pesan
      if (msgInput.value.trim() === "") {
        document.getElementById("errorMsg").innerText = "Pesan tidak boleh kosong!";
        isValid = false;
      }

      // JIKA SEMUA DATA BENAR, KIRIM KE WA
      if (isValid) {
        
        // --- KONFIGURASI WHATSAPP ---
        const nomorWA = "6288219624215"; // Ganti dengan nomor WA Pemilik (Gunakan 62, jangan 08)
        
        // Ambil data dari form
        const nama = nameInput.value;
        const email = emailInput.value;
        const pesan = msgInput.value;

        // Susun pesan untuk WA (gunakan %0A untuk baris baru/enter)
        const teksWA = `Halo Admin Mie Aceh Cut Aliya,%0A%0ASaya ingin bertanya.%0A%0ANama: ${nama}%0AEmail: ${email}%0A%0APesan:%0A${pesan}`;

        // Buat Link WA
        const linkWA = `https://wa.me/${nomorWA}?text=${teksWA}`;

        // Buka WhatsApp di tab baru
        window.open(linkWA, "_blank");

        // Bersihkan form dan karakter counter
        contactForm.reset();
        const charCount = document.getElementById("charCount");
        if (charCount) charCount.innerText = "0 / 100 Karakter";
      }
    });
  }

  /* =========================================
     FITUR 4: CHARACTER COUNTER (Kontak Only)
     ========================================= */
  const msgInput = document.getElementById("message");
  const charCount = document.getElementById("charCount");

  if (msgInput && charCount) {
    msgInput.addEventListener("input", function () {
      const currentLength = msgInput.value.length;
      
      charCount.innerText = `${currentLength} / 100 Karakter`;

      if (currentLength === 100) {
        charCount.style.color = "red";
        charCount.style.fontWeight = "bold";
      } else {
        charCount.style.color = "#6c757d"; 
        charCount.style.fontWeight = "normal";
      }
    });
  }

});