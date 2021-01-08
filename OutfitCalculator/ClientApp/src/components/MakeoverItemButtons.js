import React, { useState, useEffect } from 'react';
import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import StatDisplay from './StatDisplay';

const MakeoverItemButtons = () => {
    const [makeoverItems, setmakeoverItems] = useState([]);
    const [outfitValue, setOutfitValue] = useState([]);
    const [statsValue, setStatsValue] = useState('');
    const [rankValue, setRankValue] = useState('E');
    const [unlockValue, setUnlockValue] = useState(['Yuki']);

    useEffect(() => {
        async function populateData() {
            var unlockList = "";
            for (var j = 0; j < unlockValue.length; j++) {
                var unlock = unlockValue[j];
                unlockList += ("&unlock=" + unlock);
            }
            var hostessId = "";
            if (outfitValue.length > 0 && outfitValue[0] && outfitValue[0].id) {
                hostessId = "&hostessId=" + outfitValue[0].id;
            }
            const response = await fetch(`items?rank=${rankValue}${unlockList}${hostessId}`);
            const data = await response.json();
            setmakeoverItems(data);
        }
        populateData();

        async function getStats() {
            console.log(outfitValue);
            var idList = "";
            for (var i = 0; i < outfitValue.length; i++) {
                var item = outfitValue[i];
                if (item && item.id) {
                    idList += ("&itemId=" + item.id);
                }
            }
            console.log(idList);
            var unlockList = "";
            for (var j = 0; j < unlockValue.length; j++) {
                var unlock = unlockValue[j];
                unlockList += ("&unlock=" + unlock);
            }
            await fetch(`https://localhost:44330/outfit?getBest=false&rank=${rankValue}${unlockList}${idList}`)
                .then((response) => response.json())
                .then(data => {
                    setStatsValue(data.stats);
                    return data;
                });
        }
        getStats();
    }, [
        outfitValue,
        rankValue,
        unlockValue
    ]);

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

    var ranks = [
        "E",
        "D",
        "C",
        "B",
        "A",
        "S"
    ]

    var unlocks = [
        "Yuki",
        "Ai",
        "Saki",
        "Hibiki",
        "Chika",
        "Mana"
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
            var item = outfitValue[i];
            if (item && item.id) {
                idList += ("&itemId=" + item.id);
            }
        }
        var unlockList = "";
        for (var j = 0; j < unlockValue.length; j++) {
            var unlock = unlockValue[j];
            unlockList += ("&unlock=" + unlock);
        }
        const response = await fetch(`https://localhost:44330/outfit?getBest=true&rank=${rankValue}${unlockList}${idList}`)
        const outfit = await response.json();

        setOutfitValue([
            outfit.hostess,
            outfit.dress,
            outfit.hairstyle,
            outfit.hairAccessory,
            outfit.eyeglasses,
            outfit.earrings,
            outfit.necklace,
            outfit.nails,
            outfit.ring,
            outfit.watch,
            outfit.bracelet,
            outfit.perfume
        ]);
    }

    const reset = () => {
        setOutfitValue([]);
        setRankValue('E');
        setUnlockValue(['Yuki']);
    }

    return (
        <div>
            {/*STAT DISPLAY*/}
            <StatDisplay
                stats={statsValue}
            />
            {/*RANK BUTTONS*/}
            <h2>Current Rank</h2>
            <ToggleButtonGroup
                type='radio'
                name={'radioRank'}
                value={rankValue}
                onChange={setRankValue}
                style={{ flexWrap: "wrap" }}
            >
                {ranks.map(rank =>
                    <ToggleButton
                        key={rank}
                        value={rank}
                        variant='secondary'
                    >
                        {rank}
                    </ToggleButton>
                )}
            </ToggleButtonGroup>
            {/*UNLOCK BUTTONS*/}
            <h2>Unlocked Hostesses</h2>
            <ToggleButtonGroup
                type='checkbox'
                name={'checkboxUnlock'}
                value={unlockValue}
                onChange={setUnlockValue}
                style={{ flexWrap: "wrap" }}
            >
                {unlocks.map(unlock =>
                    <ToggleButton
                        key={unlock}
                        value={unlock}
                        variant='secondary'
                    >
                        {unlock}
                    </ToggleButton>
                )}
            </ToggleButtonGroup>
            {/*ITEM BUTTONS*/}
            {
                makeoverItemTypes.map((type) => {
                    var filteredItems = makeoverItems.filter(mItem => {
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
                {/*FORM BUTTONS BUTTONS*/}
                <Button onClick={getBestOutfit}>Calculate Best Outfit</Button>
                <Button onClick={reset}>Reset</Button>
            </div>
        </div>
    )
}
export default MakeoverItemButtons;