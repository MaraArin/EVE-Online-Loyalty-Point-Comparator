import {
    TableHead,
    TableRow,
    TableCell,
    TableSortLabel,
    TableBody,
    Table,
    TableFooter,
    TablePagination,
} from "@mui/material";
import React from "react";
import { EnrichedOffer } from "./OfferCalculator";

const headCells: readonly HeadCell[] = [
    {
        label: "Faction Name",
        id: "faction_name",
    },
    {
        label: "Corporation Name",
        id: "corporation_name",
    },
    {
        label: "Item Name",
        id: "type_name",
    },
    {
        label: "Market Group",
        id: "market_group",
    },
    {
        label: "LP Cost",
        id: "lp_cost",
    },
    {
        label: "ISK Cost",
        id: "isk_cost",
    },
    {
        label: "Quantity",
        id: "quantity",
    },
    {
        label: "Buy Volume",
        id: "buy_market_volume",
    },
    {
        label: "ISK per LP",
        id: "isk_per_lp",
    },
];

export type Order = "asc" | "desc";

export interface HeadCell {
    id: keyof EnrichedOffer;
    label: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function SortableTable({ data }: { data: EnrichedOffer[] }) {
    const [order, setOrder] = React.useState<Order>("desc");
    const [orderBy, setOrderBy] =
        React.useState<keyof EnrichedOffer>("isk_per_lp");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof EnrichedOffer
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Table>
            <SortableTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
            />
            <SortableTableBody
                data={data}
                page={page}
                rowsPerPage={rowsPerPage}
                order={order}
                orderBy={orderBy}
            />
            <TableFooter>
                <TableRow>
                    <TablePagination
                        count={data.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    );
}

function SortableTableHead({
    order,
    orderBy,
    onRequestSort,
}: {
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof EnrichedOffer
    ) => void;
    order: Order;
    orderBy: string;
}) {
    const createSortHandler =
        (property: keyof EnrichedOffer) =>
        (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function SortableTableBody({
    data,
    page,
    rowsPerPage,
    order,
    orderBy,
}: {
    data: EnrichedOffer[];
    page: number;
    rowsPerPage: number;
    order: Order;
    orderBy: string;
}) {
    return (
        <TableBody>
            {data
                .slice()
                // @ts-ignore complains about types, but I don't want to solve the type puzzle right now
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    return (
                        <TableRow
                            hover
                            key={row.type_id + row.corporation_name}
                        >
                            {headCells.map((headCell) => (
                                <TableCell>{row[headCell.id]}</TableCell>
                            ))}
                        </TableRow>
                    );
                })}
        </TableBody>
    );
}
