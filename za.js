const deliver = (directions, deliveryPeople) => {
  const houses = new Set([JSON.stringify([0, 0])])
  const locations = Array.from({length: deliveryPeople}, _ => ([0, 0]))

  directions.split('').forEach((direction, idx) => {
    const index = idx % deliveryPeople
    switch(direction) {
      case '^': locations[index][1]++; break;
      case 'v': locations[index][1]--; break;
      case '>': locations[index][0]++; break;
      case '<': locations[index][0]--; break;
    }
    houses.add(JSON.stringify(locations[index]))
  })
  return { delivered: houses.size, houses, locations, deliveryPeople }
}

module.exports = { deliver }
