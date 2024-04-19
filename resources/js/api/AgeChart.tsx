import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { UserData } from "@/types";

Chart.register(ArcElement);

interface LegendProps {
    labels: string[];
    backgroundColors: string[];
}

interface Props {
    users: UserData[];
}

export const AgeChart: React.FC<Props> = ({ users }) => {
    const faixasEtarias = categorizarPorFaixaEtaria(users);

    const chartData = {
        labels: Object.keys(faixasEtarias),
        datasets: [
            {
                label: "Usuários",
                data: Object.values(faixasEtarias),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
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
                <span className="p-3 text-custom-gray2 text-16px">Idade</span>
                <Pie className="max-h-[160px] max-w-[160px]" data={chartData} options={options} />
            </div>
            <div className="bg-white h-[292px] w-[139px] flex flex-col items-center overflow-y-auto overflow-x-auto">
                <div className="p-4 text-custom-gray2 text-14px">Legenda</div>
                <AgeLegend
                    labels={chartData.labels}
                    backgroundColors={chartData.datasets[0].backgroundColor}
                />
            </div>
        </div>
    );
};

const categorizarPorFaixaEtaria = (users: UserData[]) => {
    const faixasEtarias: { [key: string]: number } = {
        "18-30 anos": 0,
        "31-40 anos": 0,
        "41-50 anos": 0,
        "51-60 anos": 0,
        "60+": 0,
    };

    users.forEach((user) => {
        const idade = user.idade;
        if (idade >= 18 && idade <= 30) {
            faixasEtarias["18-30 anos"]++;
        } else if (idade >= 31 && idade <= 40) {
            faixasEtarias["31-40 anos"]++;
        } else if (idade >= 41 && idade <= 50) {
            faixasEtarias["41-50 anos"]++;
        } else if (idade >= 51 && idade <= 60) {
            faixasEtarias["51-60 anos"]++;
        } else {
            faixasEtarias["60+"]++;
        }
    });

    return faixasEtarias;
};

export const AgeLegend: React.FC<LegendProps> = ({
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
