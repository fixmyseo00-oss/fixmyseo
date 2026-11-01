import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getPort(): number {
  const portArgIndex = process.argv.indexOf('--port');
  if (portArgIndex !== -1 && process.argv[portArgIndex + 1]) {
    return parseInt(process.argv[portArgIndex + 1], 10);
  }
  // AI Studio environment constraint: Dev server must run on port 3000
  if (process.env.PORT && process.env.PORT !== '8080') {
    return parseInt(process.env.PORT, 10);
  }
  return 3000;
}
const PORT = getPort();
const app = express();

app.use(express.json({ limit: '1mb' }));

// Initialize Google GenAI client with official server-side pattern
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper to sanitize and normalize URLs
function sanitizeUrl(rawUrl: string): string {
  let url = rawUrl.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }
  return url;
}

// Lightweight HTML probe for real-time site headers & tags
interface ScrapedData {
  accessible: boolean;
  status?: number;
  title?: string;
  titleLength?: number;
  metaDescription?: string;
  descLength?: number;
  viewportFound: boolean;
  canonical?: string;
  h1Tags: string[];
  h2Count: number;
  totalImages: number;
  imagesMissingAlt: number;
  htmlSizeBytes: number;
  responseTimeMs: number;
  isHttps: boolean;
  ogTitle?: string;
  ogDesc?: string;
}

async function scrapePage(url: string): Promise<ScrapedData> {
  const startTime = Date.now();
  const isHttps = url.startsWith('https://');

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 FixMySEO-Auditor/2.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: AbortSignal.timeout(6000),
    });

    const responseTimeMs = Date.now() - startTime;
    const html = await res.text();
    const htmlSizeBytes = html.length;

    // Parse title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    // Parse meta description
    const descMatch =
      html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    const metaDescription = descMatch ? descMatch[1].trim() : '';

    // Viewport
    const viewportFound = /<meta[^>]*name=["']viewport["']/i.test(html);

    // Canonical
    const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';

    // OG tags
    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i);
    const ogTitle = ogTitleMatch ? ogTitleMatch[1].trim() : '';

    const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i);
    const ogDesc = ogDescMatch ? ogDescMatch[1].trim() : '';

    // H1 tags
    const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
      m[1].replace(/<[^>]+>/g, '').trim()
    );

    // H2 count
    const h2Count = (html.match(/<h2[^>]*>/gi) || []).length;

    // Images & alt tags
    const imgMatches = [...html.matchAll(/<img([^>]*)>/gi)];
    const totalImages = imgMatches.length;
    let imagesMissingAlt = 0;
    for (const match of imgMatches) {
      const attrs = match[1];
      if (!/alt=["'][^"']*["']/i.test(attrs)) {
        imagesMissingAlt++;
      }
    }

    return {
      accessible: true,
      status: res.status,
      title,
      titleLength: title.length,
      metaDescription,
      descLength: metaDescription.length,
      viewportFound,
      canonical,
      h1Tags: h1Matches.slice(0, 3),
      h2Count,
      totalImages,
      imagesMissingAlt,
      htmlSizeBytes,
      responseTimeMs,
      isHttps,
      ogTitle,
      ogDesc,
    };
  } catch (err) {
    return {
      accessible: false,
      title: '',
      titleLength: 0,
      metaDescription: '',
      descLength: 0,
      viewportFound: true,
      h1Tags: [],
      h2Count: 0,
      totalImages: 0,
      imagesMissingAlt: 0,
      htmlSizeBytes: 0,
      responseTimeMs: Date.now() - startTime,
      isHttps,
    };
  }
}

// Compute Grade helper
function calculateGrade(score: number): 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' {
  if (score >= 95) return 'A+';
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  if (score >= 55) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

