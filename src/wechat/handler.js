const logger = require('../utils/logger');
const aiManager = require('../ai/manager');

// 扫码登录事件处理
const onScan = (qrcode, status) => {
  logger.info(`扫码状态: ${status}`);
  const qrCodeUrl = `https://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`;
  logger.info(`请扫描二维码登录: ${qrCodeUrl}`);
  console.log(`请扫描二维码登录: ${qrCodeUrl}`);
};

// 登录事件处理
const onLogin = async (user) => {
  logger.info(`微信机器人登录成功: ${user.name()}`);
  console.log(`微信机器人登录成功: ${user.name()}`);
};

// 登出事件处理
const onLogout = async (user, reason) => {
  logger.info(`微信机器人登出: ${user.name()}, 原因: ${reason}`);
};

// 消息事件处理
const onMessage = async (message) => {
  try {
    const from = message.talker();
    const to = message.listener();
    const content = message.text();
    const room = message.room();

    // 如果是群消息，仅当@机器人时才回复
    if (room) {
      const topic = await room.topic();
      logger.info(`收到群消息 [${topic}] ${from.name()}: ${content}`);
      
      // 检查是否@机器人
      const self = message.wechaty.userSelf();
      if (content.includes(self.name()) || await message.mentionSelf()) {
        // 移除@机器人的部分
        const cleanContent = content.replace(new RegExp(`@${self.name()}`, 'g'), '').trim();
        if (cleanContent) {
          const reply = await aiManager.generateReply(cleanContent, from.name());
          await message.say(`@${from.name()} ${reply}`);
        }
      }
    } else {
      // 私聊消息
      logger.info(`收到私聊消息 ${from.name()}: ${content}`);
      const reply = await aiManager.generateReply(content, from.name());
      await message.say(reply);
    }
  } catch (error) {
    logger.error('处理消息时出错:', error);
  }
};

module.exports = {
  onScan,
  onLogin,
  onLogout,
  onMessage
};