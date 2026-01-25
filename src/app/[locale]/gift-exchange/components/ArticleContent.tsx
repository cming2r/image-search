'use client';

import { giftExchangeTranslations } from './meta-translations';

interface ArticleContentProps {
  locale: string;
}

const content = {
  howToUse: {
    title: {
      tw: "如何使用此工具？",
      cn: "如何使用此工具？",
      en: "How to Use This Tool?",
      jp: "このツールの使い方",
      es: "¿Cómo Usar Esta Herramienta?"
    },
    steps: [
      {
        step: {
          tw: "添加參與者",
          cn: "添加参与者",
          en: "Add Participants",
          jp: "参加者を追加",
          es: "Agregar Participantes"
        },
        description: {
          tw: "輸入所有參與交換禮物的成員名單（可一次輸入多個名字，用空格分隔）",
          cn: "输入所有参与交换礼物的成员名单（可一次输入多个名字，用空格分隔）",
          en: "Enter all gift exchange participants (you can enter multiple names at once, separated by spaces)",
          jp: "すべてのギフト交換参加者を入力します（複数の名前をスペースで区切って一度に入力できます）",
          es: "Ingrese todos los participantes del intercambio de regalos (puede ingresar múltiples nombres a la vez, separados por espacios)"
        }
      },
      {
        step: {
          tw: "選擇設置",
          cn: "选择设置",
          en: "Choose Settings",
          jp: "設定を選択",
          es: "Elegir Configuraciones"
        },
        description: {
          tw: "",
          cn: "",
          en: "",
          jp: "",
          es: ""
        },
        options: [
          {
            tw: "隨機分佈參與者順序 - 打亂名單順序，增加驚喜感",
            cn: "随机分布参与者顺序 - 打乱名单顺序，增加惊喜感",
            en: "Randomize participant order - Shuffle the list order for more surprise",
            jp: "参加者の順序をランダム化 - リスト順序をシャッフルしてサプライズ感を高める",
            es: "Aleatorizar orden de participantes - Mezclar el orden de la lista para más sorpresa"
          },
          {
            tw: "直接顯示最終結果 - 跳過轉盤過程，直接顯示完整配對結果",
            cn: "直接显示最终结果 - 跳过转盘过程，直接显示完整配对结果",
            en: "Show final results directly - Skip the wheel process and display complete matching results",
            jp: "最終結果を直接表示 - ホイールプロセスをスキップして完全なマッチング結果を表示",
            es: "Mostrar resultados finales directamente - Omitir el proceso de la ruleta y mostrar resultados completos de emparejamiento"
          }
        ]
      },
      {
        step: {
          tw: "創建活動",
          cn: "创建活动",
          en: "Create Event",
          jp: "イベントを作成",
          es: "Crear Evento"
        },
        description: {
          tw: "點擊「開始抽籤」按鈕，系統會自動生成活動連結",
          cn: "点击「开始抽签」按钮，系统会自动生成活动链接",
          en: "Click the \"Start Drawing\" button, and the system will automatically generate an event link",
          jp: "「抽選開始」ボタンをクリックすると、システムは自動的にイベントリンクを生成します",
          es: "Haga clic en el botón \"Iniciar Sorteo\", y el sistema generará automáticamente un enlace del evento"
        }
      },
      {
        step: {
          tw: "轉動轉盤",
          cn: "转动转盘",
          en: "Spin the Wheel",
          jp: "ホイールを回す",
          es: "Girar la Ruleta"
        },
        description: {
          tw: "每次轉動會隨機選出一位參與者，系統會按順序記錄結果",
          cn: "每次转动会随机选出一位参与者，系统会按顺序记录结果",
          en: "Each spin randomly selects a participant, and the system records results in sequence",
          jp: "各スピンはランダムに参加者を選択し、システムは順番に結果を記録します",
          es: "Cada giro selecciona aleatoriamente un participante, y el sistema registra los resultados en secuencia"
        }
      },
      {
        step: {
          tw: "查看結果",
          cn: "查看结果",
          en: "View Results",
          jp: "結果を表示",
          es: "Ver Resultados"
        },
        description: {
          tw: "完成所有抽籤後，可查看完整配對列表，了解誰送禮物給誰",
          cn: "完成所有抽签后，可查看完整配对列表，了解谁送礼物给谁",
          en: "After completing all drawings, you can view the complete pairing list to see who gives gifts to whom",
          jp: "すべての抽選が完了すると、完全なペアリストを表示して誰が誰にギフトを贈るかを確認できます",
          es: "Después de completar todos los sorteos, puede ver la lista completa de emparejamientos para saber quién da regalos a quién"
        }
      },
      {
        step: {
          tw: "分享活動",
          cn: "分享活动",
          en: "Share Event",
          jp: "イベントを共有",
          es: "Compartir Evento"
        },
        description: {
          tw: "使用分享按鈕將活動連結發送給所有參與者，讓大家一起參與互動",
          cn: "使用分享按钮将活动链接发送给所有参与者，让大家一起参与互动",
          en: "Use the share button to send the event link to all participants so everyone can join the interaction",
          jp: "共有ボタンを使用してイベントリンクをすべての参加者に送信し、全員が対話に参加できるようにします",
          es: "Use el botón de compartir para enviar el enlace del evento a todos los participantes para que todos puedan unirse a la interacción"
        }
      }
    ],
    tip: {
      tw: "小提示",
      cn: "小提示",
      en: "Tip",
      jp: "ヒント",
      es: "Consejo"
    },
    tipContent: {
      tw: "抽籤結果會自動保存，隨時可以回到活動頁面查看。建議先在活動前設定禮物價格範圍，確保所有參與者準備的禮物價值相近。",
      cn: "抽签结果会自动保存，随时可以回到活动页面查看。建议先在活动前设定礼物价格范围，确保所有参与者准备的礼物价值相近。",
      en: "Drawing results are automatically saved, and you can return to the event page anytime to view them. It's recommended to set a gift price range before the event to ensure all participants prepare gifts of similar value.",
      jp: "抽選結果は自動的に保存され、いつでもイベントページに戻って表示できます。イベント前にギフトの価格帯を設定し、すべての参加者が同様の価値のギフトを準備するようにすることをお勧めします。",
      es: "Los resultados del sorteo se guardan automáticamente, y puede volver a la página del evento en cualquier momento para verlos. Se recomienda establecer un rango de precios de regalos antes del evento para asegurar que todos los participantes preparen regalos de valor similar."
    }
  },
  whatIs: {
    title: {
      tw: "什麼是交換禮物活動？",
      cn: "什么是交换礼物活动？",
      en: "What is a Gift Exchange Event?",
      jp: "ギフト交換イベントとは？",
      es: "¿Qué es un Evento de Intercambio de Regalos?"
    },
    content: [
      {
        tw: "交換禮物（Gift Exchange）是一種深受歡迎的社交活動，特別流行於聖誕節、新年派對、生日慶祝或公司團建活動中。這種活動不僅增進參與者之間的友誼，還能創造共同的美好回憶。",
        cn: "交换礼物（Gift Exchange）是一种深受欢迎的社交活动，特别流行于圣诞节、新年派对、生日庆祝或公司团建活动中。这种活动不仅增进参与者之间的友谊，还能创造共同的美好回忆。",
        en: "Gift Exchange is a popular social activity, especially common at Christmas parties, New Year celebrations, birthday parties, or company team-building events. This activity not only enhances friendship among participants but also creates shared wonderful memories.",
        jp: "ギフト交換は人気のあるソーシャルアクティビティで、特にクリスマスパーティー、新年のお祝い、誕生日パーティー、または会社のチームビルディングイベントで一般的です。このアクティビティは参加者間の友情を深めるだけでなく、共有される素晴らしい思い出も作ります。",
        es: "El Intercambio de Regalos es una actividad social popular, especialmente común en fiestas navideñas, celebraciones de Año Nuevo, fiestas de cumpleaños o eventos de team building de empresas. Esta actividad no solo mejora la amistad entre los participantes sino que también crea recuerdos maravillosos compartidos."
      },
      {
        tw: "活動流程： 每位參與者既是送禮者也是收禮者，通過隨機配對或特定方式決定送禮對象。相比傳統的「每人準備禮物給所有人」方式，交換禮物更經濟實惠且更有驚喜感。",
        cn: "活动流程：每位参与者既是送礼者也是收礼者，通过随机配对或特定方式决定送礼对象。相比传统的「每人准备礼物给所有人」方式，交换礼物更经济实惠且更有惊喜感。",
        en: "Event Process: Each participant is both a gift giver and receiver, with gift recipients determined through random matching or specific methods. Compared to the traditional \"everyone prepares gifts for everyone\" approach, gift exchanges are more economical and more surprising.",
        jp: "イベントプロセス：各参加者はギフトの贈り主であり受け取り手でもあり、ギフトの受取人はランダムマッチングまたは特定の方法で決定されます。従来の「全員が全員にギフトを準備する」アプローチと比較して、ギフト交換はより経済的でよりサプライズ性があります。",
        es: "Proceso del Evento: Cada participante es tanto un dador como un receptor de regalos, con los destinatarios de regalos determinados a través de emparejamiento aleatorio o métodos específicos. Comparado con el enfoque tradicional de \"todos preparan regalos para todos\", los intercambios de regalos son más económicos y sorprendentes."
      }
    ],
    types: {
      title: {
        tw: "交換禮物類型",
        cn: "交换礼物类型",
        en: "Gift Exchange Types",
        jp: "ギフト交換タイプ",
        es: "Tipos de Intercambio de Regalos"
      },
      items: [
        {
          tw: "普通交換：每人隨機送禮給另一人",
          cn: "普通交换：每人随机送礼给另一人",
          en: "Standard Exchange: Each person randomly gives a gift to another person",
          jp: "標準交換：各人がランダムに別の人にギフトを贈る",
          es: "Intercambio Estándar: Cada persona aleatoriamente da un regalo a otra persona"
        },
        {
          tw: "秘密聖誕老人：保持送禮者身份保密",
          cn: "秘密圣诞老人：保持送礼者身份保密",
          en: "Secret Santa: The gift giver's identity remains secret",
          jp: "シークレットサンタ：ギフト贈り主の身元は秘密のまま",
          es: "Amigo Secreto: La identidad del dador de regalos permanece en secreto"
        },
        {
          tw: "白象交換：參與者可「搶」別人的禮物",
          cn: "白象交换：参与者可「抢」别人的礼物",
          en: "White Elephant: Participants can \"steal\" gifts from others",
          jp: "ホワイトエレファント：参加者は他の人からギフトを「盗む」ことができる",
          es: "Elefante Blanco: Los participantes pueden \"robar\" regalos de otros"
        },
        {
          tw: "主題交換：指定禮物類型或主題",
          cn: "主题交换：指定礼物类型或主题",
          en: "Themed Exchange: Specific gift types or themes are designated",
          jp: "テーマ交換：特定のギフトタイプやテーマが指定される",
          es: "Intercambio Temático: Se designan tipos o temas específicos de regalos"
        }
      ]
    },
    benefits: {
      title: {
        tw: "活動益處",
        cn: "活动益处",
        en: "Event Benefits",
        jp: "イベントのメリット",
        es: "Beneficios del Evento"
      },
      items: [
        {
          tw: "增強團隊凝聚力與友誼",
          cn: "增强团队凝聚力与友谊",
          en: "Strengthens team cohesion and friendship",
          jp: "チームの結束と友情を強化する",
          es: "Fortalece la cohesión del equipo y la amistad"
        },
        {
          tw: "創造愉快的共同記憶",
          cn: "创造愉快的共同记忆",
          en: "Creates pleasant shared memories",
          jp: "楽しい共有記憶を作る",
          es: "Crea memorias compartidas agradables"
        },
        {
          tw: "培養送禮與感恩的文化",
          cn: "培养送礼与感恩的文化",
          en: "Cultivates a culture of gift-giving and gratitude",
          jp: "贈り物と感謝の文化を育む",
          es: "Cultiva una cultura de dar regalos y gratitud"
        },
        {
          tw: "是節日活動的完美互動環節",
          cn: "是节日活动的完美互动环节",
          en: "Perfect interactive element for holiday activities",
          jp: "休日活動のための完璧なインタラクティブ要素",
          es: "Elemento interactivo perfecto para actividades navideñas"
        }
      ]
    },
    conclusion: {
      tw: "使用我們的轉盤工具進行抽籤，讓整個過程更加公平、有趣且充滿期待，為您的活動增添更多歡樂氣氛和互動性。",
      cn: "使用我们的转盘工具进行抽签，让整个过程更加公平、有趣且充满期待，为您的活动增添更多欢乐气氛和互动性。",
      en: "Using our wheel tool for drawing makes the entire process more fair, fun, and full of anticipation, adding more festive atmosphere and interactivity to your event.",
      jp: "抽選にホイールツールを使用することで、プロセス全体がより公平で楽しく、期待感にあふれ、イベントにお祭り気分とインタラクティブ性を加えます。",
      es: "Usar nuestra herramienta de ruleta para el sorteo hace que todo el proceso sea más justo, divertido y lleno de expectativa, agregando más atmósfera festiva e interactividad a su evento."
    }
  },
  whyChooseUs: {
    title: {
      tw: "為什麼選擇我們的交換禮物轉盤工具？",
      cn: "为什么选择我们的交换礼物转盘工具？",
      en: "Why Choose Our Gift Exchange Wheel Tool?",
      jp: "なぜ私たちのギフト交換ホイールツールを選ぶのか？",
      es: "¿Por Qué Elegir Nuestra Herramienta de Ruleta de Intercambio de Regalos?"
    },
    features: {
      funInteraction: {
        title: {
          tw: "有趣互動體驗",
          cn: "有趣互动体验",
          en: "Fun Interactive Experience",
          jp: "楽しいインタラクティブ体験",
          es: "Experiencia Interactiva Divertida"
        },
        content: {
          tw: "精心設計的轉盤動畫增添樂趣和期待感，比傳統紙條抽籤更具參與感，適合團體場合使用和線上分享。",
          cn: "精心设计的转盘动画增添乐趣和期待感，比传统纸条抽签更具参与感，适合团体场合使用和线上分享。",
          en: "Carefully designed wheel animations add fun and anticipation, with more engagement than traditional paper drawing, suitable for group settings and online sharing.",
          jp: "慎重に設計されたホイールアニメーションが楽しさと期待感を加え、従来の紙の抽選よりも魅力的で、グループ設定やオンライン共有に適しています。",
          es: "Las animaciones de ruleta cuidadosamente diseñadas añaden diversión y expectativa, con más participación que el sorteo tradicional en papel, adecuado para configuraciones grupales y compartir en línea."
        }
      },
      free: {
        title: {
          tw: "完全免費使用",
          cn: "完全免费使用",
          en: "Completely Free",
          jp: "完全無料",
          es: "Completamente Gratis"
        },
        content: {
          tw: "我們承諾所有功能完全免費，無任何隱藏費用或限制，不顯示廣告，讓您專注於活動體驗。",
          cn: "我们承诺所有功能完全免费，无任何隐藏费用或限制，不显示广告，让您专注于活动体验。",
          en: "We promise all features are completely free, with no hidden fees or restrictions, no advertisements, letting you focus on the event experience.",
          jp: "すべての機能が完全に無料で、隠れた料金や制限がなく、広告もないため、イベント体験に集中できます。",
          es: "Prometemos que todas las funciones son completamente gratuitas, sin tarifas ocultas o restricciones, sin anuncios, permitiéndole enfocarse en la experiencia del evento."
        }
      },
      easyToUse: {
        title: {
          tw: "簡單易用",
          cn: "简单易用",
          en: "Simple and User-Friendly",
          jp: "シンプルで使いやすい",
          es: "Simple y Fácil de Usar"
        },
        content: {
          tw: "直觀友好的界面設計，無需技術知識即可上手。從設置到分享結果，整個流程簡潔清晰，適合各年齡層用戶。",
          cn: "直观友好的界面设计，无需技术知识即可上手。从设置到分享结果，整个流程简洁清晰，适合各年龄层用户。",
          en: "Intuitive, friendly interface design requires no technical knowledge to use. From setup to sharing results, the entire process is concise and clear, suitable for users of all ages.",
          jp: "直感的でフレンドリーなインターフェースデザインは、使用するための技術的知識を必要としません。設定から結果の共有まで、全過程は簡潔で明確、あらゆる年齢のユーザーに適しています。",
          es: "El diseño de interfaz intuitivo y amigable no requiere conocimientos técnicos para usar. Desde la configuración hasta compartir resultados, todo el proceso es conciso y claro, adecuado para usuarios de todas las edades."
        }
      },
      autoSave: {
        title: {
          tw: "結果自動保存",
          cn: "结果自动保存",
          en: "Auto-Save Results",
          jp: "結果の自動保存",
          es: "Guardado Automático de Resultados"
        },
        content: {
          tw: "自動記錄所有抽籤結果，活動結束後可隨時查看完整配對清單，無需擔心遺忘或記錯。",
          cn: "自动记录所有抽签结果，活动结束后可随时查看完整配对清单，无需担心遗忘或记错。",
          en: "Automatically records all drawing results, allowing you to view the complete pairing list anytime after the event, without worrying about forgetting or misremembering.",
          jp: "すべての抽選結果を自動的に記録し、イベント後いつでも完全なペアリングリストを表示でき、忘れたり誤って覚えたりする心配がありません。",
          es: "Registra automáticamente todos los resultados del sorteo, permitiéndole ver la lista completa de emparejamientos en cualquier momento después del evento, sin preocuparse por olvidar o recordar mal."
        }
      },
      privacy: {
        title: {
          tw: "隱私保護",
          cn: "隐私保护",
          en: "Privacy Protection",
          jp: "プライバシー保護",
          es: "Protección de Privacidad"
        },
        content: {
          tw: "無需註冊帳號或提供個人資料，活動數據僅在必要時間內保存，確保您的隱私安全不受侵犯。",
          cn: "无需注册账号或提供个人资料，活动数据仅在必要时间内保存，确保您的隐私安全不受侵犯。",
          en: "No need to register an account or provide personal information, event data is only stored for the necessary time, ensuring your privacy is not invaded.",
          jp: "アカウント登録や個人情報の提供は不要、イベントデータは必要な時間だけ保存され、プライバシーが侵害されないことを保証します。",
          es: "No es necesario registrar una cuenta o proporcionar información personal, los datos del evento solo se almacenan durante el tiempo necesario, asegurando que su privacidad no sea invadida."
        }
      },
      fair: {
        title: {
          tw: "公平隨機",
          cn: "公平随机",
          en: "Fair and Random",
          jp: "公平でランダム",
          es: "Justo y Aleatorio"
        },
        content: {
          tw: "採用高品質隨機算法，確保抽籤過程完全公平公正，提供多種設置選項滿足不同活動需求。",
          cn: "采用高品质随机算法，确保抽签过程完全公平公正，提供多种设置选项满足不同活动需求。",
          en: "Uses high-quality random algorithms to ensure the drawing process is completely fair and just, providing various setting options to meet different event needs.",
          jp: "高品質なランダムアルゴリズムを使用して抽選プロセスが完全に公平かつ正当であることを確保し、異なるイベントニーズを満たすためのさまざまな設定オプションを提供します。",
          es: "Utiliza algoritmos aleatorios de alta calidad para asegurar que el proceso de sorteo sea completamente justo y equitativo, proporcionando varias opciones de configuración para satisfacer diferentes necesidades de eventos."
        }
      }
    },
    callToAction: {
      title: {
        tw: "立即開始您的交換禮物活動，為您的聚會增添更多歡樂與驚喜！",
        cn: "立即开始您的交换礼物活动，为您的聚会增添更多欢乐与惊喜！",
        en: "Start your gift exchange event now and add more joy and surprises to your gathering!",
        jp: "今すぐギフト交換イベントを開始し、集まりにさらなる喜びとサプライズを追加しましょう！",
        es: "¡Comience su evento de intercambio de regalos ahora y agregue más alegría y sorpresas a su reunión!"
      },
      subtitle: {
        tw: "無需註冊，完全免費，只需輸入參與者名單即可開始",
        cn: "无需注册，完全免费，只需输入参与者名单即可开始",
        en: "No registration needed, completely free, just enter participant list to begin",
        jp: "登録不要、完全無料、参加者リストを入力するだけで開始できます",
        es: "No se necesita registro, completamente gratis, solo ingrese la lista de participantes para comenzar"
      }
    }
  }
};

