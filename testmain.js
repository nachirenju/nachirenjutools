let allGames = [];
let allTournaments = [];
let allPlayers = {};
let playerIndex = {};
let tournamentMap = {};
let tournamentPlayers = {};   // ★グローバルで宣言


// opening固定定義
const openingMap = {
  "1":  { ja: "長星", en: "i1" },
  "2":  { ja: "峡月", en: "i2" },
  "3":  { ja: "恒星", en: "i3" },
  "4":  { ja: "水月", en: "i4" },
  "5":  { ja: "流星", en: "i5" },
  "6":  { ja: "雲月", en: "i6" },
  "7":  { ja: "浦月", en: "i7" },
  "8":  { ja: "嵐月", en: "i8" },
  "9":  { ja: "銀月", en: "i9" },
  "10": { ja: "明星", en: "i10" },
  "11": { ja: "斜月", en: "i11" },
  "12": { ja: "名月", en: "i12" },
  "13": { ja: "彗星", en: "i13" },

  "14": { ja: "寒星", en: "d1" },
  "15": { ja: "渓月", en: "d2" },
  "16": { ja: "疎星", en: "d3" },
  "17": { ja: "花月", en: "d4" },
  "18": { ja: "残月", en: "d5" },
  "19": { ja: "雨月", en: "d6" },
  "20": { ja: "金星", en: "d7" },
  "21": { ja: "松月", en: "d8" },
  "22": { ja: "丘月", en: "d9" },
  "23": { ja: "新月", en: "d10" },
  "24": { ja: "瑞星", en: "d11" },
  "25": { ja: "山月", en: "d12" },
  "26": { ja: "遊星", en: "d13" },

  // 未入力用
  "27": { ja: "棋譜未入力", en: "Game is not typed" }
};


/*
window.addEventListener("DOMContentLoaded", () => {
    // ここに処理を書く
    document.getElementById("tournamentTabBtn").addEventListener("click", () => openTab('tournamentTab'));
    document.getElementById("playerTabBtn").addEventListener("click", () => openTab('playerTab'));

    document.getElementById("searchPlayerBtn").addEventListener("click", () => {
        // プレイヤー検索処理
    });
}); 
*/




// ファイル読み込み
document.getElementById("fileInput").addEventListener("change", function(e){
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = function(event){
    const text = event.target.result;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "text/xml");

    // プレイヤー情報の格納部分
// プレイヤー情報の格納部分
allPlayers = {};
playerIndex = {};
const players = xmlDoc.getElementsByTagName("player");

Array.from(players).forEach(p=>{
  const id = p.getAttribute("id");
  const name = (p.getAttribute("name") || "").trim();
  const surname = (p.getAttribute("surname") || "").trim();
  const native_name = (p.getAttribute("native_name") || "").trim();

  allPlayers[id] = {id,name,surname,native_name};

  // 検索用キーを準備
  const lowerName = name.toLowerCase();
  const lowerSurname = surname.toLowerCase();
  const lowerNative = native_name.toLowerCase();
  const fullName = (surname && name) ? (surname + " " + name).toLowerCase() : "";

  [lowerName, lowerSurname, lowerNative, fullName].forEach(key=>{
    if(key){
      if(!playerIndex[key]) playerIndex[key] = [];
      playerIndex[key].push(id);
    }
  });
});


  // 大会情報の格納部分
tournamentMap = {}; // 初期化
const tournaments = xmlDoc.getElementsByTagName("tournament");

Array.from(tournaments).forEach(t => {
  const id = t.getAttribute("id");
  const name = t.getAttribute("name");
  const country = t.getAttribute("country");
  const city = t.getAttribute("city");
  const year = parseInt(t.getAttribute("year"), 10);
  const month = parseInt(t.getAttribute("month"), 10);
  const start = t.getAttribute("start");
  const end = t.getAttribute("end");
  const rule = parseInt(t.getAttribute("rule"), 10);
  const rated = t.getAttribute("rated") === "1";

  tournamentMap[id] = { 
    id, name, country, city, year, month, start, end, rule, rated 
  };
});


// ←ここに allGames を作る
allTournaments = Object.entries(tournamentMap).map(([id, info]) => {
  return {
    id: Number(id),
    name: info.name,
    rule: info.rule,
    year: info.year
  };
});



// 対局情報
const games = xmlDoc.getElementsByTagName("game");
allGames = Array.from(games).map(g => {
  const tid = g.getAttribute("tournament");
  const tInfo = tournamentMap[tid] || {};
  return {
    id: g.getAttribute("id"),
    tournament: tid,
    tournamentName: tInfo.name || `大会ID ${tid}`,
    rule: tInfo.rule || 0,
    bresult: parseFloat(g.getAttribute("bresult")),
    opening: g.getAttribute("opening"),
    black: g.getAttribute("black"),
    white: g.getAttribute("white"),
    swap: g.getAttribute("swap"),
    moves: g.getElementsByTagName("move")[0]?.textContent.trim() || ""
  };
});

// ★ここで大会ごとの参加プレイヤー集合を構築
tournamentPlayers = {};
allGames.forEach(g => {
  if (!tournamentPlayers[g.tournament]) {
    tournamentPlayers[g.tournament] = new Set();
  }
  tournamentPlayers[g.tournament].add(g.black);
  tournamentPlayers[g.tournament].add(g.white);
});

// ★ 翻訳対応 alert
    alert(t("loadingComplete", allGames.length));

  };
  reader.readAsText(file);
});

 const showHelp = document.getElementById("showHelp");
  const helpModal = document.getElementById("helpModal");
  const closeHelp = document.getElementById("closeHelp");

  showHelp.addEventListener("click", function(e){
    e.preventDefault();
    helpModal.style.display = "block";
  });

  closeHelp.addEventListener("click", function(){
    helpModal.style.display = "none";
  });

  // 更新履歴リンク
document.getElementById("historyLink").addEventListener("click", (e) => {
  e.preventDefault();
  const c = document.getElementById("historyContent");
  c.style.display = (c.style.display === "none") ? "block" : "none";
});

function analyzeTaraguchi(g){
  const swapRaw = g.swap || "";
  const swapForCalc = swapRaw.replace(/R/g,"+").padEnd(5,"-");

  const blackFinal = allPlayers[g.black] ? allPlayers[g.black].surname + " " + allPlayers[g.black].name : g.black;
  const whiteFinal = allPlayers[g.white] ? allPlayers[g.white].surname + " " + allPlayers[g.white].name : g.white;

  let black = blackFinal, white = whiteFinal;
  const moveOwners = new Array(6);

  for(let i=5;i>=0;i--){
    moveOwners[i] = ((i+1)%2===1)? black : white;
    if(i>0 && swapForCalc[i-1]==='+'){
      [black, white] = [white, black];
    }
  }
  return { moveOwners, swap: swapRaw }; // 表示用には元データを返す
}

// 更新履歴閉じる
document.getElementById("closeHistory").addEventListener("click", () => {
  document.getElementById("historyContent").style.display = "none";
});

function analyzeSoosrv(g) {
  const swapRaw = (g.swap || "--").replace(/R/g, "+").padEnd(2, "-");
  const swapCount = (swapRaw.match(/\+/g) || []).length;

  const blackFinal = allPlayers[g.black]
    ? allPlayers[g.black].surname + " " + allPlayers[g.black].name
    : g.black;
  const whiteFinal = allPlayers[g.white]
    ? allPlayers[g.white].surname + " " + allPlayers[g.white].name
    : g.white;

  // 初期状態を決定
  let black = blackFinal;
  let white = whiteFinal;
  if (swapCount % 2 === 1) [black, white] = [white, black];

  const moveOwners = [];

  // 1〜3手目: 初期黒
  moveOwners.push(black, black, black);

  // 1回目 swap（3手目終了後）
  if (swapRaw[0] === "+") [black, white] = [white, black];

  // 4手目担当
  moveOwners.push(white);

  // 2回目 swap（4手目終了後）
  if (swapRaw[1] === "+") [black, white] = [white, black];

  // 5手目担当
  moveOwners.push(blackFinal);

  // 手番を分ける
  const blackMoves = [];
  const whiteMoves = [];
  moveOwners.forEach((player, idx) => {
    if (player === blackFinal) blackMoves.push(idx + 1);
    else if (player === whiteFinal) whiteMoves.push(idx + 1);
  });

  return { moveOwners, blackMoves, whiteMoves, swap: swapRaw };
}

function analyzeRIF(g) {
  const swapRaw = (g.swap || "-").replace(/R/g, "+"); // Rを+に置換して扱う

  const blackFinal = allPlayers[g.black]
    ? allPlayers[g.black].surname + " " + allPlayers[g.black].name
    : g.black;
  const whiteFinal = allPlayers[g.white]
    ? allPlayers[g.white].surname + " " + allPlayers[g.white].name
    : g.white;

  const moveOwners = [];

  if (swapRaw === "-") {
    // スワップなし
    moveOwners.push(blackFinal, blackFinal, blackFinal, whiteFinal, blackFinal);
  } else {
    // スワップあり
    moveOwners.push(whiteFinal, whiteFinal, whiteFinal, whiteFinal, blackFinal);
  }

  // 手番を分ける
  const blackMoves = [];
  const whiteMoves = [];
  moveOwners.forEach((player, idx) => {
    if (player === blackFinal) blackMoves.push(idx + 1);
    else if (player === whiteFinal) whiteMoves.push(idx + 1);
  });

  return { moveOwners, blackMoves, whiteMoves, swap: swapRaw };
}

document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("tournamentId").value = "";
});


// swap解析
function analyzeSwap(g){
  if (g.rule === 25) {           // Taraguchi-10
    return analyzeTaraguchi(g);
  } else if (g.rule === 24) {    // Soosrv
    return analyzeSoosrv(g);
  } else if (g.rule === 1 || g.rule === 5) {  // RIF
    return analyzeRIF(g);
  } else {
    // 未対応ルール → Taraguchi と同じに処理
    return analyzeTaraguchi(g);
  }
}


