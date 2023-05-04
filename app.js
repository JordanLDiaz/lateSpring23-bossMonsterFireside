// SECTION boss, hero, sidekick arrays
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
    type: 'damage',
    image: "assets/kneady-boy2.gif",
    cost: 100,
    value: 5,
    isPurchased: false
  },
  {
    name: 'Major SideEye',
    type: 'healing',
    image: "assets/major-sideeye.gif",
    cost: 200,
    value: 10,
    isPurchased: false
  },
  {
    name: 'Lazer Kitty',
    type: 'damage',
    image: "assets/lazer-kitty2.gif",
    cost: 500,
    value: 15,
    isPurchased: false
  },
  {
    name: "Rock n Gato",
    type: 'healing',
    image: "assets/rock'n'gato.gif",
    cost: 1000,
    value: 20,
    isPurchased: false
  },
]


// SECTION draw boss, hero, coin, and companions templates
function drawHero() {
  let heroTemplate = ''
  heroTemplate += `
  <img class="img-fluid hero" src="${hero.image}">
  <h5 class="text-center">${hero.name}</h5>
  `
  // @ts-ignore
  document.getElementById('hero').innerHTML = heroTemplate
}

function drawHeroStats() {
  let heroStatsTemplate = ''
  heroStatsTemplate += `
  <h5 class="mx-2">Health: <span>${hero.health}</span></h5>
  <h5 class="mx-2">Damage: <span>${hero.damage}</span></h5>
`
  // @ts-ignore
  document.getElementById('hero-stats').innerHTML = heroStatsTemplate
}

function drawBoss() {
  let bossTemplate = ''
  bossTemplate += `
  <img onclick="attackBoss()" class="img-fluid" src="${boss.image}">
            <h4> ${boss.name}</h4>
  `
  // @ts-ignore
  document.getElementById('boss').innerHTML = bossTemplate
}

function drawBossStats() {
  let bossStatsTemplate = ''
  bossStatsTemplate += `
<h5>Level: <span>${boss.level}</span></h5>
<p>Health: <span> ${boss.health} </span></p>
<div class="progress" role="progressbar" aria-label="Danger striped progress bar"
  aria-valuenow="${boss.health / boss.maxHealth * 100}" aria-valuemin="0" aria-valuemax="${boss.maxHealth}">
  <div class="progress-bar progress-bar-striped bg-danger"
    style="width: ${boss.health / boss.maxHealth * 100}%"></div>
</div>
`
  // @ts-ignore
  document.getElementById('boss-stats').innerHTML = bossStatsTemplate
}

function drawCoins() {
  // @ts-ignore
  document.getElementById('coin').innerText = hero.coin
}


// SECTION initial game logic (without companions)
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
    if (window.confirm('You defeated the boss and earned a bonus, onto the next level!')) {
      // call levelUp to reset boss to next levels stats,redraw bossStats
      levelUpBoss()
    }

    // increase amount of damage hero can cause
    hero.damage += 5
    // reset hero's health to 100 and redraw heroStats
    hero.health = 100
    drawHeroStats()
    // give hero coins for defeating boss, redraw coins
    hero.coin += 100
    drawCoins()
  }
  drawBossStats()
}

function levelUpBoss() {
  // increase boss level by 1
  boss.level++
  // increase boss damage by current damage * 2
  boss.damage = boss.damage * 2
  // reset boss health and increase it by level * 100
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
  drawHeroStats()
}

setInterval(bossAttacks, 5000)





// SECTION Start fireside here by adding companions (companion array exists above)
// NOTE start by writing a single draw function to add KneadyBoy as sidekick
function drawKneadyBoy() {
  // check to make sure button is working
  console.log('adding kneady boy sidekick!')
  // create empty template for kneadyboy
  let kneadyBoyTemplate = ''
  // add to the template the html for kneady boy
  // note we have to grab sidekicks[0] to grab kneadyboy since we're doing one sidekick at a time
  kneadyBoyTemplate += `
  <img class="img-fluid sidekick" src="${sidekicks[0].image}">
  <h5>${sidekicks[0].name}</h5>
  `
  // @ts-ignore
  // set the kneadyboytemplate to the innerhtml of the element with the id of kneady-boy
  document.getElementById('kneady-boy').innerHTML = kneadyBoyTemplate
}

