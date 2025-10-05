 const size = 15;
    const cell = 30;
    const marginLeft = 25;
    const marginRight = 20;
    const marginTop = 60;
    const marginBottom = 60;

    let freeMode = false;
    let blackTurn = true;
    let moves = []; // {x, y, color, number}
    let boardState = Array.from({ length: size }, () => Array(size).fill(null));

    // ★ 追加: ラベル管理
    let labels = []; // {x,y,text}
    let nextNumber = 1;
    let nextAlphaCode = "A".charCodeAt(0);

    // 座標描画
    function drawCoordinates(ctx, canvasWidth, canvasHeight, innerSize) {
      const letters = "ABCDEFGHIJKLMNO".split("");
      ctx.font = "bold 14px sans-serif";
      ctx.fillStyle = "black";

      // 横軸アルファベット
      ctx.textAlign = "center";
      for (let i = 0; i < size; i++) {
        ctx.fillText(letters[i], marginLeft + i * cell, marginTop + innerSize + 15);
      }

      // 縦軸数字
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for (let i = 0; i < size; i++) {
        ctx.fillText(size - i, marginLeft - 5, marginTop + i * cell + cell / 2 - 15);
      }
    }

    // 星描画
    function drawStars(ctx) {
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
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // コメント描画
    function drawComments(ctx, canvasWidth, canvasHeight) {
      const topText = document.getElementById("commentTop").value;
      const bottomText = document.getElementById("commentBottom").value;

      ctx.font = "16px sans-serif";
      ctx.fillStyle = "black";

      if (topText.trim() !== "") {
        ctx.textAlign = "center";
        const lines = topText.split("\n");
        lines.forEach((line, i) => {
          ctx.fillText(line, canvasWidth / 2, 25 + i * 20);
        });
      }

      if (bottomText.trim() !== "") {
        ctx.textAlign = "left";
        const lines = bottomText.split("\n");
        const startY = marginTop + (size * cell) + 5;
        lines.forEach((line, i) => {
          ctx.fillText(line, marginLeft, startY + i * 20);
        });
      }
    }

    // --- 盤描画 ---
    function renderBoard() {
      const innerSize = (size - 1) * cell;
      const boardSize = size * cell;
      const canvasWidth  = marginLeft + boardSize + marginRight;
      const canvasHeight = marginTop + boardSize + marginBottom;

      const canvas = document.createElement("canvas");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#F9EBCF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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

      ctx.lineWidth = 2;
      ctx.strokeRect(marginLeft + 0.5, marginTop + 0.5, innerSize, innerSize);

      drawCoordinates(ctx, canvas.width, canvas.height, innerSize);
      drawStars(ctx);

      moves.forEach((m) => {
        const cx = marginLeft + m.x * cell;
        const cy = marginTop + (size - 1 - m.y) * cell;

        ctx.beginPath();
        ctx.arc(cx, cy, 12, 0, Math.PI * 2);
        ctx.fillStyle = m.color === "black" ? "black" : "white";
        ctx.fill();
        ctx.stroke();

        if (m.number !== null) {
          ctx.fillStyle = m.color === "black" ? "white" : "black";
          ctx.font = "bold 12px sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(m.number, cx, cy);
        }
      });

      // ★ 修正: ラベル描画（背景で線を消す）
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      labels.forEach(l => {
        const cx = marginLeft + l.x * cell;
        const cy = marginTop + (size - 1 - l.y) * cell;

        ctx.fillStyle = "#F9EBCF";
        ctx.fillRect(cx - cell/2 + 1, cy - cell/2 + 1, cell - 2, cell - 2);

        ctx.fillStyle = "red";
        ctx.fillText(l.text, cx, cy);
      });

      drawComments(ctx, canvas.width, canvas.height);

      canvas.oncontextmenu = e => e.preventDefault();
      canvas.addEventListener("click", e => handleClick(e, "left"));
      canvas.addEventListener("contextmenu", e => handleClick(e, "right"));

      const container = document.getElementById("board");
      container.innerHTML = "";
      container.appendChild(canvas);

      const letters2 = "abcdefghijklmno";
      const kifu = moves
        .filter(m => m.number !== null)
        .sort((a, b) => a.number - b.number)
        .map(m => letters2[m.x] + (m.y + 1))
        .join("");
      const textarea = document.getElementById("kifuInput");
      if (textarea && textarea.value !== kifu) {
        textarea.value = kifu;
      }
    }

// --- クリック処理 ---
function handleClick(e, button) {
  const rect = e.target.getBoundingClientRect();
  const x = Math.round((e.clientX - rect.left - marginLeft) / cell);
  const y = size - 1 - Math.round((e.clientY - rect.top - marginTop) / cell);

  if (x < 0 || y < 0 || x >= size || y >= size) return;

  // ★ 任意ラベル入力モード
  const labelMode = document.getElementById("enableCustomLabel").checked;
  if (labelMode) {
    const inputEl = document.getElementById("labelInputText");
    const text = inputEl.value.trim().slice(0, 3);
    if (text) {
      // === ラベルを追加または上書き ===
      const existing = labels.find(l => l.x === x && l.y === y);
      if (existing) {
        existing.text = text;
      } else {
        labels.push({ x, y, text });
      }
      renderBoard();

      // === 入力内容に応じて次の値を自動更新 ===
      // [1] アルファベット一文字（大文字 or 小文字）
      if (/^[A-Za-z]$/.test(text)) {
        const code = text.charCodeAt(0);
        let next = text;
        if (text >= "A" && text <= "Z") {
          next = (code < 90) ? String.fromCharCode(code + 1) : "A";
        } else if (text >= "a" && text <= "z") {
          next = (code < 122) ? String.fromCharCode(code + 1) : "a";
        }
        inputEl.value = next;
      }
      // [2] 数字のみ
      else if (/^[0-9]+$/.test(text)) {
        inputEl.value = String(parseInt(text, 10) + 1);
      }
      // [3] アルファベット＋数字（例: a1, B3）
      else if (/^([A-Za-z])([0-9]+)$/.test(text)) {
        const match = text.match(/^([A-Za-z])([0-9]+)$/);
        const alpha = match[1];
        const num = parseInt(match[2], 10) + 1;
        inputEl.value = alpha + num;
      }
      // [4] その他（記号など）はそのまま
      else {
        inputEl.value = text;
      }
    }
    return;
  }

  // --- 自由配置モード ---
  if (freeMode) {
    // 黒石配置モード優先
    if (placeBlack.checked) {
      if (boardState[y][x] === "black") {
        boardState[y][x] = null;
        moves = moves.filter(m => !(m.x === x && m.y === y));
      } else {
        boardState[y][x] = "black";
        moves.push({ x, y, color: "black", number: null });
      }
      renderBoard();
      return;
    }

    // 白石配置モード優先
    if (placeWhite.checked) {
      if (boardState[y][x] === "white") {
        boardState[y][x] = null;
        moves = moves.filter(m => !(m.x === x && m.y === y));
      } else {
        boardState[y][x] = "white";
        moves.push({ x, y, color: "white", number: null });
      }
      renderBoard();
      return;
    }

    // チェックなし → 左クリック=黒 / 右クリック=白
    if (button === "left") {
      if (boardState[y][x] === "black") {
        boardState[y][x] = null;
        moves = moves.filter(m => !(m.x === x && m.y === y));
      } else {
        boardState[y][x] = "black";
        moves.push({ x, y, color: "black", number: null });
      }
    } else if (button === "right") {
      if (boardState[y][x] === "white") {
        boardState[y][x] = null;
        moves = moves.filter(m => !(m.x === x && m.y === y));
      } else {
        boardState[y][x] = "white";
        moves.push({ x, y, color: "white", number: null });
      }
    }
  }

  // --- 通常モード ---
  else {
    if (button === "left") {
      if (boardState[y][x]) return; // すでに石あり
      const color = blackTurn ? "black" : "white";
      const moveNumber = moves.filter(m => m.number !== null).length + 1;
      boardState[y][x] = color;
      moves.push({ x, y, color, number: moveNumber });
      redoStack = [];
      blackTurn = !blackTurn;
    } else if (button === "right") {
      const last = moves.pop();
      if (last) {
        boardState[last.y][last.x] = null;
        if (last.number !== null) blackTurn = (last.color === "black");
        redoStack.push(last);
      }
    }
  }

  renderBoard();
}



    // ★ 追加: 削除ボタン
    document.getElementById("clearLabels").addEventListener("click", () => {
      labels = [];
      nextNumber = 1;
      nextAlphaCode = "A".charCodeAt(0);
      renderBoard();
    });

  // --- PNG保存 ---
document.getElementById("saveBoardPng").addEventListener("click", () => {
  // ラベルを含めて描画（GIFと同じ描画関数を使用）
  const tempCanvas = renderBoardForGif(moves, { frameType: "normal" });

  const ctx = tempCanvas.getContext("2d");

  // === ラベル描画（GIFと同じ処理） ===
  ctx.font = "bold 14px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  labels.forEach(l => {
    const cx = marginLeft + l.x * cell;
    const cy = marginTop + (size - 1 - l.y) * cell;

    // 背景で格子線を消してから描く
    ctx.fillStyle = "#F9EBCF";
    ctx.fillRect(cx - cell/2 + 1, cy - cell/2 + 1, cell - 2, cell - 2);

    ctx.fillStyle = "red";
    ctx.fillText(l.text, cx, cy);
  });

  // 保存処理
  const link = document.createElement("a");
  link.href = tempCanvas.toDataURL("image/png");
  link.download = "board.png";
  link.click();
});

