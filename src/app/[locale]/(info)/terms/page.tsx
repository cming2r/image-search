'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Terms() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  
  // Only display content based on locale
  const isZhLocale = locale === 'zh';
  const isEnLocale = locale === 'en';
  const isJpLocale = locale === 'jp';
  const isEsLocale = locale === 'es';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">
            {isZhLocale ? "使用條款" : 
             isEnLocale ? "Terms of Service" : 
             isJpLocale ? "利用規約" : 
             isEsLocale ? "Términos de Servicio" : "Terms of Service"}
          </h1>

          <div className="prose prose-lg max-w-none">
            {isZhLocale && (
              <div>
                <p>歡迎使用 fyimg.com（以下簡稱「本網站」）。通過訪問或使用本網站，您同意受這些條款和條件的約束。如果您不同意這些條款的任何部分，請不要使用本網站。</p>
                
                <p className="text-gray-500 mb-6">最後更新日期：2025年1月1日</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">1. 服務說明</h2>
                <p>本網站提供各種在線工具，包括但不限於圖片搜索、日期計算器、預產期計算器和禮物交換抽籤工具。這些工具旨在提供便利和幫助，但不保證結果的準確性或適用性。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">2. 使用限制</h2>
                <p>您同意僅將我們的服務用於合法目的，並遵守所有適用的法律和法規。您不得：</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>使用本網站進行欺詐、非法或未經授權的活動</li>
                  <li>上傳或傳輸任何含有病毒、惡意代碼或其他有害內容的資料</li>
                  <li>嘗試干擾或破壞本網站的正常運作</li>
                  <li>收集或儲存本網站其他用戶的個人資料</li>
                  <li>規避、禁用或以其他方式干擾本網站的安全相關功能</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">3. 智慧財產權</h2>
                <p>本網站及其內容（包括但不限於文字、圖形、標誌、圖標、圖像、音頻剪輯、數據編輯和軟件）均為 fyimg 或其內容供應商所有，受國際版權、商標、專利和其他知識產權法律的保護。</p>
                <p>未經明確許可，您不得複製、修改、發布、傳輸、分發、銷售、展示或以其他方式利用本網站的任何內容。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">4. 隱私政策</h2>
                <p>我們重視您的隱私，並致力於保護您的個人信息。我們的<Link href={`/${locale}/privacy-policy`} className="text-blue-600 hover:underline">隱私政策</Link>詳細說明了我們如何收集、使用和保護您的數據。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">5. 免責聲明</h2>
                <p>本網站及其內容按「現狀」提供，不做任何明示或暗示的保證。我們不對服務的準確性、可靠性或可用性負責。</p>
                <p>fyimg 不對使用本網站或其服務可能產生的任何直接、間接、附帶、特殊或後果性損害負責。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">6. 第三方連結</h2>
                <p>本網站可能包含指向第三方網站或服務的連結。這些連結僅為便利用戶而提供，並不意味著 fyimg 認可這些第三方網站或服務。fyimg 對這些第三方網站或服務的內容、隱私政策或做法不負責任。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">7. 修改條款</h2>
                <p>我們保留隨時修改這些條款的權利。修改後的條款將在網站上發布後立即生效。繼續使用我們的服務即表示您接受這些變更。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">8. 終止</h2>
                <p>fyimg 保留因任何原因隨時終止或限制您訪問本網站的權利，恕不另行通知。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">9. 適用法律</h2>
                <p>這些條款及您對本網站的使用受當地法律管轄，不考慮法律衝突原則。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">10. 聯絡我們</h2>
                <p>如果您對這些條款有任何疑問或意見，請通過<Link href={`/${locale}/contact`} className="text-blue-600 hover:underline">聯絡頁面</Link>與我們聯繫。</p>
              </div>
            )}
            
            {isEnLocale && (
              <div>
                <p>Welcome to fyimg.com (hereinafter referred to as &quot;this website&quot;). By accessing or using this website, you agree to be bound by these terms and conditions. If you do not agree to any part of these terms, please do not use this website.</p>
                
                <p className="text-gray-500 mb-6">Last updated: January 1, 2025</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">1. Service Description</h2>
                <p>This website provides various online tools, including but not limited to image search, date calculator, due date calculator, and gift exchange drawing tools. These tools are designed to provide convenience and assistance but do not guarantee accuracy or suitability of results.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">2. Usage Restrictions</h2>
                <p>You agree to use our services only for lawful purposes and in compliance with all applicable laws and regulations. You may not:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Use this website for fraudulent, illegal, or unauthorized activities</li>
                  <li>Upload or transmit any material containing viruses, malicious code, or other harmful content</li>
                  <li>Attempt to interfere with or disrupt the normal operation of this website</li>
                  <li>Collect or store personal information of other users of this website</li>
                  <li>Circumvent, disable, or otherwise interfere with security-related features of this website</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">3. Intellectual Property Rights</h2>
                <p>This website and its content (including but not limited to text, graphics, logos, icons, images, audio clips, data compilations, and software) are owned by fyimg or its content suppliers and are protected by international copyright, trademark, patent, and other intellectual property laws.</p>
                <p>You may not copy, modify, publish, transmit, distribute, sell, display, or otherwise exploit any content from this website without explicit permission.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">4. Privacy Policy</h2>
                <p>We value your privacy and are committed to protecting your personal information. Our <Link href={`/${locale}/privacy-policy`} className="text-blue-600 hover:underline">Privacy Policy</Link> details how we collect, use, and protect your data.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">5. Disclaimer</h2>
                <p>This website and its content are provided &quot;as is&quot; without any warranties of any kind. We do not guarantee the accuracy, reliability, or availability of our services.</p>
                <p>fyimg is not responsible for any direct, indirect, incidental, special, or consequential damages that may result from the use of this website or its services.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">6. Third-Party Links</h2>
                <p>This website may contain links to third-party websites or services. These links are provided solely for your convenience and do not imply that fyimg endorses these third-party websites or services. fyimg is not responsible for the content, privacy policies, or practices of these third-party websites or services.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">7. Modification of Terms</h2>
                <p>We reserve the right to modify these terms at any time. Modified terms will be effective immediately upon posting on the website. Continued use of our services constitutes acceptance of these changes.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">8. Termination</h2>
                <p>fyimg reserves the right to terminate or restrict your access to this website for any reason at any time, without notice.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">9. Governing Law</h2>
                <p>These terms and your use of this website are governed by local laws, without regard to its conflict of law principles.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">10. Contact Us</h2>
                <p>If you have any questions or comments about these terms, please contact us through our <Link href={`/${locale}/contact`} className="text-blue-600 hover:underline">Contact Page</Link>.</p>
              </div>
            )}
            
            {isJpLocale && (
              <div>
                <p>fyimg.com（以下「本ウェブサイト」といいます）へようこそ。本ウェブサイトにアクセスまたは使用することにより、あなたはこれらの利用規約に拘束されることに同意するものとします。これらの規約のいずれかの部分に同意しない場合は、本ウェブサイトを使用しないでください。</p>
                
                <p className="text-gray-500 mb-6">最終更新日：2025年1月1日</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">1. サービス説明</h2>
                <p>本ウェブサイトは、画像検索、日付計算機、出産予定日計算機、ギフト交換抽選ツールなど、さまざまなオンラインツールを提供しています。これらのツールは便宜と支援を提供するために設計されていますが、結果の正確性や適合性を保証するものではありません。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">2. 利用制限</h2>
                <p>当社のサービスを合法的な目的のためにのみ使用し、適用されるすべての法律および規制を遵守することに同意するものとします。以下の行為は禁止されています：</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>本ウェブサイトを詐欺的、違法、または無許可の活動に使用すること</li>
                  <li>ウイルス、悪意のあるコード、またはその他の有害なコンテンツを含む資料をアップロードまたは送信すること</li>
                  <li>本ウェブサイトの正常な運営を妨害または中断しようとすること</li>
                  <li>本ウェブサイトの他のユーザーの個人情報を収集または保存すること</li>
                  <li>本ウェブサイトのセキュリティ関連機能を回避、無効化、またはその他の方法で干渉すること</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">3. 知的財産権</h2>
                <p>本ウェブサイトおよびそのコンテンツ（テキスト、グラフィック、ロゴ、アイコン、画像、音声クリップ、データ編集、ソフトウェアを含むがこれらに限定されない）は、fyimgまたはそのコンテンツ提供者が所有し、国際的な著作権、商標、特許、およびその他の知的財産法によって保護されています。</p>
                <p>明示的な許可なしに、本ウェブサイトのコンテンツをコピー、修正、公開、送信、配布、販売、表示、またはその他の方法で利用することはできません。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">4. プライバシーポリシー</h2>
                <p>当社はお客様のプライバシーを尊重し、個人情報の保護に努めています。当社の<Link href={`/${locale}/privacy-policy`} className="text-blue-600 hover:underline">プライバシーポリシー</Link>では、当社がお客様のデータをどのように収集、使用、保護するかについて詳しく説明しています。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">5. 免責事項</h2>
                <p>本ウェブサイトおよびそのコンテンツは、いかなる種類の保証もなく「現状のまま」提供されています。当社は、サービスの正確性、信頼性、または可用性を保証しません。</p>
                <p>fyimgは、本ウェブサイトまたはそのサービスの使用から生じる可能性のあるいかなる直接的、間接的、偶発的、特別、または結果的な損害についても責任を負いません。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">6. 第三者リンク</h2>
                <p>本ウェブサイトには、第三者のウェブサイトやサービスへのリンクが含まれている場合があります。これらのリンクはお客様の便宜のためにのみ提供されるものであり、fyimgがこれらの第三者のウェブサイトやサービスを推奨することを意味するものではありません。fyimgは、これらの第三者のウェブサイトやサービスのコンテンツ、プライバシーポリシー、または実践について責任を負いません。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">7. 規約の変更</h2>
                <p>当社は、いつでもこれらの規約を変更する権利を留保します。変更された規約は、ウェブサイト上に掲載された時点で直ちに有効となります。当社のサービスを継続して使用することは、これらの変更を受け入れたことを意味します。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">8. 利用終了</h2>
                <p>fyimgは、予告なく、いかなる理由でも、いつでも本ウェブサイトへのアクセスを終了または制限する権利を留保します。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">9. 準拠法</h2>
                <p>これらの規約およびお客様による本ウェブサイトの使用は、法の抵触に関する原則を考慮せず、現地の法律に準拠します。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">10. お問い合わせ</h2>
                <p>これらの規約についてご質問やご意見がある場合は、<Link href={`/${locale}/contact`} className="text-blue-600 hover:underline">お問い合わせページ</Link>を通じてご連絡ください。</p>
              </div>
            )}
            
            {isEsLocale && (
              <div>
                <p>Bienvenido a fyimg.com (en adelante &quot;este sitio web&quot;). Al acceder o usar este sitio web, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con cualquier parte de estos términos, por favor no use este sitio web.</p>
                
                <p className="text-gray-500 mb-6">Última actualización: 1 de enero de 2025</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">1. Descripción del Servicio</h2>
                <p>Este sitio web proporciona varias herramientas en línea, incluyendo pero no limitado a búsqueda de imágenes, calculadora de fechas, calculadora de fecha de parto y herramientas de sorteo de intercambio de regalos. Estas herramientas están diseñadas para proporcionar conveniencia y asistencia, pero no garantizan la precisión o idoneidad de los resultados.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">2. Restricciones de Uso</h2>
                <p>Usted acepta usar nuestros servicios únicamente para propósitos legales y en cumplimiento con todas las leyes y regulaciones aplicables. Usted no puede:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Usar este sitio web para actividades fraudulentas, ilegales o no autorizadas</li>
                  <li>Subir o transmitir cualquier material que contenga virus, código malicioso u otro contenido dañino</li>
                  <li>Intentar interferir o interrumpir la operación normal de este sitio web</li>
                  <li>Recolectar o almacenar información personal de otros usuarios de este sitio web</li>
                  <li>Eludir, deshabilitar o interferir de otro modo con las funciones relacionadas con la seguridad de este sitio web</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">3. Derechos de Propiedad Intelectual</h2>
                <p>Este sitio web y su contenido (incluyendo pero no limitado a texto, gráficos, logotipos, íconos, imágenes, clips de audio, compilaciones de datos y software) son propiedad de fyimg o sus proveedores de contenido y están protegidos por leyes internacionales de derechos de autor, marcas comerciales, patentes y otras leyes de propiedad intelectual.</p>
                <p>No puede copiar, modificar, publicar, transmitir, distribuir, vender, mostrar o explotar de otro modo cualquier contenido de este sitio web sin permiso explícito.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">4. Política de Privacidad</h2>
                <p>Valoramos su privacidad y estamos comprometidos a proteger su información personal. Nuestra <Link href={`/${locale}/privacy-policy`} className="text-blue-600 hover:underline">Política de Privacidad</Link> detalla cómo recolectamos, usamos y protegemos sus datos.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">5. Exención de Responsabilidad</h2>
                <p>Este sitio web y su contenido se proporcionan &quot;tal como están&quot; sin garantías de ningún tipo. No garantizamos la precisión, confiabilidad o disponibilidad de nuestros servicios.</p>
                <p>fyimg no es responsable por ningún daño directo, indirecto, incidental, especial o consecuencial que pueda resultar del uso de este sitio web o sus servicios.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">6. Enlaces de Terceros</h2>
                <p>Este sitio web puede contener enlaces a sitios web o servicios de terceros. Estos enlaces se proporcionan únicamente para su conveniencia y no implican que fyimg respalde estos sitios web o servicios de terceros. fyimg no es responsable del contenido, políticas de privacidad o prácticas de estos sitios web o servicios de terceros.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">7. Modificación de Términos</h2>
                <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los términos modificados serán efectivos inmediatamente después de su publicación en el sitio web. El uso continuado de nuestros servicios constituye la aceptación de estos cambios.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">8. Terminación</h2>
                <p>fyimg se reserva el derecho de terminar o restringir su acceso a este sitio web por cualquier razón en cualquier momento, sin previo aviso.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">9. Ley Aplicable</h2>
                <p>Estos términos y su uso de este sitio web se rigen por las leyes locales, sin consideración a sus principios de conflicto de leyes.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">10. Contáctanos</h2>
                <p>Si tiene alguna pregunta o comentario sobre estos términos, contáctenos a través de nuestra <Link href={`/${locale}/contact`} className="text-blue-600 hover:underline">Página de Contacto</Link>.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}