const postcss = require("postcss");
const postcssJs = require("postcss-js");
const tailwind = require("tailwindcss");
const fs = require("fs");

const transform = require("css-to-react-native").default;

const css = `@tailwind utilities;`;

const MQ_PREFIX = "@media";

const toStyles = (output) => {
  const styles = {};
  Object.entries(output).forEach(([name, value]) => {
    if (!name.startsWith(MQ_PREFIX)) {
      try {
        styles[name] = transform(Object.entries(value));
      } catch {}
    } else {
      styles[name] = toStyles(value);
    }
  });
  return styles;
};

postcss(tailwind)
  .process(css)
  .then((result) => {
    const { root } = result;
    const output = postcssJs.objectify(root);
    const styles = toStyles(output);
    fs.writeFileSync("./styles.json", JSON.stringify(styles));
    console.log("Done!");
  })
  .catch(console.error);