// --- GIF保存 ---
document.getElementById("saveGifBtn").addEventListener("click", () => {
  const intervalSec   = parseFloat(document.getElementById("gifInterval").value) || 0.5;
  const firstDelaySec = parseFloat(document.getElementById("gifFirstDelay").value) || intervalSec;
  const lastDelaySec  = parseFloat(document.getElementById("gifLastDelay").value) || intervalSec;
  const startMove     = parseInt(document.getElementById("gifStartMove").value) || 1;

  const finalCommentTop    = document.getElementById("finalCommentTop").value;
  const finalCommentBottom = document.getElementById("finalCommentBottom").value;

  const interval   = intervalSec * 1000;
  const firstDelay = firstDelaySec * 1000;
  const lastDelay  = lastDelaySec * 1000;

  const gif = new GIF({ workers: 2, quality: 1 });

  // 1フレーム目（開始局面 = 自由配置 + startMove-1 までの番号手）
  const baseMoves = moves.filter(m => m.number === null || m.number < startMove);
  gif.addFrame(renderBoardForGif(baseMoves, { frameType: "normal" }), { delay: firstDelay });

  // 「番号付きの最後の手」を最終フレームとする（自由配置は無関係）
  const lastMoveNumber = Math.max(0, ...moves.filter(m => m.number !== null).map(m => m.number));

  // メインループ
  for (let i = startMove; i <= lastMoveNumber; i++) {
    const tempMoves = moves.filter(m => m.number === null || (m.number !== null && m.number <= i));
    const isFinal = (i === lastMoveNumber);

    const extra = isFinal
      ? { frameType: "final", finalTop: finalCommentTop, finalBottom: finalCommentBottom }
      : { frameType: "normal" };

    gif.addFrame(renderBoardForGif(tempMoves, extra), { delay: isFinal ? lastDelay : interval });
  }

  gif.on("finished", blob => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "board.gif";
    link.click();
  });

  gif.render();
});




 // --- GIF/PNG共通描画 ---
