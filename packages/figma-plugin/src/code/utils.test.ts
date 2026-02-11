import { describe, it, expect } from 'vitest';
import { hexToRgb, parseRgba, remToPx, parseColor } from './utils';

describe('hexToRgb', () => {
    it('parses 6-digit hex', () => {
        expect(hexToRgb('#ff0000')).toEqual({ r: 1, g: 0, b: 0 });
        expect(hexToRgb('#00ca55')).toEqual({ r: 0, g: 202 / 255, b: 85 / 255 });
    });
    it('parses short hex', () => {
        expect(hexToRgb('#fff')).toEqual({ r: 1, g: 1, b: 1 });
    });
});

describe('parseRgba', () => {
    it('parses rgba with alpha', () => {
        expect(parseRgba('rgba(0, 202, 85, 0.5)')).toEqual({
            r: 0,
            g: 202 / 255,
            b: 85 / 255,
            a: 0.5,
        });
    });
    it('parses rgba without alpha', () => {
        expect(parseRgba('rgba(255, 0, 0)')).toEqual({ r: 1, g: 0, b: 0, a: 1 });
    });
    it('returns null for invalid', () => {
        expect(parseRgba('invalid')).toBeNull();
    });
});

describe('remToPx', () => {
    it('converts rem to px', () => {
        expect(remToPx('0.75rem')).toBe(12);
        expect(remToPx('1rem')).toBe(16);
        expect(remToPx('1.5rem')).toBe(24);
    });
    it('passes through numbers', () => {
        expect(remToPx(24)).toBe(24);
    });
});

describe('parseColor', () => {
    it('parses hex', () => {
        expect(parseColor('#b638ff')).toEqual({ r: 182 / 255, g: 56 / 255, b: 255 / 255 });
    });
    it('parses rgba', () => {
        expect(parseColor('rgba(182, 56, 255, 0.15)')).toEqual({
            r: 182 / 255,
            g: 56 / 255,
            b: 255 / 255,
            a: 0.15,
        });
    });
});
