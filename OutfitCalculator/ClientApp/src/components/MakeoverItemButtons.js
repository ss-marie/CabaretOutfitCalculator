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

    var makeoverItemTypes = {
        0: "Hostess",
        1: "Dress",
        2: "Hairstyle",
        3: "Hair Accessory",
        4: "Eyeglasses",
        5: "Earrings",
        6: "Necklace",
        7: "Nails",
        8: "Ring",
        9: "Watch",
        10: "Bracelet",
        11: "Perfume"
    }

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
            case hostess: item = hostessValue; break;
            case dress: item = dressValue; break;
            case hairstyle: item = hairstyleValue; break;
            case hairAccessory: item = hairAccessoryValue; break;
            case eyeglasses: item = eyeglassesValue; break;
            case earrings: item = earringsValue; break;
            case necklace: item = necklaceValue; break;
            case nails: item = nailsValue; break;
            case ring: item = ringValue; break;
            case watch: item = watchValue; break;
            case bracelet: item = braceletValue; break;
            case perfume: item = perfumeValue; break;
            default: break;
        }
        return item;
    }

    const buttons = [];

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
        //const response =
        await fetch(`https://localhost:44330/outfit?${idList}&getBest=false`)
            .then((response) => response.json())
            .then(data => {
                setStatsValue(data.stats);
                return data;
            });
        //return response.stats;
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

    //Display
    buttons.push(
        <StatDisplay
            stats={statsValue}
        />
    );
    //Buttons
    for (var i = 0; i < 12; i++) {
        var filteredItems = makeoverItems.makeoverItems.filter(item => {
            return item.slot === i
        });
        buttons.push(<h2>{makeoverItemTypes[i]}</h2>);
        buttons.push(
            <ToggleButtonGroup
                key={i}
                type='radio'
                name={'radio' + i}
                value={getItem(i)}
                onChange={setItem}
                style={{flexWrap: "wrap"}}
            >
                {filteredItems.map(item =>
                    <ToggleButton
                        key={item.name}
                        value={JSON.stringify(item)}
                        variant='secondary'
                    >
                        {item.name}
                    </ToggleButton>
                )
                }
            </ToggleButtonGroup>
        );
    }
    buttons.push(
        <div>
            <Button onClick={getBestOutfit}>Calculate Best Outfit</Button>
            <Button onClick={reset}>Reset</Button>
        </div>
    );
    return buttons;
}

export default MakeoverItemButtons;