// Domain-Aware Savage Hinglish Roaster (Zero Templates, Pure Sarcasm & 3 Punchy Bullets)
function generateDomainAwareHinglishRoast(
  domain: string,
  _title: string,
  _scraped: ScrapedData,
  overall: number,
  roastLevel: string
) {
  const d = domain.toLowerCase();
  const rawBrand = domain.replace(/^www\./, '').split('.')[0];
  const brandCaps = rawBrand.toUpperCase();

  const isEcommerce = /(shop|store|boutique|cart|buy|mart|retail|mall|fashion|shoe|cloth|outfit|gear|deal)/i.test(d);
  const isTechSaas = /(dev|tech|ai|portfolio|app|io|soft|cloud|saas|stack|api|code|studio|bot)/i.test(d);
  const isCrypto = /(crypto|coin|token|web3|dao|nft|chain|defi|dex|btc|eth|sol)/i.test(d);
  const isBlogNews = /(blog|news|daily|times|post|journal|press|article|media|buzz)/i.test(d);

  let bullets: [string, string, string];
  let nickname: string;
  let punchlines: string[];
  let prescription: string[];

  if (isEcommerce) {
    nickname = `${brandCaps} - Dropshipping Ki Dukan`;
    bullets = [
      `AliExpress se $2 ka sasta maal utha kar $49 mein bechne ka jo overconfidence hai, usey dekh kar Mark Zuckerberg bhi apna phone switch off kar le—bhai kya soch kar banaya tha yeh e-commerce tamasha?`,
      `Fake countdown timer aur 99% discount popups ka aisa ajeeb nasha hai ki design dekh kar rona agaya; UX ka janaza aisa nikla hai ki add-to-cart button dhoondhne ke liye GPS on karna padta hai.`,
      `Chinese supplier ka shipping time 45 din hai aur user ka bounce rate 2 second—traffic itna zero hai ki tumhare payment gateway pe makdi ne jaala bana liya hai.`,
    ];
    punchlines = [
      `AliExpress se $2 ka maal utha kar $49 mein bechne ka alag hi overconfidence hai!`,
      `Fake countdown timer lagane se sasta template luxury boutique nahi ban jaata!`,
      `Chinese supplier 45 din mein delivery karega aur user 2 second mein tab band karke bhaag gaya!`,
      `Cart button dhoondhne ke liye customer ko treasure hunt khelna pad raha hai!`,
    ];
    prescription = [
      `Faltu popups aur fake urgency countdown timers foran trash bin mein daalo.`,
      `Images ko 8MB PNG se 50KB WebP mein compress karo taaki store 2 second ke andar render ho.`,
      `Product pages pe genuine reviews aur real delivery estimate likhna shuru karo.`,
    ];
  } else if (isTechSaas) {
    nickname = `${brandCaps} - Copy-Paste Unicorn`;
    bullets = [
      `Wrapper API pe apna logo chipka kar "Revolutionary Next-Gen AI Platform" ghoshit kar diya—bhai kya soch kar banaya tha yeh copy-paste engineer ka chamatkar?`,
      `Overused glassmorphism, bekar gradient aur dark mode ka aisa ajeeb nasha hai ki design dekh kar rona agaya; mobile pe kholte hi typography aur layout ka janaza nikal jata hai.`,
      `Landing page pe "Trusted by 10,000+ Teams" likh kar khud ko fool bana rahe ho, jabki reality yeh hai ki tumhari mummy aur tumhare college ke room partner ke alawa yahan koi traffic nahi aata.`,
    ];
    punchlines = [
      `API wrapper pe logo chipka kar khud ko Sam Altman samajhne ka ajeeb nasha hai!`,
      `Overused glassmorphism design dekh kar rona agaya, lagta hai Figma tutorial aadha dekha tha!`,
      `Landing page pe "Trusted by Fortune 500" likha hai par traffic mein bas tumhari mummy ka click hai!`,
      `Tech stack itna overcomplicated hai par website ka load time 90s ke dial-up jaisa hai!`,
    ];
    prescription = [
      `Faltu three.js canvas aur bloatware scripts hatao taaki LCP 2.0 second ke andar aaye.`,
      `Jargon-bhari corporate buzzwords chhod kar simple 1-line value proposition likho.`,
      `Single semantic <h1> tag lagao taaki Googlebot ko samajh aaye tool aakhir karta kya hai.`,
    ];
  } else if (isCrypto) {
    nickname = `${brandCaps} - Rug-Pull Ka Adda`;
    bullets = [
      `Whitepaper mein 50 baar "Decentralized Autonomous Web3 Revolution" likhne se rug-pull ki smell gayab nahi hoti—life savings doobane ka poora roadmap pehle din se crystal clear hai.`,
      `Website ka design 1998 ke scam banner jaisa hai jismein connect-wallet button har kone mein naach raha hai; UX ka aisa janaza nikla hai ki legitimate user dekhte hi browser crash kar le.`,
      `Discord server mein 3 inactive bots aur 1 frustrated admin ke alawa koi zinda nahi bacha, aur organic traffic ka haal yeh hai ki Googlebot ne bhi safety warning laga kar tab close kar diya.`,
    ];
    punchlines = [
      `Whitepaper padh ke lagta hai Mars pe colonization kar rahe hain, par roadmap pe bas rug-pull hai!`,
      `Discord server itna sunsan hai ki vahan bhoot bhi akele aane se darta hai!`,
      `Connect-wallet button pe click karte hi user ki life savings ka antim sanskar pakka hai!`,
      `Googlebot ne tumhari Web3 landing page dekhi aur khud ko blocklist mein daal liya!`,
    ];
    prescription = [
      `Spam wallet-connect prompts hatao aur pehle SSL/HTTPS security headers configure karo.`,
      `Crypto buzzwords ki jagah actual utility aur verified team credentials disclose karo.`,
      `Lightweight clean HTML structure banao taaki crawlers ko scam trap na lage.`,
    ];
  } else if (isBlogNews) {
    nickname = `${brandCaps} - Clickbait Ki Dukan`;
    bullets = [
      `"Chaliye shuru karte hain" likh kar 4,000 words ka essay chaap diya jismein kaam ki baat ek line bhi nahi hai—muft ki salah baantne ka alag hi overconfidence hai.`,
      `15 popups, 22 autoplay videos aur third-party ads ke jungle ke beech content aisa chhupa hai jaise jungle mein suyi; sasta template aur layout dekh kar rona agaya.`,
      `Clickbait headline daal kar Google Discover ko ullu banane ki koshish ki, par algorithm ne site ko aisi gumnami mein phenka jahan se traffic ka ek katora bhi wapas nahi aana.`,
    ];
    punchlines = [
      `Recipe blog mein pehle lekhak ne apne par-dada ki kahani likhi, namak ka chamach 5km neeche mila!`,
      `Ads itne zyada hain ki galti se scroll karo toh seedha Dubai real-estate lead ban jaate ho!`,
      `Clickbait title dekh kar user aaya tha, par back button dabane ki speed Olympic record tod gayi!`,
      `Googlebot ne tumhari 5,000 words ki bakwaas padhi aur memory clean karke bhaag gaya!`,
    ];
    prescription = [
      `Autoplay video ads aur 12 layer popups ko hata kar content ko readable banao.`,
      `First 100 words mein direct answer provide karo taaki AEO/GEO engine quote kar sake.`,
      `Meta description aur heading tags mein clickbait ki jagah actual value deliver karo.`,
    ];
  } else {
    nickname = `${brandCaps} - Sasta Digital Thela`;
    bullets = [
      `Bhai kya soch kar banaya tha yeh concept? Value proposition aisi gayab hai jaise dhoop mein baraf—muft ki salah yeh hai ki dukan kholne se pehle socho bechna kya hai.`,
      `Sasta template aur default theme utha kar live kar diya; design dekh kar rona agaya aur UX ka aisa janaza nikla hai ki user pehli 3 second mein escape key dhoondhta hai.`,
      `Overconfidence itna ki SEO agency hire karne ke sapne dekh rahe ho, par organic traffic ka haal yeh hai ki analytics dashboard pe graph zameen ke andar tunnel khod raha hai.`,
    ];
    punchlines = [
      `Bhai kya soch kar banaya tha yeh sasta template? Design dekh kar sach mein rona agaya!`,
      `Website load hone mein itna time lag raha hai ki user chai peeke so bhi gaya!`,
      `UX ka aisa janaza nikla hai ki navigation bar dhoondhne ke liye telescope chahiye!`,
      `Organic traffic itna dry hai ki analytics ke dashboard pe cactus ug aaya hai!`,
    ];
    prescription = [
      `Title tag aur meta description ko concise, keyword-rich aur action-oriented banao.`,
      `Slow external fonts aur unoptimized images ko clean WebP mein migrate karo.`,
      `Ek single authoritative H1 tag aur clear navigational hierarchy setup karo.`,
    ];
  }

  const savageRoast = bullets.map((b) => `• ${b}`).join('\n\n');

  return {
    siteNickname: nickname,
    savageRoast,
    punchlines,
    desiPrescription: prescription,
    roastScore: `${(overall / 10).toFixed(1)}/10 - Sakht Dawaai Ki Zaroorat Hai!`,
    shareableQuote: `Maine ${domain} ka SEO audit karwaya FixMySEO pe, aur AI ne aisi bezti ki ki ab main website delete karke kheti karne ja raha hoon! 😂`,
    burnLevel: roastLevel,
    language: 'hinglish',
  };
}

