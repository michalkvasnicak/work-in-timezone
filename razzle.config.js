module.exports = {
  modify: (config, { dev, target }) => {
    const babelRule = config.module.rules[1];
    babelRule.test = /\.(js|mjs|jsx|ts|tsx)$/;

    return {
      ...config,
      resolve: {
        ...config.resolve,
        extensions: ['.ts', '.tsx', '.mjs', '.jsx', '.js', '.json'],
      },
      externals: target === 'node' && !dev ? {} : config.externals,
      module: {
        ...config.module,
        rules: [
          {
            test: /\.svg$/,
            use: ['@svgr/webpack', 'url-loader'],
          },
          ...config.module.rules,
        ],
      },
    };
  },
};
