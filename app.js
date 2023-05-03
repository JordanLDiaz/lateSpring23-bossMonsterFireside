// SECTION boss, hero, companion arrays
const boss = {
  name: "Rat-a-tat-tat",
  health: 100,
  maxHealth: 100,
  damage: 5,
  level: 1,
  image: "assets/squirrel-mafia.gif"
}

const hero = {
  name: 'SuperCat',
  health: 100,
  maxHealth: 100,
  damage: 5,
  coin: 0,
  image: "assets/superCat.gif"
}

const sidekicks = [
  {
    name: 'Kneady Boy',
    image: "assets/kneady-boy2.gif",
    cost: 100,
    damage: 5,
    isPurchased: false
  },
  {
    name: 'Major SideEye',
    image: "assets/major-sideeye.gif",
    cost: 200,
    damage: 10,
    isPurchased: false
  },
  {
    name: 'Razer Kitty',
    image: "assets/lazer-kitty2.gif",
    cost: 500,
    damage: 15,
    isPurchased: false
  },
  {
    name: "Rock'n'Gato",
    image: "assets/rock'n'gato.gif",
    cost: 1000,
    damage: 20,
    isPurchased: false
  },
]



// SECTION draw boss, hero, coin, and companions templates
function drawBoss() {
  let bossTemplate = ''
  bossTemplate += `
  <img onclick="attackBoss()" class="img-fluid" src="${boss.image}">
  <h4> ${boss.name}</h4>
  <h5>Level: <span>${boss.level}</span></h5>
  <p>Health: <span> ${boss.health} </span></p>
  `
  // @ts-ignore
  document.getElementById('boss').innerHTML = bossTemplate
}

function drawHero() {
  let heroTemplate = ''
  heroTemplate += `
  <img class="img-fluid hero" src="${hero.image}">
  <h5 class="text-center">${hero.name}</h5>
  <p class="text-center">Health: <span>${hero.health}</span></p>
  `
  // if (hero.health <= 0) {
  //   stopInterval()
  // }
  // @ts-ignore
  document.getElementById('hero').innerHTML = heroTemplate
}

function drawCoins() {
  // @ts-ignore
  document.getElementById('coin').innerText = hero.coin
}


// SECTION fighting logic
// FIXME need boss health to go to 0
function attackBoss() {
  // check that boss button even works with console
  // console.log('attacking boss');

  // decrease bosses health by the hero's damage
  boss.health -= hero.damage
  // console.log("[BOSSES HEALTH]", boss.health)

  // give the hero gold each time they attack, redraw coins
  hero.coin += boss.level
  // console.log("[HERO'S COINS]", hero.coin)
  drawCoins()

  // check if boss's health is < 0
  if (boss.health <= 0) {
    // alert player that they defeated boss, move onto next level
    window.alert('You killed the boss, onto the next level!')
    // increase amount of damage hero can cause
    hero.damage += 5
    // reset hero's health to 100 and redraw hero
    hero.health = 100
    drawHero()
    // give hero coins for defeating boss, redraw coins
    hero.coin += 150
    drawCoins()
    // call levelUp to reset boss to next levels stats
    levelUpBoss()
  }
  drawBoss()
}

function levelUpBoss() {
  // increase boss level by 1
  boss.level++
  // increase boss damage by current damage * 2
  boss.damage = boss.damage * 2
  // reset boss health and increase it by 100
  boss.health = boss.level * 100
}

function bossAttacks() {
  // decrease hero's health by bosses damage
  hero.health -= boss.damage
  // if hero dies...
  if (hero.health < 0) {
    hero.health = 0
    hero.coin = 0
    drawCoins()
    window.alert('Oh no! Rat-a-tat-tat got you!')
  }
  drawHero()
}

// setInterval(bossAttacks, 2000)

// function stopInterval() {
//   clearInterval()
// }

// SECTION call draw functions on page load
drawBoss()
drawHero()
drawCoins()