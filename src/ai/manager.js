const { generateSystemPrompt } = require('./character');
const chatHistory = require('./chatHistory');
const openaiClient = require('../openai/client');
const logger = require('../utils/logger');

// 生成AI回复
const generateReply = async (userInput, userId) => {
  try {
    logger.info(`用户 ${userId} 输入: ${userInput}`);
    
    // 添加用户输入到对话历史
    chatHistory.addMessage(userId, 'user', userInput);
    
    // 构建完整的对话消息
    const messages = [
      { role: 'system', content: generateSystemPrompt() },
      ...chatHistory.getHistory(userId)
    ];
    
    // 调用OpenAI API生成回复
    const reply = await openaiClient.generateResponse(messages);
    
    // 添加AI回复到对话历史
    chatHistory.addMessage(userId, 'assistant', reply);
    
    logger.info(`AI 回复 ${userId}: ${reply}`);
    
    return reply;
  } catch (error) {
    logger.error(`生成回复时出错 (用户: ${userId}):`, error);
    
    // 返回错误提示
    return '抱歉，我现在有点忙，稍后再和你聊吧😊';
  }
};

// 清空用户对话历史
const clearUserHistory = (userId) => {
  chatHistory.clearHistory(userId);
  logger.info(`已清空用户 ${userId} 的对话历史`);
};

module.exports = {
  generateReply,
  clearUserHistory
};