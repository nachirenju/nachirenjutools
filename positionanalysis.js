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
function movesToPosMoves(moves) {
  return moves.map((m, i) => {
    if (!m || m === "-") return null;
    const { x, y } = coordToIndex(m);
    return {
      x, y,
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

// === 検索処理 ===
// === 検索処理 ===
function searchPosition() {
  if (!posMoves || posMoves.length === 0) {
    alert("盤面に石を置いてください");
    return;
  }

  let total = 0, blackWins = 0, whiteWins = 0, draws = 0;
  const nextMoveStats = {};
  const matchedGames = [];

  allGames.forEach(g => {
    let seq = g.moves;
    if (typeof seq === "string") seq = seq.trim().split(/[\s,]+/);
    if (!Array.isArray(seq) || seq.length < posMoves.length) return;

    const gamePosMoves = movesToPosMoves(seq);

  // 一致チェック（手順無視で盤面一致を確認）
// 一致チェック（局面形で判定）
let ok = true;

// 入力局面の石数と同じ手数まで進めた局面を作る
const currentBoard = Array.from({ length: size }, () => Array(size).fill(null));
for (let i = 0; i < posMoves.length; i++) {
  const m = gamePosMoves[i];
  currentBoard[m.y][m.x] = m.color;
}

// posBoardState（入力した局面）と比較
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if (posBoardState[y][x] !== currentBoard[y][x]) {
      ok = false;
      break;
    }
  }
  if (!ok) break;
}
if (!ok) return;


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

    const next = gamePosMoves[posMoves.length];
  if (next) {
    // ★ 入力局面ですでに石が置かれている交点はスキップ
    const alreadyPlaced = posMoves.some(m => m.x === next.x && m.y === next.y);
    if (!alreadyPlaced) {
      const k = next.x + "-" + next.y;
      if (!nextMoveStats[k]) {
        nextMoveStats[k] = { total: 0, black: 0, white: 0, draw: 0 };
      }
      nextMoveStats[k].total++;
      nextMoveStats[k].black += res.black;
      nextMoveStats[k].white += res.white;
      nextMoveStats[k].draw  += res.draw;
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
  title.textContent = "検索結果";
  block.appendChild(title);

  // Moveごとの統計テーブル
  const table = document.createElement("table");
  table.border = "1";
  table.style.borderCollapse = "collapse";
  table.style.margin = "8px 0";

  const header = document.createElement("tr");
  ["Move", "Win", "Draw", "Loss", "Total", "Rate"].forEach(text => {
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
  const allRow = document.createElement("tr");
  allRow.innerHTML = `
    <td><b>All</b></td>
    <td>${totalWin}</td>
    <td>${totalDraw}</td>
    <td>${totalLoss}</td>
    <td>${total}</td>
    <td>${allRate}%</td>
  `;
  table.appendChild(allRow);

  // 個別 Move 行
  const sorted = Object.entries(nextMoveStats).sort((a, b) => b[1].total - a[1].total);
  sorted.forEach(([key, stat], idx) => {
    const row = document.createElement("tr");
    const moveLabel = String.fromCharCode("A".charCodeAt(0) + idx);

    // key "x-y" → 棋譜座標 (例: j8)
    const [x, y] = key.split("-").map(Number);
    const coord = String.fromCharCode("a".charCodeAt(0) + x) + (y + 1);

    const rate = stat.total > 0 ? ((stat.black / stat.total) * 100).toFixed(1) : "0.0";
    row.innerHTML = `
      <td>${moveLabel} ${coord}</td>
      <td>${stat.black}</td>
      <td>${stat.draw}</td>
      <td>${stat.white}</td>
      <td>${stat.total}</td>
      <td>${rate}%</td>
    `;
    table.appendChild(row);
  });

  block.appendChild(table);

  // --- 対局リスト ---
  if (matchedGames.length > 0) {
    const listTitle = document.createElement("h4");
    listTitle.textContent = "該当対局一覧";
    block.appendChild(listTitle);

    const gameTable = document.createElement("table");
    gameTable.border = "1";
    gameTable.style.borderCollapse = "collapse";
    gameTable.style.margin = "8px 0";
    gameTable.style.width = "100%";

    // ヘッダー行
    const header2 = document.createElement("tr");
    ["Game ID", "Black", "Result", "White"].forEach(text => {
      const th = document.createElement("th");
      th.textContent = text;
      header2.appendChild(th);
    });
    gameTable.appendChild(header2);

    // ★ゲームID降順にソート
    matchedGames.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10));

    // ページング処理
    let shownCount = 0;
    const step = 100;

    function renderGameRows() {
      const slice = matchedGames.slice(shownCount, shownCount + step);
      slice.forEach(g => {
        const blackFull = allPlayers[g.black]
          ? `${allPlayers[g.black].surname || ""} ${allPlayers[g.black].name || ""}`.trim()
          : g.black;
        const whiteFull = allPlayers[g.white]
          ? `${allPlayers[g.white].surname || ""} ${allPlayers[g.white].name || ""}`.trim()
          : g.white;

        // bresult → スコア表記
        let resultStr = "";
        if (g.bresult === "1" || g.bresult === 1) resultStr = "<b>1:0</b>";
        else if (g.bresult === "0" || g.bresult === 0) resultStr = "<b>0:1</b>";
        else if (g.bresult === "0.5" || g.bresult === 0.5) resultStr = "<b>0.5:0.5</b>";
        else resultStr = g.bresult;

        const row = document.createElement("tr");

        // Game ID (リンク)
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

      // ボタン制御
      if (shownCount >= matchedGames.length && moreBtn.parentNode) {
        moreBtn.parentNode.removeChild(moreBtn);
      }
    }

    block.appendChild(gameTable);

    // 「もっと見る」ボタン
    if (matchedGames.length > step) {
      const moreBtn = document.createElement("button");
      moreBtn.textContent = "もっと見る";
      moreBtn.style.display = "block";
      moreBtn.style.margin = "10px auto";
      moreBtn.onclick = renderGameRows;
      block.appendChild(moreBtn);
    }

    // 最初の表示
    renderGameRows();
  } else {
    const p = document.createElement("p");
    p.textContent = "該当なし";
    block.appendChild(p);
  }

  // === positionTab に追加 ===
  document.getElementById("positionTab").appendChild(block);
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
