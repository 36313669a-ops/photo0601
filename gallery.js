const gallery = document.getElementById("gallery");

for(let i=1;i<=63;i++){

    const photoNo = String(i).padStart(3,"0");

    gallery.innerHTML += `
    
    <div class="card">

        <img src="photos/${photoNo}.jpg">

        <div class="info">
            <h3>作品 ${photoNo}</h3>
            <p>攝影者姓名</p>
        </div>

        <button
        class="btn"
        onclick="location.href='photo.html?id=${i}'">
            查看作品
        </button>

    </div>

    `;
}