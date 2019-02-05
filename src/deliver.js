// Take a string of directions, and a number of deliveryPeople
// And get back some information about the routes

// throws if given an invalid direction

// delivered: number - number of unique homes with tasty pizza
// houses: [..."[number, number]"] addresses of homes enjoying a nice meal (stringified)
// locations: [...[number, number]] locations of each deliveryPerson
// deliveryPeople: number - number of deliveryPeople
const deliver = (directions, deliveryPeople=1) => {
  const houses = new Set([JSON.stringify([0, 0])])
  const locations = Array.from(Array(deliveryPeople), () => [0, 0])

  directions.split('').forEach((direction, idx) => {
    const index = idx % deliveryPeople
    switch(direction) {
      case '^': locations[index][1]++; break;
      case 'v': locations[index][1]--; break;
      case '>': locations[index][0]++; break;
      case '<': locations[index][0]--; break;
      default: throw new Error(`unknown direction ${direction}, please use one of ^v><`)
    }
    houses.add(JSON.stringify(locations[index]))
  })
  return { delivered: houses.size, houses, locations, deliveryPeople }
}

module.exports = { deliver }
