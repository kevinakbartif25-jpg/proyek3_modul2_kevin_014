## Ringkasan halaman 
CampusFlow adalah landing page statis yang dirancang untuk membantu mahasiswa menemukan
dan mendaftar kegiatan kampus seperti workshop, komunitas, dan tantangan dengan mudah 
dan cepat.

## Tiga keputusan teknis 
Pertama, menggunakan CSS Variables untuk mengatur tema dan mempermudah konsistensi 
warna. Kedua, menerapkan kombinasi CSS Grid dan Flexbox untuk membuat tata letak yang 
responsif. Ketiga, menggunakan tag HTML semantik dan atribut ARIA untuk memastikan
halaman dapat diakses dengan baik oleh pembaca layar.

## Masalah, diagnosis, dan perbaikan 
Masalah yang ditemui adalah tata letak grid pada bagian hero dan fitur saling bertumpuk
di layar kecil. Diagnosis menunjukkan bahwa properti grid belum diatur untuk layar
sempit. Perbaikan dilakukan dengan menambahkan media query pada batas 860px dan 600px
untuk mengubah struktur grid menjadi satu kolom (1fr).

## Hasil pengujian empat viewport 
Pada desktop (1120px+), semua elemen dan grid multi-kolom tampil sempurna. Pada tablet
(860px), grid hero dan navigasi mulai menyesuaikan ruang menjadi lebih padat. Pada
mobile (600px), navigasi menyesuaikan ukuran dan seluruh section menjadi satu kolom
penuh. Pada mobile kecil (380px), ukuran font, ikon, dan padding mengecil agar konten
tidak keluar layar.

## Refleksi belajar 
Proyek ini mengajarkan pentingnya struktur HTML yang bersih dan pendekatan gaya CSS
murni. Saya belajar bagaimana merancang hierarki visual yang jelas dan memastikan
elemen interaktif (seperti tombol dan tautan) memiliki indikator fokus yang baik untuk
kenyamanan pengguna.

## Log AI atau sumber bantuan 
https://gemini.google.com/app/6c815d9de1c311f3