export default function ArticleContent({ locale }: ArticleContentProps) {
  const lang = locale as 'tw' | 'cn' | 'en' | 'jp' | 'es';
  const faqLang = locale as 'tw' | 'cn' | 'en' | 'jp' | 'es';

  return (
    <>
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
                      <li key={i}>
                        <span className="italic">{option[lang].split(' - ')[0]}</span> - {option[lang].split(' - ')[1]}
                      </li>
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

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-3">{content.whatIs.title[lang]}</h2>
        <div className="space-y-3">
          {content.whatIs.content.map((paragraph, index) => (
            <p key={index}>
              {paragraph[lang]}
            </p>
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
          
          <p className="mt-3">
            {content.whatIs.conclusion[lang]}
          </p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-3">{giftExchangeTranslations.faq.title[faqLang]}</h2>

        <div className="space-y-6">
          {giftExchangeTranslations.faq.questions[faqLang].map((faq, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-blue-700">{faq.question}</h3>
              <p className="mt-2">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-3">{content.whyChooseUs.title[lang]}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-medium text-blue-700">{content.whyChooseUs.features.funInteraction.title[lang]}</h3>
            </div>
            <p className="text-blue-700 text-sm">
              {content.whyChooseUs.features.funInteraction.content[lang]}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-medium text-green-700">{content.whyChooseUs.features.free.title[lang]}</h3>
            </div>
            <p className="text-green-700 text-sm">
              {content.whyChooseUs.features.free.content[lang]}
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="font-medium text-purple-700">{content.whyChooseUs.features.easyToUse.title[lang]}</h3>
            </div>
            <p className="text-purple-700 text-sm">
              {content.whyChooseUs.features.easyToUse.content[lang]}
            </p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              <h3 className="font-medium text-amber-700">{content.whyChooseUs.features.autoSave.title[lang]}</h3>
            </div>
            <p className="text-amber-700 text-sm">
              {content.whyChooseUs.features.autoSave.content[lang]}
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="font-medium text-red-700">{content.whyChooseUs.features.privacy.title[lang]}</h3>
            </div>
            <p className="text-red-700 text-sm">
              {content.whyChooseUs.features.privacy.content[lang]}
            </p>
          </div>
          
          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="font-medium text-cyan-700">{content.whyChooseUs.features.fair.title[lang]}</h3>
            </div>
            <p className="text-cyan-700 text-sm">
              {content.whyChooseUs.features.fair.content[lang]}
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
    </>
  );
}