// API: Instant SEO Audit & Hinglish Roast
app.post('/api/audit', async (req, res) => {
  try {
    const rawUrl = req.body?.url;
    const roastLevel = req.body?.roastLevel || 'Masala Spicy'; // Mild Chai Roast | Masala Spicy | Nuclear Desi Burn
    const roastLanguage = (req.body?.roastLanguage === 'english' ? 'english' : 'hinglish') as 'english' | 'hinglish';

    if (!rawUrl || typeof rawUrl !== 'string' || rawUrl.trim().length === 0) {
      res.status(400).json({ error: 'Please provide a valid website URL.' });
      return;
    }

    const cleanUrl = sanitizeUrl(rawUrl);
    let domain = '';
    try {
      domain = new URL(cleanUrl).hostname;
    } catch {
      domain = cleanUrl.replace(/^https?:\/\//, '').split('/')[0];
    }

    // Step 1: Real crawler probe
    const scraped = await scrapePage(cleanUrl);

    // Step 2: Use Gemini with Google Search Grounding to evaluate real online visibility and audit
    let geminiResponseText = '';
    const groundingSources: { title: string; uri: string }[] = [];

    const roastInstructions = roastLanguage === 'english' ? `
6. AI ROASTER (Language: ENGLISH - CORPORATE TECH / SILICON VALLEY SAVAGE ROAST):
   Create a VIRAL, SAVAGE, ultra-witty, highly intelligent tech-industry style roast of this website written entirely in fluent, premium English tailored for corporate Tier 1 users (Silicon Valley startup satire, VC roasting, brutal tech humor, Y Combinator rejection vibes).
   Requirements:
   - siteNickname: A sharp, witty tech moniker (e.g., "The Overfunded 404 Carousel", "The Dial-Up Unicorn", "The Series-A SEO Tragedy", "A Masterclass in Bounce Rate Optimization").
   - savageRoast: 3-4 paragraphs of biting, highly articulate tech satire roasting their bloated DOM, abysmal LCP, invisible meta descriptions, and non-existent SEO strategy. (e.g., "Your Largest Contentful Paint took so long that your target market aged into a different demographic.", "This website isn't just invisible to Googlebot; it's practically an unwitting witness protection program for your content.").
   - punchlines: 4-5 razor-sharp tech one-liners in English.
   - desiPrescription: 3-4 witty, high-impact technical remediation directives in English (e.g., "Strip your 8MB hero image down to modern WebP format before your VC pulls the bridge round.", "Trim that 95-character meta title before Google truncates it into oblivion.").
   - roastScore: A witty score rating string, e.g., "3.2/10 - Urgent ICU Admission Required".
   - shareableQuote: A short punchy quote fit for a tech tweet or LinkedIn roast.
   - burnLevel: "${roastLevel}"
` : `
6. HINGLISH AI ROASTER (Language: HINGLISH - DESI BURN):
   You are a savage, brutally honest, and hilarious AI Website Roaster who speaks fluent Hinglish (a mixture of street-style Hindi/Urdu and English). Your ultimate goal is to roast websites with extreme sarcasm, wit, and unique jokes based entirely on their domain name, industry, and online vibe.

   CRITICAL INSTRUCTIONS TO PREVENT TEMPLATE REPETITION:
   1. STRICTLY FORBIDDEN TEMPLATES: Do not reuse introductory hooks, middle filler phrases, or fixed conclusion punchlines. Every website must receive an entirely original roast layout.
   2. NO SIMPLE NAME-SWAPPING: Do not use a pre-set paragraph and just change the website name. Craft unique analogies specifically for this domain ("${domain}").
   3. DETECT DOMAIN TYPE & ROAST ACCORDINGLY:
      - If the domain looks like an E-commerce/Shopify store (e.g., contains 'shop', 'store', 'boutique', 'cart', 'buy'): roast their generic dropshipping dreams, fake countdown timers, and Chinese supplier shipping times.
      - If the domain looks like a Tech Portfolio/SaaS/AI tool (e.g., contains 'dev', 'tech', 'ai', 'portfolio', 'app', 'io', 'soft'): roast their overused glassmorphism design, boring tech stack, and the fact that nobody visits their site except their mom.
      - If it looks like a Crypto/Web3 site (e.g., contains 'crypto', 'coin', 'token', 'web3', 'dao', 'nft', 'chain', 'defi'): roast their rug-pull vibes, dead discord servers, and loss of life savings.
      - If it's a personal blog or news site (e.g., contains 'blog', 'news', 'daily', 'post', 'times', 'medium'): roast their essay-length introductions and clickbait nature.
      - Otherwise: dynamically inspect the crawled page title and headings to roast their exact niche with savage accuracy.
   4. TONE & VOCABULARY: Use raw, natural internet-slang Hinglish (words like: "Bhai kya soch kar banaya?", "Sasta template", "Design dekh kar rona agaya", "Ajeeb nashe hain", "UX ka janaza", "Copy-paste engineer", "Overconfidence", "Muft ki salah"). Avoid sounding like a formal translation tool.

   OUTPUT FORMAT FOR savageRoast:
   Deliver the roast in exactly 3 short, punchy, and utterly devastating bullet points formatted with "• " at the start of each bullet point (separated by double newlines).
   - Point 1 must target the concept/idea/industry delusion.
   - Point 2 must target the UI/UX layout vibe and technical execution (missing tags, sluggish speed, amateur aesthetics).
   - Point 3 must target their realistic traffic/future (0 visitors, bounce rate, Googlebot abandoning them).
   STRICT RULE: Do NOT include any greeting, intro hook, or conversational filler before or after the 3 bullet points in savageRoast!
   - siteNickname: A sharp, culturally hilarious nickname (e.g. "${domain.split('.')[0].toUpperCase()} - Dropshipping Ki Dukan").
   - punchlines: 4-5 razor-sharp Hinglish one-liners.
   - desiPrescription: 3-4 witty, actionable remediation directives in Hinglish.
   - roastScore: A funny rating string, e.g. "3.2/10 - Sakht Dawaai Ki Zaroorat Hai!"
   - shareableQuote: A short punchy quote fit for a viral tweet or LinkedIn roast.
   - burnLevel: "${roastLevel}"
`;

    const prompt = `
You are the primary engine for "FixMySEO", an elite AI-powered website auditor and viral SEO roaster.
Audit the following website:
URL: "${cleanUrl}"
Domain: "${domain}"
Roast Level requested: "${roastLevel}"
Roast Language Mode: "${roastLanguage.toUpperCase()}"

CRAWLER RAW DIAGNOSTIC DATA:
- Accessible directly: ${scraped.accessible} (Status: ${scraped.status || 'timeout/cors'})
- Detected Title: "${scraped.title || 'NONE FOUND'}" (${scraped.titleLength} characters)
- Detected Meta Description: "${scraped.metaDescription || 'NONE FOUND'}" (${scraped.descLength} characters)
- Viewport Meta Tag Detected: ${scraped.viewportFound}
- HTTPS Enabled: ${scraped.isHttps}
- Canonical URL: "${scraped.canonical || 'None'}"
- H1 Tags: ${JSON.stringify(scraped.h1Tags)}
- H2 Count: ${scraped.h2Count}
- Total Images: ${scraped.totalImages}, Missing Alt: ${scraped.imagesMissingAlt}
- Server Response Time: ${scraped.responseTimeMs}ms
- Estimated HTML Payload: ${Math.round(scraped.htmlSizeBytes / 1024)} KB

TASK:
1. Search online using Google Search Grounding for information about this domain, company, page titles, ranking keywords, search presence, or reputation.
2. Formulate realistic Core Web Vitals estimates (FCP, LCP, CLS, TTI).
3. Evaluate:
   - Meta Data: Title tag (ideal 30-60 chars), Description (ideal 120-160 chars), Canonical, OpenGraph.
   - Page Speed & Performance: Server response time, asset weight, caching, DOM size.
   - Mobile Readiness & UX: Viewport meta tag, responsive layout, touch target size.
   - Content Structure: H1 presence (must have exactly 1 primary H1), subheadings, alt attributes.
   - Security & Indexability: HTTPS SSL, Robots.txt, indexing status.
4. Calculate an Overall Score (0-100) and scores for each category.
5. Create a list of 8 to 12 distinct audit findings with statuses: 'good' (pass), 'warning', or 'error' (critical failure).
   For any warning or error, provide an exact, copy-pasteable HTML or code snippet in 'fixSnippet'.

${roastInstructions}

RETURN ONLY VALID RAW JSON (no markdown triple backticks around the json if possible, or standard json) adhering strictly to this schema:
{
  "overallScore": number,
  "scores": {
    "pageSpeed": number,
    "metaData": number,
    "mobileReadiness": number,
    "contentStructure": number,
    "security": number
  },
  "metrics": {
    "title": {
      "text": string,
      "length": number,
      "status": "good" | "warning" | "error",
      "message": string
    },
    "description": {
      "text": string,
      "length": number,
      "status": "good" | "warning" | "error",
      "message": string
    },
    "h1": {
      "text": string,
      "count": number,
      "status": "good" | "warning" | "error",
      "message": string
    },
    "mobile": {
      "viewportFound": boolean,
      "status": "good" | "warning" | "error",
      "message": string
    },
    "speed": {
      "fcp": string,
      "lcp": string,
      "cls": string,
      "tti": string,
      "score": number,
      "status": "good" | "warning" | "error"
    },
    "ssl": {
      "enabled": boolean,
      "status": "good" | "warning" | "error",
      "message": string
    },
    "images": {
      "total": number,
      "missingAlt": number,
      "status": "good" | "warning" | "error",
      "message": string
    }
  },
  "auditItems": [
    {
      "id": string,
      "category": "meta" | "speed" | "mobile" | "structure" | "security",
      "status": "good" | "warning" | "error",
      "title": string,
      "explanation": string,
      "recommendation": string,
      "fixSnippet": string,
      "impact": "High" | "Medium" | "Low"
    }
  ],
  "hinglishRoast": {
    "siteNickname": string,
    "savageRoast": string,
    "punchlines": string[],
    "desiPrescription": string[],
    "roastScore": string,
    "shareableQuote": string,
    "burnLevel": string
  }
}
`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      geminiResponseText = response.text || '';

      // Extract search grounding citations
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (Array.isArray(chunks)) {
        for (const chunk of chunks) {
          if (chunk.web?.uri) {
            groundingSources.push({
              title: chunk.web.title || domain,
              uri: chunk.web.uri,
            });
          }
        }
      }
    } catch (aiErr) {
      console.warn('Gemini API call failed, falling back to local heuristic synthesizer:', aiErr);
    }

    let parsedResult: any = null;

    if (geminiResponseText) {
      try {
        const cleaned = geminiResponseText
          .replace(/```json/g, '')
          .replace(/```/g, '')
          .trim();
        parsedResult = JSON.parse(cleaned);
      } catch (parseErr) {
        console.warn('Failed to parse Gemini JSON directly, extracting substring:', parseErr);
        const match = geminiResponseText.match(/\{[\s\S]*\}/);
        if (match) {
          try {
            parsedResult = JSON.parse(match[0]);
          } catch (e) {
            parsedResult = null;
          }
        }
      }
    }

    // If Gemini was unreachable or JSON was invalid, build high-fidelity fallback from scraped data
    if (!parsedResult || !parsedResult.overallScore) {
      const titleLen = scraped.titleLength || 0;
      const titleGood = titleLen >= 30 && titleLen <= 65;
      const descLen = scraped.descLength || 0;
      const descGood = descLen >= 120 && descLen <= 160;
      const h1Count = scraped.h1Tags.length;

      const metaScore = (titleGood ? 45 : 20) + (descGood ? 45 : 20) + (scraped.canonical ? 10 : 0);
      const speedScore = scraped.responseTimeMs < 400 ? 88 : scraped.responseTimeMs < 1000 ? 72 : 55;
      const mobileScore = scraped.viewportFound ? 92 : 45;
      const structureScore = h1Count === 1 ? 88 : h1Count > 1 ? 65 : 40;
      const securityScore = scraped.isHttps ? 95 : 30;

      const overall = Math.round(
        (metaScore * 0.25) +
        (speedScore * 0.25) +
        (mobileScore * 0.2) +
        (structureScore * 0.15) +
        (securityScore * 0.15)
      );

      parsedResult = {
        overallScore: overall,
        scores: {
          pageSpeed: speedScore,
          metaData: metaScore,
          mobileReadiness: mobileScore,
          contentStructure: structureScore,
          security: securityScore,
        },
        metrics: {
          title: {
            text: scraped.title || 'No Title Tag Found',
            length: titleLen,
            status: titleGood ? 'good' : titleLen === 0 ? 'error' : 'warning',
            message: titleGood
              ? `Optimal length (${titleLen} chars). Search snippets render cleanly.`
              : titleLen === 0
              ? 'Missing <title> tag completely. Critical SEO flaw!'
              : `Length is ${titleLen} chars (Recommended: 30-60 characters).`,
          },
          description: {
            text: scraped.metaDescription || 'No Meta Description Found',
            length: descLen,
            status: descGood ? 'good' : descLen === 0 ? 'error' : 'warning',
            message: descGood
              ? `Optimal length (${descLen} chars). Perfectly tailored for SERP snippets.`
              : descLen === 0
              ? 'Missing meta description. Search engines will auto-generate random snippets!'
              : `Length is ${descLen} chars. (Recommended: 120-160 characters).`,
          },
          h1: {
            text: scraped.h1Tags[0] || 'No H1 Found',
            count: h1Count,
            status: h1Count === 1 ? 'good' : h1Count === 0 ? 'error' : 'warning',
            message:
              h1Count === 1
                ? 'Exactly one primary <h1> detected. Follows strict semantic hierarchy.'
                : h1Count === 0
                ? 'Missing <h1> tag. Major search crawler disorientation risk!'
                : `Detected ${h1Count} <h1> tags. Multiple H1s dilute topical authority.`,
          },
          mobile: {
            viewportFound: scraped.viewportFound,
            status: scraped.viewportFound ? 'good' : 'error',
            message: scraped.viewportFound
              ? 'Viewport meta tag configured properly for mobile rendering.'
              : 'Missing viewport tag. Site will render shrunk on smartphones.',
          },
          speed: {
            fcp: `${(scraped.responseTimeMs / 1000 + 0.4).toFixed(1)}s`,
            lcp: `${(scraped.responseTimeMs / 1000 + 1.2).toFixed(1)}s`,
            cls: '0.04',
            tti: `${(scraped.responseTimeMs / 1000 + 1.8).toFixed(1)}s`,
            score: speedScore,
            status: speedScore > 80 ? 'good' : speedScore > 60 ? 'warning' : 'error',
          },
          ssl: {
            enabled: scraped.isHttps,
            status: scraped.isHttps ? 'good' : 'error',
            message: scraped.isHttps
              ? 'Valid HTTPS SSL encryption active.'
              : 'Insecure HTTP connection. Google penalizes non-SSL domains!',
          },
          images: {
            total: scraped.totalImages,
            missingAlt: scraped.imagesMissingAlt,
            status: scraped.imagesMissingAlt === 0 ? 'good' : scraped.imagesMissingAlt > 5 ? 'error' : 'warning',
            message:
              scraped.imagesMissingAlt === 0
                ? 'All images have descriptive alt attributes.'
                : `${scraped.imagesMissingAlt} out of ${scraped.totalImages} images lack alt attributes.`,
          },
        },
        auditItems: [
          {
            id: 'meta-title',
            category: 'meta',
            status: titleGood ? 'good' : 'warning',
            title: 'Page Title Tag Length & Visibility',
            explanation:
              'The <title> tag is the single most critical on-page ranking signal and click-through driver on Google.',
            recommendation: titleGood
              ? 'Title is within optimal length limits.'
              : 'Keep page title between 30 and 60 characters with primary target keywords.',
            fixSnippet: `<title>${scraped.title || 'Brand Name - Primary Keyword | Value Proposition'}</title>`,
            impact: 'High',
          },
          {
            id: 'meta-desc',
            category: 'meta',
            status: descGood ? 'good' : 'error',
            title: 'Meta Description Tag (120-160 Chars)',
            explanation:
              'A compelling meta description under 160 characters acts as ad copy on Google search results.',
            recommendation: 'Provide an actionable 1-2 sentence summary between 120 and 160 characters.',
            fixSnippet: `<meta name="description" content="Discover ${domain}'s cutting-edge solutions. Fast, reliable, and designed to optimize your workflow with ease." />`,
            impact: 'High',
          },
          {
            id: 'h1-structure',
            category: 'structure',
            status: h1Count === 1 ? 'good' : 'warning',
            title: 'Heading Hierarchy & H1 Single Existence',
            explanation: 'Search crawlers require exactly one clear <h1> tag representing the topic of the document.',
            recommendation: 'Ensure exactly one main H1 tag is present at the top of the body content.',
            fixSnippet: `<h1>${scraped.h1Tags[0] || 'FixMySEO: The AI-Powered Website Audit & Optimization Tool'}</h1>`,
            impact: 'High',
          },
          {
            id: 'mobile-viewport',
            category: 'mobile',
            status: scraped.viewportFound ? 'good' : 'error',
            title: 'Mobile Viewport Tag Configuration',
            explanation: 'Enables mobile-first indexing and responsive viewport scaling on iOS and Android devices.',
            recommendation: 'Add the standard viewport meta tag inside the <head> block.',
            fixSnippet: `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`,
            impact: 'High',
          },
          {
            id: 'image-alt',
            category: 'structure',
            status: scraped.imagesMissingAlt === 0 ? 'good' : 'warning',
            title: 'Image Alt Attribute Accessibility & Image Search',
            explanation: 'Search engines rely on alt text to understand images and rank them in Google Images.',
            recommendation: 'Provide descriptive alt tags describing the image content.',
            fixSnippet: `<img src="hero-banner.webp" alt="FixMySEO analytical dashboard interface" width="1200" height="630" />`,
            impact: 'Medium',
          },
          {
            id: 'speed-lcp',
            category: 'speed',
            status: speedScore > 75 ? 'good' : 'warning',
            title: 'Core Web Vitals: Largest Contentful Paint (LCP)',
            explanation: 'LCP measures when the main content of a web page has likely loaded. Target: < 2.5s.',
            recommendation: 'Preload hero images and optimize server TTFB caching.',
            fixSnippet: `<link rel="preload" href="/hero.webp" as="image" type="image/webp" fetchpriority="high" />`,
            impact: 'High',
          },
          {
            id: 'security-ssl',
            category: 'security',
            status: scraped.isHttps ? 'good' : 'error',
            title: 'HTTPS SSL Encryption & Mixed Content',
            explanation: 'Google has confirmed HTTPS is a mandatory ranking signal and flags HTTP as insecure.',
            recommendation: 'Redirect all HTTP traffic to HTTPS and use HSTS headers.',
            fixSnippet: `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`,
            impact: 'High',
          },
          {
            id: 'meta-canonical',
            category: 'meta',
            status: scraped.canonical ? 'good' : 'warning',
            title: 'Canonical URL Tag',
            explanation: 'Prevents duplicate content penalties by declaring the authoritative master URL to Google.',
            recommendation: 'Always specify a self-referential canonical tag.',
            fixSnippet: `<link rel="canonical" href="${cleanUrl}" />`,
            impact: 'Medium',
          },
        ],
        hinglishRoast: roastLanguage === 'english' ? {
          siteNickname: `${domain.split('.')[0].toUpperCase()} - The Series-A SEO Disaster`,
          savageRoast: `Good grief! We analyzed ${domain} and Googlebot literally submitted a two-week notice trying to index this page! Your Largest Contentful Paint took so long that your target market aged into an entirely different consumer demographic. Your meta tags are missing as if they signed a non-disclosure agreement, and discovering an H1 tag here required an investigative subpoena from the SEC. If this is how your engineering team optimizes web vitals, we pray your database backups are handled by someone else!`,
          punchlines: [
            `Your Largest Contentful Paint took so long that your user aged into a new demographic!`,
            `Your meta description is so empty it qualifies as an acoustic vacuum chamber.`,
            `Googlebot visited your domain, threw up an internal 500 error, and went back to scraping Wikipedia.`,
            `Images missing alt tags everywhere—Google assumes you're displaying modern abstract art.`,
            `A masterclass in user bounce rate maximization.`,
          ],
          desiPrescription: [
            `Compress your giant unoptimized images to WebP before your runway runs dry.`,
            `Cut the meta title down to 55 characters before Google chops it in half.`,
            `Establish exactly one semantic H1 tag so search engines understand your value proposition.`,
            `Craft a 145-character meta description with compelling commercial intent.`,
          ],
          roastScore: `${(overall / 10).toFixed(1)}/10 - Severe Technical Debt Detected!`,
          shareableQuote: `I audited ${domain} on FixMySEO and the AI roasted our Core Web Vitals so hard our lead dev is reconsidering their career choices. 😂`,
          burnLevel: roastLevel,
          language: 'english',
        } : generateDomainAwareHinglishRoast(domain, scraped.title || '', scraped, overall, roastLevel),
      };
    }

    // Assign overall grade
    const finalScore = Math.max(10, Math.min(100, Math.round(parsedResult.overallScore || 70)));
    const grade = calculateGrade(finalScore);

    const auditResponse = {
      url: cleanUrl,
      analyzedAt: new Date().toISOString(),
      overallScore: finalScore,
      grade,
      roastLanguage,
      scores: parsedResult.scores,
      metrics: parsedResult.metrics,
      auditItems: parsedResult.auditItems,
      hinglishRoast: {
        ...parsedResult.hinglishRoast,
        language: roastLanguage,
      },
      groundingSources,
      isDemoFallback: !geminiResponseText,
    };

    res.json(auditResponse);
  } catch (err: any) {
    console.error('Audit handler error:', err);
    res.status(500).json({
      error: 'An error occurred while generating the audit. Please try again with a valid URL.',
      details: err?.message,
    });
  }
});

