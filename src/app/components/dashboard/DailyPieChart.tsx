'use client';
import { Paper, Stack, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Props {
  title: string;
}

export default function DailyPieChart(props: Props) {
  const { title } = props;
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
    name: string;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
      >
        <tspan x={x} dy="0.4em">{`${name}:`}</tspan>
        <tspan x={x} dy="1.2em">{`${(percent * 100).toFixed(0)}%`}</tspan>
      </text>
    );
  };

  return (
    <Paper style={{ width: '100%' }}>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Typography variant="h6" py={1}>
          {title}
        </Typography>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx={'50%'}
            cy={'50%'}
            labelLine={false}
            // label={({ x, y }) => (
            //   <text x={x} y={y} textAnchor="middle" dominantBaseline="middle">
            //     Daily
            //   </text>
            // )}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </Stack>
    </Paper>
  );
}
