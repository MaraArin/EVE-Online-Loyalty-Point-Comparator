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

export type Order = "asc" | "desc";

export type stringOrNumber = string | number;

export interface ObjectOfStringOrNumber {
    [index: string]: stringOrNumber;
}

export interface TableDefinition<T> {
    data: T[];
    sortBy: string;
    keyMaker: (a: T) => string;
    headCells: { id: string; label: string }[];
    tableCellMaker?: (a: T) => JSX.Element;
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

export function SortableTable<T extends ObjectOfStringOrNumber>({
    definition,
}: {
    definition: TableDefinition<T>;
}) {
    const [order, setOrder] = React.useState<Order>("desc");
    const [orderBy, setOrderBy] = React.useState(definition.sortBy);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(50);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: string
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
        <Table size="small" padding="none">
            <SortableTableHead
                definition={definition}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
            />
            <SortableTableBody<T>
                definition={definition}
                page={page}
                rowsPerPage={rowsPerPage}
                order={order}
                orderBy={orderBy}
            />
            <TableFooter>
                <TableRow>
                    <TablePagination
                        count={definition.data.length}
                        rowsPerPageOptions={[50, 100, 250, 500]}
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

function SortableTableHead<T>({
    definition,
    order,
    orderBy,
    onRequestSort,
}: {
    definition: TableDefinition<T>;
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    order: Order;
    orderBy: string;
}) {
    const createSortHandler =
        (property: string) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {definition.headCells.map((headCell) => (
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

function SortableTableBody<T extends ObjectOfStringOrNumber>({
    definition,
    page,
    rowsPerPage,
    order,
    orderBy,
}: {
    definition: TableDefinition<T>;
    page: number;
    rowsPerPage: number;
    order: Order;
    orderBy: string;
}) {
    return (
        <TableBody>
            {definition.data
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                    return (
                        <TableRow hover key={definition.keyMaker(row)}>
                            {definition.tableCellMaker
                                ? definition.tableCellMaker(row)
                                : definition.headCells.map((headCell) => (
                                      <TableCell key={headCell.id}>
                                          {row[headCell.id].toLocaleString()}
                                      </TableCell>
                                  ))}
                        </TableRow>
                    );
                })}
        </TableBody>
    );
}