function renderBoardForGif(movesSubset, extra = {}) {
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

  // 盤（★ 修正：線の範囲を 0〜size-1 に）
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  for (let i = 0; i < size; i++) {
    const x = marginLeft + i * cell + 0.5;
    ctx.beginPath();
    ctx.moveTo(x, marginTop);
    ctx.lineTo(x, marginTop + innerSize);
    ctx.stroke();
  }
  for (let i = 0; i < size; i++) {
    const y = marginTop + i * cell + 0.5;
    ctx.beginPath();
    ctx.moveTo(marginLeft, y);
    ctx.lineTo(marginLeft + innerSize, y);
    ctx.stroke();
  }

  // 外枠
  ctx.lineWidth = 2;
  ctx.strokeRect(marginLeft + 0.5, marginTop + 0.5, innerSize, innerSize);

  // ★ 星を格子線のあとに描画（順序を変更）
  drawStars(ctx);

  // 座標
  drawCoordinates(ctx, canvas.width, canvas.height, innerSize);


  // 石
  movesSubset.forEach(m => {
    const cx = marginLeft + m.x * cell;
    const cy = marginTop + (size - 1 - m.y) * cell;

    ctx.beginPath();
    ctx.arc(cx, cy, 12, 0, Math.PI * 2);
    ctx.fillStyle = m.color === "black" ? "black" : "white";
    ctx.fill();
    ctx.stroke();

    if (m.number !== null) {
      ctx.fillStyle = m.color === "black" ? "white" : "black";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(m.number, cx, cy);
    }
  });

  // === ラベル描画 ===
  // === ラベル描画（任意ラベル対応・最終フレーム専用設定対応） ===
const finalNumberOnly = document.getElementById("finalNumberOnly").checked;
const finalAlphaOnly  = document.getElementById("finalAlphaOnly").checked;

ctx.font = "bold 14px sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";

labels.forEach(l => {
  const txt = String(l.text).trim();
  if (!txt) return;

  // --- ラベル種別の判定 ---
  const isPureNumber = /^[0-9]+$/.test(txt);        // 例: "1", "23"
  const isPureAlpha  = /^[A-Za-z]$/.test(txt);      // 例: "A", "b"
  const hasAlpha     = /[A-Za-z]/.test(txt);        // 例: "A1", "b2" も含む

  // --- 通常フレームでの非表示制御 ---
  if (extra.frameType !== "final") {
    // 「数字のみ」は finalNumberOnly に従う
    if (isPureNumber && finalNumberOnly) return;

    // 「英字または英字を含むもの（例: A, a1）」は finalAlphaOnly に従う
    if ((isPureAlpha || hasAlpha) && finalAlphaOnly) return;
  }

  // --- 座標計算 ---
  const cx = marginLeft + l.x * cell;
  const cy = marginTop + (size - 1 - l.y) * cell;

  // --- 背景で線を消してから描画 ---
  ctx.fillStyle = "#F9EBCF";
  ctx.fillRect(cx - cell/2 + 1, cy - cell/2 + 1, cell - 2, cell - 2);

  // --- ラベル色 ---
  ctx.fillStyle = "red";
  ctx.fillText(txt, cx, cy);
});


  // 通常コメント
  drawComments(ctx, canvas.width, canvas.height);

  // 最終フレーム専用コメント
  if (extra.frameType === "final") {
    ctx.fillStyle = "black";
    if (extra.finalTop) {
      ctx.font = "18px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(extra.finalTop, canvasWidth / 2, 50);
    }
    if (extra.finalBottom) {
      ctx.font = "18px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(extra.finalBottom, canvasWidth - marginRight - 10, canvasHeight - 60);
    }
  }

  return canvas;
}



    // === URLパラメータから盤面を再現 & UIイベント初期化 ===
    window.addEventListener("load", () => {
      const params = new URLSearchParams(window.location.search);

      // --- 通常モード棋譜 ---
const kifu = params.get("kifu");
if (kifu) {
  const letters = "abcdefghijklmno";
  const positions = kifu.split(",");
  positions.forEach((pos, idx) => {
    const x = letters.indexOf(pos[0]);
    const y = parseInt(pos.slice(1), 10) - 1;
    if (x >= 0 && y >= 0) {
      const color = (idx % 2 === 0) ? "black" : "white"; // idxで交互に
      const moveNumber = idx + 1; // move番号もidxベースで連番
      moves.push({ x, y, color, number: moveNumber });
      boardState[y][x] = color;
    }
  });
}


      // --- 自由配置 ---
      const stones = params.get("stones");
      if (stones) {
        const letters = "abcdefghijklmno";
        stones.split(",").forEach(str => {
          const coord = str.slice(0, -1);
          const colMark = str.slice(-1).toLowerCase();
          const x = letters.indexOf(coord[0]);
          const y = parseInt(coord.slice(1), 10) - 1;
          if (x >= 0 && y >= 0 && (colMark === "b" || colMark === "w")) {
            const color = (colMark === "b") ? "black" : "white";
            moves.push({ x, y, color, number: null });
            boardState[y][x] = color;
          }
        });
      }

      // --- ラベル ---
      const labelsParam = params.get("labels");
      if (labelsParam) {
        const letters = "abcdefghijklmno";
        labelsParam.split(",").forEach(str => {
          const [coord, text] = str.split(":");
          const x = letters.indexOf(coord[0]);
          const y = parseInt(coord.slice(1), 10) - 1;
          if (x >= 0 && y >= 0 && text) {
            labels.push({ x, y, text });
          }
        });
      }

      // --- コメント ---
      const top = params.get("top");
      const bottom = params.get("bottom");
      if (top) document.getElementById("commentTop").value = top;
      if (bottom) document.getElementById("commentBottom").value = bottom;

    

      // 初期描画
      renderBoard();
    });

    // リンク生成ボタン
    document.getElementById("generateLinkBtn").addEventListener("click", () => {
      const letters = "abcdefghijklmno";
      let url = window.location.origin + window.location.pathname;
      let queryParts = [];

    // --- 通常モード棋譜 ---
const numberedMoves = moves.filter(m => m.number !== null);
if (numberedMoves.length > 0) {
  const kifu = numberedMoves
    .sort((a, b) => a.number - b.number)
    .map(m => letters[m.x] + (m.y + 1))
    .join(",");   // ★ ここを修正（区切り文字を入れる）
  queryParts.push("kifu=" + encodeURIComponent(kifu));
}
      // --- 自由配置 ---
      const freeStones = moves
        .filter(m => m.number === null)
        .map(m => letters[m.x] + (m.y + 1) + (m.color === "black" ? "b" : "w"))
        .join(",");
      if (freeStones) {
        queryParts.push("stones=" + encodeURIComponent(freeStones));
      }

      // --- ラベル ---
      const labelStr = labels
        .map(l => letters[l.x] + (l.y + 1) + ":" + l.text)
        .join(",");
      if (labelStr) {
        queryParts.push("labels=" + encodeURIComponent(labelStr));
      }

      // --- コメント ---
      const topText = document.getElementById("commentTop").value.trim();
      const bottomText = document.getElementById("commentBottom").value.trim();
      if (topText) queryParts.push("top=" + encodeURIComponent(topText));
      if (bottomText) queryParts.push("bottom=" + encodeURIComponent(bottomText));

      if (queryParts.length > 0) {
        url += "?" + queryParts.join("&");
      }

      // 表示用
      const linkBox = document.getElementById("generatedLink");
      linkBox.value = url;

      // コピー
      navigator.clipboard.writeText(url)
        .then(() => alert("リンクをコピーしました！"))
        .catch(err => {
          console.error("コピー失敗:", err);
          alert("コピーに失敗しました");
        });
    });

    document.getElementById("gifSettingsBtn").addEventListener("click", () => {
  document.getElementById("gifSettingsPopup").style.display = "block";
});
document.getElementById("closeGifSettings").addEventListener("click", () => {
  document.getElementById("gifSettingsPopup").style.display = "none";
});

