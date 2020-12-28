# 使用vue-admin-template + eslint
# 编辑器设置
  ```
  {
    "git.enableSmartCommit": true,
    "liveServer.settings.donotShowInfoMsg": true,
    "editor.minimap.enabled": true,
    "window.zoomLevel": 1,
    "files.associations": {
      "*.js": "javascript",
      "*.wpy": "plaintext",
      "*.dart": "dart",
      "*.cjson": "jsonc",
      "*.wxss": "css",
      "*.wxs": "javascript"
    },
    "[html]": {
      "editor.defaultFormatter": "vscode.html-language-features"
    },
    "search.followSymlinks": false,
    "javascript.updateImportsOnFileMove.enabled": "always",
    "workbench.startupEditor": "welcomePage",
    "typescript.updateImportsOnFileMove.enabled": "always",
    "javascript.implicitProjectConfig.experimentalDecorators": true,
    "[dart]": {},
    "editor.tabSize": 2,
    "terminal.integrated.rendererType": "dom",
    "editor.suggestSelection": "first",
    "[vue]": {},
    "[scss]": {
        "editor.defaultFormatter": "michelemelluso.code-beautifier"
    },
    "emmet.includeLanguages": {
        "wxml": "html"
    },
    "task.autoDetect": "off",
    "timeline.excludeSources": [
        "git-history"
    ],
    "git.confirmSync": false,
    "terminal.integrated.shell.windows": "C:\\WINDOWS\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
    "[css]": {
        "editor.defaultFormatter": "michelemelluso.code-beautifier"
    },
    "settingsSync.ignoredExtensions": [],
    "settingsSync.ignoredSettings": [],
    "vetur.validation.template": false, // 配置vetur
    "vetur.format.defaultFormatterOptions": { // vetur的格式化配置
        "prettier": {
            "semi": true,
            "singleQuote": true
        }
    },
    "files.autoSave": "off",
    "launch": {
        "configurations": [],
        "compounds": []
    },
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "eslint.codeAction.showDocumentation": {
        "enable": true
    }
  }
  ```
# 项目目录
  - mock 模拟数据 
    1. 关闭mock修改vue.config.js
      ```
        devServer: {
        port: port,
        open: true,
        overlay: {
          warnings: false,
          errors: true
        },
        before: require('./mock/mock-server.js') // 注释掉它则不启动mock数据
      },
      ```
    2. 修改 env 里面的请求url为"/dev-api",则走mock里面的数据
  - src 源代码
    - api 请求地址
    - accsets 图片
    - components 组件
    - env 文件配置请求地址 
    - icons 使用svg图片
    - layout 公共页面
    - mixins 公共方法
    - router 路由
    - store 数据共享
    - styles 公共样式文件
    - utils 方法
    - views 具体页面视图
