// Classes to help simulate delivery people delivering pizza
//
// Example usage:
//
//    import { DeliveryPerson, TakeTurnsDispatcher, LocationsVisitedReducer } = require('deliver.js')
//    
//    const deliveryPerson = new DeliveryPerson()
//    const dispatcher = new TakeTurnsDispatcher([deliveryPerson])
//    dispatcher.dispatch('^>v<')
//    const locationsVisitedReducer = new LocationsVisitedReducer(deliveryPeople)
//    console.dir(locationsVisitedReducer.summarize()) # => { locationsVisited: 4 }

// directions must be a string consisting of one of the directions in DIRECTIONS (^V<>)

// Valid movement directions
const DIRECTIONS = Object.freeze({
  '^': 'UP',
  'v': 'DOWN',
  '<': 'LEFT',
  '>': 'RIGHT',
})

// Represents a delivery person

// Can be constructed with a starting location {x, y} which defaults to 0, 0
class DeliveryPerson {
  constructor(startingLocation = { x: 0, y: 0 }) {
    this.locations = [startingLocation]
  }
  currentLocation() {
    return this.locations[this.locations.length - 1]
  }

  // direction must be an array
  deliver(directions) {
    if (!Array.isArray(directions)) throw new Error(`directions should be an Array, found ${typeof directions}`)
    while (directions.length) {
      const nextDirection = directions.shift()
      if (!(nextDirection in DIRECTIONS)) throw new Error(`unknown direction ${nextDirection}, please use one of ${Object.keys(DIRECTIONS)}`)

      const direction = DIRECTIONS[nextDirection]

      let location = { ... this.currentLocation() }

      switch (direction) {
        case 'UP': location.y++; break;
        case 'DOWN': location.y--; break;
        case 'LEFT': location.x--; break;
        case 'RIGHT': location.x++; break;
      }

      this.locations.push(location)
    }
  }
}

// This reducer returns the number of unique houses an array of DeliveryPeople have visisted
class LocationsVisitedReducer {
  // Take an array of DeliveryPerson
  constructor(deliveryPeople) {
    this.deliveryPeople = deliveryPeople
  }
  summarize() {
    const locationsVisited = new Set()
    this.deliveryPeople.forEach(({ locations }) => {
      locations.forEach(({ x, y }) => {
        locationsVisited.add(`${x},${y}`)
      })
    })
    return { locationsVisited: locationsVisited.size }
  }
}

/// A simple dispatcher that distributes the turns amongst all delivery people in order 
class TakeTurnsDispatcher {
  constructor(deliveryPeople = [new DeliveryPerson()]) {
    this.deliveryPeople = deliveryPeople
  }
  dispatch(directions) {
    this.deliveryPeople.forEach((deliveryPerson, index) => {
      const isThisPersonsTurn = (_, directionIndex) => directionIndex % this.deliveryPeople.length === index
      const splitDirections = directions.split('').filter(isThisPersonsTurn)
      deliveryPerson.deliver(splitDirections)
    })
  }
}

module.exports = { LocationsVisitedReducer, TakeTurnsDispatcher, DeliveryPerson }
