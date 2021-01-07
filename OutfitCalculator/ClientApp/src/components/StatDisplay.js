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

const StatDisplay = (stats) => {
    const sexy = stats.stats.sexy ?? 0;
    const beauty = stats.stats.beauty ?? 0;
    const cute = stats.stats.cute ?? 0;
    const funny = stats.stats.funny ?? 0;
    const sexyEmoji = statToEmoji(sexy);
    const beautyEmoji = statToEmoji(beauty);
    const cuteEmoji = statToEmoji(cute);
    const funnyEmoji = statToEmoji(funny);
    const sexyStatClass = statToClass(sexy);
    const beautyStatClass = statToClass(beauty);
    const cuteStatClass = statToClass(cute);
    const funnyStatClass = statToClass(funny);
    return (
        <Table bordered responsive variant="dark">
            <thead>
                <th>Sexy</th>
                <th>Beauty</th>
                <th>Cute</th>
                <th>Funny</th>
            </thead>
            <tbody>
                <tr>
                    <td><div class={sexyStatClass}>{sexyEmoji}</div></td>
                    <td><div class={beautyStatClass}>{beautyEmoji}</div></td>
                    <td><div class={cuteStatClass}>{cuteEmoji}</div></td>
                    <td><div class={funnyStatClass}>{funnyEmoji}</div></td>
                </tr>
            </tbody>
        </Table>
    );
}

export default StatDisplay;