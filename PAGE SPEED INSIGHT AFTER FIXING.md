## **TAB PERFORMANCE**
1. JavaScript Versi Lama Perkiraan penghematan 13 KiB
   Polyfill dan transformasi memungkinkan browser lama menggunakan fitur JavaScript yang baru. Namun, banyak di antara fitur tersebut yang tidak diperlukan browser modern. Pertimbangkan untuk mengubah proses build JavaScript Anda agar tidak mentranspilasi fitur [Baseline](https://web.dev/articles/baseline-and-polyfills?utm_source=lighthouse&utm_medium=lr), kecuali jika Anda tahu bahwa Anda harus mendukung browser lama. [Pelajari alasan sebagian besar situs dapat men-deploy kode ES6+ tanpa mentranspilasi](https://developer.chrome.com/docs/performance/insights/legacy-javascript?utm_source=lighthouse&utm_medium=lr)LCPFCPTidak dinilai

|URL||Byte yang tidak digunakan|
|---|---|---|
|netlify.app<br><br> Pihak pertama||12,9 KiB|
|[…chunks/30ea11065999f7ac.js](https://web-juan-425.netlify.app/_next/static/chunks/30ea11065999f7ac.js)<br><br>(web-juan-425.netlify.app)||12,9 KiB|
|[…chunks/30ea11065999f7ac.js:1:6066](https://web-juan-425.netlify.app/_next/static/chunks/30ea11065999f7ac.js)<br><br>(web-juan-425.netlify.app)|Array.prototype.at||
|[…chunks/30ea11065999f7ac.js:1:5454](https://web-juan-425.netlify.app/_next/static/chunks/30ea11065999f7ac.js)<br><br>(web-juan-425.netlify.app)|Array.prototype.flat||
|[…chunks/30ea11065999f7ac.js:1:5567](https://web-juan-425.netlify.app/_next/static/chunks/30ea11065999f7ac.js)<br><br>(web-juan-425.netlify.app)|Array.prototype.flatMap||
|[…chunks/30ea11065999f7ac.js:1:5943](https://web-juan-425.netlify.app/_next/static/chunks/30ea11065999f7ac.js)<br><br>(web-juan-425.netlify.app)|Object.fromEntries||
|[…chunks/30ea11065999f7ac.js:1:6201](https://web-juan-425.netlify.app/_next/static/chunks/30ea11065999f7ac.js)<br><br>(web-juan-425.netlify.app)|Object.hasOwn||
|[…chunks/30ea11065999f7ac.js:1:5196](https://web-juan-425.netlify.app/_next/static/chunks/30ea11065999f7ac.js)<br><br>(web-juan-425.netlify.app)|String.prototype.trimEnd||
|[…chunks/30ea11065999f7ac.js:1:5111](https://web-juan-425.netlify.app/_next/static/chunks/30ea11065999f7ac.js)<br><br>(web-juan-425.netlify.app)|String.prototype.trimStart|

2.  Perincian LCP
   Setiap subbagian memiliki strategi peningkatan tertentu. Idealnya, sebagian besar waktu LCP harus digunakan untuk memuat resource, bukan untuk penundaan.LCPTidak dinilai
Subbagian
Durasi
Time to first byte
0 md
Penundaan render elemen
3.580 md
AI Engineer &
<span class="block whitespace-nowrap">

3.  Hierarki dependensi jaringan
   [Hindari perantaian permintaan penting](https://developer.chrome.com/docs/performance/insights/network-dependency-tree?utm_source=lighthouse&utm_medium=lr) dengan mengurangi panjang rantai, mengurangi ukuran download resource, atau menunda download resource yang tidak penting untuk mempercepat pemuatan halaman.LCPTidak dinilai

Latensi jalur kritis maksimal: **1.497 md**

Navigasi Awal

[https://web-juan-425.netlify.app](https://web-juan-425.netlify.app/)

 - 1.303 md, 11,57 KiB

[…chunks/6f52208d1cdaa495.css](https://web-juan-425.netlify.app/_next/static/chunks/6f52208d1cdaa495.css)

(web-juan-425.netlify.app)

 - 1.497 md, 7,45 KiB

Origin yang dihubungkan sebelumnya

Petunjuk [prakoneksi](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/?utm_source=lighthouse&utm_medium=lr) membantu browser membuat koneksi lebih awal saat halaman dimuat, sehingga dapat menghemat waktu ketika permintaan ke origin tersebut dibuat pertama kali. Berikut ini adalah origin yang telah terhubung ke halaman sebelumnya.

tidak ada origin yang dihubungkan sebelumnya

Kandidat prakoneksi

Tambahkan petunjuk [prakoneksi](https://developer.chrome.com/docs/lighthouse/performance/uses-rel-preconnect/?utm_source=lighthouse&utm_medium=lr) ke origin yang paling penting, tetapi usahakan untuk menggunakan tidak lebih dari 4 petunjuk.

Tidak ada origin tambahan yang cocok untuk prakoneksi

4. Permintaan pemblokiran render
   Permintaan memblokir render awal halaman, yang dapat menunda LCP. [Penundaan atau penyisipan](https://developer.chrome.com/docs/performance/insights/render-blocking?utm_source=lighthouse&utm_medium=lr) dapat memindahkan permintaan jaringan ini dari jalur penting.LCPFCPTidak dinilai

|URL|Ukuran Transfer|Durasi|
|---|---|---|
|netlify.app<br><br> Pihak pertama|7,5 KiB|0 md|
|[…chunks/6f52208d1cdaa495.css](https://web-juan-425.netlify.app/_next/static/chunks/6f52208d1cdaa495.css)<br><br>(web-juan-425.netlify.app)|7,5 KiB||

(poin 1-3 bersifat urgent, poin 4 bersifat warning)



## **DIAGNOSTIK**

1. Minimalkan pekerjaan thread utama 33,6 dtk
   Sebaiknya kurangi waktu yang dihabiskan untuk mengurai, mengompilasi, dan mengeksekusi JS. Coba kirim payload JS yang lebih kecil untuk membantu mengurangi waktu. [Pelajari cara meminimalkan pekerjaan thread utama](https://developer.chrome.com/docs/lighthouse/performance/mainthread-work-breakdown/?utm_source=lighthouse&utm_medium=lr)TBTTidak dinilai

|Kategori|Waktu yang Dihabiskan|
|---|---|
|Other|32.325 md|
|Script Evaluation|937 md|
|Style & Layout|142 md|
|Script Parsing & Compilation|87 md|
|Rendering|65 md|
|Parse HTML & CSS|10 md|

2. Kurangi JavaScript yang tidak digunakan Perkiraan penghematan 50 KiB
   Kurangi JavaScript yang tidak digunakan dan tunda pemuatan skrip sampai diperlukan untuk menurunkan byte yang digunakan oleh aktivitas jaringan. [Pelajari cara mengurangi JavaScript yang tidak digunakan](https://developer.chrome.com/docs/lighthouse/performance/unused-javascript/?utm_source=lighthouse&utm_medium=lr).LCPFCPTidak dinilai

|URL|Ukuran Transfer|Perkiraan Penghematan|
|---|---|---|
|netlify.app<br><br> Pihak pertama|117,1 KiB|49,9 KiB|
|[…chunks/5224a8c09ea1e14e.js](https://web-juan-425.netlify.app/_next/static/chunks/5224a8c09ea1e14e.js)<br><br>(web-juan-425.netlify.app)|51,5 KiB|27,6 KiB|
|[…chunks/30ea11065999f7ac.js](https://web-juan-425.netlify.app/_next/static/chunks/30ea11065999f7ac.js)<br><br>(web-juan-425.netlify.app)|65,6 KiB|22,3 KiB|