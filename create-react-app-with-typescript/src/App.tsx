import * as React from "react";
import { useOfferCalculator } from "./components/OfferCalculator";
import { SortableTable } from "./components/OfferTable";
import { Container, Stack, Typography } from "@mui/material";

export default function BasicStack() {
    return (
        <Container maxWidth="xl">
            <Stack spacing={5}>
                <Typography variant="h1" align="center">
                    Arin's Super Duper LP Comparator
                </Typography>
                <Typography>
                    Select your corporation, to see what ratio of isk to lp you
                    can get with your corporation's LP. No warranty is given for
                    any purpose. Any figures here are merely a guide and should
                    be treated with appropriate caution, ideally being checked
                    before you blow all your LP buying something that's been
                    manipulated. No, the Zainou 'Gypsy' Weapon Disruption WD-903
                    is not worth 36,000 ISK per LP. Best thing I'd suggest? Look
                    at the jita volume column for a high value. High numbers
                    here are less likely to be manipulated values. All the
                    blueprints assume that you have production efficiency 5. If
                    you don't, they will not be as profitable, as an extra 25%
                    or so materials will be required. Prices are as per a
                    simulated 5% buy from the Jita market. The (jita buy) option
                    uses Jita sell prices for all the components, but the price
                    for the final item is the buy price. (In case you just want
                    to dump it). Keep an eye on the volume, to see if the market
                    can easily absorb the number you're thinking about, if you
                    don't want to sell them yourself. Prices can be manipulated,
                    so watch out for that. You can now pick the region you want
                    to see prices from. Completeness of price data is not
                    guaranteed. There's a reason people use Jita
                </Typography>
                <Blubla />
            </Stack>
        </Container>
    );
}

function Blubla() {
    const { enrichedLoyaltyOffers, marketData, isLoading, isCalculating } =
        useOfferCalculator();

    return <SortableTable data={enrichedLoyaltyOffers} />;
}
