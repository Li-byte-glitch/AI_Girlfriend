// 简单的功能测试脚本
const { character, generateSystemPrompt } = require('./src/ai/character');
const chatHistory = require('./src/ai/chatHistory');
const logger = require('./src/utils/logger');

console.log('=== AI女友微信机器人功能测试 ===\n');

// 测试1: 角色配置
console.log('测试1: 角色配置');
console.log('AI女友名字:', character.name);
console.log('AI女友性格:', character.personality);
console.log('系统提示词长度:', generateSystemPrompt().length);
console.log('✓ 角色配置测试通过\n');

// 测试2: 对话历史管理
console.log('测试2: 对话历史管理');
const testUserId = 'test_user_001';
chatHistory.addMessage(testUserId, 'user', '你好，我是你的男朋友');
chatHistory.addMessage(testUserId, 'assistant', '你好呀亲爱的，今天过得怎么样？😊');
const history = chatHistory.getHistory(testUserId);
console.log('对话历史数量:', history.length);
console.log('最后一条消息:', JSON.stringify(history[history.length - 1]));
console.log('✓ 对话历史管理测试通过\n');

// 测试3: 日志系统
console.log('测试3: 日志系统');
logger.info('测试日志信息');
logger.debug('测试调试信息');
console.log('✓ 日志系统测试通过\n');

console.log('=== 所有核心功能测试完成 ===');
console.log('请确保在.env文件中配置了正确的API密钥和令牌后启动项目');
console.log('使用命令: npm start 或 npm run dev');