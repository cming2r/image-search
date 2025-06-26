import { getBaseUrl, getFullUrl, getPageDates } from '@/lib/utils';
import { 
  generateBreadcrumbSchema, 
  generateFAQSchema,
  generateArticleSchema, 
  generateWebApplicationSchema,
  formatJSON
} from '@/lib/schema';

import { metaTranslations } from './components/meta-translations';

const keywordsList = {
  zh: ['預產期計算', '懷孕週數', '生產日期', '孕期追蹤'],
  en: ['due date calculator', 'pregnancy weeks', 'delivery date', 'pregnancy tracker'],
  jp: ['出産予定日計算', '妊娠週数', '分娩日', '妊娠追跡'],
  es: ['calculadora de fecha de parto', 'semanas de embarazo', 'fecha de parto', 'seguimiento del embarazo']
};

// 多語言FAQ數據
const faqsData = {
  zh: [
    {
      '@type': 'Question',
      name: '預產期是如何計算的？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '預產期計算通常採用內格萊氏法則（Naegele\'s rule），以最後一次月經的第一天為基準，加上一年，減三個月，再加上七天。例如最後一次月經第一天為6月1號，則預產期為隔年3月8日。實際上，這等同於從最後一次月經的第一天加上280天。本方法假設月經週期為28天，而排卵和受精在第14天發生。'
      }
    },
    {
      '@type': 'Question',
      name: '孕期週數是如何計算的？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '孕期以最後一次月經的第一天開始計算，到預產期約為40週。因此，通常知道自己懷孕時，大概都已到第5週或第六週。若有規劃備孕，建議用手機的「健康」軟體，紀錄自己每一次的月經週期。當第一次看婦產科時，醫生通常會詢問上一次月經的第一天為幾月幾號，依此來計算預產期。'
      }
    },
    {
      '@type': 'Question',
      name: '什麼情況下被視為高風險妊娠？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '高風險妊娠指的是有較高併發症風險的懷孕狀況。以下因素可能會增加風險：年齡過小或超過35歲、體重過重或過輕、既往妊娠出現問題、懷孕前就存在的健康問題（如高血壓、糖尿病、自身免疫疾病）以及雙胞胎或多胞胎妊娠。懷孕期間出現的問題如妊娠糖尿病或子癇前症也會導致高風險妊娠。若有任何高風險妊娠的疑慮，建議向醫生諮詢。'
      }
    },
    {
      '@type': 'Question',
      name: '產前檢查的建議頻率是多少？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '根據美國婦女健康辦公室的建議，正常產檢的頻率為：第4週到第28週期間，每月一次；第28週到第36週期間，每兩週一次；第36週到分娩期間，每週一次。高風險妊娠的孕婦可能需要更頻繁地產前護理和檢查。'
      }
    }
  ],
  en: [
    {
      '@type': 'Question',
      name: 'How is the due date calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Due date calculation typically uses Naegele\'s rule, where you take the first day of your last menstrual period, add one year, subtract three months, and add seven days. For example, if the first day of your last period was June 1st, your due date would be March 8th of the following year. This is equivalent to adding 280 days to the first day of your last period. This method assumes a 28-day menstrual cycle with ovulation occurring on day 14.'
      }
    },
    {
      '@type': 'Question',
      name: 'How are pregnancy weeks calculated?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pregnancy is calculated starting from the first day of your last menstrual period, with the due date approximately 40 weeks later. By the time most women know they\'re pregnant, they\'re typically at week 5 or 6. If you\'re planning for pregnancy, it\'s recommended to use your phone\'s Health app to record your menstrual cycles. During your first obstetrics visit, the doctor will usually ask for the first day of your last period to calculate your due date.'
      }
    },
    {
      '@type': 'Question',
      name: 'What conditions are considered high-risk pregnancies?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A high-risk pregnancy indicates a higher probability of complications. Factors that may increase risk include: being very young or over 35, being overweight or underweight, having had problems in previous pregnancies, pre-existing health conditions (like high blood pressure, diabetes, autoimmune diseases), and carrying twins or multiples. Conditions like gestational diabetes or preeclampsia that develop during pregnancy can also lead to high-risk status. If you have concerns about high-risk pregnancy, consult your doctor.'
      }
    },
    {
      '@type': 'Question',
      name: 'How often should prenatal check-ups be scheduled?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'According to the Office on Women\'s Health, the recommended frequency for normal prenatal check-ups is: once a month between weeks 4 and 28, twice a month between weeks 28 and 36, and once a week from week 36 until delivery. Women with high-risk pregnancies may need more frequent prenatal care and monitoring.'
      }
    }
  ],
  jp: [
    {
      '@type': 'Question',
      name: '出産予定日はどのように計算されますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '出産予定日の計算には通常、ネーゲレの法則が使用されます。最終月経期間の初日に1年を加え、3ヶ月を引き、7日を加えます。例えば、最終月経の初日が6月1日の場合、出産予定日は翌年の3月8日になります。これは最終月経の初日に280日を加えるのと同じです。この方法は28日の月経周期を前提とし、排卵が14日目に発生すると仮定しています。'
      }
    },
    {
      '@type': 'Question',
      name: '妊娠週数はどのように計算されますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '妊娠は最終月経の初日から計算され、出産予定日は約40週後です。ほとんどの女性が妊娠に気づく頃には、通常5週目か6週目になっています。妊娠を計画している場合は、スマートフォンの「ヘルス」アプリで月経周期を記録することをお勧めします。初めての産婦人科訪問時、医師は通常、出産予定日を計算するために最終月経の初日を尋ねます。'
      }
    },
    {
      '@type': 'Question',
      name: 'どのような状態がハイリスク妊娠と見なされますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ハイリスク妊娠は合併症の可能性が高いことを示します。リスクを高める要因には、非常に若いまたは35歳以上、過体重または低体重、過去の妊娠で問題があった、既存の健康状態（高血圧、糖尿病、自己免疫疾患など）、双子または多胎児を妊娠していることなどがあります。妊娠糖尿病や妊娠高血圧症候群など、妊娠中に発生する状態もハイリスクステータスにつながる可能性があります。ハイリスク妊娠について懸念がある場合は、医師に相談してください。'
      }
    },
    {
      '@type': 'Question',
      name: '産前検診はどのくらいの頻度で予定すべきですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '米国女性健康局によると、通常の産前検診の推奨頻度は次のとおりです：4週から28週の間は月に1回、28週から36週の間は月に2回、36週から出産までは週に1回。ハイリスク妊娠の女性はより頻繁な産前ケアと監視が必要な場合があります。'
      }
    }
  ],
  es: [
    {
      '@type': 'Question',
      name: '¿Cómo se calcula la fecha de parto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El cálculo de la fecha de parto típicamente utiliza la regla de Naegele, donde se toma el primer día de su último período menstrual, se añade un año, se restan tres meses y se añaden siete días. Por ejemplo, si el primer día de su último período fue el 1 de junio, su fecha de parto sería el 8 de marzo del año siguiente. Esto equivale a añadir 280 días al primer día de su último período. Este método asume un ciclo menstrual de 28 días con ovulación ocurriendo en el día 14.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Cómo se calculan las semanas de embarazo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El embarazo se calcula comenzando desde el primer día de su último período menstrual, con la fecha de parto aproximadamente 40 semanas después. Para cuando la mayoría de mujeres saben que están embarazadas, típicamente están en la semana 5 o 6. Si está planificando un embarazo, se recomienda usar la aplicación de Salud de su teléfono para registrar sus ciclos menstruales. Durante su primera visita obstétrica, el médico usualmente preguntará por el primer día de su último período para calcular su fecha de parto.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Qué condiciones se consideran embarazos de alto riesgo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un embarazo de alto riesgo indica una mayor probabilidad de complicaciones. Los factores que pueden aumentar el riesgo incluyen: ser muy joven o mayor de 35 años, tener sobrepeso o bajo peso, haber tenido problemas en embarazos anteriores, condiciones de salud preexistentes (como presión arterial alta, diabetes, enfermedades autoinmunes), y estar embarazada de gemelos o múltiples. Condiciones como diabetes gestacional o preeclampsia que se desarrollan durante el embarazo también pueden llevar a un estatus de alto riesgo. Si tiene preocupaciones sobre embarazo de alto riesgo, consulte a su médico.'
      }
    },
    {
      '@type': 'Question',
      name: '¿Con qué frecuencia deben programarse los controles prenatales?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Según la Oficina de Salud de la Mujer, la frecuencia recomendada para controles prenatales normales es: una vez al mes entre las semanas 4 y 28, dos veces al mes entre las semanas 28 y 36, y una vez por semana desde la semana 36 hasta el parto. Las mujeres con embarazos de alto riesgo pueden necesitar atención prenatal y monitoreo más frecuente.'
      }
    }
  ]
};

