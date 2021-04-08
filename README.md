# chargemap rest

Example requests:

## Get

`/station` (limit of 10 results)

`/station?limit=4` (manual limit of 4)

`/station/5e590b0a7536c009841db2df` (specific station)

`/station?northEast={"lat":60.261050625839246,"lng":24.75042437967072}&southWest={"lat":60.090122695150534,"lng":24.520770276141093}` (limit within area)

## Post

`/station`

Body:

```
{
    "Station": {
        "Title": "Capgemini Oy",
        "Town": "Espoo",
        "AddressLine1": "Sinimäentie 8b",
        "StateOrProvince": "Southern Finland",
        "Postcode": "02630",
        "Location": {
            "coordinates": [24.77772323548868, 60.203353130088146]
        }
    },
    "Connections":[
        {
            "ConnectionTypeID": "5e39eecac5598269fdad81a0",
            "CurrentTypeID": "5e39ef4a6921476aaf62404a",
            "LevelID": "5e39edf7bb7ae768f05cf2bc",
            "Quantity": 2
        }
    ]
}
```

## Put

`/station`

Body:

```
{
    "Station": {
        "_id": "5e8df9a81f87eb168e4c6757",
        "Title": "Testi",
        "Town": "Espoo",
        "AddressLine1": "Sinimäentie 8b",
        "StateOrProvince": "Southern Finland",
        "Postcode": "02630",
        "Location": {
            "coordinates": [24.77772323548868, 60.203353130088146]
        }
    },
    "Connections":[
        {
            "_id": "5e8df9a81f87eb168e4c6756",
            "ConnectionTypeID": "5e39eecac5598269fdad81a0",
            "CurrentTypeID": "5e39ef4a6921476aaf62404a",
            "LevelID": "5e39edf7bb7ae768f05cf2bc",
            "Quantity": 7
        }
    ]
}
```

## Delete

`/station/5e590b0a7536c009841db2e7`
