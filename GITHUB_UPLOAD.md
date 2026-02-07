# Upload Project + Screen Recording to GitHub

## 1. Add your screen recording

Copy your **MP4 file** into this project folder, for example:

```
frontend_technical_assessment/
  ├── app-demo.mp4          ← put your recording here (or any name you like)
  ├── backend/
  ├── frontend/
  └── ...
```

## 2. Open terminal in the project folder

```powershell
cd c:\Users\nagu\Downloads\frontend_technical_assessment_new\frontend_technical_assessment
```

## 3. Stage everything and commit

```powershell
git add -A
git status
git commit -m "Initial commit: frontend assessment + app demo recording"
```

## 4. Create a new repo on GitHub

1. Go to **https://github.com/new**
2. Choose a **Repository name**, e.g. **`visual-pipeline-builder`** (or `flow-pipeline-canvas`, `dag-pipeline-editor`)
3. Set **Public**
4. **Do not** add a README, .gitignore, or license (the project already has a README and .gitignore)
5. Click **Create repository**

## 5. Connect and push

GitHub will show commands; use these (replace `YOUR_USERNAME` and `YOUR_REPO` with yours):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

If GitHub shows **SSH** instead of HTTPS, use:

```powershell
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

**Note:** The root `.gitignore` does **not** exclude `.mp4` files, so your screen recording will be included when you `git add -A`. If the file is large (>100 MB), consider compressing it or using [Git LFS](https://git-lfs.github.com/) for the video.
