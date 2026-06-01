// 📦 63 張作品
const photos = Array.from({ length: 63 }, (_, i) => {
  const id = String(i + 1).padStart(3, "0");

  return {
    id,
    title: `作品 ${id}`,

    // 👉 你的 GitHub 圖片路徑（請確認資料夾名稱）
    image: `./images/${id}.jpg`,

    // 👉 預設 fallback 圖（一定會顯示）
    fallback: `https://picsum.photos/500/300?random=${i + 1}`,

    votes: 0
  };
});

const votedKey = "votedPhotos";
let voted = JSON.parse(localStorage.getItem(votedKey)) || [];

const gallery = document.getElementById("gallery");
const rank = document.getElementById("rank");

// 🧠 圖片載入失敗處理
function getImage(photo) {
  const img = document.createElement("img");

  img.src = photo.image;

  // ❗ 如果 GitHub 圖壞掉 → 自動換 fallback
  img.onerror = () => {
    img.src = photo.fallback;
  };

  return img;
}

// 🖼️ 渲染作品
function render() {
  gallery.innerHTML = "";

  photos.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    const img = getImage(p);

    const votedText = voted.includes(p.id) ? "取消投票" : "投票";

    card.innerHTML = `
      <h4>${p.title}</h4>
      <p>票數：${p.votes}</p>
      <button onclick="vote('${p.id}')">
        ${votedText}
      </button>
    `;

    card.prepend(img);
    gallery.appendChild(card);
  });

  updateRank();
}

// 👍 投票（可取消）
function vote(id) {
  const photo = photos.find(p => p.id === id);

  if (voted.includes(id)) {
    photo.votes--;
    voted = voted.filter(v => v !== id);
  } else {
    photo.votes++;
    voted.push(id);
  }

  localStorage.setItem(votedKey, JSON.stringify(voted));
  render();
}

// 🏆 排行榜
function updateRank() {
  const sorted = [...photos].sort((a, b) => b.votes - a.votes);

  rank.innerHTML = sorted
    .slice(0, 10)
    .map(p => `<li>${p.title} - ${p.votes}票</li>`)
    .join("");
}

render();