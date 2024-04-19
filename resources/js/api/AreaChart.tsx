import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { UserData } from "@/types";
import { Link } from "@inertiajs/react";

Chart.register(ArcElement);

interface LegendProps {
    labels: string[];
    backgroundColors: string[];
}

interface Props {
    users: UserData[];
}

export const AreaChart: React.FC<Props> = ({ users }) => {
    const bairrosUnicos = [...new Set(users.map((user) => user.bairro))];
    const bairrosValidos = bairrosUnicos.filter(bairro => typeof bairro === 'string' && bairro.trim() !== '');

    const contagemPorBairro: { [key: string]: number } = {};
    users.forEach((user) => {
        contagemPorBairro[user.bairro] =
            (contagemPorBairro[user.bairro] || 0) + 1;
    });

    const chartData = {
        labels: bairrosValidos,
        datasets: [
            {
                label: "Usuários",
                data: bairrosValidos.map((bairro) => contagemPorBairro[bairro]),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                    "rgba(255, 0, 0, 0.5)",
                    "rgba(0, 255, 0, 0.5)",
                    "rgba(0, 0, 255, 0.5)",
                    "rgba(128, 0, 128, 0.5)",
                    "rgba(255, 255, 0, 0.5)",
                    "rgba(0, 255, 255, 0.5)",
                    "rgba(255, 165, 0, 0.5)",
                    "rgba(128, 128, 128, 0.5)",
                    "rgba(0, 128, 0, 0.5)",
                    "rgba(245, 74, 85, 0.5)",
                    "rgba(30, 139, 195, 0.5)",
                    "rgba(240, 173, 78, 0.5)",
                    "rgba(25, 181, 144, 0.5)",
                    "rgba(163, 104, 184, 0.5)",
                    "rgba(255, 204, 92, 0.5)",
                    "rgba(86, 61, 124, 0.5)",
                    "rgba(155, 89, 182, 0.5)",
                    "rgba(249, 105, 14, 0.5)",
                    "rgba(47, 194, 91, 0.5)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 0, 0, 1)",
                    "rgba(0, 255, 0, 1)",
                    "rgba(0, 0, 255, 1)",
                    "rgba(128, 0, 128, 1)",
                    "rgba(255, 255, 0, 1)",
                    "rgba(0, 255, 255, 1)",
                    "rgba(255, 165, 0, 1)",
                    "rgba(128, 128, 128, 1)",
                    "rgba(0, 128, 0, 1)",
                    "rgba(30, 139, 195, 0.5)",
                    "rgba(240, 173, 78, 0.5)",
                    "rgba(25, 181, 144, 0.5)",
                    "rgba(163, 104, 184, 0.5)",
                    "rgba(255, 204, 92, 0.5)",
                    "rgba(86, 61, 124, 0.5)",
                    "rgba(155, 89, 182, 0.5)",
                    "rgba(249, 105, 14, 0.5)",
                    "rgba(47, 194, 91, 0.5)",
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
                <div className="p-3 text-custom-gray2 text-16px">Bairro</div>
                <Pie
                    className="max-h-[160px] max-w-[160px]"
                    data={chartData}
                    options={options}
                />
            </div>
            <div className="bg-white h-[292px] w-[139px] flex flex-col items-center overflow-y-auto overflow-x-auto">
                <div className="py-4 text-custom-gray2 text-14px">Legenda</div>
                <AreaLegend
                    labels={chartData.labels}
                    backgroundColors={chartData.datasets[0].backgroundColor}
                />
            </div>
        </div>
    );
};

export const AreaLegend: React.FC<LegendProps> = ({
    labels,
    backgroundColors,
}) => {
    return (
        <div>
            <ul className="list-none">
                {labels.map((label, index) => (
                    <Link href={`/bairro/${label}`}>
                        <li
                            key={label}
                            className="flex items-center ml-4 mr-1 mb-2 text-10px"
                        >
                            <span
                                className="w-4 h-4 mr-2"
                                style={{
                                    backgroundColor: backgroundColors[index],
                                }}
                            ></span>
                            <span>{label}</span>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );
};
