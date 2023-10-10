import React, { useState, useEffect } from 'react';
import { CartesianGrid, Line, LineChart, ReferenceArea, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import useStore from '../../hooks/useStore';
import { get, post, put } from '../../queries/utils'

export default function Chart() {
  const [chartData, setChartData] = useState([]);
  const currentCreator = useStore(state => state.currentCreator);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await get(`/${currentCreator?.creator_id}/chart/`);
        setChartData(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [currentCreator]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={chartData}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          tickFormatter={str => new Date(str).toLocaleDateString()}
        />

        <YAxis
          domain={[0, 500]}
          tickFormatter={number => '$' + number.toFixed(2)}
        />
        <Line
          dataKey="amount"
          stroke="#8884d8"
          dot={false}
          activeDot={{ r: 8 }}
        />

        <Tooltip
          content={<CustomTooltip active={false} payload={undefined} />}
          wrapperStyle={{
            backgroundColor: 'rgba(0,0,0,0)',
            color: 'white'
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

}

interface TooltipProps {
  active: boolean;
  payload: any;
}

const CustomTooltip: React.FC<TooltipProps> = ({ active, payload }) => {
  if (active && !!payload && payload.length > 0) {
    return (
      <div className='graph-tooltip'>
        <p>{`$${payload[0].payload.amount}`}</p>
      </div>
    )
  }

  return null;
}