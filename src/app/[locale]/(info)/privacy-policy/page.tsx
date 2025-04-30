'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  const params = useParams();
  const locale = (params?.locale as string) || 'zh';
  
  // Only display content based on locale
  const isZhLocale = locale === 'zh';
  const isEnLocale = locale === 'en';
  const isJpLocale = locale === 'jp';
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow w-full">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">{isZhLocale ? "隱私權政策" : isEnLocale ? "Privacy Policy" : "プライバシーポリシー"}</h1>

          <div className="prose prose-lg max-w-none">
            {isZhLocale && (
              <div>
                <p>歡迎使用 fyimg.com（以下簡稱「我們」或「本網站」）。我們致力於保護您的隱私，並確保您在使用本網站時的個人資訊安全。本隱私權政策用於說明我們如何收集、使用、分享和保護您的資訊。</p>
                
                <p className="text-gray-500 mb-6">最後更新日期：2025年1月1日</p>
                
                <h2 className="text-2xl font-semibold mb-3">1. 我們收集的資訊</h2>
                <p>我們可能收集以下類型的資訊：</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>您主動提供的資訊：當您使用我們的聯絡表單、註冊帳戶或參與調查時提供的個人資料，如姓名、電子郵件地址等。</li>
                  <li>自動收集的資訊：您瀏覽本網站時，我們可能透過 Cookie 等技術自動收集資訊，包括 IP 地址、瀏覽器類型、操作系統、瀏覽習慣等。</li>
                  <li>上傳的圖片：當您使用我們的圖片搜尋功能並上傳圖片時，我們可能會暫時存儲這些圖片以提供服務。</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">2. 如何使用您的資訊</h2>
                <p>我們使用收集到的資訊用於：</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>提供、維護和改進我們的服務</li>
                  <li>處理您的查詢和請求</li>
                  <li>發送重要通知，如服務更新和變更</li>
                  <li>分析網站流量和使用情況，以改善用戶體驗</li>
                  <li>防止欺詐和濫用我們的服務</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">3. Cookie 和類似技術</h2>
                <p>本網站使用 Cookie 和類似技術來收集和存儲資訊。Cookie 是一種小型文字檔案，存儲在您的瀏覽器或設備上。我們使用 Cookie 來：</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>記住您的設置和偏好</li>
                  <li>提供個性化的用戶體驗</li>
                  <li>收集使用統計數據</li>
                </ul>
                <p>您可以通過更改瀏覽器設置來控制或刪除 Cookie。但請注意，這樣做可能會影響本網站的某些功能。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">4. 資訊分享</h2>
                <p>我們不會出售或出租您的個人資料給任何第三方。但在以下情況下，我們可能會分享您的資訊：</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>經您的明確同意</li>
                  <li>與提供服務的合作方分享，如雲存儲供應商</li>
                  <li>為回應法律要求，如法院命令或傳票</li>
                  <li>保護我們的權利、財產或安全</li>
                  <li>公司重組、合併或被收購時</li>
                </ul>
                <p>國際資料傳輸：我們的伺服器可能位於您所在國家/地區以外的地方。使用我們的服務，即表示您同意將資料傳輸至這些地區。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">5. 您的權利</h2>
                <p>您有權：</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>要求存取我們持有的您的個人資料。</li>
                  <li>要求更正或刪除您的資料（若適用）。</li>
                  <li>隨時停止使用本網站服務。</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">6. 數據安全</h2>
                <p>我們採取合理的技術和組織措施來保護您的個人資料不被未經授權的訪問、使用或洩露。但是，請注意互聯網傳輸不是100%安全的，我們無法保證資訊傳輸的絕對安全性。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">7. 兒童隱私</h2>
                <p>本網站不面向13歲以下兒童，我們不會在知情情況下收集兒童的個人資料。如果您認為我們可能收集了兒童的個人資料，請通過聯絡頁面與我們聯繫。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">8. 第三方連結</h2>
                <p>本網站可能包含第三方網站的連結。這些網站的隱私政策與我們的不同。我們建議您閱讀這些網站的隱私政策，因為我們不對這些網站的內容或隱私慣例負責。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">9. 政策更新</h2>
                <p>我們可能會不時更新本隱私權政策。更新後的政策將在本頁發布，並在適用的情況下通知您。我們鼓勵您定期查看本政策，以了解我們如何保護您的資訊。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">10. 聯絡我們</h2>
                <p>如果您對本隱私權政策有任何疑問或疑慮，請通過 <Link href={`/${locale}/contact`} className="text-blue-600 hover:underline">聯絡頁面</Link> 與我們聯繫。</p>
              </div>
            )}
            
            {isEnLocale && (
              <div>
                <p>Welcome to fyimg.com (hereinafter referred to as &quot;we&quot; or &quot;this website&quot;). We are committed to protecting your privacy and ensuring the security of your personal information when using our website. This Privacy Policy explains how we collect, use, share, and protect your information.</p>
                
                <p className="text-gray-500 mb-6">Last updated: January 1, 2025</p>
                
                <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
                <p>We may collect the following types of information:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Information you actively provide: Personal data you provide when using our contact forms, registering accounts, or participating in surveys, such as name, email address, etc.</li>
                  <li>Automatically collected information: When you browse our website, we may automatically collect information through technologies like cookies, including IP address, browser type, operating system, browsing habits, etc.</li>
                  <li>Uploaded images: When you use our image search feature and upload images, we may temporarily store these images to provide services.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">2. How We Use Your Information</h2>
                <p>We use the collected information to:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process your inquiries and requests</li>
                  <li>Send important notifications, such as service updates and changes</li>
                  <li>Analyze website traffic and usage to improve user experience</li>
                  <li>Prevent fraud and abuse of our services</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">3. Cookies and Similar Technologies</h2>
                <p>This website uses cookies and similar technologies to collect and store information. Cookies are small text files stored in your browser or device. We use cookies to:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Remember your settings and preferences</li>
                  <li>Provide personalized user experiences</li>
                  <li>Collect usage statistics</li>
                </ul>
                <p>You can control or delete cookies by changing your browser settings. Please note, however, that doing so may affect certain website features.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">4. Information Sharing</h2>
                <p>We do not sell or rent your personal information to any third parties. However, we may share your information in the following circumstances:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>With your explicit consent</li>
                  <li>With service partners, such as cloud storage providers</li>
                  <li>In response to legal requirements, such as court orders or subpoenas</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>During company restructuring, merger, or acquisition</li>
                </ul>
                <p>International data transfers: Our servers may be located outside your country/region. By using our services, you consent to the transfer of data to these regions.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">5. Your Rights</h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Request access to your personal data that we hold.</li>
                  <li>Request correction or deletion of your data (where applicable).</li>
                  <li>Stop using our website services at any time.</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">6. Data Security</h2>
                <p>We implement reasonable technical and organizational measures to protect your personal data from unauthorized access, use, or disclosure. However, please note that Internet transmission is not 100% secure, and we cannot guarantee the absolute security of information transmission.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">7. Children&apos;s Privacy</h2>
                <p>This website is not directed at children under 13, and we do not knowingly collect personal data from children. If you believe we may have collected personal data from children, please contact us through our contact page.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">8. Third-Party Links</h2>
                <p>This website may contain links to third-party websites. These websites&apos; privacy policies differ from ours. We recommend that you read these websites&apos; privacy policies, as we are not responsible for their content or privacy practices.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">9. Policy Updates</h2>
                <p>We may update this Privacy Policy from time to time. Updated policies will be posted on this page and, where applicable, we will notify you. We encourage you to review this policy regularly to understand how we protect your information.</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">10. Contact Us</h2>
                <p>If you have any questions or concerns about this Privacy Policy, please contact us through our <Link href={`/${locale}/contact`} className="text-blue-600 hover:underline">Contact Page</Link>.</p>
              </div>
            )}
            
            {isJpLocale && (
              <div>
                <p>fyimg.com（以下「当社」または「本ウェブサイト」といいます）へようこそ。当社はお客様のプライバシーを保護し、本ウェブサイト利用時の個人情報の安全を確保することに取り組んでいます。このプライバシーポリシーでは、当社がどのように情報を収集、使用、共有、保護するかについて説明します。</p>
                
                <p className="text-gray-500 mb-6">最終更新日：2025年1月1日</p>
                
                <h2 className="text-2xl font-semibold mb-3">1. 収集する情報</h2>
                <p>当社は以下の種類の情報を収集する場合があります：</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>お客様が積極的に提供する情報：お問い合わせフォームの使用、アカウント登録、調査への参加時に提供される氏名、メールアドレスなどの個人データ。</li>
                  <li>自動的に収集される情報：当サイトを閲覧する際、Cookieなどの技術を通じてIPアドレス、ブラウザの種類、オペレーティングシステム、閲覧習慣などの情報を自動的に収集する場合があります。</li>
                  <li>アップロードされた画像：画像検索機能を使用して画像をアップロードする場合、サービス提供のためにこれらの画像を一時的に保存することがあります。</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">2. 情報の使用方法</h2>
                <p>収集した情報は以下の目的で使用します：</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>サービスの提供、維持、改善</li>
                  <li>お問い合わせやリクエストの処理</li>
                  <li>サービスの更新や変更などの重要な通知の送信</li>
                  <li>ユーザー体験向上のためのウェブサイトトラフィックと使用状況の分析</li>
                  <li>不正行為や当社サービスの悪用防止</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">3. Cookieと類似技術</h2>
                <p>本ウェブサイトでは、情報を収集・保存するためにCookieや類似技術を使用しています。Cookieは、ブラウザやデバイスに保存される小さなテキストファイルです。当社はCookieを以下の目的で使用します：</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>設定や好みを記憶する</li>
                  <li>パーソナライズされたユーザー体験を提供する</li>
                  <li>使用統計データを収集する</li>
                </ul>
                <p>ブラウザの設定を変更することでCookieを制御または削除できます。ただし、これにより本ウェブサイトの一部機能に影響が出る場合がありますのでご注意ください。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">4. 情報共有</h2>
                <p>当社はお客様の個人情報を第三者に販売または貸与することはありません。ただし、以下の状況では情報を共有する場合があります：</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>お客様の明示的な同意がある場合</li>
                  <li>クラウドストレージプロバイダーなどのサービスパートナーとの共有</li>
                  <li>裁判所命令や召喚状などの法的要件に応じる場合</li>
                  <li>当社の権利、財産、安全を保護するため</li>
                  <li>会社の再編成、合併、買収時</li>
                </ul>
                <p>国際データ転送：当社のサーバーはお客様の国/地域外に位置している場合があります。当社のサービスを利用することにより、これらの地域へのデータ転送に同意したことになります。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">5. お客様の権利</h2>
                <p>お客様には以下の権利があります：</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>当社が保持するお客様の個人データへのアクセスを要求する。</li>
                  <li>お客様のデータの訂正または削除を要求する（該当する場合）。</li>
                  <li>いつでも本ウェブサイトのサービス利用を停止する。</li>
                </ul>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">6. データセキュリティ</h2>
                <p>当社は、お客様の個人データを不正アクセス、使用、または漏洩から保護するための合理的な技術的・組織的対策を実施しています。ただし、インターネット転送は100%安全ではなく、情報転送の絶対的なセキュリティを保証することはできませんのでご了承ください。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">7. 子どものプライバシー</h2>
                <p>本ウェブサイトは13歳未満の子どもを対象としておらず、知りながら子どもの個人データを収集することはありません。当社が子どもの個人データを収集した可能性があると思われる場合は、お問い合わせページを通じてご連絡ください。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">8. 第三者リンク</h2>
                <p>本ウェブサイトには第三者ウェブサイトへのリンクが含まれている場合があります。これらのウェブサイトのプライバシーポリシーは当社のものとは異なります。当社はこれらのウェブサイトのコンテンツやプライバシー慣行については責任を負いませんので、それらのプライバシーポリシーをお読みになることをお勧めします。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">9. ポリシーの更新</h2>
                <p>当社は、このプライバシーポリシーを随時更新する場合があります。更新されたポリシーはこのページに掲載され、適用される場合には通知いたします。当社がお客様の情報をどのように保護しているかを理解するために、このポリシーを定期的に確認することをお勧めします。</p>
                
                <h2 className="text-2xl font-semibold mb-3 mt-6">10. お問い合わせ</h2>
                <p>このプライバシーポリシーについてご質問やご懸念がある場合は、<Link href={`/${locale}/contact`} className="text-blue-600 hover:underline">お問い合わせページ</Link>を通じてご連絡ください。</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}