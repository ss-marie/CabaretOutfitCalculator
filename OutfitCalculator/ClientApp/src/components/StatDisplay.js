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

const statToColor = (stat) => {
    switch (stat) {
        case 0: return "blue";
        case 1: return "green";
        case 2: return "orange";
        case 3: return "deeppink";
        default: return "black";
    }
}

const StatDisplay = (stats) => {
    const sexy = stats.stats.sexy ?? 0;
    const beauty = stats.stats.beauty ?? 0;
    const cute = stats.stats.cute ?? 0;
    const funny = stats.stats.funny ?? 0;
    const sexyEmoji = statToEmoji(sexy);
    const beautyEmoji = statToEmoji(beauty);
    const cuteEmoji = statToEmoji(cute);
    const funnyEmoji = statToEmoji(funny);
    const sexyColor = statToColor(sexy);
    const beautyColor = statToColor(beauty);
    const cuteColor = statToColor(cute);
    const funnyColor = statToColor(funny);
    return (
        <Table responsive>
            <tbody>
                <tr>
                    <th>Sexy</th>
                    <td><div style={{ color: 'transparent', textShadow: '0 0 0 ' + sexyColor }}>{sexyEmoji}</div></td>
                </tr>
                <tr>
                    <th>Beauty</th>
                    <td><div style={{ color: 'transparent', textShadow: '0 0 0 ' + beautyColor }}>{beautyEmoji}</div></td>
                </tr>
                <tr>
                    <th>Cute</th>
                    <td><div style={{ color: 'transparent', textShadow: '0 0 0 ' + cuteColor }}>{cuteEmoji}</div></td>
                </tr>
                <tr>
                    <th>Funny</th>
                    <td><div style={{ color: 'transparent', textShadow: '0 0 0 ' + funnyColor }}>{funnyEmoji}</div></td>
                </tr>
            </tbody>
        </Table>
    );
}

export default StatDisplay;