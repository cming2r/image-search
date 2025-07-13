'use client';

import { metaTranslations } from './meta-translations';

interface ArticleContentProps {
  locale: string;
}

const content = {
  howToUse: {
    title: {
      zh: "如何使用日期計算器？",
      en: "How to Use the Date Calculator?",
      jp: "日付計算機の使い方は？",
      es: "¿Cómo Usar la Calculadora de Fechas?"
    },
    steps: [
      {
        step: {
          zh: "選擇計算模式",
          en: "Choose Calculation Mode",
          jp: "計算モードを選択",
          es: "Elegir Modo de Cálculo"
        },
        description: {
          zh: "本工具提供兩種計算模式",
          en: "This tool provides two calculation modes",
          jp: "このツールでは2つの計算モードを提供しています",
          es: "Esta herramienta proporciona dos modos de cálculo"
        },
        options: [
          {
            zh: "日期加天數 - 從指定日期加上或減去天數",
            en: "Add Days to Date - Add or subtract days from a specified date",
            jp: "日付に日数を追加 - 指定された日付から日数を追加または減算",
            es: "Agregar Días a Fecha - Agregar o sustraer días de una fecha específica"
          },
          {
            zh: "日期相減 - 計算兩個日期之間的天數差",
            en: "Calculate Date Difference - Calculate the number of days between two dates",
            jp: "日付の差を計算 - 2つの日付間の日数差を計算",
            es: "Calcular Diferencia de Fechas - Calcular el número de días entre dos fechas"
          }
        ]
      },
      {
        step: {
          zh: "輸入日期",
          en: "Enter Date",
          jp: "日付を入力",
          es: "Ingresar Fecha"
        },
        description: {
          zh: "選擇您的起始日期或需要計算的日期",
          en: "Select your start date or the date you need to calculate",
          jp: "開始日または計算が必要な日付を選択してください",
          es: "Seleccione su fecha de inicio o la fecha que necesita calcular"
        }
      },
      {
        step: {
          zh: "輸入天數或結束日期",
          en: "Enter Days or End Date",
          jp: "日数または終了日を入力",
          es: "Ingresar Días o Fecha Final"
        },
        description: {
          zh: "根據選擇的模式，輸入要加減的天數或選擇結束日期",
          en: "Based on the selected mode, enter the number of days to add/subtract or select an end date",
          jp: "選択したモードに基づいて、加減する日数を入力するか、終了日を選択してください",
          es: "Según el modo seleccionado, ingrese el número de días a agregar/sustraer o seleccione una fecha final"
        }
      },
      {
        step: {
          zh: "查看結果",
          en: "View Results",
          jp: "結果を確認",
          es: "Ver Resultados"
        },
        description: {
          zh: "系統會即時顯示計算結果，包括目標日期或天數差異",
          en: "The system will instantly display the calculation results, including the target date or day difference",
          jp: "システムは、目標日付や日数差を含む計算結果を即座に表示します",
          es: "El sistema mostrará instantáneamente los resultados del cálculo, incluyendo la fecha objetivo o la diferencia de días"
        }
      }
    ],
    tip: {
      zh: "小提示",
      en: "Tip",
      jp: "ヒント",
      es: "Consejo"
    },
    tipContent: {
      zh: "計算結果會顯示星期幾，方便您安排行程或活動！",
      en: "The calculation results will show the day of the week, making it convenient for you to plan your schedule or activities!",
      jp: "計算結果には曜日が表示され、スケジュールや活動の計画に便利です！",
      es: "¡Los resultados del cálculo mostrarán el día de la semana, facilitándole planificar su horario o actividades!"
    }
  },
  whatIs: {
    title: {
      zh: "什麼是日期計算器？",
      en: "What is a Date Calculator?",
      jp: "日付計算機とは？",
      es: "¿Qué es una Calculadora de Fechas?"
    },
    content: [
      {
        zh: "日期計算器是一個實用的時間管理工具，專門設計來幫助使用者快速計算日期相關的各種需求。無論您是需要計算專案截止日期、安排旅行行程、或是追蹤重要紀念日，這個工具都能提供準確且即時的計算結果。",
        en: "A date calculator is a practical time management tool specifically designed to help users quickly calculate various date-related needs. Whether you need to calculate project deadlines, plan travel itineraries, or track important anniversaries, this tool provides accurate and instant calculation results.",
        jp: "日付計算機は、ユーザーが日付に関連するさまざまなニーズを迅速に計算できるように特別に設計された実用的な時間管理ツールです。プロジェクトの締め切りを計算したり、旅行の日程を計画したり、重要な記念日を追跡したりする必要がある場合でも、このツールは正確で即座の計算結果を提供します。",
        es: "Una calculadora de fechas es una herramienta práctica de gestión del tiempo específicamente diseñada para ayudar a los usuarios a calcular rápidamente diversas necesidades relacionadas con fechas. Ya sea que necesite calcular fechas límite de proyectos, planificar itinerarios de viaje o hacer seguimiento de aniversarios importantes, esta herramienta proporciona resultados de cálculo precisos e instantáneos."
      },
      {
        zh: "在日常生活和工作中，我們經常需要進行日期相關的計算。例如：計算合約到期日、預估專案工期、規劃活動日程等。傳統的手動計算方式不僅耗時，還容易出錯，特別是當涉及跨月或跨年計算時。",
        en: "In daily life and work, we often need to perform date-related calculations. For example: calculating contract expiration dates, estimating project durations, planning event schedules, etc. Traditional manual calculation methods are not only time-consuming but also prone to errors, especially when dealing with calculations across months or years.",
        jp: "日常生活や仕事では、日付に関連する計算を頻繁に行う必要があります。例えば、契約の有効期限の計算、プロジェクト期間の見積もり、イベントスケジュールの計画などです。従来の手動計算方法は時間がかかるだけでなく、特に月や年をまたぐ計算を扱う場合にエラーが発生しやすいです。",
        es: "En la vida diaria y el trabajo, a menudo necesitamos realizar cálculos relacionados con fechas. Por ejemplo: calcular fechas de vencimiento de contratos, estimar duraciones de proyectos, planificar horarios de eventos, etc. Los métodos tradicionales de cálculo manual no solo consumen tiempo sino que también son propensos a errores, especialmente cuando se trata de cálculos que abarcan meses o años."
      }
    ],
    types: {
      title: {
        zh: "主要功能",
        en: "Main Features",
        jp: "主な機能",
        es: "Características Principales"
      },
      items: [
        {
          zh: "日期加減計算",
          en: "Date Addition/Subtraction",
          jp: "日付の加減計算",
          es: "Cálculo de Suma/Resta de Fechas"
        },
        {
          zh: "日期間隔計算",
          en: "Date Interval Calculation",
          jp: "日付間隔の計算",
          es: "Cálculo de Intervalo de Fechas"
        },
        {
          zh: "星期幾顯示",
          en: "Day of Week Display",
          jp: "曜日表示",
          es: "Visualización del Día de la Semana"
        },
        {
          zh: "即時結果呈現",
          en: "Real-time Result Display",
          jp: "リアルタイム結果表示",
          es: "Visualización de Resultados en Tiempo Real"
        }
      ]
    },
    benefits: {
      title: {
        zh: "使用優勢",
        en: "Benefits",
        jp: "利用メリット",
        es: "Beneficios"
      },
      items: [
        {
          zh: "節省計算時間",
          en: "Save Calculation Time",
          jp: "計算時間の節約",
          es: "Ahorrar Tiempo de Cálculo"
        },
        {
          zh: "避免計算錯誤",
          en: "Avoid Calculation Errors",
          jp: "計算エラーを回避",
          es: "Evitar Errores de Cálculo"
        },
        {
          zh: "方便行程規劃",
          en: "Convenient Schedule Planning",
          jp: "便利なスケジュール計画",
          es: "Planificación Conveniente de Horarios"
        },
        {
          zh: "支援多種用途",
          en: "Support Multiple Uses",
          jp: "複数の用途をサポート",
          es: "Soporta Múltiples Usos"
        }
      ]
    },
    conclusion: {
      zh: "日期計算器簡化了繁瑣的日期運算，讓時間管理變得更加輕鬆高效。無論您是專業人士還是一般使用者，都能從中獲得便利。",
      en: "The date calculator simplifies tedious date calculations, making time management easier and more efficient. Whether you're a professional or a general user, you can benefit from its convenience.",
      jp: "日付計算機は面倒な日付計算を簡素化し、時間管理をより簡単で効率的にします。プロフェッショナルでも一般ユーザーでも、その便利さから恩恵を受けることができます。",
      es: "La calculadora de fechas simplifica los cálculos tediosos de fechas, haciendo que la gestión del tiempo sea más fácil y eficiente. Ya sea que usted sea un profesional o un usuario general, puede beneficiarse de su conveniencia."
    }
  },
  whyChooseUs: {
    title: {
      zh: "為什麼選擇我們的日期計算器？",
      en: "Why Choose Our Date Calculator?",
      jp: "なぜ私たちの日付計算機を選ぶのか？",
      es: "¿Por Qué Elegir Nuestra Calculadora de Fechas?"
    },
    features: {
      accurate: {
        title: {
          zh: "精準計算",
          en: "Accurate Calculation",
          jp: "正確な計算",
          es: "Cálculo Preciso"
        },
        content: {
          zh: "自動處理閏年、月份天數差異等複雜情況，確保每次計算都準確無誤。",
          en: "Automatically handles complex situations like leap years and month-day variations, ensuring accurate calculations every time.",
          jp: "うるう年や月の日数の違いなど複雑な状況を自動的に処理し、毎回正確な計算を保証します。",
          es: "Maneja automáticamente situaciones complejas como años bisiestos y variaciones de días por mes, garantizando cálculos precisos en todo momento."
        }
      },
      instant: {
        title: {
          zh: "即時結果",
          en: "Instant Results",
          jp: "即時結果",
          es: "Resultados Instantáneos"
        },
        content: {
          zh: "輸入數據後立即顯示計算結果，無需等待，提高您的工作效率。",
          en: "Results are displayed immediately after entering data, no waiting required, improving your work efficiency.",
          jp: "データ入力後すぐに計算結果が表示され、待つ必要がなく、作業効率が向上します。",
          es: "Los resultados se muestran inmediatamente después de ingresar los datos, sin necesidad de esperar, mejorando su eficiencia laboral."
        }
      },
      simple: {
        title: {
          zh: "簡單易用",
          en: "Simple and Easy",
          jp: "簡単で使いやすい",
          es: "Simple y Fácil"
        },
        content: {
          zh: "清晰的介面設計，直觀的操作流程，任何人都能輕鬆上手使用。",
          en: "Clear interface design and intuitive operation flow make it easy for anyone to use.",
          jp: "明確なインターフェースデザインと直感的な操作フローにより、誰でも簡単に使用できます。",
          es: "Diseño de interfaz claro y flujo de operación intuitivo hacen que cualquier persona pueda usarlo fácilmente."
        }
      },
      free: {
        title: {
          zh: "完全免費",
          en: "Completely Free",
          jp: "完全無料",
          es: "Completamente Gratuito"
        },
        content: {
          zh: "所有功能完全免費使用，無需註冊或付費，隨時隨地進行日期計算。",
          en: "All features are completely free to use, no registration or payment required, calculate dates anytime, anywhere.",
          jp: "すべての機能が完全に無料で使用でき、登録や支払いは不要で、いつでもどこでも日付計算ができます。",
          es: "Todas las funciones son completamente gratuitas, sin necesidad de registro o pago, calcule fechas en cualquier momento y lugar."
        }
      },
      multiPurpose: {
        title: {
          zh: "多用途支援",
          en: "Multi-Purpose Support",
          jp: "多目的サポート",
          es: "Soporte Multifuncional"
        },
        content: {
          zh: "適用於專案管理、行程規劃、合約管理等多種場景的日期計算需求。",
          en: "Suitable for date calculation needs in various scenarios like project management, itinerary planning, and contract management.",
          jp: "プロジェクト管理、旅程計画、契約管理など、さまざまなシナリオでの日付計算ニーズに適しています。",
          es: "Adecuado para necesidades de cálculo de fechas en varios escenarios como gestión de proyectos, planificación de itinerarios y gestión de contratos."
        }
      },
      mobile: {
        title: {
          zh: "行動裝置友善",
          en: "Mobile Friendly",
          jp: "モバイルフレンドリー",
          es: "Compatible con Móviles"
        },
        content: {
          zh: "完美支援各種裝置，無論是電腦、平板還是手機都能流暢使用。",
          en: "Perfect support for all devices, works smoothly on computers, tablets, and smartphones.",
          jp: "すべてのデバイスを完璧にサポートし、コンピューター、タブレット、スマートフォンでスムーズに動作します。",
          es: "Soporte perfecto para todos los dispositivos, funciona sin problemas en computadoras, tabletas y teléfonos inteligentes."
        }
      }
    },
    callToAction: {
      title: {
        zh: "立即開始使用，讓時間管理變得更簡單！",
        en: "Start using now and make time management easier!",
        jp: "今すぐ使い始めて、時間管理をより簡単にしましょう！",
        es: "¡Comience a usar ahora y haga que la gestión del tiempo sea más fácil!"
      },
      subtitle: {
        zh: "無需下載安裝，打開網頁即可使用",
        en: "No download or installation required, just open the webpage to use",
        jp: "ダウンロードやインストールは不要、ウェブページを開くだけで使用できます",
        es: "No se requiere descarga o instalación, simplemente abra la página web para usar"
      }
    }
  },
  calendarDays: {
    title: {
      zh: "深入了解：日曆天計算原理",
      en: "Deep Dive: Calendar Day Calculation Principles",
      jp: "詳細解説：暦日計算の原理",
      es: "Profundización: Principios de Cálculo de Días de Calendario"
    },
    intro: {
      zh: "除了基本的日期計算功能，了解日曆天的概念對於專業的時間管理尤為重要。以下是關於日曆天計算的詳細說明：",
      en: "In addition to basic date calculation functions, understanding the concept of calendar days is particularly important for professional time management. Here's a detailed explanation of calendar day calculations:",
      jp: "基本的な日付計算機能に加えて、暦日の概念を理解することは、プロフェッショナルな時間管理にとって特に重要です。以下は暦日計算の詳細な説明です：",
      es: "Además de las funciones básicas de cálculo de fechas, comprender el concepto de días de calendario es particularmente importante para la gestión profesional del tiempo. Aquí tienes una explicación detallada de los cálculos de días de calendario:"
    }
  }
};

