// // if (!data || loading) return <div>Hallo</div> // PROBABLY REMOVE THIS
// // if (!data && error) return <div>Something went wrong ...</div>

// const colorMood = data => {
//   const {
//     weather: [{ main }]
//   } = data.list[0]

//   const thunderstorm = 'Thunderstorm'
//   const drizzle = 'Drizzle'
//   const rain = 'Rain'
//   const snow = 'Snow'
//   const atmosphere = 'Atmosphere'
//   const clear = 'Clear'
//   const clouds = 'Clouds'

//   switch (main) {
//     case main === thunderstorm:
//       setWeatherColor({ backgroundColor: '#393e46', color: '#fff' })
//       break
//     case main === drizzle:
//       setWeatherColor({ backgroundColor: '#89a4c7', color: '#fff' })
//       break
//     case main === rain:
//       setWeatherColor({ backgroundColor: '#1f3c88', color: '#fff' })
//       break
//     case main === snow:
//       setWeatherColor({ backgroundColor: '##f3f9fb', color: '#000' })
//       break
//     case main === atmosphere:
//       setWeatherColor({ backgroundColor: '#cdd5e0', color: '#000' })
//       break
//     case main === clear:
//       setWeatherColor({ backgroundColor: '#ff896b', color: '#fff' })
//       break
//     case main === clouds:
//       setWeatherColor({ backgroundColor: '#89a4c7', color: '#fff' })
//       break
//     default:
//       setWeatherColor({ backgroundColor: '#000', color: '#fff' })
//   }
// }

// const testColor = val => {
//   // console.log(data)
//   // const {
//   //   weather: [{ main }]
//   // } = val.list[0]

//   const thunderstorm = 'Thunderstorm'
//   const drizzle = 'Drizzle'
//   const rain = 'Rain'
//   const snow = 'Snow'
//   const atmosphere = 'Atmosphere'
//   const clear = 'Clear'
//   const clouds = 'Clouds'

//   // const value = 'Rain'

//   if (rain) {
//     return '#89a4c7'
//   } else {
//     return '#ff896b'
//   }
// }
// const styles = {
//   backgroundColor: testColor('Rain')
// }
// if (data) {
//   const {
//     weather: [{ main }]
//   } = data.list[0]
//   console.log(main)
//   const styles = {
//     backgroundColor: testColor(main)
//   }
// }
// // <div className='App' style={styles}>

// // console.log('data.list[0]', data.city.name)
