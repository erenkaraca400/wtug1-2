

function renderInventory(data = inventory) {
    const list = document.getElementById('stock-list');
    const totalMsg = document.getElementById('total-count');
    const lowMsg = document.getElementById('low-stock-count');
    
    list.innerHTML = "";
    let lowCount = 0;

    data.forEach((item, index) => {
        if(item.qty < 5) lowCount++;
        
        list.innerHTML += `
            <tr>
                <td><img src="${item.img}" class="product-img"></td>
                <td>${item.name}</td>
                <td>${item.qty} adet</td>
                <td class="${item.qty < 5 ? 'low-alert' : ''}">
                    ${item.qty < 5 ? '⚠️ Kritik' : '✅ Tamam'}
                </td>
                <td><button onclick="removeItem(${index})" style="background:#ff4d4d">Sil</button></td>
            </tr>
        `;
    });

    totalMsg.innerText = inventory.length;
    lowMsg.innerText = lowCount;
}

// Yeni Ürün Ekleme
function addNewItem() {
    const name = document.getElementById('p-name').value;
    const qty = document.getElementById('p-qty').value;
    const img = document.getElementById('p-img').value || "https://via.placeholder.com/50";

    if(name && qty) {
        inventory.push({ name, qty: parseInt(qty), img });
        renderInventory();
        document.getElementById('p-name').value = "";
        document.getElementById('p-qty').value = "";
        document.getElementById('p-img').value = "";
    }
}

// Arama Fonksiyonu
function filterItems() {
    const term = document.getElementById('search-input').value.toLowerCase();
    const filtered = inventory.filter(item => 
        item.name.toLowerCase().includes(term)
    );
    renderInventory(filtered);
}

function removeItem(index) {
    inventory.splice(index, 1);
    renderInventory();
}

// Sayfa yüklendiğinde çalıştır
renderInventory();
let inventory = [];

function addNewItem() {
    const nameInput = document.getElementById('p-name');
    const qtyInput = document.getElementById('p-qty');
    const fileInput = document.getElementById('p-img-file');

    const name = nameInput.value;
    const qty = qtyInput.value;
    const file = fileInput.files[0]; // Seçilen ilk dosyayı al

    if (name && qty) {
        // Eğer bir resim seçildiyse onu işle
        if (file) {
            const reader = new FileReader();
            
            // Dosya okunduğunda çalışacak fonksiyon
            reader.onload = function(e) {
                const imgBase64 = e.target.result; // Resmin verisi
                saveItem(name, qty, imgBase64);
            };
            
            reader.readAsDataURL(file); // Dosyayı oku
        } else {
            // Resim seçilmediyse varsayılan bir görsel koy
            saveItem(name, qty, "https://via.placeholder.com/50");
        }
        
        // Formu temizle
        nameInput.value = "";
        qtyInput.value = "";
        fileInput.value = "";
    } else {
        alert("Lütfen isim ve miktar giriniz!");
    }
}

// Ürünü listeye kaydeden yardımcı fonksiyon
function saveItem(name, qty, imgSrc) {
    inventory.push({ 
        name: name, 
        qty: parseInt(qty), 
        img: imgSrc 
    });
    renderInventory();
}