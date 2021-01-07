import React, { useState } from 'react';
import { useEffect } from 'react';
import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import StatDisplay from './StatDisplay';

const MakeoverItemButtons = (makeoverItems) => {
    const [hostessValue, setHostessValue] = useState('1');
    const [dressValue, setDressValue] = useState('1');
    const [hairstyleValue, setHairstyleValue] = useState('1');
    const [hairAccessoryValue, setHairAccessoryValue] = useState('1');
    const [eyeglassesValue, setEyeglassesValue] = useState('1');
    const [earringsValue, setEarringsValue] = useState('1');
    const [necklaceValue, setNecklaceValue] = useState('1');
    const [nailsValue, setNailsValue] = useState('1');
    const [ringValue, setRingValue] = useState('1');
    const [watchValue, setWatchValue] = useState('1');
    const [braceletValue, setBraceletValue] = useState('1');
    const [perfumeValue, setPerfumeValue] = useState('1');
    const [statsValue, setStatsValue] = useState('1');

    useEffect(() => {
        getStats();
    }, [
        hostessValue,
        dressValue,
        hairstyleValue,
        hairAccessoryValue,
        eyeglassesValue,
        earringsValue,
        necklaceValue,
        nailsValue,
        ringValue,
        watchValue,
        braceletValue,
        perfumeValue
    ]);

    const hostess = 0;
    const dress = 1;
    const hairstyle = 2;
    const hairAccessory = 3;
    const eyeglasses = 4;
    const earrings = 5;
    const necklace = 6;
    const nails = 7;
    const ring = 8;
    const watch = 9;
    const bracelet = 10;
    const perfume = 11;

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

    const setItem = (value) => {
        var makeoverItem = JSON.parse(value);
        switch (makeoverItem.slot) {
            case hostess: setHostessValue(value); break;
            case dress: setDressValue(value); break;
            case hairstyle: setHairstyleValue(value); break;
            case hairAccessory: setHairAccessoryValue(value); break;
            case eyeglasses: setEyeglassesValue(value); break;
            case earrings: setEarringsValue(value); break;
            case necklace: setNecklaceValue(value); break;
            case nails: setNailsValue(value); break;
            case ring: setRingValue(value); break;
            case watch: setWatchValue(value); break;
            case bracelet: setBraceletValue(value); break;
            case perfume: setPerfumeValue(value); break;
            default: break;
        }
    }

    const getItem = (slot) => {
        var item;
        switch (slot) {
            case makeoverItemTypes[hostess]: item = hostessValue; break;
            case makeoverItemTypes[dress]: item = dressValue; break;
            case makeoverItemTypes[hairstyle]: item = hairstyleValue; break;
            case makeoverItemTypes[hairAccessory]: item = hairAccessoryValue; break;
            case makeoverItemTypes[eyeglasses]: item = eyeglassesValue; break;
            case makeoverItemTypes[earrings]: item = earringsValue; break;
            case makeoverItemTypes[necklace]: item = necklaceValue; break;
            case makeoverItemTypes[nails]: item = nailsValue; break;
            case makeoverItemTypes[ring]: item = ringValue; break;
            case makeoverItemTypes[watch]: item = watchValue; break;
            case makeoverItemTypes[bracelet]: item = braceletValue; break;
            case makeoverItemTypes[perfume]: item = perfumeValue; break;
            default: break;
        }
        return item;
    }

    function getSelectedItems() {
        return [
            hostessValue,
            dressValue,
            hairstyleValue,
            hairAccessoryValue,
            eyeglassesValue,
            earringsValue,
            necklaceValue,
            nailsValue,
            ringValue,
            watchValue,
            braceletValue,
            perfumeValue,
        ]
    };

    async function getStats() {
        var selectedItems = getSelectedItems();
        var idList = "";
        var counter = 0;
        for (var i = 0; i < selectedItems.length; i++) {
            var item = JSON.parse(selectedItems[i]);
            if (item.id) {
                if (counter > 0) {
                    idList += "&";
                }
                idList += ("itemId=" + item.id);
                counter++;
            }
        }
        await fetch(`https://localhost:44330/outfit?${idList}&getBest=false`)
            .then((response) => response.json())
            .then(data => {
                setStatsValue(data.stats);
                return data;
            });
    }

    async function getBestOutfit() {
        var selectedItems = getSelectedItems();
        var idList = "";
        var counter = 0;
        for (var i = 0; i < selectedItems.length; i++) {
            var item = JSON.parse(selectedItems[i]);
            if (item.id) {
                if (counter > 0) {
                    idList += "&";
                }
                idList += ("itemId=" + item.id);
                counter++;
            }
        }
        const response = await fetch(`https://localhost:44330/outfit?${idList}&getBest=true`)
        const outfit = await response.json();

        setHostessValue(JSON.stringify(outfit.hostess));
        setDressValue(JSON.stringify(outfit.dress));
        setHairstyleValue(JSON.stringify(outfit.hairstyle));
        setHairAccessoryValue(JSON.stringify(outfit.hairAccessory));
        setEyeglassesValue(JSON.stringify(outfit.eyeglasses));
        setEarringsValue(JSON.stringify(outfit.earrings));
        setNecklaceValue(JSON.stringify(outfit.necklace));
        setNailsValue(JSON.stringify(outfit.nails));
        setRingValue(JSON.stringify(outfit.ring));
        setWatchValue(JSON.stringify(outfit.watch));
        setBraceletValue(JSON.stringify(outfit.bracelet));
        setPerfumeValue(JSON.stringify(outfit.perfume));
    }

    const reset = () => {
        setHostessValue(1);
        setDressValue(1);
        setHairstyleValue(1);
        setHairAccessoryValue(1);
        setEyeglassesValue(1);
        setEarringsValue(1);
        setNecklaceValue(1);
        setNailsValue(1);
        setRingValue(1);
        setWatchValue(1);
        setBraceletValue(1);
        setPerfumeValue(1);
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