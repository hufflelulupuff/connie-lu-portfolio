# Connie Lu. — SEO Writer & Content Strategist

Astro 靜態作品集，繁體中文，Graphite & Blue。包含首頁、About、Services、Contact、作品篩選、四個案例詳頁及 404。

## 本機操作

使用 Node.js 24 與 pnpm 11.25.0：

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm build
pnpm test
pnpm preview
```

`dist` 為建置結果。請以 HTTP 預覽，不要直接雙擊 HTML。未設定正式網址時使用 example.com 佔位並輸出 noindex / robots Disallow，避免誤收錄；GitHub Actions 會自動取得正式網址。

## GitHub Pages 發布

1. 將本資料夾內容（含 `.github`、`public/.nojekyll`、`pnpm-lock.yaml`）放在 GitHub repository 根目錄。不要上傳 node_modules、dist、.astro。
2. 使用 `main` 分支；在 Settings → Pages → Source 選擇 GitHub Actions。
3. 推送至 main 或手動執行 Deploy portfolio to GitHub Pages 工作流程。
4. 工作流程會先型別檢查、建置、驗證內部連結與隱私，再部署。首次執行需由具有權限的人設定 Pages。

一般專案網站會自動使用 `https://帳號.github.io/儲存庫名稱/`；`帳號.github.io` 儲存庫則自動使用根路徑。無須寫死帳號。

自訂網域：在 Repository Settings → Secrets and variables → Actions → Variables 設 `SITE_URL=https://你的網域`、`BASE_PATH=/`，於 `public/CNAME` 加入網域並完成 Pages DNS 設定。組織特殊 Pages 網域也可使用這兩個變數覆寫。

子目錄本機測試（PowerShell）：

```powershell
$env:SITE_URL='https://portfolio-test.github.io'
$env:BASE_PATH='/connie-portfolio'
pnpm build
pnpm test
pnpm preview
```

返回本機根路徑預覽前，移除以上兩個環境變數並重新建置。

## 編輯內容

- `src/data/site.ts`：品牌、信箱與網址路徑工具。
- `src/data/projects.ts`：案例資料、篩選分類、原文連結、節錄授權欄位。
- `src/styles/global.css`：配色、版面、手機版及減少動態效果設定。
- `src/components/Cover.astro`：原創 CSS 編輯封面，不含品牌實景照片。
- `public/og.png`：1200 × 630 分享圖；品牌改名時請同步更新。

新增案例後須更新 `scripts/verify.mjs` 中頁數與 sitemap 數量。首頁目前展示資料前四筆。

## 公開內容原則

四個案例依使用者提供的文章整理主題與結構，沒有把原稿全文或私人 Drive 連結放進網站。`originalUrl` 未核實時保持 null；`excerpt` 及 `excerptApproved` 預設空值 / false。只有確認可公開的節錄才同時設定文字和 `excerptApproved: true`。不把客戶原稿放進 repository，即使設為 draft 也不要提交。

好婚市集目前只有待補空狀態，未新增虛構文章。案例沒有 SEO 排名、流量、詢問數或營收主張。GA4 沒有證照或成效宣稱，也未裝追蹤碼。

Email 使用舊站公開信箱 19aoi95@gmail.com。聯絡表單只在瀏覽器產生郵件草稿，使用者仍需另行寄出；無後端收件、資料儲存、Cookie 或追蹤。字型使用 Google Fonts，載入失敗時有系統字型備援。

## 尚待補充

見 `CONTENT-CHECKLIST.md`。程式可部署，內容待補不會產生失效的「原文」按鈕。

## 參考

- 原站：https://19aoi95.wixsite.com/connielustudio
- Astro Pages 官方說明：https://docs.astro.build/en/guides/deploy/github/

尚未連線 GitHub 或公開部署；需登入、指定 repository 並授權發布後才能進行。
