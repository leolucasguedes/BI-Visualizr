import { useState } from "react";
import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { AreaChart, AgeChart, GenderChart } from "../api";
import { Link } from "@inertiajs/react";
import { UserData, PageProps } from "../types";
import { IoPersonSharp } from "react-icons/io5";

interface Props extends PageProps {
    usersAll: UserData[];
}

export default function Filter({ auth, usersAll }: Props) {
    const [filters, setFilters] = useState({
        idade: "",
        sexo: "",
        bairro: "",
    });
    console.log(filters);

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

    const regions = getRegion(usersAll);

    const ageRanges = [
        "18-30 anos",
        "31-40 anos",
        "41-50 anos",
        "51-60 anos",
        "60+",
    ];

    const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);

    const applyFilters = () => {
        const filtered = usersAll.filter((user) => {
            const idadeMatch =
                !filters.idade ||
                (filters.idade.includes("+") && user.idade >= parseInt(filters.idade)) ||
                (filters.idade.includes("-") &&
                    user.idade >= parseInt(filters.idade.split("-")[0]) &&
                    user.idade <= parseInt(filters.idade.split("-")[1]));
            const sexoMatch = !filters.sexo || user.sexo === filters.sexo;
            const bairroMatch =
                !filters.bairro || user.bairro.toLowerCase() === filters.bairro;

            return idadeMatch && sexoMatch && bairroMatch;
        });

        setFilteredUsers(filtered);
    };

    const isEven = (index: number) => index % 2 === 0;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Filter" />

            <div className="h-auto w-full flex flex-col sm:px-5">
                <div className="w-full flex flex-wrap gap-5 pt-10">
                    <div className="bg-white h-[292px] w-[203px] flex flex-col gap-5 font-montserrat ml-20 sm:ml-0">
                        <span className="pt-3 pl-5 text-custom-gray2 font-bold text-16px">
                            Filtrar por:
                        </span>
                        <hr className="border-t-1 border-gray-200" />
                        <div className="flex">
                            <span className="text-custom-gray2 pl-5 text-16px">
                                Idade
                            </span>
                            <select
                            className="w-[100px] h-[27.29px] rounded-lg ml-8"
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    idade: e.target.value,
                                })
                            }
                        >
                            <option value="">Todas</option>
                            {ageRanges.map((range) => (
                                <option key={range} value={range}>
                                    {range}
                                </option>
                            ))}
                        </select>
                        </div>
                        <div className="flex">
                            <span className="text-custom-gray2 pl-5 text-16px">
                                Sexo
                            </span>
                            <select
                                className="w-[100px] h-[27.29px] rounded-lg ml-10"
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        sexo: e.target.value,
                                    })
                                }
                            >
                                <option value="">Todos</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outros">Outros</option>
                            </select>
                        </div>
                        <div className="flex">
                            <span className="text-custom-gray2 pl-5 text-16px">
                                Bairro
                            </span>
                            <select
                            className="w-[100px] h-[27.29px] rounded-lg ml-8"
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    bairro: e.target.value,
                                })
                            }
                        >
                            <option value="">Todos</option>
                            {regions.map((bairro) => (
                                <option key={bairro} value={bairro}>
                                    {bairro}
                                </option>
                            ))}
                        </select>
                        </div>
                        <div className="pl-5 mt-4">
                            <button
                                className="h-[27.29px] w-[171px] text-14px font-montserrat bg-custom-green text-white rounded-lg"
                                onClick={applyFilters}
                            >
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <AreaChart
                            users={
                                filteredUsers.length === 0
                                    ? usersAll
                                    : filteredUsers
                            }
                        />
                        <GenderChart
                            users={
                                filteredUsers.length === 0
                                    ? usersAll
                                    : filteredUsers
                            }
                        />
                        <AgeChart
                            users={
                                filteredUsers.length === 0
                                    ? usersAll
                                    : filteredUsers
                            }
                        />
                    </div>
                </div>
                <div className="w-full text-center md:text-left mt-8 bg-white lg:px-8 pb-10 rounded-xl">
                    <h1 className="text-22px mx-12 font-bold mb-4 py-6 font-montserrat">
                        Resultados
                    </h1>
                    {filteredUsers.length === 0 ? (
                        <p className="ml-12">Nenhum usuário encontrado</p>
                    ) : (
                        filteredUsers.map((user: UserData, index: number) => (
                            <Link href={`/usuario/${user.id}`}>
                                <li
                                    key={index}
                                    className={`w-full flex items-center font-montserrat gap-16 pl-16 py-2 mb-1 relative ${
                                        isEven(index) ? "bg-list-gray" : "bg-white"
                                    }`}
                                    style={{ maxWidth: "100%" }}
                                >
                                    <IoPersonSharp className="absolute top-3 left-6" />
                                    <div
                                        className="truncate"
                                        style={{ width: "100px" }}
                                    >
                                        {user.name}
                                    </div>
                                    <div
                                        className="hidden sm:block truncate"
                                        style={{ width: "20px" }}
                                    >
                                        {user.idade}
                                    </div>
                                    <div
                                        className="hidden md:block truncate"
                                        style={{ width: "80px" }}
                                    >
                                        {user.sexo}
                                    </div>
                                    <div
                                        className="hidden md:block truncate"
                                        style={{ width: "300px" }}
                                    >
                                        {user.email}
                                    </div>
                                    <div
                                        className="truncate"
                                        style={{ width: "150px" }}
                                    >
                                        {user.bairro}
                                    </div>
                                    <div
                                        className="hidden sm:block truncate"
                                        style={{ width: "120px" }}
                                    >
                                        {user.whatsapp}
                                    </div>
                                </li>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
