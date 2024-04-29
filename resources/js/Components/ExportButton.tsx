import * as XLSX from "xlsx";
import { CSVLink } from "react-csv";
import { UserData } from "../types";

interface UserProfile extends UserData {
    a1: string;
    user_id: number;
}

interface Props {
    usersAll: UserProfile[];
}

const headers = [
    { label: "Nome", key: "name" },
    { label: "Data Nascimento", key: "nascimento" },
    { label: "Sexo", key: "sexo" },
    { label: "WhatsApp", key: "whatsapp" },
    { label: "E-mail", key: "email" },
    { label: "Bairro em que vota", key: "zona_eleitoral" },
    { label: "Cidade em que vota", key: "cidade" },
    { label: "Bairro", key: "bairro" },
    { label: "Maior Preocupação", key: "a1" },
    { label: "Embaixador", key: "user_id" },
    { label: "Data de Cadastro", key: "created_at" }
  ];

export default function ExportButton({ usersAll }: Props) {
    const handleExportXLS = () => {
        const wb = XLSX.utils.book_new();
        const wsData = usersAll.map(user => ({
            "Nome": user.name,
            "E-mail": user.email,
            "WhatsApp": user.whatsapp,
            "Idade": user.idade,
            "Nascimento": user.nascimento,
            "Sexo": user.sexo,
            "Bairro": user.bairro,
            "Cidade": user.cidade,
            "Zona Eleitoral": user.zona_eleitoral,
            "Embaixador": user.user_id,
            "Maior Preocupação": user.a1,
            "Data de Cadastro": user.created_at,
        }));
        const ws = XLSX.utils.json_to_sheet(wsData);
        XLSX.utils.book_append_sheet(wb, ws, "Usuários");
        const wbout: ArrayBuffer = XLSX.write(wb, {
            bookType: "xlsx",
            type: "array",
        });
        XLSX.writeFile(wb, "users.xlsx");
    };

    return (
        <div className="flex justify-end gap-4 mr-10">
            <button
                onClick={handleExportXLS}
                className="bg-blue-500 hover:bg-blue-700 text-12px text-white font-bold py-2 px-4 rounded"
            >
                Export XLS
            </button>
            <CSVLink
                className="bg-blue-500 hover:bg-blue-700 text-12px text-white font-bold py-2 px-4 rounded"
                data={usersAll} headers={headers}
            >
                Export CSV
            </CSVLink>
        </div>
    );
}
