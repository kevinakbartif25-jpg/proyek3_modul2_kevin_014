'use strict';

const peserta = [
  { id: 1, nama: 'Alya', prodi: 'Teknik Informatika' },
  { id: 2, nama: 'Bima', prodi: 'Sistem Informasi' },
];

const form = document.querySelector('#form-peserta');
const namaInput = document.querySelector('#nama');
const prodiInput = document.querySelector('#prodi');
const filterInput = document.querySelector('#filter-prodi');
const daftar = document.querySelector('#daftar-peserta');
const status = document.querySelector('#status');
const errorNama = document.querySelector('#error-nama');
const errorProdi = document.querySelector('#error-prodi');

function validasiPeserta(calon) {
  // TODO: return object { valid, errorNama, errorProdi }.
  let valid = true;
  let pesanErrorNama = '';
  let pesanErrorProdi = '';

  if (calon.nama.trim().length < 3) {
    valid = false;
    pesanErrorNama = 'Nama minimal 3 karakter';
  }

  if (calon.prodi.trim() === '') {
    valid = false;
    pesanErrorProdi = 'Program studi wajib dipilih';
  }

  return {
    valid: valid,
    errorNama: pesanErrorNama,
    errorProdi: pesanErrorProdi,
  };
}

function buatKartuPeserta(item) {
  // TODO: buat article, h2, dan p dengan createElement.
  const article = document.createElement('article');
  const judul = document.createElement('h2');
  const deskripsi = document.createElement('p');

  // Isi teks dengan textContent, lalu return article.
  judul.textContent = item.nama;
  deskripsi.textContent = item.prodi;

  article.classList.add('kartu');
  article.append(judul, deskripsi);

  return article;
}

function renderPeserta(data) {
  // TODO: kosongkan daftar, tangani data kosong, lalu append kartu.
  if (data.length === 0) {
    daftar.replaceChildren();
    status.textContent = 'Tidak ada peserta';
    return;
  }

  status.textContent = '';

  const kartuList = data.map((item) => buatKartuPeserta(item));
  daftar.replaceChildren(...kartuList);
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // TODO: baca nilai, validasi, atur aria-invalid dan pesan error.
  const calon = {
    nama: namaInput.value,
    prodi: prodiInput.value,
  };

  const hasil = validasiPeserta(calon);

  namaInput.setAttribute('aria-invalid', hasil.errorNama !== '' ? 'true' : 'false');
  prodiInput.setAttribute('aria-invalid', hasil.errorProdi !== '' ? 'true' : 'false');
  errorNama.textContent = hasil.errorNama;
  errorProdi.textContent = hasil.errorProdi;

  if (!hasil.valid) {
    return;
  }

  // Jika valid, buat object dengan id unik, reset, dan render.
  const idBaru = peserta.length > 0 ? peserta[peserta.length - 1].id + 1 : 1;

  peserta.push({
    id: idBaru,
    nama: calon.nama,
    prodi: calon.prodi,
  });

  form.reset();
  errorNama.textContent = '';
  errorProdi.textContent = '';
  namaInput.setAttribute('aria-invalid', 'false');
  prodiInput.setAttribute('aria-invalid', 'false');
  renderPeserta(peserta);
});

filterInput.addEventListener('change', () => {
  // TODO: jika 'semua' gunakan seluruh peserta; selain itu filter.
  const nilaiFilter = filterInput.value;

  if (nilaiFilter === 'semua') {
    renderPeserta(peserta);
  } else {
    const hasilFilter = peserta.filter((item) => item.prodi === nilaiFilter);
    renderPeserta(hasilFilter);
  }
});

renderPeserta(peserta);