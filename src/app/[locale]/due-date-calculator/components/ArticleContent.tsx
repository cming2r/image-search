'use client';

import PregnancyTimeline from "./PregnancyTimeline";

interface ArticleContentProps {
  locale: string;
  currentWeeks: number;
}

const content = {
  toolFeatures: {
    title: {
      zh: "關於預產期計算器工具特色：",
      en: "About the Due Date Calculator Features:",
      jp: "予定日計算機の機能について：",
      es: "Acerca de las Características de la Calculadora de Fecha de Parto:"
    },
    features: [
      {
        zh: "輸入最後一次月經日期，自動計算預產期",
        en: "Enter your last menstrual period date to automatically calculate due date",
        jp: "最後の月経日を入力して自動的に予定日を計算",
        es: "Ingrese la fecha de su último período menstrual para calcular automáticamente la fecha de parto"
      },
      {
        zh: "顯示當前懷孕週數和天數",
        en: "Display current pregnancy week and days",
        jp: "現在の妊娠週数と日数を表示",
        es: "Mostrar las semanas y días actuales del embarazo"
      },
      {
        zh: "互動式懷孕日曆，清晰標示重要日期",
        en: "Interactive pregnancy calendar clearly marking important dates",
        jp: "インタラクティブな妊娠カレンダーで重要な日付を明確に表示",
        es: "Calendario interactivo del embarazo que marca claramente las fechas importantes"
      },
      {
        zh: "輕鬆查看過去和未來各個月份的懷孕進程",
        en: "Easily view past and future pregnancy progress by month",
        jp: "過去と未来の各月の妊娠経過を簡単に確認",
        es: "Vea fácilmente el progreso del embarazo pasado y futuro por mes"
      }
    ]
  },
  weekCalculation: {
    title: {
      zh: "孕期週數怎麼算",
      en: "How Pregnancy Weeks Are Calculated",
      jp: "妊娠週数の計算方法",
      es: "Cómo se Calculan las Semanas de Embarazo"
    },
    content: {
      zh: "孕期以最後一次經期的第一天開始計算，到預產期約為40週。因此，通常知道自己懷孕時，大概都已到第5週或第六週。若有規劃備孕，建議用手機的「健康」軟體，紀錄自己每一次的月經週期。當第一次看婦產科時，醫生通常會詢問上一次月經的第一天為幾月幾號，依此來計算預產期。",
      en: "Pregnancy is calculated starting from the first day of your last menstrual period, with the due date approximately 40 weeks later. Therefore, by the time most women know they're pregnant, they're typically at week 5 or 6. If you're planning for pregnancy, it's recommended to use your phone's 'Health' app to record your menstrual cycles. During your first obstetrics visit, the doctor will usually ask for the first day of your last period to calculate your due date.",
      jp: "妊娠は最後の月経の初日から計算され、予定日まで約40週間です。そのため、通常妊娠を知った時には、すでに5週目または6週目になっています。妊娠を計画している場合は、スマートフォンの「ヘルス」アプリを使用して月経周期を記録することをお勧めします。初回の産科受診時、医師は通常最後の月経の初日がいつかを尋ね、これに基づいて予定日を計算します。",
      es: "El embarazo se calcula desde el primer día de su último período menstrual, con la fecha de parto aproximadamente 40 semanas después. Por lo tanto, para cuando la mayoría de las mujeres saben que están embarazadas, típicamente están en la semana 5 o 6. Si está planificando un embarazo, se recomienda usar la aplicación 'Salud' de su teléfono para registrar sus ciclos menstruales. Durante su primera visita obstétrica, el médico usualmente preguntará por el primer día de su último período para calcular su fecha de parto."
    }
  },
  dueDateCalculation: {
    title: {
      zh: "預產期計算方式",
      en: "Due Date Calculation Method",
      jp: "予定日の計算方法",
      es: "Método de Cálculo de la Fecha de Parto"
    },
    content1: {
      zh: "懷孕預產期的計算通常採用內格萊氏法則（Naegele's rule），這是由德國婦產科醫生 Franz Karl Naegele 發明的方法。",
      en: "Pregnancy due date calculation typically uses Naegele's rule, a method invented by German obstetrician Franz Karl Naegele.",
      jp: "妊娠予定日の計算は通常、ドイツの産婦人科医Franz Karl Naegelによって発明されたネーゲレ法則（Naegele's rule）を使用します。",
      es: "El cálculo de la fecha de parto del embarazo típicamente utiliza la regla de Naegele, un método inventado por el obstetra alemán Franz Karl Naegele."
    },
    content2: {
      zh: "計算方式是以最後一次月經的第一天（Last Menstrual Period，LMP）為基準，加上一年，減三個月，加上七天，即可得出預估的分娩日期EDD（Estimated Date of Delivery）。",
      en: "The calculation is based on the first day of the Last Menstrual Period (LMP), adding one year, subtracting three months, and adding seven days to obtain the Estimated Date of Delivery (EDD).",
      jp: "計算方法は、最後の月経の初日（Last Menstrual Period、LMP）を基準に、1年を加え、3ヶ月を減らし、7日を加えて、推定分娩日EDD（Estimated Date of Delivery）を得ます。",
      es: "El cálculo se basa en el primer día del Último Período Menstrual (LMP), agregando un año, restando tres meses y agregando siete días para obtener la Fecha Estimada de Parto (EDD)."
    },
    content3: {
      zh: "例如最後一次月經第一天為6月1號，「減三個月加上七天加一年」則為隔年3月8日。",
      en: "For example, if the first day of your last period was June 1st, \"subtract three months, add seven days, and add one year\" results in March 8th of the following year.",
      jp: "例えば、最後の月経の初日が6月1日の場合、「3ヶ月を減らし、7日を加え、1年を加える」と翌年の3月8日になります。",
      es: "Por ejemplo, si el primer día de su último período fue el 1 de junio, 'restar tres meses, agregar siete días y agregar un año' resulta en el 8 de marzo del año siguiente."
    },
    content4: {
      zh: "一般來說，預產期大約40個星期，因此將最後一次月經的第一天加上280天，可得到跟Naegele's rule計算一樣的結果。這也就是估計的分娩日期（Estimated Date of Delivery, EDD）。",
      en: "Generally, the due date is about 40 weeks, so adding 280 days to the first day of your last period yields the same result as Naegele's rule. This is the Estimated Date of Delivery (EDD).",
      jp: "一般的に、予定日は約40週間なので、最後の月経の初日に280日を加えると、ネーゲレ法則と同じ結果が得られます。これが推定分娩日（Estimated Date of Delivery, EDD）です。",
      es: "En general, la fecha de parto es aproximadamente 40 semanas, por lo que agregar 280 días al primer día de su último período produce el mismo resultado que la regla de Naegele. Esta es la Fecha Estimada de Parto (EDD)."
    },
    note: {
      zh: "註：本方法假設月經週期為28天，而排卵和受精在第14天發生。",
      en: "Note: This method assumes a 28-day menstrual cycle with ovulation and fertilization occurring on day 14.",
      jp: "注：この方法は28日の月経周期を仮定し、排卵と受精が14日目に起こることを前提としています。",
      es: "Nota: Este método asume un ciclo menstrual de 28 días con ovulación y fertilización ocurriendo en el día 14."
    }
  },
  pregnancyPrecautions: {
    title: {
      zh: "孕期注意事項",
      en: "Pregnancy Precautions",
      jp: "妊娠中の注意事項",
      es: "Precauciones durante el Embarazo"
    },
    content: {
      zh: "懷孕期間可以劃分成三個階段，分別為妊娠第一期（未滿13週）、妊娠第二期（13-29週）、妊娠第三期（29週以上）。",
      en: "Pregnancy can be divided into three stages: the first trimester (before 13 weeks), the second trimester (13-29 weeks), and the third trimester (over 29 weeks).",
      jp: "妊娠期間は3つの段階に分けることができます：第1三半期（13週未満）、第2三半期（13-29週）、第3三半期（29週以上）。",
      es: "El embarazo se puede dividir en tres etapas: el primer trimestre (antes de las 13 semanas), el segundo trimestre (13-29 semanas) y el tercer trimestre (más de 29 semanas)."
    },
    generalPrecautions: [
      {
        zh: "定期產檢追蹤",
        en: "Regular prenatal check-ups",
        jp: "定期的な産前チェックアップ",
        es: "Controles prenatales regulares"
      },
      {
        zh: "穿著透氣舒適孕婦裝",
        en: "Wear breathable, comfortable maternity clothes",
        jp: "通気性の良い快適なマタニティウェアを着用",
        es: "Usar ropa de maternidad cómoda y transpirable"
      },
      {
        zh: "保持心情愉悅",
        en: "Maintain a positive mood",
        jp: "前向きな気持ちを保つ",
        es: "Mantener un estado de ánimo positivo"
      },
      {
        zh: "避免二手菸暴露",
        en: "Avoid secondhand smoke exposure",
        jp: "受動喫煙を避ける",
        es: "Evitar la exposición al humo de segunda mano"
      }
    ],
    firstTrimester: {
      title: {
        zh: "第一孕期 (未滿13週)",
        en: "First Trimester (Before 13 weeks)",
        jp: "第1三半期（13週未満）",
        es: "Primer Trimestre (Antes de las 13 semanas)"
      },
      diet: {
        title: {
          zh: "飲食",
          en: "Diet",
          jp: "食事",
          es: "Dieta"
        },
        items: [
          {
            zh: "葉酸補充",
            en: "Folic acid supplements",
            jp: "葉酸サプリメント",
            es: "Suplementos de ácido fólico"
          },
          {
            zh: "避免生食",
            en: "Avoid raw food",
            jp: "生食を避ける",
            es: "Evitar alimentos crudos"
          },
          {
            zh: "每日8杯水",
            en: "8 glasses of water daily",
            jp: "1日8杯の水",
            es: "8 vasos de agua diarios"
          }
        ]
      },
      discomfort: {
        title: {
          zh: "不適處理",
          en: "Managing Discomfort",
          jp: "不快感への対処",
          es: "Manejo de Molestias"
        },
        items: [
          {
            zh: "緩解孕吐",
            en: "Relieving morning sickness",
            jp: "つわりの緩和",
            es: "Aliviar las náuseas matutinas"
          },
          {
            zh: "處理頻尿",
            en: "Managing frequent urination",
            jp: "頻尿への対処",
            es: "Manejar la micción frecuente"
          }
        ]
      },
      exercise: {
        title: {
          zh: "運動",
          en: "Exercise",
          jp: "運動",
          es: "Ejercicio"
        },
        items: [
          {
            zh: "溫和散步",
            en: "Gentle walking",
            jp: "軽い散歩",
            es: "Caminata suave"
          },
          {
            zh: "孕婦瑜珈",
            en: "Prenatal yoga",
            jp: "マタニティヨガ",
            es: "Yoga prenatal"
          }
        ]
      }
    },
    secondTrimester: {
      title: {
        zh: "第二孕期 (13-29週)",
        en: "Second Trimester (13-29 weeks)",
        jp: "第2三半期（13-29週）",
        es: "Segundo Trimestre (13-29 semanas)"
      },
      diet: {
        title: {
          zh: "飲食",
          en: "Diet",
          jp: "食事",
          es: "Dieta"
        },
        items: [
          {
            zh: "增加蛋白質",
            en: "Increase protein intake",
            jp: "タンパク質摂取量を増やす",
            es: "Aumentar la ingesta de proteínas"
          },
          {
            zh: "補充鈣質、鐵質",
            en: "Supplement calcium and iron",
            jp: "カルシウムと鉄分の補給",
            es: "Suplementar calcio y hierro"
          }
        ]
      },
      weight: {
        title: {
          zh: "體重管理",
          en: "Weight Management",
          jp: "体重管理",
          es: "Control de Peso"
        },
        items: [
          {
            zh: "每週增重0.3-0.5kg",
            en: "Weekly weight gain of 0.3-0.5kg",
            jp: "週0.3-0.5kgの体重増加",
            es: "Aumento de peso semanal de 0.3-0.5kg"
          }
        ]
      },
      skin: {
        title: {
          zh: "皮膚護理",
          en: "Skin Care",
          jp: "スキンケア",
          es: "Cuidado de la Piel"
        },
        items: [
          {
            zh: "預防妊娠紋",
            en: "Prevent stretch marks",
            jp: "妊娠線の予防",
            es: "Prevenir estrías"
          },
          {
            zh: "處理搔癢",
            en: "Manage itching",
            jp: "かゆみへの対処",
            es: "Manejar la picazón"
          }
        ]
      }
    },
    thirdTrimester: {
      title: {
        zh: "第三孕期 (29週以上)",
        en: "Third Trimester (Over 29 weeks)",
        jp: "第3三半期（29週以上）",
        es: "Tercer Trimestre (Más de 29 semanas)"
      },
      diet: {
        title: {
          zh: "飲食",
          en: "Diet",
          jp: "食事",
          es: "Dieta"
        },
        items: [
          {
            zh: "少量多餐",
            en: "Small, frequent meals",
            jp: "少量頻回食",
            es: "Comidas pequeñas y frecuentes"
          },
          {
            zh: "避免過度增重",
            en: "Avoid excessive weight gain",
            jp: "過度な体重増加を避ける",
            es: "Evitar el aumento excesivo de peso"
          }
        ]
      },
      sleep: {
        title: {
          zh: "睡眠",
          en: "Sleep",
          jp: "睡眠",
          es: "Sueño"
        },
        items: [
          {
            zh: "左側臥",
            en: "Left side sleeping position",
            jp: "左側臥位",
            es: "Posición de sueño del lado izquierdo"
          },
          {
            zh: "使用托腹枕",
            en: "Use a pregnancy pillow",
            jp: "妊娠用枕の使用",
            es: "Usar una almohada para embarazadas"
          }
        ]
      },
      observation: {
        title: {
          zh: "觀察",
          en: "Monitoring",
          jp: "観察",
          es: "Monitoreo"
        },
        items: [
          {
            zh: "胎動計數",
            en: "Count fetal movements",
            jp: "胎動カウント",
            es: "Contar movimientos fetales"
          },
          {
            zh: "注意水腫",
            en: "Watch for swelling",
            jp: "むくみに注意",
            es: "Vigilar la hinchazón"
          }
        ]
      }
    }
  },
  prenatalCheckup: {
    title: {
      zh: "產前定期檢查",
      en: "Regular Prenatal Check-ups",
      jp: "定期産前検査",
      es: "Controles Prenatales Regulares"
    },
    content1: {
      zh: "在懷孕期間，產前定期檢查可以幫助診斷孕婦和寶寶的健康，及時發現問題（如果出現的話），並預防分娩過程中的併發症。",
      en: "During pregnancy, regular prenatal check-ups help diagnose the health of both mother and baby, promptly identify any issues (if they arise), and prevent complications during delivery.",
      jp: "妊娠中、定期的な産前検査は母親と赤ちゃんの健康を診断し、問題があれば迅速に発見し、分娩中の合併症を予防するのに役立ちます。",
      es: "Durante el embarazo, los controles prenatales regulares ayudan a diagnosticar la salud tanto de la madre como del bebé, identificar rápidamente cualquier problema (si surge) y prevenir complicaciones durante el parto."
    },
    content2: {
      zh: "根據",
      en: "According to the",
      jp: "によると",
      es: "Según la"
    },
    source: {
      zh: "美國婦女健康辦公室(OWH，隸屬於美國衛生及公共服務部HHS)",
      en: "Office on Women's Health (OWH, part of the US Department of Health and Human Services)",
      jp: "アメリカ女性健康局（OWH、アメリカ保健福祉省の一部）",
      es: "Oficina de Salud de la Mujer (OWH, parte del Departamento de Salud y Servicios Humanos de EE.UU.)"
    },
    content3: {
      zh: "的建議，正常產檢的頻率為：",
      en: "the recommended frequency for normal prenatal check-ups is:",
      jp: "の推奨により、通常の産前検査の頻度は：",
      es: "la frecuencia recomendada para controles prenatales normales es:"
    },
    checkupFrequency: [
      {
        zh: "第4週到第28週期間，每月一次",
        en: "Between weeks 4 and 28, once a month",
        jp: "第4週から第28週まで、月1回",
        es: "Entre las semanas 4 y 28, una vez al mes"
      },
      {
        zh: "第28週到第36週期間，每月兩次",
        en: "Between weeks 28 and 36, twice a month",
        jp: "第28週から第36週まで、月2回",
        es: "Entre las semanas 28 y 36, dos veces al mes"
      },
      {
        zh: "第36週到分娩期間，每週一次",
        en: "From week 36 until delivery, once a week",
        jp: "第36週から分娩まで、週1回",
        es: "Desde la semana 36 hasta el parto, una vez por semana"
      }
    ],
    note: {
      zh: "註：高風險妊娠的孕婦可能需要更頻繁地產前護理。",
      en: "Note: Women with high-risk pregnancies may need more frequent prenatal care.",
      jp: "注：高リスク妊娠の女性は、より頻繁な産前ケアが必要な場合があります。",
      es: "Nota: Las mujeres con embarazos de alto riesgo pueden necesitar atención prenatal más frecuente."
    }
  },
  highRiskPregnancy: {
    title: {
      zh: "高風險妊娠的孕婦",
      en: "High-Risk Pregnancy",
      jp: "ハイリスク妊娠",
      es: "Embarazo de Alto Riesgo"
    },
    content1: {
      zh: "「高風險妊娠」並不代表會出現問題，而是較高併發症機率的風險，根據",
      en: "A 'high-risk pregnancy' doesn't necessarily mean problems will occur, but rather indicates a higher probability of complications. According to the",
      jp: "「ハイリスク妊娠」は必ずしも問題が起こることを意味するのではなく、むしろ合併症の確率が高いことを示しています。",
      es: "Un 'embarazo de alto riesgo' no necesariamente significa que ocurrirán problemas, sino que indica una mayor probabilidad de complicaciones. Según la"
    },
    source: {
      zh: "美國婦女健康辦公室(OWH)",
      en: "Office on Women's Health (OWH)",
      jp: "アメリカ女性健康局（OWH）",
      es: "Oficina de Salud de la Mujer (OWH)"
    },
    content2: {
      zh: "，以下因素可能會增加懷孕期間出現問題的風險：",
      en: "the following factors may increase the risk of problems during pregnancy:",
      jp: "によると、以下の要因が妊娠中の問題のリスクを高める可能性があります：",
      es: "los siguientes factores pueden aumentar el riesgo de problemas durante el embarazo:"
    },
    riskFactors: [
      {
        zh: "年齡過小或超過35歲",
        en: "Being very young or over 35 years old",
        jp: "非常に若いか35歳以上",
        es: "Ser muy joven o mayor de 35 años"
      },
      {
        zh: "體重過重或過輕",
        en: "Being overweight or underweight",
        jp: "体重過多または過少",
        es: "Tener sobrepeso o bajo peso"
      },
      {
        zh: "既往妊娠出現問題",
        en: "Having had problems in previous pregnancies",
        jp: "過去の妊娠で問題があった",
        es: "Haber tenido problemas en embarazos anteriores"
      },
      {
        zh: "懷孕前就存在的健康問題，如高血壓、糖尿病、自身免疫疾病、癌症和HIV",
        en: "Pre-existing health conditions such as high blood pressure, diabetes, autoimmune diseases, cancer, and HIV",
        jp: "高血圧、糖尿病、自己免疫疾患、がん、HIVなどの既存の健康状態",
        es: "Condiciones de salud preexistentes como presión arterial alta, diabetes, enfermedades autoinmunes, cáncer y VIH"
      },
      {
        zh: "雙胞胎或多胞胎",
        en: "Carrying twins or multiples",
        jp: "双子または多胎妊娠",
        es: "Embarazo de gemelos o múltiples"
      }
    ],
    content3: {
      zh: "在懷孕期間也可能會出現高風險妊娠的健康問題，例如妊娠糖尿病或子癇前症。",
      en: "Health issues that may lead to high-risk pregnancy can also develop during pregnancy, such as gestational diabetes or preeclampsia.",
      jp: "妊娠糖尿病や子癇前症など、ハイリスク妊娠につながる健康問題は妊娠中にも発症する可能性があります。",
      es: "Los problemas de salud que pueden llevar a un embarazo de alto riesgo también pueden desarrollarse durante el embarazo, como la diabetes gestacional o la preeclampsia."
    },
    content4: {
      zh: "若有任何高風險妊娠的疑慮，可以向醫生諮詢，醫生可以解釋風險程度以及實際出現問題的可能性。",
      en: "If you have any concerns about high-risk pregnancy, consult your doctor, who can explain the level of risk and the actual likelihood of problems occurring.",
      jp: "ハイリスク妊娠について心配がある場合は、医師に相談してください。医師はリスクのレベルと実際に問題が発生する可能性を説明できます。",
      es: "Si tiene alguna preocupación sobre un embarazo de alto riesgo, consulte a su médico, quien puede explicar el nivel de riesgo y la probabilidad real de que ocurran problemas."
    }
  }
};

