require('esbuild').buildSync({
  entryPoints: ['./src/ui/index.tsx'],
  bundle: true,
  platform: "browser",
  minify: false,
  outdir: 'dist',
  target: ['chrome70', 'firefox57', 'safari11', 'edge16'],
})


