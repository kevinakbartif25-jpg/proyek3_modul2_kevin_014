'use strict';

const status = document.querySelector('#status');
const daftar = document.querySelector('#daftar-materi');
const tombolMuat = document.querySelector('#muat');
const tombolCobaLagi = document.querySelector('#coba-lagi');

function aturState(state, pesan) {
  status.dataset.state = state;
  status.textContent = pesan;
  tombolCobaLagi.hidden = state !== 'error';
}

async function ambilMateri() {
  // TODO: fetch data/materi.json.
  const response = await fetch('./data/ateri.json');

  // TODO: jika response.ok false, throw Error yang informatif.
  if (!response.ok) {
    throw new Error(`Gagal memuat data. Status ${response.status} ${response.statusText}`);
  }

  // TODO: return hasil response.json().
  return await response.json();
}

function renderMateri(data) {
  // TODO: kosongkan daftar dan buat kartu dengan createElement.
  const kartuList = data.map((item) => {
    const article = document.createElement('article');
    const judul = document.createElement('h2');
    const durasi = document.createElement('p');

    judul.textContent = item.judul;
    durasi.textContent = `${item.durasi} menit`;

    article.classList.add('kartu');
    article.append(judul, durasi);

    return article;
  });

  daftar.replaceChildren(...kartuList);
}

async function muatData() {
  aturState('loading', 'Memuat data...');
  tombolMuat.disabled = true;
  daftar.replaceChildren();

  try {
    // TODO: await ambilMateri().
    const data = await ambilMateri();

    // TODO: bedakan array kosong dan data berisi.
    if (data.length === 0) {
      aturState('empty', 'Belum ada materi yang tersedia');
    } else {
      renderMateri(data);
      aturState('success', `Berhasil memuat ${data.length} materi`);
    }
  } catch (error) {
    console.error(error);
    // TODO: tampilkan state error dan pesan yang dapat dipahami.
    aturState('error', `Data gagal dimuat: ${error.message}`);
  } finally {
    // TODO: aktifkan kembali tombol Muat data.
    tombolMuat.disabled = false;
  }
}

tombolMuat.addEventListener('click', muatData);
tombolCobaLagi.addEventListener('click', muatData);