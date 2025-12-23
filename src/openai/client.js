const OpenAI = require('openai');
const logger = require('../utils/logger');

// 初始化DeepSeek客户端（兼容OpenAI SDK）
const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1'
});

// 调用DeepSeek API生成回复
const generateResponse = async (messages) => {
  try {
    logger.debug('调用DeepSeek API:', JSON.stringify(messages));
    
    const completion = await deepseek.chat.completions.create({
      model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
      messages: messages,
      temperature: parseFloat(process.env.DEEPSEEK_TEMPERATURE || 0.7),
      max_tokens: 500,
      n: 1,
      stop: null
    });
    
    const response = completion.choices[0].message.content.trim();
    logger.debug('DeepSeek API回复:', response);
    
    return response;
  } catch (error) {
    logger.error('调用DeepSeek API时出错:', error);
    throw error;
  }
};

module.exports = {
  generateResponse
};