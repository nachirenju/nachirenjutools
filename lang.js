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
    firstMove: "≪ 全て戻す",
    prev5: "← 5手戻す",
    prevMove: "← 前の手",
    nextMove: "次の手 →",
    next5: "5手進める →",
    lastMove: "全て進める ≫",
    currentKifuPlaceholder: "（棋譜がここに表示されます）",
    gifTitle: "GIF保存",
    gifStartMove: "開始手数:",
    gifModeBoard: "盤面のみ",
    gifModeCoords: "盤面＋座標",
    gifModeFull: "盤面＋座標＋対局者＋swap",
    gifInterval: "更新間隔（秒）:",
    gifLastDelay: "最終フレーム静止（秒）:",
    tournament: "大会",
    gamesCount: "該当対局数",
    blackWins: "黒勝ち",
    whiteWins: "白勝ち",
    draws: "引き分け",
    avgMoves: "大会全体平均手数",
    avgBlackMoves: "黒勝ち平均手数",
    avgWhiteMoves: "白勝ち平均手数",
    avgDrawMoves: "引き分け平均手数",
    firstMoveWin: "1手目着手者勝利数",
    secondMoveWin: "2手目着手者勝利数",
    thirdMoveWin: "3手目着手者勝利数",
    fourthMoveWin: "4手目着手者勝利数",
    fifthMoveWin: "5手目着手者勝利数",
    combo34Win: "3+4手目同一着手者勝利数",
    combo35Win: "3+5手目同一着手者勝利数",
    combo45Win: "4+5手目同一着手者勝利数",
    secondDirect: "2手目直接着手",
    secondIndirect: "2手目間接着手",
    swapPattern: "最多スワップパターン",
    player: "プレイヤー",
    blackLoses: "黒負け",
    whiteLoses: "白負け",
    avgBlackLosesMoves: "黒負け平均手数",
    avgWhiteLosesMoves: "白負け平均手数",
    avgBlackDrawMoves: "黒番引き分け平均手数",
    avgWhiteDrawMoves: "白番引き分け平均手数",
    opening3Count: "3手目着手珠型（登場回数）",
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
    firstMove: "≪ Reset",
    prev5: "← Back 5 moves",
    prevMove: "← Previous",
    nextMove: "Next →",
    next5: "Forward 5 moves →",
    lastMove: "Fast Forward ≫",
    currentKifuPlaceholder: "(Game record will be shown here)",
    gifTitle: "Save as GIF",
    gifStartMove: "Start move:",
    gifModeBoard: "Board only",
    gifModeCoords: "Board + Coordinates",
    gifModeFull: "Board + Coordinates + Players + Swap",
    gifInterval: "Interval (sec):",
    gifLastDelay: "Last frame delay (sec):",
    tournament: "Tournament",
    gamesCount: "Games Played",
    blackWins: "Black Wins",
    whiteWins: "White Wins",
    draws: "Draws",
    avgMoves: "Average Moves (All)",
    avgBlackMoves: "Average Moves (Black Wins)",
    avgWhiteMoves: "Average Moves (White Wins)",
    avgDrawMoves: "Average Moves (Draws)",
    firstMoveWin: "Wins by First Mover",
    secondMoveWin: "Wins by Second Mover",
    thirdMoveWin: "Wins by Third Mover",
    fourthMoveWin: "Wins by Fourth Mover",
    fifthMoveWin: "Wins by Fifth Mover",
    combo34Win: "Wins when 3rd & 4th by same player",
    combo35Win: "Wins when 3rd & 5th by same player",
    combo45Win: "Wins when 4th & 5th by same player",
    secondDirect: "2nd move direct",
    secondIndirect: "2nd move indirect",
    swapPattern: "Most Frequent Swap Pattern",
    player: "Player",
    blackLoses: "Black Losses",
    whiteLoses: "White Losses",
    avgBlackLosesMoves: "Avg Moves (Black Losses)",
    avgWhiteLosesMoves: "Avg Moves (White Losses)",
    avgBlackDrawMoves: "Avg Moves (Black Draws)",
    avgWhiteDrawMoves: "Avg Moves (White Draws)",
    opening3Count: "3rd Move Opening Types (count)",
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
    firstMove: "≪ 처음으로",
    prev5: "← 5수 뒤로",
    prevMove: "← 이전 수",
    nextMove: "다음 수 →",
    next5: "5수 앞으로 →",
    lastMove: "끝으로 ≫",
    currentKifuPlaceholder: "（기보가 여기에 표시됩니다）",
    gifTitle: "GIF 저장",
    gifStartMove: "시작 수:",
    gifModeBoard: "판만",
    gifModeCoords: "판 + 좌표",
    gifModeFull: "판 + 좌표 + 대국자 + 스왑",
    gifInterval: "갱신 간격(초):",
    gifLastDelay: "마지막 프레임 지연(초):",
    tournament: "대회",
    gamesCount: "대국 수",
    blackWins: "흑 승",
    whiteWins: "백 승",
    draws: "무승부",
    avgMoves: "전체 평균 수순",
    avgBlackMoves: "흑 승 평균 수순",
    avgWhiteMoves: "백 승 평균 수순",
    avgDrawMoves: "무승부 평균 수순",
    firstMoveWin: "1수 착수자 승리 수",
    secondMoveWin: "2수 착수자 승리 수",
    thirdMoveWin: "3수 착수자 승리 수",
    fourthMoveWin: "4수 착수자 승리 수",
    fifthMoveWin: "5수 착수자 승리 수",
    combo34Win: "3+4수 동일 착수자 승리 수",
    combo35Win: "3+5수 동일 착수자 승리 수",
    combo45Win: "4+5수 동일 착수자 승리 수",
    secondDirect: "2수 직접 착수",
    secondIndirect: "2수 간접 착수",
    swapPattern: "최다 스왑 패턴",
    player: "플레이어",
    blackLoses: "흑 패",
    whiteLoses: "백 패",
    avgBlackLosesMoves: "흑 패 평균 수순",
    avgWhiteLosesMoves: "백 패 평균 수순",
    avgBlackDrawMoves: "흑 무 평균 수순",
    avgWhiteDrawMoves: "백 무 평균 수순",
    opening3Count: "3수째 개막 (등장 횟수)",
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
    firstMove: "≪ 全部还原",
    prev5: "← 回退5手",
    prevMove: "← 上一步",
    nextMove: "下一步 →",
    next5: "前进5手 →",
    lastMove: "全部前进 ≫",
    currentKifuPlaceholder: "（棋谱将显示在这里）",
    gifTitle: "保存为 GIF",
    gifStartMove: "起始手数:",
    gifModeBoard: "仅棋盘",
    gifModeCoords: "棋盘 + 坐标",
    gifModeFull: "棋盘 + 坐标 + 对局者 + 换子",
    gifInterval: "更新间隔（秒）:",
    gifLastDelay: "最后一帧停留（秒）:",
    tournament: "比赛",
    gamesCount: "对局数",
    blackWins: "黑胜",
    whiteWins: "白胜",
    draws: "和棋",
    avgMoves: "平均手数（全部）",
    avgBlackMoves: "黑胜平均手数",
    avgWhiteMoves: "白胜平均手数",
    avgDrawMoves: "和棋平均手数",
    firstMoveWin: "先手胜数",
    secondMoveWin: "第二手胜数",
    thirdMoveWin: "第三手胜数",
    fourthMoveWin: "第四手胜数",
    fifthMoveWin: "第五手胜数",
    combo34Win: "第3+4手同一方胜数",
    combo35Win: "第3+5手同一方胜数",
    combo45Win: "第4+5手同一方胜数",
    secondDirect: "第2手直接着手",
    secondIndirect: "第2手间接着手",
    swapPattern: "最多换子模式",
    player: "选手",
    blackLoses: "黑负",
    whiteLoses: "白负",
    avgBlackLosesMoves: "黑负平均手数",
    avgWhiteLosesMoves: "白负平均手数",
    avgBlackDrawMoves: "黑和平均手数",
    avgWhiteDrawMoves: "白和平均手数",
    opening3Count: "第3手开局类型（次数）",
  },

  "zh-Hant": {
    loadingComplete: (n) => `讀取完成: ${n} 局`,
    black: "黑",
    white: "白",
    swap: "換子",
    result: "結果",
    blackWin: "黑勝",
    whiteWin: "白勝",
    draw: "和棋",
    checkAll: "全選",
    uncheckAll: "全不選",
    notFound: "未找到比賽",
    close: "關閉",
    history: "更新記錄",
    showHelp: "幫助",
    pageTitle: "連珠錦標賽統計 · 換子解析",
    mainHeading: "連珠錦標賽統計 · 換子解析",
    freeBoard: "連珠棋盤",
    analyzeTournament: "分析比賽",
    clearStats: "清空統計",
    tournamentStats: "比賽統計",
    swapExample: "最常見換子模式示例",
    openingRank: "開局排名 (前10)",
    top5: "前10常見棋譜 (前5手)",
    openingWin: "各開局勝率",
    playerStats: "選手統計",
    playerTop5: "選手前10常見棋譜 (前5手)",
    swapSearch: "換子歷史查詢",
    toggleMoveNumbers: "隱藏手數編號",
    saveBoardPng: "保存為 PNG",
    saveGifBtn: "保存為 GIF",
    firstMove: "≪ 全部還原",
    prev5: "← 回退5手",
    prevMove: "← 上一步",
    nextMove: "下一步 →",
    next5: "前進5手 →",
    lastMove: "全部前進 ≫",
    currentKifuPlaceholder: "（棋譜將顯示在這裡）",
    gifTitle: "保存為 GIF",
    gifStartMove: "起始手數:",
    gifModeBoard: "僅棋盤",
    gifModeCoords: "棋盤 + 座標",
    gifModeFull: "棋盤 + 座標 + 對局者 + 換子",
    gifInterval: "更新間隔（秒）:",
    gifLastDelay: "最後一幀停留（秒）:",
    tournament: "比賽",
    gamesCount: "對局數",
    blackWins: "黑勝",
    whiteWins: "白勝",
    draws: "和棋",
    avgMoves: "平均手數（全部）",
    avgBlackMoves: "黑勝平均手數",
    avgWhiteMoves: "白勝平均手數",
    avgDrawMoves: "和棋平均手數",
    firstMoveWin: "先手勝數",
    secondMoveWin: "第二手勝數",
    thirdMoveWin: "第三手勝數",
    fourthMoveWin: "第四手勝數",
    fifthMoveWin: "第五手勝數",
    combo34Win: "第3+4手同一方勝數",
    combo35Win: "第3+5手同一方勝數",
    combo45Win: "第4+5手同一方勝數",
    secondDirect: "第2手直接着手",
    secondIndirect: "第2手間接着手",
    swapPattern: "最多換子模式",
    player: "選手",
    blackLoses: "黑負",
    whiteLoses: "白負",
    avgBlackLosesMoves: "黑負平均手數",
    avgWhiteLosesMoves: "白負平均手數",
    avgBlackDrawMoves: "黑和平均手數",
    avgWhiteDrawMoves: "白和平均手數",
    opening3Count: "第3手開局類型（次數）",
  },
};


