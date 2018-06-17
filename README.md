# 写完组件才发现不支持自定义按钮，放弃维护，心累！若有任何问题，请自行找[官网](http://www.wangeditor.com/)

# ngx-wangeditor [![NPM version](https://img.shields.io/npm/v/ngx-wangeditor.svg)](https://www.npmjs.com/package/ngx-wangeditor)

[wangEditor](https://github.com/wangfupeng1988/wangEditor)的 Angular 版本。

## 演示

- [Github](https://cipchk.github.io/ngx-wangeditor/)
- [Stackblitz](https://stackblitz.com/edit/ngx-wangeditor)

## 如何安装

1.  安装 `ngx-wangeditor`

```bash
npm install ngx-wangeditor --save
```

2.  导入 `ngx-wangeditor` 到根模块 `AppModule`

```typescript
import { NgxWangEditorModule } from 'ngx-wangeditor';

@NgModule({
  imports: [
    NgxWangEditorModule.forRoot({
      // 默认配置项，对全局 wangEditor [参数配置](https://www.kancloud.cn/wangfupeng/wangeditor3/335776)
      config: {},
    }),
  ],
})
export class AppModule {}
```

> 建议：在 `SharedModule` 也导入和导出 `NgxWangEditorModule` 确保所有子模块也能使用编辑器。

3.  将 wangeditor 的样式和脚本导入到 `angular.json` 中

```json
"styles": ["node_modules/wangeditor/release/wangEditor.css"],
"scripts": ["node_modules/wangeditor/release/wangEditor.min.js"]
```

## 如何使用

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<wangEditor [(ngModel)]="html"></wangEditor>`,
})
export class AppComponent {
  html = ``;
}
```

## API

| Name    | Type                 | Default | Summary                                                                      |
|---------|----------------------|---------|------------------------------------------------------------------------------|
| config  | `any`                |         | wangEditor [参数配置](https://www.kancloud.cn/wangfupeng/wangeditor3/335776) |
| toolbarSelector | `string` | -       | 菜单CSS选择器，当需要菜单与编辑区域分离 |
| textSelector | `string` | -       | 编辑区域CSS选择器，当需要菜单与编辑区域分离 |
| disabled | `boolean` | -       | 禁用 |

## 常见问题

**关于定制主题**

wangeditor 官方有 less 版本，但并没有包含在发布包当中，因此，若需要定制主题，需要从官网下载 less，并自行调整。

**为什么不支持异步加载 wangeditor**

wangeditor 的体积足够小，因此放在 scripts.js 文件中是可以接受的；且体验上会更好。

## Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1.  Use [GitHub Issues](https://github.com/cipchk/ngx-wangeditor/issues) board to report bugs and feature requests (not our email address)
2.  Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ngx-wangeditor/blob/master/LICENSE) file for the full text)
