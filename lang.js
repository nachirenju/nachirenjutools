// lang.js

// 辞書
const i18n = {
  ja: {
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
