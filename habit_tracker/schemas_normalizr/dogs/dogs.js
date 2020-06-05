// import {normalize, schema } from "normalizr";
const normalizr = require("normalizr");
const normalize = normalizr.normalize;
const schema = normalizr.schema

let originalData = {
    "message": {
        "affenpinscher": [],
        "australian": [
            "shepherd"
        ],
        "briard": [],
        "bulldog": [
            "boston",
            "english",
            "french"
        ],
    },
    "status": "success"
};


let breeds = [];
for( let breed of Object.keys(originalData.message)){
    let subBreeds = [];
    for(let subBreed of originalData.message[breed]){
        subBreeds.push({
            id: subBreed
        })
    }
    breeds.push({
        id: breed,
        subBreeds: [...subBreeds]
    })
}


const subBreedSchema = new schema.Entity("subBreed");
const breedSchema = new schema.Entity("breed", {
    subBreeds: [subBreedSchema]
});
const breedSchemaList = [breedSchema];

const normalizedData = normalize(breeds, breedSchemaList);
console.log(JSON.stringify(normalizedData, null, 4));
