# GitHub Pages: your personal study website

Target repository: https://github.com/youssof20/rsm

Website address after a successful deployment: https://youssof20.github.io/rsm/

## Privacy

You chose a public personal website. Anyone who has or finds its address can view the app and download its included PDFs. A private repository does not make a personal-account Pages website private. Private repositories require a Pages-eligible paid plan; GitHub Free supports Pages from public repositories. Truly private Pages access is an Enterprise Cloud organization feature.

Your typed notes, answers, and progress remain in your own browser storage. They are not committed or uploaded to this repository. They do not automatically synchronize across computers or phones.

## One-time setup, step by step

1. Sign in to GitHub as `youssof20` and open the `rsm` repository.
2. Upload the **whole app**, not only `README.md`. If starting from the original local folder before any Git setup, use the commands below. Do not reinitialize or recreate the remote if they already exist.

   ```powershell
   Set-Location E:\code\rsm
   git init -b main
   git add .github .gitignore README.md DEPLOYMENT.md index.html package.json package-lock.json public src sources/CURRICULUM.md tests tsconfig.json vite.config.ts
   git commit -m "Publish Vessel learning app with GitHub Pages deployment"
   git remote add origin https://github.com/youssof20/rsm.git
   git push -u origin main
   ```

   Use the plain remote URL shown above; Markdown `[label](url)` syntax is not valid inside a Git command. The existing README already documents your app, so there is no need to append `# rsm` to it.

3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **GitHub Actions** as the source. If GitHub says your plan cannot publish from a private repository, either use an eligible plan or make the repository public only if you also want its source code public.
5. Open **Actions → Deploy Vessel to GitHub Pages**. If no run starts after setup, choose **Run workflow → main → Run workflow**.
6. Wait for both the `build` and `deploy` jobs to succeed. The build installs dependencies, runs the teaching-model tests, and builds for the `/rsm/` project path. The deployment publishes only `dist/`.
7. Open https://youssof20.github.io/rsm/ and bookmark it on your devices. Check a lesson and a PDF citation. You do not need to keep your computer or the local dev server running.

## Publish future edits

In PowerShell in `E:\code\rsm`:

```powershell
npm test
npm run build:pages
git add src public README.md
git commit -m "Update learning content"
git push
```

Include any other intentionally changed files in `git add` as needed. Every push to `main` automatically rebuilds and deploys the website. Monitor the Actions tab for success before expecting the update to appear.

## Preview the Pages build on this computer

```powershell
npm run build:pages
npm run preview:pages -- --port 4180 --strictPort
```

Open http://127.0.0.1:4180/rsm/. Keep ordinary development at the root with `npm run dev`.

## How this project is configured

- `vite.config.ts`: `/rsm/` for `pages` mode; `/` for normal local development.
- `src/lib/source-url.ts`: PDF links respect the active base path.
- `.github/workflows/pages.yml`: test, build, and deploy on pushes to `main`, with manual reruns available.
- `.gitignore`: excludes build output, dependencies, temporary files, environment files, and local extraction scratch text. The original PDFs remain in `public/sources/` so citations work from any device.
- `tests/pages-check.mjs`: checks a served production build under `/rsm/`, including fonts, assets, navigation, and PDF URLs.

A browser-side password box would not secure public JavaScript or PDFs. If you later need login-only access, change hosting/access controls rather than adding a cosmetic password screen.

Official references: [GitHub Pages creation and visibility](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [private Pages access](https://docs.github.com/en/enterprise-cloud%40latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site), [Vite Pages deployment](https://vite.dev/guide/static-deploy.html#github-pages).
