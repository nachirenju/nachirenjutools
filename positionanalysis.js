// ===========================
// positionanalysis.js
// 局面検索 & 次の一手統計
// ===========================

// グローバル共有: allGames, allPlayers, tournamentMap などは tournamentanalysis.js で定義済み
const size = 15;
const cell = 30;
const marginLeft = 25;
const marginRight = 20;
const marginTop = 60;
const marginBottom = 60;

// --- 局面入力用の変数 ---
let posMoves = []; // {x,y,color}
let posBoardState = Array.from({ length: size }, () => Array(size).fill(null));
let posBlackTurn = true;

function drawStars(ctx, marginLeft, marginTop, cell, size) {
  const starCoords = [
    { x: 7,  y: 7 },   // 天元 (H8)
    { x: 3,  y: 3 },   // D4
    { x: 3,  y: 11 },  // D12
    { x: 11, y: 3 },   // L4
    { x: 11, y: 11 }   // L12
  ];

  ctx.fillStyle = "black";
  starCoords.forEach(pos => {
    const cx = marginLeft + pos.x * cell;
    const cy = marginTop + pos.y * cell;  // ★ 修正: 上から数える
    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}


// --- 入力用盤の描画 ---
function renderPositionBoard() {
  const innerSize = (size - 1) * cell;
  const boardSize = size * cell;
  const canvasWidth  = marginLeft + boardSize + marginRight;
  const canvasHeight = marginTop + boardSize + marginBottom;

  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d");

  // 背景
  ctx.fillStyle = "#F9EBCF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 縦横線
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  for (let i = 0; i < size; i++) {
    const x = marginLeft + i * cell + 0.5;
    ctx.beginPath();
    ctx.moveTo(x, marginTop);
    ctx.lineTo(x, marginTop + innerSize);
    ctx.stroke();

    const y = marginTop + i * cell + 0.5;
    ctx.beginPath();
    ctx.moveTo(marginLeft, y);
    ctx.lineTo(marginLeft + innerSize, y);
    ctx.stroke();
  }

  // 外枠
  ctx.lineWidth = 2;
  ctx.strokeRect(marginLeft+0.5, marginTop+0.5, innerSize, innerSize);

  // 星
  drawStars(ctx, marginLeft, marginTop, cell, size);

  // 石を描画
  posMoves.forEach((m, idx) => {
    const cx = marginLeft + m.x * cell;
    const cy = marginTop + (size - 1 - m.y) * cell;
    ctx.beginPath();
    ctx.arc(cx, cy, 12, 0, Math.PI * 2);
    ctx.fillStyle = m.color === "black" ? "black" : "white";
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = m.color === "black" ? "white" : "black";
    ctx.font = "12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(idx+1, cx, cy);
  });

    // --- 座標ラベル ---
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

// --- クリック入力 ---
canvas.oncontextmenu = e => e.preventDefault();
canvas.addEventListener("click", e => handlePositionClick(e));
canvas.addEventListener("contextmenu", e => handlePositionRightClick(e));

const container = document.getElementById("positionBoard");
container.innerHTML = "";
container.appendChild(canvas);

// ボタン類（なければ生成）
let controls = document.getElementById("positionControls");
if (!controls) {
  controls = document.createElement("div");
  controls.id = "positionControls";
  controls.style.marginTop = "8px";

  const backBtn = document.createElement("button");
  backBtn.textContent = "◀ 一手戻す";
  backBtn.onclick = undoPositionMove;
  controls.appendChild(backBtn);

  const forwardBtn = document.createElement("button");
  forwardBtn.textContent = "一手進める ▶";
  forwardBtn.onclick = redoPositionMove;
  controls.appendChild(forwardBtn);

  container.parentElement.appendChild(controls);
}
}
// --- 左クリックで着手 ---
function handlePositionClick(e) {
  const rect = e.target.getBoundingClientRect();
  const x = Math.round((e.clientX - rect.left - marginLeft) / cell);
  const y = size - 1 - Math.round((e.clientY - rect.top - marginTop) / cell);
  if (x < 0 || y < 0 || x >= size || y >= size) return;
  if (posBoardState[y][x]) return; // すでに石あり

  const color = posBlackTurn ? "black" : "white";
  posBoardState[y][x] = color;
  posMoves.push({x,y,color});
  posBlackTurn = !posBlackTurn;

  renderPositionBoard();
}

// --- 右クリックで一手戻す ---
function handlePositionRightClick(e) {
  e.preventDefault();
  undoPositionMove();
}

// 一手戻す
function undoPositionMove() {
  if (posMoves.length === 0) return;
  const last = posMoves.pop();
  posBoardState[last.y][last.x] = null;
  posBlackTurn = (last.color === "black"); // 元に戻す
  renderPositionBoard();
}

// 一手進める（仮：戻した手を保存しておく場合）
let redoStack = [];

function undoPositionMove() {
  if (posMoves.length === 0) return;
  const last = posMoves.pop();
  posBoardState[last.y][last.x] = null;
  posBlackTurn = (last.color === "black");
  redoStack.push(last);
  renderPositionBoard();
}

function redoPositionMove() {
  if (redoStack.length === 0) return;
  const move = redoStack.pop();
  posBoardState[move.y][move.x] = move.color;
  posMoves.push(move);
  posBlackTurn = (move.color === "black") ? false : true;
  renderPositionBoard();
}


// === 座標文字列 → インデックス変換 ===
function coordToIndex(pos) {
  const col = pos[0].toLowerCase();
  const row = parseInt(pos.slice(1), 10);
  const x = col.charCodeAt(0) - "a".charCodeAt(0);
  const y = row - 1;
  return { x, y };
}

// === 棋譜配列 (["h8","i7",...]) → posMoves形式 ===
// === 棋譜配列 → posMoves形式 ===
function movesToPosMoves(moves) {
  return moves.map((m, i) => {
    if (!m || m === "-") return null;
    const { x, y } = coordToIndex(m);
    return {
      x,
      y: size - 1 - y, // ★ ここで上下反転して入力盤に合わせる
      color: i % 2 === 0 ? "black" : "white"
    };
  }).filter(Boolean);
}


function parseResult(g) {
  // bresultが数値っぽければそれを返す
  if (g.bresult === "1") return { black: 1, white: 0, draw: 0 };
  if (g.bresult === "0") return { black: 0, white: 1, draw: 0 };
  if (g.bresult === "0.5") return { black: 0, white: 0, draw: 1 };

  // それ以外 → result文字列を解釈
  if (g.result) {
    if (g.result.includes("1-0")) return { black: 1, white: 0, draw: 0 };
    if (g.result.includes("0-1")) return { black: 0, white: 1, draw: 0 };
    if (g.result.includes("0.5") || g.result.includes("½")) return { black: 0, white: 0, draw: 1 };
  }

  return { black: 0, white: 0, draw: 0 };
}

// === 入力局面を文字列化（x,y,color） ===
function boardToKey(moves, size) {
  // "x-y-color" を結合した文字列
  return moves.map(m => `${m.x}-${m.y}-${m.color}`).sort().join("|");
}

// === 基本変換関数 ===
function rot90(x, y, N)   { return { x: N - 1 - y, y: x }; }
function rot180(x, y, N)  { return { x: N - 1 - x, y: N - 1 - y }; }
function rot270(x, y, N)  { return { x: y, y: N - 1 - x }; }
function flipH(x, y, N)   { return { x: N - 1 - x, y }; }
function flipV(x, y, N)   { return { x, y: N - 1 - y }; }

// === ハッシュ化（局面一致用：順序無視） ===
function hashMovesNormalized(moves) {
  const arr = moves.map(m => {
    const c = (m.color === "black") ? 1 : 2;
    return (m.x & 31) | ((m.y & 31) << 5) | (c << 10);
  });
  arr.sort((a, b) => a - b);
  let h = 0;
  for (const code of arr) {
    h = ((h << 5) - h + code) | 0;
  }
  return h;
}

function movesEqualUnordered(a, b) {
  if (a.length !== b.length) return false;
  // 両方を (x,y,color) で文字列化してソートして比較
  const norm = ms => ms.map(m => `${m.x},${m.y},${m.color}`).sort().join("|");
  return norm(a) === norm(b);
}
function equalWithSymmetry(posMoves, gameMoves, size) {
  const gameSlice = gameMoves.slice(0, posMoves.length);
  if (posMoves.length !== gameSlice.length) return null;

  // 石数チェック
  const cnt = ms => ms.reduce((o,m)=>{o[m.color]++; return o;}, {black:0,white:0});
  const a = cnt(posMoves), b = cnt(gameSlice);
  if (a.black !== b.black || a.white !== b.white) return null;

  function movesEqualUnordered(a, b) {
    if (a.length !== b.length) return false;
    const norm = ms => ms.map(m => `${m.x},${m.y},${m.color}`).sort().join("|");
    return norm(a) === norm(b);
  }

  // identity
  if (movesEqualUnordered(gameSlice, posMoves)) {
    return { name:"identity", f:(x,y,N)=>({x,y}) };
  }

  const transforms = [
    { name:"rot180", f:rot180 },
    { name:"rot90",  f:rot90 },
    { name:"rot270", f:rot270 },
    { name:"flipH",  f:flipH },
    { name:"flipV",  f:flipV },
    { name:"flipH+rot90",
      f:(x,y,N)=>{let t=flipH(x,y,N);return rot90(t.x,t.y,N);} },
    { name:"flipV+rot90",
      f:(x,y,N)=>{let t=flipV(x,y,N);return rot90(t.x,t.y,N);} },
  ];

  for (const {name,f} of transforms) {
    const transformed = gameSlice.map(m=>{
      const {x,y} = f(m.x,m.y,size);
      return {x,y,color:m.color};
    });
    if (movesEqualUnordered(transformed, posMoves)) {
      return { name, f };
    }
  }

  return null;
}



// === 検索処理 ===
function searchPosition() {
  if (!posMoves || posMoves.length === 0) {
    alert("盤面に石を置いてください");
    return;
  }

  let total = 0, blackWins = 0, whiteWins = 0, draws = 0;

  // 平均手数用
  let sumAllMoves = 0, sumBlackMoves = 0, sumWhiteMoves = 0, sumDrawMoves = 0;
  let countBlack = 0, countWhite = 0, countDraw = 0;

  const nextMoveStats = {};
  const matchedGames = [];

  allGames.forEach(g => {
    let seq = g.moves;
    if (typeof seq === "string") seq = seq.trim().split(/[\s,]+/);
    if (!Array.isArray(seq) || seq.length < posMoves.length) return;

    const gamePosMoves = movesToPosMoves(seq);

    // 一致チェック（対称性込み）
const transform = equalWithSymmetry(posMoves, gamePosMoves, size);
if (!transform) return;

// === bresult を直接解釈 ===
let res = { black: 0, white: 0, draw: 0 };
if (g.bresult === "1" || g.bresult === 1) res.black = 1;
else if (g.bresult === "0" || g.bresult === 0) res.white = 1;
else if (g.bresult === "0.5" || g.bresult === 0.5) res.draw = 1;

// 一致した
total++;
blackWins += res.black;
whiteWins += res.white;
draws += res.draw;

// 終局手数
const totalMovesInGame = gamePosMoves.length;
sumAllMoves += totalMovesInGame;
if (res.black) { sumBlackMoves += totalMovesInGame; countBlack++; }
if (res.white) { sumWhiteMoves += totalMovesInGame; countWhite++; }
if (res.draw)  { sumDrawMoves  += totalMovesInGame; countDraw++; }

// 次の一手統計
const next = gamePosMoves[posMoves.length];
if (next) {
  console.log("GameID:", g.id, "transform:", transform.name, 
            "next raw:", next, 
            "next transformed:", transform.f(next.x,next.y,size));

  // ★ここで「入力局面の座標系」に変換してから統計に加える
  const {x, y} = transform.f(next.x, next.y, size);

  const alreadyPlaced = posMoves.some(m => m.x === x && m.y === y);
  if (!alreadyPlaced) {
    const k = x + "-" + y;
    if (!nextMoveStats[k]) {
      nextMoveStats[k] = {
        total: 0, black: 0, white: 0, draw: 0,
        sumAll: 0, sumBlack: 0, sumWhite: 0, sumDraw: 0,
        cntBlack: 0, cntWhite: 0, cntDraw: 0,
        games: { black: [], white: [], draw: [] }
      };
    }
    nextMoveStats[k].total++;
    nextMoveStats[k].black += res.black;
    nextMoveStats[k].white += res.white;
    nextMoveStats[k].draw  += res.draw;

    nextMoveStats[k].sumAll += totalMovesInGame;
    if (res.black) { 
      nextMoveStats[k].sumBlack += totalMovesInGame; 
      nextMoveStats[k].cntBlack++; 
      nextMoveStats[k].games.black.push(g);
    }
    if (res.white) { 
      nextMoveStats[k].sumWhite += totalMovesInGame; 
      nextMoveStats[k].cntWhite++; 
      nextMoveStats[k].games.white.push(g);
    }
    if (res.draw)  { 
      nextMoveStats[k].sumDraw  += totalMovesInGame; 
      nextMoveStats[k].cntDraw++; 
      nextMoveStats[k].games.draw.push(g);
    }
  }
}

matchedGames.push(g);
});


  // === 入力盤を再描画して次の一手マーク ===
  renderPositionBoard();
  overlayNextMoveMarks(nextMoveStats);

  // === 古い統計ブロックを消す ===
  const old = document.getElementById("positionResultBlock");
  if (old) old.remove();

  // === 新しいブロックを作る ===
  const block = document.createElement("div");
  block.id = "positionResultBlock";

  // タイトル
  const title = document.createElement("h3");
  title.textContent = "Search Result";
  block.appendChild(title);

  // ★ ヒット件数を表示
  const hitInfo = document.createElement("p");
  hitInfo.textContent = `The games searched: ${total}`;
  block.appendChild(hitInfo);


  // Moveごとの統計テーブル
  const table = document.createElement("table");
  table.border = "1";
  table.style.borderCollapse = "collapse";
  table.style.margin = "8px 0";

  const header = document.createElement("tr");
  ["Move", "Black Win", "Draw", "White Win", "Total", "Rate",
   "AvgMoves", "AvgMoves(BlackWin)", "AvgMoves(WhiteWin)", "AvgMoves(Draw)"]
    .forEach(text => {
      const th = document.createElement("th");
      th.textContent = text;
      header.appendChild(th);
    });
  table.appendChild(header);

  // All 行
  let totalWin = 0, totalDraw = 0, totalLoss = 0;
  Object.values(nextMoveStats).forEach(stat => {
    totalWin += stat.black;
    totalLoss += stat.white;
    totalDraw += stat.draw;
  });

  const allRate = total > 0 ? ((totalWin / total) * 100).toFixed(1) : "0.0";
  const avgAll = (total > 0) ? (sumAllMoves / total).toFixed(1) : "-";
  const avgB   = (countBlack > 0) ? (sumBlackMoves / countBlack).toFixed(1) : "-";
  const avgW   = (countWhite > 0) ? (sumWhiteMoves / countWhite).toFixed(1) : "-";
  const avgD   = (countDraw  > 0) ? (sumDrawMoves  / countDraw ).toFixed(1) : "-";

  const allRow = document.createElement("tr");
  allRow.innerHTML = `
    <td><b>All</b></td>
    <td>${totalWin}</td>
    <td>${totalDraw}</td>
    <td>${totalLoss}</td>
    <td>${total}</td>
    <td>${allRate}%</td>
    <td>${avgAll}</td>
    <td>${avgB}</td>
    <td>${avgW}</td>
    <td>${avgD}</td>
  `;
  table.appendChild(allRow);

  // 個別 Move 行
  const sorted = Object.entries(nextMoveStats).sort((a, b) => b[1].total - a[1].total);
  sorted.forEach(([key, stat], idx) => {
    const row = document.createElement("tr");
    const moveLabel = String.fromCharCode("A".charCodeAt(0) + idx);

    const [x, y] = key.split("-").map(Number);
    const coord = String.fromCharCode("a".charCodeAt(0) + x) + (y + 1);

    const rate = stat.total > 0 ? ((stat.black / stat.total) * 100).toFixed(1) : "0.0";
    const avgAllM = (stat.total > 0) ? (stat.sumAll / stat.total).toFixed(1) : "-";
    const avgBM   = (stat.cntBlack > 0) ? (stat.sumBlack / stat.cntBlack).toFixed(1) : "-";
    const avgWM   = (stat.cntWhite > 0) ? (stat.sumWhite / stat.cntWhite).toFixed(1) : "-";
    const avgDM   = (stat.cntDraw  > 0) ? (stat.sumDraw  / stat.cntDraw ).toFixed(1) : "-";

    // Move
    const tdMove = document.createElement("td");
    tdMove.textContent = `${moveLabel} ${coord}`;
    row.appendChild(tdMove);

    // Black Win
const tdBlack = document.createElement("td");
if (stat.games.black.length > 0) {
  tdBlack.innerHTML = `<b>${stat.black}</b>`;
  tdBlack.style.cursor = "pointer";
  tdBlack.style.color = "blue";
  tdBlack.onclick = () => showGameListPopup(stat.games.black, `${coord} - Black Win`);
} else {
  tdBlack.textContent = stat.black;
}
row.appendChild(tdBlack);

// Draw
const tdDraw = document.createElement("td");
if (stat.games.draw.length > 0) {
  tdDraw.innerHTML = `<b>${stat.draw}</b>`;
  tdDraw.style.cursor = "pointer";
  tdDraw.style.color = "blue";
  tdDraw.onclick = () => showGameListPopup(stat.games.draw, `${coord} - Draw`);
} else {
  tdDraw.textContent = stat.draw;
}
row.appendChild(tdDraw);

// White Win
const tdWhite = document.createElement("td");
if (stat.games.white.length > 0) {
  tdWhite.innerHTML = `<b>${stat.white}</b>`;
  tdWhite.style.cursor = "pointer";
  tdWhite.style.color = "blue";
  tdWhite.onclick = () => showGameListPopup(stat.games.white, `${coord} - White Win`);
} else {
  tdWhite.textContent = stat.white;
}
row.appendChild(tdWhite);


    // Total
    const tdTotal = document.createElement("td");
    tdTotal.textContent = stat.total;
    row.appendChild(tdTotal);

    // Rate
    const tdRate = document.createElement("td");
    tdRate.textContent = `${rate}%`;
    row.appendChild(tdRate);

    // AvgMoves
    const tdAvgAll = document.createElement("td");
    tdAvgAll.textContent = avgAllM;
    row.appendChild(tdAvgAll);

    const tdAvgB = document.createElement("td");
    tdAvgB.textContent = avgBM;
    row.appendChild(tdAvgB);

    const tdAvgW = document.createElement("td");
    tdAvgW.textContent = avgWM;
    row.appendChild(tdAvgW);

    const tdAvgD = document.createElement("td");
    tdAvgD.textContent = avgDM;
    row.appendChild(tdAvgD);

    table.appendChild(row);
  });

  block.appendChild(table);

  // --- 対局リスト（全体） ---
  if (matchedGames.length > 0) {
    const listTitle = document.createElement("h4");
    listTitle.textContent = "該当対局一覧";
    block.appendChild(listTitle);

    const gameTable = document.createElement("table");
    gameTable.border = "1";
    gameTable.style.borderCollapse = "collapse";
    gameTable.style.margin = "8px 0";
    gameTable.style.width = "100%";

    const header2 = document.createElement("tr");
    ["Game ID", "Black", "Result", "White"].forEach(text => {
      const th = document.createElement("th");
      th.textContent = text;
      header2.appendChild(th);
    });
    gameTable.appendChild(header2);

    matchedGames.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));

    let shownCount = 0;
    const step = 100;
    let moreBtn;

    function renderGameRows() {
      const slice = matchedGames.slice(shownCount, shownCount + step);
      slice.forEach(g => {
        const blackFull = allPlayers[g.black]
          ? `${allPlayers[g.black].surname || ""} ${allPlayers[g.black].name || ""}`.trim()
          : g.black;
        const whiteFull = allPlayers[g.white]
          ? `${allPlayers[g.white].surname || ""} ${allPlayers[g.white].name || ""}`.trim()
          : g.white;

        let resultStr = "";
        if (g.bresult === "1" || g.bresult === 1) resultStr = "<b>1:0</b>";
        else if (g.bresult === "0" || g.bresult === 0) resultStr = "<b>0:1</b>";
        else if (g.bresult === "0.5" || g.bresult === 0.5) resultStr = "<b>0.5:0.5</b>";
        else resultStr = g.bresult;

        const row = document.createElement("tr");

        const tdId = document.createElement("td");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = g.id;
        a.onclick = () => { showGamePopup(g.id); return false; };
        tdId.appendChild(a);

        const tdBlack = document.createElement("td");
        tdBlack.textContent = blackFull;

        const tdResult = document.createElement("td");
        tdResult.innerHTML = resultStr;
        tdResult.style.textAlign = "center";

        const tdWhite = document.createElement("td");
        tdWhite.textContent = whiteFull;

        row.appendChild(tdId);
        row.appendChild(tdBlack);
        row.appendChild(tdResult);
        row.appendChild(tdWhite);

        gameTable.appendChild(row);
      });

      shownCount += slice.length;

      if (shownCount >= matchedGames.length && moreBtn && moreBtn.parentNode) {
        moreBtn.parentNode.removeChild(moreBtn);
      }
    }

    block.appendChild(gameTable);

    if (matchedGames.length > step) {
      moreBtn = document.createElement("button");
      moreBtn.textContent = "もっと見る";
      moreBtn.style.display = "block";
      moreBtn.style.margin = "10px auto";
      moreBtn.onclick = renderGameRows;
      block.appendChild(moreBtn);
    }

    renderGameRows();
  } else {
    const p = document.createElement("p");
    p.textContent = "該当なし";
    block.appendChild(p);
  }

  document.getElementById("positionTab").appendChild(block);
}

