'use client';

import { FC } from 'react';

// 多語言文章內容配置
const articleTranslations = {
  title: {
    tw: "關於顏色選擇器",
    cn: "关于颜色选择器",
    en: "About Color Picker",
    jp: "カラーピッカーについて",
    es: "Acerca del Selector de Color"
  },
  content: [
    {
      tw: "顏色選擇器是一個實用的線上工具，專為設計師、開發者和創作者設計。無論您是在進行網頁設計、UI界面設計，還是品牌色彩搭配，我們的工具都能幫助您快速選擇和轉換顏色格式。",
      cn: "颜色选择器是一个实用的在线工具，专为设计师、开发者和创作者设计。无论您是在进行网页设计、UI界面设计，还是品牌色彩搭配，我们的工具都能帮助您快速选择和转换颜色格式。",
      en: "Color Picker is a practical online tool designed for designers, developers, and creators. Whether you're working on web design, UI interface design, or brand color matching, our tool can help you quickly select and convert color formats.",
      jp: "カラーピッカーは、デザイナー、開発者、クリエイターのために設計された実用的なオンラインツールです。ウェブデザイン、UIインターフェースデザイン、ブランドカラーマッチングのいずれに取り組んでいても、私たちのツールは色の選択と形式変換を迅速に行うのに役立ちます。",
      es: "El Selector de Color es una herramienta en línea práctica diseñada para diseñadores, desarrolladores y creadores. Ya sea que esté trabajando en diseño web, diseño de interfaz UI o combinación de colores de marca, nuestra herramienta puede ayudarlo a seleccionar y convertir formatos de color rápidamente."
    },
    {
      tw: "我們的顏色選擇器支持三種主要的顏色格式：HEX（十六進制）、RGB（紅綠藍）和HSL（色相飽和度亮度）。您可以在任意格式之間進行實時轉換，並且所有數值都會同步更新，確保顏色的準確性。",
      cn: "我们的颜色选择器支持三种主要的颜色格式：HEX（十六进制）、RGB（红绿蓝）和HSL（色相饱和度亮度）。您可以在任意格式之间进行实时转换，并且所有数值都会同步更新，确保颜色的准确性。",
      en: "Our color picker supports three main color formats: HEX (hexadecimal), RGB (red green blue), and HSL (hue saturation lightness). You can convert between any formats in real-time, and all values will sync automatically to ensure color accuracy.",
      jp: "私たちのカラーピッカーは、HEX（16進数）、RGB（赤緑青）、HSL（色相彩度明度）の3つの主要な色形式をサポートしています。任意の形式間でリアルタイム変換が可能で、すべての値が自動的に同期され、色の精度を保証します。",
      es: "Nuestro selector de color admite tres formatos de color principales: HEX (hexadecimal), RGB (rojo verde azul) y HSL (tono saturación luminosidad). Puede convertir entre cualquier formato en tiempo real, y todos los valores se sincronizarán automáticamente para garantizar la precisión del color."
    },
    {
      tw: "使用方法非常簡單：點擊顏色預覽區域可以快速複製HEX色碼，或者使用各個格式區域的複製按鈕來獲取對應的顏色代碼。支持鍵盤輸入和滑鼠調節，讓您能夠精確控制每個顏色參數。",
      cn: "使用方法非常简单：点击颜色预览区域可以快速复制HEX色码，或者使用各个格式区域的复制按钮来获取对应的颜色代码。支持键盘输入和鼠标调节，让您能够精确控制每个颜色参数。",
      en: "Usage is very simple: click the color preview area to quickly copy the HEX color code, or use the copy buttons in each format section to get the corresponding color code. Supports keyboard input and mouse adjustment, allowing you to precisely control each color parameter.",
      jp: "使用方法は非常に簡単です：カラープレビューエリアをクリックしてHEXカラーコードを素早くコピーするか、各フォーマットセクションのコピーボタンを使用して対応するカラーコードを取得します。キーボード入力とマウス調整をサポートし、各色パラメータを正確に制御できます。",
      es: "El uso es muy simple: haga clic en el área de vista previa del color para copiar rápidamente el código de color HEX, o use los botones de copia en cada sección de formato para obtener el código de color correspondiente. Admite entrada de teclado y ajuste con el ratón, lo que le permite controlar con precisión cada parámetro de color."
    },
    {
      tw: "無論您是專業設計師還是設計愛好者，我們的顏色選擇器都能滿足您的需求。工具完全免費使用，無需註冊或下載，在瀏覽器中即可使用。支持所有現代瀏覽器，包括桌面和行動裝置。",
      cn: "无论您是专业设计师还是设计爱好者，我们的颜色选择器都能满足您的需求。工具完全免费使用，无需注册或下载，在浏览器中即可使用。支持所有现代浏览器，包括桌面和移动设备。",
      en: "Whether you're a professional designer or design enthusiast, our color picker can meet your needs. The tool is completely free to use, requires no registration or download, and works directly in your browser. Supports all modern browsers, including desktop and mobile devices.",
      jp: "プロのデザイナーでもデザイン愛好家でも、私たちのカラーピッカーはあなたのニーズを満たすことができます。ツールは完全に無料で使用でき、登録やダウンロードは不要で、ブラウザで直接動作します。デスクトップとモバイルデバイスを含むすべての現代ブラウザをサポートします。",
      es: "Ya sea que sea un diseñador profesional o un entusiasta del diseño, nuestro selector de color puede satisfacer sus necesidades. La herramienta es completamente gratuita, no requiere registro ni descarga, y funciona directamente en su navegador. Admite todos los navegadores modernos, incluidos dispositivos de escritorio y móviles."
    }
  ]
};

interface ArticleContentProps {
  locale: string;
}

const ArticleContent: FC<ArticleContentProps> = ({ locale }) => {
  const lang = locale as 'tw' | 'cn' | 'en' | 'jp' | 'es';
  
  return (
    <article className="mt-12 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-xs p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {articleTranslations.title[lang]}
        </h2>
        
        <div className="prose prose-gray max-w-none">
          {articleTranslations.content.map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
              {paragraph[lang]}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
};

export default ArticleContent;