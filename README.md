# AI女友微信机器人

一个接入微信平台并对接OpenAI的AI女友机器人，可以和你进行自然、温馨的对话。

## 功能特点

- 🤖 **微信平台接入**：通过Wechaty实现微信消息的接收和发送
- 🧠 **OpenAI驱动**：使用OpenAI API生成智能、自然的回复
- 🎭 **个性化设定**：可配置AI女友的名字、性格和对话风格
- 💬 **对话历史管理**：记忆对话上下文，提供连贯的对话体验
- 📱 **群聊和私聊**：支持在群聊中@机器人或私聊机器人
- 📝 **日志系统**：完整记录系统运行日志，便于问题排查

## 技术栈

- Node.js
- Wechaty + Padlocal Puppet
- OpenAI API
- Express
- Winston (日志)
- Dotenv (环境变量)

## 快速开始

### 1. 安装依赖

```bash
cd AI_Girlfriend
npm install
```

### 2. 配置环境变量

复制`.env.example`文件为`.env`，并填写以下配置：

```bash
# 微信机器人配置
WECHATY_PUPPET_PADLOCAL_TOKEN=your_padlocal_token

# OpenAI配置
OPENAI_API_KEY=your_openai_api_key
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_TEMPERATURE=0.7

# 应用配置
PORT=3000
DEBUG=false

# AI女友配置
AI_GIRLFRIEND_NAME=小女友
AI_GIRLFRIEND_PERSONALITY=可爱、温柔、善解人意的女朋友
```

#### 配置说明：

- **WECHATY_PUPPET_PADLOCAL_TOKEN**：Padlocal令牌，用于微信接入。可从[Wechaty Puppet Padlocal](https://github.com/padlocal/wechaty-puppet-padlocal)获取
- **OPENAI_API_KEY**：OpenAI API密钥，可从[OpenAI官网](https://platform.openai.com/api-keys)获取
- **OPENAI_MODEL**：使用的OpenAI模型，默认为gpt-3.5-turbo
- **OPENAI_TEMPERATURE**：生成回复的随机性，0-2之间，值越高回复越随机
- **AI_GIRLFRIEND_NAME**：AI女友的名字
- **AI_GIRLFRIEND_PERSONALITY**：AI女友的性格描述

### 3. 启动机器人

```bash
# 启动机器人
npm start

# 或使用开发模式（自动重启）
npm run dev
```

### 4. 扫码登录

启动后，会在控制台显示微信登录二维码，使用微信扫码登录即可。

## 使用方法

### 私聊

直接向机器人发送消息，机器人会以AI女友的身份回复你。

### 群聊

在群聊中@机器人并发送消息，机器人会在群聊中回复你。

## 项目结构

```
AI_Girlfriend/
├── src/
│   ├── wechat/          # 微信平台接入模块
│   │   └── handler.js   # 微信事件处理器
│   ├── openai/          # OpenAI API对接模块
│   │   └── client.js    # OpenAI客户端
│   ├── ai/              # AI女友核心模块
│   │   ├── character.js # 角色配置
│   │   ├── chatHistory.js # 对话历史管理
│   │   └── manager.js   # AI管理器
│   └── utils/           # 工具模块
│       └── logger.js    # 日志工具
├── config/              # 配置文件
├── logs/                # 日志文件
├── .env                 # 环境变量配置
├── .env.example         # 环境变量示例
├── package.json         # 项目配置
└── index.js             # 主入口文件
```

## 注意事项

1. 请遵守微信的使用规范，不要滥用机器人功能
2. 保护好你的API密钥和令牌，不要泄露给他人
3. 机器人的回复内容由OpenAI生成，请确保使用合法合规的内容
4. 定期检查日志文件，及时发现和解决问题

## 常见问题

### Q: 机器人无法登录微信？
A: 请检查WECHATY_PUPPET_PADLOCAL_TOKEN是否正确，以及网络连接是否正常。

### Q: 机器人没有回复？
A: 请检查OPENAI_API_KEY是否正确，以及OpenAI服务是否正常。

### Q: 如何修改AI女友的性格？
A: 可以在.env文件中修改AI_GIRLFRIEND_PERSONALITY参数，或直接修改src/ai/character.js文件。

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request！