// === ゲームリストをモーダル表示 ===
function showGameListPopup(games, titleText) {
  // 既存のモーダルを削除
  let old = document.getElementById("gameListPopup");
  if (old) old.remove();

  const overlay = document.createElement("div");
  overlay.id = "gameListPopup";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  overlay.style.zIndex = "2000";
  overlay.onclick = () => overlay.remove();

  const box = document.createElement("div");
  box.style.position = "absolute";
  box.style.top = "50%";
  box.style.left = "50%";
  box.style.transform = "translate(-50%, -50%)";
  box.style.background = "white";
  box.style.padding = "20px";
  box.style.maxHeight = "80%";
  box.style.overflowY = "auto";
  box.style.width = "80%";

  const h3 = document.createElement("h3");
  h3.textContent = titleText;
  box.appendChild(h3);

  const table = document.createElement("table");
  table.border = "1";
  table.style.borderCollapse = "collapse";
  table.style.width = "100%";

  const header = document.createElement("tr");
  ["Game ID", "Black", "Result", "White"].forEach(t => {
    const th = document.createElement("th");
    th.textContent = t;
    header.appendChild(th);
  });
  table.appendChild(header);

   games.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));

  games.forEach(g => {
    const row = document.createElement("tr");

    // Game ID
    const tdId = document.createElement("td");
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = g.id;
    a.onclick = () => { showGamePopup(g.id); return false; };
    tdId.appendChild(a);

    // Black full name
    const blackFull = allPlayers[g.black]
      ? `${allPlayers[g.black].surname || ""} ${allPlayers[g.black].name || ""}`.trim()
      : g.black;
    const tdBlack = document.createElement("td");
    tdBlack.textContent = blackFull;

    // Result
    const tdResult = document.createElement("td");
    if (g.bresult === "1" || g.bresult === 1) tdResult.innerHTML = "<b>1:0</b>";
    else if (g.bresult === "0" || g.bresult === 0) tdResult.innerHTML = "<b>0:1</b>";
    else if (g.bresult === "0.5" || g.bresult === 0.5) tdResult.innerHTML = "<b>0.5:0.5</b>";
    else tdResult.textContent = g.bresult;
    tdResult.style.textAlign = "center";

    // White full name
    const whiteFull = allPlayers[g.white]
      ? `${allPlayers[g.white].surname || ""} ${allPlayers[g.white].name || ""}`.trim()
      : g.white;
    const tdWhite = document.createElement("td");
    tdWhite.textContent = whiteFull;

    row.appendChild(tdId);
    row.appendChild(tdBlack);
    row.appendChild(tdResult);
    row.appendChild(tdWhite);

    table.appendChild(row);
  });

  box.appendChild(table);
  overlay.appendChild(box);
  document.body.appendChild(overlay);
}






// === 盤にABCマークを描くだけ ===
function overlayNextMoveMarks(nextStats) {
  const canvas = document.querySelector("#positionBoard canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const sorted = Object.entries(nextStats).sort((a, b) => b[1].total - a[1].total);
  sorted.forEach(([key, stat], idx) => {
    const [x, y] = key.split("-").map(Number);
    const cx = marginLeft + x * cell;
    const cy = marginTop + (size - 1 - y) * cell;

    // ★ 背景を白円で塗る（半径14pxくらい）
    ctx.beginPath();
    ctx.arc(cx, cy, 14, 0, Math.PI * 2);
    ctx.fillStyle = "#F9EBCF"; // 盤と同じ色にしてもよい
    ctx.fill();

    // 赤文字を上に描画
    ctx.fillStyle = "red";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String.fromCharCode("A".charCodeAt(0) + idx), cx, cy);
  });
}





// === ボタンイベント ===
window.addEventListener("load", () => {
  const btn = document.getElementById("searchPositionBtn");
  if (btn) {
    btn.addEventListener("click", searchPosition);
  }
});

window.addEventListener("load", () => {
  renderPositionBoard();
});