// 例: h8 -> {x:7, y:7} （0-indexed）
function coordToIndex(pos){
    const col = pos[0].toLowerCase(); // 'a'～'o'
    const row = parseInt(pos.slice(1),10); // 1～15
    const x = col.charCodeAt(0) - "a".charCodeAt(0);
    const y = row - 1;
    return {x, y};
}

// 盤面配列に変換（5手目まで）
function movesToBoard(moves){
    const size = 15;
    const board = Array.from({length:size}, ()=>Array(size).fill(null));
    moves.forEach((playerMove,i)=>{
        if(!playerMove || playerMove === "-") return;
        const {x, y} = coordToIndex(playerMove);
        board[y][x] = i%2===0 ? "B" : "W"; // 0-indexで黒白
    });
    return board;
}

// 正規化キーを作成（回転反転考慮）
function normalizeBoard(board){
    const size = board.length;

    function rotate90(b){
        const newB = Array.from({length:size},()=>Array(size).fill(null));
        for(let y=0;y<size;y++){
            for(let x=0;x<size;x++){
                newB[x][size-1-y] = b[y][x];
            }
        }
        return newB;
    }

    function flipH(b){
        return b.map(row => [...row].reverse());
    }

    function flipV(b){
        return [...b].reverse();
    }

    function boardToString(b){
        return b.map(row=>row.map(c=>c||"-").join("")).join("/");
    }

    let boards = [];
    let b = board;
    for(let i=0;i<4;i++){ // 0°,90°,180°,270°
        boards.push(boardToString(b));
        boards.push(boardToString(flipH(b)));
        b = rotate90(b);
    }

    // 最小文字列をキーにする
    return boards.sort()[0];
}



// 5手目集計及び同一局面の判定
function getTop5MovesNormalized(games){
    const countMap = {};
    games.forEach(g=>{
        const swapInfo = analyzeSwap(g);
        const movesRaw = g.moves.split(/\s+/).slice(0,5); // 元の座標文字列
        const board = movesToBoard(movesRaw);             // 盤面配列に変換（ここは不要でもOK）
        const key = normalizeBoard(board);
        countMap[key] = countMap[key] || {count:0, moves: movesRaw};
        countMap[key].count++;
    });

    return Object.values(countMap)
                 .sort((a,b)=>b.count-a.count)
                 .slice(0,10);
}

// 描画範囲
function getBoardBounds(moves){
    let minX = 14, maxX = 0, minY = 14, maxY = 0;
    moves.forEach(m=>{
        if(!m || m === "-") return;
        const {x, y} = coordToIndex(m);
        if(x < minX) minX = x;
        if(x > maxX) maxX = x;
        if(y < minY) minY = y;
        if(y > maxY) maxY = y;
    });
    return {minX, maxX, minY, maxY};
}

function drawBoard(container, moves){
    const bounds = getBoardBounds(moves);
    let sizeX = bounds.maxX - bounds.minX + 1;
    let sizeY = bounds.maxY - bounds.minY + 1;
    const margin = 2; // 2路分余白
    sizeX += margin*2;
    sizeY += margin*2;
    const cell = 20; // 線間隔

    const board = document.createElement("div");
    board.style.position="relative";
    board.style.width = `${cell*(sizeX-1)}px`; // 線の交点数は size-1 区間
    board.style.height = `${cell*(sizeY-1)}px`;
    board.style.border="1px solid #000";
    board.style.background="#F9EBCF";

    // 縦線
    for(let i=0;i<sizeX;i++){
        const v = document.createElement("div");
        v.style.position="absolute";
        v.style.left = `${i*cell}px`;
        v.style.top = "0";
        v.style.width = "1px";
        v.style.height = "100%";
        v.style.background="#000";
        board.appendChild(v);
    }

    // 横線
    for(let i=0;i<sizeY;i++){
        const h = document.createElement("div");
        h.style.position="absolute";
        h.style.top = `${i*cell}px`;
        h.style.left = "0";
        h.style.width = "100%";
        h.style.height = "1px";
        h.style.background="#000";
        board.appendChild(h);
    }

    // 石描画（交点上に置く）
    moves.forEach((m,i)=>{
        if(!m || m === "-") return;
        const {x: origX, y: origY} = coordToIndex(m);
        const x = origX - bounds.minX + margin;
        const y = sizeY - 1 - (origY - bounds.minY + margin); // 上下反転

        const stone = document.createElement("div");
        stone.style.position="absolute";
        stone.style.width=`${cell-4}px`;
        stone.style.height=`${cell-4}px`;
        stone.style.borderRadius="50%";
        stone.style.background = i%2===0?"black":"white";
        stone.style.left = `${x*cell - (cell-4)/2}px`;
        stone.style.top = `${y*cell - (cell-4)/2}px`;
        board.appendChild(stone);

        const label = document.createElement("div");
        label.textContent = (i+1).toString();
        label.style.position="absolute";
        label.style.left = `${x*cell}px`;
        label.style.top = `${y*cell}px`;
        label.style.fontSize = "12px";
        label.style.color = i%2===0?"white":"black";
        label.style.fontWeight = "bold";
        label.style.textAlign = "center";
        label.style.lineHeight = "1";
        label.style.transform = "translate(-50%, -50%)";
        board.appendChild(label);
    });

    container.appendChild(board);
}



// 大会集計後に5手目までランキング描画を呼び出す
// 共通: Top5を描画する
// pids が指定されていれば「そのプレイヤー別の勝敗集計」も追加表示する
function renderTop5Moves(filteredGames, containerId, pids = null) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  const top5Moves = getTop5MovesNormalized(filteredGames);
  if (!top5Moves || top5Moves.length === 0) {
    container.innerHTML = "Top5着手は見つかりませんでした";
    return;
  }

  top5Moves.forEach((item, i) => {
    const wrapper = document.createElement("div");
    wrapper.style.marginBottom = "20px";
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "flex-start";

    // 左側: 盤面
    const boardDiv = document.createElement("div");
    const title = document.createElement("div");
    title.textContent = `${i + 1}位: ${item.count}回`;
    boardDiv.appendChild(title);
    drawBoard(boardDiv, item.moves);

    // 該当ゲームを取得
    const key = normalizeBoard(movesToBoard(item.moves));
    const gamesForThisKey = filteredGames.filter(g => {
      const gKey = normalizeBoard(movesToBoard(g.moves.split(/\s+/).slice(0, 5)));
      return gKey === key;
    });

    // 勝敗集計（全体）
    let blackWins = 0, whiteWins = 0, draws = 0;

    // プレイヤー別集計（複数対応）
    const playerResults = {};
    if (Array.isArray(pids)) {
      pids.forEach(pid => {
        let name = pid;
        if (allPlayers[pid]) name = allPlayers[pid].surname + " " + allPlayers[pid].name;
        playerResults[pid] = { name, wins: 0, loses: 0, draws: 0 };
      });
    }

    gamesForThisKey.forEach(g => {
      // 全体集計
      if (g.bresult == 1) blackWins++;
      else if (g.bresult == 0) whiteWins++;
      else if (g.bresult == 0.5) draws++;

      // プレイヤー別集計
      if (Array.isArray(pids)) {
        pids.forEach(pid => {
          const isBlack = g.black === pid;
          const isWhite = g.white === pid;

          if (isBlack && g.bresult == 1) playerResults[pid].wins++;
          else if (isWhite && g.bresult == 0) playerResults[pid].wins++;
          else if ((isBlack && g.bresult == 0) || (isWhite && g.bresult == 1)) playerResults[pid].loses++;
          else if (g.bresult == 0.5 && (isBlack || isWhite)) playerResults[pid].draws++;
        });
      }
    });

    // 左側盤面の下に勝敗表示（比率付き）
    const totalGamesForType = blackWins + whiteWins + draws;
    const resultDiv = document.createElement("div");
    resultDiv.style.marginTop = "5px";
    resultDiv.textContent = `黒: ${blackWins}勝 (${totalGamesForType ? ((blackWins/totalGamesForType)*100).toFixed(1) : 0}%), 白: ${whiteWins}勝 (${totalGamesForType ? ((whiteWins/totalGamesForType)*100).toFixed(1) : 0}%), 引き分け: ${draws}回 (${totalGamesForType ? ((draws/totalGamesForType)*100).toFixed(1) : 0}%)`;
    boardDiv.appendChild(resultDiv);

    // ★ プレイヤー別集計を追加表示（比率付き）
    if (Array.isArray(pids)) {
      Object.values(playerResults).forEach(pr => {
        const totalGamesForPlayer = pr.wins + pr.loses + pr.draws;
        if (totalGamesForPlayer === 0) return; // 対局なしは非表示
        const div = document.createElement("div");
        div.style.marginTop = "3px";
        div.style.fontWeight = "bold";
        div.textContent = `${pr.name} → 勝ち:${pr.wins} (${((pr.wins/totalGamesForPlayer)*100).toFixed(1)}%), 負け:${pr.loses} (${((pr.loses/totalGamesForPlayer)*100).toFixed(1)}%), 引き分け:${pr.draws} (${((pr.draws/totalGamesForPlayer)*100).toFixed(1)}%)`;
        boardDiv.appendChild(div);
      });
    }

    // 右側: 該当ゲーム一覧
    // 右側: 該当ゲーム一覧
const listDiv = document.createElement("div");
listDiv.style.marginLeft = "20px";
const ul = document.createElement("ul");

gamesForThisKey.forEach(g => {
  const li = document.createElement("li");
  const url = `https://www.renju.net/tournament/${g.tournament}/game/${g.id}/`;
  // ★ 日本語+英語併記
  const entry = openingMap[g.opening];
  const openingName = entry ? `${entry.ja} (${entry.en})` : g.opening;
  const openingLink = `<a href="#" class="opening-link" data-opening="${g.opening}">${openingName}</a>`;
  const blackName = allPlayers[g.black] ? allPlayers[g.black].surname + " " + allPlayers[g.black].name : g.black;
  const whiteName = allPlayers[g.white] ? allPlayers[g.white].surname + " " + allPlayers[g.white].name : g.white;
  const resultText = g.bresult == 1 ? "黒勝ち" : g.bresult == 0 ? "白勝ち" : "引き分け";

  // ★ swapInfo を使って黒プレイヤーが打った手目を特定
  const swapInfo = analyzeSwap(g);
  const blackMoves = [];
  swapInfo.moveOwners.forEach((owner, idx) => {
    if (owner === blackName) {
      blackMoves.push(idx + 1); // 手数は1始まり
    }
  });

  // 黒プレイヤーの担当手目を表記に追加
  const blackMovesText = blackMoves.length > 0 ? ` (${blackMoves.join(",")})` : "";

  li.innerHTML = `
  <a href="#" class="game-popup-link" data-gameid="${g.id}">${g.id}</a>
  (<a href="${url}" target="_blank">RIFリンク</a>)
  (${openingLink}) - 
  黒${blackMovesText}: ${blackName}, 白: ${whiteName} → ${resultText}
`;

  ul.appendChild(li);
});

listDiv.appendChild(ul);
wrapper.appendChild(boardDiv);
wrapper.appendChild(listDiv);
container.appendChild(wrapper);

  });
}

