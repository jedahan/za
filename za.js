const deliver = (directions, deliveryPeople=1) => {
  let pos = [0, 0]
  const houses = new Set([JSON.stringify(pos)])

  directions.split('').forEach(direction => {

    switch(direction) {
      case '^': pos[1]++; break;
      case 'v': pos[1]--; break;
      case '>': pos[0]++; break;
      case '<': pos[0]--; break;
    }
    houses.add(JSON.stringify(pos))
  })
  return { houses: houses.size }
}

module.exports = { deliver }
