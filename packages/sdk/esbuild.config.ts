import { execa as exec } from 'execa'
import { writeFileSync as write } from 'node:fs'
import { sync as glob } from 'fast-glob'
import { build, BuildOptions } from 'esbuild'

// @ts-ignore
import packageJson from './package.json'

const defaultExports = {
  './package.json': './package.json',
}

const shared = {
  target: 'es2015',
  minify: true,
  bundle: true,
  sourcemap: true,
  platform: 'neutral',
} satisfies BuildOptions

const formats = [
  ['cjs', 'require'],
  ['esm', 'import'],
] as const

const entryPoints = glob('src/**/*.ts', {
  cwd: process.cwd(),
  ignore: ['**/*.spec.ts', '**/*.test.ts'],
})

Promise.all(
  entryPoints.map((entryPoint) =>
    Promise.all(
      formats.map(([format]) => {
        const outFile = `${entryPoint
          .replace('src/', '')
          .replace('.ts', '.js')}`

        return Promise.all([
          exec(
            'yarn',
            [
              'tsc',
              entryPoint,
              '--declaration',
              '--emitDeclarationOnly',
              '--skipLibCheck',
              '--outDir',
              outFile.replace('.js', '').replace('/index', ''),
            ],
            {
              stdio: 'inherit',
              cwd: process.cwd(),
            },
          ),
          build({
            ...shared,
            entryPoints: [entryPoint],
            format,
            outfile: `dist/${format}/${outFile}`,
          }),
        ])
      }),
    ),
  ),
)
  .then(() => {
    const exports = [] as any[]

    for (const entryPoint of entryPoints) {
      const exportPoint = {} as any
      for (const [format, importType] of formats) {
        exportPoint[importType] = `./dist/${format}/${entryPoint
          .replace('src/', '')
          .replace('.ts', '.js')}`
      }

      exports.push({
        [entryPoint
          .replace('.ts', '')
          .replace('src', '.')
          .replace('/index', '')]: exportPoint,
      })
    }

    // @ts-ignore
    packageJson.exports = Object.assign(defaultExports, ...exports)

    write('./package.json', JSON.stringify(packageJson, null, 2))
  })
  .catch(console.error)