let currentMoves = [];
let currentIndex = 0;
let currentGame = null;




function showGamePopup(gameId) {
  const g = allGames.find(x => x.id === gameId);
  if (!g) return;
  currentGame = g;

  // --- 大会情報を取得 ---
  let tournamentName = "";
  let tournamentYear = "";
  if (tournamentMap[g.tournament]) {
    tournamentName = tournamentMap[g.tournament].name || "";
    tournamentYear = tournamentMap[g.tournament].year || "";
  }

  // 対局者情報
  const blackName = allPlayers[g.black]
    ? allPlayers[g.black].surname + " " + allPlayers[g.black].name
    : g.black;
  const whiteName = allPlayers[g.white]
    ? allPlayers[g.white].surname + " " + allPlayers[g.white].name
    : g.white;
  const resultText = g.bresult == 1 ? t("blackWin")
                   : g.bresult == 0 ? t("whiteWin")
                   : t("draw");

  // swap 情報（surname のみに整形）
  const swapInfo = analyzeSwap(g);
  const swapMoves = swapInfo.moveOwners.map((owner, idx) => {
    if (!owner) return `${idx+1}手目:-`;
    let surname = owner;
    Object.values(allPlayers).forEach(p => {
      const full = `${p.surname} ${p.name}`.trim();
      if (full === owner) surname = p.surname;
    });
    return `${idx+1}手目:${surname}`;
  }).join("　");

  // --- HTML出力 ---
  document.getElementById("gameInfo").innerHTML = `
    <p><b>${tournamentName}</b> (${tournamentYear})</p>
    <p><b>黒:</b> ${blackName}　<b>白:</b> ${whiteName}</p>
    <p><b>結果:</b> ${resultText}</p>
    <p><b>swap:</b> ${swapMoves}</p>
  `;

  // 棋譜配列
  currentMoves = g.moves.split(/\s+/).filter(m => m);
  currentIndex = currentMoves.length;

  renderCurrentBoard();

  document.getElementById("gameModal").style.display = "block";
  document.getElementById("gameModalOverlay").style.display = "block";
}



function renderCurrentBoard() {
  const container = document.getElementById("gameBoard");
  container.innerHTML = "";

  const shownMoves = currentMoves.slice(0, currentIndex);

  // ★ mode を選択: 
  //   "board"      → 盤面のみ
  //   "withLabel"  → 座標つき
  //   "full"       → 座標 + 対局者 + swap情報
  const mode = "withLabel";

  // ★ GIF側と同じ関数を使う
  const canvas = renderBoardForGif(shownMoves, mode);
  container.appendChild(canvas);

  // ★ 棋譜テキストを表示
  document.getElementById("currentKifu").textContent = shownMoves.join("");
}

function drawStars(ctx, marginLeft, marginTop, cell, size) {
  const starCoords = [
    { x: 7,  y: 7 },   // 天元
    { x: 3,  y: 3 },   // D4
    { x: 3,  y: 11 },  // D12
    { x: 11, y: 3 },   // L4
    { x: 11, y: 11 }   // L12
  ];

  ctx.fillStyle = "black";
  starCoords.forEach(pos => {
    const cx = marginLeft + pos.x * cell;
    const cy = marginTop + (size - 1 - pos.y) * cell;
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2); // 半径4px
    ctx.fill();
  });
}



function renderBoardForGif(moves, mode, bresult, isLastFrame = false) {

  const size = 15;
  const cell = 30;
  const marginLeft = 25;   // 左余白（数字）
  const marginBottom = 20; // 下余白（アルファベット）
  const marginTop = 20;    // 上余白を追加

  const innerSize = (size - 1) * cell; // 内側の線が届く範囲 (420)
  const boardSize = size * cell;       // 外枠のサイズ (450)

  const canvasWidth  = marginLeft + boardSize;
  const canvasHeight = marginTop + boardSize + marginBottom + (mode === "full" ? 60 : 0);

  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d");

  // 背景
  ctx.fillStyle = "#F9EBCF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // --- 内側の細線 ---
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;

  for (let i = 1; i < size - 1; i++) {
    const x = marginLeft + i * cell + 0.5;
    ctx.beginPath();
    ctx.moveTo(x, marginTop);
    ctx.lineTo(x, marginTop + innerSize);
    ctx.stroke();
  }

  for (let i = 1; i < size - 1; i++) {
    const y = marginTop + i * cell + 0.5;
    ctx.beginPath();
    ctx.moveTo(marginLeft, y);
    ctx.lineTo(marginLeft + innerSize, y);
    ctx.stroke();
  }

  // --- 外枠 ---
  ctx.lineWidth = 2;
  ctx.strokeRect(marginLeft + 0.5, marginTop + 0.5, innerSize, innerSize);

  // ★ 星を描画
drawStars(ctx, marginLeft, marginTop, cell, size);

  // --- 座標ラベル ---
  if (mode !== "board") {
    const letters = "ABCDEFGHIJKLMNO".split("");
    ctx.font = "bold 14px sans-serif";
    ctx.fillStyle = "black";

    // 下側 (A〜O)
    ctx.textAlign = "center";
    for (let i = 0; i < size; i++) {
      ctx.fillText(letters[i], marginLeft + i * cell, marginTop + innerSize + 15);
    }

    // 左側 (15〜1)
    ctx.textAlign = "right";
    ctx.textBaseline = "alphabetic";
  ctx.textAlign = "right";
ctx.textBaseline = "alphabetic";
for (let i = 0; i < size; i++) {
  ctx.fillText(size - i, marginLeft - 5, marginTop + i * cell + cell / 2 - 10);
}

  }

// --- 石 ---
moves.forEach((m, i) => {
  const { x, y } = coordToIndex(m);
  const cx = marginLeft + x * cell;
  const cy = marginTop + (size - 1 - y) * cell;

  ctx.beginPath();
  ctx.arc(cx, cy, 12, 0, Math.PI * 2);
  ctx.fillStyle = i % 2 === 0 ? "black" : "white";
  ctx.fill();
  ctx.stroke();

  if (showMoveNumbers) {  // ★ここで制御
    ctx.fillStyle = i % 2 === 0 ? "white" : "black";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(i + 1, cx, cy);
  }
});


// --- 対局者情報 ---
if (mode === "full" && currentGame) {
  ctx.fillStyle = "black";
  ctx.font = "14px sans-serif";
  ctx.textAlign = "left";

  const blackFull = allPlayers[currentGame.black]
    ? `${allPlayers[currentGame.black].surname} ${allPlayers[currentGame.black].name}`.trim()
    : currentGame.black;
  const whiteFull = allPlayers[currentGame.white]
    ? `${allPlayers[currentGame.white].surname} ${allPlayers[currentGame.white].name}`.trim()
    : currentGame.white;

  ctx.fillText(`${t("black")}: ${blackFull}`, 10, marginTop + innerSize + 35);
  ctx.fillText(`${t("white")}: ${whiteFull}`, 10, marginTop + innerSize + 55);

  // ★ swap情報
  const swapInfo = analyzeSwap(currentGame);
  if (swapInfo && swapInfo.moveOwners) {
    const owners = swapInfo.moveOwners.map(owner => {
      if (!owner) return "-";
      let s = owner;
      Object.values(allPlayers).forEach(p => {
        const full = `${p.surname} ${p.name}`.trim();
        if (full === owner) s = p.surname;
      });
      return s;
    });

    const firstLine = owners.map((o, idx) => `${idx + 1}手目:${o}`).slice(0, 3).join("　");
    const secondLine = owners.map((o, idx) => `${idx + 1}手目:${o}`).slice(3, 5).join("　");

    ctx.fillText(`swap: ${firstLine}`, 10, marginTop + innerSize + 75);
    ctx.fillText(`      ${secondLine}`, 10, marginTop + innerSize + 95);
  }
} // ← ここで対局者情報を閉じる

// --- 最終フレーム結果 ---
if (isLastFrame && typeof bresult !== "undefined") {
  const n = moves.length;
  const isEven = n % 2 === 0;
  let prefix = isEven ? "〇" : "●";
  let resultText = "";

  if (bresult === 1) resultText = t("whiteResign");
  else if (bresult === 0) resultText = t("blackResign");
  else if (bresult === 0.5) resultText = t("drawFull");

  ctx.fillStyle = "black";
  ctx.font = "bold 15px sans-serif";
  ctx.textAlign = "right";
  const rightX = marginLeft + innerSize;
  ctx.fillText(`${prefix}${n} にて ${resultText}`, rightX, marginTop + innerSize + 40);
}

return canvas;
}












