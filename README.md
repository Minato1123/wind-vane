# 風向，疑？| Wind Vane

## 介紹

使用 Figma 規劃網頁設計，實作 SSR 的論壇範例（具備 RWD）。<br>
由於無實際架設 Server 及資料庫，僅開發環境能操作各項功能。

「風向，疑？」是一個線上論壇，名稱取自諧音「風向儀」，旨在緩解在網路上發表意見或故事時，容易遭遇到與他人意見不合、價值觀不同等情況，產生負面反響的問題。<br><br>
在「風向，疑？」中，所有發文都要求完全匿名，並且無法直接留言或對話。相反地，使用者只能透過正面或負面的表態去表示贊同或反對發文者的看法，以讓發文者能概略地知道自己的想法是否與大多數人相同。<br>
除了在輸入主要問題的區域表達清楚自己的看法外，使用者可以在文章內容中鋪陳或描述問題的前提故事，進一步讓讀者了解文章所討論的背景和情境。<br><br>
每篇發表出去的文章右上角會顯示「順風」、「逆風」或是「無風」，用以顯示發文者所分享的想法是否受到大多數人的認同。<br>
其中「順風」代表大多數人與發文者的看法相似，「逆風」代表大多數人與發文者的看法相反，而「無風」則代表目前看法與發文者相似和相反的人數持平。<br><br>
「風向，疑？」的目標是營造一個更加和平、公正、理性的網路討論空間，讓使用者能夠更加自由地發表自己的想法，同時避免不必要的爭論和攻擊。

## 動機

增加使用 Nuxt3 框架及 SSR 技術的經驗。

## 功能與介面

<details>
  <summary>
    Desktop
  </summary>
  <br>
  
  * 首頁（未登入）
  
  ![](https://i.imgur.com/MXVtzt7.png)
  
  * 登入畫面
    * 含表單驗證
  
  ![](https://i.imgur.com/HhKHBDd.png)
  * 註冊畫面
    * 含表單驗證
  
  ![](https://i.imgur.com/YVo5C8m.png)
  * 主頁（登入後）
    * 我的貼文：頁面內會顯示使用者自己發的貼文
    * 已表態的貼文：頁面會顯示使用者按過表態的貼文
    * 已儲存的貼文：頁面會顯示使用者儲存過的貼文
  
  ![](https://i.imgur.com/XiiQDlC.png)
  
  
  * 發文範例

  ![](https://i.imgur.com/sUeCvYq.png)
  
  * 文章顯示（無表態）

  ![](https://i.imgur.com/nWNEOBA.png)

  * 文章顯示（正面表態）

  ![](https://i.imgur.com/TsjnU7c.png) 

  * 文章顯示（負面表態）

  ![](https://i.imgur.com/pzDbRsD.png)
  
  * 對文章的其他操作
    * 本人發文才能刪除貼文
    * 不提供修改文章，因為可能造成到目前為止的表態結果失去參考性
    * 點擊貼文左上角的編號可以跳轉至此文章頁面
    * 點擊右下角的分享按鈕可將網址分享到外部程式
  
  ![](https://i.imgur.com/e1DxWAb.png)
  
  
  * 刪除貼文的確認視窗

  ![](https://i.imgur.com/RsavmdV.png)
  
  
  * 個人資料修改（信箱）

  ![](https://i.imgur.com/Mjo4yjx.png)
  
  
  * 根據 Tag 搜尋文章
    * 支援單個或多個以空白分隔的 Tag 搜尋
    * 直接點擊貼文上的 Tag 也能達成搜尋
    
  ![](https://i.imgur.com/ROhxc6l.png)
  
</details>


<details>
  <summary>
    Mobile
  </summary>
  <br>
  
  左：主頁（未登入）<br>
  右：菜單（未登入）
  
  ![](https://i.imgur.com/Bhdo3jE.png)
  
  左：登入畫面<br>
  中：主頁（登入後）<br>
  右：菜單（登入後）
  
  ![](https://i.imgur.com/PKKaV9y.png)
  
  左：修改個人資料（信箱）<br>
  右：根據 Tag 搜尋文章
  
  ![](https://i.imgur.com/vJbRwk4.png)
  
</details>


## 在本地端架設環境的使用方法
  1. 下載需要的套件
  
  ```bash
  pnpm install
  ```
        
  2. 啟動 dev server（系統開發環境）
  
  ```bash
  pnpm dev
  ```
        
## 技術
  1. Nuxt 3
  2. Nuxt Icon
  3. Pinia
  4. Pinia Plugin Persistedstate
  5. TypeScript
  6. Tailwind CSS
  
## 函式庫
  1. [VueUse](https://vueuse.org/)
  2. [FormKit](https://formkit.com/)
  3. [Floating Vue](https://floating-vue.starpad.dev/)