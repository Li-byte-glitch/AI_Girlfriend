// 对话历史管理器
class ChatHistory {
  constructor(maxHistoryLength = 20) {
    this.maxHistoryLength = maxHistoryLength;
    this.histories = new Map(); // 使用Map存储每个用户的对话历史
  }

  // 添加消息到对话历史
  addMessage(userId, role, content) {
    if (!this.histories.has(userId)) {
      this.histories.set(userId, []);
    }

    const history = this.histories.get(userId);
    history.push({ role, content });

    // 限制历史记录长度
    if (history.length > this.maxHistoryLength) {
      history.shift(); // 移除最旧的消息
    }
  }

  // 获取用户的对话历史
  getHistory(userId) {
    return this.histories.get(userId) || [];
  }

  // 清空用户的对话历史
  clearHistory(userId) {
    if (this.histories.has(userId)) {
      this.histories.delete(userId);
    }
  }

  // 获取所有用户的对话历史
  getAllHistories() {
    return Object.fromEntries(this.histories);
  }
}

module.exports = new ChatHistory();