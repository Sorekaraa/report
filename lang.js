/**
 * 翻译文本数据对象
 * 键 (key) 对应 HTML 中的 data-i18n 属性值
 * 值为一个包含 'ja' (日语) 和 'en' (英语) 文本的对象
 */
const translations = {
    // 页面标题
    pageTitle: {
        ja: '粉もんプロジェクト - 報告書索引',
        en: 'Konamon Project - Report Index'
    },
    // 头部
    projectTitle: {
        ja: '粉もんプロジェクト',
        en: 'Konamon Project'
    },
    projectSubtitle: {
        ja: '地域活性化と持続的成長のためのソリューション',
        en: 'Solutions for Regional Revitalization and Sustainable Growth'
    },
    // 导航栏
    navHome: { ja: 'ホーム', en: 'Home' },
    navSummary: { ja: '概要', en: 'Summary' },
    navKyodoDantai: { ja: '共同団体', en: 'Joint Organizations' },
    navKyodoKoubai: { ja: '共同購買プラン', en: 'Joint Purchasing Plan' },
    navKyodoKeiyaku: { ja: '共同契約プラン', en: 'Joint Contract Plan' },
    navJinzaishare: { ja: '人材シェア', en: 'Personnel Sharing' },
    navKokyakuService: { ja: '顧客サービス', en: 'Customer Service' },
    navKokyakuTaiken: { ja: '顧客体験の向上', en: 'Improving Customer Experience' },
    navKonamonMap: { ja: '粉もんマップ詳細', en: 'Konamon Map Details' },
    langSwitch: { ja: 'English', en: '日本語' }, // 切换按钮的文本
    // 主要内容
    mainTitle: {
        ja: '主要ソリューションの索引',
        en: 'Index of Key Solutions'
    },
    // 卡片 1 (概要)
    cardSummaryTitle: { ja: '概要・まとめ', en: 'Overview/Summary' },
    cardSummarySubtitle: { ja: 'プロジェクトの課題分析と全体像', en: 'Challenge Analysis and Project Overview' },
    // 卡片 2 (共同団体)
    cardKyodoTitle: { ja: '共同団体', en: 'Joint Organizations' },
    cardKyodoSubtitle: { ja: '共同購買・共同契約プラン詳細 (索引)', en: 'Joint Purchasing/Contract Plan Details (Index)' },

    // 【已移除】cardJinzaishareTitle/Subtitle
    // 【已移除】cardKokyakuTitle/Subtitle

    // 页脚
    footerText: {
        ja: '© 2025 粉もんプロジェクト',
        en: '© 2025 Konamon Project'
    }
};

/**
 * 核心功能：根据选定的语言更新所有文本内容
 * @param {string} lang - 目标语言代码 ('ja' 或 'en')
 */
function changeLanguage(lang) {
    // 1. 获取所有带有 data-i18n 属性的元素
    const elements = document.querySelectorAll('[data-i18n]');

    // 2. 遍历元素并更新内容
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n'); // 获取翻译键

        // 检查键和目标语言是否存在翻译
        if (translations[key] && translations[key][lang]) {
            const translationText = translations[key][lang];

            // 特殊处理页面标题（<title> 标签）
            if (element.tagName === 'TITLE') {
                document.title = translationText;
            } else {
                // 更新元素的文本内容
                element.textContent = translationText;
            }
        }
    });

    // 3. 更新 body 上的 data-lang 属性，用于追踪当前语言
    document.body.setAttribute('data-lang', lang);
    document.documentElement.lang = lang; // 最好也更新 html 标签的 lang 属性

    // 4. 更新语言切换按钮的文本
    const langSwitchButton = document.getElementById('lang-switch');
    // 如果当前是日语，按钮显示 'English'；如果是英语，按钮显示 '日本語'
    langSwitchButton.textContent = lang === 'ja' ? translations.langSwitch.en : translations.langSwitch.ja;
}

/**
 * 初始化：添加事件监听器
 */
document.addEventListener('DOMContentLoaded', () => {
    const langSwitchButton = document.getElementById('lang-switch');

    // 仅在按钮存在时才添加监听器
    if (langSwitchButton) {
        langSwitchButton.addEventListener('click', (e) => {
            e.preventDefault(); // 阻止链接的默认跳转行为

            // 获取当前语言
            const currentLang = document.body.getAttribute('data-lang') || 'ja';

            // 确定要切换到的新语言
            const newLang = currentLang === 'ja' ? 'en' : 'ja';

            // 执行语言切换
            changeLanguage(newLang);
        });

        // 页面加载时，根据 body 上的 data-lang 属性（默认为 'ja'）设置初始按钮文本
        const initialLang = document.body.getAttribute('data-lang') || 'ja';
        langSwitchButton.textContent = initialLang === 'ja' ? translations.langSwitch.en : translations.langSwitch.ja;
    }
});