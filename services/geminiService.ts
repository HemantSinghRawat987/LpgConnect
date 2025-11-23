import { GoogleGenAI, Type, Schema } from "@google/genai";
import { InventoryItem, CustomerAsset } from '../types';

const getAI = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API Key is missing");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

export const predictInventoryDemand = async (
    currentStock: InventoryItem[],
    historicalSales: any[]
): Promise<string> => {
    const ai = getAI();
    if (!ai) return "AI Service Unavailable (Check API Key)";

    const prompt = `
    You are an expert supply chain analyst for an LPG distribution agency.
    
    Current Inventory Data:
    ${JSON.stringify(currentStock.reduce((acc: any, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
    }, {}))}

    Historical Sales Trend (Last 7 days):
    ${JSON.stringify(historicalSales)}

    Task:
    1. Analyze the consumption pattern.
    2. Predict the demand for the next 3 days.
    3. Suggest specifically how many new cylinders of each type need to be ordered from the bottling plant to avoid stockouts.
    4. Keep the tone professional and actionable.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "Provide concise, data-driven inventory advice.",
                temperature: 0.2,
            }
        });
        return response.text || "Unable to generate prediction.";
    } catch (error) {
        console.error("Gemini Prediction Error:", error);
        return "Error generating demand prediction.";
    }
};

export const analyzeIdleAssets = async (customers: CustomerAsset[]): Promise<string> => {
    const ai = getAI();
    if (!ai) return "AI Service Unavailable";

    // Filter for potential idle assets (simplification for prompt)
    const longHoldingCustomers = customers.filter(c => {
        const lastRefill = new Date(c.lastRefillDate);
        const daysDiff = (new Date().getTime() - lastRefill.getTime()) / (1000 * 3600 * 24);
        return daysDiff > 45;
    });

    const prompt = `
    Analyze these customers who have held LPG cylinders for more than 45 days without a refill. This indicates potential "Invisible Inventory" or hoarding.
    
    Customers: ${JSON.stringify(longHoldingCustomers.map(c => ({ name: c.name, daysSinceRefill: Math.floor((new Date().getTime() - new Date(c.lastRefillDate).getTime()) / (1000 * 3600 * 24)) })))}

    Task:
    1. Identify the risk level of lost assets.
    2. Draft a polite but firm SMS message template that the distributor can send to these customers to request a status check or return of empty cylinders.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "No analysis available.";
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        return "Error analyzing idle assets.";
    }
};

export const getSafetyAdvice = async (question: string): Promise<string> => {
     const ai = getAI();
    if (!ai) return "AI Service Unavailable";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: question,
            config: {
                systemInstruction: "You are a safety expert for LPG (Liquefied Petroleum Gas). Answer questions about cylinder expiration, regulator safety, and leak detection. Keep answers short and easy to understand for rural customers.",
            }
        });
        return response.text || "I couldn't understand that.";
    } catch (error) {
        return "Sorry, I can't answer that right now.";
    }
}
