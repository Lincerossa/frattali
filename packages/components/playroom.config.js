module.exports = {
  components: './src',
  outputPath: './dist/playroom',
  frameComponent: './.playroom/CustomFrame.js',
  // Optional:
  title: 'Playroom testing',
  widths: [320, 375, 768, 1024],
  port: 9000,
  openBrowser: true,
  exampleCode: `
    <Button>
      Hello World!
    </Button>
  `,
}