// プレビュー（保存と同じロジック）
document.getElementById("previewGifBtn").addEventListener("click", () => {
  const intervalSec   = parseFloat(document.getElementById("gifInterval").value) || 0.5;
  const firstDelaySec = parseFloat(document.getElementById("gifFirstDelay").value) || intervalSec;
  const lastDelaySec  = parseFloat(document.getElementById("gifLastDelay").value) || intervalSec;
  const startMove     = parseInt(document.getElementById("gifStartMove").value) || 1;

  const finalCommentTop    = document.getElementById("finalCommentTop").value;
  const finalCommentBottom = document.getElementById("finalCommentBottom").value;

  const interval   = intervalSec * 1000;
  const firstDelay = firstDelaySec * 1000;
  const lastDelay  = lastDelaySec * 1000;

  const gif = new GIF({ workers: 2, quality: 10 });

  const baseMoves = moves.filter(m => m.number === null || m.number < startMove);
  gif.addFrame(renderBoardForGif(baseMoves, { frameType: "normal" }), { delay: firstDelay });

  const lastMoveNumber = Math.max(0, ...moves.filter(m => m.number !== null).map(m => m.number));

  for (let i = startMove; i <= lastMoveNumber; i++) {
    const tempMoves = moves.filter(m => m.number === null || (m.number !== null && m.number <= i));
    const isFinal = (i === lastMoveNumber);

    const extra = isFinal
      ? { frameType: "final", finalTop: finalCommentTop, finalBottom: finalCommentBottom }
      : { frameType: "normal" };

    gif.addFrame(renderBoardForGif(tempMoves, extra), { delay: isFinal ? lastDelay : interval });
  }

  // 完成時にプレビュー表示
  gif.on("finished", blob => {
    const url = URL.createObjectURL(blob);
    const img = document.createElement("img");
    img.src = url;

    const content = document.getElementById("gifPreviewContent");
    content.innerHTML = "";
    content.appendChild(img);

    document.getElementById("gifPreviewPopup").style.display = "block";
  });

  gif.render();
});

