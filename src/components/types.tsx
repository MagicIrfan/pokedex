import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import Pokemon from "./pokemon";
import {getTypes} from "../services/typeservice";
import PokeType from "../models/type";

interface TypeProps {
    setTypeName: Dispatch<SetStateAction<string>>;
}
const Types : React.FC<TypeProps> = ({setTypeName}) => {

    const [types, setTypes] = useState<Array<{ type: PokeType, isSelected: boolean }>>([])

    const onClickType = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const typeName = event.currentTarget.value;

        // Create a new array with updated isSelected property
        const updatedTypes = types.map(item => ({
            type: item.type,
            isSelected: item.type.name === typeName
        }));

        setTypeName(typeName);
        setTypes(updatedTypes);
    }

    useEffect(() => {
        const init = async () => {
            const fetchTypes = await getTypes();
            if (fetchTypes.status === 200) {
                const all : PokeType = {
                    name:"all"
                };
                const temp : { type: PokeType, isSelected: boolean }[] = [{type:all, isSelected:true}];
                temp.push(...fetchTypes.data.results.map((type: PokeType) => ({
                    type,
                    isSelected: false
                })));
                setTypes(temp);
            }
        }
        init();
    }, []);

    const listItems = types.map(type => (
        <button
            onClick={onClickType}
            key={type.type.name}
            value={type.type.name}
            className={`type-button ${type.type.name} ${type.isSelected ? 'selected' : ''}`}
        >
            {type.type.name.toUpperCase()}
        </button>
    ));
    return (
        <div className={"types"}>
            <h1>Choose a type</h1>
            <div className={"type-list"}>
                {listItems}
            </div>
        </div>
    );
}

export default Types;