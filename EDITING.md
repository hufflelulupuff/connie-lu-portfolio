# Connie 的網站編輯後台

## 第一次連線

1. 開啟 https://app.pagescms.org/ ，選 **Sign in with GitHub**，使用 `hufflelulupuff`。
2. 依畫面安裝／授權 Pages CMS GitHub App。選 **Only select repositories**，只勾選 **connie-lu-portfolio**，不要選其他私人專案。
3. 開啟 `hufflelulupuff / connie-lu-portfolio`，分支選 `main`。
4. 系統會讀取已準備好的 `.pages.yml`，不需自行建立設定。

這一步會讓 Pages CMS 寫入您選定的儲存庫，必須由帳號擁有人確認。公開網站本身沒有登入按鈕或管理頁。後台入口是外部服務，知道網址不會自動取得編輯權；修改仍取決於 GitHub 與 Pages CMS 的授權。請勿新增其他協作者。

## 平常修改

- **首頁／關於我／服務內容／合作洽詢／作品列表／頁尾合作邀請**：修改相對應文字欄位。標題拆行欄位對應原版面的位置。
- **網站名稱、信箱與搜尋描述**：改品牌名、收件信箱與 SEO 描述。固定英文裝飾字及 OG 圖內文字仍須另行調整。
- **服務項目與交付內容／首頁服務摘要／合作流程**：修改清單內容。首頁摘要與服務詳頁分開編輯，請視需要同步。
- **作品案例**：修改案例，或新增案例。`網址代稱` 使用英文小寫、數字與連字號，例如 `wedding-seo-guide`，發布後避免更動，以免舊連結失效。
- **排序**：數字越小越前面。
- **顯示於網站**：關閉可下架。新增案例填寫完整資料後才開啟。
- **自訂封面**：只上傳您有公開使用權的 PNG/JPG/WebP，並填圖片說明；未選圖片時使用原有插畫。
- **原文網址**：只填已核實、可公開的 HTTPS 網址，沒有就留空。
- **文章節錄**：確認公開授權後再填文字並勾選授權欄位。

按 **Save** 會提交至 GitHub，觸發網站重建。等 Actions 出現綠色成功後，重新整理公開網站即可看到變更。首次連線仍待您完成，尚未驗證 Pages CMS 實際登入後的寫入流程。

## 內容與安全

此儲存庫是公開的，儲存、上傳與歷史版本都可能被他人讀取；「不顯示於網站」不是私人草稿。未授權原稿、內部報表、密碼與 Token 都不要放入後台。不要分享 GitHub 登入或新增協作者。

網站會驗證必要欄位、分類、網址、圖片與節錄授權。若驗證失敗，新的版本不會上線，舊網站仍會保留。修正欄位後再次儲存即可。

若誤改內容，可在 GitHub 的檔案歷史恢復先前版本，或請我協助還原指定修改。

公開網站：https://hufflelulupuff.github.io/connie-lu-portfolio/
發布進度：https://github.com/hufflelulupuff/connie-lu-portfolio/actions

官方說明：https://pagescms.org/docs/quick-start/
