// Full lesson bodies, keyed by slug. Loaded directly by lesson.html — no fetch()
// needed, so this works whether opened locally or hosted.
const LESSON_CONTENT = {
    // --- WHAT IS FOREX ---
    "what-is-forex": `
    <p>Forex — short for foreign exchange — is the market where currencies are
    bought and sold against each other. It's the largest, most liquid market in
    the world, with trillions of dollars changing hands daily. Unlike a stock,
    a currency has no value on its own — it only means something relative to
    another currency. That's why you'll always see currencies quoted in pairs,
    like EUR/USD or GBP/USD.</p>

    ${DIAGRAMS.baseQuote}

    <p>In any pair, the first currency is the <strong>base currency</strong> —
    the one you're effectively buying or selling. The second is the
    <strong>quote currency</strong> — the one you're pricing it in. If you buy
    EUR/USD, you're buying euros and selling US dollars, on the belief the euro
    will strengthen against the dollar.</p>

    <h2>Majors, minors, and exotics</h2>
    <p>Not all pairs are equal. <strong>Majors</strong> (EUR/USD, GBP/USD,
    USD/JPY) always include the US dollar and have the tightest spreads and
    highest liquidity — these are where most beginners should start.
    <strong>Minors</strong> (EUR/GBP, AUD/NZD) don't include the dollar but
    still involve major economies. <strong>Exotics</strong> (USD/ZAR, USD/TRY)
    pair a major currency with a smaller or emerging-market one — wider
    spreads, lower liquidity, and often sharper, less predictable moves. If
    you're trading from South Africa, USD/ZAR will feel familiar, but be aware
    it behaves very differently from EUR/USD.</p>

    <h2>Direct pairs vs. cross pairs</h2>
    <p>A pair is called a <strong>cross pair</strong> (or "cross") when it
    doesn't include the US dollar at all — EUR/GBP and AUD/JPY are both
    crosses. Historically, crosses were actually calculated by converting each
    currency through the dollar first (hence the name), and while modern
    markets quote them directly, crosses can still show slightly wider spreads
    than a major pair, since less volume trades through them directly.</p>

    <h2>How big is this market, really?</h2>
    <p>Global forex turnover is estimated at several trillion dollars per day
    — more than every stock exchange on earth combined. Why this matters
    practically: on a major pair during an active session, there's almost
    always someone willing to take the other side of your trade instantly, at
    a fair price. On a thin exotic pair at a quiet hour, that's not guaranteed
    — your order can move the price against you simply by existing
    (called <strong>slippage</strong>), which is one more reason majors are
    the sensible place to build your foundation.</p>

    <h2>Pips, lots, and the spread</h2>
    <p>A <strong>pip</strong> is the smallest standard price movement in a
    pair — for most pairs, the fourth decimal place (0.0001). A
    <strong>lot</strong> is a standardized trade size: a standard lot is
    100,000 units of the base currency, a mini lot 10,000, and a micro lot
    1,000. Most retail traders start with micro or mini lots while learning,
    since a standard lot's pip value can move an account balance quickly.</p>
    <p>The <strong>spread</strong> is the small gap between the price you can
    buy at (ask) and the price you can sell at (bid) — it's effectively the
    cost of entering a trade, built into the price itself rather than charged
    as a separate fee on most retail platforms.</p>

    <h2>How you actually make or lose money</h2>
    <p>If you believe a pair is going to rise, you buy. If you believe it's
    going to fall, you sell. If the market moves the way you predicted, you
    profit; if it moves the other way, you lose. That's the entire
    mechanism — everything else in trading is about improving the odds your
    prediction is right, and controlling how much you lose when it isn't.</p>

    <h2>Who's actually on the other side of your trade?</h2>
    <p>It's easy to picture forex as just "you versus the market," but the
    actual participants range from central banks and multinational
    corporations hedging currency exposure, to hedge funds and institutional
    desks, down to retail traders like you. The big players move enough volume
    to actually shift prices; retail traders mostly react to and try to
    anticipate those moves rather than cause them.</p>

    <h2>Two lenses on the same chart</h2>
    <p><strong>Technical analysis</strong> — most of what this course covers —
    studies price and chart patterns directly, on the idea that price already
    reflects everything known. <strong>Fundamental analysis</strong> studies
    the underlying cause: interest rate decisions, employment data, inflation,
    geopolitical events. Neither replaces the other. A technically perfect
    setup can still get blindsided by a surprise central bank decision, which
    is exactly why the Macro & Economic Calendar concepts later in this course
    — and Voyager Analytics' own calendar tool — matter even to a purely
    chart-based trader.</p>

    <h2>Why the market never stops moving</h2>
    <p>Forex trades around the clock on weekdays because it isn't one
    centralized exchange — it's a network of banks, institutions, and traders
    across time zones handing the market off to each other as their local
    session opens. That handoff between sessions is worth understanding early,
    since a lot of the volatility you'll see on a chart lines up directly with
    which session is currently active.</p>

    <h2>Your first practical step</h2>
    <p>Before risking real money, open a demo account with your intended
    broker (or use TradingView's paper trading, covered later in this course)
    and place a handful of trades using play money. The goal isn't to "prove"
    a strategy in a few trades — it's simply to get comfortable with the
    mechanics of placing an order, setting a stop, and watching a live
    position move, before any of that has real financial weight behind it.</p>
    `,

    "risk-management-basics": `
    <p>Most new traders focus almost entirely on finding good entries.
    Experienced traders spend just as much energy on the other side of the
    trade: how much they're willing to lose if they're wrong. That discipline
    is what actually keeps you in the game long enough to become profitable.</p>

    <h2>Position sizing: the actual formula</h2>
    <p>Position size isn't a guess — it's calculated backward from your risk.
    The formula is: <strong>Position Size = (Account Balance × Risk %) ÷ Stop
    Loss Distance (in pips) ÷ Pip Value</strong>. In practice, most trading
    platforms and journals will calculate this for you once you enter your
    account size, risk percentage, and stop distance — but understanding the
    formula matters, because it's what stops you from sizing a trade based on
    "how confident I feel" instead of math.</p>

    <h2>A worked example</h2>
    <p>Say you have a $100 account and risk 2% per trade — that's $2 at risk.
    If your setup targets a 1:3 risk-to-reward ratio, you're aiming to make $6
    for every $2 you put on the line.</p>

    ${DIAGRAMS.riskReward}

    <p>Here's why that ratio matters more than most beginners realize: lose
    four trades in a row at $2 each and you're down $8 — recoverable. Win just
    one of the next two trades at 1:3 and you're back in profit, even though
    you were "wrong" more often than you were "right." Professional traders
    talk about risk-to-reward far more than they talk about win rate, because
    a strategy with a 40% win rate and a 1:3 ratio is more profitable over 100
    trades than a 70% win rate strategy with a 1:1 ratio.</p>

    <h2>Expectancy: the formula that actually predicts profitability</h2>
    <p>You can combine win rate and risk-to-reward into one number called
    <strong>expectancy</strong>: (Win Rate × Average Win) − (Loss Rate ×
    Average Loss). Take a strategy with a 40% win rate, an average win of $6,
    and an average loss of $2: expectancy = (0.4 × $6) − (0.6 × $2) = $2.40 −
    $1.20 = <strong>+$1.20 per trade</strong>, on average, over a large enough
    sample. A positive expectancy means the strategy makes money over time
    even though it loses more often than it wins — and a strategy can have an
    impressive-sounding win rate and still carry negative expectancy if the
    losses are big enough relative to the wins.</p>

    <h2>The math of a drawdown</h2>
    <p>Losses and the gains needed to recover from them aren't symmetrical —
    the bigger the loss, the more disproportionately hard it is to climb back:</p>
    <ul>
        <li>A 10% loss needs an 11% gain to recover</li>
        <li>A 25% loss needs a 33% gain to recover</li>
        <li>A 50% loss needs a 100% gain to recover</li>
        <li>A 75% loss needs a 300% gain to recover</li>
    </ul>
    <p>This is the real, mathematical reason small, consistent risk per trade
    beats big swings — it's far easier to never dig a deep hole than to climb
    out of one.</p>

    <h2>Where to actually place your stop loss</h2>
    <p>A stop loss isn't just "some number of pips away" — it should sit at a
    level that, if reached, genuinely invalidates your reason for entering the
    trade. Common approaches: just beyond a recent swing high/low, just beyond
    a support/resistance zone, or a fixed distance based on the pair's recent
    average volatility (its Average True Range). A stop placed too tight gets
    clipped by normal noise; one placed too loose defeats the purpose of
    having a plan at all.</p>

    <h2>Don't stack the same bet twice</h2>
    <p>Risking 2% on EUR/USD and 2% on GBP/USD at the same time can feel like
    two separate, diversified risks — but both pairs are heavily influenced by
    the US dollar, so a single strong dollar move can hit both trades in the
    same direction at once. Before opening multiple positions, it's worth
    asking whether they're really independent bets, or the same bet twice
    wearing different tickers.</p>

    <h2>Leverage: a tool, not free money</h2>
    <p>Leverage lets you control a larger position than your account balance
    would normally allow — for example, 1:100 leverage means $100 of your own
    money can control a $10,000 position. It's important to be precise about
    what that means: leverage doesn't hand you extra capital to keep. It
    amplifies your exposure to price movement in both directions. A small move
    in your favor is now a proportionally larger gain — but a small move
    against you is an equally larger loss, and it can erode a small account
    very quickly. Treat higher leverage as higher risk, not as a bigger
    trading budget.</p>

    <h2>The trap of revenge trading</h2>
    <p>After a loss, the instinct to "win it back immediately" is one of the
    most common ways disciplined traders blow up an account. Increasing your
    position size after a loss to recover faster does the opposite of what
    risk management is for — it turns one manageable loss into a potentially
    account-ending one. The fixed-percentage approach above exists specifically
    to remove that decision from you in the heat of the moment.</p>

    <div class="va-callout">
        <strong>Rule of thumb:</strong> decide your risk per trade as a fixed
        percentage of your account, set it before you enter, and let your stop
        loss — not your emotions — be the thing that closes a losing trade.
    </div>
    `,

    "trading-psychology-basics": `
    <p>The technical side of trading — chart patterns, indicators, market
    structure — is learnable in a matter of months. Managing your own reactions
    to winning and losing money in real time takes considerably longer, and
    it's the part most beginners underestimate.</p>

    <h2>Risk management is your seatbelt</h2>
    <p>You don't wear a seatbelt because you're expecting to crash on every
    drive — you wear it because on the one drive where something goes wrong,
    it's the difference between walking away and not. Risk management works
    the same way in trading: most of your trades won't need it, but the ones
    that go against you are exactly why it has to be in place before you
    enter, not after.</p>

    <h2>The emotional cycle every trader goes through</h2>
    <p>There's a well-worn pattern: a win produces <strong>excitement</strong>,
    which can tip into <strong>overconfidence</strong> — sizing up, skipping
    your checklist. A loss produces <strong>frustration</strong>, which can tip
    into <strong>revenge trading</strong> — forcing a trade to "make it back."
    Recognizing which stage you're in, in the moment, is a genuinely trainable
    skill. Traders who last tend to notice "I'm currently overconfident" or
    "I'm currently frustrated" and pause, rather than acting on it.</p>

    <h2>Two biases worth knowing by name</h2>
    <p><strong>Confirmation bias</strong> is the tendency to seek out
    information that supports the trade you're already in, while unconsciously
    ignoring signs you're wrong — checking three sources that agree with your
    bias instead of one that challenges it. <strong>The sunk cost fallacy</strong>
    is holding a losing trade longer than your plan calls for, because closing
    it would mean "admitting" the loss is real — as if not closing it somehow
    makes the loss less true. Both biases feel like reasoning in the moment;
    they're easiest to catch afterward, in a journal, which is exactly why the
    next section matters.</p>

    <h2>You can't control the market — only your response to it</h2>
    <p>Think of the market like a river. You can study it, learn its patterns,
    and pick good moments to enter it, but you can't control its current. The
    traders who last are the ones who stop trying to force the market to
    behave a certain way, and instead focus entirely on how they react when it
    doesn't.</p>

    <h2>Why a trading journal matters more than a strategy</h2>
    <p>It's possible to run the exact same strategy for months and have no
    idea why some trades work and others don't, simply because nothing was
    written down. A journal entry doesn't need to be complex — the setup, why
    you entered, what you felt, and what actually happened is enough. Over
    time, patterns emerge that are invisible in the moment: maybe you do worse
    trading after 3pm, or better on setups you waited an extra five minutes to
    confirm. That's information no strategy document can give you.</p>

    <h2>Trading tilt</h2>
    <p>Borrowed from poker, "tilt" describes a string of decisions made while
    emotionally rattled, usually after a bad loss or a string of them —
    bigger size, worse setups, faster entries. The danger of tilt isn't any
    single decision; it's that each bad decision makes the next one more
    likely, since frustration compounds. The most reliable fix isn't
    willpower in the moment — it's a rule decided in advance, which is exactly
    what a daily loss limit is for.</p>

    <h2>Set a daily loss limit before you need one</h2>
    <p>Decide, before you start trading for the day, on a maximum loss — say,
    4-6% of your account — that ends your trading day if it's hit, no
    exceptions. The specific number matters less than having one at all: it
    converts "should I keep going after this bad run?" from an emotional,
    in-the-moment decision into a mechanical one you already made while calm.</p>

    <h2>Be careful who you trust with your money</h2>
    <p>Paid signal services and "guaranteed recovery" offers are a common trap,
    especially early on. It's easy to find a seller online promising
    consistent signals for a monthly fee, pay for months with nothing to show
    for it, and only realize afterward there was never a real track record
    behind the claims. A few concrete red flags: results shown only as
    screenshots rather than a verifiable, connectable account; pressure to
    join "before the price goes up"; and vague answers when you ask how long
    they've actually been trading their own money. If something is being sold
    on promised results rather than a demonstrated, verifiable history, treat
    that as a warning sign, not an opportunity.</p>
    `,

  // --- RISK MANAGEMENT BASICS ---
  "risk-management-basics": `
    <p>Most new traders focus almost entirely on finding good entries.
    Experienced traders spend just as much energy on the other side of the
    trade: how much they're willing to lose if they're wrong. That discipline
    is what actually keeps you in the game long enough to become profitable.</p>

    <h2>Position sizing: the actual formula</h2>
    <p>Position size isn't a guess — it's calculated backward from your risk.
    The formula is: <strong>Position Size = (Account Balance × Risk %) ÷ Stop
    Loss Distance (in pips) ÷ Pip Value</strong>. In practice, most trading
    platforms and journals will calculate this for you once you enter your
    account size, risk percentage, and stop distance — but understanding the
    formula matters, because it's what stops you from sizing a trade based on
    "how confident I feel" instead of math.</p>

    <h2>A worked example</h2>
    <p>Say you have a $100 account and risk 2% per trade — that's $2 at risk.
    If your setup targets a 1:3 risk-to-reward ratio, you're aiming to make $6
    for every $2 you put on the line.</p>

    ${DIAGRAMS.riskReward}

    <p>Here's why that ratio matters more than most beginners realize: lose
    four trades in a row at $2 each and you're down $8 — recoverable. Win just
    one of the next two trades at 1:3 and you're back in profit, even though
    you were "wrong" more often than you were "right." Professional traders
    talk about risk-to-reward far more than they talk about win rate, because
    a strategy with a 40% win rate and a 1:3 ratio is more profitable over 100
    trades than a 70% win rate strategy with a 1:1 ratio.</p>

    <h2>Where to actually place your stop loss</h2>
    <p>A stop loss isn't just "some number of pips away" — it should sit at a
    level that, if reached, genuinely invalidates your reason for entering the
    trade. Common approaches: just beyond a recent swing high/low, just beyond
    a support/resistance zone, or a fixed distance based on the pair's recent
    average volatility (its Average True Range). A stop placed too tight gets
    clipped by normal noise; one placed too loose defeats the purpose of
    having a plan at all.</p>

    <h2>Leverage: a tool, not free money</h2>
    <p>Leverage lets you control a larger position than your account balance
    would normally allow — for example, 1:100 leverage means $100 of your own
    money can control a $10,000 position. It's important to be precise about
    what that means: leverage doesn't hand you extra capital to keep. It
    amplifies your exposure to price movement in both directions. A small move
    in your favor is now a proportionally larger gain — but a small move
    against you is an equally larger loss, and it can erode a small account
    very quickly. Treat higher leverage as higher risk, not as a bigger
    trading budget.</p>

    <h2>The trap of revenge trading</h2>
    <p>After a loss, the instinct to "win it back immediately" is one of the
    most common ways disciplined traders blow up an account. Increasing your
    position size after a loss to recover faster does the opposite of what
    risk management is for — it turns one manageable loss into a potentially
    account-ending one. The fixed-percentage approach above exists specifically
    to remove that decision from you in the heat of the moment.</p>

    <div class="va-callout">
        <strong>Rule of thumb:</strong> decide your risk per trade as a fixed
        percentage of your account, set it before you enter, and let your stop
        loss — not your emotions — be the thing that closes a losing trade.
    </div>
    `,

  // --- TRADING PSYCHOLOGY BASICS ---
  "trading-psychology-basics": `
    <p>The technical side of trading — chart patterns, indicators, market
    structure — is learnable in a matter of months. Managing your own reactions
    to winning and losing money in real time takes considerably longer, and
    it's the part most beginners underestimate.</p>

    <h2>Risk management is your seatbelt</h2>
    <p>You don't wear a seatbelt because you're expecting to crash on every
    drive — you wear it because on the one drive where something goes wrong,
    it's the difference between walking away and not. Risk management works
    the same way in trading: most of your trades won't need it, but the ones
    that go against you are exactly why it has to be in place before you
    enter, not after.</p>

    <h2>The emotional cycle every trader goes through</h2>
    <p>There's a well-worn pattern: a win produces <strong>excitement</strong>,
    which can tip into <strong>overconfidence</strong> — sizing up, skipping
    your checklist. A loss produces <strong>frustration</strong>, which can tip
    into <strong>revenge trading</strong> — forcing a trade to "make it back."
    Recognizing which stage you're in, in the moment, is a genuinely trainable
    skill. Traders who last tend to notice "I'm currently overconfident" or
    "I'm currently frustrated" and pause, rather than acting on it.</p>

    <h2>You can't control the market — only your response to it</h2>
    <p>Think of the market like a river. You can study it, learn its patterns,
    and pick good moments to enter it, but you can't control its current. The
    traders who last are the ones who stop trying to force the market to
    behave a certain way, and instead focus entirely on how they react when it
    doesn't.</p>

    <h2>Why a trading journal matters more than a strategy</h2>
    <p>It's possible to run the exact same strategy for months and have no
    idea why some trades work and others don't, simply because nothing was
    written down. A journal entry doesn't need to be complex — the setup, why
    you entered, what you felt, and what actually happened is enough. Over
    time, patterns emerge that are invisible in the moment: maybe you do worse
    trading after 3pm, or better on setups you waited an extra five minutes to
    confirm. That's information no strategy document can give you.</p>

    <h2>Be careful who you trust with your money</h2>
    <p>Paid signal services and "guaranteed recovery" offers are a common trap,
    especially early on. It's easy to find a seller online promising
    consistent signals for a monthly fee, pay for months with nothing to show
    for it, and only realize afterward there was never a real track record
    behind the claims. A few concrete red flags: results shown only as
    screenshots rather than a verifiable, connectable account; pressure to
    join "before the price goes up"; and vague answers when you ask how long
    they've actually been trading their own money. If something is being sold
    on promised results rather than a demonstrated, verifiable history, treat
    that as a warning sign, not an opportunity.</p>
    `,

  // --- INTERMEDIATE ---
  // --- support, resistance, and zones ---
    "support-resistance-and-zones": `
    <p>Support and resistance are the foundation everything else in technical
    analysis sits on top of — but treating them as exact prices rather than
    areas is where most beginners get tripped up.</p>

    <h2>Levels flip roles</h2>
    <p>Once a resistance level breaks to the upside, it's common to see price
    return and retest that same level — and hold it as support. The reverse is
    just as true. The logic is behavioral: traders who missed the original
    breakout treat the retest as a second entry, which reinforces the level
    from the opposite side. The longer a level has held in the past, the more
    significant a subsequent break tends to be.</p>

    <h2>Why zones beat exact lines</h2>
    <p>Institutional orders — the ones actually big enough to move price —
    don't all sit at one precise number. A bank isn't placing its entire order
    at 1.0850 exactly; it's often scaled across a small range around it. That's
    why price frequently "wicks through" a level before reversing: the level
    was never a single price to begin with. Treating support/resistance as a
    zone rather than a line saves you from being stopped out by a few pips of
    noise around the real area of interest.</p>

    <h2>Think in zones, not exact prices</h2>
    <p>Three common ways to spot a zone:</p>
    <ul>
        <li><strong>Congestion areas</strong> — messy, sideways price action that
        often gets revisited and respected much later</li>
        <li><strong>Swing points</strong> — the highs and lows tracked by Dow
        Theory, Elliott Wave, and trend analysis</li>
        <li><strong>Long wicks/tails</strong> — a spike that gets aggressively
        rejected marks a level worth remembering, especially where several
        spikes cluster together</li>
    </ul>

    <h2>Support/resistance vs. supply/demand: a subtle but useful distinction</h2>
    <p>The two terms get used interchangeably, but they're drawn differently.
    A support/resistance level marks where price has <em>reacted repeatedly</em>
    — you're drawing from reaction points. A supply/demand zone marks where a
    strong impulsive move <em>originated</em> — you're drawing from the base of
    the move itself, often a small area of consolidation right before price
    launched away from it. In practice, a supply/demand zone is frequently the
    very first test of a level, before enough reactions have built up to call
    it "support" or "resistance" in the traditional sense.</p>

    <h2>Fresh zones vs. tested zones</h2>
    <p>A zone that hasn't been touched since it formed is considered
    <strong>fresh</strong>, and generally carries more weight than one that's
    already been tested two or three times. Each retest uses up some of the
    orders that were originally resting there — think of a zone as having a
    limited "capacity" that gradually depletes. A level on its fourth or fifth
    test is statistically more likely to finally break than to hold again.</p>

    <h2>Trend lines, channels, and pivot points</h2>
    <p>A trend line needs at least three points of contact on the swing lows
    (uptrend) or swing highs (downtrend) to be valid — it's a guideline, not a
    random line. A channel is just two parallel trend lines, and where a
    channel boundary lines up with another form of support/resistance (like a
    Fibonacci level), that confluence is worth paying attention to.</p>
    <p>Pivot points use the prior period's high, low, and close to project
    three resistance levels (R1-R3) and three support levels (S1-S3) for the
    current day, week, or month. They're popular with forex traders precisely
    because they're predictive rather than reactive — but like any single
    tool, they shouldn't be traded in isolation.</p>

    <h2>Trading the level, not just marking it</h2>
    <p>Spotting a zone is only half the job. At the zone, you're generally
    choosing between two approaches: trading the <strong>bounce</strong>
    (entering as price reacts off the level, with your stop just beyond it) or
    waiting for the <strong>break</strong> and trading the retest once the
    level flips roles. Trying to do both at once — entering on the first touch
    "just in case it breaks" — is how traders end up with no real invalidation
    point for their stop.</p>

    <h2>Avoid the "spaghetti chart"</h2>
    <p>A common beginner habit is marking every minor wiggle as a level until
    the chart is covered in lines. If you can't explain, in one sentence, why a
    specific line matters more than the price five pips above or below it, it
    probably doesn't belong on your chart. A clean chart with five meaningful
    zones beats a cluttered one with twenty arbitrary lines.</p>

    <h2>Confirm across timeframes</h2>
    <p>A level that shows up on the daily chart carries more weight than one
    you can only see on the 5-minute chart. When a zone lines up across two or
    three timeframes at once, that's a stronger signal than any single
    timeframe alone — this is the multi-timeframe habit that shows up again
    and again throughout this course.</p>

    <div class="va-callout">
        <strong>Rule of thumb:</strong> the more independent forms of
        support/resistance that line up in the same small area, the more
        confidence you can have that the level matters.
    </div>
    `,

    "chart-patterns-and-fakeouts": `
    <p>Chart patterns exist because consolidation and structure repeat — they
    give you a read on market sentiment and a rough set of parameters for what
    might happen next.</p>

    <h2>Reversal patterns</h2>
    <p>These signal that the current trend may be ending:</p>
    <ul>
        <li>Double Top / Double Bottom</li>
        <li>Head & Shoulders / Inverted Head & Shoulders</li>
        <li>Triple Top / Triple Bottom</li>
        <li>Rising Wedge (bearish) / Falling Wedge (bullish)</li>
    </ul>
    <p>A technical note on Head & Shoulders specifically: the more symmetrical
    the two shoulders are — similar height, similar time taken to form — the
    more textbook (and generally more reliable) the pattern is considered. A
    lopsided version with a much taller or longer second shoulder is a weaker
    signal than a clean, balanced one.</p>

    <h2>Continuation patterns</h2>
    <p>These suggest the existing trend is pausing before continuing:</p>
    <ul>
        <li>Bullish / Bearish Flags</li>
        <li>Bullish / Bearish Pennants</li>
        <li>Bullish / Bearish Triangles</li>
    </ul>

    <h2>Bilateral patterns</h2>
    <p>Ascending, descending, and symmetrical triangles can break in either
    direction — treat these as "wait for the break" patterns rather than
    patterns with a built-in bias.</p>

    ${DIAGRAMS.chartPatterns}

    <h2>Measuring a target, not just a direction</h2>
    <p>Most of these patterns give you more than a direction — they give you a
    rough price target. The common method is the "measured move": take the
    height of the pattern (e.g., from the head down to the neckline in a Head &
    Shoulders, or the flagpole's length in a flag) and project that same
    distance from the breakout point. Worked example: a Head & Shoulders has
    its head at 1.1050 and neckline at 1.0950 — a 100-pip pattern height.
    Breaking the neckline at 1.0950 projects a target around 1.0850 (100 pips
    below the break). It won't be exact, but it turns "probably going down"
    into an actual number you can plan around.</p>

    <h2>Throwbacks and pullbacks</h2>
    <p>After a genuine breakout, price frequently returns briefly to retest the
    broken level before continuing in the breakout direction. Off a resistance
    break, this retest is called a <strong>throwback</strong>; off a support
    break, it's called a <strong>pullback</strong>. These retests are often a
    second, lower-risk entry point for traders who missed the initial breakout
    — provided the level actually holds on the retest rather than failing.</p>

    <h2>Volume as a confirmation layer</h2>
    <p>A breakout on genuinely elevated volume is more likely to hold than one
    on quiet, thin trading — low-volume breaks are exactly the kind that tend
    to fail and snap back. If your platform shows volume (most forex platforms
    show tick volume rather than true volume, but it's still a useful proxy),
    treat a volume spike on the breakout candle as a point in favor of the
    move being real.</p>

    <h2>Patterns behave differently depending on the environment</h2>
    <p>Continuation and reversal patterns are far more reliable inside a
    clearly trending market than inside a choppy, range-bound one, where false
    breaks are the norm rather than the exception. Before trusting a pattern,
    it's worth zooming out one timeframe and asking whether the broader
    structure is actually trending or just chopping sideways.</p>

    <h2>A failed pattern is still information</h2>
    <p>When a textbook setup completely fails — a Double Bottom breaks straight
    through its neckline downward instead of reversing, for example — that
    failure itself is meaningful. It suggests the opposing side is stronger
    than the pattern implied, and traders who were watching that same pattern
    are now likely trapped on the wrong side, which can fuel the move further
    in the direction of the failure.</p>

    <h2>Market fakeouts</h2>
    <p>A fakeout happens when price appears to break a trendline or pattern
    boundary, fails to hold outside it, and reverses back through — trapping
    traders who entered on the apparent breakout. A common tell is repeated,
    weakening attempts to close outside the trendline before the market gives
    up and reverses back in. This is exactly why waiting for a candle close
    (not just a wick) beyond a level, and ideally a retest, is safer than
    reacting to the first touch.</p>
    `,

    "candlestick-confirmations": `
    <p>Candlestick patterns are your shortest-timeframe read on who's in
    control — buyers or sellers — at a specific price level.</p>

    <h2>What a single candle tells you</h2>
    <p>A tall body with little to no wick shows one side firmly in control. A
    small body with long wicks on either end shows rejection — the market
    tried to move further and got pushed back, which is often more
    informative than the close itself.</p>

    <h2>Common confirmation patterns</h2>
    <ul>
        <li><strong>Doji family</strong> (Doji, Dragonfly Doji, Gravestone Doji)
        — indecision, often at a turning point</li>
        <li><strong>Engulfing (bullish/bearish)</strong> — a full reversal of the
        prior candle's range, showing a shift in control</li>
        <li><strong>Morning Star / Evening Star</strong> — a three-candle
        reversal sequence</li>
        <li><strong>Three White Soldiers / Three Black Crows</strong> — three
        consecutive strong candles in one direction, showing sustained
        momentum</li>
        <li><strong>Hammer / Shooting Star, Inverted Hammer / Hanging Man</strong>
        — single-candle rejection patterns at the top or bottom of a move</li>
        <li><strong>Dark Cloud Cover / Piercing Pattern</strong> — two-candle
        reversal patterns</li>
        <li><strong>Harami / Inside Bar</strong> — a small candle contained
        within the previous candle's range, often a pause before continuation</li>
        <li><strong>Tweezer Top / Tweezer Bottom</strong> — two candles with
        matching (or near-matching) highs or lows, showing the market was
        rejected from the exact same price twice in a row</li>
    </ul>

    ${DIAGRAMS.candlesticks}

    <h2>Size is relative, not absolute</h2>
    <p>A candle's significance depends on the instrument's normal behavior, not
    just its raw pip size. A 40-pip candle on a pair that typically moves 30
    pips a day is a major event; the same 40-pip candle on a pair that
    regularly moves 150 pips a day is unremarkable. Comparing a candle's size
    to that pair's recent average range (its Average True Range) gives you a
    much more honest read than judging the candle in isolation.</p>

    <h2>Location matters more than the pattern itself</h2>
    <p>A bullish engulfing candle in the middle of nowhere is just noise. The
    exact same candle forming at a known support zone, a Fibonacci golden
    zone, or the bottom of a channel is a genuinely different signal. Before
    reacting to any candlestick pattern, the first question should be "where
    on the chart did this happen?" — not just "what pattern is this?"</p>

    <h2>The same pattern means different things on different timeframes</h2>
    <p>A bullish engulfing candle on the 5-minute chart reflects a few minutes
    of order flow and reverses constantly throughout the day. The same pattern
    on the Daily chart reflects a full session's worth of participants
    changing their mind, and carries considerably more weight. As a rule, the
    higher the timeframe a candlestick signal appears on, the more seriously
    it's worth taking.</p>

    <h2>Patterns are probabilities, not guarantees</h2>
    <p>Every pattern on this list fails a meaningful percentage of the time.
    That's normal — the goal isn't to find a pattern that's always right, it's
    to combine a pattern with enough other confluence (a key level, a
    Fibonacci zone, the broader trend) that the odds are tilted in your favor,
    and to size your risk so that the times it fails don't hurt you badly.</p>

    <h2>Reading a daily candle's story</h2>
    <p>Zoom out and a single daily candle often tells a three-part story:
    <strong>accumulation</strong> (quiet positioning), <strong>manipulation</strong>
    (a push in one direction to trigger stops or trap traders), and
    <strong>distribution</strong> (the real move). Recognizing which phase
    you're likely in helps you avoid reacting to the manipulation leg as if it
    were the real move.</p>
    `,

    "fibonacci-and-market-structure": `
    <p>Two of the most-used tools in technical analysis are the Fibonacci
    retracement and a clear vocabulary for describing market structure.</p>

    <h2>Fibonacci retracement levels</h2>
    <p>The key levels are 0%, 23.6%, 38.2%, 50%, 61.8%, 78.6%, 88.6%, and
    100%. To draw it, drag the tool from a clear swing low to the swing high
    in an uptrend (or high to low in a downtrend) — the tool then plots each
    level automatically across that range. Two zones are worth knowing by
    name:</p>
    <ul>
        <li><strong>Manipulation levels (23.6%, 38.2%, 50%, 61.8%)</strong> —
        common areas where larger players inject liquidity or run stops before
        the "real" move continues</li>
        <li><strong>The Golden Zone (78.6%-88.6%)</strong> — where a reversal is
        statistically more likely, especially with a candlestick confirmation
        behind it</li>
    </ul>

    ${DIAGRAMS.fibonacciLadder}

    <p>Levels beyond 100% are considered overbought/oversold — the trend has
    stretched further than the original move, and failure to break cleanly
    through often leads to continuation of the original trend instead.</p>

    <h2>Picking the right swing to measure from</h2>
    <p>A very common beginner mistake is anchoring the Fibonacci tool to the
    wrong pivot — a minor wiggle instead of the actual significant swing. The
    rule of thumb: anchor to the most recent clear, obvious swing high and
    swing low that other traders would also plausibly draw from. If you have
    to squint to justify your anchor points, it's probably not the swing the
    rest of the market is watching.</p>

    <h2>Extensions: the retracement tool's other job</h2>
    <p>The same Fibonacci tool that measures pullbacks can also project profit
    targets, using the 127.2%, 161.8%, and 200% extension levels beyond the
    original move. Where a retracement level tells you "price might reverse
    here," an extension level tells you "if it keeps going, this is a
    reasonable place to expect it to run out of steam" — useful for setting a
    take-profit that isn't just an arbitrary round number.</p>

    <h2>Fibonacci time zones: a lesser-used variant</h2>
    <p>Beyond price-based retracements, TradingView and most platforms also
    offer Fibonacci Time Zones — vertical lines spaced at Fibonacci intervals
    from a starting point, used to estimate <em>when</em> a reversal might
    occur rather than <em>where</em>. It's a more niche tool than retracements
    and far more subjective, but worth knowing it exists if you see it
    referenced elsewhere.</p>

    <h2>Market structure vocabulary</h2>
    <p>Being fluent in these terms makes every other lesson easier to follow:</p>
    <ul>
        <li><strong>Bullish / Bearish</strong> — upward / downward movement</li>
        <li><strong>Sideways</strong> — consolidation with no clear breakout</li>
        <li><strong>Impulse</strong> — a strong directional move</li>
        <li><strong>Correction</strong> — a short-term move against the main trend</li>
        <li><strong>Higher Highs / Higher Lows</strong> — defines an uptrend</li>
        <li><strong>Lower Highs / Lower Lows</strong> — defines a downtrend</li>
        <li><strong>BOS (Break of Structure)</strong> — a support or resistance
        level breaks, signaling the trend is continuing or shifting</li>
        <li><strong>CHoCH (Change of Character)</strong> — the market's behavior
        flips from bullish to bearish, or vice versa</li>
        <li><strong>EQH / EQL (Equal Highs / Equal Lows)</strong> — liquidity
        sitting above a double top or below a double bottom</li>
    </ul>

    ${DIAGRAMS.marketStructure}

    <h2>Putting it together: a confluence example</h2>
    <p>Say price is in an uptrend and pulls back toward the 61.8% Fibonacci
    level. That level happens to line up with a prior support zone, and a
    rising trendline passes through the exact same area. Three independent
    tools — Fibonacci, horizontal S/R, and a trendline — are all pointing to
    the same few pips. That stacking of confluence is a far stronger case for
    a long entry than any one of those three tools would be on its own.</p>

    <h2>A quick bridge to the advanced track</h2>
    <p>Equal highs and lows matter because they're exactly the kind of
    obvious, "everyone can see it" level that price often sweeps through
    before reversing — a liquidity grab. You'll meet this idea again, in much
    more depth, in the Smart Money Concepts lessons ahead.</p>
    `,

    "trade-planning-essentials": `
    <p>Good analysis means little without a plan for how you'll actually
    execute and manage the trade.</p>

    <h2>Order types</h2>
    <ul>
        <li><strong>Market order</strong> — fills immediately at the current price</li>
        <li><strong>Buy limit</strong> — fills at a lower price than current,
        where you expect price to turn up</li>
        <li><strong>Sell limit</strong> — fills at a higher price than current,
        where you expect price to turn down</li>
        <li><strong>Buy stop</strong> — fills automatically once price rises
        past your level, confirming upward momentum</li>
        <li><strong>Sell stop</strong> — fills automatically once price falls
        past your level, confirming downward momentum</li>
    </ul>

    ${DIAGRAMS.orderTypes}

    <h2>Boxing the market: a 6-step process</h2>
    <ol>
        <li>Draw your visual/psychological support and resistance</li>
        <li>Analyze at least two timeframes above your execution chart (match
        the timeframe to your style — scalper, intraday, swing, or position)</li>
        <li>Look for chart patterns and trend lines — continuation or reversal?
        breakout or consolidation?</li>
        <li>Look for confluence areas where multiple forms of S/R overlap</li>
        <li>Establish your bias — bullish, bearish, or neutral</li>
        <li>Create a plan, including likely session timing, then execute with
        confidence</li>
    </ol>

    <h2>Grading your setup before you take it</h2>
    <p>Many consistent traders rate every setup before entering: an
    <strong>A+ setup</strong> has every piece of confluence lining up (trend,
    key level, pattern, session timing); a <strong>B setup</strong> is missing
    one piece but still reasonable; a <strong>C setup</strong> is mostly hope.
    Writing the grade down before entering — not after the trade is already
    open — forces an honest assessment instead of a retroactive justification
    for a trade you already wanted to take.</p>

    <h2>Scaling in and out, and moving to breakeven</h2>
    <p>You don't have to enter or exit a position all at once. Scaling in means
    building a full position across two or three entries rather than one;
    scaling out means closing part of the position at an initial target while
    letting the rest run toward a further one. A common management technique
    is moving your stop loss to breakeven once a trade has moved a reasonable
    distance in your favor — this doesn't maximize every winning trade, but it
    means a trade that was once profitable can no longer turn into a loss.</p>

    <h2>Before you open a trade, check:</h2>
    <ul>
        <li>Your motivation and time commitment to trading</li>
        <li>A clearly defined goal</li>
        <li>A fixed risk-to-reward ratio you won't deviate from</li>
        <li>Whether this setup fits your current market knowledge</li>
        <li>Whether you're logging it in a trading journal afterward</li>
    </ul>

    <h2>A simple pre-market routine</h2>
    <p>Before the session you plan to trade, a short routine keeps you from
    reacting impulsively once price starts moving: check the economic
    calendar for scheduled news, mark your key levels for the day on your
    main pairs, note your bias (if any) from the higher timeframe, and decide
    in advance what would change your mind. Five minutes of preparation
    removes most of the in-the-moment decisions that tend to go badly.</p>

    <h2>Grade your execution, not just your outcome</h2>
    <p>A losing trade taken exactly according to your plan was a good trade
    with a bad outcome. A winning trade taken by breaking your own rules was a
    bad trade with a lucky outcome. Separating "did I follow my process" from
    "did I make money on this one" is what actually improves your process over
    time — grading only by profit and loss rewards you for lucky mistakes and
    punishes you for correct decisions that simply didn't work out this time.</p>

    <h2>Market correlations worth knowing</h2>
    <p>Currencies and other assets don't move in isolation:</p>
    <ul>
        <li><strong>Gold vs. the US Dollar</strong> — typically inverse; a
        weaker dollar often coincides with a stronger gold price</li>
        <li><strong>AUD vs. Gold</strong> — often move together, since Australia
        is a major gold exporter</li>
        <li><strong>USD/CAD vs. Oil</strong> — often inverse, since Canada is a
        major oil exporter and a stronger oil price tends to support the CAD</li>
        <li><strong>Risk-on vs. risk-off</strong> — currencies like AUD and NZD
        tend to strengthen when markets feel confident ("risk-on"), while JPY
        and CHF often strengthen when markets get nervous ("risk-off")</li>
    </ul>
    <p>Being unknowingly long two positions that are really the same bet
    (like long AUD/USD and long gold at the same time) doubles your real risk
    without you necessarily realizing it.</p>

    <h2>Building a weekly rhythm</h2>
    <p>Many traders find it useful to treat the week as having a shape: Monday
    often brings early positioning and can be choppier than expected; Tuesday
    through Thursday tend to carry the clearest trending moves and the bulk of
    high-impact news; Friday afternoons often see reduced volume as positions
    get closed ahead of the weekend. This isn't a rule to trade blindly, but a
    pattern worth being aware of when you're deciding how aggressively to
    trade on a given day.</p>

    <div class="va-callout">
        <strong>Session tip:</strong> the highest-volatility window is when
        London and New York overlap. In South African time (GMT+2) that's
        roughly 15:00-17:00.
    </div>
    `,

    // --- Advanced ---
    // --- smc ict ---
    "smc-ict-foundations": `
    <p>Smart Money Concepts (SMC) and Inner Circle Trading (ICT) describe a
    style of trading built around price action, order blocks, and how
    liquidity moves — rather than lagging indicators.</p>

    <h2>Order blocks</h2>
    <p>An order block is the last candle before a strong impulsive move — it's
    the market's "footprint," marking where a large imbalance was created.
    Order blocks are usually identified on higher timeframes (4H, Daily),
    while the actual demand/supply zone you trade from is often refined on a
    lower timeframe (15min, 5min), with confirmation from a pin bar,
    engulfing candle, or a run of same-direction candles.</p>

    ${DIAGRAMS.orderBlock}

    <h2>Bullish vs. bearish order blocks</h2>
    <p>A <strong>bullish order block</strong> is the last down-close candle
    before a strong move up — it marks where buyers overwhelmed sellers. A
    <strong>bearish order block</strong> is the last up-close candle before a
    strong move down. The color of the order block candle itself is often the
    opposite of the move that follows it — that's the point: it's the last
    gasp of the losing side before the other side took control.</p>

    <h2>Validating an order block</h2>
    <p>Not every candle before a move counts. A genuine order block should be
    followed by a real break of structure or a clear imbalance (a Fair Value
    Gap) — evidence that real displacement happened. A candle before a lazy,
    grinding move with no structural break is low-quality and generally not
    worth marking. When in doubt, ask: "did this candle's aftermath actually
    break a prior high or low?" If not, skip it.</p>

    <h2>Breaker blocks: when an order block fails</h2>
    <p>Sometimes an order block gets broken through entirely rather than
    holding. When that happens, it often flips role and becomes a
    <strong>breaker block</strong> — the opposite kind of zone. A failed
    bullish order block, once decisively broken below, frequently acts as
    resistance on a later retest, the same "role reversal" idea from the
    support/resistance lesson, just applied to order blocks specifically.</p>

    <h2>Mitigation: why price often returns to an order block</h2>
    <p>When an impulsive move leaves an order block behind, that zone often
    represents unfilled institutional orders. Price frequently returns to
    "mitigate" — partially or fully retest — that zone before continuing in
    the original direction. This is part of why order blocks are worth
    marking even after price has already moved away from them; they can
    become useful entry zones on the retrace.</p>

    <h2>Premium, discount, and equilibrium</h2>
    <p>Split any range in half, and the midpoint is called
    <strong>equilibrium</strong>. Above it is the premium zone (generally
    where you'd look to sell), below it is the discount zone (generally where
    you'd look to buy) — a concept you'll use constantly once Fair Value Gaps
    are introduced a few lessons from now.</p>

    <h2>Draw on Liquidity (DOL)</h2>
    <p>DOL describes how the market tends to move toward liquidity pools —
    usually recent highs, lows, or key levels.</p>
    <ul>
        <li><strong>Short-term DOL</strong> helps you spot where a smaller move
        is likely to end or target</li>
        <li><strong>Long-term DOL</strong> is based on major market expansions,
        helping you anticipate impulsive moves</li>
    </ul>

    <h2>Order flow</h2>
    <p>Order flow gives you a simple bias:</p>
    <ul>
        <li>Breaking above highs and rejecting below lows → <strong>bullish</strong> order flow</li>
        <li>Breaking below lows and rejecting above highs → <strong>bearish</strong> order flow</li>
    </ul>

    <h2>Putting it together: a walkthrough</h2>
    <p>Order flow is bullish — price has been breaking above highs and
    rejecting lows. Price pulls back into discount territory and taps a
    bullish order block that previously caused a break of structure. That
    order block is your draw on liquidity for the entry; the prior high
    becomes your target. Three separate concepts — order flow, discount
    pricing, and a validated order block — all pointing to the same
    conclusion is exactly the kind of stacked confluence this style of
    trading is built around.</p>
    `,

    "liquidity-crt-and-ranges": `
    <p>Candle Range Theory (CRT) gives you a repeatable, three-candle
    framework for reading how liquidity gets targeted and cleared.</p>

    <h2>Why liquidity sits where it sits</h2>
    <p>Liquidity clusters just beyond obvious swing highs and lows for a
    simple reason: that's exactly where retail stop losses cluster too. A
    trader long from below a swing low places their stop just under it; a
    trader short from above a swing high places theirs just above it. Those
    clustered stops are themselves liquidity — orders waiting to be
    triggered — which is precisely what makes those areas attractive for
    larger players to push price into before reversing.</p>

    <h2>The three-candle model</h2>
    <ol>
        <li><strong>Candle 1 — liquidity is generated.</strong> This candle
        creates two liquidity areas: one above its high, one below its low.</li>
        <li><strong>Candle 2 — liquidity is purged.</strong> Price sweeps one of
        those areas (say, the high) but the candle's body closes back inside
        candle 1's range — a rejection.</li>
        <li><strong>Candle 3 — liquidity is neutralized.</strong> Once the second
        candle confirms the rejection, you shift your draw on liquidity to the
        opposite side (the long-term target) and expect an expansion move.</li>
    </ol>

    ${DIAGRAMS.crt}

    <h2>Walking through a realistic example</h2>
    <p>Say EUR/USD forms a daily candle with a high of 1.0900 and a low of
    1.0850 (candle 1). The next day, price spikes up to 1.0915 — sweeping the
    liquidity resting above 1.0900 — but closes back down at 1.0880, inside
    candle 1's range (candle 2, the purge). On day three, price closes below
    1.0850 and keeps falling (candle 3, confirming neutralization). At that
    point, your draw on liquidity shifts down to the next meaningful support
    or prior swing low — the market has told you the highs were the trap, not
    the destination.</p>

    <h2>A second example: session liquidity</h2>
    <p>CRT doesn't only apply to daily candles — it applies to session ranges
    too. The Asian session often trades in a tight range, building up
    liquidity just above and below it. When London opens, it's extremely
    common to see price spike through the Asian high or low — sweeping that
    session's liquidity — before reversing and running in the opposite
    direction for the rest of the day. Marking the Asian range before London
    opens is one of the simplest, most repeatable ways to apply this idea.</p>

    <h2>The simplest liquidity read: prior highs and lows</h2>
    <p>Previous day, week, or month highs/lows are the easiest liquidity pools
    to spot. Watch for whether price closes above or below the level (a
    genuine break) versus just wicking through it (a liquidity grab with no
    real follow-through) — the difference matters more than the touch itself.</p>

    <h2>Range dynamics</h2>
    <p>Mark the high and low of a clear range, then mark the 50% midpoint
    (a Fibonacci retracement tool does this for you). That 50% level is
    typically your first draw on liquidity; the range's high or low — whichever
    direction order flow favors — becomes your next target.</p>

    <h2>CRT nests across timeframes</h2>
    <p>A CRT pattern on the daily chart is made up of dozens of smaller CRT
    patterns on the 1-hour or 15-minute chart underneath it. This is worth
    knowing mainly so you don't panic when a lower-timeframe CRT seems to
    contradict the higher-timeframe one — the higher timeframe's liquidity
    target generally takes priority, and the lower timeframe is just the path
    price takes to get there.</p>
    `,

    "irl-erl-and-fvg": `
    <p>This is where liquidity concepts, Fair Value Gaps, and risk management
    come together into an actual entry framework.</p>

    <h2>Internal vs. external range liquidity</h2>
    <ul>
        <li><strong>IRL (Internal Range Liquidity)</strong> — Fair Value Gaps
        (FVG), inverted FVGs, and Order Blocks sitting inside a range</li>
        <li><strong>ERL (External Range Liquidity)</strong> — the swing highs
        and swing lows that bound the range</li>
    </ul>
    <p>The general rhythm: price taps into IRL, and if you see both a CRT
    forming and an SMT (Smart Money Technique) confirmation within that IRL,
    your first draw on liquidity becomes that CRT's high, with the ERL as the
    next target beyond it.</p>

    <h2>Premium and discount</h2>
    <p>Split a range in half: the top half is the <strong>premium</strong>
    zone, the bottom half is the <strong>discount</strong> zone. The general
    rule is to sell in premium and buy in discount — so if price is trading in
    premium, your short-term target becomes a discount-zone FVG.</p>

    <h2>Fair Value Gap types</h2>
    <ul>
        <li><strong>Deep Retracement FVG (low probability)</strong> — a third
        candle reverses strongly back into the gap; these tend to get filled</li>
        <li><strong>Expansion FVG (moderate probability)</strong> — also called
        a breakaway gap; the third candle continues the move, so these tend
        <em>not</em> to retest</li>
        <li><strong>Consolidation FVG (high probability)</strong> — the third
        candle doesn't cross the prior candle's wick; these tend to get
        retested, offering a trade opportunity</li>
        <li><strong>Sneaky Breakaway Gap</strong> — looks like a deep retracement
        but the third candle has a long wick and small body; generally best
        avoided</li>
    </ul>

    ${DIAGRAMS.fvgPremiumDiscount}

    <h2>CE: the FVG's own midpoint</h2>
    <p>A Fair Value Gap doesn't always get filled edge-to-edge. Price often
    only needs to reach the gap's own 50% midpoint — called
    <strong>Consequent Encroachment (CE)</strong> — before reacting and
    continuing in the original direction. Treating the CE level as your first,
    more conservative target (rather than assuming the whole gap must fill)
    is a more realistic expectation in a lot of cases.</p>

    <h2>Stacking an FVG with an order block</h2>
    <p>An FVG that happens to overlap with an order block from the earlier
    lesson is a meaningfully stronger zone than either one alone — two
    independent concepts, built from different logic, pointing at the same
    few pips. This kind of stacking is exactly the "confluence" idea that
    keeps reappearing throughout this course, now applied at the liquidity
    level specifically.</p>

    <h2>When an FVG flips: the inverted FVG</h2>
    <p>If price pushes all the way back through a bullish Fair Value Gap
    rather than just retesting it, that zone can flip and start acting as
    resistance instead — an <strong>inverted FVG</strong>. It's the same role-
    reversal logic you've now seen with support/resistance, order blocks, and
    Fair Value Gaps: broken structure frequently becomes the opposite kind of
    structure, not neutral territory.</p>

    <h2>A quick note on naming: BISI and SIBI</h2>
    <p>You'll sometimes see a bullish FVG referred to as <strong>BISI</strong>
    (Buyside Imbalance, Sellside Inefficiency) and a bearish one as
    <strong>SIBI</strong> (Sellside Imbalance, Buyside Inefficiency). Same
    concept as above, just the more formal ICT terminology for it — useful to
    recognize if you see it used elsewhere.</p>

    <h2>Putting it together: a worked example</h2>
    <p>On a $100 account, risking 2% per trade ($2) with a 1:3 risk-to-reward
    target ($6): the market forms a Fair Value Gap, price taps back into it,
    and you enter with your stop sized to that $2 risk. Scale this up to a
    $10,000 account and the same 2%/1:3 rule becomes $200 risked for a $600
    target — the percentages don't change, only the dollar amounts do, which
    is exactly why trading a fixed percentage (not a fixed dollar amount) is
    what keeps your risk consistent as your account grows.</p>
    `,

    "elliott-wave-and-market-cycles": `
    <p>Elliott Wave theory describes markets as moving in repeating wave
    structures — five waves in the direction of the trend, followed by three
    corrective waves against it.</p>

    <h2>The basic structure</h2>
    <p>The first five-wave sequence (1-2-3-4-5) represents the impulse. It's
    sometimes followed directly by a three-wave correction (A-B-C). In other
    cases, a second five-wave sequence (labeled A-B-C-D-E) extends the move
    first, effectively giving you ten waves of movement before the corrective
    A-B-C finally arrives.</p>

    ${DIAGRAMS.elliottWave}

    <h2>Wave "personality"</h2>
    <p>Each wave in the impulse tends to have a recognizable character. Wave 3
    is classically the longest and most powerful — the clearest, most obvious
    trending move, often with the strongest momentum readings. Wave 5, by
    contrast, frequently shows weaker momentum than wave 3 even if price makes
    a marginally higher high — a classic setup for bearish divergence on an
    oscillator like RSI, and often a warning that the move is close to done.</p>

    <h2>Ending diagonals: when wave 5 looks different</h2>
    <p>Occasionally, the final wave of an impulse (or the final wave of a
    correction) forms as an <strong>ending diagonal</strong> — a wedge-shaped,
    overlapping structure rather than a clean five-wave move, where each sub-
    wave is itself only three waves. Ending diagonals tend to show up when a
    trend is running out of steam, and they're usually followed by a sharp,
    fast reversal once complete.</p>

    <h2>The Fibonacci relationships between waves</h2>
    <p>Elliott Wave and Fibonacci retracement are closely linked in practice:</p>
    <ul>
        <li>Wave 2 commonly retraces 50%-61.8% of wave 1</li>
        <li>Wave 3 is frequently the longest wave, often extending to 1.618x the
        length of wave 1</li>
        <li>Wave 4 commonly retraces around 38.2% of wave 3</li>
    </ul>
    <p>These aren't strict rules, but they give you a rough way to estimate
    where a current wave might end, rather than just guessing.</p>

    <h2>A validity check: the overlap rule</h2>
    <p>In a standard impulse, wave 4 is not supposed to move back into wave
    1's price territory. If it does, that's generally a sign your wave count
    is wrong, and what you're looking at may not be a clean five-wave impulse
    at all — worth remembering, since it's an easy, objective way to sanity-
    check a wave count rather than just trusting your first read of the chart.</p>

    <h2>Corrections aren't always a simple A-B-C</h2>
    <p>A correction can take a few different shapes: a <strong>zigzag</strong>
    (a sharp A-B-C, the simplest and most common form), a <strong>flat</strong>
    (where wave B retraces almost all of wave A, giving the correction a
    sideways, grinding feel), or a <strong>triangle</strong> (a contracting
    five-wave sideways structure, usually appearing in wave 4 rather than wave
    2). Recognizing that a correction is dragging on as a flat or triangle,
    rather than forcing it into a clean zigzag count, saves a lot of confusion.</p>

    <h2>Where order blocks tend to form</h2>
    <p>A useful pattern to watch for: after the fourth wave of the first
    five-wave sequence, the market often leaves behind an Order Block. If a
    second five-wave extension doesn't occur, price will often return to test
    that same fourth-wave area directly.</p>

    <h2>A word of caution</h2>
    <p>Elliott Wave counts are famously subjective — two traders can look at
    the same chart and label the waves differently. Treat wave counts as one
    more piece of confluence to layer on top of clearer signals (structure,
    liquidity, S/R), not as a standalone entry trigger.</p>
    `,

    "mt4-mt5-and-synthetic-indices": `
    <p>Knowing your platform well enough that it doesn't slow you down, and
    understanding the specific risks of synthetic markets, both matter more
    than beginners usually expect.</p>

    <h2>MT4 vs. MT5: what actually differs</h2>
    <p>MT5 is the newer platform and generally the better default choice
    today: it includes more built-in timeframes, an economic calendar, and
    supports more order types. It also offers both "hedging" accounts (where
    you can hold a buy and a sell on the same pair at once) and "netting"
    accounts (where opposing positions combine into one net position) — MT4
    only supports hedging. Many brokers still run MT4 for legacy reasons or
    specific Expert Advisor compatibility, so it's worth checking which your
    broker actually offers before assuming.</p>

    <h2>MT4/5 mobile walkthrough</h2>
    <ul>
        <li><strong>Quotes</strong> — your watchlist of tradable pairs</li>
        <li><strong>Trade</strong> — shows Balance, Equity, Margin, Free Margin,
        and Margin Level; open the execution panel from the top-right icon</li>
        <li><strong>History</strong> — entry history plus deposits/withdrawals,
        filterable by date via the calendar icon</li>
        <li><strong>Chart</strong> — your open chart with active entries, stop
        losses, and take-profits marked, plus stackable indicator windows (e.g.
        an RSI window beneath the price chart)</li>
    </ul>

    <h2>Two order-management features worth knowing</h2>
    <p><strong>Partial close</strong> lets you close a portion of an open
    position while leaving the rest running — useful for banking some profit
    without fully exiting a trade you still believe in. A <strong>trailing
    stop</strong> automatically moves your stop loss as price moves in your
    favor, locking in progressively more profit without you manually adjusting
    it — though it can also close you out of a trade during a normal pullback
    if set too tight.</p>

    <h2>Expert Advisors: automation on MT4/5</h2>
    <p>Both platforms support Expert Advisors (EAs) — automated scripts that
    can analyze charts and place trades without manual input, written in
    MQL4/MQL5 (MetaTrader's own programming languages). This is a deep topic
    on its own, but it's worth knowing the door exists: if you eventually
    develop a fully mechanical strategy with clear, objective rules, it's
    possible to automate it rather than executing every trade by hand.</p>

    <h2>Synthetic indices are a different animal</h2>
    <p>Synthetic indices (like those offered on Deriv) are simulated markets —
    not real currency pairs — with their own liquidity and volatility
    behavior:</p>
    <ul>
        <li><strong>Volatility Index</strong> — tracks implied volatility
        directly; plan trades carefully since swings can be sharp</li>
        <li><strong>Crash Index</strong> — tends to trend upward in smaller
        ticks before a sudden drop; many traders favor watching for sell
        opportunities after an extended bullish run</li>
        <li><strong>Boom Index</strong> — the mirror image, ranging or trending
        down before a sudden spike upward</li>
        <li><strong>Step Index</strong> — moves in fixed-size steps with no
        wicks, giving it a distinctly different, more mechanical feel than the
        others</li>
    </ul>
    <p>Because these behave differently from real forex pairs, don't apply
    forex-specific assumptions (like session timing) directly — they trade
    and move on their own logic. Lot sizing conventions on synthetics can also
    differ from standard forex lots, so always confirm exactly what one "lot"
    represents on the specific synthetic instrument before sizing a trade.</p>

    <h2>Demo vs. live execution differences</h2>
    <p>A strategy that looks flawless on a demo account can behave differently
    live, mainly due to slippage and execution speed — demo servers often fill
    orders instantly at the exact requested price, while live servers are
    subject to real market conditions and broker execution quality. Treat demo
    testing as a way to validate your rules and discipline, not as proof of
    exactly how a strategy will perform live, pip for pip.</p>

    <h2>Account survival rules</h2>
    <ul>
        <li><strong>5-3-1 Rule</strong> — pick 5 pairs, develop 3 strategies,
        trade during 1 session</li>
        <li><strong>1% Rule</strong> — never risk more than 1% of your account
        on a single trade</li>
    </ul>
    <div class="va-callout">
        You'll often hear some version of the statistic that most new traders
        lose the majority of their starting capital within their first few
        months. The exact number varies by source, but the underlying warning
        is worth taking seriously: test any strategy on a demo account before
        trading it live.
    </div>
    `,

    "cot-positioning": `
    <p>The Commitment of Traders (COT) report, published weekly by the CFTC,
    shows how different categories of participants are positioned in futures
    markets, including currency futures that closely track the spot forex
    pairs you trade.</p>

    <h2>The three participant categories</h2>
    <ul>
        <li><strong>Commercials (hedgers)</strong> — banks, corporations, and
        institutions using futures to hedge real underlying exposure, not to
        speculate on direction</li>
        <li><strong>Non-Commercials (large speculators)</strong> — hedge funds
        and large trading firms taking directional bets, generally considered
        the "smart money" side of the report</li>
        <li><strong>Non-Reportable (small traders)</strong> — everyone below the
        reporting threshold, often used as a rough proxy for retail sentiment</li>
    </ul>

    ${DIAGRAMS.cotPositioning}

    <h2>Reading net position</h2>
    <p>A category's <strong>net position</strong> is simply its long contracts
    minus its short contracts. A strongly positive net position means that
    group is heavily long; strongly negative means heavily short. When large
    speculators' net position reaches a historical extreme in either
    direction, that's the "one-sided positioning" that often precedes trend
    exhaustion — because there are fewer new buyers (or sellers) left to push
    the move further.</p>

    <h2>A worked example</h2>
    <p>Say large speculators hold 80,000 long contracts and 20,000 short
    contracts on EUR futures — a net position of +60,000 (heavily long). The
    following week, longs drop to 70,000 while shorts rise to 30,000 — net
    position falls to +40,000. Even though the net position is still positive
    (still net long), the <em>change</em> matters: large speculators are
    reducing their bullish bets, which can be an early hint that the
    enthusiasm behind a long-running uptrend is starting to fade, well before
    it necessarily shows up in price.</p>

    <h2>The COT Index: normalizing positioning</h2>
    <p>Raw net position numbers are hard to judge without context — is 60,000
    contracts extreme, or just normal? The <strong>COT Index</strong> solves
    this by rescaling net position onto a 0-100 scale based on its range over
    a lookback period (commonly 1-3 years): a reading near 100 means
    positioning is near its most bullish extreme in that window; near 0 means
    near its most bearish. This makes "is this actually stretched?" a much
    more answerable question than staring at a raw contract count.</p>

    <h2>Why it's useful</h2>
    <p>When large speculators are extremely one-sided, it can signal that a
    trend is stretched and due for exhaustion or a reversal, even if price
    action alone hasn't shown it yet. It's a sentiment and positioning tool,
    not a timing tool.</p>

    <h2>The catch: it's lagging data</h2>
    <p>COT data is published based on positions as of the prior Tuesday, so by
    the time you read it, it's already several days old. Use it to build a
    medium-term bias rather than a precise entry trigger.</p>

    <p>Voyager Analytics has a dedicated COT Positioning tool that pulls and
    visualizes this data directly, so you can read positioning trends without
    manually parsing CFTC releases yourself.</p>
    `,

    // --- TRADINGVIEW ---
    "tradingview-interface-tour": `
    <p>TradingView can look overwhelming the first time you open it — but
    everything lives in one of four consistent areas.</p>

    ${DIAGRAMS.tvLayout}

    <div class="tradingview-widget-container" style="margin:var(--sp-4) 0;">
        <div class="tradingview-widget-container__widget"></div>
        <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js" async>
        {
        "width": "100%",
        "height": 420,
        "symbol": "FX_IDC:EURUSD",
        "interval": "60",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": true
        }
        </script>
    </div>
    <p style="font-size:0.85rem;color:var(--va-text-muted);">That's a real, live TradingView chart — try dragging the toolbar icons on the left before moving to the next lesson.</p>

    <h2>The chart area</h2>
    <p>The center of the screen is your price chart. Use the symbol search
    (top-left, or press <code>/</code>) to switch instruments, and the interval
    selector next to it to change timeframe. The chart-type icon lets you
    switch between candles, bars, Heikin Ashi, and line charts.</p>

    <h2>Left toolbar — drawing tools</h2>
    <p>This vertical strip holds every drawing tool: trend lines, Fibonacci
    tools, shapes, and text. We'll cover this in detail in the next lesson.</p>

    <h2>Right sidebar</h2>
    <p>Collapsible tabs for your Watchlist, symbol Details, News, Hotlists, and
    the Economic Calendar — click any icon to expand it without leaving your
    chart.</p>

    <h2>Bottom panel — Trading Panel</h2>
    <p>This is where paper trading and broker connections live, along with
    quick timeframe buttons and a date-range slider for scrolling through
    history.</p>

    <h2>Layout tabs</h2>
    <p>At the very top, layout tabs let you save multiple chart setups (e.g.
    one for forex majors, one for gold) and switch between them instantly —
    each remembers its own symbols, indicators, and drawings.</p>

    <h2>Splitting your screen</h2>
    <p>You're not limited to one chart at a time. The layout icon next to the
    layout tabs lets you split the workspace into 2, 4, or more panes at once
    — useful for watching a pair across two timeframes simultaneously, or
    keeping an eye on a correlated instrument (like DXY alongside EUR/USD)
    without switching tabs back and forth.</p>

    <h2>A few keyboard shortcuts worth learning</h2>
    <ul>
        <li><code>/</code> — jump straight to symbol search</li>
        <li><code>Alt</code> + drag — measure tool (covered next lesson)</li>
        <li><code>Ctrl/Cmd + Z</code> — undo your last drawing or action</li>
    </ul>
    `,

    "tradingview-drawing-tools": `
    <p>Good drawing habits keep your charts readable instead of turning into a
    scribbled mess.</p>

    <h2>Trend lines and magnet mode</h2>
    <p>Select the trend line tool from the left toolbar and click two points to
    draw. Turn on <strong>Magnet Mode</strong> (the magnet icon) to have your
    line snap precisely to candle wicks and closes instead of freehand
    placement.</p>

    <h2>Fibonacci retracement</h2>
    <p>Select the Fib Retracement tool, then drag from a swing low to a swing
    high (or vice versa) — TradingView automatically plots and labels every
    level for you, matching exactly what you learned in the Fibonacci lesson.</p>

    <h2>Shapes and annotations</h2>
    <p>Rectangles and ellipses are useful for marking supply/demand zones or
    order blocks directly on the chart. The text tool lets you leave notes for
    your future self when you review the trade later.</p>

    <h2>The measure tool</h2>
    <p>Hold <strong>Alt</strong> (or <strong>Option</strong> on Mac) and drag
    across any part of the chart to instantly see the price difference, number
    of bars, and percentage change between two points.</p>

    <h2>Two tools worth exploring once you're comfortable</h2>
    <p>The <strong>Gann Fan</strong> and <strong>Pitchfork</strong> tools are
    more advanced ways of projecting potential support/resistance lines and
    channels forward in time, based on angles and pivot points rather than
    simple horizontal levels. They're not essential to start with, but they're
    there in the same toolbar once you want to go deeper into projecting
    future price paths rather than just marking the past.</p>

    <h2>Keeping your chart clean</h2>
    <p>Right-click any drawing to <strong>lock</strong> it (so you don't
    accidentally drag it later), or use the eye icon in the toolbar to hide all
    drawings at once without deleting them. You can also save a drawing's
    style as a template so every new trend line matches your preferred color
    and thickness automatically.</p>
    `,

    "tradingview-indicators-and-strategies": `
    <p>Indicators turn raw price data into a specific read on momentum,
    volatility, or trend — but it's worth understanding how TradingView
    manages them before you dive in.</p>

    <h2>Adding an indicator</h2>
    <p>Click the <strong>Indicators</strong> button (the "fx" icon at the top
    of the chart) and search by name. Popular starting points: Moving Average,
    RSI, MACD, Bollinger Bands, and Volume.</p>

    <div class="va-callout">
        <strong>Heads up:</strong> TradingView's free plan limits you to 2
        indicators per chart. It's a common wall beginners hit quickly — you can
        still learn everything in this course on the free plan, but a paid tier
        removes that ceiling if you want more running at once.
    </div>

    <h2>Overlay vs. separate-pane indicators</h2>
    <p>Some indicators — like moving averages and Bollinger Bands — draw
    directly on top of price, in the same pane as your candles. Others — like
    RSI and MACD — need their own pane below the chart, since they're measured
    on a completely different scale than price itself. TradingView handles
    this automatically based on the indicator type, but it's useful to know
    why some indicators show up "on" the chart and others show up "under" it.</p>

    <h2>Customizing an indicator</h2>
    <p>Click the gear icon next to any indicator's name in the chart legend to
    change its inputs (like the moving average's length) and its visual style
    (colors, line thickness). Once you've got a setup you like, save it as a
    template so it applies automatically to new charts.</p>

    <h2>Comparing symbols on one chart</h2>
    <p>The "Compare" feature (in the same search panel as symbols) overlays a
    second instrument on your current chart, rescaled so the two are visually
    comparable — handy for checking whether EUR/USD and DXY are actually
    moving inversely the way theory says they should, right on the same chart.</p>

    <h2>What Pine Script is</h2>
    <p>Pine Script is TradingView's own scripting language for building custom
    indicators and automated strategies. You don't need to write a single line
    of it to use TradingView well — the community has published well over
    100,000 free public scripts you can add to your chart with one click from
    the Indicators panel's "Community Scripts" tab. If a script is published
    as a "strategy" rather than an "indicator," you can also run it through
    TradingView's built-in Strategy Tester to see how it would have performed
    historically — a useful way to sanity-check an idea before ever risking
    real money on it. If you do want to build your own indicators or
    strategies later, know that Pine Script has a real learning curve,
    especially without prior coding experience.</p>
    `,

    "tradingview-alerts-and-watchlists": `
    <p>Alerts and watchlists are what let you actually step away from the
    charts without missing a setup.</p>

    <h2>Setting a price alert</h2>
    <p>Right-click anywhere on the chart and choose <strong>Add Alert</strong>,
    or click the alarm-clock icon. Set your condition (crossing, greater than,
    less than a specific price), choose how you want to be notified — pop-up,
    app push, or email — and save it.</p>

    <h2>Technical alerts</h2>
    <p>You're not limited to price levels — you can also alert off an
    indicator crossing a threshold, or price touching a drawing you've placed,
    like a trend line or Fibonacci level. This means you can set an alert for
    "price reaches my Golden Zone" rather than having to calculate and type in
    the exact price yourself.</p>

    <div class="va-callout">
        <strong>Free plan limits:</strong> 3 active alerts at a time, and they
        expire after a period rather than running indefinitely. Paid plans raise
        the count significantly and allow alerts that never expire.
    </div>

    <h2>Webhook alerts: connecting to other tools</h2>
    <p>On paid plans, an alert can also fire a <strong>webhook</strong> — a
    message sent to another service instead of (or alongside) a notification
    to you. This is the mechanism people use to connect TradingView alerts to
    automation tools or bots elsewhere. It's a more advanced setup than most
    beginners need immediately, but worth knowing it exists once you're ready
    to start automating parts of your process.</p>

    <h2>Watchlists</h2>
    <p>Your watchlist (right sidebar) holds the symbols you check regularly.
    Free accounts get one watchlist capped at 30 symbols — plenty for a
    focused list of majors, gold, and a couple of indices. You can organize a
    longer list into sections (right-click → "Add Section") so your forex
    majors, metals, and indices don't all blur together in one flat list.</p>

    <h2>The screener</h2>
    <p>TradingView's Screener tabs (Stocks, Forex, Crypto) let you filter the
    entire market by criteria like price change, volume, or a specific
    indicator value — useful for finding candidates before you go chart them
    individually, rather than checking symbols one at a time.</p>
    `,

    "tradingview-paper-and-live-trading": `
    <p>Once you can read a chart, TradingView gives you two ways to actually
    act on it — one with no risk at all, and one for real execution.</p>

    <div class="tradingview-widget-container" style="width:100%;">
        <div class="tradingview-widget-container__widget"></div>
        <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js" async>
        {
        "width": "100%",
        "height": 420,
        "symbol": "OANDA:XAUUSD",
        "interval": "60",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "allow_symbol_change": true
        }
        </script>
    </div>

    <h2>Paper trading</h2>
    <p>Paper trading is TradingView's free, built-in simulator — no broker
    connection or deposit required. Open the <strong>Trading Panel</strong> at
    the bottom of the chart, select the Paper Trading account, and click
    Connect. You'll start with $100,000 in virtual funds by default.</p>

    <h2>Making it realistic</h2>
    <p>Click the gear icon next to your paper account name to reset your
    balance — set it to match what you'd actually trade with, not the default
    $100k. Practicing with an unrealistic account size is a quiet way to build
    bad risk-management habits that don't transfer to a real account.</p>

    <h2>Practicing a specific rule, not just "trading"</h2>
    <p>Paper trading is most useful when you give it a narrow job: instead of
    "practice trading" in general, try "practice only taking A+ setups with a
    1:3 minimum risk-to-reward" for a set number of trades, and review the
    results afterward. That turns the simulator into a test of your actual
    rules under real-time conditions, not just idle chart-clicking.</p>

    <h2>Placing and managing simulated trades</h2>
    <p>From here, trading works the same as any real account: select your
    symbol, place a market or pending order directly from the chart or the
    Order Panel, and track open positions, order history, and account
    performance in the same panel.</p>

    <h2>Bar Replay: practicing on the past</h2>
    <p>On paid plans, Bar Replay lets you rewind the chart to any past date
    and step forward candle by candle, as if it were happening live — without
    waiting for the market to actually move. Combined with paper trading, this
    is one of the fastest ways to rack up practice reps on a specific setup,
    since you're not limited to whatever the market happens to be doing today.</p>

    <h2>Connecting a real broker</h2>
    <p>TradingView also offers direct broker integrations, letting you place
    actual live (or broker demo) trades straight from the chart instead of
    switching to your broker's own platform. Which brokers are supported
    varies by region, so check your specific broker's compatibility before
    assuming this is available to you.</p>
    `,








};