// キーワード検索処理
let currentMatches = []; // 現在の検索結果全件
let displayedCount = 0;  // 今表示している件数

function showNextBatch(existingIds = []) {
  const suggestionsDiv = document.getElementById("suggestions");

  // 最初の表示時に「全てチェック」「全て解除」ボタンを追加
  if (displayedCount === 0) {
    suggestionsDiv.innerHTML = ""; // 前の内容をリセット
    const controlsDiv = document.createElement("div");
    controlsDiv.style.marginBottom = "5px";

    const checkAllBtn = document.createElement("button");
    checkAllBtn.textContent = "全てチェック";
    checkAllBtn.addEventListener("click", () => {
      // tournamentId に全IDを反映
      const allIds = currentMatches.map(g => g.id);
      document.getElementById("tournamentId").value = allIds.join(",");
      // 表示されている分はUIも同期
      document.querySelectorAll("#suggestions input[type=checkbox]").forEach(cb => {
        cb.checked = true;
      });
    });

    const uncheckAllBtn = document.createElement("button");
    uncheckAllBtn.textContent = "全て解除";
    uncheckAllBtn.style.marginLeft = "5px";
    uncheckAllBtn.addEventListener("click", () => {
      // tournamentId を空にする
      document.getElementById("tournamentId").value = "";
      // 表示されている分はUIも同期
      document.querySelectorAll("#suggestions input[type=checkbox]").forEach(cb => {
        cb.checked = false;
      });
    });

    controlsDiv.appendChild(checkAllBtn);
    controlsDiv.appendChild(uncheckAllBtn);
    suggestionsDiv.appendChild(controlsDiv);
  }

  const nextBatch = currentMatches.slice(displayedCount, displayedCount + 10);

  nextBatch.forEach(g => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = g.id;
    if (existingIds.includes(g.id)) checkbox.checked = true;

    const label = document.createElement("label");
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(` ${g.name} (ID: ${g.id})`));

    const div = document.createElement("div");
    div.appendChild(label);
    suggestionsDiv.appendChild(div);

    checkbox.addEventListener("change", updateTournamentIds);
  });

  displayedCount += nextBatch.length;

  let moreBtn = document.getElementById("moreBtn");
  const remaining = currentMatches.length - displayedCount; // 残り件数

  if (remaining > 0) {
    if (!moreBtn) {
      moreBtn = document.createElement("button");
      moreBtn.id = "moreBtn";
      moreBtn.addEventListener("click", () => showNextBatch(existingIds));
      suggestionsDiv.appendChild(moreBtn);
    }
    moreBtn.textContent = `もっと見る (残り ${remaining} 件)`;
  } else if (moreBtn) {
    moreBtn.remove();
  }
}




function updateTournamentIds() {
  const inputEl = document.getElementById("tournamentId");
  const existingIds = inputEl.value
                          .split(",")
                          .map(s => s.trim())
                          .filter(s => s);

  const checkedIds = Array.from(document.querySelectorAll("#suggestions input[type=checkbox]:checked"))
                          .map(cb => cb.value);

  const newIdsSet = new Set([
    ...existingIds.filter(id => !currentMatches.some(c => String(c.id) === id)),
    ...checkedIds
  ]);

  inputEl.value = Array.from(newIdsSet).join(",");
}

document.addEventListener("DOMContentLoaded", () => {
  // キーワード入力
  document.getElementById("keyword").addEventListener("input", runSearch);

  // マッチタイプ変更
  document.querySelectorAll('input[name="matchType"]').forEach(rb => {
    rb.addEventListener("input", runSearch);
  });

  // ルールチェックボックス変更
  document.querySelectorAll('.ruleCheckbox').forEach(cb => {
    cb.addEventListener("change", runSearch);
  });

  // プレイヤーフィルタのON/OFF（大会検索用）
  document.getElementById("enablePlayerFilter").addEventListener("change", function() {
    const playerInput = document.getElementById("searchPlayerInput");
    const searchBtn   = document.getElementById("searchPlayerCandidatesBtn");
    if (this.checked) {
      playerInput.style.display = "inline-block";
      searchBtn.style.display   = "inline-block";
    } else {
      playerInput.style.display = "none";
      searchBtn.style.display   = "none";
      playerInput.value = ""; // 入力クリア
      document.getElementById("searchPlayerCandidates").innerHTML = ""; // 候補消す
      runSearch(); // 再検索
    }
  });



// 候補検索ボタン押下時（大会検索用）
document.getElementById("searchPlayerCandidatesBtn").addEventListener("click", () => {
  const nameInputs = document.getElementById("searchPlayerInput").value
    .split(",")
    .map(s => s.trim().toLowerCase())
    .filter(s => s);

  const candidateDiv = document.getElementById("searchPlayerCandidates");
  candidateDiv.innerHTML = "";

  let inputEl = document.getElementById("searchPlayerInput");
  let currentInputs = inputEl.value.split(",").map(s => s.trim()).filter(s => s);

  nameInputs.forEach(name => {
    const candidates = playerIndex[name] || [];
    if (candidates.length > 0) {
      candidateDiv.innerHTML += `<p>候補 (${name}) を選択してください:</p>`;
      candidates.forEach(pid => {
        const p = allPlayers[pid];
        const fullName = `${p.surname} ${p.name}`.trim();

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.value = fullName;
        cb.id = `candidate_search_${pid}`;
        cb.addEventListener("change", function() {
          let cur = inputEl.value.split(",").map(s => s.trim()).filter(s => s);

          // ★ まず曖昧入力を削除
          cur = cur.filter(x => x.toLowerCase() !== name);

          if (this.checked) {
            if (!cur.includes(fullName.toLowerCase())) {
              cur.push(fullName.toLowerCase());
            }
          } else {
            cur = cur.filter(x => x.toLowerCase() !== fullName.toLowerCase());
          }

          inputEl.value = cur.join(", ");
          runSearch(); // 選択した時点で検索更新
        });

        const label = document.createElement("label");
        label.htmlFor = cb.id;
        label.textContent = fullName;
        candidateDiv.appendChild(cb);
        candidateDiv.appendChild(label);
        candidateDiv.appendChild(document.createElement("br"));
      });
    }
  });

  // 曖昧名はここで削除しておく
  inputEl.value = currentInputs.join(", ");
});



function runSearch() {
  const keywordInput = document.getElementById("keyword");
  const tournamentInput = document.getElementById("tournamentId");
  const suggestionsDiv = document.getElementById("suggestions");
  const candidateDiv = document.getElementById("searchPlayerCandidates");

  if (!keywordInput || !tournamentInput || !suggestionsDiv) {
    console.error("DOM要素が見つかりません");
    return;
  }

  const keyword = keywordInput.value.trim();
  const playerInput = document.getElementById("searchPlayerInput").value.trim().toLowerCase();

  if (!keyword && !playerInput) {
    suggestionsDiv.innerHTML = "";
    displayedCount = 0;
    return;
  }

  const matchType = document.querySelector('input[name="matchType"]:checked')?.value || "partial";
  const partialMatch = document.getElementById("matchPartial")?.checked;
  const startMatch   = document.getElementById("matchStart")?.checked;
  const yearFrom = parseInt(document.getElementById("yearFrom")?.value) || null;
  const yearTo   = parseInt(document.getElementById("yearTo")?.value) || null;

  suggestionsDiv.innerHTML = "";
  displayedCount = 0;

  const selectedRules = Array.from(document.querySelectorAll(".ruleCheckbox:checked"))
                             .map(cb => parseInt(cb.value, 10));

  // まずキーワード・ルール・年でフィルタ
  currentMatches = allTournaments.filter(t => {
    const name = t.name.toLowerCase();
    const kw = keyword.toLowerCase();
    const ruleId = parseInt(t.rule, 10);

    // ルールチェック
    if (selectedRules.length > 0 && !selectedRules.includes(ruleId)) return false;

    // キーワード検索
    let nameMatch = !keyword;
    if (keyword) {
      if (matchType === "regex") {
        try {
          nameMatch = new RegExp(keyword, "i").test(t.name);
        } catch (e) {
          console.error("無効な正規表現です:", e);
          suggestionsDiv.innerHTML = "無効な正規表現です";
          return false;
        }
      } else {
        if (startMatch && name.startsWith(kw)) nameMatch = true;
        else if (partialMatch && name.includes(kw)) nameMatch = true;
      }
    }
    if (!nameMatch) return false;

    // 年の範囲
    const year = parseInt(t.year);
    if ((yearFrom && year < yearFrom) || (yearTo && year > yearTo)) return false;

    return true;
  });


  // ★ プレイヤー条件
  if (playerInput) {
    let names = playerInput.split(",").map(s => s.trim()).filter(s => s);

    // tournamentPlayers を利用して高速化
    currentMatches = currentMatches.filter(t => {
      const playersInTournament = tournamentPlayers[t.id] || new Set();

      if (names.length > 1) {
        return names.every(name => {
          const pids = playerIndex[name] || [];
          return pids.some(pid => playersInTournament.has(pid));
        });
      } else {
        const pids = playerIndex[names[0]] || [];
        return pids.some(pid => playersInTournament.has(pid));
      }
    });
  }

  currentMatches.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));

  const existingIds = tournamentInput.value
                      .split(",")
                      .map(s => s.trim())
                      .filter(s => s);

  showNextBatch(existingIds);
}


});

