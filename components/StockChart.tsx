import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface DataPoint {
    name: string;
    filled: number;
    empty: number;
    defective: number;
}

interface StockChartProps {
    data: DataPoint[];
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" tick={{fontSize: 12}} />
                    <YAxis tick={{fontSize: 12}} />
                    <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px'}} />
                    <Bar dataKey="filled" name="Filled (Ready)" fill="#16a34a" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="empty" name="Empty (Return)" fill="#ea580c" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="defective" name="Defective/Expired" fill="#dc2626" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StockChart;