export default function ArticleContent({ locale }: ArticleContentProps) {
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';

  return (
    <>
      {/* 如何使用此工具 */}
      <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-3">{content.howToUse.title[lang]}</h2>
        <div className="space-y-4">
          <ol className="list-decimal list-inside space-y-2">
            {content.howToUse.steps.map((step, index) => (
              <li key={index} className="pl-2">
                <span className="font-medium">{step.step[lang]}：</span>
                {step.description[lang]}
                {step.options && (
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-gray-700">
                    {step.options.map((option, i) => (
                      <li key={i}>{option[lang]}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
          <div className="bg-blue-50 p-3 rounded-lg mt-4">
            <p className="text-blue-700 font-medium">{content.howToUse.tip[lang]}：</p>
            <p className="text-blue-600 text-sm">{content.howToUse.tipContent[lang]}</p>
          </div>
        </div>
      </div>

      {/* 什麼是日期計算器 */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-3">{content.whatIs.title[lang]}</h2>
        <div className="space-y-3">
          {content.whatIs.content.map((paragraph, index) => (
            <p key={index}>{paragraph[lang]}</p>
          ))}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <h3 className="font-medium text-green-700">{content.whatIs.types.title[lang]}</h3>
              <ul className="list-disc list-inside text-sm mt-1 space-y-1 text-green-700">
                {content.whatIs.types.items.map((item, index) => (
                  <li key={index}>{item[lang]}</li>
                ))}
              </ul>
            </div>
            
            <div className="bg-amber-50 p-3 rounded-lg">
              <h3 className="font-medium text-amber-700">{content.whatIs.benefits.title[lang]}</h3>
              <ul className="list-disc list-inside text-sm mt-1 space-y-1 text-amber-700">
                {content.whatIs.benefits.items.map((item, index) => (
                  <li key={index}>{item[lang]}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <p className="mt-3">{content.whatIs.conclusion[lang]}</p>
        </div>
      </div>

      {/* 常見問題 */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-3">{metaTranslations.faq.title[lang]}</h2>
        
        <div className="space-y-6">
          {metaTranslations.faq.questions[lang].map((faq, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-blue-700">{faq.question}</h3>
              <p className="mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 為什麼選擇我們 */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-3">{content.whyChooseUs.title[lang]}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-medium text-blue-700">{content.whyChooseUs.features.accurate.title[lang]}</h3>
            </div>
            <p className="text-blue-700 text-sm">
              {content.whyChooseUs.features.accurate.content[lang]}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="font-medium text-green-700">{content.whyChooseUs.features.instant.title[lang]}</h3>
            </div>
            <p className="text-green-700 text-sm">
              {content.whyChooseUs.features.instant.content[lang]}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <h3 className="font-medium text-purple-700">{content.whyChooseUs.features.simple.title[lang]}</h3>
            </div>
            <p className="text-purple-700 text-sm">
              {content.whyChooseUs.features.simple.content[lang]}
            </p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-medium text-amber-700">{content.whyChooseUs.features.free.title[lang]}</h3>
            </div>
            <p className="text-amber-700 text-sm">
              {content.whyChooseUs.features.free.content[lang]}
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <h3 className="font-medium text-red-700">{content.whyChooseUs.features.multiPurpose.title[lang]}</h3>
            </div>
            <p className="text-red-700 text-sm">
              {content.whyChooseUs.features.multiPurpose.content[lang]}
            </p>
          </div>
          
          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <h3 className="font-medium text-cyan-700">{content.whyChooseUs.features.mobile.title[lang]}</h3>
            </div>
            <p className="text-cyan-700 text-sm">
              {content.whyChooseUs.features.mobile.content[lang]}
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center">
          <p className="text-lg font-medium text-indigo-700">
            {content.whyChooseUs.callToAction.title[lang]}
          </p>
          <p className="text-sm text-indigo-600 mt-1">
            {content.whyChooseUs.callToAction.subtitle[lang]}
          </p>
        </div>
      </div>

      {/* 深入了解：日曆天計算原理 */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-3">{content.calendarDays.title[lang]}</h2>
        <p className="mb-4">{content.calendarDays.intro[lang]}</p>
        
        {/* 原有的日曆天內容區塊 */}
        <CalendarDaysContent locale={locale} />
      </div>
    </>
  );
}

// 將原有的日曆天內容分離成獨立元件
function CalendarDaysContent({ locale }: { locale: string }) {
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';
  
  const calendarContent = {
    definition: {
      title: {
        zh: "日曆天的定義與計算方式",
        en: "Definition and Calculation of Calendar Days",
        jp: "暦日の定義と計算方法",
        es: "Definición y Cálculo de Días de Calendario"
      },
      p1: {
        zh: "日曆天是指專案開始到結束的實際天數，包含了工作日、週末以及法定假日。它反映了專案所占用的時間。",
        en: "Calendar days refer to the actual number of days from the start to the end of a project, including workdays, weekends, and holidays. It reflects the time occupied by the project.",
        jp: "暦日とは、プロジェクトの開始から終了までの実際の日数を指し、平日、週末、祝日を含みます。これはプロジェクトが占める時間を反映しています。",
        es: "Los días de calendario se refieren al número real de días desde el inicio hasta el final de un proyecto, incluyendo días laborables, fines de semana y días festivos. Refleja el tiempo ocupado por el proyecto."
      },
      p2: {
        zh: "日曆天的計算方式相對簡單，只需將專案開始日期與結束日期之間的差異天數相加即可。",
        en: "The calculation of calendar days is relatively simple, just add the difference in days between the project start date and end date.",
        jp: "暦日の計算は比較的簡単で、プロジェクトの開始日と終了日の間の日数差を足すだけです。",
        es: "El cálculo de días de calendario es relativamente simple, solo hay que agregar la diferencia de días entre la fecha de inicio y la fecha de finalización del proyecto."
      },
      examples: [
        {
          zh: "例如，若專案於3月1日開始，並於3月2日結束，則日曆天數為1天。",
          en: "For example, if a project starts on March 1 and ends on March 2, the number of calendar days is 1 day.",
          jp: "たとえば、プロジェクトが3月1日に開始し、3月2日に終了する場合、暦日数は1日です。",
          es: "Por ejemplo, si un proyecto comienza el 1 de marzo y termina el 2 de marzo, el número de días de calendario es 1 día."
        },
        {
          zh: "例如，若專案於3月1日開始，並於3月31日結束，則日曆天數為30天。",
          en: "For example, if a project starts on March 1 and ends on March 31, the number of calendar days is 30 days.",
          jp: "たとえば、プロジェクトが3月1日に開始し、3月31日に終了する場合、暦日数は30日です。",
          es: "Por ejemplo, si un proyecto comienza el 1 de marzo y termina el 31 de marzo, el número de días de calendario es 30 días."
        }
      ]
    },
    difference: {
      title: {
        zh: "日曆天與工作天(工期)的差異",
        en: "Difference Between Calendar Days and Work Days (Duration)",
        jp: "暦日と稼働日（工期）の違い",
        es: "Diferencia Entre Días de Calendario y Días Laborables (Duración)"
      },
      p1: {
        zh: "工作天是指完成專案所需的工作日數，不包含週末及法定假日。它反映了團隊實際投入專案的時間。",
        en: "Work days refer to the number of working days required to complete a project, excluding weekends and holidays. It reflects the actual time the team invests in the project.",
        jp: "稼働日とは、プロジェクトを完了するために必要な実際の作業日数を指し、週末や祝日は含まれません。これはチームがプロジェクトに実際に投資した時間を反映しています。",
        es: "Los días laborables se refieren al número de días de trabajo necesarios para completar un proyecto, excluyendo fines de semana y días festivos. Refleja el tiempo real que el equipo invierte en el proyecto."
      },
      p2: {
        zh: "由於日曆天包含了非工作日，因此工作天通常會小於日曆天數。假設專案日曆天數為31天，其中22天為需要工作日，則工作日為22天。",
        en: "Since calendar days include non-working days, the number of work days is usually less than the number of calendar days. Assuming a project has 31 calendar days, of which 22 days are work days, then the work days are 22 days.",
        jp: "暦日には非稼働日が含まれるため、稼働日数は通常、暦日数よりも少なくなります。プロジェクトの暦日数が31日で、そのうち22日が稼働日である場合、稼働日数は22日です。",
        es: "Dado que los días de calendario incluyen días no laborables, el número de días laborables suele ser menor que el número de días de calendario. Asumiendo que un proyecto tiene 31 días de calendario, de los cuales 22 días son laborables, entonces los días laborables son 22 días."
      }
    },
    application: {
      title: {
        zh: "日曆天數與工期管理的應用",
        en: "Applications of Calendar Days in Project Management",
        jp: "プロジェクト管理における暦日の応用",
        es: "Aplicaciones de Días de Calendario en la Gestión de Proyectos"
      },
      items: [
        {
          title: {
            zh: "專案進度追蹤",
            en: "Project Progress Tracking",
            jp: "プロジェクト進捗追跡",
            es: "Seguimiento de Progreso del Proyecto"
          },
          content: {
            zh: "通過日曆天數與工期的對比，項目經理可以掌握專案的實際進度。若日曆天數大幅超過預期工期，則表明專案可能存在延遲風險。",
            en: "By comparing calendar days with work duration, project managers can grasp the actual progress. If calendar days significantly exceed expected duration, it indicates potential delay risks.",
            jp: "暦日と工期を比較することで、プロジェクトマネージャーは実際の進捗を把握できます。暦日数が予想工期を大幅に超える場合、遅延リスクの可能性を示しています。",
            es: "Al comparar los días de calendario con la duración del trabajo, los gerentes de proyecto pueden comprender el progreso real. Si los días de calendario exceden significativamente la duración esperada, indica riesgos potenciales de retraso."
          }
        },
        {
          title: {
            zh: "資源分配與優化",
            en: "Resource Allocation and Optimization",
            jp: "リソース配分と最適化",
            es: "Asignación y Optimización de Recursos"
          },
          content: {
            zh: "根據日曆天數與工期，項目經理可以合理分配團隊資源，並優化工作安排。例如，在節假日前夕，可以適當增加人力。",
            en: "Based on calendar days and duration, managers can allocate resources reasonably and optimize work arrangements. For example, increasing manpower before holidays.",
            jp: "暦日と工期に基づいて、マネージャーはリソースを合理的に配分し、作業配置を最適化できます。例えば、祝日前に人員を増やすなど。",
            es: "Basándose en días de calendario y duración, los gerentes pueden asignar recursos de manera razonable y optimizar los arreglos de trabajo. Por ejemplo, incrementar personal antes de días festivos."
          }
        },
        {
          title: {
            zh: "風險管理",
            en: "Risk Management",
            jp: "リスク管理",
            es: "Gestión de Riesgos"
          },
          content: {
            zh: "日曆天計算有助於識別並管理專案風險。例如，若關鍵材料的交付日期恰好遇到長假，則可能導致專案延遲。",
            en: "Calendar day calculation helps identify and manage project risks. For example, if key material delivery coincides with long holidays, it may cause delays.",
            jp: "暦日計算はプロジェクトリスクの特定と管理に役立ちます。例えば、重要な材料の納期が長期休暇と重なる場合、遅延を引き起こす可能性があります。",
            es: "El cálculo de días de calendario ayuda a identificar y gestionar riesgos del proyecto. Por ejemplo, si la entrega de materiales clave coincide con vacaciones largas, puede causar retrasos."
          }
        }
      ]
    },
    considerations: {
      title: {
        zh: "日曆天計算的注意事項",
        en: "Considerations for Calendar Day Calculation",
        jp: "暦日計算の考慮事項",
        es: "Consideraciones para el Cálculo de Días de Calendario"
      },
      items: [
        {
          title: {
            zh: "考慮時差因素",
            en: "Consider Time Difference Factors",
            jp: "時差を考慮する",
            es: "Considerar Factores de Diferencia Horaria"
          },
          content: {
            zh: "若專案涉及跨時區合作，則需要在日曆天計算中考慮時差因素。不同時區的假日安排可能有所不同。",
            en: "If the project involves cross-time zone collaboration, time differences need to be considered. Holiday arrangements may vary across time zones.",
            jp: "プロジェクトが異なるタイムゾーンでの協力を含む場合、時差要素を考慮する必要があります。タイムゾーンによって休日の配置が異なる場合があります。",
            es: "Si el proyecto involucra colaboración entre zonas horarias, las diferencias horarias necesitan ser consideradas. Los arreglos de vacaciones pueden variar entre zonas horarias."
          }
        },
        {
          title: {
            zh: "彈性調整",
            en: "Flexible Adjustment",
            jp: "柔軟な調整",
            es: "Ajuste Flexible"
          },
          content: {
            zh: "雖然日曆天計算提供了時間管理框架，但實踐中仍需保持彈性。針對突發事件或變更請求，需要及時調整。",
            en: "While calendar day calculation provides a time management framework, flexibility is still needed in practice for unexpected events or change requests.",
            jp: "暦日計算は時間管理のフレームワークを提供しますが、実践では予期せぬ出来事や変更要求に対して柔軟性が必要です。",
            es: "Aunque el cálculo de días de calendario proporciona un marco de gestión del tiempo, la flexibilidad sigue siendo necesaria en la práctica para eventos inesperados o solicitudes de cambio."
          }
        }
      ],
      conclusion: {
        zh: "日曆天計算是專案時程管理的基礎，它為工期估算、進度追蹤以及資源優化提供了依據。通過理解日曆天與工期的關係，項目經理可以更好地掌控專案時程，提高交付的準確性和效率。",
        en: "Calendar day calculation is the foundation of project schedule management, providing a basis for duration estimation, progress tracking, and resource optimization. By understanding the relationship between calendar days and work duration, project managers can better control project schedules.",
        jp: "暦日計算はプロジェクトスケジュール管理の基礎であり、工期見積もり、進捗追跡、リソース最適化の基礎を提供します。暦日と工期の関係を理解することで、プロジェクトマネージャーはプロジェクトスケジュールをより良く制御できます。",
        es: "El cálculo de días de calendario es la base de la gestión de cronogramas de proyectos, proporcionando una base para la estimación de duración, seguimiento de progreso y optimización de recursos. Al comprender la relación entre días de calendario y duración del trabajo, los gerentes de proyecto pueden controlar mejor los cronogramas de proyectos."
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">{calendarContent.definition.title[lang]}</h3>
        <p className="mb-2">{calendarContent.definition.p1[lang]}</p>
        <p className="mb-3">{calendarContent.definition.p2[lang]}</p>
        <div className="bg-gray-100 p-3 rounded">
          {calendarContent.definition.examples.map((example, index) => (
            <p key={index} className="text-sm text-gray-700 mb-1">{example[lang]}</p>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">{calendarContent.difference.title[lang]}</h3>
        <p className="mb-2">{calendarContent.difference.p1[lang]}</p>
        <p>{calendarContent.difference.p2[lang]}</p>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">{calendarContent.application.title[lang]}</h3>
        <div className="space-y-3">
          {calendarContent.application.items.map((item, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-3">
              <h4 className="font-medium text-gray-700">{item.title[lang]}</h4>
              <p className="text-sm text-gray-600 mt-1">{item.content[lang]}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg">
        <h3 className="font-semibold text-gray-800 mb-3">{calendarContent.considerations.title[lang]}</h3>
        <div className="space-y-3 mb-4">
          {calendarContent.considerations.items.map((item, index) => (
            <div key={index} className="flex">
              <div className="flex-shrink-0 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-white text-xs font-bold">{index + 1}</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-700">{item.title[lang]}</h4>
                <p className="text-sm text-gray-600 mt-1">{item.content[lang]}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <p className="text-blue-800 text-sm">{calendarContent.considerations.conclusion[lang]}</p>
        </div>
      </div>
    </div>
  );
}