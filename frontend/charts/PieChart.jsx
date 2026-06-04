import Chart from "react-apexcharts";

const PieChart = ({title, value1, value2, sub1, sub2}) => {

  const series = [Number(value1) || 0, Number(value2) || 0];

  const options = {
    labels: [sub1, sub2],
    colors: ["#1f1f1f","#e9e9e9"],

    plotOptions: {
      pie: {
        donut: {
          size: "50%", // 👈 controls donut thickness
        },
      },
    },

    legend: {
      position: "bottom",
    },
  };

  return (
    <div className="flex flex-col bg-white p-4  rounded-4xl justify-center items-center w-full">
      <h1 className="text-lg text-gray-500 font-bold">{title}</h1>
      <Chart
        options={options}
        series={series}
        type="donut"
        height={350}   // 👈 better than 550 for dashboards
      />
    </div>
  );
};

export default PieChart;