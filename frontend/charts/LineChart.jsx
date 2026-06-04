import Chart from "react-apexcharts";
import { useState } from "react";
const LineChart = ({scores, categories}) => {

    console.log(scores);
    console.log(categories);

    const [state, setState] = useState({
        options: {
          chart: {
            id: "line-chart"
          },
          colors: ["#ec4899"],
          xaxis: {
            categories: categories
        },
        title: {
        text: 'Score Progression Across Quizzes',
        align: 'left',
      },
        },
        series: [{
          name: "Score",
          data: scores
        }],
      
      });

    return(
        <>
        <div className="bg-white h-full w-full p-4 rounded-4xl">
            <Chart options={state.options} series={state.series} type="line" height={350} width="100%"/>
        </div>
        </>
    )
}
export default LineChart;