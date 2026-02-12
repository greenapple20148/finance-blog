
import { Article, Category } from './types';

export const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Magic of Compound Interest: Building Wealth Over Decades',
    excerpt: 'Understand why starting early is the single most important factor in your retirement planning.',
    content: `
      Compound interest is often referred to as the eighth wonder of the world. It is the process where the value of an investment increases because the earnings on an investment, both capital gains and interest, earn interest as time passes. 
      
      Imagine you invest $10,000 at a 7% annual return. In the first year, you earn $700. In the second year, you don't just earn 7% on your initial $10,000, but also on the $700 you earned previously. Over 30 years, that $10,000 grows to over $76,000 without you adding a single extra penny.
      
      The key variables are time, rate of return, and consistency. While we cannot control the market returns, we can control how much we save and when we start. Delaying your investment by just 5 years can cost you hundreds of thousands of dollars in the long run.
    `,
    category: Category.INVESTING,
    author: 'Elena Vance',
    date: 'Oct 12, 2023',
    readTime: '6 min',
    imageUrl: 'https://picsum.photos/800/500?random=1'
  },
  {
    id: '2',
    title: 'The 50/30/20 Rule: A Simple Framework for Budgeting',
    excerpt: 'Stop overcomplicating your finances. Use this proven ratio to manage your income effectively.',
    content: `
      Budgeting doesn't have to be a chore. The 50/30/20 rule is a simple, intuitive way to manage your after-tax income. 
      
      50% goes to Needs: This includes rent, utilities, groceries, and insurance. 
      30% goes to Wants: Dining out, hobbies, and that Netflix subscription.
      20% goes to Financial Goals: Debt repayment, emergency funds, and retirement accounts.
      
      By sticking to these broad categories, you give yourself permission to spend on things you enjoy while ensuring your future self is taken care of. If your needs exceed 50%, it's a sign you might need to look at downsizing your fixed costs.
    `,
    category: Category.BUDGETING,
    author: 'Marcus Aurelius',
    date: 'Nov 05, 2023',
    readTime: '4 min',
    imageUrl: 'https://picsum.photos/800/500?random=2'
  },
  {
    id: '3',
    title: 'Snowball vs. Avalanche: Which Debt Strategy is Best?',
    excerpt: 'Debating the psychological vs. mathematical approach to clearing your credit card balances.',
    content: `
      Debt can feel like a mountain, but there are two main ways to climb it.
      
      The Debt Snowball method focuses on momentum. You pay off the smallest balance first, regardless of interest rate. Once that's gone, you roll that payment into the next smallest. The quick wins provide psychological motivation.
      
      The Debt Avalanche method focuses on mathematics. You pay off the highest interest rate debt first. This saves you the most money over time.
      
      Research shows that for many, the Snowball method is actually more effective because humans are driven by behavior and small victories. However, if you are strictly analytical, the Avalanche is your best bet.
    `,
    category: Category.DEBT,
    author: 'Sarah Jenkins',
    date: 'Dec 01, 2023',
    readTime: '8 min',
    imageUrl: 'https://picsum.photos/800/500?random=3'
  },
  {
    id: '4',
    title: 'Tax-Loss Harvesting: Turning Portfolio Losses into Gains',
    excerpt: 'How to use market downturns to lower your tax bill at the end of the year.',
    content: `
      Tax-loss harvesting involves selling an investment that has lost value to offset taxes on other investment gains.
      
      For example, if you sold a stock for a $5,000 profit but have another stock that is currently down $5,000, selling the loser can effectively zero out your capital gains tax for that year.
      
      There are rules to follow, like the Wash-Sale Rule, which prevents you from buying a 'substantially identical' security within 30 days before or after the sale. Done correctly, it's one of the few 'free lunches' in the tax world.
    `,
    category: Category.TAX,
    author: 'David Chen',
    date: 'Jan 15, 2024',
    readTime: '5 min',
    imageUrl: 'https://picsum.photos/800/500?random=4'
  },
  {
    id: '5',
    title: 'The 4% Rule: Deciphering Retirement Sustainability',
    excerpt: 'Is the golden rule of retirement still valid in a world of high inflation and market volatility?',
    content: `
      The 4% rule suggests that you can comfortably withdraw 4% of your retirement savings in your first year of retirement, and then adjust that amount for inflation every year thereafter, for at least 30 years without running out of money.
      
      Born from the Trinity Study, this rule assumes a portfolio balanced between stocks and bonds. However, with modern market shifts, some experts argue for a more conservative 3% or 3.5% withdrawal rate, especially for early retirees who might need their money to last 50 years.
      
      The key to making the 4% rule work is flexibility. Being willing to tighten your belt during down years in the market can significantly increase the longevity of your portfolio.
    `,
    category: Category.INVESTING,
    author: 'Julian Thorne',
    date: 'Feb 10, 2024',
    readTime: '7 min',
    imageUrl: 'https://picsum.photos/800/500?random=5'
  },
  {
    id: '6',
    title: 'Roth vs. Traditional: Optimizing Your Retirement Tax Strategy',
    excerpt: 'Choosing the right vehicle for your retirement savings can mean the difference of thousands in tax savings.',
    content: `
      The primary difference between a Traditional and Roth account is when you pay the taxes. With a Traditional IRA or 401(k), you get a tax break now but pay taxes on withdrawals in retirement. With a Roth, you pay taxes now but withdrawals are tax-free later.
      
      So, which is better? It depends on your current tax bracket versus your expected bracket in retirement. If you are early in your career and in a low bracket, Roth is usually superior. If you are a high earner today, the immediate tax deduction of a Traditional account might be more valuable.
      
      Ideally, most investors should aim for 'tax diversification' by holding both types of accounts, giving them flexibility in retirement to withdraw from whichever source is most advantageous that year.
    `,
    category: Category.TAX,
    author: 'Sophia Martinez',
    date: 'Mar 02, 2024',
    readTime: '6 min',
    imageUrl: 'https://picsum.photos/800/500?random=6'
  },
  {
    id: '7',
    title: 'Emergency Funds: The Hidden Bedrock of Wealth',
    excerpt: 'Why having liquid cash is the most important investment you will ever make.',
    content: `
      An emergency fund is not just a savings account; it's insurance for your lifestyle. Without it, a single car repair or medical bill can force you into high-interest credit card debt, erasing months of investment gains.
      
      Most experts recommend keeping 3 to 6 months of living expenses in a liquid, high-yield savings account. While this money isn't earning the high returns of the stock market, its value lies in the 'peace of mind' it provides.
      
      Having this cash buffer allows you to stay invested during market downturns because you aren't forced to sell your stocks at a loss to cover an unexpected expense. It is the foundation upon which all other wealth is built.
    `,
    category: Category.SAVING,
    author: 'Leo Sterling',
    date: 'Mar 22, 2024',
    readTime: '5 min',
    imageUrl: 'https://picsum.photos/800/500?random=7'
  },
  {
    id: '8',
    title: 'Credit Score Mechanics: Beyond the 800 Barrier',
    excerpt: 'Unlock lower interest rates and better insurance premiums by mastering the five pillars of your credit profile.',
    content: `
      Your credit score is a numerical representation of your reliability as a borrower. It affects everything from your mortgage rate to your ability to rent an apartment or even get certain jobs.
      
      The five pillars are: Payment History (35%), Amounts Owed (30%), Length of Credit History (15%), Credit Mix (10%), and New Credit (10%).
      
      The secret to an elite score is not just paying on time, but keeping your 'utilization' low—ideally under 10% of your available credit. Even if you pay in full every month, a high balance on your statement date can temporarily depress your score.
    `,
    category: Category.DEBT,
    author: 'Amara Okafor',
    date: 'Apr 05, 2024',
    readTime: '9 min',
    imageUrl: 'https://picsum.photos/800/500?random=8'
  },
  {
    id: '9',
    title: 'The FIRE Movement: A Blueprint for Early Retirement',
    excerpt: 'Financial Independence, Retire Early is more than a trend—it is a mathematical strategy for freedom.',
    content: `
      The FIRE (Financial Independence, Retire Early) movement is built on a foundation of extreme saving and intentional investing. At its core is the "Rule of 25," which states that you have reached financial independence when you have saved 25 times your annual expenses.
      
      FIRE practitioners often aim for a savings rate of 50% to 70% of their income. By living significantly below their means and investing the difference in low-cost index funds, they compress a traditional 40-year career into 10 or 15 years.
      
      There are different "flavors" of FIRE: LeanFIRE for those with minimalist lifestyles, FatFIRE for those wanting a more luxurious retirement, and CoastFIRE for those who have saved enough early on that they no longer need to contribute to their accounts to reach their goal by traditional retirement age.
    `,
    category: Category.SAVING,
    author: 'Nicolette Dubois',
    date: 'May 14, 2024',
    readTime: '10 min',
    imageUrl: 'https://picsum.photos/800/500?random=11'
  },
  {
    id: '10',
    title: 'REITs vs. Physical Real Estate: Building a Property Empire',
    excerpt: 'Should you manage tenants or manage a ticker symbol? Comparing passive and active real estate plays.',
    content: `
      Real estate is a classic pillar of wealth, but the barrier to entry for physical property is high. Physical real estate offers the benefit of leverage (mortgages) and significant tax advantages like depreciation and 1031 exchanges. However, it requires active management: finding tenants, maintaining properties, and dealing with "the three Ts" (Tenants, Trash, and Toilets).
      
      REITs (Real Estate Investment Trusts), on the other hand, allow you to invest in large-scale, income-producing real estate through the stock market. They are highly liquid and provide consistent dividends, as they are required by law to distribute 90% of their taxable income to shareholders.
      
      For the modern investor, a hybrid approach is often best. REITs provide easy diversification across sectors like data centers and healthcare, while physical property can provide the forced savings and leverage that build significant equity over time.
    `,
    category: Category.INVESTING,
    author: 'Jackson Reed',
    date: 'Jun 02, 2024',
    readTime: '8 min',
    imageUrl: 'https://picsum.photos/800/500?random=12'
  },
  {
    id: '11',
    title: 'Estate Planning 101: Securing Your Legacy Beyond the Will',
    excerpt: 'A will is just the beginning. Discover how trusts and beneficiary designations protect your heirs from probate.',
    content: `
      Many people assume estate planning is only for the ultra-wealthy. In reality, anyone with assets or dependents needs a plan to avoid the lengthy and expensive process of probate.
      
      A comprehensive estate plan includes a Will, but also considers Revocable Living Trusts, which allow assets to pass to heirs instantly without court intervention. Additionally, many financial accounts allow for "Transfer on Death" (TOD) or "Payable on Death" (POD) designations, which override what is written in a will.
      
      Don't forget the medical and legal side: a Power of Attorney and a Healthcare Directive ensure that your wishes are carried out if you become incapacitated. Estate planning isn't just about money; it's about providing clarity and peace for your loved ones during a difficult time.
    `,
    category: Category.TAX,
    author: 'Claudia Vance',
    date: 'Jun 28, 2024',
    readTime: '7 min',
    imageUrl: 'https://picsum.photos/800/500?random=13'
  },
  {
    id: '12',
    title: 'Inflation-Proofing Your Portfolio: The Role of I-Bonds and TIPS',
    excerpt: 'As the cost of living rises, traditional bonds may lose value. Learn how to protect your purchasing power.',
    content: `
      Inflation is the silent killer of wealth. While stocks have historically outpaced inflation over the long term, they can be volatile. For the fixed-income portion of your portfolio, traditional bonds can suffer when inflation (and interest rates) rise.
      
      Series I Savings Bonds and Treasury Inflation-Protected Securities (TIPS) are two specialized government instruments designed to combat this. I-Bonds earn a combined fixed rate and a semiannual inflation rate, making them a "risk-free" way to ensure your cash keeps up with the Consumer Price Index (CPI).
      
      TIPS, however, are tradable on the secondary market. Their principal value increases with inflation and decreases with deflation. While they may not offer the explosive growth of tech stocks, they provide a reliable floor for your portfolio's purchasing power during periods of economic instability.
    `,
    category: Category.INVESTING,
    author: 'Dr. Arthur Sterling',
    date: 'Jul 10, 2024',
    readTime: '6 min',
    imageUrl: 'https://picsum.photos/800/500?random=14'
  }
];
