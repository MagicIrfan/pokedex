import React, {ReactElement, useEffect, useState} from "react";
import {PokemonEvolutionChain} from "../models/PokemonEvolutionChain";
import {Image} from "./Image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";

interface EvolutionStepProps {
    evolution: PokemonEvolutionChain;
}

const EvolutionStep: React.FC<EvolutionStepProps> = ({ evolution }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: "space-evenly"
    }}>
        <div className="evolution-method">
            <FontAwesomeIcon style={{fontSize: '30px'}} icon={faArrowRight} />
        </div>
        <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolution.pokemon.id}.png`}
            width={200} height={200}
        />
    </div>
);

// Définition de l'interface pour les props de EvolutionSpecie
interface EvolutionSpecieProps {
    evolutions : PokemonEvolutionChain;
}

// Fonction pour générer les composants d'évolution
const generateEvolutionComponents = (evolutions: PokemonEvolutionChain[]) => {
    const finalComponents : JSX.Element[] = [];
    const firstStageComponents : JSX.Element[] = [];
    const secondStageComponents : JSX.Element[] = [];
    const generateEvolutionStageComponent = (components : JSX.Element[], key:number) => {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 'inherit',
                justifyContent: 'space-between'
            }}
            key={key}>
                {components}
            </div>
        );
    }
    evolutions.forEach((evolution: PokemonEvolutionChain, index:number) : void => {
        firstStageComponents.push(<EvolutionStep key={index} evolution={evolution}/>);
        evolution.evolvesTo.forEach((evolution2: PokemonEvolutionChain, Jindex:number) : void => {
            secondStageComponents.push(<EvolutionStep key={Jindex} evolution={evolution2}/>);
        });
    });
    finalComponents.push(generateEvolutionStageComponent(firstStageComponents,1));
    if(secondStageComponents.length){
        finalComponents.push(generateEvolutionStageComponent(secondStageComponents,2));
    }
    return finalComponents;
};

export const EvolutionSpecie: React.FC<EvolutionSpecieProps> = ({ evolutions }) => {
    const [evolveComponents, setEvolveComponents] = useState<React.ReactNode>(null);

    useEffect(() => {
        const components = generateEvolutionComponents(evolutions.evolvesTo);
        const finalComponent = (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between'
            }}>
                {components}
            </div>
        );
        setEvolveComponents(finalComponent);
    }, [evolutions.evolvesTo]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: 'fit-content',
            margin:'0 auto',
            justifyContent: 'space-between'
        }}>
            <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolutions.pokemon.id}.png`}
                width={200} height={200}
            />
            {evolveComponents}
        </div>
    );
};