# React Netease Music
React Netease Music——一个基于React、TypeScript网易云音乐。

## Demo
[网易云音乐😍](https://github.com/free-project/music__react-netease-music)

## 功能列表
- [x] 登录/登出（目前仅支持手机密码登录）
- [x] 发现页
  - [x] banner
  - [x] 推荐歌单
  - [x] 推荐最新音乐
  - [x] 推荐MV（仅是入口，详情待实现）
- [x] 每日歌曲推荐页
- [x] 全部歌单页
  - [x] 歌单分类查询
- [x] 最新音乐页
- [x] 歌单详情页
- [x] 音乐播放详情页
  - [x] 歌曲评论
  - [x] 点赞/取消点赞歌曲评论
  - [x] 歌词滚动
  - [x] 歌曲所在歌单
  - [x] 相似歌曲推荐
- [x] 播放记录功能
  - [x] 播放列表
  - [x] 历史记录
- [x] 搜索功能
  - [x] 热门搜索关键字
  - [x] 搜索建议
  - [x] 搜索结果页
- [x] 创建的歌单列表
- [x] 收藏的歌单列表
- [ ] 排行榜
- [ ] 所有歌手页
- [ ] 歌手详情页
- [ ] MV相关的页面与功能
- [ ] 创建/编辑/删除歌单
- [ ] 私信/@我/评论等通知功能
- [ ] 主题换肤

## 技术栈
- React，使用react hook做状态管理，没有使用额外的数据管理库。
- TypeScript，用TypeScript确实可以提高效率😃（容易发现错误）。
- Graphql，使用@apollo/client优化部分页面性能。
- CSS Modules。
- Webpack。
- Eslint做代码检查。

感谢 https://github.com/uniquemo/react-netease-music

## API
- [NeteaseCloudMusicApi](https://binaryify.github.io/NeteaseCloudMusicApi)

## Start
- 首先将上面👆提到的API接口部分，两个API服务代码拉到本地，并启动对应的服务；
- [安装`pnpm`包管理工具](https://pnpm.io/installation)；
- 然后拉取本仓库代码，并执行以下命令：
```
pnpm install
pnpm run dev:local
```
- 最后在浏览器中访问：`http://localhost:8080`
