import { Metadata, Viewport } from 'next';
import { getBaseUrl, getFullUrl, getVersionedImageUrl, getPageDates } from '@/lib/utils';
import { generateBreadcrumbSchema, generateFAQSchema, generateArticleSchema, generateWebApplicationSchema } from '@/lib/schema';

// 定義通用標題和描述
const title = '預產期計算器 - 懷孕週數計算工具';
const description = '懷孕預產期的計算方法及孕期照護重點。說明內格萊氏法則的計算原理，並依三個孕期階段列出飲食、運動、睡眠等注意事項，協助準媽媽掌握孕期保健要點，平安度過懷孕過程。';
const keywords = ['預產期計算器', '懷孕週數', '內格萊氏法則', '孕期照護', '孕婦保健'];

// 確保預覽圖片會使用版本控制URL，幫助社交媒體平台刷新緩存
const imageUrl = getVersionedImageUrl(getFullUrl('/images/og-due-date-calculator.webp'));

// 從Git歷史獲取頁面日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/due-date-calculator/page.tsx');
const language = 'zh-TW';  // 語言

// 預先生成結構化數據
const breadcrumbSchema = generateBreadcrumbSchema('/due-date-calculator', '預產期計算器');
// webPageSchema 已移除
// 生成FAQ Schema
const faqSchema = generateFAQSchema([
  {
    '@type': 'Question',
    name: '孕期週數怎麼算',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '孕期以最後一次經期為第一天，到預產期約為40週。因此，通常知道自己懷孕時，大概都已到第5週或第六週。若有規劃備孕，建議用手機的「健康」軟體，紀錄自己每一次的月經週期。當第一次看婦產科時，醫生通常會詢問上一次月經的第一天為幾月幾號，依此來計算預產期。'
    }
  },
  {
    '@type': 'Question',
    name: '預產期計算方式',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '懷孕預產期的計算通常採用內格萊氏法則（Naegele\'s rule），這是由德國婦產科醫生 Franz Karl Naegele 發明的方法。計算方式是以最後一次月經的第一天為基準，加上一年，減三個月，加上七天，即可得出預估的分娩日期。這個方法假設婦女的月經週期為28天，排卵日在月經週期的第14天。例如最後一次月經第一天為6月1號，「減三個月加上七天加一年」則為隔年3月8日。一般來說，預產期大約40個星期，因此將最後一次月經的第一天加上280天，可得到跟Naegele\'s rule計算一樣的結果。'
    }
  },
  {
    '@type': 'Question',
    name: '預產期和實際分娩日期會有差異嗎？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '是的，預產期只是一個估計值，實際分娩日期可能會有所差異。研究顯示，只有約5%的孕婦會在預產期當天分娩，大多數分娩發生在預產期前後兩週內。影響分娩時間的因素包括：寶寶發育情況、母體健康狀況、是否為初產等。'
    }
  },
  {
    '@type': 'Question',
    name: '如果我不確定最後一次月經的日期怎麼辦？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '如果不確定最後一次月經的確切日期，建議：1) 嘗試回憶最接近的日期；2) 諮詢醫生安排超音波檢查，通過測量胎兒大小來估計懷孕週數；3) 參考孕早期的血液檢查結果，如hCG或PAPP-A水平來輔助判斷。'
    }
  },
  {
    '@type': 'Question',
    name: '什麼是三個孕期（孕早期、孕中期和孕晚期）？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '懷孕期間可以劃分成三個階段，分別為妊娠第一期（未滿13週）、妊娠第二期（13-29週）、妊娠第三期（29週以上）。不同孕期有不同的身體變化和照護重點。'
    }
  },
  {
    '@type': 'Question',
    name: '為什麼要知道確切的孕期週數？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '準確的孕期週數對產前照護非常重要：1) 幫助醫生評估胎兒發育是否正常；2) 決定各項產檢的最佳時機，如唐氏症篩檢、胎兒超音波等；3) 評估早產或過期妊娠的風險；4) 準確計劃生產日期和準備待產用品；5) 若需要剖腹產，可以選擇最適合的手術時間。'
    }
  },
  {
    '@type': 'Question',
    name: '懷孕後需要做哪些重要檢查？',
    acceptedAnswer: {
      '@type': 'Answer',
      text: '懷孕期間的重要檢查包括：1) 第一孕期（10-13週）：首次產檢、血液檢查、超音波檢查；2) 第二孕期（16-20週）：高層次超音波，檢查胎兒器官發育；3) 第二孕期（24-28週）：妊娠糖尿病篩檢；4) 第三孕期（28-36週）：定期產檢監測胎兒發育和產婦健康；5) 臨近預產期：胎位確認、胎兒監測、頸管成熟度評估等。具體檢查項目和時間應遵循醫生建議，因為每位孕婦情況不同。'
    }
  }
]);
const articleSchema = generateArticleSchema(
  '/due-date-calculator',
  title,
  description,
  imageUrl,
  datePublished,   // 發布日期
  dateModified,    // 修改日期
  language,        // 語言
  keywords,        // 關鍵字
  2000             // 字數統計 (估計值)
);

// 使用 generateWebApplicationSchema 函數生成 WebApplication Schema
const webApplicationSchema = generateWebApplicationSchema(
  '/due-date-calculator',     // 路徑
  '預產期計算器',             // 應用名稱
  description,                // 使用上面定義的描述
  'HealthApplication',        // 應用類別 - 使用健康類別
  '4.9',                      // 評分值
  '185',                      // 評分數量
  datePublished,              // 使用頁面發布日期作為有效日期起點
  language                    // 頁面語言
);

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title,
  description,
  
  // OpenGraph標籤設定 - 對Telegram尤其重要
  openGraph: {
    title: `${title} ｜ fyimg`, // 與網站標題模板保持一致
    description,
    // type, locale, siteName由根布局繼承
    url: getFullUrl('/due-date-calculator'),
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: '預產期計算器工具圖示',
        type: 'image/webp', // 指定圖片MIME類型增強兼容性
      },
    ],
  },
  
  // Twitter卡片設定 - 為X.com平台優化
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    creator: '@fyimg',
    site: '@fyimg',  // 添加站點標籤增強Twitter卡片顯示
    images: [imageUrl],
  },
  
  // 基本配置
  alternates: {
    canonical: getFullUrl('/due-date-calculator'),
  },
  
  // 確保其他必要的元數據
  keywords,
  authors: [{ name: 'fyimg團隊' }],
  creator: 'fyimg團隊',
  publisher: 'fyimg',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

// appSchema 已經是使用 generateWebApplicationSchema 生成的完整 Schema

export default function DueDateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* 使用標準腳本標籤添加 JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      {children}
    </>
  );
}