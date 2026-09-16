"use strict";

function validasiNilai(nilai) {
  if (Number.isFinite(nilai) && nilai >= 0 && nilai <= 100) {
    return true;
  } else {
    return false;
  }
}

function tentukanKategori(nilai) {
  if (validasiNilai(nilai)) {
    if (nilai >= 85) {
      return "A";
    } else if (nilai >= 70) {
      return "B";
    } else if (nilai >= 60) {
      return "C";
    } else {
      return "D";
    }
  } else {
    return null;
  }
}

function tentukanStatus(nilai) {
  if (validasiNilai(nilai)) {
    if (nilai >= 60) {
      return "Lulus";
    } else {
      return "Tidak lulus";
    }
  } else {
    return "Data tidak valid";
  }
}

function buatRingkasan(nama, nilai) {
  const kategori = tentukanKategori(nilai);
  const status = tentukanStatus(nilai);

  return {
    nama: nama,
    nilai: nilai,
    kategori: kategori,
    status: status,
  };
}

const kasusUji = [
  { nama: "Alya", nilai: 0 },
  { nama: "Bima", nilai: 59 },
  { nama: "Citra", nilai: 60 },
  { nama: "Danu", nilai: 69 },
  { nama: "Eka", nilai: 70 },
  { nama: "Fani", nilai: 85 },
  { nama: "Gilang", nilai: 101 },
];

const hasilUji = kasusUji.map(function (item) {
  return buatRingkasan(item.nama, item.nilai);
});

console.table(hasilUji);