// 閉じるボタン
document.getElementById("closeGifPreview").addEventListener("click", () => {
  document.getElementById("gifPreviewPopup").style.display = "none";
});

let redoStack = [];  // 戻した手を保持するスタック

const placeBlack = document.getElementById("placeBlack");
const placeWhite = document.getElementById("placeWhite");

// 一手戻す
function undoMove() {
  if (freeMode) return; // 自由配置では無効
  const last = moves.pop();
  if (last) {
    redoStack.push(last);
    boardState[last.y][last.x] = null;
    renderBoard();
  }
}

// 一手進める
function redoMove() {
  if (freeMode) return;
  const move = redoStack.pop();
  if (move) {
    moves.push(move);
    boardState[move.y][move.x] = move.color;
    renderBoard();
  }
}

// 全て戻す
function undoAll() {
  if (freeMode) return;
  while (moves.length > 0) {
    const last = moves.pop();
    redoStack.push(last);
    boardState[last.y][last.x] = null;
  }
  renderBoard();
}

// 全て進める
function redoAll() {
  if (freeMode) return;
  while (redoStack.length > 0) {
    const move = redoStack.pop();
    moves.push(move);
    boardState[move.y][move.x] = move.color;
  }
  renderBoard();
}

document.getElementById("undoBtn").addEventListener("click", undoMove);
document.getElementById("redoBtn").addEventListener("click", redoMove);
document.getElementById("undoAllBtn").addEventListener("click", undoAll);
document.getElementById("redoAllBtn").addEventListener("click", redoAll);

