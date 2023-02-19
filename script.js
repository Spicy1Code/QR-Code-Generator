const container = document.querySelector(".container");
const userInput = document.getElementById("userInput");
const submitBtn = document.getElementById("submit");
const downloadBtn = document.getElementById("download");
const sizeOptions = document.querySelector(".sizeOptions");
const BGColor = document.getElementById("BGColor");
const FGColor = document.getElementById("FGColor");
let QR_Code;
let sizeChoice, BGColorChoice, FGColorChoice;

//Set size
sizeOptions.addEventListener("change", () => {
  sizeChoice = sizeOptions.value;
});

//Set background color
BGColor.addEventListener("input", () => {
  BGColorChoice = BGColor.value;
});

//Set foreground color
FGColor.addEventListener("input", () => {
  FGColorChoice = FGColor.value;
});

//Format input
const inputFormatter = (value) => {
  value = value.replace(/[^a-z0-9A-Z]+/g, "");
  return value;
};

submitBtn.addEventListener("click", async () => {
  container.innerHTML = "";
  //QR code genertion
  QR_Code = await new QRCode(container, {
    text: userInput.value,
    width: sizeChoice,
    height: sizeChoice,
    colorDark: FGColorChoice,
    colorLight: BGColorChoice,
  });

  //Set url for download
  const src = container.firstChild.toDataURL("image/pmg");
  downloadBtn.href = src;
  let userValue = userInput.value;
  try {
    userValue = new URL(userValue).hostname;
  } catch (_) {
    userValue = inputFormatter(userValue);
    downloadBtn.download = `${userValue}QR`;
    downloadBtn.classList.remove("hide");
  }
});

userInput.addEventListener("input", () => {
  if (userInput.value.trim().length < 1) {
    submitBtn.disabled = true;
    downloadBtn.href = "";
    downloadBtn.classList.add("hide");
  } else {
    submitBtn.disabled = false;
  }
});

window.onload = () => {
  container.innerHTML = "";
  sizeChoice = 100;
  sizeOptions.value = 100;
  userInput.value = "";
  BGColor.vavlue = BGColorChoice = "#ffffff";
  FGColor.value = FGColorChoice = "#797D7F";
  downloadBtn.classList.add("hide");
  submitBtn.disabled = true;
  canvas.width = width;
    canvas.height = height;
    nearParticles = [];
    middleParticles = [];
    farParticles = [];
    window.requestAnimationFrame(startSnowFall);
};

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let width = window.innerWidth;
let height = window.innerHeight;
let nearParticles = [],
  middleParticles = [],
  farParticles = [];
let particleSettings = {
  count: 250,
  //count for wach layer. Increase/Decrease based on requirement
};

window.requestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

  function randomNumberGenerator(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createsnowfall(particles, flag) {
    while (particles.length < particleSettings.count) {
      let particle;
      //create particles based on flag
      if (flag == "near") {
        //(area,alpha,vy)
        particle = new Particle(4, 0.9, 0.3);
      } else if (flag == "middle") {
        particle = new Particle(3, 0.5, 0.2);
      } else {
        particle = new Particle(2, 0.3, 0.1);
      }
      particle.color = `rgb(255,255,255)`;
      particles.push(particle);
    }
  }

  function startSnowFall() {
    context.fillStyle = "rgba(0,0,0,1)";
    context.fillRect(0, 0, width, height);
    createsnowfall(nearParticles, "near");
    createsnowfall(farParticles, "far");
    createsnowfall(middleParticles, "middle");
    //combine all and sortg randomly
    particles = [...nearParticles, ...middleParticles, ...farParticles];
    particles = particles.sort(() => 0.5 - Math.random());
    for (let i in particles) {
      particles[i].draw();
      //If particle has crossed screen height
      if (particles[i].y > height) {
        particles[i].y = Math.random() * height - height;
      }
    }
    window.requestAnimationFrame(startSnowFall);
  }

  function Particle(areaValue, alphaValue, vyValue) {
    this.area = areaValue;
    this.x = Math.random() * width;
    this.y = Math.random() * height - height;
    this.alpha = alphaValue;
    this.vy = vyValue * 10;
  }

  Particle.prototype = {
    draw: function () {
      this.y += (Math.cos(this.area) + this.vy) * 0.3;
      context.save();
      context.beginPath();
      context.arc(this.x, this.y, this.area, 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.globalAlpha = this.alpha;
      context.closePath();
      context.fill();
      context.restore();
    },
  }; 