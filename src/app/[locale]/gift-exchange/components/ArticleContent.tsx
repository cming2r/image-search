'use client';


const content = {
  howToUse: {
    title: {
      zh: "如何使用此工具？",
      en: "How to Use This Tool?",
      jp: "このツールの使い方",
      es: "¿Cómo Usar Esta Herramienta?"
    },
    steps: [
      {
        step: {
          zh: "添加參與者",
          en: "Add Participants",
          jp: "参加者を追加",
          es: "Agregar Participantes"
        },
        description: {
          zh: "輸入所有參與交換禮物的成員名單（可一次輸入多個名字，用空格分隔）",
          en: "Enter all gift exchange participants (you can enter multiple names at once, separated by spaces)",
          jp: "すべてのギフト交換参加者を入力します（複数の名前をスペースで区切って一度に入力できます）",
          es: "Ingrese todos los participantes del intercambio de regalos (puede ingresar múltiples nombres a la vez, separados por espacios)"
        }
      },
      {
        step: {
          zh: "選擇設置",
          en: "Choose Settings",
          jp: "設定を選択",
          es: "Elegir Configuraciones"
        },
        description: {
          zh: "",
          en: "",
          jp: "",
          es: ""
        },
        options: [
          {
            zh: "隨機分佈參與者順序 - 打亂名單順序，增加驚喜感",
            en: "Randomize participant order - Shuffle the list order for more surprise",
            jp: "参加者の順序をランダム化 - リスト順序をシャッフルしてサプライズ感を高める",
            es: "Aleatorizar orden de participantes - Mezclar el orden de la lista para más sorpresa"
          },
          {
            zh: "直接顯示最終結果 - 跳過轉盤過程，直接顯示完整配對結果",
            en: "Show final results directly - Skip the wheel process and display complete matching results",
            jp: "最終結果を直接表示 - ホイールプロセスをスキップして完全なマッチング結果を表示",
            es: "Mostrar resultados finales directamente - Omitir el proceso de la ruleta y mostrar resultados completos de emparejamiento"
          }
        ]
      },
      {
        step: {
          zh: "創建活動",
          en: "Create Event",
          jp: "イベントを作成",
          es: "Crear Evento"
        },
        description: {
          zh: "點擊「開始抽籤」按鈕，系統會自動生成活動連結",
          en: "Click the \"Start Drawing\" button, and the system will automatically generate an event link",
          jp: "「抽選開始」ボタンをクリックすると、システムは自動的にイベントリンクを生成します",
          es: "Haga clic en el botón \"Iniciar Sorteo\", y el sistema generará automáticamente un enlace del evento"
        }
      },
      {
        step: {
          zh: "轉動轉盤",
          en: "Spin the Wheel",
          jp: "ホイールを回す",
          es: "Girar la Ruleta"
        },
        description: {
          zh: "每次轉動會隨機選出一位參與者，系統會按順序記錄結果",
          en: "Each spin randomly selects a participant, and the system records results in sequence",
          jp: "各スピンはランダムに参加者を選択し、システムは順番に結果を記録します",
          es: "Cada giro selecciona aleatoriamente un participante, y el sistema registra los resultados en secuencia"
        }
      },
      {
        step: {
          zh: "查看結果",
          en: "View Results",
          jp: "結果を表示",
          es: "Ver Resultados"
        },
        description: {
          zh: "完成所有抽籤後，可查看完整配對列表，了解誰送禮物給誰",
          en: "After completing all drawings, you can view the complete pairing list to see who gives gifts to whom",
          jp: "すべての抽選が完了すると、完全なペアリストを表示して誰が誰にギフトを贈るかを確認できます",
          es: "Después de completar todos los sorteos, puede ver la lista completa de emparejamientos para saber quién da regalos a quién"
        }
      },
      {
        step: {
          zh: "分享活動",
          en: "Share Event",
          jp: "イベントを共有",
          es: "Compartir Evento"
        },
        description: {
          zh: "使用分享按鈕將活動連結發送給所有參與者，讓大家一起參與互動",
          en: "Use the share button to send the event link to all participants so everyone can join the interaction",
          jp: "共有ボタンを使用してイベントリンクをすべての参加者に送信し、全員が対話に参加できるようにします",
          es: "Use el botón de compartir para enviar el enlace del evento a todos los participantes para que todos puedan unirse a la interacción"
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
      zh: "抽籤結果會自動保存，隨時可以回到活動頁面查看。建議先在活動前設定禮物價格範圍，確保所有參與者準備的禮物價值相近。",
      en: "Drawing results are automatically saved, and you can return to the event page anytime to view them. It's recommended to set a gift price range before the event to ensure all participants prepare gifts of similar value.",
      jp: "抽選結果は自動的に保存され、いつでもイベントページに戻って表示できます。イベント前にギフトの価格帯を設定し、すべての参加者が同様の価値のギフトを準備するようにすることをお勧めします。",
      es: "Los resultados del sorteo se guardan automáticamente, y puede volver a la página del evento en cualquier momento para verlos. Se recomienda establecer un rango de precios de regalos antes del evento para asegurar que todos los participantes preparen regalos de valor similar."
    }
  },
  whatIs: {
    title: {
      zh: "什麼是交換禮物活動？",
      en: "What is a Gift Exchange Event?",
      jp: "ギフト交換イベントとは？",
      es: "¿Qué es un Evento de Intercambio de Regalos?"
    },
    content: [
      {
        zh: "交換禮物（Gift Exchange）是一種深受歡迎的社交活動，特別流行於聖誕節、新年派對、生日慶祝或公司團建活動中。這種活動不僅增進參與者之間的友誼，還能創造共同的美好回憶。",
        en: "Gift Exchange is a popular social activity, especially common at Christmas parties, New Year celebrations, birthday parties, or company team-building events. This activity not only enhances friendship among participants but also creates shared wonderful memories.",
        jp: "ギフト交換は人気のあるソーシャルアクティビティで、特にクリスマスパーティー、新年のお祝い、誕生日パーティー、または会社のチームビルディングイベントで一般的です。このアクティビティは参加者間の友情を深めるだけでなく、共有される素晴らしい思い出も作ります。",
        es: "El Intercambio de Regalos es una actividad social popular, especialmente común en fiestas navideñas, celebraciones de Año Nuevo, fiestas de cumpleaños o eventos de team building de empresas. Esta actividad no solo mejora la amistad entre los participantes sino que también crea recuerdos maravillosos compartidos."
      },
      {
        zh: "活動流程： 每位參與者既是送禮者也是收禮者，通過隨機配對或特定方式決定送禮對象。相比傳統的「每人準備禮物給所有人」方式，交換禮物更經濟實惠且更有驚喜感。",
        en: "Event Process: Each participant is both a gift giver and receiver, with gift recipients determined through random matching or specific methods. Compared to the traditional \"everyone prepares gifts for everyone\" approach, gift exchanges are more economical and more surprising.",
        jp: "イベントプロセス：各参加者はギフトの贈り主であり受け取り手でもあり、ギフトの受取人はランダムマッチングまたは特定の方法で決定されます。従来の「全員が全員にギフトを準備する」アプローチと比較して、ギフト交換はより経済的でよりサプライズ性があります。",
        es: "Proceso del Evento: Cada participante es tanto un dador como un receptor de regalos, con los destinatarios de regalos determinados a través de emparejamiento aleatorio o métodos específicos. Comparado con el enfoque tradicional de \"todos preparan regalos para todos\", los intercambios de regalos son más económicos y sorprendentes."
      }
    ],
    types: {
      title: {
        zh: "交換禮物類型",
        en: "Gift Exchange Types",
        jp: "ギフト交換タイプ",
        es: "Tipos de Intercambio de Regalos"
      },
      items: [
        {
          zh: "普通交換：每人隨機送禮給另一人",
          en: "Standard Exchange: Each person randomly gives a gift to another person",
          jp: "標準交換：各人がランダムに別の人にギフトを贈る",
          es: "Intercambio Estándar: Cada persona aleatoriamente da un regalo a otra persona"
        },
        {
          zh: "秘密聖誕老人：保持送禮者身份保密",
          en: "Secret Santa: The gift giver's identity remains secret",
          jp: "シークレットサンタ：ギフト贈り主の身元は秘密のまま",
          es: "Amigo Secreto: La identidad del dador de regalos permanece en secreto"
        },
        {
          zh: "白象交換：參與者可「搶」別人的禮物",
          en: "White Elephant: Participants can \"steal\" gifts from others",
          jp: "ホワイトエレファント：参加者は他の人からギフトを「盗む」ことができる",
          es: "Elefante Blanco: Los participantes pueden \"robar\" regalos de otros"
        },
        {
          zh: "主題交換：指定禮物類型或主題",
          en: "Themed Exchange: Specific gift types or themes are designated",
          jp: "テーマ交換：特定のギフトタイプやテーマが指定される",
          es: "Intercambio Temático: Se designan tipos o temas específicos de regalos"
        }
      ]
    },
    benefits: {
      title: {
        zh: "活動益處",
        en: "Event Benefits",
        jp: "イベントのメリット",
        es: "Beneficios del Evento"
      },
      items: [
        {
          zh: "增強團隊凝聚力與友誼",
          en: "Strengthens team cohesion and friendship",
          jp: "チームの結束と友情を強化する",
          es: "Fortalece la cohesión del equipo y la amistad"
        },
        {
          zh: "創造愉快的共同記憶",
          en: "Creates pleasant shared memories",
          jp: "楽しい共有記憶を作る",
          es: "Crea memorias compartidas agradables"
        },
        {
          zh: "培養送禮與感恩的文化",
          en: "Cultivates a culture of gift-giving and gratitude",
          jp: "贈り物と感謝の文化を育む",
          es: "Cultiva una cultura de dar regalos y gratitud"
        },
        {
          zh: "是節日活動的完美互動環節",
          en: "Perfect interactive element for holiday activities",
          jp: "休日活動のための完璧なインタラクティブ要素",
          es: "Elemento interactivo perfecto para actividades navideñas"
        }
      ]
    },
    conclusion: {
      zh: "使用我們的轉盤工具進行抽籤，讓整個過程更加公平、有趣且充滿期待，為您的活動增添更多歡樂氣氛和互動性。",
      en: "Using our wheel tool for drawing makes the entire process more fair, fun, and full of anticipation, adding more festive atmosphere and interactivity to your event.",
      jp: "抽選にホイールツールを使用することで、プロセス全体がより公平で楽しく、期待感にあふれ、イベントにお祭り気分とインタラクティブ性を加えます。",
      es: "Usar nuestra herramienta de ruleta para el sorteo hace que todo el proceso sea más justo, divertido y lleno de expectativa, agregando más atmósfera festiva e interactividad a su evento."
    }
  },
  faqs: {
    title: {
      zh: "交換禮物轉盤常見問題",
      en: "Gift Exchange Wheel Frequently Asked Questions",
      jp: "ギフト交換ホイールに関するよくある質問",
      es: "Preguntas Frecuentes sobre la Ruleta de Intercambio de Regalos"
    },
    questions: [
      {
        question: {
          zh: "如何確保轉盤結果的公平性？",
          en: "How is the fairness of wheel results ensured?",
          jp: "ホイール結果の公平性はどのように確保されていますか？",
          es: "¿Cómo se asegura la equidad de los resultados de la ruleta?"
        },
        answer: {
          zh: "我們的轉盤使用Fisher-Yates洗牌算法，確保每次轉動結果都完全隨機且不可預測。轉盤動畫效果不僅增加趣味性，還能讓所有參與者親眼見證抽籤過程的透明度，避免任何疑慮。系統還支持「隨機分佈參與者順序」選項，進一步增強公平性。",
          en: "Our wheel uses the Fisher-Yates shuffling algorithm to ensure each spin result is completely random and unpredictable. The wheel animation effect not only adds fun but also allows all participants to witness the transparency of the drawing process, avoiding any doubts. The system also supports the \"Randomize participant order\" option to further enhance fairness.",
          jp: "当社のホイールはフィッシャー-イェーツシャッフルアルゴリズムを使用して、各スピン結果が完全にランダムで予測不可能であることを確保しています。ホイールのアニメーション効果は楽しさを加えるだけでなく、すべての参加者が抽選プロセスの透明性を目撃できるようにし、疑問を避けます。システムはまた、「参加者の順序をランダム化」オプションをサポートして公平性をさらに強化します。",
          es: "Nuestra ruleta utiliza el algoritmo de barajado Fisher-Yates para asegurar que cada resultado de giro sea completamente aleatorio e impredecible. El efecto de animación de la ruleta no solo añade diversión sino que también permite a todos los participantes presenciar la transparencia del proceso de sorteo, evitando cualquier duda. El sistema también soporta la opción \"Aleatorizar orden de participantes\" para mejorar aún más la equidad."
        }
      },
      {
        question: {
          zh: "如何設置和管理禮物價格範圍？",
          en: "How do I set and manage gift price ranges?",
          jp: "ギフトの価格帯はどのように設定・管理しますか？",
          es: "¿Cómo establezco y gestiono los rangos de precios de regalos?"
        },
        answer: {
          zh: "雖然系統本身不直接設置價格限制，但建議在創建活動時與參與者溝通並達成一致的預算範圍。常見的做法是在開始前商定一個適合所有人的價格區間（例如200或500元）。這能確保所有人的禮物價值相近，避免尷尬情況，讓交換體驗更加公平愉快。",
          en: "While the system itself doesn't directly set price limits, it's recommended to communicate with participants when creating an event and reach a consensus on budget range. A common practice is to agree on a price range suitable for everyone (e.g., $20 or $50) before starting. This ensures all gifts are of similar value, avoids awkward situations, and makes the exchange experience more fair and enjoyable.",
          jp: "システム自体は直接価格制限を設定しませんが、イベントを作成する際に参加者とコミュニケーションを取り、予算範囲に関するコンセンサスに達することをお勧めします。一般的な方法は、開始前に全員に適した価格帯（例：2000円または5000円）に同意することです。これにより、すべてのギフトが同様の価値を持ち、ぎこちない状況を避け、交換体験をより公平で楽しいものにします。",
          es: "Aunque el sistema en sí no establece límites de precio directamente, se recomienda comunicarse con los participantes al crear un evento y llegar a un consenso sobre el rango de presupuesto. Una práctica común es acordar un rango de precios adecuado para todos (por ejemplo, $20 o $50) antes de comenzar. Esto asegura que todos los regalos tengan un valor similar, evita situaciones incómodas y hace que la experiencia de intercambio sea más justa y agradable."
        }
      },
      {
        question: {
          zh: "抽籤結果如何保存和分享？",
          en: "How are drawing results saved and shared?",
          jp: "抽選結果はどのように保存・共有されますか？",
          es: "¿Cómo se guardan y comparten los resultados del sorteo?"
        },
        answer: {
          zh: "所有抽籤結果會自動與您的活動代碼關聯並暫時保存。活動完成後，您可以在結果頁面查看完整的配對清單。同時，系統提供方便的分享功能，您只需點擊分享按鈕，即可將活動連結發送給所有參與者。所有數據會在活動結束一段時間後自動清理，確保您的隱私安全。",
          en: "All drawing results are automatically associated with your event code and temporarily saved. After the event is completed, you can view the complete pairing list on the results page. The system also provides a convenient sharing function - you just need to click the share button to send the event link to all participants. All data will be automatically cleared after a period following the event's end, ensuring your privacy and security.",
          jp: "すべての抽選結果は自動的にイベントコードに関連付けられ、一時的に保存されます。イベント完了後、結果ページで完全なペアリングリストを表示できます。システムは便利な共有機能も提供しています。共有ボタンをクリックするだけで、イベントリンクをすべての参加者に送信できます。すべてのデータはイベント終了後一定期間経過すると自動的にクリアされ、プライバシーとセキュリティを確保します。",
          es: "Todos los resultados del sorteo se asocian automáticamente con su código de evento y se guardan temporalmente. Después de que se complete el evento, puede ver la lista completa de emparejamientos en la página de resultados. El sistema también proporciona una función de compartir conveniente: solo necesita hacer clic en el botón de compartir para enviar el enlace del evento a todos los participantes. Todos los datos se borrarán automáticamente después de un período siguiente al final del evento, asegurando su privacidad y seguridad."
        }
      },
      {
        question: {
          zh: "可以在不同裝置上使用同一個活動嗎？",
          en: "Can I use the same event on different devices?",
          jp: "異なるデバイスで同じイベントを使用できますか？",
          es: "¿Puedo usar el mismo evento en diferentes dispositivos?"
        },
        answer: {
          zh: "是的，我們的系統完全跨平台兼容。您可以在桌面電腦創建活動，然後在手機或平板上繼續進行。所有參與者只需通過分享的連結，就能在任何具有網頁瀏覽器的設備上查看和參與活動。這種靈活性特別適合遠程或混合工作環境下的團隊活動，或是家人朋友間的遠距離交流。",
          en: "Yes, our system is fully cross-platform compatible. You can create an event on a desktop computer and then continue on a phone or tablet. All participants only need the shared link to view and participate in the event on any device with a web browser. This flexibility is particularly suitable for team activities in remote or hybrid work environments, or for long-distance communication between family and friends.",
          jp: "はい、当社のシステムは完全にクロスプラットフォーム互換です。デスクトップコンピュータでイベントを作成し、その後スマートフォンやタブレットで続行できます。すべての参加者は共有リンクのみで、ウェブブラウザを備えた任意のデバイスでイベントを表示・参加できます。この柔軟性は、リモートまたはハイブリッドワーク環境でのチームアクティビティ、または家族や友人間の長距離コミュニケーションに特に適しています。",
          es: "Sí, nuestro sistema es completamente compatible entre plataformas. Puede crear un evento en una computadora de escritorio y luego continuar en un teléfono o tableta. Todos los participantes solo necesitan el enlace compartido para ver y participar en el evento en cualquier dispositivo con un navegador web. Esta flexibilidad es particularmente adecuada para actividades de equipo en entornos de trabajo remoto o híbrido, o para comunicación a larga distancia entre familiares y amigos."
        }
      },
      {
        question: {
          zh: "可以取消或修改已完成的抽籤嗎？",
          en: "Can I cancel or modify completed drawings?",
          jp: "完了した抽選をキャンセルまたは変更できますか？",
          es: "¿Puedo cancelar o modificar sorteos completados?"
        },
        answer: {
          zh: "為保證公平性，一旦配對完成，系統目前不支持直接修改抽籤結果。不過，您可以選擇創建新的活動並重新抽籤。如有特殊情況，例如某位參與者無法繼續參加，建議在線下協商替代方案，或利用「隨機分佈」和「直接顯示結果」功能快速創建新的抽籤活動。",
          en: "To ensure fairness, once pairing is complete, the system currently doesn't support directly modifying drawing results. However, you can choose to create a new event and redraw. In special circumstances, such as when a participant can no longer attend, it's recommended to negotiate alternative solutions offline or use the \"Randomize\" and \"Show final results directly\" functions to quickly create a new drawing event.",
          jp: "公平性を確保するため、ペアリング完了後、システムは現在抽選結果を直接変更することをサポートしていません。ただし、新しいイベントを作成して再抽選することもできます。特別な状況、例えば参加者が参加できなくなった場合など、オフラインで代替案を交渉するか、「ランダム化」と「最終結果を直接表示」機能を使用して新しい抽選イベントを迅速に作成することをお勧めします。",
          es: "Para asegurar la equidad, una vez que se completa el emparejamiento, el sistema actualmente no soporta modificar directamente los resultados del sorteo. Sin embargo, puede elegir crear un nuevo evento y volver a sortear. En circunstancias especiales, como cuando un participante ya no puede asistir, se recomienda negociar soluciones alternativas fuera de línea o usar las funciones \"Aleatorizar\" y \"Mostrar resultados finales directamente\" para crear rápidamente un nuevo evento de sorteo."
        }
      }
    ]
  },
  whyChooseUs: {
    title: {
      zh: "為什麼選擇我們的交換禮物轉盤工具？",
      en: "Why Choose Our Gift Exchange Wheel Tool?",
      jp: "なぜ私たちのギフト交換ホイールツールを選ぶのか？",
      es: "¿Por Qué Elegir Nuestra Herramienta de Ruleta de Intercambio de Regalos?"
    },
    features: {
      funInteraction: {
        title: {
          zh: "有趣互動體驗",
          en: "Fun Interactive Experience",
          jp: "楽しいインタラクティブ体験",
          es: "Experiencia Interactiva Divertida"
        },
        content: {
          zh: "精心設計的轉盤動畫增添樂趣和期待感，比傳統紙條抽籤更具參與感，適合團體場合使用和線上分享。",
          en: "Carefully designed wheel animations add fun and anticipation, with more engagement than traditional paper drawing, suitable for group settings and online sharing.",
          jp: "慎重に設計されたホイールアニメーションが楽しさと期待感を加え、従来の紙の抽選よりも魅力的で、グループ設定やオンライン共有に適しています。",
          es: "Las animaciones de ruleta cuidadosamente diseñadas añaden diversión y expectativa, con más participación que el sorteo tradicional en papel, adecuado para configuraciones grupales y compartir en línea."
        }
      },
      free: {
        title: {
          zh: "完全免費使用",
          en: "Completely Free",
          jp: "完全無料",
          es: "Completamente Gratis"
        },
        content: {
          zh: "我們承諾所有功能完全免費，無任何隱藏費用或限制，不顯示廣告，讓您專注於活動體驗。",
          en: "We promise all features are completely free, with no hidden fees or restrictions, no advertisements, letting you focus on the event experience.",
          jp: "すべての機能が完全に無料で、隠れた料金や制限がなく、広告もないため、イベント体験に集中できます。",
          es: "Prometemos que todas las funciones son completamente gratuitas, sin tarifas ocultas o restricciones, sin anuncios, permitiéndole enfocarse en la experiencia del evento."
        }
      },
      easyToUse: {
        title: {
          zh: "簡單易用",
          en: "Simple and User-Friendly",
          jp: "シンプルで使いやすい",
          es: "Simple y Fácil de Usar"
        },
        content: {
          zh: "直觀友好的界面設計，無需技術知識即可上手。從設置到分享結果，整個流程簡潔清晰，適合各年齡層用戶。",
          en: "Intuitive, friendly interface design requires no technical knowledge to use. From setup to sharing results, the entire process is concise and clear, suitable for users of all ages.",
          jp: "直感的でフレンドリーなインターフェースデザインは、使用するための技術的知識を必要としません。設定から結果の共有まで、全過程は簡潔で明確、あらゆる年齢のユーザーに適しています。",
          es: "El diseño de interfaz intuitivo y amigable no requiere conocimientos técnicos para usar. Desde la configuración hasta compartir resultados, todo el proceso es conciso y claro, adecuado para usuarios de todas las edades."
        }
      },
      autoSave: {
        title: {
          zh: "結果自動保存",
          en: "Auto-Save Results",
          jp: "結果の自動保存",
          es: "Guardado Automático de Resultados"
        },
        content: {
          zh: "自動記錄所有抽籤結果，活動結束後可隨時查看完整配對清單，無需擔心遺忘或記錯。",
          en: "Automatically records all drawing results, allowing you to view the complete pairing list anytime after the event, without worrying about forgetting or misremembering.",
          jp: "すべての抽選結果を自動的に記録し、イベント後いつでも完全なペアリングリストを表示でき、忘れたり誤って覚えたりする心配がありません。",
          es: "Registra automáticamente todos los resultados del sorteo, permitiéndole ver la lista completa de emparejamientos en cualquier momento después del evento, sin preocuparse por olvidar o recordar mal."
        }
      },
      privacy: {
        title: {
          zh: "隱私保護",
          en: "Privacy Protection",
          jp: "プライバシー保護",
          es: "Protección de Privacidad"
        },
        content: {
          zh: "無需註冊帳號或提供個人資料，活動數據僅在必要時間內保存，確保您的隱私安全不受侵犯。",
          en: "No need to register an account or provide personal information, event data is only stored for the necessary time, ensuring your privacy is not invaded.",
          jp: "アカウント登録や個人情報の提供は不要、イベントデータは必要な時間だけ保存され、プライバシーが侵害されないことを保証します。",
          es: "No es necesario registrar una cuenta o proporcionar información personal, los datos del evento solo se almacenan durante el tiempo necesario, asegurando que su privacidad no sea invadida."
        }
      },
      fair: {
        title: {
          zh: "公平隨機",
          en: "Fair and Random",
          jp: "公平でランダム",
          es: "Justo y Aleatorio"
        },
        content: {
          zh: "採用高品質隨機算法，確保抽籤過程完全公平公正，提供多種設置選項滿足不同活動需求。",
          en: "Uses high-quality random algorithms to ensure the drawing process is completely fair and just, providing various setting options to meet different event needs.",
          jp: "高品質なランダムアルゴリズムを使用して抽選プロセスが完全に公平かつ正当であることを確保し、異なるイベントニーズを満たすためのさまざまな設定オプションを提供します。",
          es: "Utiliza algoritmos aleatorios de alta calidad para asegurar que el proceso de sorteo sea completamente justo y equitativo, proporcionando varias opciones de configuración para satisfacer diferentes necesidades de eventos."
        }
      }
    },
    callToAction: {
      title: {
        zh: "立即開始您的交換禮物活動，為您的聚會增添更多歡樂與驚喜！",
        en: "Start your gift exchange event now and add more joy and surprises to your gathering!",
        jp: "今すぐギフト交換イベントを開始し、集まりにさらなる喜びとサプライズを追加しましょう！",
        es: "¡Comience su evento de intercambio de regalos ahora y agregue más alegría y sorpresas a su reunión!"
      },
      subtitle: {
        zh: "無需註冊，完全免費，只需輸入參與者名單即可開始",
        en: "No registration needed, completely free, just enter participant list to begin",
        jp: "登録不要、完全無料、参加者リストを入力するだけで開始できます",
        es: "No se necesita registro, completamente gratis, solo ingrese la lista de participantes para comenzar"
      }
    }
  }
};

interface ArticleContentProps {
  locale: string;
}

export default function ArticleContent({ locale }: ArticleContentProps) {
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';

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
        <h2 className="text-xl font-bold mb-3">{content.faqs.title[lang]}</h2>
        
        <div className="space-y-6">
          {content.faqs.questions.map((faq, index) => (
            <div key={index} className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-medium text-blue-700">{faq.question[lang]}</h3>
              <p className="mt-2">
                {faq.answer[lang]}
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