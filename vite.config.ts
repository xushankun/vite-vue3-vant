import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import postcsspxtoviewport from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vue-router'], // 自动导入vue和vue-router相关函数
      dts: 'src/auto-import.d.ts', // 生成 `auto-import.d.ts` 全局声明
      // eslint报错解决
      eslintrc: {
        enabled: true
      },
      resolvers: [VantResolver()]
    }),
    Components({
      resolvers: [VantResolver()]
    }),
    // 配置vite运行的时候自动检测eslint规范
    eslintPlugin({
      cache: false, // 禁用 eslint 缓存
      include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.tsx', 'src/**/*.vue']
    })
  ],
  // 配置文件引用别名 alias
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 4300,
    proxy: {
      '/api': {
        target: 'https://shcccs.shfda.org',
        rewrite: path => path.replace(/^\/api/, ''),
        changeOrigin: true
      }
    }
  },
  css: {
    postcss: {
      plugins: [
        // 中文文档【配置查询】：https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
        postcsspxtoviewport({
          unitToConvert: 'px', // 要转化的单位
          viewportWidth: 350, // UI设计稿的宽度
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: ['ignore-'], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          // exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
          include: [/node_modules\/vant/], // 针对UI框架的转换
          landscape: false // 是否处理横屏情况
        })
      ]
    }
  }
})
