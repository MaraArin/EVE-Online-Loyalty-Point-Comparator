import * as React from "react";
import { CSVLink } from "react-csv";
import {
    EnrichedOffer,
    useOfferCalculator,
} from "./components/OfferCalculator";
import { SortableTable, TableDefinition } from "./components/SortableTable";
import {
    AppBar,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Link,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    TableCell,
    Toolbar,
    Typography,
} from "@mui/material";
import logo from "./images/agentfinder.png";

export default function App() {
    const { enrichedLoyaltyOffers, marketData, isLoading, isCalculating } =
        useOfferCalculator();

    const definition: TableDefinition<EnrichedOffer> = {
        data: enrichedLoyaltyOffers,
        sortBy: "isk_per_lp",
        keyMaker: keyMaker,
        headCells: headCells,
        tableCellMaker: tableCellMaker,
    };

    return (
        <>
            <TopBar />
            <Container maxWidth="xl">
                <Stack spacing={5}>
                    <Typography></Typography>
                    <Typography>
                        Find the best Loyalty Point offers using the table or{" "}
                        <CSVLink
                            data={enrichedLoyaltyOffers}
                            filename={
                                "edens_loyalty_offers-" +
                                new Date().toLocaleDateString()
                            }
                        >
                            download
                        </CSVLink>{" "}
                        the offers in CSV format.
                    </Typography>
                    <List>
                        <ListItem disableGutters>
                            <ListItemText>
                                Blueprint Loyalty Point offers are not shown.
                            </ListItemText>
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText>
                                Market prices are based on Forge region.
                            </ListItemText>
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText>
                                ISK per LP assumes you bought required items
                                from top 5% sell orders and sold items to top 5%
                                buy orders.
                            </ListItemText>
                        </ListItem>
                    </List>
                    <Paper>
                        {isLoading ? (
                            <div>Loading ...</div>
                        ) : isCalculating ? (
                            <div>Calculating ...</div>
                        ) : (
                            <SortableTable<EnrichedOffer>
                                definition={definition}
                            />
                        )}
                    </Paper>
                </Stack>
            </Container>
        </>
    );
}

function TopBar() {
    return (
        <AppBar position="relative">
            <Toolbar>
                <img src={logo} alt="Eden's Loyalty logo" />
                <List sx={{ flexGrow: 1, padding: 0 }}>
                    <ListItem>
                        <ListItemText
                            primaryTypographyProps={{ color: "#FFBF00" }}
                            primary="Eden's Loyalty"
                            secondary={
                                <>
                                    by{" "}
                                    <Link
                                        href="https://evewho.com/character/2117176366"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        Arin Mara
                                    </Link>
                                </>
                            }
                        ></ListItemText>
                    </ListItem>
                </List>
                <AboutButton />
            </Toolbar>
        </AppBar>
    );
}

function AboutButton() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button onClick={handleClickOpen}>About</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"About"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Eden's Loyalty compares ISK to Loyalty Point ratio of
                        all New Eden's Loyalty Point offers.
                    </DialogContentText>
                    <DialogContentText variant="h6">Contact</DialogContentText>
                    <DialogContentText>
                        ISK donations are most welcome.
                    </DialogContentText>
                    <List>
                        <ListItem>
                            <DialogContentText>
                                Character:{" "}
                                <Link
                                    href="https://evewho.com/character/2117176366"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Arin Mara
                                </Link>
                            </DialogContentText>
                        </ListItem>
                        <ListItem>
                            <DialogContentText>
                                Wiki Page:{" "}
                                <Link
                                    href="https://wiki.eveuniversity.org/User:Arin_Mara"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    User:Arin Mara
                                </Link>
                            </DialogContentText>
                        </ListItem>
                    </List>
                    <DialogContentText variant="h6">
                        CCP Copyright Notice
                    </DialogContentText>
                    <DialogContentText>
                        All EVE related materials are property of{" "}
                        <Link
                            href="https://www.ccpgames.com/"
                            target="_blank"
                            rel="noopener"
                        >
                            CCP Games
                        </Link>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

const headCells = [
    {
        label: "Faction Name",
        id: "faction_name",
    },
    {
        label: "Corporation Name",
        id: "corporation_name",
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
        label: "Item Name",
        id: "type_name",
    },
    {
        label: "Requirements Cost",
        id: "requirements_cost",
    },
    {
        label: "Buy Price",
        id: "buy_price",
    },
    {
        label: "Quantity",
        id: "quantity",
    },
    {
        label: "5% Buy Volume",
        id: "buy_five_percentile_market_volume",
    },
    {
        label: "ISK per LP",
        id: "isk_per_lp",
    },
];

function keyMaker(offer: EnrichedOffer): string {
    return offer.type_id + offer.corporation_name;
}

function tableCellMaker(offer: EnrichedOffer) {
    return (
        <>
            <TableCell key="faction_name">{offer.faction_name}</TableCell>
            <TableCell key="corporation_name">
                {offer.corporation_name}
            </TableCell>
            <TableCell key="market_group">{offer.market_group}</TableCell>
            <TableCell key="lp_cost">
                {offer.lp_cost.toLocaleString()}
            </TableCell>
            <TableCell key="isk_cost">
                {offer.isk_cost.toLocaleString()}
            </TableCell>
            <TableCell key="type_name">
                {
                    <Link
                        href={
                            "https://evemarketer.com/regions/10000002/types/" +
                            offer.type_id +
                            "/buy"
                        }
                        target="_blank"
                        rel="noopener"
                    >
                        {offer.type_name}
                    </Link>
                }
            </TableCell>
            <TableCell key="requirements_cost">
                {offer.requirements_cost.toLocaleString()}
            </TableCell>
            <TableCell key="buy_price">
                {offer.buy_price.toLocaleString()}
            </TableCell>
            <TableCell key="quantity">
                {offer.quantity.toLocaleString()}
            </TableCell>
            <TableCell key="buy_five_percentile_market_volume">
                {offer.buy_five_percentile_market_volume.toLocaleString()}
            </TableCell>
            <TableCell key="isk_per_lp">
                {offer.isk_per_lp.toLocaleString()}
            </TableCell>
        </>
    );
}
