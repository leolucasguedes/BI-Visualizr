import { TableColumn } from "react-data-table-component";
import { RankUserData } from "../types";
import { FaEye, FaWhatsapp } from "react-icons/fa";
import { Link } from "@inertiajs/react";

interface RankDataFull extends RankUserData {
    indications: number;
    position: number;
}

export const columns: TableColumn<RankDataFull>[] = [
    {
        name: "Posição",
        selector: (row) => `${row.position}°`,
        width: "110px",
    },
    {
        name: "Nome",
        selector: (row) => row.name,
        width: "280px",
    },
    {
        name: "Bairro",
        selector: (row) => row.bairro,
        width: "170px",
    },
    {
		name: 'Cidade',
		selector: row => row.cidade,
        width: '150px',
	},
    {
        name: "E-mail",
        selector: (row) => row.email,
        width: "220px",
    },
    {
        name: "WhatsApp",
        selector: (row) => row.whatsapp,
        width: "175px",
    },
    {
        name: "Indicações",
        cell: (row) => row.indications,
        width: "125px",
    },
    {
        name: "Rede",
        cell: (row) => row.rede,
        width: "75px",
    },
    {
        name: "",
        cell: (row) => (
            <Link href={`/usuario/${row.id}`}>
                <FaEye style={{ cursor: "pointer" }} />
            </Link>
        ),
        width: "25px",
    },
    {
        name: "",
        cell: (row) => (
            <a href={`https://wa.me/${row.whatsapp}`} target="_blank" rel="noopener noreferrer">
                <FaWhatsapp style={{ cursor: "pointer" }} />
            </a>
        ),
        width: "25px",
    },
];

export const conditionalRowStyles: any[] = [
    {
        when: (row: any, index: any) => index % 2 === 0,
        style: {
            backgroundColor: "#f8f8f8",
        },
    },
    {
        when: (row: any, index: any) => index % 2 !== 0,
        style: {
            backgroundColor: "#ffffff",
        },
    },
];

export const mobileColumns: TableColumn<RankDataFull>[] = [
    {
        name: "N°",
        selector: (row) => `${row.position}°`,
        width: "60px",
    },
    {
        name: "Nome",
        selector: (row) => row.name,
        width: "100px",
    },
    {
        name: "Indicações",
        cell: (row) => row.indications,
        width: "75px",
    },
    {
        name: "Rede",
        cell: (row) => row.rede,
        width: "75px",
    },
    {
        name: "",
        cell: (row) => (
            <Link href={`/usuario/${row.id}`}>
                <FaEye style={{ cursor: "pointer" }} />
            </Link>
        ),
        width: "25px",
    },
    {
        name: "",
        cell: (row) => (
            <Link href={`https://wa.me/${row.whatsapp}`}>
                <FaWhatsapp style={{ cursor: "pointer" }} />
            </Link>
        ),
        width: "25px",
    },
];

export const customStyles = {
    rows: {
        style: {
            fontSize: "16px",
        },
    },
    headCells: {
        style: {
            fontSize: "18px",
            fontWeight: "bold",
        },
    },
    cells: {
        style: {
            paddingLeft: "20px",
        },
    },
};
