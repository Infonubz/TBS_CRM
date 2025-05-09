module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules = webpackConfig.module.rules.map((rule) => {
        if (
          rule.use &&
          rule.use.some(
            (use) => use.loader && use.loader.includes("source-map-loader")
          )
        ) {
          rule.exclude = /node_modules/;
        }
        return rule;
      });

      webpackConfig.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      };

      return webpackConfig;
    },
  },
};
