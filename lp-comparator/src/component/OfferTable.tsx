import {
  useTable,
  useSortBy,
  Column,
  TableBodyProps,
  TableBodyPropGetter,
  Row,
  Cell,
  HeaderGroup,
} from "react-table";
import styled from "styled-components";

// react-table library's TypeScript types are being updated

export function Table({
  columns,
  data,
}: {
  columns: Array<Column>;
  data: Array<any>;
}) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <table {...getTableProps()}>
      <TableHead headerGroups={headerGroups} />
      <TableBody
        bodyProps={getTableBodyProps}
        rows={rows.slice(0, 1000)}
        prepareRow={prepareRow}
      />
    </table>
  );
}

function TableHead({
  headerGroups,
}: {
  headerGroups: Array<HeaderGroup<object>>;
}) {
  const headerRows = headerGroups.map((headerGroup) => (
    <TableHeaderRow headerGroup={headerGroup} />
  ));
  return <thead>{headerRows}</thead>;
}

function TableHeaderRow({ headerGroup }: { headerGroup: HeaderGroup<object> }) {
  const headers = headerGroup.headers.map((header) => (
    <TableHeader header={header} />
  ));
  return <tr {...headerGroup.getHeaderGroupProps()}>{headers}</tr>;
}

function TableHeader({ header }: { header: HeaderGroup<object> }) {
  return (
    // @ts-ignore
    <th {...header.getHeaderProps(header.getSortByToggleProps())}>
      {header.render("Header")}
      <SortIndicator column={header} />
    </th>
  );
}

function TableBody({
  bodyProps,
  rows,
  prepareRow,
}: {
  bodyProps: (
    propGetter?: TableBodyPropGetter<object> | undefined
  ) => TableBodyProps;
  rows: Row<object>[];
  prepareRow: (row: Row<object>) => void;
}) {
  const tableRow = rows.map((row) => {
    prepareRow(row);
    return <TableDataRow row={row} />;
  });
  return <tbody {...bodyProps()}>{tableRow}</tbody>;
}

function TableDataRow({ row }: { row: Row<object> }) {
  const tableCells = row.cells.map((cell) => {
    return <TableData cell={cell} />;
  });
  return <tr {...row.getRowProps()}>{tableCells}</tr>;
}

function TableData({ cell }: { cell: Cell<object, any> }) {
  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
}

function SortIndicator({ column }: { column: Column }) {
  return (
    <span>
      {
        // @ts-ignore
        column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
      }
    </span>
  );
}

export const offerTableDefinition: Array<Column> = [
  {
    Header: "Faction Name",
    accessor: "faction_name",
  },
  {
    Header: "Corporation Name",
    accessor: "corporation_name",
  },
  {
    Header: "Item Name",
    accessor: "type_name",
  },
  {
    Header: "Market Group",
    accessor: "market_group",
  },
  {
    Header: "LP Cost",
    accessor: "lp_cost",
  },
  {
    Header: "ISK Cost",
    accessor: "isk_cost",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Buy Volume",
    accessor: "buy_market_volume",
    // @ts-ignore
    sortType: "basic",
  },
  {
    Header: "ISK per LP",
    accessor: "isk_per_lp",
    // @ts-ignore
    sortType: "basic",
  },
];

export const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;
/* alt style
table {
border-spacing: 0;
border: 1px solid #ededed;
}
table tr:last-child td {
border-bottom: 0;
}
table th,
table td {
margin: 0;
padding: 0.5rem;
border-bottom: 1px solid #ededed;
border-right: 1px solid #ededed;
position: relative;
}
table th:last-child,
table td:last-child {
border-right: 0;
}
table tr:nth-child(even) {
background-color: #fafafa;
}

table th::before {
position: absolute;
right: 15px;
top: 16px;
content: "";
width: 0;
height: 0;
border-left: 5px solid transparent;
border-right: 5px solid transparent;
}
table th.sort-asc::before {
border-bottom: 5px solid #22543d;
}
table th.sort-desc::before {
border-top: 5px solid #22543d;
}*/
