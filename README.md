# Hahow HeroCard

題目：https://github.com/hahow/hahow-recruit/blob/master/frontend.md

## 執行步驟

1. 安裝依賴：

```bash
pnpm install
```

2. 建立環境變數檔案：

```bash
cp .dev.example .dev.development
```

3. 啟動開發伺服器：

```bash
pnpm dev
```

## 該如何執行完成的專案

### 專案開發流程

1. **分析需求**

   - 閱讀 Hahow 前端招募題目需求
   - 理解需要實作英雄列表、英雄資料編輯等功能
   - 分析 API 規格和資料結構

2. **決定 tech stack**

3. **實作**

## 專案的資料夾架構、Application 的邏輯架構，說明你的設計理念

### 檔案架構圖

```
hahow/
├── src/
│   ├── app/                    # 應用程式入口
│   │   ├── App.tsx            # 根組件
│   │   └── routes.tsx         # 路由配置
│   ├── components/             # 共用組件
│   │   └── button/            # 自定義按鈕組件
│   ├── constants/              # 常數定義
│   │   └── routes.ts          # 路由路徑常數
│   ├── features/               # 功能模組 (Feature-based Architecture)
│   │   └── hero/              # 英雄相關功能
│   │       ├── api/            # API 層
│   │       │   ├── keys.ts     # Query keys
│   │       │   ├── service.ts  # API 服務
│   │       │   └── types.ts    # API 類型定義
│   │       ├── components/     # 功能組件
│   │       │   ├── HeroCard/   # 英雄卡片
│   │       │   ├── HeroList/   # 英雄列表
│   │       │   └── HeroProfile/# 英雄資料編輯
│   │       └── types/          # 功能類型定義
│   ├── layouts/                # 頁面佈局
│   │   └── hero.tsx            # 英雄頁面佈局
│   ├── pages/                  # 頁面組件
│   │   ├── hero-list/          # 英雄列表頁
│   │   ├── hero-profile/       # 英雄資料頁
│   │   └── home/               # 首頁
│   ├── stores/                 # 狀態管理
│   │   ├── dialog.tsx          # 對話框狀態
│   │   ├── query-client.tsx    # React Query 客戶端
│   │   └── snack-bar.tsx       # 通知狀態
│   └── utils/                  # 工具函數
│       ├── fetcher.ts          # HTTP 請求工具
│       ├── tanstack-query.ts   # React Query 工具
│       └── theme.ts            # MUI 主題配置
```

### 設計理念

採用 **Feature-based Architecture** 的設計方式：

1. **Feature-based Architecture**: 以功能為單位組織程式碼，每個功能模組包含自己的 API、組件、類型定義等，提高程式碼的可維護性和可擴展性。

2. **關注點分離**: API 層、業務邏輯層、UI 層明確分離，便於測試和維護。

### Application 邏輯架構

#### 1. 應用程式入口層 (Entry Layer)

```
main.tsx → App.tsx → AppRoutes
```

- **main.tsx**: 應用程式啟動點，配置所有 Provider
- **App.tsx**: 根組件，負責渲染路由
- **AppRoutes**: 路由配置，使用 React Router 管理頁面導航

#### 2. 狀態管理層 (State Management Layer)

- **QueryProvider**: 管理 React Query 客戶端，處理伺服器狀態
- **DialogProvider**: 管理全域對話框狀態
- **ThemeProvider**: 提供 MUI 主題配置
- **SnackBarProvider**: 管理通知系統狀態

#### 3. 路由架構 (Routing Architecture)

```
/ (首頁)
└── /heroes (英雄頁面)
    ├── / (英雄列表)
    └── /:heroId (英雄資料編輯)
```

- 使用巢狀路由結構
- 支援動態路由參數 (`:heroId`)
- 實作 Code Splitting (lazy loading)
- HeroList 使用 layout 的方式讓切頁時不會重先渲染

#### 4. 資料流架構 (Data Flow Architecture)

```
UI 組件 → Custom Hooks → API Service → HTTP Client → Backend
```

- **UI 組件**: 負責渲染和使用者互動
- **Custom Hooks**: 封裝業務邏輯和狀態管理
- **API Service**: 定義 API 端點和資料處理邏輯
- **HTTP Client**: 統一的 HTTP 請求處理

