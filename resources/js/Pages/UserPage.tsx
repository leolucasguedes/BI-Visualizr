import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps, UserData } from "../types";
import { Link } from "@inertiajs/react";

interface UserProfile extends UserData {
    a1: string;
}

interface UserAll extends UserData {
    user_id: number;
}

interface Props extends PageProps {
    userDT: UserProfile;
    usersAll: UserAll[];
}

export default function UserPage({ auth, userDT, usersAll }: Props) {
    const relatedUsers = usersAll.filter((user) => user.user_id === userDT.id);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="UserPage" />
            <div className="h-auto w-full flex flex-wrap sm:px-5">
                <div className="w-full bg-white h-auto pb-10 shadow-sm flex flex-col mt-8 overflow-x-auto">
                    <div className="p-4 text-custom-gray2 text-14px">
                        Detalhes do Usuário
                    </div>
                    <div className="pl-10">
                        <p>
                            <strong>Nome:</strong> {userDT.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {userDT.email}
                        </p>
                        <p>
                            <strong>WhatsApp:</strong> {userDT.whatsapp}
                        </p>
                        <p>
                            <strong>Idade:</strong> {userDT.idade}
                        </p>
                        <p>
                            <strong>Nascimento:</strong> {userDT.nascimento}
                        </p>
                        <p>
                            <strong>Gênero:</strong> {userDT.sexo}
                        </p>
                        <p>
                            <strong>Bairro:</strong> {userDT.bairro}
                        </p>
                        <p>
                            <strong>Cidade:</strong> {userDT.cidade}
                        </p>
                        <p>
                            <strong>Bairro em que vota: </strong>
                            {userDT.zona_eleitoral}
                        </p>
                        <p>
                            <strong>Maior Preocupação: </strong>
                            {userDT.a1}
                        </p>
                    </div>
                    <div className="mt-8 px-10">
                        <h2 className="text-custom-gray2 text-14px font-semibold mb-4">
                            Indicações
                        </h2>
                        <ul>
                            {relatedUsers.map((user, index) => (
                                <li key={index}>
                                    <Link href={`/usuario/${user.id}`}>
                                            <li
                                                key={index}
                                                className="w-full flex items-center bg-list-gray font-montserrat gap-8 pl-4 py-2 mb-1"
                                                style={{ maxWidth: "100%" }}
                                            >
                                                <div className="truncate" style={{ width: "100px" }}>{user.name}</div>
                                                <div className="hidden sm:block truncate" style={{ width: "20px" }}>{user.idade}</div>
                                                <div className="hidden md:block truncate" style={{ width: "80px" }}>{user.sexo}</div>
                                                <div className="hidden md:block truncate" style={{ width: "300px" }}>{user.email}</div>
                                                <div className="truncate" style={{ width: "150px" }}>{user.bairro}</div>
                                                <div className="hidden sm:block truncate" style={{ width: "120px" }}>{user.whatsapp}</div>
                                            </li>
                                        </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
