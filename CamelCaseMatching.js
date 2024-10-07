function camelMatch(queries, pattern) {
    let result = [];
    let patternPointer = 0;
    let wordPointer = 0;
    let match = true;
    for (let word of queries) {
        wordPointer = 0;
        patternPointer = 0;
        match = true;
        while (patternPointer < pattern.length && wordPointer < word.length) {
            if (pattern[patternPointer].toLowerCase() === pattern[patternPointer]) {
                if (word[wordPointer] === pattern[patternPointer]) {
                    patternPointer++;
                    wordPointer++;
                }
                else if (word[wordPointer].toUpperCase() === word[wordPointer]) {
                    match = false;
                    break;
                }
                else {
                    wordPointer++;
                }
            }
            else if (pattern[patternPointer].toUpperCase() === pattern[patternPointer]) {
                if (word[wordPointer] === pattern[patternPointer]) {
                    patternPointer++;
                    wordPointer++;
                }
                else if (word[wordPointer].toUpperCase() === word[wordPointer]) {
                    match = false;
                    break;
                }
                else {
                    wordPointer++;
                }
            }
        }
        if (wordPointer === word.length && patternPointer === pattern.length) {
            if (match) {
                result.push(true);
            }
            else {
                result.push(false);
            }
        }
        else if (patternPointer !== pattern.length) {
            result.push(false);
        }
        else {
            for (let t = wordPointer; t < word.length; t++) {
                if (word[t].toUpperCase() === word[t]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                result.push(true);
            }
            else {
                result.push(false);
            }
        }
    }
    return result;
}
;
function testCamelMatch() {
    let queries = ["FooBar", "FooBarTest", "FootBall", "FrameBuffer", "ForceFeedBack"];
    let pattern = "FB";
    let pattern1 = "FoBa";
    let pattern2 = "FoBaT";
    console.log(camelMatch(queries, pattern));
    console.log(camelMatch(queries, pattern1));
    console.log(camelMatch(queries, pattern2));
}
testCamelMatch();
//# sourceMappingURL=CamelCaseMatching.js.map