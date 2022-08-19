import React from "react";
import { CSVLink, CSVDownload } from "react-csv";
import { useOfferCalculator } from "./component/OfferCalculator";
import { offerTableDefinition, Styles, Table } from "./component/OfferTable";

interface ButtonProps {
    type: string;
    value: string;
    onClick: React.MouseEventHandler<HTMLInputElement>;
}

export function Button({ type, value, onClick }: ButtonProps) {
    return <input type={type} value={value} onClick={onClick} />;
}

function App() {
    const {
        enrichedLoyaltyOffers,
        marketData,
        isLoading,
        isCalculating,
        setFetchedTimestamp,
    } = useOfferCalculator();

    const columns = React.useMemo(() => offerTableDefinition, []);
    const data = React.useMemo(() => enrichedLoyaltyOffers, [marketData]);

    return (
        <>
            {isLoading ? (
                <div>Loading ...</div>
            ) : isCalculating ? (
                <div>Calculating ...</div>
            ) : (
                <>
                    <Button
                        type="button"
                        value="Refresh table"
                        onClick={() =>
                            setFetchedTimestamp(new Date().toString())
                        }
                    />
                    <CSVLink data={enrichedLoyaltyOffers}>Download me</CSVLink>
                    <Styles>
                        <Table columns={columns} data={data} />
                    </Styles>
                </>
            )}
        </>
    );
}

export default App;
