import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import RankingComponent from "../Components/RankingComponent";
import AreaComponent from "../Components/AreaComponent";
import { Count, RankUserData, PageProps } from "../types";

interface Props extends PageProps {
    rank: RankUserData[];
    groupedBairros: Count[];
}

export default function Ranking({ auth, rank, groupedBairros }: Props) {
    const maxItems: number = 10;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-18px sm:text-22px ml-5 lg:ml-60 mt-5 sm:mt-1 font-medium leading-30px text-gray-700 font-montserrat">
                    Rankings
                </h2>
            }
        >
            <Head title="Ranking" />
            <div className="h-auto w-full flex flex-wrap sm:px-5">
                <RankingComponent rank={rank} />
                <AreaComponent bairros={groupedBairros} maxItems={maxItems} />
            </div>
        </AuthenticatedLayout>
    );
}
