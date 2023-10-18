> ⚠️ 本项目为 [lmobest](https://lmo.best) 的开源版本，目前并没有发布正式版
>
> 用户层的逻辑已经实现完毕，管理页面（后台）仍在开发中。
> 
> 可以关注[频道](https://t.me/s/ChatGPTAdminWebChannel)获取最新消息。

<div align="center">

<img src="apps/docs/static/img/icon.svg" alt="icon"/>

<h1 align="center">ChatGPT Admin Web</h1>

简体中文 / [English](./README_EN.md)

[apps/chat](./apps/chat/README.md)
基于 [ChatGPT-Next-Web](https://github.com/Yidadaa/ChatGPT-Next-Web/tree/b1f27aaf93c88c088db6bae5ac8163e2ffe991bd)
二次开发

带有用户管理和后台面板的 ChatGPT 网页应用

<table>
    <tbody>
      <tr>
        <td>
          <a href="https://docs.lmo.best/">📚 部署文档</a>
        </td>
        <td>
          <a href="https://lmo.best/">🎦 演示站点</a>
        </td>
        <td>
          <a href="https://github.com/AprilNEA/ChatGPT-April-Web/issues">💬 反馈</a>
        </td>
        <td>
          🌐 <a href="https://t.me/ChatGPTAdminWeb">群组</a> & <a href="https://t.me/ChatGPTAdminWebChannel">频道</a>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## ChatGPT Admin Web

<img src="./docs/system.svg" alt="system"/>

## 🤩 开发计划

<img src="./docs/roadmap.svg" alt="system"/>

## 🚀 技术栈 Tech Stack

<img src="./docs/tech-stack.svg" alt="tech-stack"/>

## 仓库 Repository

这是一个 monorepo 仓库，由以下部分组成：

| Package           | Package Description | Package Version | License    |
|-------------------|---------------------|-----------------|------------|
| apps/chat         | 用户界面                | 0.0.1           | 996 && MIT |
| apps/dash         | 后台管理                | 0.0.1           | MIT        |
| apps/docs         | 项目文档                | 0.0.1           | MIT        |
| packages/bots     | API 接口和自定义模型接口      | 0.0.1           | MIT        |
| packages/database | 数据库 DAL 以及部分 Logic  | 0.0.1           | MIT        |

## 作者 Author

- [@AprilNEA](https://github.com/AprilNEA)
- [@PeronGH](https://github.com/PeronGH)

## ☁️ 许可证 License

本仓库中 [apps/chat](./apps/chat) 是基于仓库 [Yidadaa's repository](https://github.com/Yidadaa/ChatGPT-Next-Web) 的
996许可证以[MIT license](./LICENSE)的形式从新分发。

其他部分均以[MIT license](./LICENSE)分发。

<img src="https://hits-app.vercel.app/hits?url=https%3A%2F%2Fgithub.com%2FAprilNEA%2FChatGPT-Admin-Web" />

# 修改者 simonkorl 的话

这是一个个人魔改版本，新创建了一个名为 edu 的 chatbot，可以用来对接不同的 API

## 本地测试与部署

按照下面的步骤依次执行

### 1. 安装环境依赖

#### 1.1 nodejs

这台机器上使用的环境是 node v20.6.1 ，理论上比这个版本高应该都不会出现问题。

如果想在 ubuntu20.04 上面以最小的力气安装最新的 nodejs 的话，我建议按照 https://github.com/nodesource/distributions#ubuntu-versions 中的安装步骤，一步一步跟随执行即可。注意先卸载之前安装过的 nodejs。

#### 1.2 pnpm

`npm intall pnpm -g`

### 2. 试运行

在完成了上面的环境安装后，尝试执行`pnpm install` 和 `npm run dev` 命令，如果可以成功安装则说明环境配置正确。

在运行之后，vscode 会自动弹出 doc 界面，建议先从前往后看一遍，对项目整体有一个了解。

### 3. 准备 redis 数据库

如果想要尽快部署测试，建议直接使用 upstash 的数据库。未来如有需要，可以想办法迁移到自己所有的 redis 数据库。

参考 [](apps/docs/docs/02-quick-deploy.md) 中的教程进行注册和配置。

为了使你的数据库生效，你需要在数据库中插入一个每个 plan 的使用上限表。你需要网数据库插入 json 格式的文件来做到这一点。为了简化这个步骤，我们把相关的功能实现在 upstash_utils.py 中，请参考代码进行使用。下面是一个大概的步骤演示：

- 安装依赖：`pip install "redis[hiredis]"`
- 创建一个名为 `.redis.json` 文件，其中的内容包括 upstash 进入数据库后的 Details，选择 python 之后的所有关键字。格式类似下面的介绍
  ```json
  {
    "host": "xxxxx.upstash.io",
    "port": 12345,
    "password":"xxxxxxx",
    "ssl": true
  }
  ```
- 运行 python upstash_utils.py init 初始化数据库

### 4. 配置环境变量

在 apps/chat 目录下编写 .env.local 文件来配置环境变量（这样相对来说更加稳定而且安全）。需要提供至少以下的信息：

  - `REDIS_URL=https://xxxxx.upstash.io`: 你创建的 upstash 数据库
  - `REDIS_TOKEN=xxxxx`: 你创建的 upstash 数据库访问 token
  - `JWT_SECRET`: 根据文档的说明，生成一个足够长的随机字符串

建议修改下面的数值
- `OPENAI_ENDPOINT`: 如果要使用 chatgpt，那么最好在无法访问到 chat.openai.com 的地区提供一个网址来作为 endpoint
- `OPENAI_API_KEY`: 设置之后就可以使用默认的 GPT-3.5 功能（不过在这个版本的代码下需要进行一些手动设置才能使用）
- `NEXT_PUBLIC_TITLE`: 这是一个字符串，可以改变主页面上的标题

### 5. 测试运行和登录

运行 `npm run dev` 启动项目，进入 3000 端口对应的页面，点击注册。随便输入邮箱和密码，应该可以进行注册，并且登录进入 chat 页面。此时无论在输入框中输入什么内容，发送后应该都不会产生作用。

### 6. 启动 langchain-chatglm

进入修改后的 langchain-chatglm 项目，运行 `pip install -r requirements.txt` 安装依赖，并且使用 `python api.py` 启动程序。这会启动大模型进行问答，请注意本机的资源情况，建议在命令前面加上 `CUDA_VISIBLE_DEVICES=0` 等变量设置来限制显卡的使用。

### 7. 测试 edubot 对话

启动 api.py 之后，等待命令行输出绿色的启动文字之后，在对话主界面的对话框中输入文字并且提交。一段时间后应该可以看到对话内容。

## 其他说明

### 对话机器人与如何修改

代码中的对话机器人基本上都可以在 packages/bots/src 当中找到，类似于 openai.ts, bing.ts 这样。

我们的这个项目额外添加了 edu.ts 和 glm.ts 两个对话机器人，可以从本地的 7861 端口的对应 url 获取数据。

目前的设计是这样：

- edu.ts

编写了 EduBot，用于高考咨询，读取 http://localhost:7861/test 进行 langchain+chatglm 的对话。需要事先准备好咨询使用的文本，并且放置在 langchain-chatglm 的对应目录，并且运行 python api.py 才能使用。

- glm.ts

这个文件中包括了 GLMBot，但是这个 bot 并不能使用 chatglm 进行回复（目前不行），它唯一的功能是与 hack 模式进行协作，读取某个文件中的固定答案并且进行回复。

- hack 模式

两个 chatbot 都可以使用一种 hack 模式，地址为 http://localhost:7861/hack 。这种 hack 模式可以从 langchain 的项目根目录下读取一个 json 文件，并且以文件的内容进行回答。这个功能实现在 langchain-chatglm::api.py::hack_streamer 函数中。你可以提供以下格式的 json 格式文件来得到问答信息：

```json
[
  {
    "answer": "", // 要回答的内容，每一次读取一个字典并且返回 dict['answer']
  },
  ...
]
```

其中，edubot 读取的是 langchain-Chatglm/results/gaokao_result/langchain_result_new.json, glmbot 读取的是 langchain-Chatglm/glm_history.json 。这两个文件路径是写死在 api.py::hack_streamer 当中的，需要的话可以修改。如果没有这两个文件那么使用 api 的时候会报错。

如果你希望修改现有的 chatbot，那么可以在 packages/bots/src 中找到对应的文件。

如果你希望添加、减少、修改当前可以使用的 chatbot，那么你需要修改不少内容，下面有一些提示：

- 在 packages/bots/src 中编写你需要功能的 chatbot，可以参考 openai.ts 中的格式编写
- 在 `apps/chat/src/app/api/bots/typing.ts` 中的 otherModel 中添加你编写的全新 model，否则无法提交 post 信息

```ts
const chatRole = z.enum(["assistant", "system", "user"]);
export const gptModel = z.enum(["gpt-3.5-turbo", "gpt-4"]);
const otherModel = z.enum(["new-bing", "edu", "glm"]);
```

- 在 `apps/chat/src/app/api/bots/[model]/route.ts` 中的 switch 语句中编写你编写的 chatbot 对象，否则无法使用

```ts
switch (params.model) {
    case "openai":
      const validatedModel = gptModel.parse(model);
      bot = new OpenAIBot(OPENAI_API_KEY, validatedModel);
      break;
    case "new-bing":
      bot = new BingBot(BING_COOKIE);
      break;
    case "edu":
      bot = new EduBot();
      break;
    case "glm":
      bot = new GlmBot();
      break;
    default:
      return NextResponse.json(
        { msg: "unable to find model" },
        { status: 404 }
      );
  }
```

- 在 `apps/chat/src/store/setting/typing.ts` 修改第一行的 Model type，这样就可以在设定当中进行模型切换

```ts
export type Model = "gpt-3.5-turbo" | "gpt-4" | "newbing" | "edu" | "glm";
```

- 在 `apps/chat/src/store/chat/index.ts` 中修改 ALL_MODEL 变量，从而改变 setting 页面可供选择的模型

```ts
export const ALL_MODELS = [
  // {
  //   name: "gpt-4",
  //   available: true,
  // },
  // {
  //   name: "gpt-3.5-turbo",
  //   available: true,
  // },
  // {
  //   name: "newbing",
  //   available: true,
  // },
  {
    name: "edu",
    available: true,
  },
  {
    name: 'glm',
    available: true
  }
];
```

- 在 `apps/chat/src/store/setting/index.ts` 中修改设定的默认值，主要需要修改 model 字段以设定默认 model

```ts
/***
 * 默认设置, 用于初始化以及重置
 */
const DEFAULT_CONFIG: ChatConfig = {
  historyMessageCount: 8,
  compressMessageLengthThreshold: 1000,
  sendBotMessages: true as boolean,
  submitKey: SubmitKey.Enter as SubmitKey,
  avatar: "1f603",
  theme: Theme.Auto as Theme,
  tightBorder: true,

  modelConfig: {
    // model: "gpt-3.5-turbo",
    model: "edu",
    temperature: 0.7,
    max_tokens: 2000,
    presence_penalty: 0,
  },
};
```

### TODO: 用户类型与权限修改方式

### 项目的奇妙小功能

- 对话限额：对话在一定时间内次数过多会导致无法使用某个模型。注：目前这个功能在屏幕的左下角显示的余量是错误的！
- 弹出式广告：如果输入的问题中包括[中介、留学、文书]其中一个词，并且是免费用户的话，就会弹出广告