// 從Git歷史取得頁面發布與更新日期
const { created: datePublished, modified: dateModified } = getPageDates('src/app/[locale]/due-date-calculator/page.tsx');

// 語言對應表，將locale映射為HTML語言代碼
const langMap = {
  'zh': 'zh-TW',
  'en': 'en',
  'jp': 'ja',
  'es': 'es'
};

// 社交媒體分享圖片
const imageUrl = getFullUrl('/images/og-due-date-calculator.webp');

// 生成多語言元數據配置
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'zh' } = await params;
  const title = metaTranslations.meta.title[locale as keyof typeof metaTranslations.meta.title] || metaTranslations.meta.title.zh;
  const description = metaTranslations.meta.description[locale as keyof typeof metaTranslations.meta.description] || metaTranslations.meta.description.zh;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.zh;
  
  // OpenGraph 標題根據語言不同
  const ogTitle = locale === 'zh' ? `預產期計算器` : 
                locale === 'en' ? `Due Date Calculator` : 
                locale === 'jp' ? `出産予定日計算機` :
                locale === 'es' ? `Calculadora de Fecha de Parto` : `Due Date Calculator`;

  return {
    metadataBase: new URL(getBaseUrl()),
    title,
    description,
    
    // OpenGraph 配置（優化社交媒體分享體驗）
    openGraph: {
      title: ogTitle,
      description,
      url: getFullUrl(locale === 'zh' ? '/due-date-calculator' : `/${locale}/due-date-calculator`),
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: locale === 'zh' ? '預產期計算器工具界面' : 
               locale === 'en' ? 'Due Date Calculator Tool Interface' :
               locale === 'jp' ? '出産予定日計算機ツールインターフェース' :
               locale === 'es' ? 'Interfaz de Herramienta Calculadora de Fecha de Parto' : 'Due Date Calculator Tool Interface',
          type: 'image/webp',
        },
      ],
    },
    
    // Twitter/X 平台卡片設定
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@fyimg',
      site: '@fyimg',
      images: [imageUrl],
    },
    
    // 規範連結（確保SEO正確性）
    alternates: {
      canonical: getFullUrl(locale === 'zh' ? '/due-date-calculator' : `/${locale}/due-date-calculator`),
      languages: {
        'zh-TW': getFullUrl('/due-date-calculator'),
        'en': getFullUrl('/en/due-date-calculator'),
        'ja': getFullUrl('/jp/due-date-calculator'),
        'es': getFullUrl('/es/due-date-calculator'),
      },
    },
    
    // 關鍵字、作者及發布者信息
    keywords,
    authors: [{ name: 'fyimg開發團隊' }],
    creator: 'fyimg開發團隊',
    publisher: 'fyimg',
  };
}

