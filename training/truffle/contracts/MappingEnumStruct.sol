pragma solidity ^0.4.4;

contract MappingEnumStruct {
 
 mapping(string => string)  capitals;   // Storage

 enum continents {Africa,Antartica,Asia,Australia,Europe,North_America, South_America}  // Enumeration

 struct country {
   bytes32    name;
   continents continent;
   uint16      populationInMillion;
 }

 country[]  europeanCountries;   // Only countries in Europe added to this array

 function getEuropeanCountry(bytes32 name) returns (bytes32, uint8, uint16) {
  // Let's do a linear search to find the ctry
  for(uint8 i = 0; i < europeanCountries.length; i++){
    if(name == europeanCountries[i].name){
      return (europeanCountries[i].name, 
              uint8(europeanCountries[i].continent),
              europeanCountries[i].populationInMillion);
    }
  }
 }

 // Structure cannot be passed 
 function addEuropeanCountry(bytes32 nm, uint8 cont, uint16 pop) returns (bool) {
  if(cont != uint8(continents.Europe)) return false;

  country memory ctry;
  // 3 ways to initialize this struct
  // ctry = country(nm, continents(cont), pop);
  // ctry = country({name:nm, continent:continents(cont), populationInMillion:pop});
  ctry.name = nm;
  ctry.continent = continents(cont);
  ctry.populationInMillion = pop;
  
  europeanCountries.push(ctry);  // Push the country in the array
  return true;
 } 

 function addCapital(string country, string capital){
   capitals[country] = capital;  // Store the capital on per country basis
 }

 function getCapital(string country) returns (string){
   return capitals[country];  // Returns the capital for the country 
 }
 
 function removeCapital(string country){
   delete(capitals[country]);  // Remove the key value pair from the mapping
 }

 // get the value at specified index
 function getContinent(uint8 arg) returns (string){
  if(arg == uint8(continents.Africa)) return "Africa";
  if(arg == uint8(continents.Antartica)) return "Antartica";
  if(arg == uint8(continents.Asia)) return "Asia";
  if(arg == uint8(continents.Australia)) return "Australia";
  if(arg == uint8(continents.Europe)) return "Europe";
  if(arg == uint8(continents.North_America)) return "North America";
  if(arg == uint8(continents.South_America)) return "South America";
 }

}