// チェック排他制御
placeBlack.addEventListener("change", () => {
  if (placeBlack.checked) {
    placeWhite.checked = false;
  }
});
placeWhite.addEventListener("change", () => {
  if (placeWhite.checked) {
    placeBlack.checked = false;
  }
});

// 自由配置モード切替（1か所にまとめる）
const toggleBtn = document.getElementById("toggleModeBtn");
toggleBtn.addEventListener("click", () => {
  freeMode = !freeMode;

  if (!freeMode) {
    // ★ 通常モードに戻るときに確認
    const start = confirm("黒番から打ち始めますか？（キャンセルすると白番開始）");
    blackTurn = start ? true : false;
  }

  // ボタンの表示更新
  toggleBtn.textContent = freeMode ? "通常モードに切替" : "自由配置モードに切替";

  // 自由配置専用UIの表示切替
  document.getElementById("freeModeControls").style.display = freeMode ? "block" : "none";

  // 通常モードに戻るときは配置チェックをクリア
  if (!freeMode) {
    placeBlack.checked = false;
    placeWhite.checked = false;
  }
});

// --- PNG指定範囲保存（プレビューを表示） ---
document.getElementById("saveBoardCropBtn").addEventListener("click", () => {
  updateCropPreview();
  document.getElementById("pngPreviewPopup").style.display = "block";
});

// --- プレビュー更新関数 ---
function updateCropPreview() {
  const marginRoutes = parseInt(document.getElementById("cropMargin").value) || 2;
  const showOuterFrame   = document.getElementById("showOuterFrame").checked;
  const showExtraMargin  = document.getElementById("showExtraMargin").checked;
  const showCoordinates  = document.getElementById("showCoordinates").checked;

  // 石とラベルの範囲を探索
  let xs = [], ys = [];
  moves.forEach(m => { xs.push(m.x); ys.push(m.y); });
  labels.forEach(l => { xs.push(l.x); ys.push(l.y); });

  if (xs.length === 0 || ys.length === 0) {
    const content = document.getElementById("pngPreviewContent");
    content.innerHTML = "<p>石や文字がありません</p>";
    return;
  }

  let minX = Math.max(0, Math.min(...xs) - marginRoutes);
  let maxX = Math.min(size - 1, Math.max(...xs) + marginRoutes);
  let minY = Math.max(0, Math.min(...ys) - marginRoutes);
  let maxY = Math.min(size - 1, Math.max(...ys) + marginRoutes);

  if (showExtraMargin) {
    minX = Math.max(0, minX - 1);
    maxX = Math.min(size - 1, maxX + 1);
    minY = Math.max(0, minY - 1);
    maxY = Math.min(size - 1, maxY + 1);
  }

  // 描画
  const croppedCanvas = renderBoardCrop(
    moves, labels, minX, maxX, minY, maxY,
    { showOuterFrame, showCoordinates, }
  );

  // プレビュー表示
  const content = document.getElementById("pngPreviewContent");
  content.innerHTML = "";
  content.appendChild(croppedCanvas);

  // --- 保存ボタン ---
  document.getElementById("downloadCropPngBtn").onclick = () => {
    const link = document.createElement("a");
    link.href = croppedCanvas.toDataURL("image/png");
    link.download = "board_crop.png";
    link.click();
  };
}
 // --- ★ クリップボードにコピー機能 ---
const copyBtn = document.getElementById("copyCropPngBtn");
if (copyBtn) {
  copyBtn.onclick = async () => {
    try {
      // ✅ croppedCanvas の代わりにプレビュー領域の canvas を取得
      const previewCanvas = document.querySelector("#pngPreviewContent canvas");
      if (!previewCanvas) {
        showToast("プレビュー画像が見つかりません。", true);
        return;
      }

      previewCanvas.toBlob(async blob => {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
        ]);
        showToast("プレビュー画像をクリップボードにコピーしました！");
      }, "image/png");
    } catch (err) {
      console.error("クリップボードコピーに失敗:", err);
      showToast("クリップボードへのコピーに失敗しました。", true);
    }
  };
}


