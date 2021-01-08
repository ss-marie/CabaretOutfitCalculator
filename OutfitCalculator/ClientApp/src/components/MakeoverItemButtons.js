import React, { useState, useEffect } from 'react';
import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import StatDisplay from './StatDisplay';

const MakeoverItemButtons = (makeoverItems) => {
    const [outfitValue, setOutfitValue] = useState([]);
    const [statsValue, setStatsValue] = useState('');

    useEffect(() => {
        async function getStats() {
            var idList = "";
            for (var i = 0; i < outfitValue.length; i++) {
                var item = outfitValue[i];
                if (item.id) {
                    idList += ("&itemId=" + item.id);
                }
            }
            await fetch(`https://localhost:44330/outfit?getBest=false${idList}`)
                .then((response) => response.json())
                .then(data => {
                    setStatsValue(data.stats);
                    return data;
                });
        }
        getStats();
    }, [outfitValue]);

    var makeoverItemTypes = [
        "Hostess",
        "Dress",
        "Hairstyle",
        "Hair Accessory",
        "Eyeglasses",
        "Earrings",
        "Necklace",
        "Nails",
        "Ring",
        "Watch",
        "Bracelet",
        "Perfume"
    ]

    const setItem = (makeoverItemJson) => {
        var makeoverItem = JSON.parse(makeoverItemJson);
        var outfit = [...outfitValue];
        outfit[makeoverItem.slot] = makeoverItem;
        setOutfitValue(outfit);
    }

    const getItem = (slotString) => {
        var slotIndex = makeoverItemTypes.indexOf(slotString);
        return JSON.stringify(outfitValue[slotIndex]);
    }

    async function getBestOutfit() {
        var idList = "";
        for (var i = 0; i < outfitValue.length; i++) {
            var item = JSON.parse(outfitValue[i]);
            if (item.id) {
                idList += ("&itemId=" + item.id);
            }
        }
        const response = await fetch(`https://localhost:44330/outfit?getBest=true${idList}`)
        const outfit = await response.json();

        setOutfitValue([
            JSON.stringify(outfit.hostess),
            JSON.stringify(outfit.dress),
            JSON.stringify(outfit.hairstyle),
            JSON.stringify(outfit.hairAccessory),
            JSON.stringify(outfit.eyeglasses),
            JSON.stringify(outfit.earrings),
            JSON.stringify(outfit.necklace),
            JSON.stringify(outfit.nails),
            JSON.stringify(outfit.ring),
            JSON.stringify(outfit.watch),
            JSON.stringify(outfit.bracelet),
            JSON.stringify(outfit.perfume)
        ]);
    }

    const reset = () => {
        setOutfitValue([]);
    }

    return (
        <div>
            <StatDisplay
                stats={statsValue}
            />
            {
                makeoverItemTypes.map((type) => {
                    var filteredItems = makeoverItems.makeoverItems.filter(mItem => {
                        return makeoverItemTypes[mItem.slot] === type;
                    })
                    return (
                        <div key={type}>
                            <h2>{type}</h2>
                            <ToggleButtonGroup
                                type='radio'
                                name={'radio' + type}
                                value={getItem(type)}
                                onChange={setItem}
                                style={{ flexWrap: "wrap" }}
                            >
                                {filteredItems.map(fItem =>
                                    <ToggleButton
                                        key={fItem.name}
                                        value={JSON.stringify(fItem)}
                                        variant='secondary'
                                    >
                                        {fItem.name}
                                    </ToggleButton>
                                )
                                }
                            </ToggleButtonGroup>
                        </div>
                    );
                })
            }
            <div>
                <Button onClick={getBestOutfit}>Calculate Best Outfit</Button>
                <Button onClick={reset}>Reset</Button>
            </div>
        </div>
    )
}
export default MakeoverItemButtons;