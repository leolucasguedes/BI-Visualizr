import { TableColumn } from 'react-data-table-component';
import { UserData } from '../types';
import { FaEye } from "react-icons/fa";
import { Link } from '@inertiajs/react';

interface RankUserData extends UserData {
    id: number;
    user_id: number;
    indications: number;
}

export const columns: TableColumn<any>[] = [
	{
		name: 'Posição',
		cell: (row, index) => `${index + 1}°`,
        width: '125px',
	},
	{
		name: 'Nome',
		selector: row => row.name,
	},
	{
		name: 'Bairro',
		selector: row => row.bairro,
	},
    {
		name: 'Cidade',
		selector: row => row.cidade,
	},
    {
		name: 'E-mail',
		selector: row => row.email,
        width: '300px',
	},
    {
		name: 'WhatsApp',
		selector: row => row.whatsapp,
	},
    {
        name: 'Indicações',
        cell: (row) => row.indications,
        width: '125px',
    },
    {
        name: '',
        cell: (row) => (
            <Link href={`/usuario/${row.id}`}>
                <FaEye style={{ cursor: 'pointer' }} />
            </Link>
        ),
        width: '15px',
    },
];

export const conditionalRowStyles: any[] = [
    {
        when: (row: any, index: any) => index % 2 === 0,
        style: {
            backgroundColor: '#f8f8f8',
        },
    },
    {
        when: (row: any, index: any) => index % 2 !== 0,
        style: {
            backgroundColor: '#ffffff',
        },
    },
];

export const customStyles = {
	rows: {
		style: {
			fontSize: '16px'
		},
	},
	headCells: {
		style: {
            fontSize: '18px',
			fontWeight: 'bold',
		},
	},
	cells: {
		style: {
			paddingLeft: '20px',
		},
	},
};
