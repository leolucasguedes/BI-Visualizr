import React, { useEffect, useState } from "react";
import Chart, { ChartOptions, TickOptions, ArcElement } from "chart.js/auto";
import { UserData } from "../types";
import { format, startOfWeek, endOfWeek } from "date-fns";
Chart.register(ArcElement);

interface Props {
    usersAll: UserData[];
}

export const WeeklyContactGraph: React.FC<Props> = ({ usersAll }) => {
    const [weeklyData, setWeeklyData] = useState<number[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const weeklyCounts = await getWeeklyCounts(usersAll);
                setWeeklyData(weeklyCounts);
            } catch (error) {
                console.error("Erro ao buscar dados dos usuários:", error);
            }
        };

        fetchData();
    }, [usersAll]);

    useEffect(() => {
        if (weeklyData.length > 0) {
            renderChart();
        }
    }, [weeklyData]);

    const getWeeklyCounts = (userData: UserData[]): number[] => {
        const currentDate = new Date();
        const firstDayOfWeek = startOfWeek(currentDate);
        const lastDayOfWeek = endOfWeek(currentDate);

        const weeklyCounts: number[] = [];

        for (let i = 4; i >= 0; i--) {
            const startDate = new Date(firstDayOfWeek);
            startDate.setDate(startDate.getDate() - i * 7);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 6);

            const count = userData.filter((user) => {
                const userCreatedAt = new Date(user.created_at);
                return userCreatedAt >= startDate && userCreatedAt <= endDate;
            }).length;

            weeklyCounts.push(count);
        }

        return weeklyCounts;
    };

    const renderChart = () => {
        const ctx = document.getElementById(
            "weeklyContactGraph"
        ) as HTMLCanvasElement;

        const lastWeeksLabels = getLastWeeksLabels(5);
        const currentWeekLabel = getCurrentWeekLabel();

        new Chart(ctx, {
            type: "line",
            data: {
                labels: [...lastWeeksLabels, currentWeekLabel],
                datasets: [
                    {
                        label: "Contatos Semanais",
                        data: weeklyData,
                        backgroundColor: "rgb(75, 192, 192)",
                        tension: 0.1,
                    },
                    {
                        label: "Evolução Lideranças",
                        data: weeklyData,
                        backgroundColor: "rgba(53, 205, 58, 1)",
                        tension: 0.1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 2,
                            max: 14,
                        } as Partial<TickOptions>,
                    },
                },
            } as ChartOptions,
        });
    };

    const getLastWeeksLabels = (numberOfWeeks: number): string[] => {
        const labels: string[] = [];

        for (let i = numberOfWeeks - 1; i > 0; i--) {
            const endDate = new Date();
            const startDate = new Date(endDate);
            startDate.setDate(startDate.getDate() - (i * 7));
            endDate.setDate(endDate.getDate() - ((i - 1) * 7) - 1);
            const label = `${format(startDate, "dd/MM/yyyy")} - ${format(
                endDate,
                "dd/MM/yyyy"
            )}`;
            labels.push(label);
        }

        return labels;
    };

    const getCurrentWeekLabel = (): string => {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 7);
        return `${format(startDate, "dd/MM/yyyy")} - ${format(
            endDate,
            "dd/MM/yyyy"
        )}`;
    };

    return <canvas id="weeklyContactGraph" />;
};

export default WeeklyContactGraph;