const extraKeys = {
  ja: {
    win: "勝ち",
    lose: "負け",
    draw: "引き分け",
    points: "勝ち点",
    result: "結果",
    opening: "珠型",
    playerTotalResults: (name) => `${name} から見た累計勝敗`,
    openingYellow: "※珠型欄黄色は該当プレイヤーが3手目を着手した対局",
    rank: (n) => `${n}位`,
    rankCol: "順位",
    times: (n) => `${n}回`,
    blackRate: "黒勝率",
    whiteRate: "白勝率",
    drawRate: "引き分け率",
    totalGames: "対局数",
    searchByKeyword: "キーワードで大会を検索",
    filterByPlayer: "プレイヤー名で絞り込み",
    helpTitle: "基本的な使い方",
  },
  en: {
    win: "Win",
    lose: "Loss",
    draw: "Draw",
    points: "Points",
    result: "Result",
    opening: "Opening",
    playerTotalResults: (name) => `Total results from ${name}'s perspective`,
    openingYellow: "*Yellow in the Opening column indicates games where the player placed the 3rd move.",
    rank: (n) => {
      const suffixes = ["th", "st", "nd", "rd"];
      const v = n % 100;
      const suffix = suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
      return `${n}${suffix}`;
    },
    rankCol: "Rank",
    times: (n) => `${n} ${n === 1 ? "time" : "times"}`,
    blackRate: "Black win rate",
    whiteRate: "White win rate",
    drawRate: "Draw rate",
    totalGames: "Games played",
    searchByKeyword: "Search tournaments by keyword",
    filterByPlayer: "Filter by player name",
    helpTitle: "Basic Usage",
  },
  ko: {
    win: "승",
    lose: "패",
    draw: "무",
    points: "승점",
    result: "결과",
    opening: "개형",
    playerTotalResults: (name) => `${name} 기준 누적 승패`,
    openingYellow: "*개형란의 노란색은 해당 플레이어가 3번째 수를 둔 대국을 의미합니다.",
    rank: (n) => `${n}위`,
    rankCol: "순위",
    times: (n) => `${n}회`,
    blackRate: "흑 승률",
    whiteRate: "백 승률",
    drawRate: "무승부율",
    totalGames: "대국 수",
    searchByKeyword: "키워드로 토너먼트 검색",
    filterByPlayer: "플레이어 이름으로 필터링",
    helpTitle: "기본 사용법",
  },
  zh: {
    win: "胜",
    lose: "负",
    draw: "和",
    points: "积分",
    result: "结果",
    opening: "开局",
    playerTotalResults: (name) => `从 ${name} 角度的累计胜负`,
    openingYellow: "※开局栏中黄色表示该玩家在对局中下了第3手",
    rank: (n) => `第${n}名`,
    rankCol: "排名",
    times: (n) => `${n}次`,
    blackRate: "黑胜率",
    whiteRate: "白胜率",
    drawRate: "和棋率",
    totalGames: "对局数",
    searchByKeyword: "按关键词搜索锦标赛",
    filterByPlayer: "按玩家姓名筛选",
    helpTitle: "基本用法",
  },
  "zh-Hant": {
    win: "勝",
    lose: "負",
    draw: "和",
    points: "積分",
    result: "結果",
    opening: "開局",
    playerTotalResults: (name) => `從 ${name} 角度的累計勝負`,
    openingYellow: "※開局欄中黃色表示該玩家在對局中下了第3手",
    rank: (n) => `第${n}名`,
    rankCol: "排名",
    times: (n) => `${n}次`,
    blackRate: "黑勝率",
    whiteRate: "白勝率",
    drawRate: "和局率",
    totalGames: "對局數",
    searchByKeyword: "按關鍵詞搜索錦標賽",
    filterByPlayer: "按玩家姓名篩選",
    helpTitle: "基本用法",
  },
};



