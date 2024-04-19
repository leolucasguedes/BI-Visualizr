import { useState } from "react";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { columns, conditionalRowStyles, customStyles } from "../api/tableData";
import { LeadListIcon } from "../icon";
import { RankUserData } from "../types";

interface RankDataFull extends RankUserData {
    id: number;
    user_id: number;
    indications: number;
}

interface Props {
    rank: RankUserData[];
}

function RankingComponent({ rank }: Props) {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const itemsPerPage: number = 10;
    const pageSize = 10;
    const rankSort = generateLeaderboard(rank);
    const pageCount: number = Math.ceil(rankSort.length / itemsPerPage);

    function generateLeaderboard(rank: RankUserData[]): RankDataFull[] {
        const leaderCounts: { [userId: number]: number } = {};

        rank.forEach((user) => {
            leaderCounts[user.user_id] = (leaderCounts[user.user_id] || 0) + 1;
        });

        const leaderboard: [number, number][] = Object.entries(
            leaderCounts
        ).map(([userId, count]) => [parseInt(userId), count]);

        leaderboard.sort((a, b) => b[1] - a[1]);

        const rankedUsersWithIndications: RankDataFull[] = leaderboard.map(([userId, _]) => {
            const user = rank.find((user) => user.user_id === userId)!;
            return { ...user, indications: leaderCounts[userId] };
        });

        return rankedUsersWithIndications;
    }

    const paginatedData = rankSort.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
    );

    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="w-full overflow-x-auto text-center mt-8 bg-white pb-10 rounded-xl md:text-left relative">
            <div className="absolute top-8 left-6">
                <LeadListIcon />
            </div>
            <h1 className="text-18px font-bold font-montserrat mb-4 py-6 md:text-22px sm:ml-20">
                Maiores Embaixadores
            </h1>
            <DataTable
                className="sm:px-10"
                columns={columns}
                data={paginatedData}
                conditionalRowStyles={conditionalRowStyles}
                customStyles={customStyles}
            />
            <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                breakLabel="..."
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName="pagination flex justify-center mt-7"
                pageClassName="px-2"
                activeClassName="text-blue-600 font-bold"
                previousClassName="border border-gray-300 px-3 py-1 rounded-lg mr-2"
                nextClassName="border border-gray-300 px-3 py-1 rounded-lg ml-2"
                disabledClassName="opacity-50 cursor-not-allowed"
            />
        </div>
    );
}

export default RankingComponent;
