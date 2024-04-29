import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import ReactPaginate from "react-paginate";
import { columns, mobileColumns, conditionalRowStyles, customStyles } from "../api/tableData";
import { LeadListIcon } from "../icon";
import { RankUserData } from "../types";


interface RankDataFull extends RankUserData {
    indications: number;
    position: number;
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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function generateLeaderboard(rank: RankUserData[]): RankDataFull[] {
        let indications: any = {};

        rank.forEach((rankUser: RankUserData) => {
            if (rankUser.user_id !== null) {
                if (rankUser.user_id in indications) {
                    indications[rankUser.user_id]++;
                } else {
                    indications[rankUser.user_id] = 1;
                }
            }
        });

        let usersIndications: any[] = Object.keys(indications).map(
            (user_id: string) => {
                return {
                    ...rank.find((user) => user.id === parseInt(user_id)),
                    indications: indications[user_id],
                    position: 0,
                };
            }
        );

        usersIndications.sort(
            (a: any, b: any) => b.indications - a.indications
        );

        usersIndications.forEach((usuario: any, index: number) => {
            usuario.position = index + 1;
        });

        return usersIndications;
    }

    const paginatedData = rankSort.slice(
        currentPage * pageSize,
        (currentPage + 1) * pageSize
    );

    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    return (
        <div className="w-full overflow-x-auto mt-8 bg-white pb-10 rounded-xl md:text-left relative">
            <div className="absolute top-8 left-6">
                <LeadListIcon />
            </div>
            <h1 className="text-18px font-bold font-montserrat mb-4 py-6 md:text-22px ml-20">
                Maiores Embaixadores
            </h1>
            <DataTable
                className="sm:px-10"
                columns={isMobile ? mobileColumns : columns}
                data={paginatedData}
                conditionalRowStyles={conditionalRowStyles}
                customStyles={customStyles}
                responsive
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
