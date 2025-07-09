// test/test_ultimateCryptoNetwork.js
/**
 * Unit tests for UltimateCryptoNetwork
 */

const assert = require('assert');
const { UltimateCryptoNetwork } = require('../src/main');
const fs = require('fs').promises;
const path = require('path');

describe('UltimateCryptoNetwork', function() {
    this.timeout(5000);
    
    let tempDir;
    let inputFile;
    let outputFile;
    
    before(async function() {
        tempDir = await fs.mkdtemp('/tmp/test-');
        inputFile = path.join(tempDir, 'test.json');
        outputFile = path.join(tempDir, 'output.json');
        
        await fs.writeFile(inputFile, JSON.stringify({ Test: 'Value' }));
    });
    
    after(async function() {
        await fs.rm(tempDir, { recursive: true });
    });
    
    it('should process data successfully', async function() {
        const app = new UltimateCryptoNetwork({
            input: inputFile,
            output: outputFile
        });
        
        const result = await app.execute();
        assert.strictEqual(result, true);
        
        const outputExists = await fs.access(outputFile)
            .then(() => true)
            .catch(() => false);
        assert.strictEqual(outputExists, true);
    });
    
    it('should handle processing errors', async function() {
        const app = new UltimateCryptoNetwork({
            input: 'nonexistent.file'
        });
        
        try {
            await app.execute();
            assert.fail('Should have thrown error');
        } catch (error) {
            assert.ok(error);
        }
    });
});
