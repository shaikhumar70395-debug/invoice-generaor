"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

type MonthData = {
  label: string;
  billed: number;
  collected: number;
};

type Props = {
  data: MonthData[];
};

export function RevenueChart({ data }: Props) {
  function formatK(n: number) {
    if (n >= 100_000) return `${(n / 100_000).toFixed(1)}L`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return String(Math.round(n));
  }

  return (
    <div className="w-full">
      <div className="w-full h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4318ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4318ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorBilled" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e2e8f0" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#e2e8f0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="label" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={formatK}
              tick={{ fontSize: 11, fill: '#94a3b8' }}
            />
            <Tooltip
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                fontSize: '12px',
                fontWeight: 600
              }}
              itemStyle={{ color: '#0f172a' }}
              formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, '']}
            />
            <Area 
              type="monotone" 
              dataKey="billed" 
              stroke="#cbd5e1" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorBilled)" 
              name="Billed"
            />
            <Area 
              type="monotone" 
              dataKey="collected" 
              stroke="#4318ff" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorCollected)" 
              name="Collected"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4">
        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-300" />
          Billed
        </span>
        <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#4318ff]" />
          Collected
        </span>
      </div>
    </div>
  );
}