document.addEventListener("DOMContentLoaded", () => {
  const analyzeBtn = document.getElementById("analyzeBtn");
  if (!analyzeBtn) {
    console.warn("analyzeBtn が見つかりません");
    return;
  }

  analyzeBtn.addEventListener("click", function() {
    const tid = document.getElementById("tournamentId").value.trim();
    if (!tid) { alert("大会IDを入力してください"); return; }

    const tidArray = tid.split(",").map(s => s.trim()).filter(s => s).map(Number);
    const filteredmultiple = allGames.filter(g => tidArray.includes(Number(g.tournament)));
    if (filteredmultiple.length === 0) { alert("該当大会なし"); return; }

    const tournamentList = tidArray.map(id => {
      const name = tournamentMap[id]?.name || `大会ID ${id}`;
      const url = `https://www.renju.net/tournament/${id}/`;
      return `<a href="${url}" target="_blank">${name}</a>`;
    });
    const tournamentHtml = tournamentList.join(", ");

    let blackWin=0, draw=0, whiteWin=0, totalMoves=0, blackMoves=0, whiteMoves=0, drawMoves=0;
    const openingCount={}, openingWins={};
    let firstMoveWin=0, secondMoveWin=0, thirdMoveWin=0, fourthMoveWin=0, fifthMoveWin=0;
    let combo34Win=0, combo35Win=0, combo45Win=0;
    let secondDirectTotal=0, secondIndirectTotal=0;

    filteredmultiple.forEach(g => {
      const movesCount = g.moves ? g.moves.split(/\s+/).length : 0;
      totalMoves += movesCount;
      if (g.bresult === 1) { blackWin++; blackMoves+=movesCount; }
      else if (g.bresult === 0.5) { draw++; drawMoves+=movesCount; }
      else if (g.bresult === 0) { whiteWin++; whiteMoves+=movesCount; }

      openingCount[g.opening] = (openingCount[g.opening] || 0) + 1;
      openingWins[g.opening] = openingWins[g.opening] || {black:0,white:0,draw:0};
      if (g.bresult===1) openingWins[g.opening].black++;
      else if (g.bresult===0) openingWins[g.opening].white++;
      else openingWins[g.opening].draw++;

      const swapInfo = analyzeSwap(g);
      if(swapInfo.moveOwners.length >= 5){
        const blackName = allPlayers[g.black]?.surname + " " + allPlayers[g.black]?.name;
        const whiteName = allPlayers[g.white]?.surname + " " + allPlayers[g.white]?.name;
        let winner = null;
        if(g.bresult===1) winner=blackName;
        if(g.bresult===0) winner=whiteName;

        if(winner){
          if(swapInfo.moveOwners[0]===winner) firstMoveWin++;
          if(swapInfo.moveOwners[1]===winner) secondMoveWin++;
          if(swapInfo.moveOwners[2]===winner) thirdMoveWin++;
          if(swapInfo.moveOwners[3]===winner) fourthMoveWin++;
          if(swapInfo.moveOwners[4]===winner) fifthMoveWin++;
          if(swapInfo.moveOwners[2]===winner && swapInfo.moveOwners[3]===winner) combo34Win++;
          if(swapInfo.moveOwners[2]===winner && swapInfo.moveOwners[4]===winner) combo35Win++;
          if(swapInfo.moveOwners[3]===winner && swapInfo.moveOwners[4]===winner) combo45Win++;
        }
      }

      if(movesCount>=2){
        const secondMove = g.moves.split(/\s+/)[1];
        const col = secondMove[0];
        if(col==="h") secondDirectTotal++;
        else if(col==="i"||col==="g") secondIndirectTotal++;
      }
    });

    const drawRatio = (draw/filteredmultiple.length*100).toFixed(2);
    const avgTotal = (totalMoves/filteredmultiple.length).toFixed(2);
    const avgBlack = blackWin?(blackMoves/blackWin).toFixed(2):"-";
    const avgWhite = whiteWin?(whiteMoves/whiteWin).toFixed(2):"-";
    const avgDraw = draw?(drawMoves/draw).toFixed(2):"-";
    const secondDirectRatio = ((secondDirectTotal/filteredmultiple.length)*100).toFixed(2);
    const secondIndirectRatio = ((secondIndirectTotal/filteredmultiple.length)*100).toFixed(2);

    const swapCount={};
    filteredmultiple.forEach(g=>{
      if(g.swap){
        const normSwap = g.swap.replace(/R/g,"+");
        swapCount[normSwap] = (swapCount[normSwap]||0)+1;
      }
    });

    let mostSwapCount=0;
    Object.values(swapCount).forEach(c=>{ if(c>mostSwapCount) mostSwapCount=c; });
    const mostSwapPatterns = Object.entries(swapCount)
      .filter(([_,c]) => c === mostSwapCount)
      .map(([pattern,c]) => `${pattern}（${c}回）`)
      .join(", ");

    const totalGames = blackWin + whiteWin + draw;

    document.getElementById("stats").innerHTML = `
      大会: ${tournamentHtml}<br><br>
      該当対局数: ${filteredmultiple.length}<br>
      黒勝ち: ${blackWin} (${totalGames ? ((blackWin/totalGames)*100).toFixed(2) : "0.00"}%)<br>
      白勝ち: ${whiteWin} (${totalGames ? ((whiteWin/totalGames)*100).toFixed(2) : "0.00"}%)<br>
      引き分け: ${draw} (${totalGames ? ((draw/totalGames)*100).toFixed(2) : "0.00"}%)<br><br>
      大会全体平均手数: ${avgTotal}<br>
      黒勝ち平均手数: ${avgBlack}<br>
      白勝ち平均手数: ${avgWhite}<br>
      引き分け平均手数: ${avgDraw}<br>
      1手目着手者勝利数: ${firstMoveWin} (${((firstMoveWin/(blackWin+whiteWin))*100).toFixed(2)}%)<br>
      2手目着手者勝利数: ${secondMoveWin} (${((secondMoveWin/(blackWin+whiteWin))*100).toFixed(2)}%)<br>
      3手目着手者勝利数: ${thirdMoveWin} (${((thirdMoveWin/(blackWin+whiteWin))*100).toFixed(2)}%)<br>
      4手目着手者勝利数: ${fourthMoveWin} (${((fourthMoveWin/(blackWin+whiteWin))*100).toFixed(2)}%)<br>
      5手目着手者勝利数: ${fifthMoveWin} (${((fifthMoveWin/(blackWin+whiteWin))*100).toFixed(2)}%)<br>
      3+4手目同一着手者勝利数: ${combo34Win} (${((combo34Win/(blackWin+whiteWin))*100).toFixed(2)}%)<br>
      3+5手目同一着手者勝利数: ${combo35Win} (${((combo35Win/(blackWin+whiteWin))*100).toFixed(2)}%)<br>
      4+5手目同一着手者勝利数: ${combo45Win} (${((combo45Win/(blackWin+whiteWin))*100).toFixed(2)}%)<br>
      2手目直接着手: ${secondDirectTotal} (${secondDirectRatio}%)<br>
      2手目間接着手: ${secondIndirectTotal} (${secondIndirectRatio}%)<br>
      最多スワップパターン: ${mostSwapPatterns || "-"}<br>
    `;

    // --- maxSwapPattern を定義 ---
    const maxSwapPattern = Object.keys(swapCount).reduce((a,b)=>swapCount[a]>=swapCount[b]?a:b,"");
    const matchingGames = filteredmultiple.filter(g=>{
      if(!g.swap) return false;
      const normSwap = g.swap.replace(/R/g,"+");
      return normSwap === maxSwapPattern;
    });

    const mostSwapExampleDiv = document.getElementById("mostSwapExample");
    if(matchingGames.length>0){
      const game = matchingGames[Math.floor(Math.random()*matchingGames.length)];
      const url = `https://www.renju.net/tournament/${game.tournament}/game/${game.id}/`;
      const blackName = allPlayers[game.black]?.surname+" "+allPlayers[game.black]?.name || game.black;
      const whiteName = allPlayers[game.white]?.surname+" "+allPlayers[game.white]?.name || game.white;

      const movesRaw = game.moves.split(/\s+/).slice(0,5);
      const swapInfo = analyzeSwap(game);
      const moveOwnerText = movesRaw.map((m,i)=>{
        const owner = swapInfo.moveOwners[i] || "-";
        return `${i+1}手目: ${m} (${owner})`;
      }).join("<br>");

      mostSwapExampleDiv.innerHTML = `
        <p>最多スワップパターン "${maxSwapPattern}" に当てはまる例:</p>
        <p><a href="${url}" target="_blank">対局ID: ${game.id}</a></p>
        <p>黒: ${blackName}, 白: ${whiteName}</p>
        <p>${moveOwnerText}</p>
      `;
    } else {
      mostSwapExampleDiv.innerHTML = `<p>最多スワップパターン "${maxSwapPattern}" に当てはまる対局はありません。</p>`;
    }

    const topOpenings = Object.entries(openingCount).sort((a,b)=>b[1]-a[1]).slice(0,10);
    const tbody = document.querySelector("#openingTable tbody");
    tbody.innerHTML="";
    topOpenings.forEach((o,i)=>{
      const entry = openingMap[o[0]];
      const openingName = entry ? `${entry.ja} (${entry.en})` : o[0];
      tbody.innerHTML+=`<tr><td>${i+1}</td><td>${openingName}</td><td>${o[1]}</td></tr>`;
    });

    renderTop5Moves(filteredmultiple,"top5MovesContainer");

const tbody2 = document.querySelector("#openingWinRateTable tbody");
tbody2.innerHTML = "";
Object.entries(openingWins).forEach(([id, val]) => {
  const total = val.black + val.white + val.draw;
  const entry = openingMap[id];
  // 日本語 + 英語併記
  const displayName = entry ? `${entry.ja} (${entry.en})` : id;

  // ★ data-opening は ID を渡す
  const openingLink = `<a href="#" class="opening-link" data-opening="${id}">${displayName}</a>`;

  tbody2.innerHTML += `
    <tr>
      <td>${openingLink}</td>
      <td>${((val.black/total)*100).toFixed(2)}%</td>
      <td>${((val.white/total)*100).toFixed(2)}%</td>
      <td>${((val.draw/total)*100).toFixed(2)}%</td>
      <td>${total}</td>
    </tr>`;
});


  }); // ← ★ click イベントリスナの閉じ
});   // ← ★ DOMContentLoaded の閉じ

