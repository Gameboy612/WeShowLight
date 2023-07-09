import AsyncStorage from '@react-native-async-storage/async-storage'



const ITEMS_LOCATION = "@WeShowLight:NeonLightStorage"


const example_item_loc = [{
    name: '大發茶餐廳',
    owner: '發家大記',
    location: '九龍路德徑32號',
    lastMaintanceDate: 2672048923895,
    contactNumber: '+85212345678',
    footnote: '',
    tag: [],
    picture: null

}]

let items = example_item_loc
let filtered_items = [...items]

let found_data = false
async function getDatabase() {
    await AsyncStorage.getItem(
        ITEMS_LOCATION
    ).then(results => {
        found_data = true;
        if(results == null) {
            _updateDB()
        } else {
            items = JSON.parse(results)
        }
    })
}
getDatabase()
console.log("API is active")

export var _updateDB = async () => {
    if(!found_data) return -1
    await AsyncStorage.setItem(ITEMS_LOCATION, JSON.stringify(items))
}


export var _getItems = (showIndex = false, search_filter = "", search_filtertags = []) => {
    if(!found_data) return []
    output = []
    items.forEach((q, index) => {
        if(!JSON.stringify(q).toLowerCase().includes(search_filter)) return;

        // Loop through each filter tag
        var remove = false
        search_filtertags.forEach((filtertag) => {
            var passed = false
            q.tag.forEach((qtag) => {
                if(qtag.toLowerCase().includes(filtertag.toLowerCase())) passed = true
            })
            if(!passed) {
                remove = true
                return;
            }
        })
        if (remove) return;
        if(showIndex) output.push({item:q, index:index})
        else output.push(q)
    })
    return output
}

export var _addItem = (data) => {
    items.push(data)
    _updateDB()
}

export var _editItem = (i, data) => {
    items[i] = data
    _updateDB()
}

export var _removeItem = (i) => {
    items.splice(i, 1)
    _updateDB()
}

export var _importDB = (d) => {
    if(!d[0].name) Alert.alert('ERROR: Not a valid database')
    items = [...d]
    _updateDB()
}

export var _appendDB = (d) => {
    if(!d[0].name) Alert.alert('ERROR: Not a valid database')
    items = [...items, ...d]
    _updateDB()
}

export var _removeItems = (index_arr = [], all = false) => {
    if(all) {
        items = []
    } else if(Array.isArray(index_arr)) {
        index_arr.sort().reverse().forEach((index) => {
            items.splice(index, 1)
        })
    }
    _updateDB()
}