Object.assign(LESSON_CONTENT, {
  "pips-lots-spreads-margin": `
  <p>Before you place a trade you need the platform's vocabulary: how price moves are measured, how big a trade is, what it costs to enter, and how much of your account it ties up. Four words cover almost all of it: pip, lot, spread and margin.</p>

  <h2>Pips: the unit of price movement</h2>
  <p>A <strong>pip</strong> is the standard small step in a pair's price. For most pairs it's the fourth decimal place (0.0001), so EUR/USD moving from 1.1000 to 1.1001 is a one-pip move. For pairs quoted in Japanese yen it's the second decimal place (0.01), so USD/JPY moving from 150.00 to 150.01 is one pip. Many brokers show one extra decimal, called a <em>pipette</em>, which is a tenth of a pip.</p>

  <h2>Lots: the size of your trade</h2>
  <ul>
    <li><strong>Standard lot:</strong> 100,000 units of the base currency</li>
    <li><strong>Mini lot:</strong> 10,000 units (0.10 lots)</li>
    <li><strong>Micro lot:</strong> 1,000 units (0.01 lots)</li>
  </ul>
  <p>Brokers differ in the smallest size they allow, so check yours before you plan a trade.</p>

  <h2>What a pip is worth</h2>
  <p>How much a pip is worth in money depends on your trade size and the pair. On a US dollar account, for pairs where USD is the second currency (EUR/USD, GBP/USD, AUD/USD), it works out like this:</p>
  <table class="va-rtable">
    <thead><tr><th>Lot size</th><th>Units</th><th>Value of one pip</th></tr></thead>
    <tbody>
      <tr><td>Standard (1.00)</td><td>100,000</td><td>$10</td></tr>
      <tr><td>Mini (0.10)</td><td>10,000</td><td>$1</td></tr>
      <tr><td>Micro (0.01)</td><td>1,000</td><td>$0.10</td></tr>
    </tbody>
  </table>
  <p>Other pairs need a small conversion. For USD/JPY, for example, a pip on a standard lot is 1,000 yen, which you divide by the current price to get dollars. You don't need to do this by hand: the <a href="tools.html">Position Size Calculator</a> handles it.</p>

  <h2>The spread: what it costs to get in</h2>
  <p>Every pair has two prices: the <strong>bid</strong> (what you can sell at) and the <strong>ask</strong> (what you can buy at). The gap between them is the <strong>spread</strong>. If EUR/USD shows 1.1000 / 1.1002, the spread is 2 pips. You pay it the moment you enter, so every trade starts slightly in the red.</p>
  <p>Spreads widen around major news, at the daily rollover and in quiet markets. Some accounts quote a very tight "raw" spread and charge a separate commission instead, so compare the total cost, not just the spread. On a short trade the spread is a big share of your risk: 2 pips is a fifth of a 10-pip stop.</p>

  <h2>Margin and leverage</h2>
  <p><strong>Margin</strong> is a deposit your broker sets aside while a trade is open. It isn't a fee, and it's released when the trade closes. It depends on your leverage: at 1:100, a position worth $11,000 needs about $110 of margin.</p>
  <ul>
    <li><strong>Equity:</strong> your balance plus or minus open profits and losses</li>
    <li><strong>Used margin:</strong> the deposit tied up by open trades</li>
    <li><strong>Free margin:</strong> equity minus used margin, what's left to open new trades</li>
    <li><strong>Margin level:</strong> equity divided by used margin, as a percentage</li>
  </ul>
  <p>If your margin level drops too low, the broker issues a <strong>margin call</strong> and, if it keeps falling, automatically closes positions (a <strong>stop-out</strong>). The exact levels differ between brokers, so look them up.</p>
  <div class="va-callout">Leverage doesn't change how much you lose on a 30-pip stop; position size does. High leverage only makes it possible to open a size that is far too big for your account.</div>

  <h2>Swap: the cost of holding overnight</h2>
  <p>If you hold a position past the broker's daily cut-off, you pay or earn a small interest adjustment called <strong>swap</strong> (or rollover), depending on the pair and your direction. Many brokers charge triple swap on one weekday to cover the weekend. It rarely matters for intraday trades, but it adds up on longer holds, so check your broker's swap table.</p>

  <h2>Putting it together</h2>
  <p>You buy 0.10 lots of EUR/USD at 1.1000 with a stop at 1.0970 and a target at 1.1060, on a $3,000 account at 1:100 leverage, with a 1.2-pip spread.</p>
  <ul>
    <li>A pip is worth $1 at 0.10 lots, so the stop risks 30 pips × $1 = $30 (1% of the account).</li>
    <li>The target is 60 pips × $1 = $60, a 1:2 risk-to-reward ratio.</li>
    <li>The spread costs about 1.2 pips × $1 = $1.20.</li>
    <li>Margin is roughly $110.</li>
  </ul>
  <p>Notice that the margin figure says nothing about how much you could lose. The stop did that.</p>
`,

  "choosing-a-broker": `
  <p>A broker is your gateway to the market, and it holds your money. Choosing one matters more than any indicator you'll ever pick, because a bad broker can cost you more than a bad trade.
  Voyager Academy doesn't give personal recommendations. Some brokers linked in our footer are partners, which means we may earn a commission if you sign up through those links, at no cost to you. A partner link isn't an endorsement: check any broker, partner or not, with the steps below.</p>

  <h2>What a broker does</h2>
  <p>A broker gives you a trading platform, quotes prices, executes your orders and holds your deposit. Business models differ. A <strong>market maker</strong> (dealing desk) takes the other side of your trades, which creates a conflict of interest you should be aware of. An <strong>ECN or STP</strong> broker passes orders on to liquidity providers and earns from a spread markup or a commission. Neither model is automatically good or bad. What matters is regulation, transparency and how orders are actually filled.</p>

  <h2>Regulation comes first</h2>
  <ul>
    <li>In South Africa, look for authorisation from the FSCA. Find the broker's FSP number and check it on the FSCA's website, including that it covers the products you want to trade.</li>
    <li>Check the <strong>legal entity</strong> named in the client agreement. Many brokers run several entities under different regulators, and the protection you get depends on which one you actually sign with.</li>
    <li>Ask whether client funds are held in segregated accounts and whether negative balance protection applies. Neither is universal.</li>
  </ul>
  <p>A licence doesn't make a broker perfect, but a missing or unverifiable one is a reason to walk away.</p>

  <h2>Compare the total cost</h2>
  <ul>
    <li>Spreads and commissions on the pair you'll actually trade</li>
    <li>Swap rates, if you'll hold overnight</li>
    <li>Deposit, withdrawal and inactivity fees</li>
    <li>Currency conversion, for example if you deposit rand into a dollar account</li>
  </ul>

  <h2>Platform, instruments and account setup</h2>
  <p>Make sure the broker offers the platform you want (MetaTrader 4 or 5, cTrader or a web platform) and the instruments you plan to trade. Synthetic indices are a broker's own product, so only some offer them. Choose your account currency carefully: a dollar account makes pip values simple but may mean conversion costs. Pick modest leverage; you won't miss the extra.</p>

  <h2>Getting your money out</h2>
  <p>Read the withdrawal terms before you deposit, and test a small withdrawal early. Be careful with bonuses: they often come with trading-volume conditions that lock your own money in.</p>

  <h2>Red flags</h2>
  <ul>
    <li>Guaranteed or "risk-free" returns</li>
    <li>An unsolicited "account manager" or "analyst" urging you to deposit more</li>
    <li>Countdown timers and pressure to fund today</li>
    <li>Bonuses with large volume requirements</li>
    <li>No clear legal entity, or a regulator you can't verify</li>
    <li>Requests for remote access to your computer</li>
    <li>Delays or excuses when you ask to withdraw</li>
  </ul>

  <h2>A simple checklist</h2>
  <ol>
    <li>Verify the regulator, licence number and legal entity.</li>
    <li>Compare total costs on your main pair.</li>
    <li>Open a demo account and use it properly.</li>
    <li>Read the client agreement: withdrawals, bonuses, leverage, inactivity fees.</li>
    <li>Start live with a small deposit.</li>
    <li>Test a withdrawal.</li>
    <li>Keep your statements. Trading profits can be taxable in South Africa, so speak to a tax practitioner.</li>
  </ol>
  <div class="va-callout">Treat the demo account as real practice: the same position size and rules you plan to use live. Practising with a huge virtual balance teaches habits that won't carry over.</div>
`,

  "trends-ranges-and-timeframes": `
  <p>Before you look for an entry, answer one question: what is the market doing right now? Is it trending or moving sideways, and does the picture look the same on a bigger timeframe? This lesson gives you a simple way to answer both.</p>

  <h2>Trends and ranges</h2>
  <ul>
    <li><strong>Uptrend:</strong> a series of higher highs and higher lows</li>
    <li><strong>Downtrend:</strong> a series of lower highs and lower lows</li>
    <li><strong>Range:</strong> price moving sideways between a clear support and resistance</li>
  </ul>
  <p>Mark the recent swing highs and lows and the structure is usually obvious. A trend line under the lows of an uptrend (with at least three touches) is a useful guide. When structure breaks, as covered in the break of structure and change of character lesson, the trend may be changing.</p>

  <h2>Trade each condition differently</h2>
  <ul>
    <li><strong>In a trend,</strong> look to trade with it, usually by waiting for a pullback to support, a moving average or a Fibonacci level rather than chasing a move that has already run.</li>
    <li><strong>In a range,</strong> price tends to rotate between the edges. You can look for reversals near the edges with a stop just beyond the range, and be ready for a breakout.</li>
    <li><strong>When it's unclear,</strong> doing nothing is a legitimate position.</li>
  </ul>

  <h2>Multi-timeframe analysis</h2>
  <p>The same market looks different on different charts. Multi-timeframe analysis uses three charts, roughly three to six times apart, each with a job:</p>
  <table class="va-rtable">
    <thead><tr><th>Role</th><th>Example</th><th>Question it answers</th></tr></thead>
    <tbody>
      <tr><td>Direction and key levels</td><td>Daily</td><td>Which way is the bigger trend, and where are the major levels?</td></tr>
      <tr><td>Setup</td><td>4-hour</td><td>Is price at a level where I'd want to trade?</td></tr>
      <tr><td>Entry</td><td>1-hour</td><td>Is there a trigger, and where does my stop go?</td></tr>
    </tbody>
  </table>
  <p>The higher timeframe carries more weight. A buy setup on the 15-minute chart that runs straight into a major daily resistance is a poor trade, however good it looks up close.</p>

  <h2>Timeframes and trading styles</h2>
  <table class="va-rtable">
    <thead><tr><th>Style</th><th>Typical charts</th><th>Holding time</th><th>What matters most</th></tr></thead>
    <tbody>
      <tr><td>Scalping</td><td>1 to 5 minutes</td><td>Seconds to minutes</td><td>Spread, commission, speed</td></tr>
      <tr><td>Day trading</td><td>5 minutes to 1 hour</td><td>Minutes to hours, closed the same day</td><td>Sessions and news</td></tr>
      <tr><td>Swing trading</td><td>1 hour to daily</td><td>Days to weeks</td><td>Swaps, gaps, patience</td></tr>
      <tr><td>Position trading</td><td>Daily to weekly</td><td>Weeks to months</td><td>The macro view, wide stops</td></tr>
    </tbody>
  </table>
  <p>Pick the style that fits your time, temperament and account, not the one that looks most exciting. Short-term styles need constant attention and make costs a big share of each trade. If you can only look at charts for an hour a day, swing trading on higher timeframes is usually more realistic than scalping.</p>

  <h2>A worked example</h2>
  <p>On the daily chart, EUR/USD has made higher highs and higher lows for weeks: an uptrend. It has pulled back to a former resistance level that now looks like support. On the 4-hour chart price is holding there, and on the 1-hour chart a bullish engulfing candle closes at the level. All three timeframes agree, which is a far stronger case than the 1-hour candle alone.</p>

  <h2>Common timeframe mistakes</h2>
  <ul>
    <li>Flicking between timeframes until one agrees with the trade you already want</li>
    <li>Trading against a major higher-timeframe level</li>
    <li>Mixing styles: a scalp entry with a swing-sized stop, or the reverse</li>
  </ul>
`,

  "moving-averages": `
  <p>A moving average smooths price into a single line so the underlying direction is easier to see. It's one of the oldest and most widely used indicators, and one of the most misused.</p>

  <h2>What it is</h2>
  <p>A <strong>simple moving average (SMA)</strong> adds up the last N closing prices and divides by N, giving every candle the same weight. An <strong>exponential moving average (EMA)</strong> gives more weight to recent prices, so it reacts faster. A 20-period EMA hugs price closely; a 200-period one barely moves. Both lag, because they are built from past prices.</p>

  <h2>Common settings</h2>
  <ul>
    <li><strong>9 or 20:</strong> short-term momentum</li>
    <li><strong>50:</strong> the medium-term trend, widely watched</li>
    <li><strong>200:</strong> the long-term trend, probably the most watched of all</li>
  </ul>
  <p>Because so many traders watch the same numbers, those levels can matter simply because everyone is looking at them. Nothing is magic about 50 or 200 themselves.</p>

  <h2>Four ways traders use them</h2>
  <ol>
    <li><strong>Trend direction.</strong> Price mostly above a rising average suggests an uptrend; below a falling one, a downtrend. A flat average suggests a range.</li>
    <li><strong>Dynamic support and resistance.</strong> In a trend, pullbacks often pause near the 20 or 50 EMA, which gives you somewhere to look for an entry.</li>
    <li><strong>Crossovers.</strong> A faster average crossing above a slower one is a bullish signal, and below is bearish. When the 50 crosses above the 200 it's called a <em>golden cross</em>; the reverse is a <em>death cross</em>.</li>
    <li><strong>Distance.</strong> When price is very far from its average it is stretched, which helps you avoid chasing.</li>
  </ol>

  <h2>Where they fail</h2>
  <p>Moving averages lag, so crossovers arrive after a move has started. In a range the averages flatten and cross back and forth, producing a string of false signals (whipsaws). They work best in trends, which is why identifying the market condition first, as in the previous lesson, matters.</p>

  <h2>A worked example</h2>
  <p>EUR/USD is in an uptrend on the 4-hour chart and the 50 EMA is sloping up. Price pulls back and touches the 50 EMA, where it also meets a former resistance level. A bullish rejection candle closes there. Now you have three pieces of agreement: trend, moving average and level. You enter, put the stop below the candle and the level, and size the trade with the calculator.</p>

  <h2>Adding one on TradingView</h2>
  <p>Open Indicators, search for "Moving Average Exponential" (or "Moving Average" for an SMA), and set the length in its settings. The free plan currently limits you to two indicators per chart, so two averages, such as 20 and 50, is a sensible use of them.</p>

  <h2>Common mistakes</h2>
  <ul>
    <li>Using crossovers in a ranging market</li>
    <li>Tuning the length until a backtest looks perfect. That's curve-fitting: it fits the past, not the future.</li>
    <li>Stacking five averages that all say the same thing</li>
  </ul>
`,

  "momentum-and-volatility-indicators": `
  <p>Moving averages tell you about direction. Momentum and volatility indicators answer different questions: how strong is the move, and how much is price actually moving? Used well they add context; used as buy and sell buttons they cost people money.</p>

  <h2>One rule before you start</h2>
  <p>Indicators are calculated from price, so they follow it; they don't predict it. Treat them as a second opinion on what price is already showing, and pick one or two that answer different questions rather than stacking several that say the same thing.</p>

  <h2>RSI: how strong has the move been?</h2>
  <p>The <strong>Relative Strength Index</strong> (usually 14 periods) oscillates between 0 and 100. By convention, above 70 is "overbought" and below 30 is "oversold". Those labels are widely misunderstood: in a strong trend RSI can stay above 70 for a long time while price keeps climbing. An overbought reading is not a sell signal.</p>
  <p>More useful: in an uptrend, pullbacks often stop with RSI around 40 to 50, and in a downtrend, rallies often stall near 50 to 60 (a common rule of thumb, not a law). Traders also watch for <strong>divergence</strong>: price makes a new high but RSI makes a lower high, which suggests momentum is fading.</p>

  <h2>MACD: momentum and its changes</h2>
  <p>MACD subtracts a 26-period EMA from a 12-period EMA. A 9-period EMA of that line is the <strong>signal line</strong>, and the <strong>histogram</strong> shows the gap between the two. When the histogram shrinks, momentum is slowing even if price is still rising. Crossovers of the MACD and signal lines are common triggers, but like moving average crossovers they lag and whipsaw in ranges.</p>

  <h2>Bollinger Bands: how stretched is price?</h2>
  <p>Bollinger Bands put a band two standard deviations above and below a 20-period average. The bands widen when volatility rises and narrow when it falls. A <strong>squeeze</strong> (very narrow bands) means volatility is low and is often followed by a bigger move, but it says nothing about direction. In strong trends price can "walk" along a band, so touching the band is not a reversal signal on its own.</p>

  <h2>ATR: how much is price really moving?</h2>
  <p><strong>Average True Range</strong> (usually 14 periods) measures the average size of recent candles in price units. It doesn't show direction at all. Its job is to make your decisions proportional to the market:</p>
  <ul>
    <li><strong>Stops:</strong> place them relative to current volatility, for example 1.5 times ATR beyond your level, instead of a fixed number of pips on every trade.</li>
    <li><strong>Candle size:</strong> compare a candle to ATR to see whether it's big or ordinary for that pair right now.</li>
    <li><strong>Targets:</strong> if a pair's daily ATR is 80 pips, a 200-pip target for the day is unrealistic.</li>
  </ul>

  <h2>A worked example</h2>
  <p>On the 1-hour chart, ATR(14) on EUR/USD is 12 pips. You want to buy at a level of 1.0950, so a stop of 1.5 × ATR = 18 pips beyond it goes at 1.0932. On a $2,000 account risking 1%, that's $20 of risk over an 18-pip stop, or about 0.11 lots, which you can confirm in the <a href="tools.html">calculator</a>.</p>

  <h2>Common mistakes</h2>
  <ul>
    <li>Selling just because RSI is above 70, or buying just because price touched a band</li>
    <li>Stacking RSI, Stochastic and MACD, which all measure momentum</li>
    <li>Changing settings until the past looks perfect</li>
  </ul>
`,

  "trading-plan-and-backtesting": `
  <p>Everything in this course comes together here. A trading plan turns concepts into rules, backtesting checks whether the rules have any edge, and a journal tells you whether you actually follow them. Most traders skip all three, which is a big part of why most traders lose.</p>

  <h2>What goes in a trading plan</h2>
  <p>A plan is a one-page document you write when you're calm, so you don't improvise when you're not. It answers:</p>
  <ol>
    <li><strong>Markets and sessions:</strong> which pairs, and when you trade them</li>
    <li><strong>Timeframes:</strong> which charts give direction, setup and entry</li>
    <li><strong>Setups:</strong> the exact conditions that must be true before you enter, with an example screenshot of each</li>
    <li><strong>Entry, stop and target rules:</strong> where each goes and why</li>
    <li><strong>Risk rules:</strong> per-trade risk, daily and weekly limits and your open-risk cap in R, from the Layered Risk Budgeting lesson</li>
    <li><strong>No-trade rules:</strong> news windows, tiredness, anything that isn't your setup</li>
    <li><strong>Routine and review:</strong> your pre-session checklist and when you review your journal</li>
  </ol>
  <p>Keep it short enough that you'll actually read it before trading.</p>

  <h2>Backtesting: does the idea have an edge?</h2>
  <p>Before you risk money on a setup, see how it would have done on past charts. You can do this by hand with TradingView's <strong>Bar Replay</strong> (the rewind icon in the top toolbar): go back to an earlier date, step forward one candle at a time, and trade your rules as if it were live. Some replay features depend on your plan.</p>
  <ol>
    <li>Write the setup rules down first. Don't invent them as you go.</li>
    <li>Step forward bar by bar. For every valid setup, record the entry, stop, target and result in R.</li>
    <li>Be strict and record every signal, including the losers.</li>
    <li>Collect enough trades. A common minimum is 50 to 100 across different market conditions, because luck dominates small samples.</li>
    <li>Work out your win rate, average win and loss, and the longest losing streak.</li>
  </ol>

  <h2>Expectancy: the number that matters</h2>
  <p>Expectancy is the average result per trade, in R. If you win 40% of the time, your average win is 2R and your average loss is 1R, then:</p>
  <p style="font-family:var(--font-mono);">0.40 × 2R − 0.60 × 1R = +0.2R per trade</p>
  <p>Positive expectancy means the rules had an edge on that sample, here an average of 0.2R per trade. The risk-to-reward calculator on the <a href="tools.html">tools page</a> works out the same figure from your win rate.</p>

  <h2>Backtesting traps</h2>
  <ul>
    <li><strong>Hindsight bias:</strong> using what you already know happened next. Hide the right side of the chart and don't peek.</li>
    <li><strong>Curve-fitting:</strong> tweaking rules until the past looks perfect. A strategy tuned to history often fails live.</li>
    <li><strong>Ignoring costs:</strong> real trades pay spread and slippage that a replay doesn't.</li>
    <li><strong>One market condition:</strong> a strategy tested only in a trending year may fail in a range.</li>
  </ul>

  <h2>Forward test, then go live small</h2>
  <p>After the backtest, trade the plan on a demo account for several weeks. Then go live with the smallest size you can, and scale up only when your live results and your discipline match your testing.</p>

  <h2>The journal: your feedback loop</h2>
  <p>For each trade, record the date, pair, setup, entry, stop, target, size, result in R, a screenshot and one note about how you felt. Add one more field, the most important of all: <strong>did I follow my plan?</strong></p>
  <p>Review weekly, and start with adherence: a rule-following trader who lost the week is fine, and a rule-breaking one who won is in trouble. Then look at results by setup, session and pair. A journal such as the one in Voyager Analytics does the arithmetic for you, but a spreadsheet works fine to begin with.</p>
  <div class="va-callout">A strong next step: write your plan before your next session, run 20 backtest trades in Bar Replay, then log your next 20 demo or live trades with the "did I follow my plan?" field.</div>
`,
});
