'use strict';

const navToggle = document.querySelector('#nav-toggle');
const siteNav = document.querySelector('.site-nav');

navToggle.addEventListener('click', () => {
  const terbuka = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!terbuka));
  siteNav.classList.toggle('nav-open');
});

const fiturData = [
  { nama: 'Workshop', deskripsi: 'Latihan praktis dengan topik teknologi, desain, dan karier.' },
  { nama: 'Komunitas', deskripsi: 'Ruang diskusi, kolaborasi, dan membangun koneksi baru.' },
  { nama: 'Challenge', deskripsi: 'Uji kemampuan dan bawa pulang pengalaman yang nyata.' },
];

const daftarFitur = document.querySelector('#daftar-fitur');

function renderFitur(data) {
  const kartuList = data.map((item) => {
    const article = document.createElement('article');
    article.classList.add('feature-card');

    const judul = document.createElement('h3');
    judul.textContent = item.nama;

    const deskripsi = document.createElement('p');
    deskripsi.textContent = item.deskripsi;

    article.setAttribute('data-kategori', item.nama.toLowerCase());
    article.append(judul, deskripsi);
    return article;
  });

  daftarFitur.replaceChildren(...kartuList);
}

renderFitur(fiturData);

const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.remove('filter-aktif'));
    btn.classList.add('filter-aktif');

    const nilai = btn.dataset.filter;

    if (nilai === 'semua') {
      renderFitur(fiturData);
    } else {
      const hasil = fiturData.filter((item) => item.nama.toLowerCase() === nilai);
      renderFitur(hasil);
    }
  });
});

// ==================== FAQ ACCORDION ====================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const tombol = item.querySelector('.faq-tombol');
  const jawaban = item.querySelector('.faq-jawaban');

  tombol.addEventListener('click', () => {
    const terbuka = tombol.getAttribute('aria-expanded') === 'true';

    faqItems.forEach((el) => {
      el.querySelector('.faq-tombol').setAttribute('aria-expanded', 'false');
      el.querySelector('.faq-jawaban').hidden = true;
    });

    if (!terbuka) {
      tombol.setAttribute('aria-expanded', 'true');
      jawaban.hidden = false;
    }
  });
});

const form = document.querySelector('#form-kontak');
const inputNama = document.querySelector('#kontak-nama');
const inputEmail = document.querySelector('#kontak-email');
const inputPesan = document.querySelector('#kontak-pesan');
const errorNama = document.querySelector('#error-nama');
const errorEmail = document.querySelector('#error-email');
const errorPesan = document.querySelector('#error-pesan');
const pesanSukses = document.querySelector('#pesan-sukses');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  let valid = true;

  if (inputNama.value.trim() === '') {
    errorNama.hidden = false;
    inputNama.setAttribute('aria-invalid', 'true');
    valid = false;
  } else {
    errorNama.hidden = true;
    inputNama.setAttribute('aria-invalid', 'false');
  }

  if (inputEmail.value.trim() === '') {
    errorEmail.hidden = false;
    inputEmail.setAttribute('aria-invalid', 'true');
    valid = false;
  } else {
    errorEmail.hidden = true;
    inputEmail.setAttribute('aria-invalid', 'false');
  }

  if (inputPesan.value.trim() === '') {
    errorPesan.hidden = false;
    inputPesan.setAttribute('aria-invalid', 'true');
    valid = false;
  } else {
    errorPesan.hidden = true;
    inputPesan.setAttribute('aria-invalid', 'false');
  }

  if (valid) {
    pesanSukses.hidden = false;
    form.reset();
  }
});

const tombolAtas = document.querySelector('#ke-atas');

window.addEventListener('scroll', () => {
  tombolAtas.hidden = window.scrollY < 300;
});

tombolAtas.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

//theme
const tombolTema = document.querySelector('#toggle-tema');

tombolTema.addEventListener('click', () => {
  document.body.classList.toggle('tema-gelap');
  const gelap = document.body.classList.contains('tema-gelap');
  tombolTema.textContent = gelap ? 'Tema Terang' : 'Tema Gelap';
});