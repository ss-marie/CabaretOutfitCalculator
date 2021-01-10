import React from 'react';
import Table from 'react-bootstrap/Table';

const statToEmoji = (stat) => {
    switch (stat) {
        case 0: return String.fromCodePoint('0x274C'); //cross
        case 1: return String.fromCodePoint('0x1F53A'); //triangle
        case 2: return String.fromCodePoint('0x1F534'); //circle
        case 3: return String.fromCodePoint('0x2B55'); //hollow circle
        default: return '';
    }
}

const statToClass = (stat) => {
    switch (stat) {
        case 0: return "cross";
        case 1: return "triangle";
        case 2: return "circle";
        case 3: return "double-circle";
        default: return "";
    }
}

const modToClass = (stat) => {
    var mod = 0;
    if (stat > 0) mod = 1;
    if (stat < 0) mod = -1;
    switch (mod) {
        case -1: return "mod-down";
        case 1: return "mod-up";
        default: return "";
    }
}

const StatDisplay = (stats) => {
    const sexy = stats?.stats?.sexy ?? 0;
    const beauty = stats?.stats?.beauty ?? 0;
    const cute = stats?.stats?.cute ?? 0;
    const funny = stats?.stats?.funny ?? 0;
    if (stats.isMain) {
        return (
            <Table className="main-stats" bordered responsive variant="dark">
                <thead>
                    <tr>
                        <td><h5>Sexy</h5></td>
                        <td><h5>Beauty</h5></td>
                        <td><h5>Cute</h5></td>
                        <td><h5>Funny</h5></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><span className={statToClass(sexy)}>{statToEmoji(sexy)}</span></td>
                        <td><span className={statToClass(beauty)}>{statToEmoji(beauty)}</span></td>
                        <td><span className={statToClass(cute)}>{statToEmoji(cute)}</span></td>
                        <td><span className={statToClass(funny)}>{statToEmoji(funny)}</span></td>
                    </tr>
                </tbody>
            </Table>
        );
    } else {
        return (
            <Table className="item-stats">
                <tbody>
                    <tr>
                        {sexy !== 0 &&
                            <td>S</td>
                        }
                        {sexy !== 0 &&
                            <td className={modToClass(sexy)}>{String.fromCodePoint('0xBB')}</td>
                        }
                        {beauty !== 0 &&
                            <td>B</td>
                        }
                        {beauty !== 0 &&
                            <td className={modToClass(beauty)}>{String.fromCodePoint('0xBB')}</td>
                        }
                        {cute !== 0 &&
                            <td>C</td>
                        }
                        {cute !== 0 &&
                            <td className={modToClass(cute)}>{String.fromCodePoint('0xBB')}</td>
                        }
                        {funny !== 0 &&
                            <td>F</td>
                        }
                        {funny !== 0 &&
                            <td className={modToClass(funny)}>{String.fromCodePoint('0xBB')}</td>
                        }
                    </tr>
                </tbody>
            </Table>
        );
    };
}

export default StatDisplay;