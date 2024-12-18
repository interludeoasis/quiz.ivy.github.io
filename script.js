const quizData = [
    {
        question: "人間の体で最も強い筋肉はどれでしょう？",
        options: ["心臓", "太ももの筋肉", "舌", "噛む筋肉"],
        correctIndex: 3,
        difficulty: 2 // 獲得ポイント（2点）
    },
    {
        question: "猫が喉をゴロゴロ鳴らす理由の一つは何でしょう？",
        options: ["飼い主への挨拶", "骨を修復する", "お腹が空いた", "獲物を呼ぶ"],
        correctIndex: 1,
        difficulty: 3 // 獲得ポイント（3点）
    },
    {
        question: "コアラが1日に取る睡眠時間はどのくらいでしょう？",
        options: ["約6時間", "約10時間", "約16時間", "約20時間"],
        correctIndex: 3,
        difficulty: 3 
    },
   
    {
        question: "人間の体の中で最も重い臓器は？",
        options: ["心臓", "脳", "肝臓", "腎臓"],
        correctIndex: 2,
        difficulty: 2 // 獲得ポイント（2点）
    },
    
    {
    question: "電子レンジが発明されたきっかけは？",
    options: ["チョコレートが溶けた", "卵が爆発した", "パンが焦げた", "牛乳がこぼれた"],
    correctIndex: 0,
    difficulty: 2 // 獲得ポイント（2点）
    },
    {
        question: "海水がしょっぱい理由は？",
        options: ["魚の排泄物", "地下の塩", "火山活動", "雨水が流れ込む"],
        correctIndex: 1,
        difficulty: 1 // 獲得ポイント（1点）
    },
    {
        question: "カメが甲羅に閉じ込めることができないのは何？",
        options: ["頭", "脚", "尾", "肋骨"],
        correctIndex: 3,
        difficulty: 3 // 獲得ポイント（3点）
    },
    {
        question: "南極で記録された最低気温は何度？",
        options: ["約-50℃", "約-70℃", "約-90℃", "約-110℃"],
        correctIndex: 2,
        difficulty: 3 // 獲得ポイント（3点）
    },
    {
        question: "日本で最も多く飼育されているペットはどれ？",
        options: ["犬", "猫", "金魚", "鳥"],
        correctIndex: 1,
        difficulty: 1 // 獲得ポイント（1点）
    },
    {
        question: "アルファベットの中で一番使用頻度が高いのはどれ？",
        options: ["E", "A", "I", "O"],
        correctIndex: 0,
        difficulty: 2 // 獲得ポイント（2点）
    },
    {
        question: "ウサギはどこから汗をかく？",
        options: ["耳", "足の裏", "口", "背中"],
        correctIndex: 1,
        difficulty: 2 // 獲得ポイント（2点）
    },
    {
        question: "現在、国際宇宙ステーション（ISS）が地球を一周するのにかかる時間は？",
        options: ["１時間半", "１２時間", "１日", "１週間"],
        correctIndex: 0,
        difficulty: 2 // 獲得ポイント（2点）
    },

];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

function loadQuestion() {
    const questionContainer = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options");
    const resultMessage = document.getElementById("result-message");
    const timerDisplay = document.getElementById("timer");

    // リセット
    resultMessage.textContent = "";
    optionsContainer.innerHTML = "";
    clearInterval(timer); // 前のタイマーをクリア
    timeLeft = 10;
    
    // タイマーのアニメーションリセット
    timerDisplay.style.animation = "none"; // 一度アニメーションを無効化
    void timerDisplay.offsetWidth; // リセット
    timerDisplay.style.animation = "fadeTimer 10s linear"; // アニメーションを再適用
 

    // 現在のクイズデータ
    const currentQuiz = quizData[currentQuestion];
    questionContainer.textContent = currentQuiz.question;

    // 選択肢を生成
    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => handleAnswer(index));
        optionsContainer.appendChild(button);
    });

    // タイマー設定
    timerDisplay.textContent = timeLeft;
    timerDisplay.style.animation = "fadeTimer 10s linear";
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function handleAnswer(selectedIndex) {
    clearInterval(timer); // タイマー停止
    const currentQuiz = quizData[currentQuestion];
    const resultMessage = document.getElementById("result-message");
    const options = document.getElementById("options").children;

    if (selectedIndex === currentQuiz.correctIndex) {
        resultMessage.textContent = "正解！🎉";
        resultMessage.style.color = "purple";
        options[selectedIndex].classList.add("correct");
        score += currentQuiz.difficulty; // スコア加算
    } else {
        resultMessage.textContent = "不正解 😢";
        resultMessage.style.color = "red";
        options[selectedIndex].classList.add("wrong");

        // 正解の選択肢に色を付ける
        options[currentQuiz.correctIndex].classList.add("correct");
    }

    // 次の質問に進む
    setTimeout(() => moveToNextQuestion(), 2000);
}


function handleTimeout() {
    const resultMessage = document.getElementById("result-message");
    const options = document.getElementById("options").children;
    const currentQuiz = quizData[currentQuestion];

    resultMessage.textContent = "時間切れ！⏳";
    resultMessage.style.color = "orange";

    // 正解の選択肢を赤く光らせる
    options[currentQuiz.correctIndex].classList.add("wrong");

    setTimeout(() => moveToNextQuestion(), 1500);
}


function moveToNextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showFinalResult();
    }
}



let ranking = []; // ランキングデータを格納する配列

function showFinalResult() {
    const questionContainer = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options");
    const resultMessage = document.getElementById("result-message");
    const timerDisplay = document.getElementById("timer");
    const rankingContainer = document.getElementById("ranking-container");

    // ランク判定
    const rank =
        score >= 20 ? "上級者" :
        score >= 10 ? "中級者" :
        "初心者";

    // ランキングデータに追加
    const now = new Date();
    const timeString = now.toLocaleTimeString("ja-JP", { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    ranking.push({ score, rank, time: timeString });

    // 表示内容を変更
    questionContainer.textContent = "クイズ終了！";
    optionsContainer.innerHTML = "";
    resultMessage.innerHTML = `あなたのスコア: ${score}<br>ランク: ${rank}`;
    timerDisplay.textContent = "";

    // ランキングを更新
    updateRanking();

    // ランキングを表示
    rankingContainer.style.display = "block";
}

function updateRanking() {
    const rankingList = document.getElementById("ranking-list");
    rankingList.innerHTML = ""; // ランキングをリセット

    ranking.sort((a, b) => b.score - a.score); // スコア順にソート
    ranking.forEach((entry, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<span>${index + 1}. スコア: ${entry.score} (${entry.rank})</span><span>${entry.time}</span>`;
        rankingList.appendChild(listItem);
    });
}


// 初期化
window.onload = loadQuestion;

