import { useTable, useSortBy } from "react-table";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useOfferCalculator } from "./component/OfferCalculator";
import { offerTableDefinition, Styles, Table } from "./component/OfferTable";

function App() {
  const { loyaltyOffers, marketData, isLoading, isCalculating } =
    useOfferCalculator();

  const columns = React.useMemo(() => offerTableDefinition, [marketData]);
  const data = React.useMemo(() => loyaltyOffers, [marketData]);

  return (
    <>
      {isLoading || isCalculating ? (
        <div>Loading ...</div>
      ) : (
        <Styles>
          <Table columns={columns} data={data} />
        </Styles>
      )}
    </>
  );
}

export default App;
