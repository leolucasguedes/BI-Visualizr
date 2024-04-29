import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { LeaderIcon, LocalIcon, RegisterIcon } from "../icon";
import { AreaChart, AgeChart, GenderChart, CityChart, WeeklyContactGraph } from "../api";
import { UserData, PageProps } from "../types";
import { Link } from "@inertiajs/react";

interface RankUserData extends UserData {
    user_id: number;
}

interface Props extends PageProps {
    usersAll: RankUserData[];
}

export default function Dashboard({ auth, usersAll }: Props) {
    function countUsers(usersAll: RankUserData[]): number {
        return usersAll.length;
    }

    function countLeaders(usersAll: RankUserData[]): number {
        let indicadores = new Set<number>();

        usersAll.forEach((usuario: any) => {
            if (usuario.user_id !== null) {
                indicadores.add(usuario.user_id);
            }
        });

        return indicadores.size;
    }

    function countUsersWithBairro(users: RankUserData[]): number {
        const count = users.reduce((accumulator: number, user: RankUserData) => {
            if (user.bairro !== null && user.bairro !== undefined) {
                return accumulator + 1;
            } else {
                return accumulator;
            }
        }, 0);

        return count;
    }

    function getRegion(users: UserData[]): string[] {
        let region: { [key: string]: boolean } = {};

        users.forEach((user: UserData) => {
            if (typeof user.bairro === "string" && user.bairro.trim() !== "") {
                const bairroTrue = user.bairro.toLowerCase();
                region[bairroTrue] = true;
            }
        });

        return Object.keys(region);
    }

    const numberOfUsersWithBairro = countUsersWithBairro(usersAll);
    const leaders = countLeaders(usersAll);
    const numberOfUsers = countUsers(usersAll);
    const allRegions = getRegion(usersAll);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-18px sm:text-22px ml-5 lg:ml-[225px] mt-5 sm:mt-1 font-medium leading-30px text-gray-700 font-montserrat">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="h-auto w-full sm:px-5 py-2">
                <div className="h-auto w-full mt-3 flex flex-wrap gap-5">
                    <Link className="bg-custom-blue h-[94px] w-full max-w-[382.5px] shadow-sm rounded-md"
                    href="/usuarios">
                        <div className="sm:p-5 text-16px text-white flex mx-10 font-bold relative font-montserrat pt-5">
                            <div className="text-white mr-7 mt-1">
                                <RegisterIcon />
                            </div>
                            Total de Cadastros
                            <span className="text-18px ml-4 absolute top-11 left-16 sm:left-20 font-montserrat">
                                {numberOfUsers}
                            </span>
                        </div>
                    </Link>
                    <Link
                        className="bg-custom-green h-[94px] w-full shadow-sm rounded-md max-w-[382.5px]"
                        href="/ranking"
                    >
                        <div className="sm:p-5 text-16px text-white flex mx-10 font-bold relative font-montserrat pt-5">
                            <div className="text-white mr-5 mt-1">
                                <LeaderIcon />
                            </div>
                            Lideranças
                            <span className="text-18px ml-3 absolute top-11 left-[71px] sm:left-20 font-montserrat">
                                {leaders}
                            </span>
                        </div>
                    </Link>
                    <div className="bg-white h-[94px] w-full shadow-md rounded-md max-w-[765px]">
                        <div className="pt-6 sm:p-6 flex justify-between">
                            <div className="text-gray-500 mt-1 pl-7 flex">
                                <LocalIcon />
                                <span className="text-gray-500 text-14px font-montserrat ml-9">
                                    {numberOfUsersWithBairro} contatos com local
                                    de votação informado
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-wrap gap-4 py-8">
                    <AreaChart users={usersAll} />
                    <GenderChart users={usersAll} />
                    <AgeChart users={usersAll} />
                    <CityChart users={usersAll} />
                </div>
                <div>
                    <div className="py-2">
                        <div className="w-full h-auto flex flex-wrap gap-10">
                            <div className="bg-white h-[264px] w-full overflow-x-auto overflow-y-auto shadow-sm">
                                <div className="p-4 text-custom-gray2 text-14px">
                                    Distribuição por Região
                                </div>
                                <hr className="border-t-1 border-gray-200 mb-3" />
                                <div className="flex flex-col pl-4 gap-1 text-custom-blue">
                                    {allRegions.map((bairro, index) => (
                                        <Link href={`/bairro/${bairro}`}>
                                            <div
                                                key={index}
                                                className="uppercase font-medium font-montserrat"
                                            >
                                                {bairro}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white h-[264px] w-full overflow-x-auto shadow-sm">
                                <div className="p-4 text-custom-gray2 text-14px">
                                    Distribuição por Liderança
                                </div>
                                <hr className="border-t-1 border-gray-200 mb-2" />
                                <p className="text-12px font-thin font-montserrat text-custom-gray2 py-2 px-4">
                                    Planejamento não realizado.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-auto w-full flex flex-col justify-between bg-white shadow-sm py-2 mt-[15px]">
                    <div className="p-4 pl-7 text-custom-gray2 text-14px">
                        Evolução Semanal dos Contatos
                    </div>
                    <WeeklyContactGraph usersAll={usersAll} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
