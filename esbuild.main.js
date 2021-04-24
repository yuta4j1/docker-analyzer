require('esbuild').buildSync({
  entryPoints: ['./src/app.ts'],
  bundle: true,
  minify: false,
  platform: 'node',
  outdir: 'dist',
})