const usage = {
  ja: {
    usage_intro: `
<p>連珠のトーナメント集計ツールです。<a href="https://x.com/nachirenju">@nachirenju</a>が興味本位で知識0のところから製作した経緯上、ちゃんと動くか未知数です。<br>
私自身の使用に問題はありませんでしたが、こちらを使用したことでいかなる問題が発生しても責任は負いかねます。<br>
何かあればXアカウントのほうにご連絡ください。<br>
このツールとは全く関係ないですが<a href="https://www.youtube.com/channel/UCfbgN9hrrh9fmFKs8gxln5g">YouTubeチャンネル</a>を所有しています。こちらも応援していただけると幸いです。</p>
    `,
    usage_basic: `
<h3>〇基本的な使い方</h3>
<ol>
  <li>「ファイルを選択」を押しデータベースを読み込ませます。.rifおよび.xmlが読み込み可能（データベースは<a href="https://www.renju.net/">renju.net</a>よりダウンロード可能）<br> 
      ※RIF公式のデータベースでしか動作検証をしていません。</li>
  <li>キーワード検索で候補を探すか、大会IDを右側の欄に直接入力します。カンマ区切りで複数入力可<br></li>
  <li>入力後、「大会集計」ボタンを押すと基本データが出ます。</li>
  <li>現状、Soosrv-8,Taraguchi-10,Classic,Yamaguchi以外のトーナメントには未対応です。<br>
      (連珠の対局を検索する分にはほぼこの4つの開局規定さえ押さえれば困らないので当面更新予定なし)</li>
  <li>プレイヤーで絞り込みは、入力したプレイヤーが参加した大会すべてがリストアップされ、他条件と連動します。<br>
      ※複数人入力の場合、入力したプレイヤー全員が参加した大会のみがリストアップされます。(カンマ区切り）</li>
</ol>

<h3>〇データについて</h3>
<ul>
  <li>N手目着手者勝利数のみ、決着がついた対局のみから集計してます（引き分け除外）</li>
  <li>頻出棋譜リストに黒()という記載がありますが、これは開局において黒がN手目を打ちましたという意味です(swap履歴)<br>
      (例)黒(1,3):Suzuki Taro,白:Sato Jiro→Suzukiさんが1,3手目、Satoさんが2,4,5手目を着手</li>
</ul>

<h3>〇プレイヤー別集計</h3>
<ul>
  <li>現状RIF側のname,surname,nativename,surname+nameのいずれかを入力すると検索できます。</li>
  <li>カンマ区切りで複数人の入力に対応しています。</li>
  <li>複数人入力時、該当プレイヤー同士の対局のみが検索されます。<br>
      (例:A,Bと入力したとき、A vs Bの対局のみが抽出。A,B,CのときはAB AC BCの組み合わせが抽出）</li>
</ul>
    `,
  },
  en: {
    usage_intro: `
<p>This is a Renju tournament aggregation tool. It was created by <a href="https://x.com/nachirenju">@nachirenju</a> out of pure interest, starting from zero knowledge, so its reliability is uncertain.<br>
Although I have not experienced issues myself, I cannot take responsibility for any problems caused by using this tool.<br>
If you have any questions, please contact me on X.<br>
Unrelated to this tool, I also run a <a href="https://www.youtube.com/channel/UCfbgN9hrrh9fmFKs8gxln5g">YouTube channel</a>. I would appreciate your support there as well.</p>
    `,
    usage_basic: `
<h3>〇Basic Usage</h3>
<ol>
  <li>Click "Select File" to load a database. Supports .rif and .xml files (databases can be downloaded from <a href="https://www.renju.net/">renju.net</a>).<br>
      *Only tested with the official RIF database.</li>
  <li>Search by keyword or enter the tournament ID directly in the right field. Multiple IDs can be entered with commas.<br></li>
  <li>After entering, press the "Analyze Tournament" button to display the basic data.</li>
  <li>Currently only Soosrv-8, Taraguchi-10, Classic, and Yamaguchi tournaments are supported.<br>
      (For searching Renju games, these 4 rules cover most cases, so no update planned for now.)</li>
  <li>Filter by player lists all tournaments the entered player(s) participated in, linked with other conditions.<br>
      *If multiple players are entered, only tournaments where all listed players participated will appear (comma separated).</li>
</ol>

<h3>〇About the Data</h3>
<ul>
  <li>Only games with a decisive result are counted for move-number win stats (draws excluded).</li>
  <li>In the frequent opening list, "Black()" indicates which moves were played by Black in the opening (swap history).<br>
      Example: Black(1,3): Suzuki Taro, White: Sato Jiro → Suzuki played 1st & 3rd moves, Sato played 2nd, 4th, 5th moves.</li>
</ul>

<h3>〇Player Statistics</h3>
<ul>
  <li>Currently supports searching by name, surname, native name, or surname+name in the RIF database.</li>
  <li>Supports multiple players input separated by commas.</li>
  <li>If multiple players are entered, only games between those players are extracted.<br>
      Example: Entering "A,B" → only A vs B games are extracted. "A,B,C" → AB, AC, BC combinations extracted.</li>
</ul>
    `,
  },
  ko: {
    usage_intro: `
<p>이것은 렌주 토너먼트 집계 도구입니다. <a href="https://x.com/nachirenju">@nachirenju</a>가 흥미 위주로 지식 0에서 제작했기 때문에 제대로 동작할지는 불확실합니다.<br>
저는 개인적으로 사용하는 데 문제가 없었지만, 이 도구 사용으로 발생하는 문제에 대해서는 책임질 수 없습니다.<br>
문의 사항이 있으면 X 계정으로 연락해 주세요.<br>
이 도구와는 전혀 상관없지만 <a href="https://www.youtube.com/channel/UCfbgN9hrrh9fmFKs8gxln5g">YouTube 채널</a>도 운영하고 있으니 응원 부탁드립니다.</p>
    `,
    usage_basic: `
<h3>〇기본 사용법</h3>
<ol>
  <li>"파일 선택"을 눌러 데이터베이스를 불러옵니다. .rif 및 .xml 파일 지원 (데이터베이스는 <a href="https://www.renju.net/">renju.net</a>에서 다운로드 가능)<br>
      *RIF 공식 데이터베이스에서만 동작 검증을 했습니다.</li>
  <li>키워드 검색으로 후보를 찾거나, 오른쪽 입력란에 토너먼트 ID를 직접 입력합니다. 쉼표로 여러 개 입력 가능.<br></li>
  <li>입력 후 "토너먼트 집계" 버튼을 누르면 기본 데이터가 표시됩니다.</li>
  <li>현재 Soosrv-8, Taraguchi-10, Classic, Yamaguchi 이외의 토너먼트는 지원하지 않습니다.<br>
      (렌주 대국 검색에는 이 4가지 규정만으로도 충분하기 때문에 당분간 업데이트 예정 없음)</li>
  <li>플레이어 필터링은 입력한 플레이어가 참가한 모든 토너먼트를 나열하며, 다른 조건과도 연동됩니다.<br>
      *여러 명 입력 시, 입력한 모든 플레이어가 참가한 토너먼트만 나옵니다. (쉼표 구분)</li>
</ol>

<h3>〇데이터에 대하여</h3>
<ul>
  <li>N번째 착수 승리 수치는, 승패가 난 대국만 집계합니다 (무승부 제외).</li>
  <li>자주 나오는 기보 목록에 "흑()" 표기는, 개국에서 흑이 N번째 수를 두었다는 의미입니다 (swap 이력).<br>
      예) 흑(1,3): Suzuki Taro, 백: Sato Jiro → Suzuki가 1,3수, Sato가 2,4,5수를 착수.</li>
</ul>

<h3>〇플레이어별 집계</h3>
<ul>
  <li>현재 RIF의 name, surname, nativename, surname+name 중 하나를 입력하면 검색 가능합니다.</li>
  <li>쉼표로 구분하여 여러 명 입력 가능합니다.</li>
  <li>여러 명 입력 시, 해당 플레이어끼리의 대국만 추출됩니다.<br>
      예) A,B 입력 → A vs B만 추출. A,B,C 입력 → AB, AC, BC 조합 추출.</li>
</ul>
    `,
  },
  zh: {
    usage_intro: `
<p>这是一个连珠锦标赛统计工具。<a href="https://x.com/nachirenju">@nachirenju</a>出于兴趣，从零开始制作，因此是否完全稳定尚不确定。<br>
我个人使用时没有遇到问题，但对因使用本工具而造成的任何问题概不负责。<br>
如有问题，请通过 X 账号联系我。<br>
此外，与此工具无关，我还运营一个 <a href="https://www.youtube.com/channel/UCfbgN9hrrh9fmFKs8gxln5g">YouTube 频道</a>，也希望能得到大家的支持。</p>
    `,
    usage_basic: `
<h3>〇基本用法</h3>
<ol>
  <li>点击“选择文件”载入数据库。支持 .rif 和 .xml 文件（数据库可从 <a href="https://www.renju.net/">renju.net</a> 下载）<br>
      *仅在 RIF 官方数据库上进行过测试。</li>
  <li>通过关键字搜索候选，或直接在右侧输入栏输入比赛 ID。可用逗号分隔输入多个。<br></li>
  <li>输入后，点击“比赛统计”按钮即可显示基本数据。</li>
  <li>目前仅支持 Soosrv-8、Taraguchi-10、Classic、Yamaguchi 赛事。<br>
      （在连珠对局搜索中，这 4 种开局规则已覆盖绝大部分情况，因此暂无更新计划）</li>
  <li>按玩家筛选会列出输入玩家参与的所有比赛，并与其他条件联动。<br>
      *输入多个玩家时，仅显示所有输入玩家均参加的比赛（逗号分隔）。</li>
</ol>

<h3>〇关于数据</h3>
<ul>
  <li>仅统计有胜负的对局中的第 N 手胜利数（平局排除）。</li>
  <li>在常见棋谱列表中出现的“黑()”表示开局阶段由黑方在第 N 手落子（swap 记录）。<br>
      例：黑(1,3): Suzuki Taro, 白: Sato Jiro → Suzuki 执黑第1、3手，Sato 执白第2、4、5手。</li>
</ul>

<h3>〇玩家统计</h3>
<ul>
  <li>目前支持输入 RIF 数据库中的 name、surname、nativename、surname+name 进行搜索。</li>
  <li>支持逗号分隔输入多个玩家。</li>
  <li>输入多个玩家时，仅提取这些玩家之间的对局。<br>
      例：输入 A,B → 仅提取 A vs B。输入 A,B,C → 提取 AB、AC、BC 的对局。</li>
</ul>
    `,
  },
  "zh-Hant": {
    usage_intro: `
<p>這是一個連珠錦標賽統計工具。<a href="https://x.com/nachirenju">@nachirenju</a>出於興趣，從零開始製作，因此是否完全穩定尚不確定。<br>
我個人使用時沒有遇到問題，但對因使用本工具而造成的任何問題概不負責。<br>
如有問題，請通過 X 帳號聯繫我。<br>
此外，與此工具無關，我還經營一個 <a href="https://www.youtube.com/channel/UCfbgN9hrrh9fmFKs8gxln5g">YouTube 頻道</a>，也希望能得到大家的支持。</p>
    `,
    usage_basic: `
<h3>〇基本用法</h3>
<ol>
  <li>點擊“選擇文件”載入數據庫。支持 .rif 和 .xml 文件（數據庫可從 <a href="https://www.renju.net/">renju.net</a> 下載）<br>
      *僅在 RIF 官方數據庫上進行過測試。</li>
  <li>通過關鍵詞搜索候選，或直接在右側輸入欄輸入比賽 ID。可用逗號分隔輸入多個。<br></li>
  <li>輸入後，點擊“比賽統計”按鈕即可顯示基本數據。</li>
  <li>目前僅支持 Soosrv-8、Taraguchi-10、Classic、Yamaguchi 赛事。<br>
      （在連珠對局搜索中，這 4 種開局規則已覆蓋絕大部分情況，因此暫無更新計劃）</li>
  <li>按玩家篩選會列出輸入玩家參與的所有比賽，並與其他條件聯動。<br>
      *輸入多個玩家時，僅顯示所有輸入玩家均參加的比賽（逗號分隔）。</li>
</ol>

<h3>〇關於數據</h3>
<ul>
  <li>僅統計有勝負的對局中的第 N 手勝利數（平局排除）。</li>
  <li>在常見棋譜列表中出現的“黑()”表示開局階段由黑方在第 N 手落子（swap 記錄）。<br>
      例：黑(1,3): Suzuki Taro, 白: Sato Jiro → Suzuki 執黑第1、3手，Sato 執白第2、4、5手。</li>
</ul>

<h3>〇玩家統計</h3>
<ul>
  <li>目前支持輸入 RIF 數據庫中的 name、surname、nativename、surname+name 進行搜索。</li>
  <li>支持逗號分隔輸入多個玩家。</li>
  <li>輸入多個玩家時，僅提取這些玩家之間的對局。<br>
      例：輸入 A,B → 僅提取 A vs B。輸入 A,B,C → 提取 AB、AC、BC 的對局。</li>
</ul>
    `,
  },
};

