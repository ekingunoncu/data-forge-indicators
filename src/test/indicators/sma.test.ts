import { assert, expect } from 'chai';
import 'mocha';
import * as dataForge from 'data-forge';
import 'data-forge-fs';
import "../../index";
import * as path from 'path';
import { readJSON, writeJSON } from './test-utils';

describe('sma', () => {

    it('simple moving average', async function () {

        const df = await dataForge.readFile("./src/test/data/STW.csv")
            .parseCSV({ dynamicTyping: true });

        const values = df.deflate(row => row.close).sma(30).toPairs();

        const outputFilePath = path.join(__dirname, "output", this.test.fullTitle() + ".json");
        
        // To write new output:
        //await writeJSON(outputFilePath, values);

        const expectedOutput = await readJSON(outputFilePath);
        expect(values).to.eql(expectedOutput);
    });

});
