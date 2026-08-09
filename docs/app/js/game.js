// 游戏状态管理
const GameState = {
  // 玩家数据
  player: {
    name: '考生',
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    streak: 0,
    totalAnswered: 0,
    correctAnswers: 0,
    lastPlayDate: null
  },

  // 每日任务
  dailyQuests: [],

  // 闯关进度
  progress: {},

  // 错题本
  wrongAnswers: [],

  // 成就
  achievements: {},

  // 初始化
  init() {
    this.load();
    this.checkDailyReset();
    this.generateDailyQuests();
  },

  // 加载存档
  load() {
    const saved = localStorage.getItem('njzk_player');
    if (saved) {
      const data = JSON.parse(saved);
      this.player = { ...this.player, ...data.player };
      this.progress = data.progress || {};
      this.wrongAnswers = data.wrongAnswers || [];
      this.achievements = data.achievements || {};
    }
  },

  // 保存存档
  save() {
    const data = {
      player: this.player,
      progress: this.progress,
      wrongAnswers: this.wrongAnswers,
      achievements: this.achievements
    };
    localStorage.setItem('njzk_player', JSON.stringify(data));
  },

  // 检查是否需要重置每日任务
  checkDailyReset() {
    const today = new Date().toDateString();
    if (this.player.lastPlayDate !== today) {
      if (this.player.lastPlayDate) {
        const lastDate = new Date(this.player.lastPlayDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          this.player.streak += 1;
        } else if (diffDays > 1) {
          this.player.streak = 0;
        }
      }
      this.player.lastPlayDate = today;
      this.generateDailyQuests();
      this.save();
    }
  },

  // 生成每日任务
  generateDailyQuests() {
    const subjects = ['chemistry', 'math', 'chinese', 'english', 'physics', 'politics', 'history'];
    const questTypes = ['daily', 'challenge', 'review'];
    
    this.dailyQuests = [
      {
        id: 'q1',
        type: 'daily',
        subject: subjects[Math.floor(Math.random() * subjects.length)],
        title: '选择题练习',
        description: '完成5道选择题',
        target: 5,
        progress: 0,
        xp: 15,
        completed: false
      },
      {
        id: 'q2',
        type: 'daily',
        subject: subjects[Math.floor(Math.random() * subjects.length)],
        title: '综合挑战',
        description: '完成3道解答题',
        target: 3,
        progress: 0,
        xp: 25,
        completed: false
      },
      {
        id: 'q3',
        type: 'challenge',
        subject: 'random',
        title: '随机挑战',
        description: '随机抽取3道题',
        target: 3,
        progress: 0,
        xp: 20,
        completed: false
      },
      {
        id: 'q4',
        type: 'review',
        subject: 'wrong',
        title: '错题复习',
        description: '复习2道错题',
        target: 2,
        progress: 0,
        xp: 10,
        completed: false
      }
    ];

    // 恢复已完成的进度
    this.dailyQuests.forEach(quest => {
      const key = `daily_${quest.id}_${new Date().toDateString()}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const data = JSON.parse(saved);
        quest.progress = data.progress;
        quest.completed = data.completed;
      }
    });
  },

  // 更新任务进度
  updateQuestProgress(questId, delta) {
    const quest = this.dailyQuests.find(q => q.id === questId);
    if (quest && !quest.completed) {
      quest.progress = Math.min(quest.progress + delta, quest.target);
      if (quest.progress >= quest.target) {
        quest.completed = true;
        this.addXP(quest.xp);
      }
      
      const key = `daily_${quest.id}_${new Date().toDateString()}`;
      localStorage.setItem(key, JSON.stringify({
        progress: quest.progress,
        completed: quest.completed
      }));
      
      this.checkAchievements();
      this.save();
      return quest;
    }
    return null;
  },

  // 添加经验值
  addXP(amount) {
    this.player.xp += amount;
    while (this.player.xp >= this.player.xpToNextLevel) {
      this.player.xp -= this.player.xpToNextLevel;
      this.player.level += 1;
      this.player.xpToNextLevel = Math.floor(this.player.xpToNextLevel * 1.5);
    }
    this.checkAchievements();
    this.save();
  },

  // 记录答题结果
  recordAnswer(questionId, correct) {
    this.player.totalAnswered += 1;
    if (correct) {
      this.player.correctAnswers += 1;
    } else {
      // 添加到错题本
      if (!this.wrongAnswers.find(w => w.id === questionId)) {
        this.wrongAnswers.push({
          id: questionId,
          wrongCount: 1,
          lastWrong: new Date().toISOString()
        });
      } else {
        const record = this.wrongAnswers.find(w => w.id === questionId);
        record.wrongCount += 1;
        record.lastWrong = new Date().toISOString();
      }
    }
    this.save();
  },

  // 获取正确率
  getAccuracy() {
    if (this.player.totalAnswered === 0) return 0;
    return Math.round((this.player.correctAnswers / this.player.totalAnswered) * 100);
  },

  // 检查成就
  checkAchievements() {
    const ach = this.achievements;
    
    // 首次登录
    if (!ach.firstLogin) {
      ach.firstLogin = true;
      this.showAchievement('firstLogin', '首次登录', '🎉 打开应用，开启学习之旅！');
    }

    // 连续打卡
    if (this.player.streak >= 7 && !ach.streak7) {
      ach.streak7 = true;
      this.showAchievement('streak7', '坚持一周', '🔥 连续7天打卡！');
    }
    if (this.player.streak >= 30 && !ach.streak30) {
      ach.streak30 = true;
      this.showAchievement('streak30', '坚持一个月', '💎 连续30天打卡！');
    }

    // 答题数量
    if (this.player.totalAnswered >= 100 && !ach.answer100) {
      ach.answer100 = true;
      this.showAchievement('answer100', '初露锋芒', '📝 完成100道题目！');
    }
    if (this.player.totalAnswered >= 500 && !ach.answer500) {
      ach.answer500 = true;
      this.showAchievement('answer500', '题海无涯', '📚 完成500道题目！');
    }

    // 正确率
    if (this.player.totalAnswered >= 50 && this.getAccuracy() >= 80 && !ach.accuracy80) {
      ach.accuracy80 = true;
      this.showAchievement('accuracy80', '学有小成', '🎯 正确率达到80%！');
    }

    // 等级
    if (this.player.level >= 5 && !ach.level5) {
      ach.level5 = true;
      this.showAchievement('level5', '初学者', '⭐ 达到5级！');
    }
    if (this.player.level >= 10 && !ach.level10) {
      ach.level10 = true;
      this.showAchievement('level10', '进阶者', '🌟 达到10级！');
    }
  },

  // 显示成就弹窗
  showAchievement(id, name, desc) {
    const event = new CustomEvent('achievement', { detail: { id, name, desc } });
    window.dispatchEvent(event);
  },

  // 获取本周统计数据
  getWeeklyStats() {
    return {
      level: this.player.level,
      xp: this.player.xp,
      xpToNext: this.player.xpToNextLevel,
      streak: this.player.streak,
      totalAnswered: this.player.totalAnswered,
      accuracy: this.getAccuracy()
    };
  }
};

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameState;
}
