import React, { memo } from 'react';
import { Doughnut } from 'react-chartjs-2';

const Chart = ({ tableData, handleChange }) => {
  const { categoriesSummary } = tableData;
  const result–°ategoriesSummary = Object.entries(categoriesSummary);

  const result = [];
  result–°ategoriesSummary.map(r => result.push(r[1].value));

  const resultColor = [];
  result–°ategoriesSummary.map(r => resultColor.push(r[1].color));

  return (
    <div className="doughnutSize">
      <Doughnut
        data={{
          datasets: [
            {
              data: result,
              backgroundColor: resultColor,
              hoverOffset: -4,
            },
          ],
        }}
        options={{
          cutout: 90,
          rotation: 180,
          borderWidth: 0,
          plugins: {
            legend: {
              display: false,
            },
          },
          responsive: true,
        }}
      />
    </div>
  );
};

export default memo(Chart);
