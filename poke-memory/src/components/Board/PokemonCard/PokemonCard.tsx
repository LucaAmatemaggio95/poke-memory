import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Pokeball from "../../../assets/pokeball.png";
import { Pokemon } from "../../../models/models";

interface Props {
  pokemon: Pokemon;
  ShowCard: (order_num: number) => void;
}

const PokemonCard: React.FC<Props> = ({ pokemon, ShowCard }) => {
  const ShowCardClickHandler = () => {
    ShowCard(pokemon.order_num);
  };

  return (
    <Card>
      <CardActionArea onClick={ShowCardClickHandler}>
        <Box display={"flex"} justifyContent={"center"}>
          <CardMedia
            sx={{ width: "auto" }}
            component="img"
            src={pokemon.showing || pokemon.found ? pokemon.image : Pokeball}
          />
        </Box>
        <CardContent sx={{ padding: "8px" }}>
          <Typography variant="body1" align="center">
            {pokemon.showing || pokemon.found ? pokemon.name : "???"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PokemonCard;
