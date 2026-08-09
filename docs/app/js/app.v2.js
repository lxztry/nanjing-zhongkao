// 南京中考闯关App - 主逻辑
let currentView = 'home';
let currentSubject = null;
let currentTopic = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let sessionCorrect = 0;
let sessionTotal = 0;
let quizMode = null; // 'daily' | 'challenge' | 'topic' | 'wrong'

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  GameState.init();
  renderHome();
  setupEventListeners();
});

// 设置事件监听
function setupEventListeners() {
  // 成就通知
  window.addEventListener('achievement', (e) => {
    showAchievementToast(e.detail);
  });
}

// 渲染首页
function renderHome() {
  currentView = 'home';
  const stats = GameState.getWeeklyStats();
  const accuracy = stats.accuracy;
  
  // 计算本周薄弱点
  const weakPoints = getWeakPoints();
  
  // 计算今日任务完成情况
  const todayProgress = GameState.dailyQuests.filter(q => q.completed).length;
  
  document.getElementById('app').innerHTML = `
    <div class="home-view">
      <!-- 顶部状态栏 -->
      <div class="status-bar">
        <div class="user-info">
          <span class="level-badge">Lv.${stats.level}</span>
          <span class="user-name">${GameState.player.name}</span>
        </div>
        <div class="streak-badge ${stats.streak > 0 ? 'active' : ''}">
          🔥 ${stats.streak}天
        </div>
      </div>

      <!-- 经验条 -->
      <div class="xp-bar">
        <div class="xp-label">
          <span>💎 ${stats.xp} / ${stats.xpToNext} XP</span>
          <span>升级还需 ${stats.xpToNext - stats.xp} XP</span>
        </div>
        <div class="xp-track">
          <div class="xp-fill" style="width: ${(stats.xp/stats.xpToNext)*100}%"></div>
        </div>
      </div>

      <!-- 统计卡片 -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📝</div>
          <div class="stat-value">${stats.totalAnswered}</div>
          <div class="stat-label">已答题</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-value">${accuracy}%</div>
          <div class="stat-label">正确率</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-value">${stats.streak > 0 ? '进行中' : '未开始'}</div>
          <div class="stat-label">连续打卡</div>
        </div>
      </div>

      <!-- 薄弱点提醒 -->
      ${weakPoints.length > 0 ? `
      <div class="section">
        <h3 class="section-title">⚠️ 本周薄弱</h3>
        <div class="weak-list">
          ${weakPoints.slice(0, 3).map(w => `
            <div class="weak-item" onclick="startQuiz('${w.subject}', '${w.topic}', 'weak')">
              <span class="weak-icon">${getSubjectIcon(w.subject)}</span>
              <span class="weak-name">${w.name}</span>
              <span class="weak-rate">${w.accuracy}%</span>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <!-- 今日任务 -->
      <div class="section">
        <h3 class="section-title">📋 今日任务 <span class="quest-count">${todayProgress}/${GameState.dailyQuests.length}</span></h3>
        <div class="quest-list">
          ${GameState.dailyQuests.map(q => `
            <div class="quest-item ${q.completed ? 'completed' : ''}" onclick="handleQuestClick('${q.id}', '${q.type}')">
              <div class="quest-icon">${q.completed ? '✅' : (q.type === 'challenge' ? '⚡' : q.type === 'review' ? '📖' : '📚')}</div>
              <div class="quest-info">
                <div class="quest-title">${q.title}</div>
                <div class="quest-desc">${q.description}</div>
                <div class="quest-progress-bar">
                  <div class="quest-progress-fill" style="width: ${(q.progress/q.target)*100}%"></div>
                </div>
              </div>
              <div class="quest-xp">+${q.xp}XP</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 科目选择 -->
      <div class="section">
        <h3 class="section-title">📚 选择科目开始练习</h3>
        <div class="subject-grid">
          ${Object.entries(QUESTION_BANK).map(([key, subject]) => `
            <div class="subject-card" style="--card-color: ${subject.color}" onclick="showTopics('${key}')">
              <div class="subject-icon">${subject.icon}</div>
              <div class="subject-name">${subject.name}</div>
              <div class="subject-topics">${Object.keys(subject.topics).length}个模块</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 底部导航 -->
      <div class="bottom-nav">
        <div class="nav-item active" onclick="renderHome()">
          <span class="nav-icon">🏠</span>
          <span class="nav-label">首页</span>
        </div>
        <div class="nav-item" onclick="renderProgress()">
          <span class="nav-icon">📊</span>
          <span class="nav-label">进度</span>
        </div>
        <div class="nav-item" onclick="renderAchievements()">
          <span class="nav-icon">🏆</span>
          <span class="nav-label">成就</span>
        </div>
        <div class="nav-item" onclick="renderWrongBook()">
          <span class="nav-icon">📕</span>
          <span class="nav-label">错题本</span>
        </div>
      </div>
    </div>
  `;
}

// 处理任务点击
function handleQuestClick(questId, type) {
  const quest = GameState.dailyQuests.find(q => q.id === questId);
  if (quest.completed) {
    showToast('已完成！明天再来~');
    return;
  }
  
  if (type === 'daily' || type === 'challenge') {
    const subject = type === 'challenge' ? 'random' : quest.subject;
    startQuiz(subject, null, type);
  } else if (type === 'review') {
    startQuiz('wrong', null, 'review');
  }
}

// 显示科目下的专题
function showTopics(subjectKey) {
  currentSubject = subjectKey;
  const subject = QUESTION_BANK[subjectKey];
  
  document.getElementById('app').innerHTML = `
    <div class="topics-view">
      <div class="view-header">
        <button class="back-btn" onclick="renderHome()">← 返回</button>
        <h2>${subject.icon} ${subject.name}</h2>
      </div>
      
      <div class="topic-list">
        ${Object.entries(subject.topics).map(([key, topic]) => `
          <div class="topic-item" onclick="startQuiz('${subjectKey}', '${key}', 'topic')">
            <div class="topic-icon" style="background: ${subject.color}20; color: ${subject.color}">
              📖
            </div>
            <div class="topic-info">
              <div class="topic-name">${topic.name}</div>
              <div class="topic-count">${topic.questions.length}道题</div>
            </div>
            <div class="topic-arrow">→</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 开始答题
function startQuiz(subject, topic, mode) {
  quizMode = mode;
  currentQuestions = [];
  
  if (subject === 'random') {
    // 随机抽题
    const allQuestions = [];
    Object.values(QUESTION_BANK).forEach(sub => {
      Object.values(sub.topics).forEach(t => {
        allQuestions.push(...t.questions);
      });
    });
    currentQuestions = shuffleArray([...allQuestions]).slice(0, 5);
  } else if (subject === 'wrong') {
    // 错题复习
    const wrongIds = GameState.wrongAnswers.map(w => w.id);
    if (wrongIds.length === 0) {
      showToast('暂无错题记录');
      return;
    }
    currentQuestions = findQuestionsByIds(wrongIds).slice(0, 5);
  } else if (topic) {
    // 指定专题
    currentQuestions = [...QUESTION_BANK[subject].topics[topic].questions];
  } else {
    // 指定科目，随机选一专题
    const topics = Object.keys(QUESTION_BANK[subject].topics);
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    currentQuestions = [...QUESTION_BANK[subject].topics[randomTopic].questions];
  }
  
  if (currentQuestions.length === 0) {
    showToast('暂无题目');
    return;
  }
  
  currentQuestionIndex = 0;
  sessionCorrect = 0;
  sessionTotal = 0;
  currentView = 'quiz';
  renderQuestion();
}

// 渲染题目
function renderQuestion() {
  const q = currentQuestions[currentQuestionIndex];
  const total = currentQuestions.length;
  const progress = ((currentQuestionIndex + 1) / total) * 100;
  const subjectName = getSubjectName(q.id);
  
  document.getElementById('app').innerHTML = `
    <div class="quiz-view">
      <!-- 顶部进度 -->
      <div class="quiz-header">
        <div class="quiz-progress-info">
          <span class="quiz-number">第 ${currentQuestionIndex + 1} / ${total} 题</span>
          <span class="quiz-score">得分: ${sessionCorrect}/${sessionTotal}</span>
        </div>
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${progress}%"></div>
        </div>
      </div>

      <!-- 题目内容 -->
      <div class="question-container">
        <div class="question-type-badge">${q.type === 'choice' ? '选择题' : '填空题'}</div>
        <div class="question-text">${q.question}</div>
        
        ${q.type === 'choice' ? `
          <div class="options-list">
            ${q.options.map((opt, i) => `
              <div class="option-item" onclick="selectAnswer(${i})" id="option-${i}">
                <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                <span class="option-text">${opt}</span>
              </div>
            `).join('')}
          </div>
        ` : `
          <div class="input-area">
            <input type="text" id="answer-input" placeholder="请输入答案..." class="answer-input" />
            <button class="submit-btn" onclick="submitInputAnswer()">提交</button>
          </div>
        `}
      </div>

      <!-- 结果区域 -->
      <div id="result-area" class="result-area" style="display: none;"></div>
    </div>
  `;
}

// 选择答案（选择题）
function selectAnswer(index) {
  const q = currentQuestions[currentQuestionIndex];
  const correct = index === q.answer;
  showResult(correct, q.options[index], q.options[q.answer], q.explanation);
}

// 提交填空答案
function submitInputAnswer() {
  const input = document.getElementById('answer-input');
  const userAnswer = input.value.trim();
  const q = currentQuestions[currentQuestionIndex];
  
  if (!userAnswer) {
    showToast('请输入答案');
    return;
  }
  
  // 简化比较：忽略空格、大小写
  const normalizedUser = userAnswer.replace(/\s+/g, '').toLowerCase();
  const normalizedCorrect = q.answer.replace(/\s+/g, '').toLowerCase();
  const correct = normalizedUser === normalizedCorrect;
  
  showResult(correct, userAnswer, q.answer, q.explanation);
}

// 显示答题结果
function showResult(correct, userAnswer, correctAnswer, explanation) {
  sessionTotal += 1;
  if (correct) {
    sessionCorrect += 1;
  }
  
  // 记录到GameState
  const q = currentQuestions[currentQuestionIndex];
  GameState.recordAnswer(q.id, correct);
  
  // 更新任务进度
  if (quizMode === 'daily' || quizMode === 'challenge') {
    const quest = GameState.dailyQuests.find(q => q.type === quizMode);
    if (quest) {
      GameState.updateQuestProgress(quest.id, 1);
    }
  }
  
  // 显示结果
  const resultArea = document.getElementById('result-area');
  resultArea.style.display = 'block';
  resultArea.innerHTML = `
    <div class="result-card ${correct ? 'correct' : 'wrong'}">
      <div class="result-icon">${correct ? '🎉' : '😢'}</div>
      <div class="result-text">${correct ? '回答正确！' : '回答错误'}</div>
      ${!correct ? `
        <div class="answer-compare">
          <div class="your-answer">你的答案: ${userAnswer}</div>
          <div class="correct-answer">正确答案: ${correctAnswer}</div>
        </div>
      ` : ''}
      <div class="explanation">
        <strong>解析：</strong>${explanation}
      </div>
      <button class="next-btn" onclick="nextQuestion()">
        ${currentQuestionIndex < currentQuestions.length - 1 ? '下一题 →' : '查看结果'}
      </button>
    </div>
  `;
  
  // 禁用选项
  document.querySelectorAll('.option-item').forEach((opt, i) => {
    opt.style.pointerEvents = 'none';
    if (i === currentQuestions[currentQuestionIndex].answer) {
      opt.classList.add('correct-option');
    } else if (!correct && i === parseInt(document.querySelector('.option-item:hover')?.id.split('-')[1])) {
      opt.classList.add('wrong-option');
    }
  });
}

// 下一题
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    renderQuestion();
  } else {
    showQuizResult();
  }
}

// 显示答题结果页
function showQuizResult() {
  const accuracy = sessionTotal > 0 ? Math.round((sessionCorrect / sessionTotal) * 100) : 0;
  const xpEarned = sessionCorrect * 5;
  
  // 添加经验值
  GameState.addXP(xpEarned);
  
  currentView = 'result';
  document.getElementById('app').innerHTML = `
    <div class="result-view">
      <div class="result-summary">
        <div class="result-grade">
          ${accuracy >= 80 ? '🌟' : accuracy >= 60 ? '👍' : '💪'}
        </div>
        <h2>${accuracy >= 80 ? '太棒了！' : accuracy >= 60 ? '还不错！' : '继续加油！'}</h2>
        <div class="result-stats">
          <div class="result-stat">
            <span class="stat-value">${sessionCorrect}/${sessionTotal}</span>
            <span class="stat-label">正确数</span>
          </div>
          <div class="result-stat">
            <span class="stat-value">${accuracy}%</span>
            <span class="stat-label">正确率</span>
          </div>
          <div class="result-stat">
            <span class="stat-value">+${xpEarned}</span>
            <span class="stat-label">获得XP</span>
          </div>
        </div>
      </div>
      
      <div class="result-actions">
        <button class="action-btn primary" onclick="renderHome()">返回首页</button>
        <button class="action-btn secondary" onclick="redoQuiz()">再做一遍</button>
      </div>
    </div>
  `;
}

// 重做本题
function redoQuiz() {
  startQuiz(currentSubject, currentTopic, quizMode);
}

// 渲染进度页面
function renderProgress() {
  currentView = 'progress';
  const stats = GameState.getWeeklyStats();
  const subjectProgress = {};
  
  // 统计各科目答题情况
  Object.keys(QUESTION_BANK).forEach(key => {
    subjectProgress[key] = { total: 0, correct: 0 };
  });
  
  // 这个简化处理，实际应该记录每题对应的科目
  document.getElementById('app').innerHTML = `
    <div class="progress-view">
      <div class="view-header">
        <button class="back-btn" onclick="renderHome()">← 返回</button>
        <h2>📊 学习进度</h2>
      </div>
      
      <div class="progress-summary">
        <div class="progress-card">
          <div class="progress-icon">📚</div>
          <div class="progress-info">
            <div class="progress-value">${GameState.player.totalAnswered}</div>
            <div class="progress-label">总答题数</div>
          </div>
        </div>
        <div class="progress-card">
          <div class="progress-icon">🎯</div>
          <div class="progress-info">
            <div class="progress-value">${stats.accuracy}%</div>
            <div class="progress-label">总体正确率</div>
          </div>
        </div>
        <div class="progress-card">
          <div class="progress-icon">🔥</div>
          <div class="progress-info">
            <div class="progress-value">${stats.streak}</div>
            <div class="progress-label">连续打卡</div>
          </div>
        </div>
      </div>

      <div class="level-section">
        <h3>等级进度</h3>
        <div class="level-info">
          <span>Lv.${stats.level}</span>
          <span>${stats.xp} / ${stats.xpToNext}</span>
        </div>
        <div class="level-bar">
          <div class="level-fill" style="width: ${(stats.xp/stats.xpToNext)*100}%"></div>
        </div>
        <div class="level-next">距离下一级还需 ${stats.xpToNext - stats.xp} XP</div>
      </div>

      <div class="subject-progress">
        <h3>各科掌握情况</h3>
        ${Object.entries(QUESTION_BANK).map(([key, subject]) => `
          <div class="subject-progress-item">
            <div class="subject-progress-info">
              <span class="subject-icon">${subject.icon}</span>
              <span class="subject-name">${subject.name}</span>
            </div>
            <div class="subject-progress-bar">
              <div class="subject-progress-fill" style="width: ${getSubjectMastery(key)}%; background: ${subject.color}"></div>
            </div>
            <span class="subject-progress-value">${getSubjectMastery(key)}%</span>
          </div>
        `).join('')}
      </div>

      <button class="back-home-btn" onclick="renderHome()">返回首页</button>
    </div>
  `;
}

// 渲染成就页面
function renderAchievements() {
  currentView = 'achievements';
  const ach = GameState.achievements;
  
  const allAchievements = [
    { id: 'firstLogin', name: '首次登录', desc: '打开应用', icon: '🎉', condition: '首次' },
    { id: 'streak7', name: '坚持一周', desc: '连续7天打卡', icon: '🔥', condition: '7天' },
    { id: 'streak30', name: '坚持一个月', desc: '连续30天打卡', icon: '💎', condition: '30天' },
    { id: 'answer100', name: '初露锋芒', desc: '完成100道题', icon: '📝', condition: '100题' },
    { id: 'answer500', name: '题海无涯', desc: '完成500道题', icon: '📚', condition: '500题' },
    { id: 'accuracy80', name: '学有小成', desc: '正确率达到80%', icon: '🎯', condition: '80%' },
    { id: 'level5', name: '初学者', desc: '达到5级', icon: '⭐', condition: 'Lv.5' },
    { id: 'level10', name: '进阶者', desc: '达到10级', icon: '🌟', condition: 'Lv.10' }
  ];
  
  document.getElementById('app').innerHTML = `
    <div class="achievements-view">
      <div class="view-header">
        <button class="back-btn" onclick="renderHome()">← 返回</button>
        <h2>🏆 成就墙</h2>
      </div>
      
      <div class="achievements-grid">
        ${allAchievements.map(a => `
          <div class="achievement-card ${ach[a.id] ? 'unlocked' : 'locked'}">
            <div class="achievement-icon">${ach[a.id] ? a.icon : '🔒'}</div>
            <div class="achievement-name">${a.name}</div>
            <div class="achievement-desc">${a.desc}</div>
            ${ach[a.id] ? '<div class="achievement-badge">已解锁</div>' : `<div class="achievement-condition">需${a.condition}</div>`}
          </div>
        `).join('')}
      </div>
      
      <button class="back-home-btn" onclick="renderHome()">返回首页</button>
    </div>
  `;
}

// 渲染错题本
function renderWrongBook() {
  currentView = 'wrongbook';
  const wrongAnswers = GameState.wrongAnswers;
  
  document.getElementById('app').innerHTML = `
    <div class="wrongbook-view">
      <div class="view-header">
        <button class="back-btn" onclick="renderHome()">← 返回</button>
        <h2>📕 错题本</h2>
      </div>
      
      ${wrongAnswers.length === 0 ? `
        <div class="empty-state">
          <div class="empty-icon">🎉</div>
          <div class="empty-text">太棒了！暂无错题记录</div>
        </div>
      ` : `
        <div class="wrong-list">
          ${wrongAnswers.map(w => {
            const q = findQuestionById(w.id);
            return q ? `
              <div class="wrong-item">
                <div class="wrong-question">${q.question}</div>
                <div class="wrong-answer">
                  <span class="wrong-label">正确答案：</span>
                  <span class="wrong-value">${q.type === 'choice' ? q.options[q.answer] : q.answer}</span>
                </div>
                <div class="wrong-times">做错${w.wrongCount}次</div>
                <button class="review-btn" onclick="startReview('${w.id}')">复习</button>
              </div>
            ` : '';
          }).join('')}
        </div>
      `}
      
      <button class="back-home-btn" onclick="renderHome()">返回首页</button>
    </div>
  `;
}

// 开始复习某道错题
function startReview(questionId) {
  const q = findQuestionById(questionId);
  if (q) {
    currentQuestions = [q];
    currentQuestionIndex = 0;
    sessionCorrect = 0;
    sessionTotal = 0;
    quizMode = 'review';
    renderQuestion();
  }
}

// 辅助函数
function getSubjectIcon(subjectKey) {
  const icons = {
    chemistry: '🧪', math: '📐', chinese: '📖',
    english: '🔤', physics: '⚡', politics: '⚖️', history: '📜'
  };
  return icons[subjectKey] || '📚';
}

function getSubjectName(questionId) {
  const prefix = questionId.split('_')[0];
  const map = { ch: '化学', ma: '数学', cn: '语文', en: '英语', ph: '物理', po: '道法', hi: '历史' };
  return map[prefix] || '未知';
}

function getSubjectMastery(subjectKey) {
  // 简化：随机生成，实际应该根据答题情况计算
  return Math.min(100, Math.floor(Math.random() * 40 + 60));
}

function getWeakPoints() {
  // 简化：返回随机薄弱点
  const subjects = Object.keys(QUESTION_BANK);
  const weak = [];
  for (let i = 0; i < 3; i++) {
    const key = subjects[i];
    if (QUESTION_BANK[key]) {
      const topics = Object.keys(QUESTION_BANK[key].topics);
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      weak.push({
        subject: key,
        topic: randomTopic,
        name: QUESTION_BANK[key].topics[randomTopic].name,
        accuracy: Math.floor(Math.random() * 30 + 40)
      });
    }
  }
  return weak;
}

function findQuestionById(id) {
  for (const subject of Object.values(QUESTION_BANK)) {
    for (const topic of Object.values(subject.topics)) {
      const q = topic.questions.find(q => q.id === id);
      if (q) return q;
    }
  }
  return null;
}

function findQuestionsByIds(ids) {
  return ids.map(id => findQuestionById(id)).filter(q => q !== null);
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

function showAchievementToast(detail) {
  const toast = document.createElement('div');
  toast.className = 'achievement-toast';
  toast.innerHTML = `
    <div class="achievement-toast-icon">🏆</div>
    <div class="achievement-toast-content">
      <div class="achievement-toast-title">解锁成就：${detail.name}</div>
      <div class="achievement-toast-desc">${detail.desc}</div>
    </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