// === ★ HTMLを変更せずに使えるトースト関数 ===
function showToast(message, isError = false) {
  // 既存のトーストがあれば再利用、なければ生成
  let toast = document.getElementById("copyToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "copyToast";
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = "rgba(0,0,0,0.75)";
    toast.style.color = "white";
    toast.style.padding = "10px 16px";
    toast.style.borderRadius = "6px";
    toast.style.fontSize = "14px";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.4s";
    document.body.appendChild(toast);
  }

  // 表示設定
  toast.textContent = message;
  toast.style.background = isError ? "rgba(200,0,0,0.8)" : "rgba(0,0,0,0.75)";
  toast.style.opacity = "1";
  toast.style.display = "block";

  // フェードアウト
  clearTimeout(toast._timeoutId);
  toast._timeoutId = setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => (toast.style.display = "none"), 500);
  }, 1500);
}



// --- チェックボックスや数値入力の変更で即更新 ---
["cropMargin", "showOuterFrame", "showExtraMargin", "showCoordinates"].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener("input", updateCropPreview);
  }
});





// 閉じるボタン
document.getElementById("closePngPreview").addEventListener("click", () => {
  document.getElementById("pngPreviewPopup").style.display = "none";
});


// --- 指定範囲のみ描画する関数 ---
function renderBoardCrop(movesSubset, labelsSubset, minX, maxX, minY, maxY) {
  const innerSizeX = (maxX - minX) * cell;
  const innerSizeY = (maxY - minY) * cell;

  // チェックボックス判定
  const showExtraMargin = document.getElementById("showExtraMargin").checked;

  const marginL = showExtraMargin ? marginLeft : 0;
  const marginR = showExtraMargin ? marginRight : 0;
  const marginT = showExtraMargin ? marginTop : 0;
  const marginB = showExtraMargin ? marginBottom : 0;

  const canvasWidth  = innerSizeX + marginL + marginR;
  const canvasHeight = innerSizeY + marginT + marginB;

  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext("2d");

  // 背景
  ctx.fillStyle = "#F9EBCF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 格子線
  ctx.strokeStyle = "black";
  ctx.lineWidth = 1;
  for (let i = minX; i <= maxX; i++) {
    const x = marginL + (i - minX) * cell + 0.5;
    ctx.beginPath();
    ctx.moveTo(x, marginT);
    ctx.lineTo(x, marginT + innerSizeY);
    ctx.stroke();
  }
  for (let j = minY; j <= maxY; j++) {
    const y = marginT + (j - minY) * cell + 0.5;
    ctx.beginPath();
    ctx.moveTo(marginL, y);
    ctx.lineTo(marginL + innerSizeX, y);
    ctx.stroke();
  }

  // 外枠（オプション）
  if (document.getElementById("showOuterFrame").checked) {
    ctx.lineWidth = 2;
    ctx.strokeRect(marginL + 0.5, marginT + 0.5, innerSizeX, innerSizeY);
  }

  // 石
  movesSubset.forEach(m => {
    if (m.x < minX || m.x > maxX || m.y < minY || m.y > maxY) return;
    const cx = marginL + (m.x - minX) * cell;
    const cy = marginT + (maxY - m.y) * cell;

    ctx.beginPath();
    ctx.arc(cx, cy, 12, 0, Math.PI * 2);
    ctx.fillStyle = m.color === "black" ? "black" : "white";
    ctx.fill();
    ctx.stroke();

    if (m.number !== null) {
      ctx.fillStyle = m.color === "black" ? "white" : "black";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(m.number, cx, cy);
    }
  });

// ラベル
ctx.font = "bold 14px sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
labelsSubset.forEach(l => {
  if (l.x < minX || l.x > maxX || l.y < minY || l.y > maxY) return;
  const cx = marginL + (l.x - minX) * cell;
  const cy = marginT + (maxY - l.y) * cell;

  // 背景で線を消す
  ctx.fillStyle = "#F9EBCF";
  ctx.fillRect(cx - cell/2 + 1, cy - cell/2 + 1, cell - 2, cell - 2);

  ctx.fillStyle = "red";
  ctx.fillText(l.text, cx, cy);
});


  // 座標表示（オプション）
  if (document.getElementById("showCoordinates").checked) {
    ctx.fillStyle = "black";
    ctx.font = "bold 14px sans-serif";

    // 横軸
    ctx.textAlign = "center";
    for (let i = minX; i <= maxX; i++) {
      ctx.fillText("ABCDEFGHIJKLMNO"[i], marginL + (i - minX) * cell, marginT + innerSizeY + 15);
    }

    // 縦軸
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let j = minY; j <= maxY; j++) {
      ctx.fillText(j + 1, marginL - 5, marginT + (maxY - j) * cell);
    }
  }

  return canvas;
}

