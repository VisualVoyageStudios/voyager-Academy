// Original SVG diagrams — no third-party or copyrighted material.
// Loaded before lessons-content.js so lesson bodies can reference DIAGRAMS.xxx.
const DIAGRAMS = {

  baseQuote: `
    <figure class="va-diagram">
    <svg viewBox="0 0 400 140" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="30" width="160" height="80" rx="8" fill="#f7f7f8" stroke="#111114" stroke-width="2"/>
      <text x="100" y="60" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="#111114">EUR</text>
      <text x="100" y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" fill="#6b6b72">Base Currency</text>
      <text x="100" y="98" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#6b6b72">(what you buy/sell)</text>
      <text x="200" y="78" text-anchor="middle" font-family="Inter, sans-serif" font-size="24" font-weight="800" fill="#c8102e">/</text>
      <rect x="220" y="30" width="160" height="80" rx="8" fill="#f7f7f8" stroke="#c8102e" stroke-width="2"/>
      <text x="300" y="60" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" font-weight="700" fill="#111114">USD</text>
      <text x="300" y="82" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" fill="#6b6b72">Quote Currency</text>
      <text x="300" y="98" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#6b6b72">(what it's priced in)</text>
    </svg>
    <figcaption>EUR/USD — buying the pair means buying euros, selling dollars.</figcaption>
    </figure>`,

  riskReward: `
    <figure class="va-diagram">
    <svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg">
      <line x1="40" y1="150" x2="380" y2="150" stroke="#e6e6e9" stroke-width="2"/>
      <rect x="80" y="110" width="60" height="40" fill="#c8102e"/>
      <text x="110" y="103" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#c8102e">-$2</text>
      <text x="110" y="168" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" fill="#6b6b72">Risk</text>
      <rect x="240" y="30" width="60" height="120" fill="#111114"/>
      <text x="270" y="23" text-anchor="middle" font-family="Inter, sans-serif" font-size="12" font-weight="700" fill="#111114">+$6</text>
      <text x="270" y="168" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" fill="#6b6b72">Reward</text>
    </svg>
    <figcaption>A 1:3 risk-to-reward ratio on a $100 account risking 2% per trade.</figcaption>
    </figure>`,

  srFlip: `
    <figure class="va-diagram">
    <svg viewBox="0 0 420 180" xmlns="http://www.w3.org/2000/svg">
      <line x1="20" y1="80" x2="400" y2="80" stroke="#c8102e" stroke-width="2" stroke-dasharray="6,4"/>
      <text x="30" y="70" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#c8102e">Resistance</text>
      <text x="300" y="70" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#111114">...now Support</text>
      <polyline points="20,150 70,100 110,130 160,82 200,120 240,78 280,100 320,79 360,95 400,60" fill="none" stroke="#111114" stroke-width="2.5"/>
      <circle cx="160" cy="82" r="4" fill="#c8102e"/>
      <circle cx="240" cy="78" r="4" fill="#c8102e"/>
      <circle cx="320" cy="79" r="4" fill="#111114"/>
    </svg>
    <figcaption>Price rejects resistance twice, breaks through, then holds that level as support on retest.</figcaption>
    </figure>`,

  chartPatterns: `
    <figure class="va-diagram">
    <svg viewBox="0 0 470 160" xmlns="http://www.w3.org/2000/svg">
      <g>
        <polyline points="10,120 40,50 70,90 100,50 130,120" fill="none" stroke="#111114" stroke-width="2"/>
        <line x1="10" y1="50" x2="130" y2="50" stroke="#c8102e" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="70" y="145" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#6b6b72">Double Top</text>
      </g>
      <g transform="translate(130,0)">
        <polyline points="10,120 35,80 60,95 85,40 110,95 130,80 150,120" fill="none" stroke="#111114" stroke-width="2"/>
        <line x1="35" y1="95" x2="130" y2="95" stroke="#c8102e" stroke-width="1" stroke-dasharray="3,3"/>
        <text x="80" y="145" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#6b6b72">Head &amp; Shoulders</text>
      </g>
      <g transform="translate(260,0)">
        <line x1="10" y1="40" x2="130" y2="40" stroke="#c8102e" stroke-width="1.5"/>
        <polyline points="10,120 40,60 60,90 90,45 130,40" fill="none" stroke="#111114" stroke-width="2"/>
        <text x="70" y="145" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#6b6b72">Ascending Triangle</text>
      </g>
      <g transform="translate(390,0)">
        <polyline points="10,120 30,40" fill="none" stroke="#111114" stroke-width="2"/>
        <polyline points="30,40 45,55 35,65 50,75 40,85" fill="none" stroke="#c8102e" stroke-width="2"/>
        <polyline points="40,85 55,25" fill="none" stroke="#111114" stroke-width="2" stroke-dasharray="4,3"/>
        <text x="35" y="145" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#6b6b72">Bullish Flag</text>
      </g>
    </svg>
    <figcaption>A few of the most common reversal, bilateral, and continuation patterns.</figcaption>
    </figure>`,

  candlesticks: `
    <figure class="va-diagram">
    <svg viewBox="0 0 460 160" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(20,20)">
        <line x1="20" y1="0" x2="20" y2="100" stroke="#111114" stroke-width="2"/>
        <rect x="12" y="48" width="16" height="4" fill="#111114"/>
        <text x="20" y="130" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#6b6b72">Doji</text>
      </g>
      <g transform="translate(140,20)">
        <line x1="20" y1="10" x2="20" y2="100" stroke="#111114" stroke-width="2"/>
        <rect x="10" y="10" width="20" height="25" fill="#c8102e"/>
        <text x="20" y="130" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#6b6b72">Hammer</text>
      </g>
      <g transform="translate(260,20)">
        <line x1="15" y1="30" x2="15" y2="70" stroke="#111114" stroke-width="2"/>
        <rect x="8" y="35" width="14" height="25" fill="#c8102e"/>
        <line x1="45" y1="10" x2="45" y2="100" stroke="#111114" stroke-width="2"/>
        <rect x="35" y="15" width="20" height="75" fill="#111114"/>
        <text x="35" y="130" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#6b6b72">Bullish Engulfing</text>
      </g>
      <g transform="translate(370,20)">
        <line x1="8" y1="10" x2="8" y2="55" stroke="#111114" stroke-width="1.5"/>
        <rect x="3" y="15" width="10" height="35" fill="#111114"/>
        <line x1="25" y1="55" x2="25" y2="75" stroke="#111114" stroke-width="1.5"/>
        <rect x="20" y="60" width="10" height="10" fill="#6b6b72"/>
        <line x1="42" y1="20" x2="42" y2="90" stroke="#111114" stroke-width="1.5"/>
        <rect x="37" y="25" width="10" height="55" fill="#c8102e"/>
        <text x="25" y="130" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#6b6b72">Morning Star</text>
      </g>
    </svg>
    <figcaption>Reading left to right: indecision, rejection, and reversal signals.</figcaption>
    </figure>`,

  fibonacciLadder: `
    <figure class="va-diagram">
    <svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg">
      <line x1="60" y1="10" x2="60" y2="200" stroke="#111114" stroke-width="2"/>
      <g font-family="Inter, sans-serif" font-size="10">
        <line x1="60" y1="10" x2="380" y2="10" stroke="#e6e6e9" stroke-width="1.5"/>
        <text x="65" y="7" fill="#6b6b72">100%</text>
        <rect x="60" y="45" width="320" height="35" fill="#c8102e" opacity="0.12"/>
        <line x1="60" y1="45" x2="380" y2="45" stroke="#c8102e" stroke-width="1.5"/>
        <text x="65" y="42" fill="#c8102e" font-weight="700">88.6%</text>
        <line x1="60" y1="80" x2="380" y2="80" stroke="#c8102e" stroke-width="1.5"/>
        <text x="65" y="77" fill="#c8102e" font-weight="700">78.6%</text>
        <line x1="60" y1="110" x2="380" y2="110" stroke="#e6e6e9" stroke-width="1.5"/>
        <text x="65" y="107" fill="#6b6b72">61.8%</text>
        <line x1="60" y1="135" x2="380" y2="135" stroke="#e6e6e9" stroke-width="1.5"/>
        <text x="65" y="132" fill="#6b6b72">50%</text>
        <line x1="60" y1="160" x2="380" y2="160" stroke="#e6e6e9" stroke-width="1.5"/>
        <text x="65" y="157" fill="#6b6b72">38.2%</text>
        <line x1="60" y1="180" x2="380" y2="180" stroke="#e6e6e9" stroke-width="1.5"/>
        <text x="65" y="177" fill="#6b6b72">23.6%</text>
        <line x1="60" y1="200" x2="380" y2="200" stroke="#111114" stroke-width="1.5"/>
        <text x="65" y="197" fill="#6b6b72">0%</text>
      </g>
      <text x="220" y="65" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#c8102e">Golden Zone</text>
    </svg>
    <figcaption>The Golden Zone (78.6%-88.6%) is where reversals are statistically more likely.</figcaption>
    </figure>`,

  marketStructure: `
    <figure class="va-diagram">
    <svg viewBox="0 0 440 180" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(10,10)" font-family="Inter, sans-serif" font-size="9">
        <polyline points="0,140 40,80 70,100 110,40 140,65 180,10" fill="none" stroke="#111114" stroke-width="2.5"/>
        <text x="35" y="72" fill="#c8102e">HH</text>
        <text x="105" y="32" fill="#c8102e">HH</text>
        <text x="65" y="118" fill="#111114">HL</text>
        <text x="135" y="83" fill="#111114">HL</text>
        <text x="90" y="165" text-anchor="middle" font-size="11" fill="#6b6b72" font-weight="700">Uptrend</text>
      </g>
      <g transform="translate(230,10)" font-family="Inter, sans-serif" font-size="9">
        <polyline points="0,10 40,70 70,50 110,110 140,85 180,140" fill="none" stroke="#111114" stroke-width="2.5"/>
        <text x="35" y="66" fill="#111114">LH</text>
        <text x="135" y="80" fill="#111114">LH</text>
        <text x="65" y="46" fill="#c8102e">LL</text>
        <text x="175" y="158" fill="#c8102e">LL</text>
        <text x="90" y="165" text-anchor="middle" font-size="11" fill="#6b6b72" font-weight="700">Downtrend</text>
      </g>
    </svg>
    <figcaption>Higher highs/higher lows define an uptrend; lower highs/lower lows define a downtrend.</figcaption>
    </figure>`,

  orderTypes: `
  <figure class="va-diagram">
  <svg viewBox="0 0 420 220" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <line x1="30" y1="110" x2="390" y2="110" stroke="#111114" stroke-width="2"/>
    <text x="210" y="100" font-size="10" fill="#111114" font-weight="700" text-anchor="middle">Current Price</text>

    <text x="20" y="45" font-size="11" fill="#c8102e" font-weight="700">Buy Stop</text>
    <text x="20" y="65" font-size="9" fill="#6b6b72">above price, breakout confirmation</text>
    <text x="20" y="150" font-size="11" fill="#111114" font-weight="700">Buy Limit</text>
    <text x="20" y="170" font-size="9" fill="#6b6b72">below price, expecting a bounce</text>

    <text x="210" y="45" font-size="11" fill="#111114" font-weight="700">Sell Limit</text>
    <text x="210" y="65" font-size="9" fill="#6b6b72">above price, expecting a turn down</text>
    <text x="210" y="150" font-size="11" fill="#c8102e" font-weight="700">Sell Stop</text>
    <text x="210" y="170" font-size="9" fill="#6b6b72">below price, breakdown confirmation</text>
  </svg>
  <figcaption>Where each pending order type sits relative to the current market price.</figcaption>
  </figure>`,

  orderBlock: `
    <figure class="va-diagram">
    <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
      <g font-family="Inter, sans-serif">
        <line x1="30" y1="130" x2="30" y2="150" stroke="#111114" stroke-width="1.5"/>
        <rect x="24" y="132" width="12" height="14" fill="#6b6b72"/>
        <line x1="60" y1="125" x2="60" y2="150" stroke="#111114" stroke-width="1.5"/>
        <rect x="54" y="128" width="12" height="15" fill="#6b6b72"/>
        <rect x="78" y="96" width="24" height="58" fill="none" stroke="#c8102e" stroke-width="1.5" stroke-dasharray="4,3"/>
        <line x1="90" y1="100" x2="90" y2="150" stroke="#c8102e" stroke-width="2"/>
        <rect x="82" y="120" width="16" height="25" fill="#c8102e"/>
        <text x="90" y="90" text-anchor="middle" font-size="9" font-weight="700" fill="#c8102e">Order Block</text>
        <line x1="130" y1="20" x2="130" y2="145" stroke="#111114" stroke-width="2.5"/>
        <rect x="122" y="25" width="16" height="115" fill="#111114"/>
        <text x="130" y="15" text-anchor="middle" font-size="9" fill="#6b6b72">Impulse Move</text>
      </g>
    </svg>
    <figcaption>The last candle before a strong impulsive move — the market's footprint.</figcaption>
    </figure>`,

  crt: `
    <figure class="va-diagram">
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
      <g font-family="Inter, sans-serif" font-size="9" fill="#6b6b72">
        <line x1="60" y1="40" x2="60" y2="140" stroke="#111114" stroke-width="2"/>
        <rect x="50" y="70" width="20" height="50" fill="#6b6b72"/>
        <text x="60" y="160" text-anchor="middle" font-weight="700">1. Liquidity Made</text>
        <line x1="60" y1="70" x2="240" y2="70" stroke="#111114" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="60" y1="120" x2="240" y2="120" stroke="#111114" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="150" y1="30" x2="150" y2="130" stroke="#c8102e" stroke-width="2"/>
        <rect x="140" y="75" width="20" height="35" fill="#c8102e"/>
        <text x="150" y="160" text-anchor="middle" font-weight="700">2. Liquidity Purged</text>
        <line x1="240" y1="90" x2="240" y2="180" stroke="#111114" stroke-width="2"/>
        <rect x="230" y="95" width="20" height="70" fill="#111114"/>
        <text x="240" y="195" text-anchor="middle" font-weight="700">3. Neutralized</text>
      </g>
    </svg>
    <figcaption>The 3-candle CRT model: liquidity is made, purged with a rejection wick, then neutralized.</figcaption>
    </figure>`,

  fvgPremiumDiscount: `
  <figure class="va-diagram">
  <svg viewBox="0 0 400 130" xmlns="http://www.w3.org/2000/svg">
    <g font-family="Inter, sans-serif" font-size="10">
      <rect x="20" y="80" width="95" height="20" fill="#c8102e" opacity="0.18"/>
      <line x1="35" y1="100" x2="115" y2="100" stroke="#c8102e" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="35" y1="80" x2="115" y2="80" stroke="#c8102e" stroke-width="1" stroke-dasharray="2,2"/>

      <line x1="35" y1="100" x2="35" y2="140" stroke="#111114" stroke-width="2"/>
      <rect x="27" y="110" width="16" height="25" fill="#111114"/>

      <line x1="65" y1="20" x2="65" y2="110" stroke="#16a34a" stroke-width="2"/>
      <rect x="57" y="30" width="16" height="70" fill="#16a34a"/>

      <line x1="95" y1="45" x2="95" y2="80" stroke="#111114" stroke-width="2"/>
      <rect x="87" y="50" width="16" height="20" fill="#111114"/>

      <text x="75" y="122" text-anchor="middle" fill="#6b6b72" font-weight="700">Fair Value Gap</text>
    </g>
    <g font-family="Inter, sans-serif" font-size="11" transform="translate(140,5)">
      <rect x="0" y="0" width="190" height="55" fill="#c8102e" opacity="0.12" stroke="#c8102e" stroke-width="1.5"/>
      <text x="95" y="32" text-anchor="middle" font-weight="700" fill="#c8102e">Premium — Sell Here</text>
      <rect x="0" y="55" width="190" height="55" fill="#111114" opacity="0.06" stroke="#111114" stroke-width="1.5"/>
      <text x="95" y="87" text-anchor="middle" font-weight="700" fill="#111114">Discount — Buy Here</text>
    </g>
  </svg>
  <figcaption>Candle 3's low sits above candle 1's high — the price zone candle 2 never let the market trade.</figcaption>
  </figure>`,

  elliottWave: `
  <figure class="va-diagram">
  <svg viewBox="0 -15 420 215" xmlns="http://www.w3.org/2000/svg">
    <polyline points="10,160 60,100 90,120 150,40 180,70 240,10 270,50 330,30 360,90 410,60" fill="none" stroke="#111114" stroke-width="2.5"/>
    <g font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#c8102e">
      <text x="60" y="92">1</text>
      <text x="90" y="135">2</text>
      <text x="150" y="32">3</text>
      <text x="180" y="85">4</text>
      <text x="240" y="5">5</text>
      <text x="270" y="65">A</text>
      <text x="330" y="22">B</text>
      <text x="360" y="105">C</text>
    </g>
  </svg>
  <figcaption>Five impulse waves (1-5) followed by a three-wave correction (A-B-C).</figcaption>
  </figure>`,

  cotPositioning: `
  <figure class="va-diagram">
  <svg viewBox="0 0 420 170" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <line x1="210" y1="45" x2="210" y2="140" stroke="#111114" stroke-width="2"/>
    <text x="210" y="50" font-size="12" font-weight="700" fill="#111114">Large Specs: Net Long</text>
    <rect x="210" y="60" width="170" height="30" fill="#c8102e"/>
    <text x="210" y="95" font-size="12" font-weight="700" fill="#111114" text-anchor="end">Commercials: Net Short</text>
    <rect x="120" y="105" width="90" height="30" fill="#111114"/>
  </svg>
  <figcaption>Extreme, one-sided positioning like this often precedes exhaustion of the trend.</figcaption>
  </figure>`,


  tvLayout: `
  <figure class="va-diagram">
  <svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
    <rect x="10" y="10" width="400" height="24" rx="4" fill="#111114"/>
    <text x="20" y="26" font-size="10" fill="#fff">Symbol Search · Interval · Layout Tabs</text>

    <rect x="10" y="40" width="30" height="170" fill="#f7f7f8" stroke="#e6e6e9"/>
    <text x="25" y="130" font-size="9" fill="#6b6b72" text-anchor="middle" transform="rotate(-90 25 130)">Drawing Tools</text>

    <rect x="44" y="40" width="290" height="170" fill="#fff" stroke="#c8102e" stroke-width="1.5"/>
    <text x="189" y="128" font-size="12" fill="#c8102e" text-anchor="middle" font-weight="700">Chart Area</text>

    <rect x="338" y="40" width="72" height="170" fill="#f7f7f8" stroke="#e6e6e9"/>
    <text x="360" y="128" font-size="8" fill="#6b6b72" text-anchor="middle">Watchlist &amp; Calendar</text>

    <rect x="10" y="214" width="400" height="36" fill="#111114"/>
    <text x="210" y="236" font-size="10" fill="#fff" text-anchor="middle">Trading Panel — Paper Trading / Broker / History</text>
  </svg>
  <figcaption>The four zones you'll use constantly: toolbar, drawing tools, chart, and sidebar.</figcaption>
  </figure>`,

  paperTrading: `
    <figure class="va-diagram">
    <svg viewBox="0 0 380 140" xmlns="http://www.w3.org/2000/svg" font-family="Inter, sans-serif">
      <rect x="10" y="10" width="360" height="40" rx="6" fill="#f7f7f8" stroke="#e6e6e9"/>
      <text x="25" y="35" font-size="11" fill="#111114" font-weight="700">Paper Trading Account</text>
      <text x="330" y="35" font-size="11" fill="#c8102e" text-anchor="end" font-weight="700">$100,000.00</text>

      <rect x="10" y="58" width="170" height="72" rx="6" fill="#fff" stroke="#e6e6e9"/>
      <text x="20" y="78" font-size="9" fill="#6b6b72">Open Positions</text>
      <text x="20" y="100" font-size="10" fill="#111114">EURUSD  +$42.10</text>
      <text x="20" y="118" font-size="10" fill="#c8102e">XAUUSD  -$18.60</text>

      <rect x="196" y="58" width="174" height="72" rx="6" fill="#fff" stroke="#e6e6e9"/>
      <text x="206" y="78" font-size="9" fill="#6b6b72">Order Panel</text>
      <rect x="206" y="88" width="70" height="24" rx="4" fill="#111114"/>
      <text x="241" y="104" font-size="9" fill="#fff" text-anchor="middle">Buy</text>
      <rect x="286" y="88" width="70" height="24" rx="4" fill="#c8102e"/>
      <text x="321" y="104" font-size="9" fill="#fff" text-anchor="middle">Sell</text>
    </svg>
    <figcaption>The paper trading panel: account balance, open positions, and one-click order buttons.</figcaption>
    </figure>`,



};