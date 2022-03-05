import { defineConfig } from 'umi';

export default defineConfig({
  devtool: 'source-map',
  chainWebpack(memo, { env, webpack, createCSSRule }) {
    // COMPRESS=none
    // memo.optimization.minimize(false);

    // use this will not auto run
    // memo.output.umdNamedDefine(true);

    // use qiankun with requirejs
    memo.output.libraryTarget('window');
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '*', component: '@/pages/index' }],
  qiankun: {
    slave: {},
  },
  fastRefresh: {},
});
