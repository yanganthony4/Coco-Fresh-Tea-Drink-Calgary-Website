"use client";

import styled from "styled-components"

import Image from "next/image";

type Drink = {
  name: string;
  src: string;
};

const drinks = [
  { name: "BSMT", src: "/images/bsmt.png" },
  { name: "Grapefruit", src: "/images/grapefruit.png" },
  { name: "BSMT", src: "/images/bsmt.png" },
  { name: "Popping", src: "/images/popping.png" },
  { name: "Matcha", src: "/images/matcha.png" },
  { name: "Popping", src: "/images/popping.png" },
  { name: "Matcha", src: "/images/matcha.png" },
  { name: "Grapefruit", src: "/images/grapefruit.png" },
  { name: "BSMT", src: "/images/bsmt.png" },
  { name: "Popping", src: "/images/popping.png" },
]

export default function DrinkImageSlider() {
  return (
    <Wrapper className="flex justify-center items-center py-12 md:py-20 bg-white">
      <div className="card-3d">
        {drinks.map((drink, i) => (
          <div key={i} className="card">
            <div className="card-front">
           <div className="content">
             <Image
              src={drink.src}
              alt={drink.name}
              width={170}
              height={220}
              className="rounded-md object-contain"
             />
             <p className="drink-name">{drink.name}</p>
           </div>
         </div>

            <div className="card-back">
              <Image
                src="/images/cocoemoji.png"
                alt="Back"
                width={170}
                height={220}
                className="rounded-md object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  @keyframes autoRun3d {
    from {
      transform: perspective(1000px) rotateY(-360deg);
    }
    to {
      transform: perspective(1000px) rotateY(0deg);
    }
  }

  .card-3d {
    position: relative;
    width: 100%;
    height: 400px;
    transform-style: preserve-3d;
    transform: perspective(1000px);
    animation: autoRun3d 35s linear infinite;
  }

  .card {
    position: absolute;
    width: 200px;
    height: 280px;
    top: 50%;
    left: 50%;
    transform-origin: center center;
    transform-style: preserve-3d;
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    background-color: #f3f3f3;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .card-back {
    transform: rotateY(180deg);
  }

  ${drinks
    .map(
      (_, i) => `
      .card:nth-child(${i + 1}) {
        transform: translate(-50%, -50%) rotateY(${i * 36}deg) translateZ(390px);
      }
    `
    )
    .join("\n")}

  /* 🔽 Mobile view (max-width: 768px) */
  @media (max-width: 768px) {
  .card-3d {
    transform: perspective(1000px) scale(0.65) rotateY(0deg);
    height: 200px;
  }

  .card {
    width: 120px;
    height: 170px;
  }

  .card-front img,
  .card-back img {
    width: 100px;
    height: auto;
  }

  .card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  }

  .drink-name {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  line-height: 1.2;
   }


  /* Reduce translateZ to reduce spacing between cards */
  .card:nth-child(1) { transform: translate(-50%, -50%) rotateY(0deg) translateZ(200px); }
  .card:nth-child(2) { transform: translate(-50%, -50%) rotateY(36deg) translateZ(200px); }
  .card:nth-child(3) { transform: translate(-50%, -50%) rotateY(72deg) translateZ(200px); }
  .card:nth-child(4) { transform: translate(-50%, -50%) rotateY(108deg) translateZ(200px); }
  .card:nth-child(5) { transform: translate(-50%, -50%) rotateY(144deg) translateZ(200px); }
  .card:nth-child(6) { transform: translate(-50%, -50%) rotateY(180deg) translateZ(200px); }
  .card:nth-child(7) { transform: translate(-50%, -50%) rotateY(216deg) translateZ(200px); }
  .card:nth-child(8) { transform: translate(-50%, -50%) rotateY(252deg) translateZ(200px); }
  .card:nth-child(9) { transform: translate(-50%, -50%) rotateY(288deg) translateZ(200px); }
  .card:nth-child(10) { transform: translate(-50%, -50%) rotateY(324deg) translateZ(200px); }
}

`
