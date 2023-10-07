const pluginName = 'MyDefinePlugin';

class MyDefinePlugin {
  apply(compiler) {
    const definitions = this.definitions;
    compiler.hooks.compilation.tap(pluginName, (compilation, { normalModuleFactory }) => {
      const walkDefinitions = (definitions, prefix) => {
        Object.keys(definitions).forEach((key) => {
          const code = definitions[key];
          if (
            code &&
            typeof code === 'object' &&
            !(code instanceof RuntimeValue) &&
            !(code instanceof RegExp)
          ) {
            //如果是对象就递归调用
            walkDefinitions(code, prefix + key + '.');
            applyObjectDefine(prefix + key, code);
            return;
          }
          applyDefineKey(prefix, key);
          applyDefine(prefix + key, code);
        });
      };

      const handler = (parser) => {
        const mainValue = compilation.valueCacheVersions.get(VALUE_DEP_MAIN);
        //mainValue是在DefinePlugin最初初始化时定义到compilation.valueCacheVersions上的
        parser.hooks.program.tap('DefinePlugin', () => {
          const { buildInfo } = parser.state.module;
          if (!buildInfo.valueDependencies) buildInfo.valueDependencies = new Map();
          buildInfo.valueDependencies.set(VALUE_DEP_MAIN, mainValue);
        });
        //....
        walkDefinitions(definitions, '');
      };

      //...
      normalModuleFactory.hooks.parser.for('javascript/auto').tap('DefinePlugin', handler);
      normalModuleFactory.hooks.parser.for('javascript/dynamic').tap('DefinePlugin', handler);
      normalModuleFactory.hooks.parser.for('javascript/esm').tap('DefinePlugin', handler);
      //...
    });
  }
}
module.exports = MyDefinePlugin;
