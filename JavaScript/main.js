const fs = require('fs');

const passwordLength = 2147483647;
const AllowLowerCase = true;
const AllowUpperCase = true;
const AllowNumber = true;
const passwordLocation = './password.txt';

const enableExcludingCharacters = true;
const excludedCharacters = [];

const enableCustomCharacters = true;
const customCharacters = ['&', '!', '*', '$'].filter(isExcluded);


const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].filter(isExcluded);
const upperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].filter(isExcluded);
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].filter(isExcluded);

try{
    fs.writeFileSync(passwordLocation, randomString(passwordLength), () => {});
} catch(err){
    console.error(err);
}

function randomString(number){
    if(AllowLowerCase || AllowNumber || AllowUpperCase || enableCustomCharacters){
        if(AllowLowerCase + AllowNumber + AllowUpperCase == 0 && enableCustomCharacters == 1 && customCharacters == []){
            return "";
        }

        var string = "";
        for(var i = 0; i < number; i++){
            var whatCharacter = getRandomCase([AllowLowerCase ? lowerCase : null, AllowUpperCase ? upperCase : null, AllowNumber ? numbers : null, enableCustomCharacters ? customCharacters : null].filter((element) => {
                return element != null && element != false;
            }));
            string += whatCharacter[getRandomInt(0, whatCharacter.length-1)];
        }
        return string;
    }
    else{
        return "";
    }
}

function getRandomInt(min, max){
    return Math.floor(Math.random()*Math.pow(10, Math.floor(Math.log(max))+1)) % (max-min+1) + min;
}

function getRandomCase(array){
    return array[getRandomInt(0, array.length-1)];
}

function isExcluded(element){
    return !excludedCharacters.includes(element) && enableExcludingCharacters;
}
