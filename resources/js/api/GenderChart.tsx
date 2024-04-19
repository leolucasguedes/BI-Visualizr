import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { UserData } from "../types";

Chart.register(ArcElement);

interface LegendProps {
    labels: string[];
    backgroundColors: string[];
}

interface Props {
    users: UserData[];
}

export const GenderChart: React.FC<Props> = ({ users }) => {
    let maleCount = 0;
    let femaleCount = 0;
    let otherCount = 0;

    users.forEach((user) => {
        const gender = user.sexo ?? "Outros ou Não Informado";
        if (gender === "Masculino") {
            maleCount++;
        } else if (gender === "Feminino") {
            femaleCount++;
        } else {
            otherCount++;
        }
    });

    const chartData = {
        labels: ["Masculino", "Feminino", "Não Informado"],
        datasets: [
            {
                label: "Usuários",
                data: [maleCount, femaleCount, otherCount],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="flex justify-between w-[380px]">
            <div className="bg-white h-[292px] w-[235px] flex flex-col items-center gap-8">
                <span className="p-3 text-custom-gray2 text-16px">Sexo</span>
                <Pie className="max-h-[160px] max-w-[160px]" data={chartData} options={options} />
            </div>
            <div className="bg-white h-[292px] w-[139px] flex flex-col items-center overflow-y-auto overflow-x-auto">
                <div className="py-4 text-custom-gray2 text-14px">Legenda</div>
                <GenderLegend
                    labels={chartData.labels}
                    backgroundColors={chartData.datasets[0].backgroundColor}
                />
            </div>
        </div>
    );
};

export const GenderLegend: React.FC<LegendProps> = ({
    labels,
    backgroundColors,
}) => {
    return (
        <div>
            <ul className="list-none">
                {labels.map((label, index) => (
                    <li key={label} className="flex items-center mx-2 mb-2 text-10px">
                        <span
                            className="w-4 h-4 mr-2"
                            style={{ backgroundColor: backgroundColors[index] }}
                        ></span>
                        <span>{label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
