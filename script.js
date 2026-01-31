const time = t =>
  t ? new Date(t * 1000).toLocaleString() : "N/A";

document.getElementById("searchBtn").addEventListener("click", load);

function load(){
  const uid = document.getElementById("uid").value.trim();
  const r = document.getElementById("result");
  if(!uid){
    alert("أدخل UID");
    return;
  }

  r.innerHTML = `<div class="card">⏳ جاري جلب المعلومات...</div>`;

  fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(
    "https://ch9ayfa-info-v10-production.up.railway.app/get?uid=" + uid
  )}`)
  .then(res => res.json())
  .then(j => {

    const basic   = j.data.basicInfo || {};
    const social  = j.data.socialInfo || {};
    const profile = j.data.profileInfo || {};
    const pet     = j.data.petInfo || {};
    const clan    = j.data.clanBasicInfo || {};
    const captain = j.data.captainBasicInfo || {};

    r.innerHTML = `

<!-- ACCOUNT BASIC INFO -->
<div class="card">
<h3>👑 ACCOUNT BASIC INFO</h3>
<p>👤 Name: ${basic.nickname || "N/A"}</p>
<p>🆔 UID: ${basic.accountId || "N/A"}</p>
<p>📈 Level: ${basic.level || "N/A"}</p>
<p>🌍 Region: ${basic.region || "N/A"}</p>
<p>❤️ Likes: ${basic.liked || "N/A"}</p>
<p>⚔️ Honor Score: ${basic.rankingPoints || "N/A"}</p>
<p>🎖 Evo Badge: ${basic.badgeId || "N/A"}</p>
<p>🎗 Title: ${basic.title || "N/A"}</p>
<p>✍️ Signature: ${social.signature || "N/A"}</p>
</div>

<!-- ACCOUNT ACTIVITY -->
<div class="card">
<h3>🎮 ACCOUNT ACTIVITY</h3>
<p>📦 OB Version: ${basic.releaseVersion || "N/A"}</p>
<p>🔥 Fire Pass: ${basic.seasonId || "N/A"}</p>
<p>🎯 BP Badges: ${basic.badgeCnt || "N/A"}</p>
<p>🏆 BR Rank: ${basic.rank || "N/A"}</p>
<p>⚡ CS Points: ${basic.csRankingPoints || "N/A"}</p>
<p>📅 Created At: ${time(basic.createAt)}</p>
<p>⏱ Last Login: ${time(basic.lastLoginAt)}</p>
</div>

<!-- ACCOUNT OVERVIEW -->
<div class="card">
<h3>🧍 ACCOUNT OVERVIEW</h3>
<p>🖼 Avatar ID: ${profile.avatarId || "N/A"}</p>
<p>🎌 Banner ID: ${basic.bannerId || "N/A"}</p>
<p>📍 Head Pic ID: ${basic.headPic || "N/A"}</p>
<p>🎯 Skills: ${JSON.stringify(profile.equipedSkills || [])}</p>
<p>🔫 Gun Skins: ${JSON.stringify(basic.weaponSkinShows || [])}</p>
<p>✨ Transform Animation: ${profile.isSelectedAwaken}</p>
</div>

<!-- PET INFORMATION -->
<div class="card">
<h3>🐾 PET INFORMATION</h3>
<p>🐶 Equipped: ${pet.isSelected}</p>
<p>📛 Pet ID: ${pet.id || "N/A"}</p>
<p>🦴 Skin ID: ${pet.skinId || "N/A"}</p>
<p>🔋 EXP: ${pet.exp || "N/A"}</p>
<p>📊 Level: ${pet.level || "N/A"}</p>
</div>

<!-- GUILD INFORMATION -->
<div class="card">
<h3>🛡️ GUILD INFORMATION</h3>
<p>🏰 Name: ${clan.clanName || "N/A"}</p>
<p>🆔 ID: ${clan.clanId || "N/A"}</p>
<p>⚙️ Level: ${clan.clanLevel || "N/A"}</p>
<p>👥 Members: ${clan.memberNum || "N/A"}</p>
</div>

<!-- LEADER INFO -->
<div class="card">
<h3>👑 LEADER INFO</h3>
<p>👤 Name: ${captain.nickname || "N/A"}</p>
<p>🆔 UID: ${captain.accountId || "N/A"}</p>
<p>📈 Level: ${captain.level || "N/A"}</p>
<p>📅 Created At: ${time(captain.createAt)}</p>
<p>⏱ Last Login: ${time(captain.lastLoginAt)}</p>
<p>🎗 Title: ${captain.title || "N/A"}</p>
<p>🏆 BR Points: ${captain.rankingPoints || "N/A"}</p>
<p>⚡ CS Points: ${captain.csRankingPoints || "N/A"}</p>
</div>

<!-- OWNER -->
<div class="card" style="text-align:center">
<h3>👑 Owner</h3>
<p>@saif_Officiel</p>
<a href="https://t.me/UXD_5" target="_blank">⚡ FF LIKE GROUP</a>
</div>

    `;
  })
  .catch(()=>{
    r.innerHTML = `<div class="card">❌ فشل جلب البيانات</div>`;
  });
}