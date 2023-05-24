如果需要配置环境变量，有两种方案：

1. 运行 env.sh 配置必要的数据库与密码

`. env.sh` 或 `source env.sh`

其中，env.sh 中的 REIDS_TOKEN 需要从 `@upstash/redis` 这里复制，而不能是外面

2. 在 chats 目录下编写 .env 文件

## 测试流程

使用 `pnpm install` 和 `npm run dev` 来进行本地测试，pnpm 可以通过 npm 安装

## 本地部署

如果想要使用本地部署，那么你需要准备：

1. 数据库：直接使用 upstash 也没有问题

你需要在数据库中插入一个每个 plan 的使用上限表。这个表需要向你的数据库插入 json 文件。格式可以参考 update_plan.py 这个文件。

广告：如果输入的问题中包括[中介、留学、文书]其中一个词，并且是免费用户的话，就会弹出广告

## 修改提示