// lang.js

// 辞書
const i18n = {
  ja: {
    // --- 既存 ---
    loadingComplete: (n) => `読み込み完了: ${n} 対局`,
    black: "黒",
    white: "白",
    swap: "スワップ",
    result: "結果",
    blackWin: "黒勝ち",
    whiteWin: "白勝ち",
    draw: "引き分け",
    checkAll: "全てチェック",
    uncheckAll: "全て解除",
    notFound: "該当大会なし",
    close: "閉じる",
    history: "更新履歴",
    showHelp: "使い方",

    // --- UI 新規追加 ---
    pageTitle: "連珠トーナメント集計・スワップ解析",
    mainHeading: "連珠トーナメント集計・スワップ解析",
    freeBoard: "連珠盤",
    analyzeTournament: "大会集計",
    clearStats: "大会集計欄をクリア",
    tournamentStats: "大会勝敗統計",
    swapExample: "最多スワップパターン対局例",
    openingRank: "珠型ランキング（上位10件）",
    top5: "5手目までの頻出棋譜ランキング（上位10）",
    openingWin: "珠型ごとの勝率（全珠型）",
    playerStats: "プレイヤー別集計",
    playerTop5: "検索したプレイヤーの5手目頻出棋譜top10",
    swapSearch: "スワップ履歴検索",
    toggleMoveNumbers: "石番号を非表示",
    saveBoardPng: "PNGで保存",
    saveGifBtn: "GIF保存",
  },
  en: {
    loadingComplete: (n) => `Loaded: ${n} games`,
    black: "Black",
    white: "White",
    swap: "Swap",
    result: "Result",
    blackWin: "Black wins",
    whiteWin: "White wins",
    draw: "Draw",
    checkAll: "Check All",
    uncheckAll: "Uncheck All",
    notFound: "No tournament found",
    close: "Close",
    history: "History",
    showHelp: "Help",

    pageTitle: "Renju Tournament Analysis & Swap Tracker",
    mainHeading: "Renju Tournament Analysis & Swap Tracker",
    freeBoard: "Free Board",
    analyzeTournament: "Analyze Tournament",
    clearStats: "Clear Stats",
    tournamentStats: "Tournament Statistics",
    swapExample: "Most Frequent Swap Pattern Example",
    openingRank: "Opening Ranking (Top 10)",
    top5: "Top 10 Frequent Sequences (up to 5 moves)",
    openingWin: "Win Rates by Opening",
    playerStats: "Player Statistics",
    playerTop5: "Player’s Top 10 Frequent Sequences",
    swapSearch: "Swap History Search",
    toggleMoveNumbers: "Hide Move Numbers",
    saveBoardPng: "Save as PNG",
    saveGifBtn: "Save as GIF",
  },
  ko: {
    loadingComplete: (n) => `${n}국 불러오기 완료`,
    black: "흑",
    white: "백",
    swap: "스왑",
    result: "결과",
    blackWin: "흑 승",
    whiteWin: "백 승",
    draw: "무승부",
    checkAll: "모두 선택",
    uncheckAll: "모두 해제",
    notFound: "해당 대회 없음",
    close: "닫기",
    history: "업데이트 내역",
    showHelp: "도움말",

    pageTitle: "렌주 토너먼트 분석 · 스왑 추적",
    mainHeading: "렌주 토너먼트 분석 · 스왑 추적",
    freeBoard: "렌주판",
    analyzeTournament: "대회 분석",
    clearStats: "분석 결과 지우기",
    tournamentStats: "대회 통계",
    swapExample: "가장 많은 스왑 패턴 예시",
    openingRank: "개막 랭킹 (상위 10)",
    top5: "5수 이내 자주 나오는 진행 (Top 10)",
    openingWin: "개막별 승률",
    playerStats: "플레이어별 통계",
    playerTop5: "플레이어의 5수 진행 Top10",
    swapSearch: "스왑 기록 검색",
    toggleMoveNumbers: "수순 번호 숨기기",
    saveBoardPng: "PNG로 저장",
    saveGifBtn: "GIF로 저장",
  },
  zh: {
    loadingComplete: (n) => `读取完成: ${n} 局`,
    black: "黑",
    white: "白",
    swap: "换子",
    result: "结果",
    blackWin: "黑胜",
    whiteWin: "白胜",
    draw: "和棋",
    checkAll: "全选",
    uncheckAll: "全不选",
    notFound: "未找到比赛",
    close: "关闭",
    history: "更新记录",
    showHelp: "帮助",

    pageTitle: "连珠锦标赛统计 · 换子解析",
    mainHeading: "连珠锦标赛统计 · 换子解析",
    freeBoard: "连珠棋盘",
    analyzeTournament: "分析比赛",
    clearStats: "清空统计",
    tournamentStats: "比赛统计",
    swapExample: "最常见换子模式示例",
    openingRank: "开局排名 (前10)",
    top5: "前10常见棋谱 (前5手)",
    openingWin: "各开局胜率",
    playerStats: "选手统计",
    playerTop5: "选手前10常见棋谱 (前5手)",
    swapSearch: "换子历史查询",
    toggleMoveNumbers: "隐藏手数编号",
    saveBoardPng: "保存为 PNG",
    saveGifBtn: "保存为 GIF",
  }
};

// 言語設定
let currentLang = localStorage.getItem("lang") || "ja";

// 翻訳関数
function t(key, ...args) {
  const val = i18n[currentLang][key];
  return typeof val === "function" ? val(...args) : val || key;
}

// 言語切替
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  location.reload();
}

// HTML要素に翻訳を適用
function applyTranslations() {
  const mappings = {
    pageTitle: "pageTitle",
    mainHeading: "mainHeading",
    showHelp: "showHelp",
    historyLink: "history",
    freeBoardLink: "freeBoard",
    analyzeBtn: "analyzeTournament",
    clearBtn: "clearStats",
    statsTitle: "tournamentStats",
    swapExampleTitle: "swapExample",
    openingRankTitle: "openingRank",
    top5Title: "top5",
    openingWinTitle: "openingWin",
    playerStatsTitle: "playerStats",
    playerTop5Title: "playerTop5",
    swapSearchTitle: "swapSearch",
    toggleMoveNumbers: "toggleMoveNumbers",
    saveBoardPng: "saveBoardPng",
    saveGifBtn: "saveGifBtn",
    closeHelp: "close",
    closeHistory: "close",
    closeGameModal: "close",
    closeOpeningPopup: "close",
  };

  Object.entries(mappings).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && i18n[currentLang][key]) {
      el.textContent = t(key);
    }
  });
}

document.addEventListener("DOMContentLoaded", applyTranslations);