// プレイヤー別集計
document.getElementById("analyzePlayerBtn").addEventListener("click", function() {
  const container = document.getElementById("playerStats");
  container.innerHTML = "";

  const nameInputs = document.getElementById("playerInput").value
                      .split(",")
                      .map(s => s.trim().toLowerCase())
                      .filter(s => s);
  const tidInput = document.getElementById("tournamentId").value.trim();

  if (!nameInputs.length || !tidInput) {
    alert("プレイヤー名と大会IDを入力してください");
    return;
  }

  const tidArray = tidInput.split(",").map(s => s.trim()).filter(s => s).map(Number);

  // 曖昧候補処理
  const candidateDiv = document.getElementById("playerCandidates");
  candidateDiv.innerHTML = "";
  let ambiguousFound = false;
  const inputEl = document.getElementById("playerInput");
  let currentInputs = inputEl.value.split(",").map(s => s.trim()).filter(s => s);

  nameInputs.forEach(name => {
    const candidates = playerIndex[name] || [];
    if (candidates.length > 1) {
      const inTournament = candidates.filter(pid =>
        allGames.some(g =>
          tidArray.includes(Number(g.tournament)) &&
          (g.black === pid || g.white === pid)
        )
      );
      if (inTournament.length > 1) {
        ambiguousFound = true;
        currentInputs = currentInputs.filter(n => n.toLowerCase() !== name);
        candidateDiv.innerHTML += `<p>候補 (${name}) を選択してください:</p>`;
        inTournament.forEach(pid => {
          const p = allPlayers[pid];
          const fullName = `${p.surname} ${p.name}`.trim();
          const cb = document.createElement("input");
          cb.type = "checkbox";
          cb.value = fullName;
          cb.id = `candidate_${pid}`;
          cb.addEventListener("change", function() {
            let cur = inputEl.value.split(",").map(s => s.trim()).filter(s=>s);
            if (this.checked) {
              if (!cur.includes(fullName.toLowerCase())) cur.push(fullName);
            } else {
              cur = cur.filter(x => x.toLowerCase() !== fullName.toLowerCase());
            }
            inputEl.value = cur.join(", ");
          });
          const label = document.createElement("label");
          label.htmlFor = cb.id;
          label.textContent = fullName;
          candidateDiv.appendChild(cb);
          candidateDiv.appendChild(label);
          candidateDiv.appendChild(document.createElement("br"));
        });
      }
    }
  });

  if (ambiguousFound) {
    inputEl.value = currentInputs.join(", ");
    return; // ユーザー選択待ち
  }

  const selectedPids = nameInputs.flatMap(name => playerIndex[name] || []);
  if (!selectedPids.length) {
    alert("該当プレイヤーが見つかりません");
    return;
  }

  const filteredGames = allGames.filter(g => {
    if (tidArray.length && !tidArray.includes(Number(g.tournament))) return false;
    const gamePlayers = [g.black, g.white];
    if (nameInputs.length === 1) {
      return selectedPids.some(pid => gamePlayers.includes(pid));
    } else {
      return selectedPids.some(pid1 =>
        selectedPids.some(pid2 =>
          pid1 !== pid2 && gamePlayers.includes(pid1) && gamePlayers.includes(pid2)
        )
      );
    }
  });

  if (!filteredGames.length) {
    alert("該当大会に対局なし");
    return;
  }

  const actualPids = Array.from(new Set(filteredGames.flatMap(g => [g.black, g.white])))
                           .filter(pid => selectedPids.includes(pid));
  if (!actualPids.length) {
    alert("該当プレイヤーの対局なし");
    return;
  }

  proceedAnalysis(actualPids, filteredGames);

  function proceedAnalysis(pids, games) {
    const statsByPlayer = {};

    pids.forEach(pid => {
      const nameObj = allPlayers[pid];
      const playerName = nameObj.surname + " " + nameObj.name;

      const s = {
        blackWin:0, whiteWin:0, blackLose:0, whiteLose:0,
        blackDraw:0, whiteDraw:0,
        blackWinMoves:0, whiteWinMoves:0,
        blackLoseMoves:0, whiteLoseMoves:0,
        blackDrawMoves:0, whiteDrawMoves:0,
        opening3Count:{}, secondDirect:0, secondIndirect:0
      };

      let firstMoveWin=0, secondMoveWin=0, thirdMoveWin=0, fourthMoveWin=0, fifthMoveWin=0;
      let combo34Win=0, combo35Win=0, combo45Win=0;

      games.forEach(g => {
        if (!(g.black===pid || g.white===pid)) return;

        const moves = g.moves ? g.moves.split(/\s+/) : [];
        const movesCount = moves.length;
        const swapInfo = analyzeSwap(g);

        const isBlack = g.black === pid;
        const isWhite = g.white === pid;

        if (isBlack && g.bresult===1) { s.blackWin++; s.blackWinMoves+=movesCount; }
        if (isWhite && g.bresult===0) { s.whiteWin++; s.whiteWinMoves+=movesCount; }
        if (isBlack && g.bresult===0) { s.blackLose++; s.blackLoseMoves+=movesCount; }
        if (isWhite && g.bresult===1) { s.whiteLose++; s.whiteLoseMoves+=movesCount; }
        if (isBlack && g.bresult===0.5) { s.blackDraw++; s.blackDrawMoves+=movesCount; }
        if (isWhite && g.bresult===0.5) { s.whiteDraw++; s.whiteDrawMoves+=movesCount; }

        // 3手目珠型集計
        if (swapInfo.moveOwners.length>=3 && swapInfo.moveOwners[2]===playerName) {
          const entry = openingMap[g.opening];
          const openingName = entry ? `${entry.ja} (${entry.en})` : g.opening;
          s.opening3Count[openingName] = (s.opening3Count[openingName]||0)+1;
        }

        // 2手目直接/間接
        if (movesCount>=2 && swapInfo.moveOwners[1]===playerName) {
          const col = moves[1][0];
          if (col==='h') s.secondDirect++;
          else if (col==='i'||col==='g') s.secondIndirect++;
        }

        // 勝者確認
        const winnerName = g.bresult===1 ? allPlayers[g.black].surname+" "+allPlayers[g.black].name
                         : g.bresult===0 ? allPlayers[g.white].surname+" "+allPlayers[g.white].name
                         : null;
        const playerWon = winnerName===playerName;

        if (swapInfo.moveOwners.length>=5){
          if(swapInfo.moveOwners[0]===playerName && playerWon) firstMoveWin++;
          if(swapInfo.moveOwners[1]===playerName && playerWon) secondMoveWin++;
          if(swapInfo.moveOwners[2]===playerName && playerWon) thirdMoveWin++;
          if(swapInfo.moveOwners[3]===playerName && playerWon) fourthMoveWin++;
          if(swapInfo.moveOwners[4]===playerName && playerWon) fifthMoveWin++;

          if(swapInfo.moveOwners[2]===playerName && swapInfo.moveOwners[3]===playerName && playerWon) combo34Win++;
          if(swapInfo.moveOwners[2]===playerName && swapInfo.moveOwners[4]===playerName && playerWon) combo35Win++;
          if(swapInfo.moveOwners[3]===playerName && swapInfo.moveOwners[4]===playerName && playerWon) combo45Win++;
        }
      });

      const totalGames = games.filter(g => g.black===pid || g.white===pid).length;
      const totalWin  = s.blackWin + s.whiteWin;
      const totalLose = s.blackLose + s.whiteLose;
      const totalDraw = s.blackDraw + s.whiteDraw;

      // ★ ここを修正 → 英語表記込みで整形
      const opening3List = Object.entries(s.opening3Count)
        .map(([k,v]) => `${k}(${v})`)
        .join(", ");

      statsByPlayer[playerName] = {
        s, totalWin, totalLose, totalDraw, totalGames, pid, opening3List,
        firstMoveWin, secondMoveWin, thirdMoveWin, fourthMoveWin, fifthMoveWin,
        combo34Win, combo35Win, combo45Win
      };
    });

    container.innerHTML = "";

    // === ここから出力（さっきの続き） ===
    Object.entries(statsByPlayer).forEach(([playerName, data]) => {
      const { s, totalWin, totalLose, totalDraw, totalGames, pid, opening3List,
              firstMoveWin, secondMoveWin, thirdMoveWin, fourthMoveWin, fifthMoveWin,
              combo34Win, combo35Win, combo45Win } = data;

      if (totalGames === 0) return;

      const div = document.createElement("div");
      div.id = `playerStats_${pid}`;
      div.style.border = "1px solid #ccc";
      div.style.padding = "10px";
      div.style.marginBottom = "20px";

      // === 詳細統計を復活 ===
      const flexContainer = document.createElement("div");
      flexContainer.style.display = "flex";
      flexContainer.style.flexWrap = "wrap";
      flexContainer.style.gap = "20px";
      div.appendChild(flexContainer);

      // 累計勝敗テーブル
      const summaryTable = document.createElement("table");
      summaryTable.style.borderCollapse = "collapse";
      summaryTable.style.width = "300px";
      summaryTable.innerHTML = `
        <thead>
          <tr><th>${playerName}<br>から見た累計勝敗</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span style="color:green">勝ち: ${totalWin} (${((totalWin/totalGames)*100).toFixed(1)}%)</span> /<br>
              <span style="color:red">負け: ${totalLose} (${((totalLose/totalGames)*100).toFixed(1)}%)</span> /<br>
              <span style="color:blue">引き分け: ${totalDraw} (${((totalDraw/totalGames)*100).toFixed(1)}%)</span><br>
              （合計 ${totalGames}局）<br>
              <span style="color:purple">勝ち点: ${totalWin + totalDraw*0.5} (${(((totalWin + totalDraw*0.5)/totalGames)*100).toFixed(1)}%)</span>
            </td>
          </tr>
        </tbody>
      `;
      flexContainer.appendChild(summaryTable);

      // 詳細統計
        const statsDiv = document.createElement("div");
      statsDiv.style.flex = "1 1 300px";
      statsDiv.innerHTML = `
        プレイヤー: ${playerName} (id=${pid})<br>
        黒勝ち: ${s.blackWin}<br>
        白勝ち: ${s.whiteWin}<br>
        黒負け: ${s.blackLose}<br>
        白負け: ${s.whiteLose}<br>
        黒勝ち平均手数: ${s.blackWin ? (s.blackWinMoves/s.blackWin).toFixed(1) : "-"}<br>
        白勝ち平均手数: ${s.whiteWin ? (s.whiteWinMoves/s.whiteWin).toFixed(1) : "-"}<br>
        黒負け平均手数: ${s.blackLose ? (s.blackLoseMoves/s.blackLose).toFixed(1) : "-"}<br>
        白負け平均手数: ${s.whiteLose ? (s.whiteLoseMoves/s.whiteLose).toFixed(1) : "-"}<br>
        黒番引き分け平均手数: ${s.blackDraw ? (s.blackDrawMoves/s.blackDraw).toFixed(1) : "-"}<br>
        白番引き分け平均手数: ${s.whiteDraw ? (s.whiteDrawMoves/s.whiteDraw).toFixed(1) : "-"}<br>
        3手目着手珠型（登場回数）: ${opening3List}<br>
        2手目直接着手: ${s.secondDirect}<br>
        2手目間接着手: ${s.secondIndirect}<br>
        1手目着手者勝利数: ${firstMoveWin} (${totalWin?((firstMoveWin/totalWin)*100).toFixed(2):"0.00"}%)<br>
        2手目着手者勝利数: ${secondMoveWin} (${totalWin?((secondMoveWin/totalWin)*100).toFixed(2):"0.00"}%)<br>
        3手目着手者勝利数: ${thirdMoveWin} (${totalWin?((thirdMoveWin/totalWin)*100).toFixed(2):"0.00"}%)<br>
        4手目着手者勝利数: ${fourthMoveWin} (${totalWin?((fourthMoveWin/totalWin)*100).toFixed(2):"0.00"}%)<br>
        5手目着手者勝利数: ${fifthMoveWin} (${totalWin?((fifthMoveWin/totalWin)*100).toFixed(2):"0.00"}%)<br>
        3+4手目同一着手者勝利数: ${combo34Win} (${totalWin?((combo34Win/totalWin)*100).toFixed(2):"0.00"}%)<br>
        3+5手目同一着手者勝利数: ${combo35Win} (${totalWin?((combo35Win/totalWin)*100).toFixed(2):"0.00"}%)<br>
        4+5手目同一着手者勝利数: ${combo45Win} (${totalWin?((combo45Win/totalWin)*100).toFixed(2):"0.00"}%)<br>
      `;
      flexContainer.appendChild(statsDiv);

      // === 対局一覧テーブル ===
      const table = document.createElement("table");
      table.style.borderCollapse = "collapse";
      table.style.width = "100%";
      table.style.marginTop = "10px";
      table.innerHTML = `
        <thead>
          <tr>
            <th>リンク</th>
            <th>珠型</th>
            <th>対局者</th>
            <th>結果</th>
            <th>${playerName}から見た勝敗</th>
          </tr>
        </thead>
        <tbody>
          ${games.filter(g => g.black === pid || g.white === pid).map(g => {
            const url = `https://www.renju.net/tournament/${g.tournament}/game/${g.id}/`;
            const players = `${allPlayers[g.black].surname} ${allPlayers[g.black].name} vs ${allPlayers[g.white].surname} ${allPlayers[g.white].name}`;
            const result = g.bresult === 1 ? "黒勝ち" : g.bresult === 0 ? "白勝ち" : "引き分け";
            const entry = openingMap[g.opening];
            const openingName = entry ? `${entry.ja} (${entry.en})` : g.opening;

            const swapInfo = analyzeSwap(g);
            const thirdMover = (swapInfo.moveOwners[2] || "").trim().toLowerCase();
            const thisPlayer = playerName.trim().toLowerCase();
            const openingHighlight = (thirdMover === thisPlayer) ? " style='background-color:yellow;'" : "";

            let playerRecord="", color="";
            if (g.bresult === 0.5) {
              playerRecord = "引き分け"; color = "blue";
            } else if ((g.black === pid && g.bresult === 1) || (g.white === pid && g.bresult === 0)) {
              playerRecord = "勝ち"; color = "green";
            } else {
              playerRecord = "負け"; color = "red";
            }

            return `
              <tr>
                <td>
                  <a href="#" class="game-link" data-gameid="${g.id}">${g.id}</a>
                  (<a href="${url}" target="_blank">RIF</a>)
                </td>
                <td${openingHighlight}>${openingName}</td>
                <td>${players}</td>
                <td>${result}</td>
                <td><span style="color:${color}">${playerRecord}</span></td>
              </tr>
            `;
          }).join("")}
        </tbody>
      `;
            table.querySelectorAll(".game-link").forEach(a => {
        a.addEventListener("click", e => {
          e.preventDefault();
          const gameId = a.dataset.gameid;
          showGamePopup(gameId); // 既存のポップアップ関数を呼ぶ
        });
      });
      div.appendChild(table);

      // === Excel保存ボタン ===
      const excelBtn = document.createElement("button");
      excelBtn.textContent = playerName + " の結果をExcel保存";
      excelBtn.style.display = "block";
      excelBtn.style.marginTop = "10px";
      excelBtn.addEventListener("click", () => {
        const tables = div.querySelectorAll("table");
        if (!tables.length) { alert("出力するテーブルがありません"); return; }

        const wb = XLSX.utils.book_new();
        tables.forEach((table, idx) => {
          const ws = XLSX.utils.table_to_sheet(table);
          if(!ws['!cols']) ws['!cols'] = [];
          ws['!cols'][0] = { wch: 50 };
          ws['!cols'][1] = { wch: 80 };
          XLSX.utils.book_append_sheet(wb, ws, "Sheet" + (idx+1));
        });
        XLSX.writeFile(wb, playerName + "_stats.xlsx");
      });
      div.appendChild(excelBtn);

      // === 画像保存ボタン + 注釈 ===
      const saveContainer = document.createElement("div");
      saveContainer.style.display = "flex";
      saveContainer.style.alignItems = "center";
      saveContainer.style.gap = "10px";

      const saveBtn = document.createElement("button");
      saveBtn.textContent = playerName + " の結果を画像保存";
      saveBtn.addEventListener("click", () => {
        saveBtn.style.display = "none";
        excelBtn.style.display = "none";
        html2canvas(div, { scale: 2 }).then(canvas => {
          const link = document.createElement("a");
          link.download = playerName + "_stats.png";
          link.href = canvas.toDataURL("image/png");
          link.click();
          setTimeout(() => {
            saveBtn.style.display = "block";
            excelBtn.style.display = "block";
          }, 5000);
        });
      });
      saveContainer.appendChild(saveBtn);

      const note = document.createElement("span");
      note.textContent = "※珠型欄黄色は該当プレイヤーが3手目を着手した対局";
      note.style.fontSize = "14px";
      note.style.color = "gray";
      saveContainer.appendChild(note);

      div.appendChild(saveContainer);
      container.appendChild(div);

      // Top5Moves 呼び出し
      renderTop5Moves(games, "tournamentplayerTop5MovesContainer", [pid]);
    });
  }
});





// スワップ履歴検索（プレイヤー名 or 珠型名）
document.getElementById("searchSwapBtn").addEventListener("click", function () {
  const inputEl = document.getElementById("swapPlayerInput");
  const nameOrOpeningInput = inputEl.value.trim().toLowerCase();
  const tid = document.getElementById("tournamentId").value.trim();

  if (!nameOrOpeningInput || !tid) {
    alert("プレイヤー名または珠型名と大会IDを入力してください");
    return;
  }

  const tidArray = tid.split(",").map(s => s.trim()).filter(s => s).map(Number);

  // プレイヤー候補検索
  const candidates = playerIndex[nameOrOpeningInput] || [];
  const candidateDiv = document.getElementById("swapResult");
  candidateDiv.innerHTML = "";

  // プレイヤー候補が存在しない → 珠型検索とみなす
  if (candidates.length === 0) {
    runOpeningSearch(nameOrOpeningInput, tidArray);
    return;
  }

  // ★ 大会参加でフィルタリング
  const tournamentCandidates = candidates.filter(pid =>
    allGames.some(g =>
      tidArray.includes(Number(g.tournament)) &&
      (g.black === pid || g.white === pid)
    )
  );

  if (tournamentCandidates.length === 0) {
    alert("該当大会に対局なし");
    return;
  }

  // ★ もし大会参加者が一人だけなら直接検索
  if (tournamentCandidates.length === 1) {
    runSwapSearch(tournamentCandidates[0], tidArray);
    return;
  }

  // 曖昧候補が複数 → チェックボックスで選択
  candidateDiv.innerHTML += `<p>候補 (${nameOrOpeningInput}) を選択してください:</p>`;
  tournamentCandidates.forEach(pid => {
    const p = allPlayers[pid];
    const fullName = `${p.surname} ${p.name}`.trim();

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.value = pid;
    cb.id = `swap_candidate_${pid}`;
    cb.addEventListener("change", function () {
      if (this.checked) {
        inputEl.value = fullName.toLowerCase();
        runSwapSearch(pid, tidArray);
      }
    });

    const label = document.createElement("label");
    label.htmlFor = cb.id;
    label.textContent = fullName;
    candidateDiv.appendChild(cb);
    candidateDiv.appendChild(label);
    candidateDiv.appendChild(document.createElement("br"));
  });
  return; // ★ 選択待ち
});

 


// --- プレイヤー検索処理 ---
function runSwapSearch(pid, tidArray) {
  const filteredmultiple = allGames.filter(
    g => tidArray.includes(Number(g.tournament)) && (g.black === pid || g.white === pid)
  );

  if (filteredmultiple.length === 0) {
    alert("該当大会に対局なし");
    return;
  }

  const playerName = (allPlayers[pid].surname + " " + allPlayers[pid].name).trim().toLowerCase();

  renderSwapTable(filteredmultiple, playerName, true);
}


// --- 珠型検索処理 ---
function runOpeningSearch(openingNameInput, tidArray) {
  const filteredmultiple = allGames.filter(g => {
    if (!tidArray.includes(Number(g.tournament))) return false;

    const entry = openingMap[g.opening];
    if (!entry) return false;

    const jaName = entry.ja.toLowerCase();
    const enName = entry.en.toLowerCase();
    return (openingNameInput === jaName || openingNameInput === enName);
  });

  if (filteredmultiple.length === 0) {
    alert("該当大会に該当珠型なし");
    return;
  }

  renderSwapTable(filteredmultiple, null, false); // ★ ハイライト無効
}



// --- 共通のテーブル描画 ---
function renderSwapTable(games, playerName, enableHighlight) {
  let tableHtml = `
    <table border="1" style="border-collapse:collapse; margin-top:10px; width:100%;">
      <thead>
        <tr>
          <th>Game</th>
          <th>珠型</th>
          <th>swap</th>
          <th>2手目</th>
          <th>1手目</th>
          <th>2手目</th>
          <th>3手目</th>
          <th>4手目</th>
          <th>5手目</th>
        </tr>
      </thead>
      <tbody>
  `;

  games.forEach(g => {
    const swapInfo = analyzeSwap(g);
    const moves = g.moves.split(/\s+/);
    const second = moves[1] || "";
    let type = "";
    if (second) {
      const col = second[0];
      if (col === "h") type = "直接";
      else if (col === "i" || col === "g") type = "間接";
    }
    const url = `https://www.renju.net/tournament/${g.tournament}/game/${g.id}/`;

    // ★ openingMap から日本語＋英語の文字列に変換
    const entry = openingMap[g.opening];
    const openingName = entry ? `${entry.ja} (${entry.en})` : g.opening;

    // ★ ハイライト処理（プレイヤー検索のみ）
    const thirdMover = (swapInfo.moveOwners[2] || "").trim().toLowerCase();
    const openingHighlight = (enableHighlight && thirdMover === playerName)
      ? " style='background-color:yellow;'" : "";

    tableHtml += `
      <tr>
        <td><a href="${url}" target="_blank">${g.id}</a></td>
        <td${openingHighlight}>${openingName}</td>
        <td>${swapInfo.swap.replace(/R/g, "+")}</td>
        <td>${type}</td>
        <td>${swapInfo.moveOwners[0] || ""}</td>
        <td>${swapInfo.moveOwners[1] || ""}</td>
        <td>${swapInfo.moveOwners[2] || ""}</td>
        <td>${swapInfo.moveOwners[3] || ""}</td>
        <td>${swapInfo.moveOwners[4] || ""}</td>
      </tr>
    `;
  });

  tableHtml += `</tbody></table>`;
  document.getElementById("swapResult").innerHTML = tableHtml;
}


