"use client";
import Toolbar from "../components/Toolbar";
import { useState } from "react";
import { Card, CardContent } from "../components/card";
import { Button } from "../components/button";
import Image from "next/image"; 

<<<<<<< HEAD
const drinkCategories = ["Milk Tea", "Fresh Tea", "Fruit Tea", "Fresh Milk", "Slush"];
const iceLevels = ["Extra Ice", "Regular Ice", "Less Ice", "No Ice"];
const sugarLevels = ["Extra Sugar", "100% Sugar", "70%", "50%", "30%", "No Sugar"];
const toppings = [
  "Pearls", "Salty Cream", "Sago", "Pudding", "Grass Jelly", "Coconut Jelly", 
  "Strawberry Popping Pearls", "Lychee Popping Pearls", "Jasmine Tea Jelly", "Fresh Taro", 
  "Red Bean", "White Pearls", "BrownSugar Pearls"
];

const drinks = [
  { name: "CoCo Milk Tea", image: "/menuAssets/mtoolong.png", category: "Milk Tea" },
  { name: "Jasmine Milk Tea", image: "/menuAssets/mtjas.png", category: "Milk Tea" },
  { name: "Oolong Milk Tea", image: "/menuAssets/mtoolong.png", category: "Milk tea" },
  { name: "Taro Milk Tea", image: "/menuAssets/mttaro.png", category: "Fresh Tea" },
  { name: "Chocolate Milk Tea", image: "/menuAssets/mtchoco.png", category: "Fresh Tea" },
  { name: "Caramel Chocolate Milk Tea", image: "/menuAssets/mtcaramelchoco.png", category: "Fresh tea" },
  { name: "Caramel Milk Tea", image: "/menuAssets/mtcaramel.png", category: "Fresh tea" },

  { name: "Fresh Black Tea", image: "/menuAssets/teablack.png", category: "Fresh Tea" },
  { name: "Fresh Jasmine Tea", image: "/menuAssets/teajasmine.png", category: "Fresh Tea" },
  { name: "Fresh Oolong Tea", image: "/menuAssets/teaoolong.png", category: "Fresh tea" },
  
  { name: "Mango Green Tea", image: "/menuAssets/ftmango.png", category: "Fresh Tea" },
  { name: "Passion Fruit Green Tea", image: "/menuAssets/ftpfgt.png", category: "Fresh Tea" },
  { name: "Passion Fruit Black Tea", image: "/menuAssets/ftpfbt.png", category: "Fresh tea" },
  { name: "Lemon Green Tea", image: "/menuAssets/ftlemongt.png", category: "Fresh Tea" },
  { name: "Lemon Black Tea", image: "/menuAssets/ftlemonbt.png", category: "Fresh Tea" },
  { name: "Lychee Green Tea", image: "/menuAssets/ftlychee.png", category: "Fresh tea" },
  { name: "Lemon King", image: "/menuAssets/ftlemonking.png", category: "Fresh Tea" },
  { name: "Grapefruit Green Tea", image: "/menuAssets/ftgrapefruit.png", category: "Fresh Tea" },

  { name: "Matcha Latte", image: "/menuAssets/lattematcha.png", category: "Fresh Tea" },
  { name: "BrownSugar Latte", image: "/menuAssets/lattebs.png", category: "Fresh Tea" },
  { name: "Fresh Taro Latte", image: "/menuAssets/latteft.png", category: "Fresh tea" },
  { name: "Strawberry Latte", image: "/menuAssets/lattestrawberry.png", category: "Fresh tea" },

  { name: "Avocado Smoothie", image: "/menuAssets/slushavocado.png", category: "Fresh Tea" },
  { name: "Avocado Pudding Smoothie", image: "/menuAssets/slushavocadopudding.png", category: "Fresh Tea" },
  { name: "Chocolate Slush", image: "/menuAssets/slushchoco.png", category: "Fresh tea" },
  { name: "BrownSugar Chocolate Dream", image: "/menuAssets/slushchocodream.png", category: "Fresh Tea" },
  { name: "Strawberry Creme Brulee", image: "/menuAssets/slushcremestrawberry.png", category: "Fresh Tea" },
  { name: "Honey Dew Slush", image: "/menuAssets/slushhoneydew.png", category: "Fresh tea" },
  { name: "Mango Slush", image: "/menuAssets/slushmango.png", category: "Fresh Tea" },
  { name: "Mango Dream", image: "/menuAssets/slushmangodream.png", category: "Fresh Tea" },
  { name: "Mango Smoothie", image: "/menuAssets/slushmangosmoothie.png", category: "Fresh tea" },
  { name: "Mango Pomelo Sago", image: "/menuAssets/slushmangopomelo.png", category: "Fresh Tea" },
  { name: "Matcha Slush Macchiato", image: "/menuAssets/slushmatcha.png", category: "Fresh Tea" },
  { name: "Passion Fruit Mango Slush", image: "/menuAssets/slushpfmango.png", category: "Fresh tea" },
  { name: "Strawberry Slush", image: "/menuAssets/slushstrawberry.png", category: "Fresh Tea" },
  { name: "Strawberry Dream", image: "/menuAssets/slushstrawberrydream.png", category: "Fresh Tea" },
  { name: "Taro Slush", image: "/menuAssets/slushtaro.png", category: "Fresh tea" },
  
  { name: "Mango Yakult", image: "/menuAssets/yakultmango.png", category: "Fresh tea" },
  { name: "Lychee Yakult", image: "/menuAssets/yakultlychee.png", category: "Fresh Tea" },
  { name: "Green Tea Yakult", image: "/menuAssets/yakultgt.png", category: "Fresh Tea" },
  { name: "Lemon Yakult", image: "/menuAssets/yakultlemon.png", category: "Fresh tea" },
  { name: "Grapefruit Yakult", image: "/menuAssets/yakultgf.png", category: "Fresh Tea" },
  
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
               <div className="grid grid-cols-3 gap-6">
               {drinks.map((drink) => (
                 <Card key={drink.name} className="cursor-pointer p-4 flex flex-col items-center" onClick={() => setSelectedDrink(drink)}>
                   <Image src={drink.image} alt={drink.name} width={120} height={160} className="object-contain" />
                   <p className="text-black mt-2">{drink.name}</p>
                 </Card>
               ))}
             </div>
           ) : (
             <div className="flex w-full max-w-4xl space-x-8">
               <div className="flex-1 flex justify-center">
                 <Image src={selectedDrink.image} alt={selectedDrink.name} width={160} height={240} className="object-contain" />
               </div>
               <div className="flex-1">
                 <h2 className="text-2xl font-semibold text-black">Customize Your Drink</h2>
                 
                 <div className="mt-4">
                   <h3 className="text-lg font-semibold text-black">Ice Level</h3>
                   <div className="grid grid-cols-2 gap-2">
                     {iceLevels.map(level => (
                       <button 
                         key={level} 
                         className={`border border-black px-4 py-2 rounded text-black ${
                           selectedIce === level ? "bg-orange-500 text-white" : "bg-white hover:bg-orange-300"
                         }`} 
                         onClick={() => setSelectedIce(level)}
                       >
                         {level}
                       </button>
                     ))}
                   </div>
                 </div>
                 
                 <div className="mt-4">
                   <h3 className="text-lg font-semibold text-black">Sugar Level</h3>
                   <div className="grid grid-cols-2 gap-2">
                     {sugarLevels.map(level => (
                       <button 
                         key={level} 
                         className={`border border-black px-4 py-2 rounded text-black ${
                           selectedSugar === level ? "bg-orange-500 text-white" : "bg-white hover:bg-orange-300"
                         }`} 
                         onClick={() => setSelectedSugar(level)}
                       >
                         {level}
                       </button>
                     ))}
                   </div>
                 </div>
     
                 <div className="mt-4">
                   <h3 className="text-lg font-semibold text-black">Select Toppings</h3>
                   <div className="grid grid-cols-3 gap-2 mt-2">
                     {toppings.map(topping => (
                       <button 
                         key={topping} 
                         className={`border border-black px-2 py-1 rounded text-black ${
                           selectedToppings.includes(topping) ? "bg-orange-500 text-white" : "bg-white hover:bg-orange-300"
                         }`} 
                         onClick={() => handleToppingToggle(topping)}
                       >
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
=======
export default function BuildADrink(){
    return (
        <div>
            
            <h1>Build a Drink</h1>
            <p>This is the build a drink page</p>
        </div>
    )
}
>>>>>>> main