export default function ArticleContent({ locale, currentWeeks }: ArticleContentProps) {
  const lang = locale as 'zh' | 'en' | 'jp' | 'es';

  return (
    <>
      {/* 說明區 */}
      <div className="content-section mb-6">
        <h2>{content.toolFeatures.title[lang]}</h2>
        <ul>
          {content.toolFeatures.features.map((feature, index) => (
            <li key={index}>{feature[lang]}</li>
          ))}
        </ul>
      </div>
      
      {/* 預產期說明區 */}
      <div className="content-section mb-6">
        <h2>{content.weekCalculation.title[lang]}</h2>
        <p>
          {content.weekCalculation.content[lang]}
        </p>
        
        <h2>{content.dueDateCalculation.title[lang]}</h2>
        <p>
          {content.dueDateCalculation.content1[lang]}
        </p>
        <p>
          {content.dueDateCalculation.content2[lang]}
        </p>
        <p>
          {content.dueDateCalculation.content3[lang]}
        </p>
        <p>
          {content.dueDateCalculation.content4[lang]}
        </p>
        <p className="italic text-gray-600">
          {content.dueDateCalculation.note[lang]}
        </p>
        
        <h2>{content.pregnancyPrecautions.title[lang]}</h2>
        <p>
          {content.pregnancyPrecautions.content[lang]}
        </p>
        
        <PregnancyTimeline currentWeeks={currentWeeks} />
        
        <ul className="mb-4">
          {content.pregnancyPrecautions.generalPrecautions.map((precaution, index) => (
            <li key={index}>{precaution[lang]}</li>
          ))}
        </ul>
        
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">{content.pregnancyPrecautions.firstTrimester.title[lang]}</h3>
            <h4 className="font-medium">{content.pregnancyPrecautions.firstTrimester.diet.title[lang]}</h4>
            <ul className="mb-2">
              {content.pregnancyPrecautions.firstTrimester.diet.items.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>
            <h4 className="font-medium">{content.pregnancyPrecautions.firstTrimester.discomfort.title[lang]}</h4>
            <ul className="mb-2">
              {content.pregnancyPrecautions.firstTrimester.discomfort.items.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>
            <h4 className="font-medium">{content.pregnancyPrecautions.firstTrimester.exercise.title[lang]}</h4>
            <ul>
              {content.pregnancyPrecautions.firstTrimester.exercise.items.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">{content.pregnancyPrecautions.secondTrimester.title[lang]}</h3>
            <h4 className="font-medium">{content.pregnancyPrecautions.secondTrimester.diet.title[lang]}</h4>
            <ul className="mb-2">
              {content.pregnancyPrecautions.secondTrimester.diet.items.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>
            <h4 className="font-medium">{content.pregnancyPrecautions.secondTrimester.weight.title[lang]}</h4>
            <ul className="mb-2">
              {content.pregnancyPrecautions.secondTrimester.weight.items.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>
            <h4 className="font-medium">{content.pregnancyPrecautions.secondTrimester.skin.title[lang]}</h4>
            <ul>
              {content.pregnancyPrecautions.secondTrimester.skin.items.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">{content.pregnancyPrecautions.thirdTrimester.title[lang]}</h3>
            <h4 className="font-medium">{content.pregnancyPrecautions.thirdTrimester.diet.title[lang]}</h4>
            <ul className="mb-2">
              {content.pregnancyPrecautions.thirdTrimester.diet.items.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>
            <h4 className="font-medium">{content.pregnancyPrecautions.thirdTrimester.sleep.title[lang]}</h4>
            <ul className="mb-2">
              {content.pregnancyPrecautions.thirdTrimester.sleep.items.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>
            <h4 className="font-medium">{content.pregnancyPrecautions.thirdTrimester.observation.title[lang]}</h4>
            <ul>
              {content.pregnancyPrecautions.thirdTrimester.observation.items.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <h2>{content.prenatalCheckup.title[lang]}</h2>
        <p>
          {content.prenatalCheckup.content1[lang]}
        </p>
        <p>
          {content.prenatalCheckup.content2[lang]}
          <a href="https://womenshealth.gov/pregnancy/youre-pregnant-now-what/prenatal-care-and-tests" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline font-semibold underline" aria-label="美國婦女健康辦公室網站，將在新視窗開啟">
            {content.prenatalCheckup.source[lang]}
          </a>
          {content.prenatalCheckup.content3[lang]}
        </p>
        <ul className="mb-2">
          {content.prenatalCheckup.checkupFrequency.map((frequency, index) => (
            <li key={index}>{frequency[lang]}</li>
          ))}
        </ul>
        <p className="italic text-gray-600">
          {content.prenatalCheckup.note[lang]}
        </p>
        
        <h2>{content.highRiskPregnancy.title[lang]}</h2>
        <p>
          {content.highRiskPregnancy.content1[lang]}
          <a href="https://womenshealth.gov/pregnancy/youre-pregnant-now-what/prenatal-care-and-tests#6" target="_blank" rel="noopener noreferrer" className="text-blue-800 hover:underline font-semibold underline" aria-label="美國婦女健康辦公室(OWH)網站，將在新視窗開啟">
            {content.highRiskPregnancy.source[lang]}
          </a>
          {content.highRiskPregnancy.content2[lang]}
        </p>
        <ul className="mb-2">
          {content.highRiskPregnancy.riskFactors.map((factor, index) => (
            <li key={index}>{factor[lang]}</li>
          ))}
        </ul>
        <p>
          {content.highRiskPregnancy.content3[lang]}
        </p>
        <p>
          {content.highRiskPregnancy.content4[lang]}
        </p>
      </div>
    </>
  );
}