// 頻出棋譜ランキングの珠型ポップアップ処理
document.addEventListener("click", function(e){
  if(e.target.classList.contains("opening-link")){
    e.preventDefault();

    // ★ data-opening には ID を入れてある想定
    const openingId = e.target.dataset.opening;

    const tidArray = document.getElementById("tournamentId").value
                       .split(",").map(s=>s.trim()).filter(s=>s).map(Number);

    // ★ IDでフィルタ
    const openingGames = allGames.filter(g => 
      tidArray.includes(Number(g.tournament)) &&
      String(g.opening) === String(openingId)
    );

    // ★ 表示名を組み立て（日本語＋英語）
    const entry = openingMap[openingId];
    const openingName = entry ? `${entry.ja} (${entry.en})` : openingId;

    // --- サマリーエリアとランキングエリアをクリア
    const summaryDiv = document.getElementById("openingSummary");
    const top10Div = document.getElementById("openingTop10");
    summaryDiv.innerHTML = "";
    top10Div.innerHTML = "";

    // --- 勝敗サマリーを計算
    let blackWins = 0, whiteWins = 0, draws = 0;
    openingGames.forEach(g => {
      if (g.bresult == 1) blackWins++;
      else if (g.bresult == 0) whiteWins++;
      else if (g.bresult == 0.5) draws++;
    });
    const total = blackWins + whiteWins + draws;
    const blackPct = total ? ((blackWins/total)*100).toFixed(1) : 0;
    const whitePct = total ? ((whiteWins/total)*100).toFixed(1) : 0;
    const drawPct  = total ? ((draws/total)*100).toFixed(1) : 0;

    // --- サマリーを表示
    summaryDiv.innerHTML = `
      <div style="margin-bottom:10px; font-weight:bold;">
        該当珠型: ${openingName} → 
        <span style="color:green;">黒 ${blackWins}勝 (${blackPct}%)</span>, 
        <span style="color:red;">白 ${whiteWins}勝 (${whitePct}%)</span>, 
        <span style="color:blue;">引き分け ${draws} (${drawPct}%)</span>
      </div>
    `;

    // --- ランキングを表示（既存関数利用）
    renderTop5Moves(openingGames, "openingTop10");

    // モーダル表示
    document.getElementById("modalOverlay").style.display = "block";
    document.getElementById("openingPopup").style.display = "block";
  }
});

