"use client";

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Link from "next/link";

const columnHelper = createColumnHelper<any>();

const columns = [
	columnHelper.accessor("target_id", {
		header: "Target id",
		cell: (info) => (
			<Link href={`/moderation/cases/${info.getValue()}`} className="text-blurple">
				{info.getValue()}
			</Link>
		),
	}),
	columnHelper.accessor("target_tag", {
		header: "Username",
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor("case_count", {
		header: "Cases",
		cell: (info) => info.getValue(),
	}),
];

export function CasesTable({ data }: { readonly data: any }) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="p-4">
			<table className="w-full">
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									className="dark:bg-dark-800 bg-light-200 p-4 text-left first:rounded-l-lg last:rounded-r-lg"
								>
									{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className="hover:dark:bg-dark-400 hover:bg-light-700">
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="px-4 py-2 first:rounded-l-lg last:rounded-r-lg">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
				<tfoot>
					{table.getFooterGroups().map((footerGroup) => (
						<tr key={footerGroup.id}>
							{footerGroup.headers.map((header) => (
								<th key={header.id}>
									{header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</tfoot>
			</table>
		</div>
	);
}
