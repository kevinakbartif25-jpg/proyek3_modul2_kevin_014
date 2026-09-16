"use strict";

const statusEl = document.querySelector("#status");
const cobaLagiBtn = document.querySelector("#coba-lagi");
const profilEl = document.querySelector("#profil");
const namaEl = document.querySelector("#nama");
const bioEl = document.querySelector("#bio");
const emailEl = document.querySelector("#email");
const lokasiEl = document.querySelector("#lokasi");
const toggleDetailBtn = document.querySelector("#toggle-detail");
const detailEl = document.querySelector("#detail");
const daftarEl = document.querySelector("#daftar-keterampilan");
const kosongEl = document.querySelector("#kosong");
const formEl = document.querySelector("#form-keterampilan");
const inputEl = document.querySelector("#input-keterampilan");
const errorInputEl = document.querySelector("#error-input");
const toggleTemaBtn = document.querySelector("#toggle-tema");

let keterampilan = [];

function aturState(state, pesan) {
  statusEl.textContent = pesan;
  statusEl.dataset.state = state;
  cobaLagiBtn.hidden = state !== "error";
  profilEl.hidden = state !== "success";
}

async function ambilProfil() {
  const response = await fetch("data/profile.json");
  if (!response.ok) {
    throw new Error(`Gagal memuat data. Status ${response.status}`);
  }
  return await response.json();
}

function renderKeterampilan() {
  const items = keterampilan.map((item, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const btn = document.createElement("button");

    span.textContent = item;
    btn.textContent = "Hapus";
    btn.addEventListener("click", () => {
      keterampilan.splice(index, 1);
      renderKeterampilan();
    });

    li.append(span, btn);
    return li;
  });

  daftarEl.replaceChildren(...items);
  kosongEl.hidden = keterampilan.length > 0;
}

async function muatData() {
  aturState("loading", "Memuat data...");

  try {
    const data = await ambilProfil();

    if (!data || Object.keys(data).length === 0) {
      aturState("empty", "Data profil kosong");
      return;
    }

    namaEl.textContent = data.nama;
    bioEl.textContent = data.bio;
    emailEl.textContent = data.email;
    lokasiEl.textContent = data.lokasi;
    keterampilan = data.keterampilan || [];

    renderKeterampilan();
    aturState("success", "");
  } catch (error) {
    console.error(error);
    aturState("error", `Gagal memuat profil: ${error.message}`);
  }
}

toggleDetailBtn.addEventListener("click", () => {
  const terbuka = toggleDetailBtn.getAttribute("aria-expanded") === "true";
  toggleDetailBtn.setAttribute("aria-expanded", String(!terbuka));
  detailEl.hidden = terbuka;
});

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  if (inputEl.value.trim() === "") {
    errorInputEl.hidden = false;
    return;
  }

  errorInputEl.hidden = true;
  keterampilan.push(inputEl.value.trim());
  renderKeterampilan();
  formEl.reset();
});

toggleTemaBtn.addEventListener("click", () => {
  document.body.classList.toggle("tema-gelap");
});

cobaLagiBtn.addEventListener("click", muatData);

muatData();