// 閉じる処理
document.getElementById("closeOpeningPopup").addEventListener("click", () => {
  document.getElementById("openingPopup").style.display = "none";
  document.getElementById("modalOverlay").style.display = "none";
});
document.getElementById("modalOverlay").addEventListener("click", () => {
  document.getElementById("openingPopup").style.display = "none";
  document.getElementById("modalOverlay").style.display = "none";
});

document.addEventListener("click", function(e){
  if(e.target.classList.contains("game-popup-link")){
    e.preventDefault();
    const gameId = e.target.dataset.gameid;
    showGamePopup(gameId);
  }
});

// 対局ポップアップ処理
document.getElementById("prevMove").addEventListener("click", ()=>{
  if(currentIndex>0){ currentIndex--; renderCurrentBoard(); }
});
document.getElementById("nextMove").addEventListener("click", ()=>{
  if(currentIndex<currentMoves.length){ currentIndex++; renderCurrentBoard(); }
});

document.getElementById("closeGameModal").addEventListener("click", ()=>{
  document.getElementById("gameModal").style.display="none";
  document.getElementById("gameModalOverlay").style.display="none";
});
document.getElementById("gameModalOverlay").addEventListener("click", ()=>{
  document.getElementById("gameModal").style.display="none";
  document.getElementById("gameModalOverlay").style.display="none";
});

// 5手戻す
document.getElementById("prev5").addEventListener("click", () => {
  currentIndex = Math.max(0, currentIndex - 5);
  renderCurrentBoard();
});

// 5手進める
document.getElementById("next5").addEventListener("click", () => {
  currentIndex = Math.min(currentMoves.length, currentIndex + 5);
  renderCurrentBoard();
});

// 全て戻す
document.getElementById("firstMove").addEventListener("click", () => {
  currentIndex = 0;
  renderCurrentBoard();
});

// 全て進める
document.getElementById("lastMove").addEventListener("click", () => {
  currentIndex = currentMoves.length;
  renderCurrentBoard();
});

// GIF保存
document.getElementById("saveGifBtn").addEventListener("click", async () => {
  console.log("GIF保存処理開始");

  const mode = document.querySelector("input[name='gifMode']:checked").value;
  const interval = parseFloat(document.getElementById("gifInterval").value) || 1;
  const lastDelay = parseFloat(document.getElementById("gifLastDelay").value) || 3;
  const startMove = parseInt(document.getElementById("gifStartMove").value, 10) || 0;

  const gif = new GIF({
    workers: 4,
    quality: 20,
  });

  // ★ 現在の対局の結果を取得
  const gameResult = currentGame?.bresult ?? null;

  // ★ 開始盤面を最初のフレームに追加
  if (startMove > 0) {
    const startCanvas = renderBoardForGif(
      currentMoves.slice(0, startMove),
      mode,
      gameResult,
      false // 開始盤面は結果なし
    );
    gif.addFrame(startCanvas, { delay: interval * 1000 });
    console.log(`開始盤面（${startMove}手目まで）を追加`);
  }

  // ★ startMove+1 手目から最後まで進める
  for (let i = startMove + 1; i <= currentMoves.length; i++) {
    const isLast = i === currentMoves.length;
    const canvas = renderBoardForGif(
      currentMoves.slice(0, i),
      mode,
      gameResult, // ← currentGame の bresult を渡す
      isLast
    );

    const delay = isLast ? lastDelay * 1000 : interval * 1000;
    gif.addFrame(canvas, { delay: delay });
    console.log(`フレーム ${i}/${currentMoves.length} 追加 (delay=${delay}ms)`);
  }

  gif.on("finished", function (blob) {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "game.gif";
    link.click();
  });

  gif.render();
});




// 盤面PNG保存ボタン処理
document.getElementById("saveBoardPng").addEventListener("click", () => {
  const mode = document.querySelector("input[name='pngMode']:checked").value;

  // 現在の盤面を再レンダリング
  const shownMoves = currentMoves.slice(0, currentIndex);
  const canvas = renderBoardForGif(shownMoves, mode);

 if (!canvas) {
    alert(t("boardNotAvailable")); // ★ 翻訳対応
    return;
  }

  // ダウンロード
  const link = document.createElement("a");
  const filename = currentGame
    ? `game_${currentGame.id}_${mode}.png`
    : `board_${mode}.png`;
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
});

let showMoveNumbers = true;
document.getElementById("toggleMoveNumbers").addEventListener("click", () => {
  showMoveNumbers = !showMoveNumbers;
  document.getElementById("toggleMoveNumbers").textContent =
    showMoveNumbers ? t("hideMoveNumbers") : t("showMoveNumbers"); // ★ 翻訳対応
  renderCurrentBoard();
});

  // 再描画
  renderCurrentBoard();
});
