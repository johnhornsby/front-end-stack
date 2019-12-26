import path from 'path';
/* eslint-disable import/no-extraneous-dependencies */
import dotenv from 'dotenv';
import args from 'args';
/* eslint-enable import/no-extraneous-dependencies */

const resolvePath = relativePath => path.resolve(__dirname, relativePath);

// aquire .env file param
dotenv.config({
  path: resolvePath('.env'),
});

// aquire production param
// args.option('production', 'Enable production and deploy FE assets to Artifact');
// args.option('frontify', 'Copy assets to frontify folder');
const flags = args.parse(process.argv);

const developmentPath = process.env.DEPLOYMENT_PATH ? process.env.DEPLOYMENT_PATH : '../';
// : 'c:\\sitecore\\ccc.local';
let dest = flags.production ? '../../../../../a' : developmentPath;

// if (flags.production) {
//   dest = '../../../../../a';
// }
// } else if (flags.frontify) {
//   dest = '../frontify';
// } else {
//   dest = developmentSitecorePath;
// }

export default {
  // browserSync: {
  //   baseDir: resolvePath(dest),
  //   files: [resolvePath(`${dest}/dist/**`), resolvePath(`${dest}/**/*.{cshtml,html}`)],
  //   proxy: 'http://ccc.local',
  // },
  clean: {
    src: resolvePath(`${dest}/dist`),
  },
  fonts: {
    src: resolvePath('../assets/fonts/**/*.{woff,woff2,eot,ttf}'),
    dest: resolvePath(`${dest}/dist/fonts`),
  },
  icons: {
    src: resolvePath('../assets/icons/**/*.svg'),
    dest: resolvePath(`${dest}/dist/icons`),
    filename: 'icons.svg',
  },
  images: {
    src: resolvePath('../assets/images/**/*.{jpg,png,svg,webmanifest,xml,ico}'),
    dest: resolvePath(`${dest}/dist/images`),
  },
  js: {
    entry: {
      app: [resolvePath('../app/app.ts')],
      // inlineHead: resolvePath('../app/inline/head.ts'),
      // inlineBody: resolvePath('../app/inline/body.ts'),
    },
    // lint: resolvePath('../app/**/*.{js,jsx}'),
    path: resolvePath(`${dest}/dist/js`),
    chunkFilename: '[name].js',
    filename: '[name].js',
    publicPath: '/dist/js/',
  },
  revision: {
    src: [resolvePath(`${dest}/dist/**`), resolvePath(`${dest}/**/*.html`)],
    dest: resolvePath(`${dest}`),
    dontRenameFile: ['.html'],
    dontUpdateReference: ['.html'],
  },
  scss: {
    src: [resolvePath('../assets/scss/styles.scss')],
    watch: resolvePath('../assets/scss/**/*.scss'),
    lint: resolvePath('../assets/scss/**/*.scss'),
    dest: resolvePath(`${dest}/dist/css`),
    filename: 'styles.css',
  },
};