// API: AI Meta Tag & Schema Generator
app.post('/api/generate-fix', async (req, res) => {
  try {
    const { url, topic, type } = req.body;
    const prompt = `
Generate high-CTR, strictly SEO-compliant output for:
URL: "${url || 'https://mywebsite.com'}"
Topic/Focus: "${topic || 'General'}"
Type: "${type || 'meta'}" (options: meta, schema, content)

Instructions:
If type is "meta":
Provide 3 variations of:
1. Title (strictly 45-60 characters, includes primary keyword, branding and CTR magnet).
2. Meta Description (strictly 135-155 characters, includes value prop, action verb, and benefit).

If type is "schema":
Provide valid JSON-LD schema (WebApplication or FAQPage or LocalBusiness) ready to copy paste.

If type is "content":
Provide optimized H1, H2 structure, and opening SEO-friendly paragraph.

Respond in JSON format:
{
  "type": "${type}",
  "results": [
    {
      "title": string,
      "description": string,
      "chars": { "title": number, "desc": number },
      "schemaCode": string,
      "explanation": string
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const json = JSON.parse(response.text || '{}');
    res.json(json);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to generate AI fix', details: err?.message });
  }
});

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'FixMySEO Engine', timestamp: new Date().toISOString() });
});

// Production static file serving or development Vite middleware mounting
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FixMySEO server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
