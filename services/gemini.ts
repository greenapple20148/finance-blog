
import { GoogleGenAI, Type } from "@google/genai";
import { Message, BudgetItem, NewsItem, DebtItem } from "../types";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
// MUST NOT use fallback logic for the API key.
const ai = new GoogleGenAI({ 
  apiKey: process.env.API_KEY 
});

export const summarizeArticle = async (content: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Please provide a concise, 3-point summary (TL;DR) of the following personal finance article: \n\n${content}`,
    config: {
      temperature: 0.7,
    }
  });
  return response.text || "Summary unavailable.";
};

export const chatWithExpert = async (messages: Message[]): Promise<string> => {
  const history = messages.slice(0, -1).map(m => ({
    role: m.role,
    parts: [{ text: m.text }]
  }));
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [
        ...history,
        { role: 'user', parts: [{ text: messages[messages.length - 1].text }] }
    ],
    config: {
      systemInstruction: "You are Finny, a world-class personal finance expert at FinBlog. Provide empathetic, accurate, and actionable financial advice. Never give specific stock tips or legal advice, but explain concepts clearly. Keep responses concise and use markdown for formatting.",
      temperature: 0.7,
    }
  });
  return response.text || "I'm sorry, I couldn't process that.";
};

export const analyzeBudget = async (items: BudgetItem[]): Promise<string> => {
  const budgetStr = items.map(i => `${i.category}: $${i.amount}`).join('\n');
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this monthly budget and provide 3 specific tips for optimization:\n\n${budgetStr}`,
    config: {
      temperature: 0.5,
    }
  });
  return response.text || "No analysis available.";
};

export const analyzeTaxSituation = async (income: number, deductions: number, credits: number, estimatedTax: number): Promise<string> => {
  const prompt = `Analyze this tax situation for a US filer:
  - Gross Income: $${income}
  - Deductions: $${deductions}
  - Tax Credits: $${credits}
  - Estimated Federal Liability: $${estimatedTax}
  
  Provide 3 sophisticated tax-saving strategies. Keep it educational.`;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
    }
  });
  return response.text || "Analysis unavailable.";
};

export const analyzeInvestment = async (initial: number, monthly: number, rate: number, years: number, total: number): Promise<string> => {
  const prompt = `Analyze this investment projection:
  - Initial: $${initial}
  - Monthly: $${monthly}
  - Return: ${rate}%
  - Horizon: ${years} years
  - Future Value: $${total.toLocaleString()}
  
  Provide 3 expert insights on inflation impact, historical context, and risk management.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
    }
  });
  return response.text || "Investment analysis unavailable.";
};

export const analyzeDebtStrategy = async (debts: DebtItem[], extraPayment: number, method: 'snowball' | 'avalanche'): Promise<string> => {
  const debtsStr = debts.map(d => `- ${d.name}: $${d.balance} at ${d.interestRate}%`).join('\n');
  const prompt = `Analyze this debt profile and the '${method}' strategy. 
  Extra Payment: $${extraPayment}/mo.
  
  Debts:
  ${debtsStr}
  
  Provide assessment, advice on method choice, and three advanced tips.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
    }
  });
  return response.text || "Debt analysis unavailable.";
};

export interface CoachInsight {
  status: string;
  tip: string;
  motivationScore: number;
  strategicNote: string;
}

export const fetchDebtCoachTip = async (debts: DebtItem[], method: 'snowball' | 'avalanche'): Promise<CoachInsight> => {
  const totalBalance = debts.reduce((acc, d) => acc + d.balance, 0);
  const avgRate = debts.length > 0 ? (debts.reduce((acc, d) => acc + d.interestRate, 0) / debts.length).toFixed(1) : 0;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Supportive AI Debt Coach tip for method: ${method}. Total Debt: $${totalBalance}. Avg Rate: ${avgRate}%. Return JSON with status, tip, motivationScore (1-100), strategicNote.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          status: { type: Type.STRING },
          tip: { type: Type.STRING },
          motivationScore: { type: Type.NUMBER },
          strategicNote: { type: Type.STRING },
        },
        propertyOrdering: ["status", "tip", "motivationScore", "strategicNote"]
      },
      temperature: 0.9,
    }
  });
  
  try {
    const text = response.text || '{}';
    return JSON.parse(text.trim());
  } catch (e) {
    return {
      status: "Analyzing...",
      tip: "Every dollar paid is a step closer to freedom.",
      motivationScore: 50,
      strategicNote: "Focus on the plan."
    };
  }
};

export const analyzeFortyOneK = async (salary: number, contribution: number, match: number, matchLimit: number, currentBalance: number, rate: number, years: number, total: number): Promise<string> => {
  const prompt = `Analyze this 401(k) projection:
  - Salary: $${salary.toLocaleString()}
  - Contribution: ${contribution}%
  - Employer Match: ${match}% up to ${matchLimit}%
  - Horizon: ${years} years
  - Nest Egg: $${total.toLocaleString()}

  Provide insights on matching efficiency, withdrawal rule projection, and Roth vs Traditional advice.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
    }
  });
  return response.text || "Retirement analysis unavailable.";
};

export const analyzeAnnuity = async (monthly: number, rate: number, years: number, total: number): Promise<string> => {
  const prompt = `Analyze this Future Value of Annuity:
  - Monthly: $${monthly.toLocaleString()}
  - Return: ${rate}%
  - Years: ${years}
  - Total: $${total.toLocaleString()}

  Provide 3 insights on principal vs interest ratio, cost of procrastination, and escalation strategies.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
    }
  });
  return response.text || "Annuity analysis unavailable.";
};

export const analyzeMortgage = async (price: number, down: number, rate: number, term: number, monthly: number): Promise<string> => {
  const prompt = `Analyze this mortgage:
  - Price: $${price.toLocaleString()}
  - Down: $${down.toLocaleString()}
  - Rate: ${rate}%
  - Monthly P&I: $${monthly.toLocaleString()}

  Provide insights on down payment efficiency, affordability, and interest minimization.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
    }
  });
  return response.text || "Mortgage analysis unavailable.";
};

export const analyzeAmortization = async (totalInterest: number, principal: number): Promise<string> => {
  const prompt = `Analyze this amortization:
  - Total Interest: $${totalInterest.toLocaleString()}
  - Principal: $${principal.toLocaleString()}

  Provide 3 insights on "True Price" of the loan, refinancing impact, and extra payment benefits.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
    }
  });
  return response.text || "Amortization analysis unavailable.";
};

export const analyzeFiveTwoNine = async (age: number, current: number, annual: number, rate: number, years: number, total: number): Promise<string> => {
  const prompt = `Analyze this 529 College Savings Plan:
  - Child's Age: ${age}
  - Current: $${current.toLocaleString()}
  - Annual: $${annual.toLocaleString()}
  - Years: ${years}
  - Value: $${total.toLocaleString()}

  Provide insights on tuition inflation, age-based portfolio shifts, and tax advantages.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      temperature: 0.7,
    }
  });
  return response.text || "529 analysis unavailable.";
};
