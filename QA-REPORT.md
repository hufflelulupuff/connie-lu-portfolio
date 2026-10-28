# 驗證紀錄

日期：2026-10-28。環境：Windows、Node.js 24.19.0、Astro 6.4.8。

## 已通過

- Astro 型別與樣板檢查，無錯誤。
- 靜態建置 10 頁：首頁、About、Services、Contact、作品列表、四個案例、404。
- 根路徑與 `/connie-portfolio/` 子目錄建置：各 112 個站內連結／資源存在檢查。
- 模擬 `GITHUB_REPOSITORY=portfolio-test/connie-portfolio`，自動產生正確 Pages 網址與子路徑。
- 每頁單一 H1、獨立 title、description、canonical、OG、繁中語系。
- sitemap 含 9 個可索引頁面、不含 404；robots 與 1200 × 630 OG 圖存在。
- HTML 不含私人 Drive / Docs 連結，原稿未放進程式碼或網站。
- 瀏覽器桌面視覺檢查：首頁完整頁面、作品頁、案例頁、聯絡頁。
- 尾牙春酒篩選：4 件變成 2 件；好婚市集：0 件，顯示待補資料。
- 聯絡表單：輸入測試品牌與需求後，正確產生繁中郵件主旨、內文與 mailto 連結，未寄出郵件。
- 390px iframe 窄螢幕視覺檢查：首頁單欄、字級、手機選單入口正確呈現。

## 驗證限制

- 瀏覽器的 viewport 覆寫未實際套用；iframe 內的點擊操作遭工具拒絕。因此手機選單的實際點擊尚未完成瀏覽器驗證，需在真機補驗；桌面篩選與表單互動已測。
- 尚未進行真機 Safari / Android、螢幕閱讀器或 Lighthouse 測試。
- GitHub Actions 建置與部署已於 2026-10-28 通過。執行紀錄：https://github.com/hufflelulupuff/connie-lu-portfolio/actions/runs/40634360359 。正式首頁、作品列表、案例頁、Contact、robots、sitemap 與 OG 圖均回應 HTTP 200；正式 canonical 正確且沒有 noindex。
- 原文連結、節錄授權及好婚市集實際作品仍待使用者補充。沒有將待補內容假裝為已完成作品。

本機 `dist/` 為 noindex 預覽建置。正式 Actions 會依儲存庫資訊重新產生 canonical、sitemap 與索引設定，請勿把本機佔位網址的 dist 直接當作正式發布版本。


## Pages CMS 改版驗證（2026-10-28）

- 11 個編輯區與四個案例已轉為 JSON 表單資料。
- 測試首頁修改、HTML 與 JSON-LD 文字跳脫、新增婚禮案例、下架案例、圖片子目錄路徑及動態數量，全部通過。測試檔案已移除。
- 驗證器拒絕非 HTTPS / 私人 Drive 原文連結、無效分類、缺少圖片與未授權節錄。
- 公開頁面未加入 CMS 入口或管理路由。
- 尚待使用者完成 Pages CMS GitHub App 的首次授權；尚未以該第三方後台實際儲存並回讀。