const updates = {
  ja: {
    updateHistory: `
<h3>〇更新履歴</h3>
<ul>
  <li>2025/09/06 大会集計欄クリアボタンを設置、検索候補をidが大きい方から出るように変更、検索候補非表示件数を表示</li>
  <li>2025/09/06 プレイヤー集計に画像として保存ボタンを追加</li>
  <li>2025/09/06 プレイヤー集計に.xlsx出力ボタンを追加</li>
  <li>2025/09/12 プレイヤー集計の対局一覧に珠型表記。3手目着手の場合は黄文字表記</li>
  <li>2025/09/12 大会IDのキーワード検索にプレイヤーで絞り込みを追加、スワップ履歴検索をわかりやすく</li>
  <li>2025/09/16 頻出棋譜リストにswap履歴を記載、珠型ごとの頻出棋譜を追加、swap履歴検索の同性同名時の処理を修正、珠型のswap履歴検索に対応</li>
  <li>2025/09/25 対局のリンクに再現機能+GIF保存を追加</li>
  <li>2025/09/29 4言語に翻訳、不要になったスワップ履歴検索を無効化</li>
</ul>
    `
  },
  en: {
    updateHistory: `
<h3>〇Update History</h3>
<ul>
  <li>2025/09/06 Added "Clear Tournament Stats" button, changed search candidates to display from larger IDs, and show hidden candidate count</li>
  <li>2025/09/06 Added "Save as Image" button to player statistics</li>
  <li>2025/09/06 Added ".xlsx export" button to player statistics</li>
  <li>2025/09/12 Added opening notation to player match list; yellow text when the 3rd move was played</li>
  <li>2025/09/12 Added player filter to tournament ID keyword search, improved swap history search clarity</li>
  <li>2025/09/16 Added swap history to frequent sequence list, added frequent sequences by opening, fixed duplicate-name handling in swap search, supported swap search by opening</li>
  <li>2025/09/25 Added replay function + GIF save to game links</li>
  <li>2025/09/29 Added 4-language support, disabled unnecessary swap history search</li>
</ul>
    `
  },
  ko: {
    updateHistory: `
<h3>〇업데이트 내역</h3>
<ul>
  <li>2025/09/06 대회 집계란 초기화 버튼 추가, 검색 후보를 큰 ID부터 표시하도록 변경, 숨겨진 후보 수 표시</li>
  <li>2025/09/06 플레이어 집계에 이미지로 저장 버튼 추가</li>
  <li>2025/09/06 플레이어 집계에 .xlsx 내보내기 버튼 추가</li>
  <li>2025/09/12 플레이어 집계 대국 목록에 개형 표기 추가. 3번째 수 착수 시 노란 글자로 표시</li>
  <li>2025/09/12 대회 ID 키워드 검색에 플레이어 필터 추가, 스왑 기록 검색 가독성 개선</li>
  <li>2025/09/16 자주 나오는 기보 목록에 스왑 기록 추가, 개형별 기보 추가, 동명이인 처리 수정, 개형별 스왑 검색 지원</li>
  <li>2025/09/25 대국 링크에 재현 기능 + GIF 저장 추가</li>
  <li>2025/09/29 4개 언어 지원 추가, 불필요한 스왑 기록 검색 비활성화</li>
</ul>
    `
  },
  zh: {
    updateHistory: `
<h3>〇更新记录</h3>
<ul>
  <li>2025/09/06 新增“大赛统计清空”按钮，将搜索候选改为按较大ID显示，并显示隐藏候选数量</li>
  <li>2025/09/06 在选手统计中新增“保存为图片”按钮</li>
  <li>2025/09/06 在选手统计中新增“.xlsx 导出”按钮</li>
  <li>2025/09/12 在选手对局列表中添加开局标注；若为第3手落子则标注为黄色</li>
  <li>2025/09/12 在赛事ID关键词搜索中新增选手过滤，优化换子记录搜索</li>
  <li>2025/09/16 在常见棋谱列表中增加换子记录，新增按开局的常见棋谱，修复换子搜索中重名处理，支持按开局搜索换子</li>
  <li>2025/09/25 在对局链接中新增复盘功能 + GIF 保存</li>
  <li>2025/09/29 增加四语翻译，禁用不必要的换子记录搜索</li>
</ul>
    `
  },
  "zh-Hant": {
    updateHistory: `
<h3>〇更新紀錄</h3>
<ul>
  <li>2025/09/06 新增「清空比賽統計」按鈕，將搜尋候選改為由較大ID開始顯示，並顯示隱藏候選數</li>
  <li>2025/09/06 在玩家統計中新增「儲存為圖片」按鈕</li>
  <li>2025/09/06 在玩家統計中新增「.xlsx 匯出」按鈕</li>
  <li>2025/09/12 在玩家對局列表中加入開局標註；若為第3手落子則以黃色顯示</li>
  <li>2025/09/12 在比賽ID關鍵字搜尋中新增玩家篩選，並改善換子紀錄搜尋</li>
  <li>2025/09/16 在常見棋譜列表中加入換子紀錄，新增依開局的常見棋譜，修正換子搜尋的同名處理，支援依開局搜尋換子</li>
  <li>2025/09/25 在對局連結中新增重播功能 + GIF 儲存</li>
  <li>2025/09/29 增加四語翻譯，停用不必要的換子紀錄搜尋</li>
</ul>
    `
  }
};



// マージ
Object.keys(extraKeys).forEach(lang => {
  Object.assign(i18n[lang], extraKeys[lang], usage[lang], updates[lang]);
});




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

    firstMove: "firstMove",
    prev5: "prev5",
    prevMove: "prevMove",
    nextMove: "nextMove",
    next5: "next5",
    lastMove: "lastMove",
    currentKifu: "currentKifuPlaceholder",

    gifTitle: "gifTitle",
    gifStartMove: "gifStartMove",
    gifModeBoard: "gifModeBoard",
    gifModeCoords: "gifModeCoords",
    gifModeFull: "gifModeFull",
    gifInterval: "gifInterval",
    gifLastDelay: "gifLastDelay",
  };

  Object.entries(mappings).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && i18n[currentLang][key]) {
      el.textContent = t(key);
    }
  });
}

document.addEventListener("DOMContentLoaded", applyTranslations);