// NOTE now lets create a function that actually purchases kneadyboy, which will call our draw function above
function buyKneadyBoy() {
  // check that hero has enough $ AND that it hasn't been purchased yet
  if (hero.coin >= sidekicks[0].cost && !sidekicks[0].isPurchased) {
    // change isPurchased to true for that sidekick
    sidekicks[0].isPurchased = true
    // decrease the $ by cost of sidekick, redraw coins, draw sidekick, else alert user that they need more mons
    hero.coin -= sidekicks[0].cost
    drawCoins()
    console.log('[COINS REMAINING]', hero.coin)
    drawKneadyBoy()
  } else {
    // we could write some other business logic to handle not letting user purchase another needy boy if they already have one, but for now this window alert with take care of that
    window.alert('You do not have enough 🪙 for this sidekick (or you already have this one), keep attacking Rat-a-tat-tat!')
  }
}

// NOTE now lets make the kneady boy damage the boss.... we will call this function on an interval when he is purchased
function kneadyBoyAttacks() {
  // check that this function is running on interval
  console.log('Kneady boy attacks the boss!');
  // check that boss isn't dead
  if (boss.health > 0) {
    // decrease boss health by kneady boys damage
    boss.health -= sidekicks[0].value
    // update boss stats to show the effect of sidekicks damage
    drawBossStats()
  } else {
    window.alert('You defeated Rat-a-tat-tat!')
    hero.coin = hero.coin += 100
    hero.damage += 5
    hero.health = 100
    drawHeroStats()
    levelUpBoss()
  }
}

// setInterval(() => {
//   // check that interval is working on page load
//   // console.log('Companion interval working');
//   // check that sidekick is purchased (remember we changed isPurchased for kneadyBoy in our buy function), if isPurchased = true, then call attack function
//   if (sidekicks[0].isPurchased) {
//     kneadyBoyAttacks()
//   }
// }, 4000)

// NOTE we could continue writing the draw, buy, and attack for each sidekick OR we could refactor that code to be reusable for all sidekicks

// NOTE lets create a reusable drawSidekicks function that will handle drawing all of sidekicks IF they have been purchased
function drawSidekicks() {
  let sidekicksTemplate = ''
  sidekicks.forEach(sidekick => {
    if (sidekick.isPurchased) {
      sidekicksTemplate += `
      <div class="text-center text-light" id="kneady-boy">
      <img class="img-fluid sidekick" src="${sidekick.image}">
      <h5>${sidekick.name}</h5>
    </div>
      `
    }
  });
  // @ts-ignore
  document.getElementById('sidekicks').innerHTML = sidekicksTemplate
}

// NOTE now let's write a reusable function that will handle buying each of the sidekicks. We will have onclicks for each button in our html that will hold the argument for each sidekick, which means we need to make sure this function has a param for the argument it expects
function buySidekicks(sidekickName) {
  // find the purchased sidekick that matches the sidekicks name that was passed to the function
  const purchasedSidekick = sidekicks.find(sidekick => sidekick.name == sidekickName)
  // console.log(purchasedSidekick)

  // check that you have enough 🪙 and that sidekick hasn't been purchased yet
  // @ts-ignore
  if (hero.coin >= purchasedSidekick.cost && !purchasedSidekick.isPurchased) {
    // @ts-ignore
    purchasedSidekick.isPurchased = true
    // @ts-ignore
    hero.coin -= purchasedSidekick.cost
    drawCoins()
    drawSidekicks()
  } else {
    window.alert('You do not have enough 🪙 for this sidekick (or you already have this one), keep attacking Rat-a-tat-tat!')
  }
}

// NOTE now that we can purchase and draw sidekicks, lets get them to help attack the boss!
// This one will look a bit different than our kneadyBoyAttacks because we first need to check if a sidekick has been purchased (remember this changes to true in our buySidekicks function), then we need to identify if the sidekick purchased is type damage or healing, which will determine the effect it has on the game
function sideKicksHelp() {
  sidekicks.forEach(sidekick => {
    if (sidekick.isPurchased) {
      if (sidekick.type == 'damage') {
        boss.health -= sidekick.value
        drawBossStats()
      } else if (sidekick.type == 'healing') {
        hero.health += sidekick.value
        drawHeroStats()
      }
    }
  })
}

setInterval(sideKicksHelp, 4000)

// SECTION call draw functions on page load
drawHero()
drawHeroStats()
drawBoss()
drawBossStats()
drawCoins()