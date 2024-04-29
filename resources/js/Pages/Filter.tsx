import { useState } from "react";
import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { AreaChart, AgeChart, GenderChart } from "../api";
import { Link } from "@inertiajs/react";
import { UserData, PageProps } from "../types";
import { IoPersonSharp } from "react-icons/io5";

interface Props extends PageProps {
    usersAll: UserProfile[];
}

interface UserProfile extends UserData {
    a1: string;
    user_id: number;
}

export default function Filter({ auth, usersAll }: Props) {
    const [filters, setFilters] = useState({
        idade: "",
        sexo: "",
        bairro: "",
        preocupacao: "",
    });

    const userADM = auth.user.is_admin;
    const is_admin = isAdm(userADM);
    const authId = auth.user.id;

    function isAdm(userADM: number): boolean {
        if (userADM === 1) {
            return true;
        } else {
            return false;
        }
    }

    function filterUsers(usersAll: UserProfile[], authId: number) {
        return usersAll.filter((user) => user.user_id === authId);
    }

    const usersFiltered = is_admin ? usersAll : filterUsers(usersAll, authId);

    function getRegion(users: UserProfile[]): string[] {
        let region: { [key: string]: boolean } = {};

        users.forEach((user: UserProfile) => {
            if (typeof user.bairro === "string" && user.bairro.trim() !== "") {
                const bairroTrue = user.bairro.toLowerCase().trim();
                region[bairroTrue] = true;
            }
        });

        return Object.keys(region);
    }

    const regions = getRegion(usersFiltered);

    const ageRanges = [
        "18-30 anos",
        "31-40 anos",
        "41-50 anos",
        "51-60 anos",
        "60+",
    ];

    const preocupacoes = [
        "Qualidade educação",
        "Falta de creches",
        "Falta de segurança",
        "Saúde precária",
        "Transporte insuficiente",
        "Saneamento básico",
        "Falta de iluminação",
        "Asfalto ruim",
        "Falta de água",
        "Cultura e Lazer",
    ];

    const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);

    const applyFilters = (usersFiltered: UserProfile[]) => {
        const filtered = usersFiltered.filter((user) => {
            const idadeMatch =
                !filters.idade ||
                (filters.idade.includes("+") &&
                    user.idade >= parseInt(filters.idade)) ||
                (filters.idade.includes("-") &&
                    user.idade >= parseInt(filters.idade.split("-")[0]) &&
                    user.idade <= parseInt(filters.idade.split("-")[1]));
            const sexoMatch = !filters.sexo || user.sexo === filters.sexo;
            const bairroMatch =
                !filters.bairro ||
                user.bairro?.toLowerCase().trim() === filters.bairro;
            const preocupacaoMatch =
                !filters.preocupacao || user.a1 === filters.preocupacao;

            return idadeMatch && sexoMatch && bairroMatch && preocupacaoMatch;
        });

        setFilteredUsers(filtered);
    };

    const isEven = (index: number) => index % 2 === 0;

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Filter" />

            <div className="h-auto w-full flex flex-col sm:px-5 pb-5">
                <div className="w-full flex flex-wrap gap-5 pt-10">
                    <div className="bg-white h-[292px] w-[213px] flex flex-col gap-2 font-montserrat ml-20 sm:ml-0">
                        <span className="pt-2 pl-5 text-custom-gray2 font-bold text-16px">
                            Filtrar por:
                        </span>
                        <hr className="border-t-1 border-gray-200" />
                        <div className="flex">
                            <span className="text-custom-gray2 pt-2 pl-5 text-16px">
                                Idade
                            </span>
                            <select
                                className="w-[120px] h-[35px] rounded-lg ml-8 border-none"
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
                            <span className="text-custom-gray2 pt-2 pl-5 text-16px">
                                Sexo
                            </span>
                            <select
                                className="w-[120px] h-[35px] rounded-lg ml-10 border-none"
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
                            <span className="text-custom-gray2 pt-2 pl-5 text-16px">
                                Bairro
                            </span>
                            <select
                                className="w-[120px] h-[35px] rounded-lg ml-8 border-none"
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
                        <div className="flex">
                            <span className="text-custom-gray2 pt-2 pl-5 text-12px">
                                Maior Preocupação
                            </span>
                            <select
                                className="w-[120px] h-[35px] rounded-lg border-none"
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        preocupacao: e.target.value,
                                    })
                                }
                            >
                                <option value="">Todas</option>
                                {preocupacoes.map((preocupacao) => (
                                    <option
                                        key={preocupacao}
                                        value={preocupacao}
                                    >
                                        {preocupacao}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="pl-5 mt-2">
                            <button
                                className="h-[27.29px] w-[171px] text-14px font-montserrat bg-custom-green text-white rounded-lg"
                                onClick={() => applyFilters(usersFiltered)}
                            >
                                Aplicar Filtros
                            </button>
                        </div>
                    </div>

                    <AreaChart
                        users={
                            filteredUsers.length === 0
                                ? usersFiltered
                                : filteredUsers
                        }
                    />
                    <GenderChart
                        users={
                            filteredUsers.length === 0
                                ? usersFiltered
                                : filteredUsers
                        }
                    />
                    <AgeChart
                        users={
                            filteredUsers.length === 0
                                ? usersFiltered
                                : filteredUsers
                        }
                    />
                </div>
                <div className="w-full text-center md:text-left mt-8 bg-white lg:px-6 pb-10 rounded-xl">
                    <h1 className="text-22px mx-12 font-bold mb-4 py-6 font-montserrat">
                        Resultados - {filteredUsers.length}
                    </h1>
                    <div className="w-full flex items-center font-montserrat gap-16 pl-12 py-2 mb-1">
                        <div
                            className="truncate font-bold"
                            style={{ width: "100px" }}
                        >
                            Nome
                        </div>
                        <div
                            className="hidden sm:block font-bold"
                            style={{ width: "25px" }}
                        >
                            Idade
                        </div>
                        <div
                            className="hidden md:block font-bold"
                            style={{ width: "80px" }}
                        >
                            Sexo
                        </div>
                        <div
                            className="hidden md:block font-bold"
                            style={{ width: "200px" }}
                        >
                            Email
                        </div>
                        <div
                            className="truncate font-bold"
                            style={{ width: "150px" }}
                        >
                            Bairro
                        </div>
                        <div
                            className="hidden sm:block font-bold"
                            style={{ width: "120px" }}
                        >
                            Whatsapp
                        </div>
                        <div
                            className="hidden sm:block font-bold"
                            style={{ width: "160px" }}
                        >
                            Maior Preocupação
                        </div>
                    </div>

                    {filteredUsers.length === 0 ? (
                        <p className="ml-12 mt-8">Nenhum usuário encontrado</p>
                    ) : (
                        filteredUsers.map(
                            (user: UserProfile, index: number) => (
                                <Link href={`/usuario/${user.id}`}>
                                    <li
                                        key={index}
                                        className={`w-full flex items-center font-montserrat gap-16 pl-12 py-2 mb-1 relative ${
                                            isEven(index)
                                                ? "bg-list-gray"
                                                : "bg-white"
                                        }`}
                                        style={{ maxWidth: "100%" }}
                                    >
                                        <IoPersonSharp className="absolute top-3 left-4" />
                                        <div
                                            className="truncate"
                                            style={{ width: "100px" }}
                                        >
                                            {user.name}
                                        </div>
                                        <div
                                            className="hidden sm:block truncate"
                                            style={{ width: "30px" }}
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
                                            style={{ width: "200px" }}
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
                                        <div
                                            className="hidden sm:block truncate"
                                            style={{ width: "160px" }}
                                        >
                                            {user.a1}
                                        </div>
                                    </li>
                                </Link>
                            )
                        )
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
