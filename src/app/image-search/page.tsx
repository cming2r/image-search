import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageForm from "@/app/image-search/components/ImageForm";

export default function ImageSearch() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <h1>以圖搜圖 - 圖片搜尋工具</h1>
            <p>
              輸入圖片網址或上傳圖片，使用各大搜尋引擎查找相似圖片
            </p>
          </div>

          <ImageForm />

          <div className="mt-12 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">如何使用此工具？</h2>
            <ol className="ml-6 list-decimal space-y-2 mt-4">
              <li>輸入圖片的網址，或點擊「上傳圖片」選擇本地圖片</li>
              <li>系統將上傳的圖片轉換為可搜尋的網址</li>
              <li>點擊各大搜尋引擎按鈕，立即跳轉至對應搜尋服務</li>
              <li>搜尋引擎會基於您提供的圖片尋找網路上的相似內容</li>
            </ol>

            <div className="bg-blue-50 p-3 rounded-lg mt-4">
              <p className="text-blue-700 font-medium flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                小提示：<br />
                透過複製其他網站的圖片，可以直接用Ctrl + V 貼上在上傳圖片的頁面。
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">什麼是以圖搜圖？</h2>
            <div className="space-y-4">
              <p>
                以圖搜圖（又稱反向圖像搜索，Reverse Image Search）是現代搜尋引擎的重要功能，允許用戶通過上傳圖片或提供圖片URL，搜尋相關圖像及其來源。本工具整合了Google、Bing、Yandex等主流搜尋引擎的以圖搜圖功能，支援在各種裝置（包括電腦、手機和平板）上使用。
              </p>
              <p>
                以圖搜圖的實用場景包括：尋找圖片的高解析度版本、透過局部圖片找到完整原圖、識別相同人物或物體的不同照片、查找相似場景或素材。對於設計師、研究人員、內容創作者和一般用戶而言，這是一項極具價值的工具。
              </p>
              <p>
                我們的整合平台簡化了以圖搜圖的流程，無需在多個搜尋引擎間切換。只需一次上傳圖片或輸入URL，即可便捷地使用各大搜尋服務，顯著提高搜尋效率。
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">各大搜尋引擎特色</h2>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-blue-700">Google Lens</h3>
                <div className="mt-3 space-y-3">
                  <p>
                    Google Lens 是目前全球使用最廣泛的圖像搜尋服務，以其強大的AI視覺分析技術著稱。在全球搜尋引擎市場，Google佔有超過70%的份額，其行動裝置搜尋滲透率更高達85%，顯示其在全球範圍內的絕對領先地位。
                  </p>
                  <p>
                    Google的圖像搜尋功能不僅可以找到視覺上相似的圖片，還能識別圖中的物體、文字、地標，甚至提供購物選項。其獨特優勢在於極其龐大的圖像資料庫和先進的機器學習演算法，能夠理解圖像的語義內容並返回高度相關的結果。
                  </p>
                  <p>
                    對於創作者和設計師，Google還提供了強大的過濾功能，可以根據授權類型搜尋免費可商用的圖像資源。其細緻的篩選器系統允許用戶按尺寸、顏色、類型和時間等多維度精確過濾搜尋結果。
                  </p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-teal-700">Microsoft Bing 視覺搜尋</h3>
                <div className="mt-3 space-y-3">
                  <p>
                    Microsoft Bing於2009年推出，經過多次升級迭代，現在已成為全球第二大搜尋引擎。2020年，微軟將其更名為Microsoft Bing（微軟必應），進一步強化了其品牌識別度。
                  </p>
                  <p>
                    Bing的視覺搜尋功能擁有獨特的優勢，尤其在呈現高分辨率圖像方面表現出色。對於需要尋找高品質視覺素材的專業人士，Bing提供了優質的搜尋體驗和結果展示。
                  </p>
                  <p>
                    Bing Image Search以其簡潔直觀的用戶界面著稱，提供了豐富的過濾選項，包括尺寸、顏色、風格和佈局等。其「相關搜尋」功能智能推薦用戶可能感興趣的相關主題，而特色的「桌布圖片」類別則為用戶提供了大量高品質的桌面壁紙資源。
                  </p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-red-700">Yandex 圖像搜尋</h3>
                <div className="mt-3 space-y-3">
                  <p>
                    Yandex是俄羅斯及東歐地區最大的搜尋引擎，其圖像搜尋功能在全球範圍內享有盛譽。Yandex的圖像識別技術特別擅長在不同場景、角度和光線條件下識別相同的物體或人物，使其成為尋找特定圖像變體的理想選擇。
                  </p>
                  <p>
                    Yandex圖像搜尋的核心優勢在於其先進的圖像處理演算法，能夠精確識別照片中的商標、地標和人物。即使圖像經過裁剪、旋轉或顏色調整等修改，Yandex仍能有效追溯原始圖像或找到視覺上相似的內容。
                  </p>
                  <p>
                    除了基本的反向圖像搜尋功能，Yandex還提供豐富的圖像分析工具，包括視覺內容分類和元素識別。無論是追蹤圖片來源，還是發現視覺相關內容，Yandex都能提供獨特而全面的搜尋結果。
                  </p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-purple-700">SauceNAO 專業動漫搜尋</h3>
                <div className="mt-3 space-y-3">
                  <p>
                    SauceNAO是動漫、漫畫和插畫領域最專業的圖像搜尋引擎，為二次元內容愛好者提供了無與倫比的搜尋體驗。其專門的資料庫涵蓋了Twitter、Pixiv、niconico等主要動漫藝術平台，能夠快速精準地定位圖像來源。
                  </p>
                  <p>
                    使用SauceNAO，用戶不僅能找到原始圖片及其作者資訊，還能獲取關聯的作品集、漫畫系列及遊戲出處。對於動漫藝術研究、同人創作參考或純粹的愛好者探索，SauceNAO提供了專業且全面的搜尋解決方案。
                  </p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-gray-700">TinEye（已移除）</h3>
                <div className="mt-3 space-y-3">
                  <p>
                    TinEye是一個專注於精確圖像匹配的搜尋引擎，其獨特之處在於能夠找出圖片的完全匹配，而非僅提供視覺上相似的結果。這使其成為追蹤圖片網路使用情況、確定圖片首次出現時間、尋找高解析度版本及驗證圖片原創性的理想工具。
                  </p>
                  <p className="text-red-600 font-medium mt-2 flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block mr-1 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>註：經測試後發現TinEye搜尋功能不穩定，且結果質量不如其他引擎，因此我們已將其從搜尋選項中移除。我們持續評估各搜尋引擎的表現，以提供最佳用戶體驗。</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-bold mb-3">以圖搜圖常見應用場景</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <h3 className="font-medium text-blue-700">鑑別圖片真實性</h3>
                </div>
                <p className="text-blue-700 text-sm">
                  透過搜尋原始圖片來源，識別是否為PS合成或AI生成圖片，避免被虛假信息或偽造圖像誤導。
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                  </svg>
                  <h3 className="font-medium text-green-700">尋找高品質素材</h3>
                </div>
                <p className="text-green-700 text-sm">
                  設計師和創作者可搜尋高解析度圖片、無背景版本或相似素材，提升作品質量且省去繁瑣的搜尋過程。
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  <h3 className="font-medium text-purple-700">識別未知物體</h3>
                </div>
                <p className="text-purple-700 text-sm">
                  拍下不認識的植物、動物、商品或地標，通過以圖搜圖快速獲取相關信息，擴展知識面並滿足好奇心。
                </p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                  <h3 className="font-medium text-amber-700">追蹤動漫作品來源</h3>
                </div>
                <p className="text-amber-700 text-sm">
                  使用SauceNAO查找動漫截圖、插畫或表情包的原始來源，找到作者、作品名稱以及創作相關信息。
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <h3 className="font-medium text-red-700">保護版權內容</h3>
                </div>
                <p className="text-red-700 text-sm">
                  創作者可定期以圖搜圖檢查自己的作品是否被盜用或侵權，及時發現並採取必要的法律保護措施。
                </p>
              </div>
              
              <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <h3 className="font-medium text-cyan-700">尋找商品購買渠道</h3>
                </div>
                <p className="text-cyan-700 text-sm">
                  拍攝或保存喜歡的商品圖片，通過以圖搜圖找到相同或類似商品的購買渠道、價格比較和用戶評價。
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center">
              <p className="text-lg font-medium text-indigo-700">
                立即使用我們的以圖搜圖工具，一次搜索多個引擎，節省時間提高效率！
              </p>
              <p className="text-sm text-indigo-600 mt-1">
                支援所有設備，完全免費，無需註冊，保護您的隱私
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-3">以圖搜圖常見問題</h2>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-blue-700">為什麼有時搜尋結果不準確？</h3>
                <p className="mt-2">
                  以圖搜圖的準確性取決於多種因素，包括圖片質量、搜尋引擎的資料庫覆蓋範圍、圖像的獨特性等。
                  如果您的圖片分辨率較低、經過裁剪或修改，或是非常常見的圖像類型（如藍天、草地等），搜尋準確率可能會降低。
                  為獲得最佳結果，建議使用清晰、完整的原始圖片，並嘗試多個搜尋引擎進行對比，因為不同引擎的演算法和資料庫有所不同。
                </p>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-blue-700">手機上如何使用以圖搜圖功能？</h3>
                <p className="mt-2">
                  我們的工具完全支援行動裝置使用。在手機上，您可以點擊「上傳圖片」後從相冊選擇照片，或直接拍攝新照片上傳。
                  對於iOS設備，您也可以直接從照片應用分享圖片到我們的網站。Android用戶可以長按圖片後選擇分享到瀏覽器打開本工具。
                  此外，如果您已將圖片複製到剪貼板，也可以直接在上傳區域長按並選擇「貼上」。
                </p>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-blue-700">如何選擇最適合的搜尋引擎？</h3>
                <p className="mt-2">
                  不同搜尋引擎各有專長：Google Lens適合識別物體、商品和地標；Bing擅長尋找高解析度圖像和桌布；
                  Yandex在識別人臉和追蹤修改過的圖片方面表現出色；SauceNAO則專門針對動漫、漫畫和插畫領域。
                  建議根據您的具體需求選擇相應引擎，或者同時使用多個引擎獲取最全面的結果。
                  對於重要搜尋，我們推薦至少使用Google和Yandex兩個引擎進行比較。
                </p>
              </div>
              
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-blue-700">使用以圖搜圖有法律風險嗎？</h3>
                <p className="mt-2">
                  用戶需要注意使用方式和目的，搜尋受版權保護的圖像用於個人參考和研究通常屬於合理使用範疇。
                  然而，如果您打算商業使用搜尋到的圖片，請確保獲得適當的授權或選擇免版權圖像。
                  此外，請尊重他人隱私，避免使用此工具進行侵犯他人隱私或違反當地法律的活動。
                  我們的工具僅提供搜尋服務，用戶需自行負責確保其使用方式符合相關法律法規。
                </p>
              </div>
              <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-medium text-blue-700">上傳的圖片會如何處理？是否會保存？</h3>
                <p className="mt-2">
                  我們非常重視用戶隱私。當您上傳圖片時，系統會暫時存儲該圖片以生成可搜尋的URL，但所有圖片資料會在24小時內自動刪除。
                  我們不會永久保存您的圖片，也不會將其用於任何其他目的。上傳的圖片僅用於提供搜尋服務，且只有您可以通過生成的URL訪問它。
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-bold mb-3">為什麼選擇我們的以圖搜圖工具？</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-medium text-blue-700">多引擎整合</h3>
                </div>
                <p className="text-blue-700 text-sm">
                  一站式訪問Google、Bing、Yandex和SauceNAO等主流搜尋引擎，無需切換網站，節省時間和精力。
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="font-medium text-green-700">完全免費</h3>
                </div>
                <p className="text-green-700 text-sm">
                  所有功能均可免費使用，無隱藏費用，無需註冊帳號，也不顯示任何廣告，提供純淨的搜尋體驗。
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <h3 className="font-medium text-purple-700">跨平台支援</h3>
                </div>
                <p className="text-purple-700 text-sm">
                  完美支援電腦、手機和平板，實現隨時隨地搜圖，且具有針對移動設備優化的響應式界面設計。
                </p>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 className="font-medium text-amber-700">便捷操作</h3>
                </div>
                <p className="text-amber-700 text-sm">
                  支持URL輸入、本地上傳和剪貼板直接貼圖，操作簡單直觀，幾秒鐘內即可完成搜尋過程。
                </p>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <h3 className="font-medium text-red-700">隱私保護</h3>
                </div>
                <p className="text-red-700 text-sm">
                  圖片僅臨時存儲用於生成可搜尋URL，24小時內自動刪除，從不用於其他用途或分享給第三方。
                </p>
              </div>
              
              <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-100">
                <div className="flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <h3 className="font-medium text-cyan-700">簡潔無干擾</h3>
                </div>
                <p className="text-cyan-700 text-sm">
                  清爽簡潔的界面設計，沒有干擾用戶的彈窗和提示，聚焦於搜尋功能本身，提供專業高效的用戶體驗。
                </p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg text-center">
              <p className="text-lg font-medium text-indigo-700">
                立即體驗最全面的以圖搜圖工具
              </p>
              <p className="text-sm text-indigo-600 mt-1">
                簡單上傳或輸入URL，開啟多引擎智能圖像搜尋
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}