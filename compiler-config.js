const Path = require('path');

module.exports = {
  js: [
    {
      input: Path.resolve(__dirname, 'src', 'javascript', 'typescript', 'app.ts'),
      output: Path.resolve(__dirname, 'prod', 'assets', 'js', 'app.js'),
      sourcemap: true
    }
  ],
  css: [
    {
      input: Path.resolve(__dirname, 'src', 'css', 'app.scss'),
      output: Path.resolve(__dirname, 'prod', 'assets', 'css', 'app.css'),
      sourcemap: true
    }
  ]
}