function normalizeKeys(input) {
    let outputObject;
    let originalKey;
    let newKey;
    let value;
    /*
     * Add the commented out code in order to handle Arrays
     * in your JSON input.
     */
    // if(input instanceof Array){
    //     return input.map(function(value) {
    //         if(value !== null && typeof value === "object") {
    //             value = normalizeKeys(value);
    //         }
    //         return value;
    //     })
    // } else {
    outputObject = {};
    for (originalKey in input) {
        if (input.hasOwnProperty(originalKey)) {
            if (originalKey.includes('-')) {
                let token = originalKey.split('-');
                let newK = "";
                for (let t of token) {
                    newK = newK + t.charAt(0).toUpperCase() + t.slice(1);
                }
                newKey = newK;
            }
            else if (originalKey.includes('_')) {
                let token = originalKey.split('_');
                let newK = "";
                for (let t of token) {
                    newK = newK + t.charAt(0).toUpperCase() + t.slice(1);
                }
                newKey = newK;
            }
            else {
                newKey = (originalKey.charAt(0).toLowerCase() + originalKey.slice(1) || originalKey).toString();
            }
            newKey = newKey.charAt(0).toLowerCase() + newKey.slice(1);
            value = input[originalKey];
            if ( /*value instanceof Array ||*/(value !== null && value.constructor === Object)) {
                value = normalizeKeys(value);
            }
            outputObject[newKey] = value;
        }
    }
    // }
    return outputObject;
}
function testCamelCase() {
    const obj = '{"first_name": "John","last_name": "Doe","contact_info": {"email_address": "john@example.com","phone_number": "123-456-7890"}}';
    const input = JSON.parse(obj);
    console.log(normalizeKeys(input));
    const obj2 = '{"first-name": "John","last-name": "Doe","contact-info": {"email-address": "john@example.com","phone-number": "123-456-7890"}}';
    const input2 = JSON.parse(obj2);
    console.log(normalizeKeys(input2));
    const obj3 = '{"FirstName": "John","LastName": "Doe","ContactInfo": {"EmailAddress": "john@example.com","PhoneNumber": "123-456-7890"}}';
    const input3 = JSON.parse(obj3);
    console.log(normalizeKeys(input3));
    const obj4 = '{"firstName": "John","lastName": "Doe","contactInfo": {"emailAddress": "john@example.com","phoneNumber": "123-456-7890"}}';
    const input4 = JSON.parse(obj4);
    console.log(normalizeKeys(input4));
}
testCamelCase();
//# sourceMappingURL=CamelCaseConverter.js.map