/**
 * 預產期計算器頁面佈局
 * 
 * 包含多種結構化數據以優化搜索引擎理解和索引:
 * - BreadcrumbSchema: 提供頁面導航層次結構
 * - FAQSchema: 增強搜尋結果顯示常見問題
 * - ArticleSchema: 標記內容為資訊性文章
 * - WebApplicationSchema: 標識工具功能性質
 */
export default async function DueDateCalculatorLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{ locale: string }>
}) {
  // 取得當前語言
  const { locale = 'zh' } = await params;
  const language = langMap[locale as keyof typeof langMap] || 'zh-TW';
  
  // 根據當前語言取得相應標題與描述
  const title = metaTranslations.meta.title[locale as keyof typeof metaTranslations.meta.title] || metaTranslations.meta.title.zh;
  const description = metaTranslations.meta.description[locale as keyof typeof metaTranslations.meta.description] || metaTranslations.meta.description.zh;
  const keywords = keywordsList[locale as keyof typeof keywordsList] || keywordsList.zh;
  
  // 根據語言選擇正確的FAQ資料
  const faqItems = faqsData[locale as keyof typeof faqsData] || faqsData.zh;
  
  // 生成多語言結構化數據
  const breadcrumbSchema = generateBreadcrumbSchema('/due-date-calculator', title, locale);
  const faqSchema = generateFAQSchema(faqItems);
  const articleSchema = generateArticleSchema(
    '/due-date-calculator',
    title,
    description,
    imageUrl,
    datePublished,
    dateModified,
    language,
    keywords,      // 多語言關鍵字
    3200,          // 字數統計 (估計值)
    locale
  );
  const webApplicationSchema = generateWebApplicationSchema(
    '/due-date-calculator',
    locale === 'zh' ? '懷孕預產期計算工具' :
    locale === 'en' ? 'Pregnancy Due Date Calculator Tool' :
    locale === 'jp' ? '妊娠出産予定日計算ツール' :
    locale === 'es' ? 'Herramienta Calculadora de Fecha de Parto del Embarazo' : 'Pregnancy Due Date Calculator Tool',
    description,
    'MedicalApplication',
    '4.8',           // 評分值
    '160',           // 評分數量
    datePublished,   // 使用頁面發布日期作為有效日期起點
    language,        // 頁面語言
    locale           // 當前語言代碼
  );
  
  return (
    <>
      {/* 結構化數據標記 - 為每個數據類型使用獨立標記 */}
      <script
        type="application/ld+json"
      >{`
${formatJSON(breadcrumbSchema)}
`}</script>
      {/* 分隔符以確保正確的HTML格式化 */}

      <script
        type="application/ld+json"
      >{`
${formatJSON(faqSchema)}
`}</script>
      {/* 分隔符以確保正確的HTML格式化 */}

      <script
        type="application/ld+json"
      >{`
${formatJSON(articleSchema)}
`}</script>
      {/* 分隔符以確保正確的HTML格式化 */}

      <script
        type="application/ld+json"
      >{`
${formatJSON(webApplicationSchema)}
`}</script>
      {children}
    </>
  );
}