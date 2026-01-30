const time = t => new Date(t*1000).toLocaleString();

document.getElementById("searchBtn").addEventListener("click", load);

function load(){
  const uid = document.getElementById("uid").value.trim();
  const r = document.getElementById("result");
  if(!uid){
    alert("أدخل UID");
    return;
  }

  r.innerHTML = "<div class='card'>⏳ جاري جلب المعلومات...</div>";

  fetch(`https://ch9ayfa-info-v10-production.up.railway.app/get?uid=${uid}`)
  .then(res => res.json())
  .then(j => {
    if(!j.data || !j.data.basicInfo){
      r.innerHTML = "<div class='card'>❌ لم يتم العثور على اللاعب</div>";
      return;
    }

    const b = j.data.basicInfo;
    const c = j.data.clanBasicInfo;

    r.innerHTML = `
      <div class="card player">
        <img src="https://cdn.freefiremobile.com/fficon/${b.headPic}.png">
        <h2>${b.nickname}</h2>
        <div class="badge">UID: ${j.uid}</div>
        <div class="badge">Server: ${b.region}</div>
        <div class="badge">Level: ${b.level}</div>
      </div>

      <div class="grid">

        <div class="card">
          <h3>👤 الحساب</h3>
          <p>إنشاء الحساب: ${time(b.createAt)}</p>
          <p>آخر تسجيل دخول: ${time(b.lastLoginAt)}</p>
          <p>الإعجابات: ${b.liked}</p>
          <p>Elite Pass: ${b.hasElitePass}</p>
        </div>

        <div class="card">
          <h3>🏆 الرانك</h3>
          <p>BR Rank: ${b.rank}</p>
          <p>BR Points: ${b.rankingPoints}</p>
          <p>CS Rank: ${b.csRank}</p>
          <p>CS Points: ${b.csRankingPoints}</p>
        </div>

        <div class="card">
          <h3>🏰 الكلان</h3>
          <p>اسم الكلان: ${c.clanName}</p>
          <p>مستوى الكلان: ${c.clanLevel}</p>
          <p>عدد الأعضاء: ${c.memberNum} / ${c.capacity}</p>
          <p>قائد الكلان: ${c.captainName || c.captainId}</p>
          <p>Bio قائد الكلان: ${c.captainBio || "لا يوجد وصف"}</p>
        </div>

      </div>
    `;
  })
  .catch(() => {
    r.innerHTML = "<div class='card'>❌ خطأ في الاتصال بالـ API</div>";
  });
}