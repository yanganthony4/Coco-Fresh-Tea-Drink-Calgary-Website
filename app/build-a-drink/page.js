"use client";
import Toolbar from "../components/Toolbar";
import { useState } from "react";
import { Card, CardContent } from "../components/card";
import { Button } from "../components/button";
import Image from "next/image"; 

const drinkCategories = ["Milk Tea", "Fresh Tea", "Fruit Tea", "Fresh Milk", "Slush"];
const iceLevels = ["Extra Ice", "Regular Ice", "Less Ice", "No Ice"];
const sugarLevels = ["Extra Sugar", "100% Sugar", "70%", "50%", "30%", "No Sugar"];
const toppings = [
  "Pearls", "Brown Sugar Pearls", "Sago", "Pudding", "Grass Jelly", "Coconut Jelly", 
  "Strawberry Popping Pearls", "Lychee Popping Pearls", "Jasmine Tea Jelly", "Fresh Taro", 
  "Red Bean", "White Pearls", "Salty Cream"
];

const drinks = [
  { name: "CoCo Milk Tea", image: "/menuAssets/mtsagotaro.png", category: "Milk Tea" },
  { name: "Avocado Smoothie", image: "/menuAssets/slushavocado.png", category: "Slush" },
  { name: "Bubble Gaga", image: "/menuAssets/ftbbgg.png", category: "Fruit Tea" },
];

export default function BuildADrink() {
  <Toolbar/>
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [selectedIce, setSelectedIce] = useState("Regular Ice");
  const [selectedSugar, setSelectedSugar] = useState("100% Sugar");
  const [selectedToppings, setSelectedToppings] = useState([]);

  const handleToppingToggle = (topping) => {
    setSelectedToppings(prev =>
      prev.includes(topping) ? prev.filter(t => t !== topping) : [...prev, topping]
    );
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      {!selectedDrink ? (
        <div className="grid grid-cols-3 gap-4">
          {drinks.map((drink) => (
            <Card key={drink.name} className="cursor-pointer" onClick={() => setSelectedDrink(drink)}>
              <CardContent className="flex flex-col items-center p-4">
                <Image src={drink.image} alt={drink.name} width={150} height={150} />
                <p>{drink.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex w-full max-w-4xl space-x-8">
          <div className="flex-1 flex justify-center">
            <Image src={selectedDrink.image} alt={selectedDrink.name} width={300} height={300} />
          </div>
          <div className="flex-1">
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Ice Level</h3>
              <div className="grid grid-cols-2 gap-2">
                {iceLevels.map(level => (
                  <button key={level} className={`border px-4 py-2 rounded ${selectedIce === level ? 'bg-black text-white' : 'bg-white'}`} onClick={() => setSelectedIce(level)}>
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Sugar Level</h3>
              <div className="grid grid-cols-2 gap-2">
                {sugarLevels.map(level => (
                  <button key={level} className={`border px-4 py-2 rounded ${selectedSugar === level ? 'bg-black text-white' : 'bg-white'}`} onClick={() => setSelectedSugar(level)}>
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold">Select Toppings</h3>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {toppings.map(topping => (
                  <button key={topping} 
                    className={`border px-2 py-1 rounded ${selectedToppings.includes(topping) ? 'bg-black text-white' : 'bg-white'}`}
                    onClick={() => handleToppingToggle(topping)}>
                    {topping}
                  </button>
                ))}
              </div>
            </div>

            <Button className="mt-4 px-6 py-2 bg-black text-white rounded-lg">Confirm Selection</Button>
          </div>
        </div>
      )}
    </div>
  );
}
