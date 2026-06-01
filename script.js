// 🔥 63 張作品資料（你之後只要改 image URL）
const photos = Array.from({ length: 63 }, (_, i) => {
  const id = String(i + 1).padStart(3, "0");
  return {
    id,
    title: `作品 ${id}`,
    image: `https://picsum.photos/300/200?random=${i + 1}`,
    votes: 0
  };
});

// 📦 localStorage 投票紀錄
const votedKey = "votedPhotos";
let voted = JSON.parse(localStorage.getItem(votedKey)) || [];

const gallery = document.getElementById("gallery");
const rank = document.getElementById("rank");

// 🖼️ 渲染作品
function render() {
  gallery.innerHTML = "";

  photos.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}" />
      <h4>${p.title}</h4>
      <p>票數：<span id="v-${p.id}">${p.votes}</span></p>
      <button ${voted.includes(p.id) ? "disabled" : ""} 
        onclick="vote('${p.id}')">
        投票
      </button>
    `;

    gallery.appendChild(card);
  });

  updateRank();
}

// 👍 投票功能
function vote(id) {
  const photo = photos.find(p => p.id === id);

  if (voted.includes(id)) return;

  photo.votes++;
  voted.push(id);

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

// 🚀 初始化
render();