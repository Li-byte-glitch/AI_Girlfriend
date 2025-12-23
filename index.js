require('dotenv').config();
const { WechatyBuilder } = require('wechaty');
const { PuppetWechat4u } = require('wechaty-puppet-wechat4u');
const express = require('express');
const logger = require('./src/utils/logger');
const wechatHandler = require('./src/wechat/handler');

const app = express();
const PORT = process.env.PORT || 3000;

// 初始化微信机器人 - 添加登录状态持久化配置
const puppet = new PuppetWechat4u({
  // 使用memory-card实现登录状态持久化
  memory: {
    // 持久化存储文件路径，默认会使用机器人name作为前缀
    // file: './wechaty-memory-card.json' // 注释掉自定义路径，使用默认路径与机器人name一致
  }
});

const bot = WechatyBuilder.build({
  name: 'AI-Girlfriend',
  puppet
});

// 注册微信事件处理器
bot.on('scan', wechatHandler.onScan);
bot.on('login', wechatHandler.onLogin);
bot.on('logout', wechatHandler.onLogout);
bot.on('message', wechatHandler.onMessage);

// 启动微信机器人
bot.start()
  .then(() => {
    logger.info('微信机器人启动成功！');
  })
  .catch(error => {
    logger.error('微信机器人启动失败:', error);
    process.exit(1);
  });

// 启动Express服务器
app.get('/', (req, res) => {
  res.send('AI女友微信机器人正在运行中...');
});

app.listen(PORT, () => {
  logger.info(`Express服务器启动成功，监听端口: ${PORT}`);
});

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  logger.error('未捕获的异常:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('未处理的Promise拒绝:', reason);
});