#### 5. 錯誤處理架構 (Error Handling Architecture)

```
API Error → useHandleError → Dialog/Toast → User
```

- 統一的錯誤處理機制
- 根據錯誤類型顯示不同的 UI

#### 6. 快取策略 (Caching Strategy)

```
`/heroes`: staleTime: 10min, cacheTime: 20min（沒有變動，因此設定的時間長）
`/heroes/:id/profile`: staleTime: 0, cacheTime: 0 (即時更新)
```

- 針對不同資料類型設定不同的快取策略

#### 7. HeroProfile 編輯原理

1. power points 加起來要到相同的總數、跟 api 回傳的不一樣時，才可以送出
2. 若 power points 已經達到總數，則無法增加
3. 若單一個 power points 為 0，則無法減

## 對於所有使用到的第三方 library 的理解，以及為何想在這個專案中使用它

### 核心框架

- **typescript**: 提供靜態類型檢查，減少執行時錯誤
- **react**: JavaScript 函式庫，提供組件化開發方式
- **react-dom**: React 的 DOM 渲染器

### 開發工具

- **eslint**: 確保程式碼風格一致性和最佳實踐
- **vite**: HMR
- **pnpm**: 節省磁碟空間並提高安裝速度

### UI 框架

- **@mui/material**: Material Design 的 React 實作，提供豐富的預製組件和主題系統
- **@mui/icons-material**: Material Design 圖示集合
- **@emotion/react & @emotion/styled**: CSS-in-JS 解決方案，提供靈活的樣式管理

### 表單處理

- **react-hook-form**: 表單處理函式庫
- **@hookform/resolvers**: 表單驗證解析器
- **zod**: TypeScript-first 的 schema 驗證函式庫，提供執行時類型檢查

### 狀態管理與資料獲取

- **@tanstack/react-query**: 伺服器狀態管理函式庫，提供快取、同步、錯誤處理等功能
- **axios**: HTTP 客戶端，提供請求攔截器和響應處理

### 路由

- **react-router-dom**: React 的官方路由解決方案，支援動態路由和巢狀路由

### 通知系統

- **notistack**: 堆疊式通知系統，提供多種通知類型和動畫效果

## 你在程式碼中寫註解的原則，遇到什麼狀況會寫註解

### 註解原則

1. **商業邏輯註解**: 解釋複雜的業務規則和計算邏輯(ex:`HeroProfile/index.tsx`)
2. **配置說明**: 說明重要的配置參數和設定(ex: `tsconfig.*.json`)

### 程式碼中的註解實例

在 `src/features/hero/components/HeroProfile/index.tsx` 中：

```typescript
{
  /* 剩餘點數為 0 、與原先資料不同時，才可以儲存 */
}
```

這個註解說明了儲存按鈕的啟用條件，屬於商業邏輯註解。

## 在這份專案中你遇到的困難、問題，以及解決的方法

### 1. MUI Theme 配置困難

**問題**: 需要自定義 MUI 主題以符合設計需求

**解決**: 使用官方免費的顏色系統和陰影效果

## 其他優化

### 1. 使用 TanStack Query 對 API 做 stale

- 設定適當的 `staleTime` 和 `cacheTime` 來優化資料快取
- `/heroes`：10 分鐘 stale time，20 分鐘 cache time
- `heroes/:heroId/profile`：即時更新，無快取

### 2. 使用 Axios

- 統一的 HTTP 請求處理
- 請求攔截器和響應處理

### 3. Button 有 form dirty 狀態

- 使用 `isDirty` 顯示表單修改狀態的視覺反饋
- 脈衝動畫效果提示使用者表單已修改

### 4. 調整 power point 的地方可以用 arrow up 和 arrow down 控制

- 支援鍵盤操作：Arrow Up 增加數值，Arrow Down 減少數值

### 5. 有處理 error handle：在網址帶入不相符的 heroId 會顯示 error dialog

- 統一的錯誤處理機制
- 404 錯誤顯示錯誤對話框

### 6. Patch 成功後會出有反饋的 toast

- 使用 `notistack` 顯示成功/失敗通知
- 成功時顯示 "更新 [英雄名稱] 成功"
- 失敗時顯示 "更新 [英雄名稱] 失敗"

### 7. Skeleton 優化 loading state

- 使用 MUI Skeleton 組件顯示載入狀態
