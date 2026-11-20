# Angular Todo Workspace

以 Angular 21 開發的待辦事項管理應用程式，使用 Standalone Components、Signals 與 TypeScript 實作任務管理及響應式介面。

這個專案是在完成 Angular 基礎教學後，為了練習元件架構、狀態管理及前端設計而自行開發的作品。

## 專案畫面

> 待補上桌面版與手機版操作截圖。

## 專案功能

- **新增任務**：支援 Enter 鍵與按鈕新增，並避免空白任務。
- **編輯任務**：可以修改任務內容，並支援儲存及取消。
- **刪除任務**：刪除指定的待辦事項。
- **任務完成狀態**：使用 Checkbox 切換完成或未完成。
- **全選功能**：一次切換所有任務的完成狀態。
- **任務篩選**：提供 All、Active、Completed 三種模式。
- **任務統計**：即時計算已完成及未完成的數量。
- **清除已完成**：一次刪除所有已完成任務。
- **響應式介面**：支援桌面版及手機版顯示。

## 使用技術

| 技術 | 用途 |
|---|---|
| Angular 21 | 前端應用程式框架 |
| TypeScript | 資料型別、元件邏輯與事件處理 |
| HTML | 頁面結構及 Angular Template |
| CSS | Flexbox、元件樣式及 RWD |
| Angular Signals | 響應式狀態管理 |
| Git / GitHub | 版本控制與專案管理 |

### Angular 核心技術

**Component**

將 Todo App 拆分為多個元件，讓不同功能各自管理，提升程式碼的可讀性及維護性。

**Input / Output**

透過 Input 傳遞父元件資料，使用 Output 將使用者操作事件通知父元件，建立清楚的資料流。

**Signals**

使用 `signal()` 儲存任務清單及篩選狀態，搭配 `.set()`、`.update()` 更新資料。

**Computed**

使用 `computed()` 計算篩選後的 Todo 清單，以及完成與未完成任務數量。

## 元件架構

```text
AppComponent
├── TodoHeader
└── TodoWorkspace
    ├── TodoInput
    ├── TodoFooter
    └── TodoList
        └── TodoItem
```

> TodoWorkspace 為頁面中的區塊容器，不是獨立的 Angular Component。

### 元件職責

| 元件 | 主要職責 |
|---|---|
| AppComponent | 管理主要狀態、資料更新及事件處理 |
| TodoHeader | 顯示標題與說明文字 |
| TodoInput | 接收使用者輸入，發送新增事件 |
| TodoFooter | 顯示統計、篩選功能及清除已完成操作 |
| TodoList | 顯示任務清單及全選功能 |
| TodoItem | 顯示單筆任務，處理編輯、完成及刪除事件 |

## 資料流設計

```text
使用者操作
    ↓
TodoInput / TodoItem / TodoFooter
    ↓ Output 發送事件
TodoList（需要時轉發）
    ↓
AppComponent
    ↓
Signal 更新資料
    ↓
Computed 重新計算
    ↓
Angular 更新畫面
```

本專案由 AppComponent 管理主要資料狀態，子元件負責呈現資料及發送事件，減少元件之間直接修改彼此狀態的情況。

## UI / UX 設計

採用「編輯式極簡 × 個性設計」風格，主要以暖白背景、深色文字與深藍色作為視覺重點。

### 設計重點

- 暖白色 `#F5F4F0` 作為主要背景。
- 深色 `#191919` 作為主要文字顏色。
- 深藍色 `rgb(23, 40, 150)` 作為操作強調色。
- 使用 Flexbox 控制版面、間距及對齊。
- 以分隔線取代大量卡片與陰影。
- 針對長文字、操作按鈕及 Checkbox 進行 RWD 調整。

## 安裝與執行

### 1. 取得專案

```bash
git clone https://github.com/zoe12378/angular-todo-workspace.git
```

### 2. 進入專案資料夾

```bash
cd angular-todo-workspace
```

### 3. 安裝依賴套件

```bash
npm install
```

### 4. 啟動開發伺服器

```bash
npm start
```

啟動後，依終端機顯示的網址開啟瀏覽器，通常為：

`http://localhost:4200/`

## 開發過程中的問題與解決方式

### 1. Signal 更新後畫面未正確變化

**問題：** 修改任務資料後，畫面沒有如預期更新。

**解決方式：** 使用 `.update()` 搭配 `map()`、展開運算子產生新的陣列與物件，避免直接修改原始資料。

### 2. 父子元件事件傳遞

**問題：** TodoItem 需要通知 AppComponent 更新指定任務。

**解決方式：** 利用 Output 發送事件，並依照元件層級進行事件轉發，讓 AppComponent 負責主要資料更新。

### 3. 長任務文字造成排版溢出

**問題：** 較長的任務名稱可能擠壓操作按鈕或超出容器。

**解決方式：** 使用 `min-width: 0`、`flex-shrink: 0` 與 `overflow-wrap