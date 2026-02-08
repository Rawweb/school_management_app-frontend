import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';

const data = [
  { month: 'Jan', value: 20 },
  { month: 'Feb', value: 35 },
  { month: 'Mar', value: 25 },
  { month: 'Apr', value: 40 },
  { month: 'May', value: 55 },
  { month: 'Jun', value: 45 },
];

const PerformanceChart = () => {
  return (
    <div className="bg-surface border border-border rounded-2xl p-6 h-96 flex flex-col w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm">Performance Overview</h3>

        <span className="text-xs text-text-muted">Last 6 months</span>
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            {/* Slim X axis */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }}
            />

            {/* Tooltip only (no grid) */}
            <Tooltip
              cursor={{ fill: 'transparent' }}
              contentStyle={{
                backgroundColor: 'var(--color-surface)',
                borderRadius: 8,
                border: '1px solid var(--color-border)',
                fontSize: 12,
              }}
            />

            {/* Bars */}
            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              barSize={28}
              fill="var(--color-primary)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
