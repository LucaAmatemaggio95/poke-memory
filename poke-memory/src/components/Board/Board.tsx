import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Choice, Pokemon } from "../../models/models";
import { randomNumber } from "../../utils";
import PokemonCard from "./PokemonCard/PokemonCard";

const Board = () => {
  const [initialArray, setInitialArray] = useState<Pokemon[]>([]);

  const [choice, setChoice] = useState<Choice>({
    previous: null,
    current: null,
  });

  const [showWin, setShowWin] = useState<boolean>(false);

  const [score, setScore] = useState<number>(0);

  const getCount = () => {
    return axios
      .get("https://pokeapi.co/api/v2/pokemon-species?limit=0")
      .then((res: { data: any }) => res.data)
      .catch((err: any) => console.log(err));
  };

  const getPokemon = (pkmn_id: number) => {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pkmn_id}`)
      .then((res: { data: any }) => res.data)
      .catch((err: any) => console.log(err));
  };

  const getPkmns = useCallback(async () => {
    const count = await getCount().then((res: { count: any }) => res.count);

    let first_set = [];

    for (let index = 0; index < 4; index++) {
      const random_id = randomNumber(1, count);

      const pkmn_info = await getPokemon(random_id).then((res: any) => res);

      first_set.push(pkmn_info);
      first_set.push(pkmn_info);
    }

    const final_set: Pokemon[] = [...first_set].map((pkmn) => {
      return {
        name: pkmn.name,
        showing: false,
        found: false,
        image: pkmn.sprites.front_default,
        order_num: randomNumber(1, count),
      };
    });

    const sorted = [...final_set].sort((a, b) =>
      a.order_num > b.order_num ? 1 : -1
    );

    setInitialArray(sorted);
  }, []);

  const ShowCardClickHandler = (order_num: number): void => {
    const pkmn_selected = initialArray
      .filter((pkmn) => pkmn.order_num === order_num)
      .pop();

    const array_updated = initialArray.map((pkmn) => {
      return {
        ...pkmn,
        showing: pkmn.order_num === order_num ? true : pkmn.showing,
      };
    });

    setInitialArray(array_updated);

    if (!choice.previous) {
      setChoice({ ...choice, previous: pkmn_selected!.name });
    } else {
      setChoice({ ...choice, current: pkmn_selected!.name });
    }

    setScore((s) => s + 1);
  };

  const StartNewGameClickHandler = () => {
    setChoice({ ...choice, previous: null, current: null });

    setShowWin(false);

    setScore(0);

    getPkmns();
  };

  useEffect(() => {
    getPkmns();

    return () => {};
  }, [getPkmns]);

  useEffect(() => {
    const { previous, current } = choice;

    if (previous && current) {
      if (previous === current) {
        const array_updated: Pokemon[] = initialArray.map((pkmn) => {
          return {
            ...pkmn,
            found: pkmn.name === current ? true : pkmn.found,
          };
        });

        setInitialArray(array_updated);

        setChoice({ ...choice, previous: null, current: null });
      } else {
        setTimeout(() => {
          const array_updated: Pokemon[] = initialArray.map((pkmn) => {
            return {
              ...pkmn,
              showing:
                pkmn.name === previous || pkmn.name === current
                  ? false
                  : pkmn.showing,
            };
          });

          setInitialArray(array_updated);

          setChoice({ ...choice, previous: null, current: null });
        }, 750);
      }
    }
  }, [choice, initialArray]);

  useEffect(() => {
    if (initialArray.length > 0) {
      const missing = initialArray.filter((pkmn) => !pkmn.found).length;

      if (missing === 0) {
        setShowWin(true);
      }
    }
  }, [initialArray]);

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <>
      <Box mt={2}>
        <Grid container spacing={2}>
          {initialArray.map((pkmn) => (
            <Grid item xs={6} md={3} key={pkmn.order_num}>
              <PokemonCard ShowCard={ShowCardClickHandler} pokemon={pkmn} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={showWin}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle color="primary" sx={{ textAlign: "center" }}>
          You win!
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" align={"center"}>
            Score: {100 - score}
          </Typography>
          <Box display={"flex"} justifyContent={"center"} mt={3}>
            <Button
              variant={"contained"}
              color="primary"
              onClick={StartNewGameClickHandler}
            >
              Play again
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Board;
