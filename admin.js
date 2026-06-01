const ranking = document.getElementById("ranking");

let photos = [];

for(let i=1;i<=63;i++){

    photos.push({
        id:i,
        votes:Math.floor(Math.random()*500)
    });

}

photos.sort((a,b)=>b.votes-a.votes);

photos.forEach((item,index)=>{

    ranking.innerHTML += `
    
    <tr>
        <td>${index+1}</td>
        <td>${String(item.id).padStart(3,"0")}</td>
        <td>${item.votes}</td>
    </tr>

    `;

});