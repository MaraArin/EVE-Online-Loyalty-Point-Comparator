import React from "react";
import { Button } from "./component/button";
import { useOfferCalculator } from "./component/OfferCalculator";
import { offerTableDefinition, Styles, Table } from "./component/OfferTable";

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
                    <Styles>
                        <Table columns={columns} data={data} />
                    </Styles>
                </>
            )}
        </>
    );
}

export default App;
