import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import PokemonCard from './PokemonCard/PokemonCard';
import { Choice, Pokemon } from '../../models/models';
import { randomNumber } from '../../utils';

const Board = () => {

    const [initialArray, setInitialArray] = useState<Pokemon[]>([]);

    const [choice, setChoice] = useState<Choice>({
        previous: null,
        current: null
    });

    const [showWin, setShowWin] = useState<boolean>(false);

    const [score, setScore] = useState<number>(0);

    const getCount = () => {

        return axios.get('https://pokeapi.co/api/v2/pokemon-species?limit=0')
        .then(res => res.data)
        .catch(err => console.log(err));

    }

    const getPokemon = (pkmn_id: number) => {

        return axios.get((`https://pokeapi.co/api/v2/pokemon/${pkmn_id}`))
        .then(res => res.data)
        .catch(err => console.log(err));

    }

    const getPkmns = useCallback( async () => {

        const count = await getCount().then(res => res.count);
        
        let first_set = [];

        for (let index = 0; index < 4; index++) {
            
            const random_id = randomNumber(1, count);

            const pkmn_info = await getPokemon(random_id).then(res => res);
            
            first_set.push(pkmn_info);
            first_set.push(pkmn_info);
            
        }

        const final_set: Pokemon[] = [...first_set].map(pkmn => {
            return {
                name: pkmn.name,
                showing: false,
                found: false,
                image: pkmn.sprites.front_default,
                order_num: randomNumber(1, count)
            }
        });

        const sorted = [...final_set].sort((a, b) => a.order_num > b.order_num ? 1 : -1);

        setInitialArray(sorted)        

    }, []);

    const ShowCardClickHandler = (order_num: number):void => {

        const pkmn_selected = initialArray.filter(pkmn => pkmn.order_num === order_num).pop();

        const array_updated = initialArray.map(pkmn => {
            return {
                ...pkmn,
                showing: pkmn.order_num === order_num ? true : pkmn.showing
            }
        });

        setInitialArray(array_updated);

        if (!choice.previous) {
            setChoice({...choice, previous: pkmn_selected!.name});
        } else {
            setChoice({...choice, current: pkmn_selected!.name});
        }

        setScore(s => s + 1);

    }

    const StartNewGameClickHandler = () => {

        setChoice({...choice, previous: null, current: null});

        setShowWin(false);

        setScore(0);

        getPkmns();

    }

    useEffect( () => {
        
        getPkmns();

        return () => { }

    }, [getPkmns]);

    useEffect(() => {

        const {previous, current} = choice;

        if (previous && current) {

            if (previous === current) {

                const array_updated:Pokemon[] = initialArray.map(pkmn => {
                    return {
                        ...pkmn,
                        found: pkmn.name === current ? true : pkmn.found
                    }
                });

                setInitialArray(array_updated);

                setChoice({...choice, previous: null, current: null});

            } else {

                setTimeout(() => {

                    const array_updated:Pokemon[] = initialArray.map(pkmn => {
                        return {
                            ...pkmn,
                            showing: pkmn.name === previous || pkmn.name === current ? false : pkmn.showing
                        }
                    });
            
                    setInitialArray(array_updated);

                    setChoice({...choice, previous: null, current: null});

                }, 500);

            }

        }

    }, [choice, initialArray]);

    useEffect(() => {

        if (initialArray.length > 0) {
            
            const missing = initialArray.filter(pkmn => !pkmn.found).length;

            if (missing === 0) {
                setShowWin(true);
            }

        }
        
    }, [initialArray]);
    
    return (

        <>
            <Box mt={2}>
                <Grid container spacing={2}>
                    
                    {initialArray.map(pkmn => (

                        <Grid item xs={6} md={3} key={pkmn.order_num}>
                            
                            <PokemonCard
                                ShowCard={ShowCardClickHandler}
                                pokemon={pkmn}
                            />

                        </Grid>

                    ))}

                </Grid>
            </Box>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={showWin}
            >
                <DialogTitle color="secondary" sx={{textAlign: 'center'}}>
                    You win!
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6" align={'center'}>Score: {score}</Typography>
                    <Box display={'flex'} justifyContent={'center'} mt={3}>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={StartNewGameClickHandler}
                        >
                            Play again
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        
        </>

    )
}

export default Board