// SGFコピー処理
document.getElementById("copySgfBtn").addEventListener("click", () => {
  // currentMoves に代入してから length を使う
  window.currentMoves = moves.map(m => {
    const letter = String.fromCharCode("a".charCodeAt(0) + m.x);
    return letter + (m.y + 1); // 1始まり補正
  });
  window.currentIndex = window.currentMoves.length;

  copySgfFromGame(); // SGF生成＆コピー
});

// --- 棋譜入力欄の反映処理 ---
const kifuInput = document.getElementById("kifuInput");

if (kifuInput) {
  kifuInput.addEventListener("change", () => {
    const input = kifuInput.value.trim();
    if (!input) return;

    // 正規化（空白やカンマを削除）
    const normalized = input.replace(/[^a-o0-9]/gi, "").toLowerCase();

    // 例: h8i9h10 → ["h8","i9","h10"]
    const tokens = normalized.match(/[a-o][0-9]{1,2}/g);
    if (!tokens) {
      alert("棋譜を読み取れません。例: h8i9h10 のように入力してください。");
      return;
    }

    // --- 盤面リセット ---
    moves = [];
    boardState = Array.from({ length: size }, () => Array(size).fill(null));
    blackTurn = true;
    redoStack = [];

    // --- 石を順番に配置 ---
    tokens.forEach((move, i) => {
      const col = move[0].charCodeAt(0) - "a".charCodeAt(0);
      const row = parseInt(move.slice(1), 10) - 1;  // 1始まり→0基準
      if (col < 0 || col >= size || row < 0 || row >= size) return;

      const color = (i % 2 === 0) ? "black" : "white";
      const num = i + 1;
      moves.push({ x: col, y: row, color, number: num });
      boardState[row][col] = color;
    });

    renderBoard();
  });
}

// === SGFコピー関連 ===
function moveToSgf(move, size = 15) {
  const colLetter = move[0];
  const rowNumber = parseInt(move.slice(1), 10);
  const colIndex = colLetter.charCodeAt(0) - "a".charCodeAt(0);
  const rowIndex = size - rowNumber;
  const sgfCol = String.fromCharCode("a".charCodeAt(0) + colIndex);
  const sgfRow = String.fromCharCode("a".charCodeAt(0) + rowIndex);
  return sgfCol + sgfRow;
}

function convertMovesToSgfFromBoard(moves, size = 15) {
  if (!moves || moves.length === 0) return "(;GM[1]SZ[15])";

  let sgfMoves = "";
  const letters = "abcdefghijklmno";

  moves.forEach((m, i) => {
    const color = (i % 2 === 0) ? "B" : "W";
    const moveStr = letters[m.x] + (m.y + 1);
    sgfMoves += `;${color}[${moveToSgf(moveStr, size)}]`;
  });

  return `(;GM[1]SZ[${size}]\n${sgfMoves})`;
}

function copyBoardToSgf() {
  if (!moves || moves.length === 0) {
    alert("盤面に石がありません。");
    return;
  }

  const sgf = convertMovesToSgfFromBoard(moves);
  navigator.clipboard.writeText(sgf)
    .then(() => {
      showCopyMessage("SGF形式でクリップボードにコピーしました。");
    })
    .catch(err => {
      console.error("コピーに失敗:", err);
      alert("コピーに失敗しました。");
    });
}

// ★ メッセージを一時表示（既存のものがあれば再利用）
function showCopyMessage(message) {
  let msg = document.getElementById("copyMessage");
  if (!msg) {
    msg = document.createElement("div");
    msg.id = "copyMessage";
    msg.style.color = "green";
    msg.style.fontSize = "0.9em";
    msg.style.marginTop = "4px";
    document.body.appendChild(msg);
  }
  msg.textContent = message;
  msg.style.display = "block";
  clearTimeout(msg._timeoutId);
  msg._timeoutId = setTimeout(() => {
    msg.style.display = "none";
  }, 1500);
}

// ★ ボタンに紐付け
window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("copySgfBtn");
  if (btn) {
    btn.addEventListener("click", copyBoardToSgf);
  }
});


// ★ 任意ラベルのON/OFFで他の配置モードを無効化
document.getElementById("enableCustomLabel").addEventListener("change", e => {
  const checked = e.target.checked;
  if (checked) {
    // チェックがついたら入力欄にフォーカス
    document.getElementById("labelInputText").focus();
    placeBlack.checked = false;
    placeWhite.checked = false;
  }
});
